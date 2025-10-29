#!/bin/bash

# ==============================================================================
# Script Quản Lý Keycloak Toàn Diện cho Ubuntu 24.04 (Phiên bản Menu Nâng cao)
# Mô tả: Công cụ menu-driven để cài đặt, quản lý, bảo mật và cập nhật Keycloak.
# ==============================================================================

# --- CẤU HÌNH TOÀN CỤC ---
CONFIG_FILE="keycloak_install_info.txt"
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
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $message" >> "$CONFIG_FILE"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "${RED}Lỗi: Script này phải được chạy với quyền root (sudo).${NC}" 1>&2
        exit 1
    fi
}

check_dependencies() {
    local deps=("curl" "wget" "unzip" "tar" "mysql" "nginx" "java")
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

generate_password() {
    openssl rand -base64 32
}

get_public_ip() {
    if [[ -z "$PUBLIC_IP" ]]; then
        PUBLIC_IP=$(curl -s --connect-timeout 10 ifconfig.me || curl -s --connect-timeout 10 icanhazip.com || echo "UNKNOWN")
    fi
    echo "$PUBLIC_IP"
}

read_config_info() {
    if [[ -f "$CONFIG_FILE" ]]; then
        DB_USER=$(grep "Database User:" "$CONFIG_FILE" | cut -d' ' -f3)
        DB_PASSWORD=$(grep "Database Password:" "$CONFIG_FILE" | cut -d' ' -f3)
        DB_NAME=$(grep "Database Name:" "$CONFIG_FILE" | cut -d' ' -f3)
        DOMAIN_NAME=$(grep "Domain:" "$CONFIG_FILE" | cut -d' ' -f2)
        KEYCLOAK_ADMIN=$(grep "Admin User:" "$CONFIG_FILE" | cut -d' ' -f3)
        KEYCLOAK_ADMIN_PASSWORD=$(grep "Admin Password:" "$CONFIG_FILE" | cut -d' ' -f3)
        CERT_EMAIL=$(grep "Certificate Email:" "$CONFIG_FILE" | cut -d' ' -f3)
        return 0
    fi
    return 1
}

cleanup_resources() {
    log_and_echo "Dọn dẹp tài nguyên tạm..."
    apt autoremove -y 2>/dev/null
    apt clean 2>/dev/null
    rm -rf /tmp/keycloak-* 2>/dev/null
    log_and_echo "Dọn dẹp hoàn tất."
}

# ==============================================================================
# HÀM YÊU CẦU THÔNG TIN TỪ NGƯỜI DÙNG
# ==============================================================================
get_user_input() {
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      CẤU HÌNH KEYCLOAK     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    # Kiểm tra cấu hình đã tồn tại
    if read_config_info; then
        echo -e "Tìm thấy thông tin cài đặt cũ:"
        echo -e "  Tên miền: ${GREEN}$DOMAIN_NAME${NC}"
        echo -e "  Database: ${GREEN}$DB_NAME${NC}"
        echo -e "  Admin user: ${GREEN}$KEYCLOAK_ADMIN${NC}"
        echo
        read -p "Bạn có muốn sử dụng lại cấu hình này không? (Y/n): " use_existing
        if [[ "$use_existing" != "n" && "$use_existing" != "N" ]]; then
            log_and_echo "Sử dụng cấu hình đã lưu."
            return
        fi
    fi
    
    # Nhập tên miền
    read -p "Nhập tên miền của bạn (ví dụ: keycloak.example.com): " DOMAIN_NAME
    if [[ -z "$DOMAIN_NAME" ]]; then
        get_public_ip > /dev/null
        DOMAIN_NAME="$PUBLIC_IP"
        log_and_echo "Không có tên miền được cung cấp, sử dụng IP: $DOMAIN_NAME"
    fi
    
    # Chọn loại database
    echo -e "\nLoại database hỗ trợ:"
    echo -e "  1. MySQL (mặc định)"
    echo -e "  2. MariaDB"
    read -p "Chọn loại database [1-2, mặc định: 1]: " db_choice
    case $db_choice in
        2) DB_TYPE="mariadb" ;;
        *) DB_TYPE="mysql" ;;
    esac
    
    # Cấu hình database
    read -p "Tên database cho Keycloak [mặc định: keycloak]: " DB_NAME
    if [[ -z "$DB_NAME" ]]; then
        DB_NAME="keycloak"
    fi
    
    read -p "Tên người dùng database [mặc định: keycloak_user]: " DB_USER
    if [[ -z "$DB_USER" ]]; then
        DB_USER="keycloak_user"
    fi
    
    read -s -p "Mật khẩu database (để trống để tạo tự động): " DB_PASSWORD
    echo
    if [[ -z "$DB_PASSWORD" ]]; then
        DB_PASSWORD=$(generate_password)
        log_and_echo "Đã tạo mật khẩu database tự động."
    fi
    
    # Cấu hình admin
    read -p "Tên người dùng admin Keycloak [mặc định: admin]: " KEYCLOAK_ADMIN
    if [[ -z "$KEYCLOAK_ADMIN" ]]; then
        KEYCLOAK_ADMIN="admin"
    fi
    
    read -s -p "Mật khẩu admin Keycloak (để trống để tạo tự động): " KEYCLOAK_ADMIN_PASSWORD
    echo
    if [[ -z "$KEYCLOAK_ADMIN_PASSWORD" ]]; then
        KEYCLOAK_ADMIN_PASSWORD=$(generate_password)
        log_and_echo "Đã tạo mật khẩu admin tự động."
    fi
    
    # Cấu hình SSL
    read -p "Email cho chứng chỉ Let's Encrypt: " CERT_EMAIL
    if [[ -z "$CERT_EMAIL" ]]; then
        CERT_EMAIL="admin@$DOMAIN_NAME"
        log_and_echo "Sử dụng email mặc định: $CERT_EMAIL"
    fi
    
    echo -e "\nChế độ SSL:"
    echo -e "  1. Online (Let's Encrypt) - Yêu cầu tên miền hợp lệ"
    echo -e "  2. Offline (Tự ký) - Phù hợp cho môi trường nội bộ"
    read -p "Chọn chế độ SSL [1-2, mặc định: 2]: " ssl_choice
    case $ssl_choice in
        1) SSL_MODE="online" ;;
        *) SSL_MODE="offline" ;;
    esac
    
    # Lưu cấu hình
    echo "=== THÔNG TIN CÀI ĐẶT KEYCLOAK - $(date) ===" > "$CONFIG_FILE"
    echo "Domain: $DOMAIN_NAME" >> "$CONFIG_FILE"
    echo "Database Type: $DB_TYPE" >> "$CONFIG_FILE"
    echo "Database Name: $DB_NAME" >> "$CONFIG_FILE"
    echo "Database User: $DB_USER" >> "$CONFIG_FILE"
    echo "Database Password: $DB_PASSWORD" >> "$CONFIG_FILE"
    echo "Admin User: $KEYCLOAK_ADMIN" >> "$CONFIG_FILE"
    echo "Admin Password: $KEYCLOAK_ADMIN_PASSWORD" >> "$CONFIG_FILE"
    echo "Certificate Email: $CERT_EMAIL" >> "$CONFIG_FILE"
    echo "SSL Mode: $SSL_MODE" >> "$CONFIG_FILE"
    
    echo -e "\n${GREEN}Thông tin cấu hình đã được lưu.${NC}"
}

