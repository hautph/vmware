#!/bin/bash

# ==============================================================================
# Script Quản Lý GLPI Toàn Diện cho Ubuntu 24.04 (Phiên bản Menu Nâng cao)
# Tác giả: GLM-4.6
# Mô tả: Công cụ menu-driven để cài đặt, quản lý, bảo mật và cập nhật GLPI.
# Phiên bản này tuân theo phương pháp cài đặt chính thức (tải file .tgz).
# ==============================================================================

# --- CẤU HÌNH TOÀN CỤC ---
# Thay đổi các giá trị này nếu cần
DOMAIN_NAME="" # BẮT BUỘC: Nhập tên miền của bạn, ví dụ: glpi.yourdomain.com
SSH_NEW_PORT="2222" # Port SSH mới để tăng cường bảo mật

# Danh sách các plugin cần cài đặt từ GitHub
PLUGINS_TO_INSTALL=(
    "https://github.com/pluginsglpi/formcreator.git"
    "https://github.com/pluginsglpi/datainjection.git"
    # "https://github.com/another-user/another-plugin.git"
)

# --- KHÔNG THAY ĐỔI PHẦN DƯỚI ĐÂY NẾU BẠN KHÔNG CHẮC CHẮN ---

INSTALL_DIR="/var/www/glpi"
INFO_FILE="glpi_install_info.txt"
BACKUP_DIR="/var/backups/glpi"
PUBLIC_IP=""

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ==============================================================================
# HÀM HỖ TRỢ
# ==============================================================================

log_and_echo() {
    local message="$1"
    echo -e "${GREEN}[INFO]${NC} $message"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" >> "$INFO_FILE"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "${RED}Lỗi: Script này phải được chạy với quyền root (sudo).${NC}" 1>&2
        exit 1
    fi
}

