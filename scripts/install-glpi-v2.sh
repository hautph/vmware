#!/bin/bash

# ==============================================================================
# Script Quản Lý GLPI Toàn Diện cho Ubuntu 24.04 (Phiên bản Menu)
# Tác giả: GLM-4.6 (Được cải thiện)
# Mô tả: Công cụ menu-driven để cài đặt, quản lý, bảo mật và cập nhật GLPI.
# Tuân thủ nghiêm ngặt tài liệu chính thức GLPI.
# ==============================================================================

# --- CẤU HÌNH TOÀN CỤC ---
DOMAIN_NAME="" # BẮT BUỘC: Nhập tên miền, ví dụ: glpi.yourdomain.com
SSH_NEW_PORT="2222" # Port SSH mới

# Danh sách plugin cần cài đặt
PLUGINS_TO_INSTALL=(
    "https://github.com/pluginsglpi/formcreator.git"
    "https://github.com/pluginsglpi/datainjection.git"
)

# --- KHÔNG THAY ĐỔI PHẦN DƯỚI NẾU KHÔNG CHẮC ---

INSTALL_DIR="/var/www/glpi"
INFO_FILE="glpi_install_info.txt"
BACKUP_DIR="/var/backups/glpi"

# Màu sắc
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ==============================================================================
# HÀM HỖ TRỢ
# ==============================================================================

log_and_echo() {
    local message="$1"
    echo -e "${GREEN}[INFO]${NC} $message"
    [[ -f "$INFO_FILE" ]] && echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" >> "$INFO_FILE"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "${RED}Lỗi: Script phải chạy với quyền root (sudo).${NC}" >&2
        exit 1
    fi
}