# ==============================================================================
# MODULE 1: CẬP NHẬT HỆ THỐNG
# ==============================================================================
update_system_module() {
    local show_prompt=${1:-true}
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      CẬP NHẬT HỆ THỐNG     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    log_and_echo "Đang cập nhật hệ thống..."
    apt update && apt upgrade -y
    
    if [[ $? -eq 0 ]]; then
        log_and_echo "Cập nhật hệ thống thành công."
    else
        echo -e "${RED}Lỗi khi cập nhật hệ thống.${NC}"
    fi
    
    if [[ "$show_prompt" = true ]]; then
        read -p "Nhấn Enter để quay lại menu..."
    fi
}

# ==============================================================================
# MODULE 2: CÀI ĐẶT GÓI CẦN THIẾT
# ==============================================================================
install_packages_module() {
    local show_prompt=${1:-true}
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      CÀI ĐẶT GÓI CẦN THIẾT     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    log_and_echo "Đang cài đặt các gói cần thiết..."
    apt install -y wget curl gnupg software-properties-common apt-transport-https ca-certificates gnupg lsb-release unzip net-tools nginx certbot python3-certbot-nginx default-jre
    
    if [[ $? -eq 0 ]]; then
        log_and_echo "Cài đặt gói cần thiết thành công."
    else
        echo -e "${RED}Lỗi khi cài đặt các gói cần thiết.${NC}"
    fi
    
    if [[ "$show_prompt" = true ]]; then
        read -p "Nhấn Enter để quay lại menu..."
    fi
}