check_dependencies() {
    local deps=("curl" "wget" "unzip" "tar" "mysql" "nginx" "php8.3-fpm")
    local missing=()
    
    log_and_echo "Kiểm tra dependencies hệ thống..."
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null && ! systemctl is-active --quiet "$dep" 2>/dev/null; then
            missing+=("$dep")
        fi
    done
    
    if [[ ${#missing[@]} -gt 0 ]]; then
        echo -e "${RED}Thiếu dependencies: ${missing[*]}${NC}"
        echo -e "${YELLOW}Các gói này sẽ được cài đặt tự động.${NC}"
        return 1
    fi
    
    log_and_echo "Tất cả dependencies đã sẵn sàng."
    return 0
}

check_php_compatibility() {
    log_and_echo "Kiểm tra phiên bản PHP..."
    local required_php="8.2"
    local current_php=$(php -r "echo PHP_VERSION;" 2>/dev/null || echo "0.0.0")
    
    if [[ $(echo -e "$required_php\n$current_php" | sort -V | head -n1) != "$required_php" ]]; then
        echo -e "${RED}PHP version $current_php không tương thích với GLPI. Cần >= $required_php${NC}"
        return 1
    fi
    
    log_and_echo "PHP version $current_php tương thích với GLPI."
    return 0
}

generate_password() {
    openssl rand -base64 32
}

get_public_ip() {
    if [[ -z "$PUBLIC_IP" ]]; then
        PUBLIC_IP=$(curl -s --connect-timeout 10 ifconfig.me || curl -s --connect-timeout 10 icanhazip.com || echo "UNKNOWN")
    fi
    echo "$PUBLIC_IP"
}

# ==============================================================================
# LẤY PHIÊN BẢN GLPI MỚI NHẤT TỪ GITHUB API
# ==============================================================================
get_latest_glpi_version() {
    echo -e "${BLUE}[KIỂM TRA]${NC} Đang kiểm tra phiên bản GLPI mới nhất..."
    GLPI_VERSION=$(curl -s --connect-timeout 10 https://api.github.com/repos/glpi-project/glpi/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    if [[ -z "$GLPI_VERSION" ]]; then
        echo -e "${RED}Lỗi: Không thể lấy phiên bản GLPI mới nhất từ GitHub. Vui lòng kiểm tra kết nối Internet.${NC}"
        exit 1
    fi
    echo -e "Phiên bản GLPI mới nhất: ${GREEN}$GLPI_VERSION${NC}"
}

# ==============================================================================
# HÀM YÊU CẦU TÊN MIỀN HOẶC CHỌN IP (ĐÃ CẬP NHẬT)
# ==============================================================================
prompt_domain() {
    local detected_ips=()
    local interface_list=($(ip -o link show 2>/dev/null | awk -F': ' '{print $2}' || echo "lo"))
    local primary_ip=""

    # Kiểm tra và lấy IP từ ens192 trước
    if ip addr show ens192 &>/dev/null; then
        primary_ip=$(ip addr show ens192 | grep 'inet ' | awk '{print $2}' | cut -d/ -f1 | head -1)
        if [[ -n "$primary_ip" ]]; then
            detected_ips+=("$primary_ip (ens192)")
        fi
    fi

    # Lấy IP từ các card mạng khác
    for iface in "${interface_list[@]}"; do
        if [[ "$iface" != "ens192" && "$iface" != "lo" ]]; then
            local ip_addr=$(ip addr show "$iface" 2>/dev/null | grep 'inet ' | awk '{print $2}' | cut -d/ -f1 | head -1)
            if [[ -n "$ip_addr" ]]; then
                detected_ips+=("$ip_addr ($iface)")
            fi
        fi
    done

    # Nếu không tìm thấy IP nào, thử lấy IP mặc định
    if [[ ${#detected_ips[@]} -eq 0 ]]; then
        local default_ip=$(hostname -I | awk '{print $1}' 2>/dev/null)
        if [[ -n "$default_ip" ]]; then
            detected_ips+=("$default_ip (default)")
        fi
    fi

    while [[ -z "$DOMAIN_NAME" ]]; do
        echo -e "\n${YELLOW}--- CẤU HÌNH TÊN MIỀN/ĐỊA CHỈ TRUY CẬP ---${NC}"
        read -p "Nhập tên miền của bạn cho GLPI (ví dụ: glpi.example.com), hoặc để trống để chọn IP: " input_domain
        
        if [[ -n "$input_domain" ]]; then
            DOMAIN_NAME="$input_domain"
            # Kiểm tra DNS
            local domain_ip
            domain_ip=$(dig +short "$DOMAIN_NAME" | head -1 2>/dev/null)
            if [[ -n "$domain_ip" ]]; then
                echo -e "Tên miền ${GREEN}$DOMAIN_NAME${NC} đã có thể phân giải thành IP: $domain_ip"
            else
                echo -e "${YELLOW}Cảnh báo: Tên miền $DOMAIN_NAME chưa phân giải được qua DNS công cộng.${NC}"
                echo -e "Hãy đảm bảo bạn đã cấu hình bản ghi DNS loại A trỏ đến IP server."
            fi
        else
            if [[ ${#detected_ips[@]} -eq 0 ]]; then
                echo -e "${RED}Không tìm thấy địa chỉ IP nào trên hệ thống.${NC}"
                echo -e "${RED}Vui lòng nhập tên miền hoặc kiểm tra kết nối mạng.${NC}"
                continue
            fi

            echo -e "\n${YELLOW}--- CHỌN ĐỊA CHỈ IP ---${NC}"
            echo -e "Chọn một địa chỉ IP từ danh sách dưới đây:"
            PS3="Nhập lựa chọn của bạn: "
            select selected_ip in "${detected_ips[@]}"; do
                if [[ -n "$selected_ip" ]]; then
                    # Chỉ lấy phần IP
                    DOMAIN_NAME=$(echo "$selected_ip" | awk '{print $1}')
                    echo -e "Bạn đã chọn IP: ${GREEN}$DOMAIN_NAME${NC}"
                    break
                else
                    echo -e "${RED}Lựa chọn không hợp lệ. Vui lòng chọn lại.${NC}"
                fi
            done
        fi
    done
}

read_install_info() {
    if [[ -f "$INFO_FILE" ]]; then
        DB_USER=$(grep "GLPI Database User:" "$INFO_FILE" | cut -d' ' -f4)
        DB_PASSWORD=$(grep "GLPI Database Password:" "$INFO_FILE" | cut -d' ' -f4)
        DB_NAME=$(grep "GLPI Database Name:" "$INFO_FILE" | cut -d' ' -f4)
        MYSQL_ROOT_PASSWORD=$(grep "MySQL Root Password:" "$INFO_FILE" | cut -d' ' -f4)
        DOMAIN_NAME=$(grep "Tên miền:" "$INFO_FILE" | cut -d' ' -f3)
        return 0
    fi
    return 1
}

secure_mysql_installation() {
    log_and_echo "Thiết lập bảo mật MySQL..."
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<EOF 2>/dev/null
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
EOF
    log_and_echo "Đã hoàn tất bảo mật MySQL."
}

cleanup_resources() {
    log_and_echo "Dọn dẹp tài nguyên tạm..."
    apt autoremove -y 2>/dev/null
    apt clean 2>/dev/null
    rm -rf /tmp/glpi-* 2>/dev/null
    log_and_echo "Dọn dẹp hoàn tất."
}

health_check() {
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}          KIỂM TRA SỨC KHỎE HỆ THỐNG     ${NC}"
    echo -e "${YELLOW}========================================${NC}"
    
    log_and_echo "Kiểm tra tình trạng hệ thống..."
    
    # Kiểm tra services
    local services=("nginx" "mysql" "php8.3-fpm")
    for service in "${services[@]}"; do
        if systemctl is-active --quiet "$service"; then
            echo -e "✅ $service: ${GREEN}Đang chạy${NC}"
        else
            echo -e "❌ $service: ${RED}Không chạy${NC}"
        fi
    done
    
    # Kiểm tra GLPI
    if [[ -f "$INSTALL_DIR/config/config_db.php" ]]; then
        echo -e "✅ GLPI config: ${GREEN}Tồn tại${NC}"
    else
        echo -e "❌ GLPI config: ${RED}Không tồn tại${NC}"
    fi
    
    # Kiểm tra database connection
    if [[ -n "$DB_NAME" && -n "$DB_USER" && -n "$DB_PASSWORD" ]]; then
        if mysql -u "$DB_USER" -p"$DB_PASSWORD" -e "USE $DB_NAME;" &>/dev/null; then
            echo -e "✅ Database connection: ${GREEN}Thành công${NC}"
        else
            echo -e "❌ Database connection: ${RED}Thất bại${NC}"
        fi
    fi
    
    # Kiểm tra disk space
    local disk_usage=$(df -h "$INSTALL_DIR" | awk 'NR==2 {print $5}')
    echo -e "📊 Disk usage: $disk_usage"
    
    # Kiểm tra memory
    local mem_usage=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2 }')
    echo -e "💾 Memory usage: $mem_usage"
}

# ==============================================================================
# MODULE 1: CÀI ĐẶT GLPI (ĐÃ VIẾT LẠI THEO TÀI LIỆU CHÍNH THỨC)
# ==============================================================================
install_glpi_module() {
    if [[ -d "$INSTALL_DIR" && -f "$INSTALL_DIR/config/config_db.php" && -f "$INSTALL_DIR/inc/define.php" && -f "$INSTALL_DIR/bin/console" ]]; then
        echo -e "${YELLOW}GLPI đã được cài đặt và hoạt động tốt. Bỏ qua bước cài đặt.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}       BẮT ĐẦU CÀI ĐẶT/GLPI LẠI       ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    if [[ -d "$INSTALL_DIR" ]]; then
        echo -e "${RED}Phát hiện thư mục GLPI tồn tại nhưng cài đặt không hoàn chỉnh.${NC}"
        read -p "Bạn có muốn xóa và cài lại hoàn toàn không? (y/N): " choice
        if [[ "$choice" != "y" && "$choice" != "Y" ]]; then
            echo -e "Hủy cài đặt."
            read -p "Nhấn Enter để quay lại menu..."
            return
        fi
        log_and_echo "Đang xóa thư mục cài đặt cũ..."
        rm -rf "$INSTALL_DIR"
    fi

    local use_saved_domain=false
    if read_install_info; then
        echo -e "Tìm thấy thông tin cài đặt cũ với tên miền: ${YELLOW}$DOMAIN_NAME${NC}"
        read -p "Bạn có muốn sử dụng lại tên miền này không? (Y/n): " choice
        case "$choice" in
            n|N ) use_saved_domain=false ;;
            * ) use_saved_domain=true ;;
        esac
    fi

    if [[ "$use_saved_domain" = false ]]; then
        prompt_domain
    fi
    
    # Lấy public IP nếu chưa có
    get_public_ip > /dev/null
    
    echo -e "\n${YELLOW}--- GỢI Ý CẤU HÌNH DNS ---${NC}"
    local domain_ip
    domain_ip=$(dig +short "$DOMAIN_NAME" | head -1 2>/dev/null)
    if [[ -n "$domain_ip" ]]; then
        echo -e "Tên miền ${GREEN}$DOMAIN_NAME${NC} đã có thể phân giải thành IP: $domain_ip"
    else
        echo -e "Hãy tạo bản ghi DNS loại ${GREEN}'A'${NC} với nội dung:"
        echo -e "${BLUE}Tên miền: $DOMAIN_NAME${NC}"
        echo -e "${BLUE}Trỏ đến IP: $PUBLIC_IP${NC}"
    fi
    read -p "Nhấn Enter để tiếp tục..."

    echo "=== THÔNG TIN CÀI ĐẶT GLPI - $(date) ===" > "$INFO_FILE"
    echo "Tên miền: $DOMAIN_NAME" >> "$INFO_FILE"
    echo "IP công khai: $PUBLIC_IP" >> "$INFO_FILE"
    echo "" >> "$INFO_FILE"

    log_and_echo "Cập nhật hệ thống và cài đặt các gói LEMP stack và PHP..."
    apt update && apt upgrade -y
    apt install -y nginx mysql-server php8.3-fpm php8.3-mysql php8.3-curl php8.3-gd php8.3-intl php8.3-xmlrpc php8.3-apcu php8.3-ldap php8.3-imap php8.3-xml php8.3-mbstring php8.3-bz2 php8.3-zip php8.3-bcmath certbot python3-certbot-nginx

    log_and_echo "Cấu hình MySQL bảo mật và dọn dẹp cài đặt cũ..."
    DB_NAME="glpi_db"
    DB_USER="glpi_user"
    DB_PASSWORD=$(generate_password)
    MYSQL_ROOT_PASSWORD=$(generate_password)
    
    # Cấu hình MySQL root password
    mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASSWORD';" 2>/dev/null || {
        echo -e "${RED}Lỗi cấu hình MySQL root password${NC}"
        exit 1
    }

    # Dọn dẹp user/database cũ và tạo mới
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<EOF 2>/dev/null
DROP USER IF EXISTS '$DB_USER'@'localhost';
DROP DATABASE IF EXISTS $DB_NAME;
CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '$DB_USER'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

    secure_mysql_installation
    
    echo "MySQL Root Password: $MYSQL_ROOT_PASSWORD" >> "$INFO_FILE"
    echo "GLPI Database Name: $DB_NAME" >> "$INFO_FILE"
    echo "GLPI Database User: $DB_USER" >> "$INFO_FILE"
    echo "GLPI Database Password: $DB_PASSWORD" >> "$INFO_FILE"

    log_and_echo "Tải và cài đặt GLPI phiên bản $GLPI_VERSION từ file nén..."
    cd /tmp
    wget -q "https://github.com/glpi-project/glpi/releases/download/$GLPI_VERSION/glpi-$GLPI_VERSION.tgz"
    if [[ $? -ne 0 ]]; then
        echo -e "${RED}Lỗi tải GLPI từ GitHub. Vui lòng kiểm tra kết nối internet.${NC}"
        exit 1
    fi
    tar -xzf "glpi-$GLPI_VERSION.tgz"
    rm -rf "$INSTALL_DIR"
    mv glpi "$INSTALL_DIR"
    rm "glpi-$GLPI_VERSION.tgz"

    chown -R www-data:www-data "$INSTALL_DIR"
    find "$INSTALL_DIR" -type d -exec chmod 755 {} \;
    find "$INSTALL_DIR" -type f -exec chmod 644 {} \;

    log_and_echo "Cấu hình PHP..."
    PHP_INI_FILE="/etc/php/8.3/fpm/php.ini"
    sed -i "s/memory_limit = .*/memory_limit = 256M/; s/upload_max_filesize = .*/upload_max_filesize = 64M/; s/post_max_size = .*/post_max_size = 64M/; s/max_execution_time = .*/max_execution_time = 300/; s/;date.timezone.*/date.timezone = Asia\/Ho_Chi_Minh/; s/expose_php = On/expose_php = Off/" "$PHP_INI_FILE"
    systemctl restart php8.3-fpm

    log_and_echo "Tạo file cấu hình Nginx ban đầu (chỉ HTTP)..."
    NGINX_CONF_FILE="/etc/nginx/sites-available/$DOMAIN_NAME"
    cat > "$NGINX_CONF_FILE" <<EOF
server {
    listen 80;
    server_name $DOMAIN_NAME;

    root $INSTALL_DIR;
    index index.php index.html index.htm;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    server_tokens off;

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~ /\. { deny all; }
    location ~ ^/(config|templates|inc|vendor|tests|scripts|tools|install)/ { deny all; }
}
EOF
    ln -sf "$NGINX_CONF_FILE" "/etc/nginx/sites-enabled/"
    rm -f "/etc/nginx/sites-enabled/default"
    nginx -t && systemctl restart nginx

    log_and_echo "Cài đặt chứng chỉ SSL với Certbot..."
    if [[ "$DOMAIN_NAME" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo -e "${YELLOW}Phát hiện bạn đang sử dụng địa chỉ IP. Bỏ qua cài đặt SSL.${NC}"
    else
        local domain_ip
        domain_ip=$(dig +short "$DOMAIN_NAME" | head -1)
        if [[ "$domain_ip" == "$PUBLIC_IP" ]]; then
            certbot --nginx -d "$DOMAIN_NAME" --non-interactive --agree-tos --email "admin@$DOMAIN_NAME" --redirect
            log_and_echo "Certbot đã cài đặt SSL và cấu hình Nginx."
        else
            echo -e "${YELLOW}Cảnh báo: Tên miền $DOMAIN_NAME chưa trỏ về IP $PUBLIC_IP. Bỏ qua cài đặt SSL.${NC}"
            echo -e "Bạn có thể chạy lại lệnh sau khi DNS đã cập nhật: ${GREEN}sudo certbot --nginx -d $DOMAIN_NAME${NC}"
        fi
    fi

    log_and_echo "Cấu hình database cho GLPI..."
    cd "$INSTALL_DIR"
    sudo -u www-data php bin/console glpi:database:install \
        --db-host=localhost \
        --db-name="$DB_NAME" \
        --db-user="$DB_USER" \
        --db-password="$DB_PASSWORD" \
        --default-language=vi_VN

    cat > "$INSTALL_DIR/config/config_db.php" <<EOF
<?php
class DB extends DBmysql {
    public \$dbhost = 'localhost';
    public \$dbuser = '$DB_USER';
    public \$dbpassword = '$DB_PASSWORD';
    public \$dbdefault = '$DB_NAME';
}
EOF
    chown www-data:www-data "$INSTALL_DIR/config/config_db.php"
    rm -rf "$INSTALL_DIR/install"
    (crontab -l 2>/dev/null; echo "*/2 * * * * www-data /usr/bin/php $INSTALL_DIR/front/cron.php &>/dev/null") | crontab -
    
    cleanup_resources
    log_and_echo "Cài đặt GLPI hoàn tất."
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MODULE 2: BACKUP TỰ ĐỘNG
# ==============================================================================
setup_backup_module() {
    if ! read_install_info; then 
        echo -e "${RED}Chưa có thông tin cài đặt. Vui lòng chạy 'Cài đặt GLPI' trước.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi
    if [[ ! -f "$INSTALL_DIR/config/config_db.php" ]]; then
        echo -e "${RED}File cấu hình database của GLPI không tồn tại. Cài đặt có thể bị lỗi.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi
    if crontab -l 2>/dev/null | grep -q "glpi_backup.sh"; then 
        echo -e "${YELLOW}Backup tự động đã được cấu hình.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}       CẤU HÌNH BACKUP TỰ ĐỘNG       ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"

    log_and_echo "Thiết lập backup tự động..."
    mkdir -p "$BACKUP_DIR"
    cat > /usr/local/bin/glpi_backup.sh <<EOF
#!/bin/bash
BACKUP_DIR="$BACKUP_DIR"
INSTALL_DIR="$INSTALL_DIR"
DB_NAME="$DB_NAME"
DB_USER="$DB_USER"
DB_PASSWORD="$DB_PASSWORD"
DATE=\$(date +%F_%T)
mysqldump -u "\$DB_USER" -p"\$DB_PASSWORD" "\$DB_NAME" | gzip > "\$BACKUP_DIR/glpi_db_\$DATE.sql.gz"
tar -czf "\$BACKUP_DIR/glpi_files_\$DATE.tar.gz" -C "\$(dirname "\$INSTALL_DIR")" "\$(basename "\$INSTALL_DIR")"
find "\$BACKUP_DIR" -type f -mtime +7 -delete
EOF
    chmod +x /usr/local/bin/glpi_backup.sh

    # Thêm tính năng rollback
    cat > /usr/local/bin/glpi_rollback.sh <<EOF
#!/bin/bash
BACKUP_DIR="$BACKUP_DIR"
INSTALL_DIR="$INSTALL_DIR"
DB_NAME="$DB_NAME"
DB_USER="$DB_USER"
DB_PASSWORD="$DB_PASSWORD"

echo -e "Các bản backup có sẵn:"
echo -e "=========================="
ls -1t "\$BACKUP_DIR"/glpi_files_*.tar.gz 2>/dev/null | head -5 | while read file; do
    echo -n "📁 "; basename "\$file"
done
ls -1t "\$BACKUP_DIR"/glpi_db_*.sql.gz 2>/dev/null | head -5 | while read file; do
    echo -n "🗃️ "; basename "\$file"
done
echo -e "=========================="

read -p "Nhập tên file backup để rollback (không cần đường dẫn): " backup_file
if [[ -f "\$BACKUP_DIR/\$backup_file" ]]; then
    echo -e "⚠️  Bắt đầu rollback từ \$backup_file..."
    
    if [[ "\$backup_file" == glpi_files_* ]]; then
        systemctl stop nginx php8.3-fpm
        tar -xzf "\$BACKUP_DIR/\$backup_file" -C /
        systemctl start nginx php8.3-fpm
        echo -e "✅ Rollback files hoàn tất!"
    elif [[ "\$backup_file" == glpi_db_* ]]; then
        mysql -u "\$DB_USER" -p"\$DB_PASSWORD" "\$DB_NAME" < <(zcat "\$BACKUP_DIR/\$backup_file")
        echo -e "✅ Rollback database hoàn tất!"
    else
        echo -e "❌ Định dạng file không được hỗ trợ!"
    fi
else
    echo -e "❌ File backup không tồn tại!"
fi
EOF
    chmod +x /usr/local/bin/glpi_rollback.sh

    (crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/glpi_backup.sh") | crontab -
    log_and_echo "Đã cấu hình backup tự động hàng ngày lúc 2:00 sáng."
    log_and_echo "Sử dụng lệnh: ${GREEN}sudo /usr/local/bin/glpi_rollback.sh${NC} để khôi phục"
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MODULE 3: CẬP NHẬT GLPI
# ==============================================================================
update_glpi_module() {
    if ! read_install_info; then 
        echo -e "${RED}Chưa có thông tin cài đặt. Vui lòng chạy 'Cài đặt GLPI' trước.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi
    if [[ ! -f "$INSTALL_DIR/inc/define.php" ]]; then
        echo -e "${RED}File cốt lõi của GLPI không tồn tại. Cài đặt có thể bị lỗi hoặc chưa hoàn tất.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}          KIỂM TRA CẬP NHẬT GLPI         ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"

    CURRENT_VERSION=$(grep "define('GLPI_VERSION'" "$INSTALL_DIR/inc/define.php" | cut -d "'" -f 4)
    LATEST_VERSION=$(curl -s --connect-timeout 10 https://api.github.com/repos/glpi-project/glpi/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    echo -e "Phiên bản hiện tại: ${BLUE}$CURRENT_VERSION${NC}"
    echo -e "Phiên bản mới nhất: ${GREEN}$LATEST_VERSION${NC}"

    if [[ "$CURRENT_VERSION" == "$LATEST_VERSION" ]]; then
        log_and_echo "Bạn đang sử dụng phiên bản mới nhất."
    else
        read -p "Bạn có muốn cập nhật không? (y/N): " choice
        if [[ "$choice" == "y" || "$choice" == "Y" ]]; then
            log_and_echo "Bắt đầu cập nhật GLPI..."
            
            # Backup trước khi update
            if [[ -f "/usr/local/bin/glpi_backup.sh" ]]; then
                /usr/local/bin/glpi_backup.sh
            else
                echo -e "${YELLOW}Cảnh báo: Script backup không tồn tại, tạo backup thủ công...${NC}"
                mkdir -p "$BACKUP_DIR"
                mysqldump -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" | gzip > "$BACKUP_DIR/glpi_db_update_$(date +%F_%T).sql.gz"
                tar -czf "$BACKUP_DIR/glpi_files_update_$(date +%F_%T).tar.gz" -C "$(dirname "$INSTALL_DIR")" "$(basename "$INSTALL_DIR")"
            fi
            
            cd "$INSTALL_DIR"
            php bin/console glpi:maintenance:enable
            
            cd /tmp
            wget -q "https://github.com/glpi-project/glpi/releases/download/$LATEST_VERSION/glpi-$LATEST_VERSION.tgz"
            tar -xzf "glpi-$LATEST_VERSION.tgz"
            rm -rf "$INSTALL_DIR.bak"
            mv "$INSTALL_DIR" "$INSTALL_DIR.bak"
            mv glpi "$INSTALL_DIR"
            rm "glpi-$LATEST_VERSION.tgz"
            
            cp -rp "$INSTALL_DIR.bak/config" "$INSTALL_DIR/"
            cp -rp "$INSTALL_DIR.bak/files" "$INSTALL_DIR/"
            chown -R www-data:www-data "$INSTALL_DIR"
            
            cd "$INSTALL_DIR"
            php bin/console glpi:database:update --no-interaction
            php bin/console glpi:maintenance:disable
            
            log_and_echo "Cập nhật GLPI thành công đến phiên bản $LATEST_VERSION."
        fi
    fi
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MODULE 4: BẢO MẬT SERVER (HARDENING)
# ==============================================================================
harden_server_module() {
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      BẢO MẬT SERVER (HARDENING)      ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"

    log_and_echo "Đảm bảo tường lửa UFW đang hoạt động..."
    ufw --force enable

    if ! systemctl is-active --quiet fail2ban; then
        log_and_echo "Cấu hình Fail2Ban..."
        cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime = 3600; findtime = 600; maxretry = 3
[sshd]
enabled = true; port = $SSH_NEW_PORT; logpath = /var/log/auth.log
[glpi]
enabled = true; port = http,https; filter = glpi-auth; logpath = $INSTALL_DIR/files/_log/php-errors.log; maxretry = 5
EOF
        cat > /etc/fail2ban/filter.d/glpi-auth.conf <<'EOF'
[Definition]
failregex = .*Failed login for .* from <HOST>.*
ignoreregex =
EOF
        systemctl enable fail2ban
        systemctl restart fail2ban
    else
        log_and_echo "Fail2ban đã được cài đặt và đang chạy."
    fi

    echo -e "${RED}⚠️  CẢNH BÁO QUAN TRỌNG:${NC}"
    echo -e "Bạn sắp thay đổi port SSH từ 22 thành $SSH_NEW_PORT"
    echo -e "Hãy đảm bảo bạn đã cấu hình firewall cho phép port $SSH_NEW_PORT"
    echo -e "Nếu không, bạn có thể bị mất kết nối SSH!"
    read -p "Bạn có chắc chắn muốn tiếp tục? (yes/NO): " confirm
    if [[ "$confirm" != "yes" ]]; then
        echo -e "${YELLOW}Đã hủy thay đổi SSH.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    log_and_echo "Hardening SSH..."
    sed -i "s/#Port 22/Port $SSH_NEW_PORT/" /etc/ssh/sshd_config
    sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    
    ufw delete allow OpenSSH &>/dev/null
    ufw allow "$SSH_NEW_PORT/tcp" &>/dev/null
    ufw --force reload &>/dev/null
    
    echo -e "${RED}CẢNH BÁO: Đã thay đổi port SSH thành $SSH_NEW_PORT và vô hiệu hóa đăng nhập root/mật khẩu.${NC}"
    read -p "Khởi động lại dịch vụ SSH ngay bây giờ? (y/N): " restart_ssh
    if [[ "$restart_ssh" == "y" || "$restart_ssh" == "Y" ]]; then
        systemctl restart sshd
        log_and_echo "Đã khởi động lại dịch vụ SSH. Port mới: $SSH_NEW_PORT."
    else
        log_and_echo "Vui lòng khởi động lại SSH thủ công: systemctl restart sshd"
    fi
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MODULE 5: CÀI ĐẶT PLUGIN
# ==============================================================================
install_plugins_module() {
    if ! read_install_info; then 
        echo -e "${RED}Chưa có thông tin cài đặt. Vui lòng chạy 'Cài đặt GLPI' trước.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi
    if [[ ! -f "$INSTALL_DIR/bin/console" ]]; then
        echo -e "${RED}Lệnh quản lý GLPI (bin/console) không tồn tại. Cài đặt có thể bị lỗi hoặc chưa hoàn tất.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi
    if [[ ${#PLUGINS_TO_INSTALL[@]} -eq 0 ]]; then 
        echo -e "${YELLOW}Không có plugin nào trong danh sách để cài.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}         CÀI ĐẶT PLUGIN TỪ DANH SÁCH      ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"

    for PLUGIN_URL in "${PLUGINS_TO_INSTALL[@]}"; do
        PLUGIN_NAME=$(basename "$PLUGIN_URL" .git)
        if [[ -d "$INSTALL_DIR/plugins/$PLUGIN_NAME" ]]; then
            log_and_echo "Plugin $PLUGIN_NAME đã tồn tại, bỏ qua."
            continue
        fi
        log_and_echo "Đang cài đặt plugin: $PLUGIN_NAME..."
        cd "$INSTALL_DIR/plugins"
        if git clone "$PLUGIN_URL"; then
            chown -R www-data:www-data "$PLUGIN_NAME"
            cd "$INSTALL_DIR"
            php bin/console glpi:plugin:install "$PLUGIN_NAME"
            php bin/console glpi:plugin:activate "$PLUGIN_NAME"
            log_and_echo "Đã cài đặt và kích hoạt plugin $PLUGIN_NAME."
        else
            echo -e "${RED}Không thể clone repository từ $PLUGIN_URL${NC}"
        fi
    done
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MENU QUẢN LÝ HỆ THỐNG
# ==============================================================================
show_management_menu() {
    clear
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   QUẢN LÝ GLPI - MENU PHỤ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "  1. Xem trạng thái dịch vụ"
    echo -e "  2. Khởi động lại dịch vụ GLPI"
    echo -e "  3. Xem log GLPI"
    echo -e "  4. Rollback từ backup"
    echo -e "  5. Kiểm tra sức khỏe hệ thống"
    echo -e "  6. Dọn dẹp hệ thống"
    echo -e "  7. Quay lại menu chính"
    echo -e "${GREEN}========================================${NC}"
}

management_loop() {
    while true; do
        show_management_menu
        read -p "Nhập lựa chọn [1-7]: " choice
        case $choice in
            1) 
                echo -e "\n${YELLOW}--- TRẠNG THÁI DỊCH VỤ ---${NC}"
                systemctl status nginx --no-pager -l
                echo -e "\n---"
                systemctl status mysql --no-pager -l
                echo -e "\n---"
                systemctl status php8.3-fpm --no-pager -l
                ;;
            2) 
                log_and_echo "Khởi động lại dịch vụ GLPI..."
                systemctl restart nginx mysql php8.3-fpm
                echo -e "${GREEN}Đã khởi động lại tất cả dịch vụ.${NC}"
                ;;
            3) 
                if [[ -f "$INSTALL_DIR/files/_log/php-errors.log" ]]; then
                    echo -e "\n${YELLOW}--- LOG GLPI (50 dòng cuối) ---${NC}"
                    tail -50 "$INSTALL_DIR/files/_log/php-errors.log"
                else
                    echo -e "${RED}File log GLPI không tồn tại.${NC}"
                fi
                ;;
            4) 
                if [[ -f "/usr/local/bin/glpi_rollback.sh" ]]; then
                    /usr/local/bin/glpi_rollback.sh
                else
                    echo -e "${RED}Script rollback không tồn tại. Hãy cấu hình backup trước.${NC}"
                fi
                ;;
            5) health_check ;;
            6) cleanup_resources ;;
            7) break ;;
            *) echo -e "${RED}Lựa chọn không hợp lệ${NC}" ;;
        esac
        read -p "Nhấn Enter để tiếp tục..."
    done
}

# ==============================================================================
# MENU CHÍNH
# ==============================================================================
show_menu() {
    clear
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   CÔNG CỤ QUẢN LÝ GLPI TOÀN DIỆN   ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "  1. Chạy tất cả (Cài đặt + Cấu hình + Bảo mật)"
    echo -e "  2. Cài đặt GLPI (mới)"
    echo -e "  3. Cấu hình Backup Tự động"
    echo -e "  4. Cập nhật GLPI"
    echo -e "  5. Bảo mật Server (Hardening)"
    echo -e "  6. Cài đặt Plugin từ GitHub"
    echo -e "  7. Quản lý hệ thống"
    echo -e "  8. Kiểm tra sức khỏe hệ thống"
    echo -e "  9. Thoát"
    echo -e "${GREEN}========================================${NC}"
}

show_final_info() {
    if ! read_install_info; then return; fi
    echo -e "\n${GREEN}================================================================================================${NC}"
    echo -e "${GREEN}            TẤT CẢ CÁC TÁC VỤ ĐÃ HOÀN TẤT!${NC}"
    echo -e "${GREEN}================================================================================================${NC}"
    
    local url_scheme="http"
    if [[ ! "$DOMAIN_NAME" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        url_scheme="https"
    fi

    echo -e "URL truy cập: ${YELLOW}$url_scheme://$DOMAIN_NAME${NC}"
    echo -e "Tài khoản mặc định: ${YELLOW}glpi / glpi${NC}"
    echo -e "Port SSH mới: ${YELLOW}$SSH_NEW_PORT${NC}"
    echo -e "\n${RED}LƯU Ý QUAN TRỌNG:${NC}"
    echo -e "1. Hãy đổi mật khẩu cho các tài khoản mặc định ngay lập tức."
    echo -e "2. Toàn bộ thông tin quan trọng đã được lưu vào file: ${YELLOW}$(pwd)/$INFO_FILE${NC}"
    echo -e "3. Hãy kiểm tra lại các cấu hình và đảm bảo hệ thống của bạn hoạt động đúng."
    echo -e "4. Sử dụng menu 'Quản lý hệ thống' để theo dõi và bảo trì."
    echo -e "${GREEN}================================================================================================${NC}"
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# Vòng lặp chính
# ==============================================================================
main_loop() {
    while true; do
        show_menu
        read -p "Nhập lựa chọn của bạn [1-9]: " choice
        case $choice in
            1) 
                echo -e "${GREEN}Chạy tất cả các module...${NC}"
                install_glpi_module
                read_install_info
                setup_backup_module
                update_glpi_module
                harden_server_module
                install_plugins_module
                show_final_info
                ;;
            2) install_glpi_module ;;
            3) setup_backup_module ;;
            4) update_glpi_module ;;
            5) harden_server_module ;;
            6) install_plugins_module ;;
            7) management_loop ;;
            8) health_check; read -p "Nhấn Enter để quay lại menu..." ;;
            9) echo -e "Thoát script."; exit 0 ;;
            *) echo -e "${RED}Lựa chọn không hợp lệ. Vui lòng chọn lại.${NC}"; sleep 2 ;;
        esac
    done
}

# ==============================================================================
# THỰC THI CHÍNH
# ==============================================================================

check_root

echo -e "${GREEN}Khởi động công cụ quản lý GLPI toàn diện...${NC}"

# Kiểm tra và cài đặt prerequisites
check_dependencies || {
    read -p "Có dependencies bị thiếu. Tiếp tục cài đặt tự động? (y/N): " continue_choice
    if [[ "$continue_choice" != "y" && "$continue_choice" != "Y" ]]; then
        exit 1
    fi
}

log_and_echo "Đang cài đặt các gói công cụ cần thiết cho script..."
apt update
apt install -y curl wget unzip vim dnsutils openssl git cron ufw fail2ban composer

# Kiểm tra PHP compatibility
check_php_compatibility || {
    read -p "PHP không tương thích. Tiếp tục có thể gây lỗi. Tiếp tục? (y/N): " php_choice
    if [[ "$php_choice" != "y" && "$php_choice" != "Y" ]]; then
        exit 1
    fi
}

get_latest_glpi_version

# Lấy IP Public một lần cho toàn script
get_public_ip > /dev/null

# Bắt đầu vòng lặp menu
main_loop