validate_domain() {
    local domain="$1"
    if [[ -z "$domain" ]]; then return 1; fi
    
    # Kiểm tra định dạng IP hoặc tên miền hợp lệ
    if [[ "$domain" =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
        IFS='.' read -ra OCTETS <<< "$domain"
        for octet in "${OCTETS[@]}"; do
            ((octet >= 0 && octet <= 255)) || return 1
        done
    else
        # Kiểm tra tên miền đơn giản
        [[ "$domain" =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*\.?$ ]]
    fi
}

# ==============================================================================
# LẤY PHIÊN BẢN GLPI MỚI NHẤT
# ==============================================================================
get_latest_glpi_version() {
    log_and_echo "Kiểm tra phiên bản GLPI mới nhất..."
    local max_retries=3
    local retry_count=0
    
    while [[ $retry_count -lt $max_retries ]]; do
        GLPI_VERSION=$(curl -s --max-time 10 https://api.github.com/repos/glpi-project/glpi/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
        if [[ -n "$GLPI_VERSION" ]]; then
            echo -e "Phiên bản GLPI mới nhất: ${GREEN}$GLPI_VERSION${NC}"
            return 0
        fi
        ((retry_count++))
        sleep 2
    done
    
    echo -e "${RED}Lỗi: Không thể lấy phiên bản GLPI mới nhất.${NC}"
    exit 1
}

generate_password() {
    openssl rand -base64 32
}

# ==============================================================================
# YÊU CẦU TÊN MIỀN HOẶC CHỌN IP
# ==============================================================================
prompt_domain() {
    local detected_ips=()
    local primary_ip=""
    
    # Kiểm tra ens192 trước
    if ip addr show ens192 &>/dev/null; then
        primary_ip=$(ip addr show ens192 | grep 'inet ' | awk '{print $2}' | cut -d/ -f1)
        [[ -n "$primary_ip" ]] && detected_ips+=("$primary_ip (ens192)")
    fi
    
    # Các interface khác
    for iface in $(ip -o link show | awk -F': ' '{print $2}'); do
        if [[ "$iface" != "ens192" && "$iface" != "lo" ]]; then
            local ip_addr=$(ip addr show "$iface" | grep 'inet ' | awk '{print $2}' | cut -d/ -f1)
            [[ -n "$ip_addr" ]] && detected_ips+=("$ip_addr ($iface)")
        fi
    done

    while [[ -z "$DOMAIN_NAME" ]]; do
        read -p "Nhập tên miền (ví dụ: glpi.example.com), hoặc để trống để chọn IP: " input_domain
        if [[ -n "$input_domain" ]]; then
            if validate_domain "$input_domain"; then
                DOMAIN_NAME="$input_domain"
            else
                echo -e "${RED}Tên miền/IP không hợp lệ. Vui lòng nhập lại.${NC}"
            fi
        else
            if [[ ${#detected_ips[@]} -eq 0 ]]; then
                echo -e "${RED}Không tìm thấy địa chỉ IP nào.${NC}"
                continue
            fi
            
            echo -e "\n${YELLOW}--- CHỌN ĐỊA CHỈ IP ---${NC}"
            PS3="Chọn một IP: "
            select selected_ip in "${detected_ips[@]}"; do
                if [[ -n "$selected_ip" ]]; then
                    DOMAIN_NAME=$(echo "$selected_ip" | awk '{print $1}')
                    echo -e "Đã chọn IP: ${GREEN}$DOMAIN_NAME${NC}"
                    break 2
                else
                    echo -e "${RED}Lựa chọn không hợp lệ.${NC}"
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

show_menu() {
    clear
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   CÔNG CỤ QUẢN LÝ GLPI TOÀN DIỆN   ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "  1. Chạy tất cả (Toàn diện)"
    echo -e "  2. Cài đặt GLPI (mới)"
    echo -e "  3. Cấu hình Backup Tự động"
    echo -e "  4. Cập nhật GLPI"
    echo -e "  5. Bảo mật Server (Hardening)"
    echo -e "  6. Cài đặt Plugin từ GitHub"
    echo -e "  7. Thoát"
    echo -e "${GREEN}========================================${NC}"
}

# ==============================================================================
# MODULE 1: CÀI ĐẶT GLPI
# ==============================================================================
install_glpi_module() {
    # Kiểm tra cài đặt hiện tại
    if [[ -d "$INSTALL_DIR" ]] && { [[ -f "$INSTALL_DIR/config/config_db.php" ]] || [[ -f "$INSTALL_DIR/inc/define.php" ]]; }; then
        echo -e "${YELLOW}GLPI đã được cài đặt.${NC}"
        read -p "Bạn có muốn cài đặt lại? (y/N): " choice
        [[ "$choice" != "y" && "$choice" != "Y" ]] && return
        rm -rf "$INSTALL_DIR"
    fi

    echo -e "\n${YELLOW}BẮT ĐẦU CÀI ĐẶT GLPI${NC}\n"
    
    if ! read_install_info; then
        prompt_domain
    else
        echo -e "Tìm thấy thông tin cũ: ${YELLOW}$DOMAIN_NAME${NC}"
        read -p "Sử dụng lại tên miền này? (Y/n): " choice
        [[ "$choice" == "n" || "$choice" == "N" ]] && prompt_domain
    fi
    
    # Ghi thông tin cài đặt
    echo "=== THÔNG TIN CÀI ĐẶT GLPI - $(date) ===" > "$INFO_FILE"
    echo "Tên miền: $DOMAIN_NAME" >> "$INFO_FILE"
    echo "" >> "$INFO_FILE"

    log_and_echo "Cập nhật hệ thống..."
    apt update && apt upgrade -y

    # Cài đặt các gói cần thiết
    log_and_echo "Cài đặt LEMP stack và phụ thuộc..."
    local packages=(
        nginx mysql-server php8.3-fpm php8.3-mysql php8.3-curl php8.3-gd php8.3-intl
        php8.3-xmlrpc php8.3-apcu php8.3-ldap php8.3-imap php8.3-xml php8.3-mbstring
        php8.3-bz2 php8.3-zip php8.3-bcmath certbot python3-certbot-nginx
        curl wget unzip vim dnsutils openssl git cron ufw fail2ban composer
    )
    apt install -y "${packages[@]}"

    # Cấu hình MySQL
    log_and_echo "Cấu hình MySQL..."
    DB_NAME="glpi_db"
    DB_USER="glpi_user"
    DB_PASSWORD=$(generate_password)
    MYSQL_ROOT_PASSWORD=$(generate_password)
    
    mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASSWORD';"
    
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<EOF
DROP USER IF EXISTS '$DB_USER'@'localhost';
DROP DATABASE IF EXISTS $DB_NAME;
CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '$DB_USER'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF
    
    # Lưu thông tin
    echo "MySQL Root Password: $MYSQL_ROOT_PASSWORD" >> "$INFO_FILE"
    echo "GLPI Database Name: $DB_NAME" >> "$INFO_FILE"
    echo "GLPI Database User: $DB_USER" >> "$INFO_FILE"
    echo "GLPI Database Password: $DB_PASSWORD" >> "$INFO_FILE"

    # Tải và cài đặt GLPI
    log_and_echo "Tải và cài đặt GLPI $GLPI_VERSION..."
    cd /tmp
    local tgz_file="glpi-$GLPI_VERSION.tgz"
    wget "https://github.com/glpi-project/glpi/releases/download/$GLPI_VERSION/$tgz_file"
    
    if [[ $? -ne 0 ]]; then
        echo -e "${RED}Lỗi: Không thể tải file GLPI.${NC}"
        exit 1
    fi
    
    tar -xzf "$tgz_file"
    rm -rf "$INSTALL_DIR"
    mv glpi "$INSTALL_DIR"
    rm "$tgz_file"

    chown -R www-data:www-data "$INSTALL_DIR"
    find "$INSTALL_DIR" -type d -exec chmod 755 {} \;
    find "$INSTALL_DIR" -type f -exec chmod 644 {} \;

    # Cấu hình PHP
    log_and_echo "Cấu hình PHP..."
    local php_ini="/etc/php/8.3/fpm/php.ini"
    sed -i "s/memory_limit = .*/memory_limit = 256M/;
           s/upload_max_filesize = .*/upload_max_filesize = 64M/;
           s/post_max_size = .*/post_max_size = 64M/;
           s/max_execution_time = .*/max_execution_time = 300/;
           s/;date.timezone.*/date.timezone = Asia\/Ho_Chi_Minh/;
           s/expose_php = On/expose_php = Off/" "$php_ini"
    systemctl restart php8.3-fpm

    # Cấu hình Nginx
    log_and_echo "Cấu hình Nginx..."
    local nginx_conf="/etc/nginx/sites-available/$DOMAIN_NAME"
    cat > "$nginx_conf" <<EOF
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

    location ~ \.php\$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)\$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~ /\. { deny all; }
    location ~ ^/(config|templates|inc|vendor|tests|scripts|tools|install)/ { deny all; }
}
EOF

    ln -sf "$nginx_conf" "/etc/nginx/sites-enabled/"
    rm -f "/etc/nginx/sites-enabled/default"
    nginx -t && systemctl restart nginx

    # Cài đặt SSL
    if [[ ! "$DOMAIN_NAME" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        if nslookup "$DOMAIN_NAME" &>/dev/null; then
            log_and_echo "Cài đặt SSL với Certbot..."
            certbot --nginx -d "$DOMAIN_NAME" --non-interactive --agree-tos --email "admin@$DOMAIN_NAME" --redirect || true
        else
            echo -e "${YELLOW}Cảnh báo: DNS chưa phân giải. Bỏ qua SSL.${NC}"
        fi
    fi

    # Cấu hình database
    log_and_echo "Cấu hình database GLPI..."
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
    
    log_and_echo "Cài đặt GLPI hoàn tất."
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MODULE 2: BACKUP TỰ ĐỘNG
# ==============================================================================
setup_backup_module() {
    if ! read_install_info; then 
        echo -e "${RED}Chưa có thông tin cài đặt. Vui lòng cài đặt GLPI trước.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    if crontab -l 2>/dev/null | grep -q "glpi_backup.sh"; then 
        echo -e "${YELLOW}Backup tự động đã được cấu hình.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

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

# Backup database
mysqldump -u "\$DB_USER" -p"\$DB_PASSWORD" "\$DB_NAME" | gzip > "\$BACKUP_DIR/glpi_db_\$DATE.sql.gz"

# Backup files
tar -czf "\$BACKUP_DIR/glpi_files_\$DATE.tar.gz" -C "\$(dirname "\$INSTALL_DIR")" "\$(basename "\$INSTALL_DIR")"

# Xóa backup cũ hơn 7 ngày
find "\$BACKUP_DIR" -type f -mtime +7 -delete
EOF

    chmod +x /usr/local/bin/glpi_backup.sh
    (crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/glpi_backup.sh") | crontab -
    log_and_echo "Đã cấu hình backup hàng ngày lúc 2:00 sáng."
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MODULE 3: CẬP NHẬT GLPI
# ==============================================================================
update_glpi_module() {
    if ! read_install_info; then 
        echo -e "${RED}Chưa có thông tin cài đặt.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    if [[ ! -f "$INSTALL_DIR/inc/define.php" ]]; then
        echo -e "${RED}File define.php không tồn tại.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    CURRENT_VERSION=$(grep "define('GLPI_VERSION'" "$INSTALL_DIR/inc/define.php" | cut -d "'" -f 4)
    LATEST_VERSION=$(curl -s https://api.github.com/repos/glpi-project/glpi/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    
    echo -e "Hiện tại: ${BLUE}$CURRENT_VERSION${NC} | Mới nhất: ${GREEN}$LATEST_VERSION${NC}"

    if [[ "$CURRENT_VERSION" == "$LATEST_VERSION" ]]; then
        log_and_echo "Đang sử dụng phiên bản mới nhất."
    else
        read -p "Cập nhật lên $LATEST_VERSION? (y/N): " choice
        if [[ "$choice" == "y" || "$choice" == "Y" ]]; then
            log_and_echo "Bắt đầu cập nhật..."
            
            # Backup trước khi cập nhật
            /usr/local/bin/glpi_backup.sh
            
            # Kích hoạt chế độ bảo trì
            cd "$INSTALL_DIR" && php bin/console glpi:maintenance:enable
            
            # Tải và cài đặt phiên bản mới
            cd /tmp
            wget "https://github.com/glpi-project/glpi/releases/download/$LATEST_VERSION/glpi-$LATEST_VERSION.tgz"
            tar -xzf "glpi-$LATEST_VERSION.tgz"
            
            # Sao lưu cài đặt hiện tại
            mv "$INSTALL_DIR" "$INSTALL_DIR.bak"
            mv glpi "$INSTALL_DIR"
            
            # Khôi phục cấu hình và dữ liệu
            cp -rp "$INSTALL_DIR.bak/config" "$INSTALL_DIR/"
            cp -rp "$INSTALL_DIR.bak/files" "$INSTALL_DIR/"
            chown -R www-data:www-data "$INSTALL_DIR"
            
            # Cập nhật database
            cd "$INSTALL_DIR"
            php bin/console glpi:database:update --no-interaction
            php bin/console glpi:maintenance:disable
            
            log_and_echo "Cập nhật thành công đến $LATEST_VERSION."
        fi
    fi
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MODULE 4: BẢO MẬT SERVER
# ==============================================================================
harden_server_module() {
    log_and_echo "Bảo mật server..."

    # UFW
    ufw --force enable
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow "$SSH_NEW_PORT/tcp"
    ufw --force reload

    # Fail2Ban
    if ! systemctl is-active --quiet fail2ban; then
        cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = $SSH_NEW_PORT
logpath = /var/log/auth.log
EOF
        systemctl restart fail2ban
    fi

    # Hardening SSH
    sed -i "s/#Port 22/Port $SSH_NEW_PORT/" /etc/ssh/sshd_config
    sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    
    echo -e "${RED}CẢNH BÁO: Port SSH đổi thành $SSH_NEW_PORT, vô hiệu hóa root login.${NC}"
    read -p "Khởi động lại SSH? (y/N): " restart_ssh
    [[ "$restart_ssh" == "y" || "$restart_ssh" == "Y" ]] && systemctl restart sshd
    
    log_and_echo "Bảo mật server hoàn tất."
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# MODULE 5: CÀI ĐẶT PLUGIN
# ==============================================================================
install_plugins_module() {
    if ! read_install_info; then 
        echo -e "${RED}Vui lòng cài đặt GLPI trước.${NC}"
        read -p "Nhấn Enter để quay lại menu..."
        return
    fi

    for PLUGIN_URL in "${PLUGINS_TO_INSTALL[@]}"; do
        local PLUGIN_NAME=$(basename "$PLUGIN_URL" .git)
        
        if [[ -d "$INSTALL_DIR/plugins/$PLUGIN_NAME" ]]; then
            log_and_echo "Plugin $PLUGIN_NAME đã tồn tại."
            continue
        fi
        
        log_and_echo "Cài đặt plugin: $PLUGIN_NAME..."
        cd "$INSTALL_DIR/plugins"
        
        if git clone "$PLUGIN_URL"; then
            chown -R www-data:www-data "$PLUGIN_NAME"
            cd "$INSTALL_DIR"
            php bin/console glpi:plugin:install "$PLUGIN_NAME"
            php bin/console glpi:plugin:activate "$PLUGIN_NAME"
            log_and_echo "Đã cài đặt và kích hoạt $PLUGIN_NAME."
        else
            echo -e "${RED}Không thể cài plugin từ $PLUGIN_URL${NC}"
        fi
    done
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# Vòng lặp chính
# ==============================================================================
main_loop() {
    while true; do
        show_menu
        read -p "Chọn [1-7]: " choice
        case $choice in
            1) 
                install_glpi_module
                read_install_info
                setup_backup_module
                update_glpi_module
                harden_server_module
                install_plugins_module
                ;;
            2) install_glpi_module ;;
            3) setup_backup_module ;;
            4) update_glpi_module ;;
            5) harden_server_module ;;
            6) install_plugins_module ;;
            7) exit 0 ;;
            *) echo -e "${RED}Lựa chọn không hợp lệ.${NC}" ;;
        esac
    done
}

# ==============================================================================
# THỰC THI CHÍNH
# ==============================================================================
check_root
get_latest_glpi_version
PUBLIC_IP=$(curl -s --max-time 10 ifconfig.me || echo "unknown")

main_loop