# ==============================================================================
# MODULE 3: CÀI ĐẶT DATABASE
# ==============================================================================
install_database_module() {
    local show_prompt=${1:-true}
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      CÀI ĐẶT DATABASE     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    if ! read_config_info; then
        echo -e "${RED}Chưa có thông tin cấu hình. Vui lòng chạy 'Cấu hình Keycloak' trước.${NC}"
        if [[ "$show_prompt" = true ]]; then
            read -p "Nhấn Enter để quay lại menu..."
        fi
        return
    fi
    
    log_and_echo "Đang cài đặt $DB_TYPE..."
    
    if [[ "$DB_TYPE" = "mysql" ]]; then
        # Cài đặt MySQL
        apt install -y mysql-server
        
        # Bắt đầu và kích hoạt MySQL
        systemctl start mysql
        systemctl enable mysql
        
        # Cấu hình MySQL
        mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';" 2>/dev/null
        mysql -e "FLUSH PRIVILEGES;"
        
        # Tạo database và người dùng
        mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
        mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
        mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
        mysql -e "FLUSH PRIVILEGES;"
        
    elif [[ "$DB_TYPE" = "mariadb" ]]; then
        # Cài đặt MariaDB
        apt install -y mariadb-server
        
        # Bắt đầu và kích hoạt MariaDB
        systemctl start mariadb
        systemctl enable mariadb
        
        # Cấu hình MariaDB
        mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '';" 2>/dev/null
        mysql -e "FLUSH PRIVILEGES;"
        
        # Tạo database và người dùng
        mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
        mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
        mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
        mysql -e "FLUSH PRIVILEGES;"
    else
        echo -e "${RED}Loại database không hợp lệ: $DB_TYPE${NC}"
        if [[ "$show_prompt" = true ]]; then
            read -p "Nhấn Enter để quay lại menu..."
        fi
        return
    fi
    
    if [[ $? -eq 0 ]]; then
        log_and_echo "Database đã được cài đặt và cấu hình thành công."
    else
        echo -e "${RED}Lỗi khi cài đặt hoặc cấu hình database.${NC}"
    fi
    
    if [[ "$show_prompt" = true ]]; then
        read -p "Nhấn Enter để quay lại menu..."
    fi
}

# ==============================================================================
# MODULE 4: CÀI ĐẶT KEYCLOAK
# ==============================================================================
install_keycloak_module() {
    local show_prompt=${1:-true}
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      CÀI ĐẶT KEYCLOAK     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    if ! read_config_info; then
        echo -e "${RED}Chưa có thông tin cấu hình. Vui lòng chạy 'Cấu hình Keycloak' trước.${NC}"
        if [[ "$show_prompt" = true ]]; then
            read -p "Nhấn Enter để quay lại menu..."
        fi
        return
    fi
    
    # Kiểm tra phiên bản Keycloak mới nhất
    log_and_echo "Đang kiểm tra phiên bản Keycloak mới nhất..."
    KEYCLOAK_VERSION=$(curl -s --connect-timeout 10 https://api.github.com/repos/keycloak/keycloak/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    if [[ -z "$KEYCLOAK_VERSION" ]]; then
        KEYCLOAK_VERSION="24.0.2"  # Phiên bản mặc định
        log_and_echo "Không thể lấy phiên bản mới nhất, sử dụng phiên bản mặc định: $KEYCLOAK_VERSION"
    else
        log_and_echo "Phiên bản mới nhất: $KEYCLOAK_VERSION"
    fi
    
    # Tải Keycloak
    log_and_echo "Đang tải Keycloak $KEYCLOAK_VERSION..."
    cd /tmp
    wget -q "https://github.com/keycloak/keycloak/releases/download/$KEYCLOAK_VERSION/keycloak-$KEYCLOAK_VERSION.tar.gz"
    
    if [[ $? -ne 0 ]]; then
        echo -e "${RED}Lỗi khi tải Keycloak. Vui lòng kiểm tra kết nối internet.${NC}"
        if [[ "$show_prompt" = true ]]; then
            read -p "Nhấn Enter để quay lại menu..."
        fi
        return
    fi
    
    # Giải nén
    log_and_echo "Đang giải nén Keycloak..."
    tar -xzf "keycloak-$KEYCLOAK_VERSION.tar.gz"
    
    # Di chuyển đến thư mục /opt
    log_and_echo "Đang cài đặt Keycloak..."
    rm -rf /opt/keycloak
    mv "keycloak-$KEYCLOAK_VERSION" /opt/keycloak
    
    # Tạo người dùng dịch vụ
    useradd -r -d /opt/keycloak -s /sbin/nologin keycloak 2>/dev/null
    
    # Cấp quyền sở hữu
    chown -R keycloak:keycloak /opt/keycloak
    
    # Cấu hình Keycloak
    log_and_echo "Đang cấu hình Keycloak..."
    
    # Tạo thư mục cấu hình nếu chưa tồn tại
    mkdir -p /opt/keycloak/conf
    
    # Tạo file cấu hình
    cat > /opt/keycloak/conf/keycloak.conf << EOF
# Database configuration
db=vendor
db-driver=$DB_TYPE
db-url=jdbc:$DB_TYPE://localhost:3306/$DB_NAME
db-username=$DB_USER
db-password=$DB_PASSWORD

# HTTP configuration
http-enabled=true
http-host=0.0.0.0
http-port=8080

# HTTPS configuration
https-port=8443

# Hostname configuration
hostname=$DOMAIN_NAME
hostname-strict-https=false

# Admin configuration
kc.admin=$KEYCLOAK_ADMIN
EOF

    # Tạo file systemd service
    cat > /etc/systemd/system/keycloak.service << EOF
[Unit]
Description=Keycloak Server
After=network.target

[Service]
Type=idle
User=keycloak
Group=keycloak
ExecStart=/opt/keycloak/bin/kc.sh start --auto-build
TimeoutStartSec=600
TimeoutStopSec=600

[Install]
WantedBy=multi-user.target
EOF

    # Kích hoạt và bắt đầu dịch vụ
    systemctl daemon-reload
    systemctl enable keycloak
    systemctl start keycloak
    
    # Chờ Keycloak khởi động
    log_and_echo "Đang khởi động Keycloak (vui lòng chờ)..."
    sleep 30
    
    # Kiểm tra trạng thái
    if systemctl is-active --quiet keycloak; then
        log_and_echo "Keycloak đã được cài đặt và khởi động thành công."
    else
        echo -e "${RED}Keycloak không thể khởi động.${NC}"
        systemctl status keycloak --no-pager
    fi
    
    if [[ "$show_prompt" = true ]]; then
        read -p "Nhấn Enter để quay lại menu..."
    fi
}

# ==============================================================================
# MODULE 5: CẤU HÌNH NGINX
# ==============================================================================
configure_nginx_module() {
    local show_prompt=${1:-true}
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      CẤU HÌNH NGINX     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    if ! read_config_info; then
        echo -e "${RED}Chưa có thông tin cấu hình. Vui lòng chạy 'Cấu hình Keycloak' trước.${NC}"
        if [[ "$show_prompt" = true ]]; then
            read -p "Nhấn Enter để quay lại menu..."
        fi
        return
    fi
    
    log_and_echo "Đang cấu hình Nginx..."
    
    # Tạo file cấu hình Nginx
    cat > /etc/nginx/sites-available/keycloak << EOF
server {
    listen 80;
    server_name $DOMAIN_NAME;
    
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

    # Kích hoạt site
    ln -sf /etc/nginx/sites-available/keycloak /etc/nginx/sites-enabled/
    
    # Xóa site mặc định
    rm -f /etc/nginx/sites-enabled/default
    
    # Kiểm tra cấu hình Nginx
    if nginx -t; then
        # Khởi động lại Nginx
        systemctl restart nginx
        systemctl enable nginx
        log_and_echo "Nginx đã được cấu hình thành công."
    else
        echo -e "${RED}Lỗi cấu hình Nginx.${NC}"
        nginx -t
    fi
    
    if [[ "$show_prompt" = true ]]; then
        read -p "Nhấn Enter để quay lại menu..."
    fi
}

# ==============================================================================
# MODULE 6: CẤU HÌNH SSL
# ==============================================================================
configure_ssl_module() {
    local show_prompt=${1:-true}
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      CẤU HÌNH SSL     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    if ! read_config_info; then
        echo -e "${RED}Chưa có thông tin cấu hình. Vui lòng chạy 'Cấu hình Keycloak' trước.${NC}"
        if [[ "$show_prompt" = true ]]; then
            read -p "Nhấn Enter để quay lại menu..."
        fi
        return
    fi
    
    if [[ "$SSL_MODE" = "online" ]] && [[ "$DOMAIN_NAME" != "localhost" ]] && [[ ! "$DOMAIN_NAME" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        log_and_echo "Đang cấu hình SSL với Let's Encrypt (online)..."
        
        # Kiểm tra DNS
        local domain_ip=$(dig +short "$DOMAIN_NAME" 2>/dev/null | head -1)
        get_public_ip > /dev/null
        if [[ "$domain_ip" != "$PUBLIC_IP" ]]; then
            echo -e "${YELLOW}Cảnh báo: Tên miền $DOMAIN_NAME chưa trỏ về IP $PUBLIC_IP${NC}"
            echo -e "${YELLOW}SSL Let's Encrypt có thể thất bại nếu DNS chưa được cập nhật.${NC}"
            read -p "Tiếp tục? (y/N): " continue_ssl
            if [[ "$continue_ssl" != "y" && "$continue_ssl" != "Y" ]]; then
                log_and_echo "Đã hủy cấu hình SSL."
                if [[ "$show_prompt" = true ]]; then
                    read -p "Nhấn Enter để quay lại menu..."
                fi
                return
            fi
        fi
        
        # Lấy chứng chỉ SSL
        if certbot --nginx -d "$DOMAIN_NAME" --non-interactive --agree-tos --email "$CERT_EMAIL"; then
            log_and_echo "Chứng chỉ SSL đã được cài đặt thành công."
        else
            echo -e "${RED}Lỗi khi lấy chứng chỉ SSL.${NC}"
        fi
        
    else
        log_and_echo "Đang tạo chứng chỉ SSL tự ký (offline)..."
        
        # Tạo thư mục cho chứng chỉ
        mkdir -p /etc/ssl/private
        
        # Tạo chứng chỉ tự ký
        if openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/ssl/private/keycloak-selfsigned.key \
            -out /etc/ssl/certs/keycloak-selfsigned.crt \
            -subj "/C=VN/ST=State/L=City/O=Organization/CN=$DOMAIN_NAME"; then
            
            # Cập nhật cấu hình Nginx
            cat > /etc/nginx/sites-available/keycloak << EOF
server {
    listen 80;
    server_name $DOMAIN_NAME;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN_NAME;
    
    ssl_certificate /etc/ssl/certs/keycloak-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/keycloak-selfsigned.key;
    
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
            
            # Kiểm tra và khởi động lại Nginx
            if nginx -t; then
                systemctl restart nginx
                log_and_echo "Chứng chỉ SSL tự ký đã được tạo và cài đặt thành công."
            else
                echo -e "${RED}Lỗi cấu hình Nginx sau khi cài SSL.${NC}"
                nginx -t
            fi
        else
            echo -e "${RED}Lỗi khi tạo chứng chỉ SSL tự ký.${NC}"
        fi
    fi
    
    if [[ "$show_prompt" = true ]]; then
        read -p "Nhấn Enter để quay lại menu..."
    fi
}

# ==============================================================================
# MODULE 7: CẤU HÌNH FIREWALL
# ==============================================================================
configure_firewall_module() {
    local show_prompt=${1:-true}
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      CẤU HÌNH FIREWALL     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    log_and_echo "Đang cấu hình firewall..."
    
    # Kiểm tra nếu UFW đang chạy
    if command -v ufw &> /dev/null; then
        # Cho phép SSH
        ufw allow ssh
        
        # Cho phép HTTP và HTTPS
        ufw allow 80/tcp
        ufw allow 443/tcp
        
        # Kích hoạt UFW
        if ufw --force enable; then
            log_and_echo "Firewall (UFW) đã được cấu hình thành công."
        else
            echo -e "${RED}Lỗi khi kích hoạt UFW.${NC}"
        fi
    else
        log_and_echo "UFW không được cài đặt. Bỏ qua cấu hình firewall."
    fi
    
    if [[ "$show_prompt" = true ]]; then
        read -p "Nhấn Enter để quay lại menu..."
    fi
}

# ==============================================================================
# MODULE 8: KIỂM TRA TRẠNG THÁI
# ==============================================================================
check_status_module() {
    local show_prompt=${1:-true}
    echo -e "\n${YELLOW}========================================${NC}"
    echo -e "${YELLOW}      KIỂM TRA TRẠNG THÁI     ${NC}"
    echo -e "${YELLOW}========================================${NC}\n"
    
    # Kiểm tra services
    local services=("nginx" "keycloak")
    if [[ "$DB_TYPE" = "mysql" ]]; then
        services+=("mysql")
    elif [[ "$DB_TYPE" = "mariadb" ]]; then
        services+=("mariadb")
    fi
    
    echo -e "Trạng thái services:"
    for service in "${services[@]}"; do
        if systemctl is-active --quiet "$service"; then
            echo -e "  ✅ $service: ${GREEN}Đang chạy${NC}"
        else
            echo -e "  ❌ $service: ${RED}Không chạy${NC}"
        fi
    done
    
    # Kiểm tra port
    echo -e "\nKiểm tra port:"
    if nc -z localhost 8080; then
        echo -e "  ✅ Port 8080 (Keycloak): ${GREEN}Mở${NC}"
    else
        echo -e "  ❌ Port 8080 (Keycloak): ${RED}Đóng${NC}"
    fi
    
    if nc -z localhost 80; then
        echo -e "  ✅ Port 80 (HTTP): ${GREEN}Mở${NC}"
    else
        echo -e "  ❌ Port 80 (HTTP): ${RED}Đóng${NC}"
    fi
    
    if nc -z localhost 443; then
        echo -e "  ✅ Port 443 (HTTPS): ${GREEN}Mở${NC}"
    else
        echo -e "  ❌ Port 443 (HTTPS): ${RED}Đóng${NC}"
    fi
    
    # Hiển thị thông tin cấu hình nếu có
    if read_config_info; then
        echo -e "\nThông tin cấu hình:"
        echo -e "  Tên miền: ${GREEN}$DOMAIN_NAME${NC}"
        echo -e "  Database: ${GREEN}$DB_NAME${NC} ($DB_TYPE)"
        echo -e "  Admin user: ${GREEN}$KEYCLOAK_ADMIN${NC}"
        echo -e "  SSL Mode: ${GREEN}$SSL_MODE${NC}"
    fi
    
    if [[ "$show_prompt" = true ]]; then
        read -p "Nhấn Enter để quay lại menu..."
    fi
}

# ==============================================================================
# MENU CHÍNH
# ==============================================================================
show_menu() {
    clear
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}   CÔNG CỤ QUẢN LÝ KEYCLOAK TOÀN DIỆN   ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "  1. Chạy tất cả (Cài đặt đầy đủ)"
    echo -e "  2. Cấu hình Keycloak"
    echo -e "  3. Cập nhật hệ thống"
    echo -e "  4. Cài đặt gói cần thiết"
    echo -e "  5. Cài đặt Database"
    echo -e "  6. Cài đặt Keycloak"
    echo -e "  7. Cấu hình Nginx"
    echo -e "  8. Cấu hình SSL"
    echo -e "  9. Cấu hình Firewall"
    echo -e "  10. Kiểm tra trạng thái"
    echo -e "  99. Thoát"
    echo -e "${GREEN}========================================${NC}"
}

show_final_info() {
    if ! read_config_info; then 
        return
    fi
    
    echo -e "\n${GREEN}================================================================================================${NC}"
    echo -e "${GREEN}            TẤT CẢ CÁC TÁC VỤ ĐÃ HOÀN TẤT!${NC}"
    echo -e "${GREEN}================================================================================================${NC}"
    
    local url_scheme="https"
    echo -e "URL truy cập: ${YELLOW}$url_scheme://$DOMAIN_NAME${NC}"
    echo -e "Tài khoản admin: ${YELLOW}$KEYCLOAK_ADMIN${NC}"
    echo -e "Mật khẩu admin: ${YELLOW}$KEYCLOAK_ADMIN_PASSWORD${NC}"
    echo -e "\n${RED}LƯU Ý QUAN TRỌNG:${NC}"
    echo -e "1. Hãy đổi mật khẩu admin ngay lập tức sau khi đăng nhập lần đầu."
    echo -e "2. Toàn bộ thông tin quan trọng đã được lưu vào file: ${YELLOW}$(pwd)/$CONFIG_FILE${NC}"
    echo -e "3. Nếu bạn đang dùng chứng chỉ tự ký, trình duyệt sẽ cảnh báo về chứng chỉ không đáng tin cậy."
    echo -e "${GREEN}================================================================================================${NC}"
    read -p "Nhấn Enter để quay lại menu..."
}

# ==============================================================================
# Vòng lặp chính
# ==============================================================================
main_loop() {
    while true; do
        show_menu
        read -p "Nhập lựa chọn của bạn [1-10] hoặc 99 để thoát: " choice
        case $choice in
            1) 
                echo -e "${GREEN}Chạy tất cả các module...${NC}"
                get_user_input
                update_system_module false
                install_packages_module false
                install_database_module false
                install_keycloak_module false
                configure_nginx_module false
                configure_ssl_module false
                configure_firewall_module false
                show_final_info
                ;;
            2) get_user_input ;;
            3) update_system_module true ;;
            4) install_packages_module true ;;
            5) install_database_module true ;;
            6) install_keycloak_module true ;;
            7) configure_nginx_module true ;;
            8) configure_ssl_module true ;;
            9) configure_firewall_module true ;;
            10) check_status_module true ;;
            99) echo -e "Thoát script."; exit 0 ;;
            *) echo -e "${RED}Lựa chọn không hợp lệ. Vui lòng chọn lại.${NC}"; sleep 2 ;;
        esac
    done
}

# ==============================================================================
# THỰC THI CHÍNH
# ==============================================================================

check_root

echo -e "${GREEN}Khởi động công cụ quản lý Keycloak toàn diện...${NC}"

# Kiểm tra và cài đặt prerequisites
check_dependencies || {
    read -p "Có dependencies bị thiếu. Tiếp tục cài đặt tự động? (y/N): " continue_choice
    if [[ "$continue_choice" != "y" && "$continue_choice" != "Y" ]]; then
        exit 1
    fi
}

log_and_echo "Đang cài đặt các gói công cụ cần thiết cho script..."
apt update
apt install -y curl wget openssl dnsutils netcat

# Bắt đầu vòng lặp menu
main_loop