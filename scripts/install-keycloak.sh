#!/bin/bash

# Kịch bản cài đặt Keycloak trên Ubuntu 24.04 LTS
# Sử dụng Nginx làm reverse proxy và MySQL/MariaDB làm database

# Đặt màu cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Hàm hiển thị thông báo
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Hàm kiểm tra lỗi
check_error() {
    if [ $? -ne 0 ]; then
        log_error "$1"
        exit 1
    fi
}

# Biến cấu hình
KEYCLOAK_VERSION="24.0.2"  # Phiên bản mới nhất tại thời điểm viết script
DB_TYPE="mysql"  # Mặc định là mysql, có thể thay đổi thành mariadb
SSL_MODE="offline"  # Mặc định là offline, có thể thay đổi thành online

# Hàm lấy thông tin từ người dùng
get_user_input() {
    echo -e "${GREEN}=== CẤU HÌNH KEYCLOAK ===${NC}"
    
    read -p "Nhập tên miền của bạn (ví dụ: example.com): " DOMAIN
    if [ -z "$DOMAIN" ]; then
        DOMAIN="localhost"
        log_warn "Không có tên miền được cung cấp, sử dụng localhost"
    fi
    
    read -p "Loại database (mysql/mariadb) [mặc định: mysql]: " DB_TYPE_INPUT
    if [ -n "$DB_TYPE_INPUT" ]; then
        DB_TYPE=$DB_TYPE_INPUT
    fi
    
    read -p "Tên database cho Keycloak [mặc định: keycloak]: " DB_NAME
    if [ -z "$DB_NAME" ]; then
        DB_NAME="keycloak"
    fi
    
    read -p "Tên người dùng database [mặc định: keycloak_user]: " DB_USER
    if [ -z "$DB_USER" ]; then
        DB_USER="keycloak_user"
    fi
    
    read -s -p "Mật khẩu database: " DB_PASSWORD
    echo
    if [ -z "$DB_PASSWORD" ]; then
        DB_PASSWORD=$(openssl rand -base64 16)
        log_warn "Không có mật khẩu được cung cấp, sử dụng mật khẩu ngẫu nhiên: $DB_PASSWORD"
    fi
    
    read -p "Tên người dùng admin Keycloak [mặc định: admin]: " KEYCLOAK_ADMIN
    if [ -z "$KEYCLOAK_ADMIN" ]; then
        KEYCLOAK_ADMIN="admin"
    fi
    
    read -s -p "Mật khẩu admin Keycloak: " KEYCLOAK_ADMIN_PASSWORD
    echo
    if [ -z "$KEYCLOAK_ADMIN_PASSWORD" ]; then
        KEYCLOAK_ADMIN_PASSWORD=$(openssl rand -base64 16)
        log_warn "Không có mật khẩu được cung cấp, sử dụng mật khẩu ngẫu nhiên: $KEYCLOAK_ADMIN_PASSWORD"
    fi
    
    read -p "Email cho chứng chỉ Let's Encrypt: " CERT_EMAIL
    if [ -z "$CERT_EMAIL" ]; then
        CERT_EMAIL="admin@example.com"
        log_warn "Không có email được cung cấp, sử dụng email mặc định: $CERT_EMAIL"
    fi
    
    read -p "Chế độ SSL (online/offline) [mặc định: offline]: " SSL_MODE_INPUT
    if [ -n "$SSL_MODE_INPUT" ]; then
        SSL_MODE=$SSL_MODE_INPUT
    fi
    
    # Hiển thị thông tin cấu hình
    echo -e "\n${GREEN}=== THÔNG TIN CẤU HÌNH ===${NC}"
    echo "Tên miền: $DOMAIN"
    echo "Loại database: $DB_TYPE"
    echo "Tên database: $DB_NAME"
    echo "Tên người dùng database: $DB_USER"
    echo "Tên người dùng admin Keycloak: $KEYCLOAK_ADMIN"
    echo "Email chứng chỉ: $CERT_EMAIL"
    echo "Chế độ SSL: $SSL_MODE"
    echo -e "${GREEN}========================${NC}\n"
    
    read -p "Xác nhận cấu hình (y/n): " CONFIRM
    if [ "$CONFIRM" != "y" ]; then
        log_error "Cấu hình không được xác nhận. Thoát."
        exit 1
    fi
}

# Hàm cập nhật hệ thống
update_system() {
    log_info "Cập nhật hệ thống..."
    apt update && apt upgrade -y
    check_error "Không thể cập nhật hệ thống"
}

# Hàm cài đặt các gói cần thiết
install_packages() {
    log_info "Cài đặt các gói cần thiết..."
    apt install -y wget curl gnupg software-properties-common apt-transport-https ca-certificates gnupg lsb-release unzip net-tools nginx certbot python3-certbot-nginx default-jre
    check_error "Không thể cài đặt các gói cần thiết"
}

# Hàm cài đặt database
install_database() {
    log_info "Cài đặt $DB_TYPE..."
    
    if [ "$DB_TYPE" = "mysql" ]; then
        # Cài đặt MySQL
        apt install -y mysql-server
        check_error "Không thể cài đặt MySQL"
        
        # Bắt đầu và kích hoạt MySQL
        systemctl start mysql
        systemctl enable mysql
        
        # Cấu hình MySQL
        mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';"
        mysql -e "FLUSH PRIVILEGES;"
        
        # Tạo database và người dùng
        mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
        mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
        mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
        mysql -e "FLUSH PRIVILEGES;"
        
    elif [ "$DB_TYPE" = "mariadb" ]; then
        # Cài đặt MariaDB
        apt install -y mariadb-server
        check_error "Không thể cài đặt MariaDB"
        
        # Bắt đầu và kích hoạt MariaDB
        systemctl start mariadb
        systemctl enable mariadb
        
        # Cấu hình MariaDB
        mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '';"
        mysql -e "FLUSH PRIVILEGES;"
        
        # Tạo database và người dùng
        mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
        mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
        mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
        mysql -e "FLUSH PRIVILEGES;"
    else
        log_error "Loại database không hợp lệ: $DB_TYPE"
        exit 1
    fi
    
    log_info "Database đã được cài đặt và cấu hình thành công"
}

# Hàm cài đặt Keycloak
install_keycloak() {
    log_info "Tải và cài đặt Keycloak $KEYCLOAK_VERSION..."
    
    # Tải Keycloak
    cd /opt
    wget -q https://github.com/keycloak/keycloak/releases/download/$KEYCLOAK_VERSION/keycloak-$KEYCLOAK_VERSION.tar.gz
    check_error "Không thể tải Keycloak"
    
    # Giải nén
    tar -xzf keycloak-$KEYCLOAK_VERSION.tar.gz
    check_error "Không thể giải nén Keycloak"
    
    # Đổi tên thư mục
    mv keycloak-$KEYCLOAK_VERSION keycloak
    
    # Tạo người dùng dịch vụ
    useradd -r -d /opt/keycloak -s /sbin/nologin keycloak
    
    # Cấp quyền sở hữu
    chown -R keycloak:keycloak /opt/keycloak
    
    # Cấu hình Keycloak
    log_info "Cấu hình Keycloak..."
    
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
hostname=$DOMAIN
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
    log_info "Chờ Keycloak khởi động..."
    sleep 30
    
    # Kiểm tra trạng thái
    if systemctl is-active --quiet keycloak; then
        log_info "Keycloak đã được cài đặt và khởi động thành công"
    else
        log_error "Keycloak không thể khởi động"
        systemctl status keycloak
        exit 1
    fi
}

# Hàm cấu hình Nginx
configure_nginx() {
    log_info "Cấu hình Nginx..."
    
    # Tạo file cấu hình Nginx
    cat > /etc/nginx/sites-available/keycloak << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
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
    ln -s /etc/nginx/sites-available/keycloak /etc/nginx/sites-enabled/
    
    # Xóa site mặc định
    rm -f /etc/nginx/sites-enabled/default
    
    # Kiểm tra cấu hình Nginx
    nginx -t
    check_error "Cấu hình Nginx không hợp lệ"
    
    # Khởi động lại Nginx
    systemctl restart nginx
    systemctl enable nginx
    
    log_info "Nginx đã được cấu hình thành công"
}

# Hàm cấu hình SSL
configure_ssl() {
    if [ "$SSL_MODE" = "online" ] && [ "$DOMAIN" != "localhost" ]; then
        log_info "Cấu hình SSL với Let's Encrypt (online)..."
        
        # Lấy chứng chỉ SSL
        certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email $CERT_EMAIL
        check_error "Không thể lấy chứng chỉ SSL"
        
        log_info "Chứng chỉ SSL đã được cài đặt thành công"
        
    else
        log_info "Tạo chứng chỉ SSL tự ký (offline)..."
        
        # Tạo thư mục cho chứng chỉ
        mkdir -p /etc/ssl/private
        
        # Tạo chứng chỉ tự ký
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/ssl/private/keycloak-selfsigned.key \
            -out /etc/ssl/certs/keycloak-selfsigned.crt \
            -subj "/C=VN/ST=State/L=City/O=Organization/CN=$DOMAIN"
        check_error "Không thể tạo chứng chỉ SSL tự ký"
        
        # Cập nhật cấu hình Nginx
        cat > /etc/nginx/sites-available/keycloak << EOF
server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN;
    
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
        nginx -t
        check_error "Cấu hình Nginx không hợp lệ"
        systemctl restart nginx
        
        log_info "Chứng chỉ SSL tự ký đã được tạo và cài đặt thành công"
    fi
}

# Hàm cấu hình firewall
configure_firewall() {
    log_info "Cấu hình firewall..."
    
    # Kiểm tra nếu UFW đang chạy
    if command -v ufw &> /dev/null; then
        # Cho phép SSH
        ufw allow ssh
        
        # Cho phép HTTP và HTTPS
        ufw allow 80/tcp
        ufw allow 443/tcp
        
        # Kích hoạt UFW
        ufw --force enable
        log_info "Firewall (UFW) đã được cấu hình"
    else
        log_warn "UFW không được cài đặt. Bỏ qua cấu hình firewall."
    fi
}

# Hàm hiển thị thông tin hoàn tất
show_completion_info() {
    log_info "Cài đặt Keycloak đã hoàn tất!"
    
    echo -e "\n${GREEN}=== THÔNG TIN ĐĂNG NHẬP ===${NC}"
    echo "URL: https://$DOMAIN"
    echo "Tên người dùng admin: $KEYCLOAK_ADMIN"
    echo "Mật khẩu admin: $KEYCLOAK_ADMIN_PASSWORD"
    echo -e "${GREEN}=============================${NC}\n"
    
    echo -e "\n${GREEN}=== THÔNG TIN DATABASE ===${NC}"
    echo "Loại database: $DB_TYPE"
    echo "Tên database: $DB_NAME"
    echo "Tên người dùng: $DB_USER"
    echo "Mật khẩu: $DB_PASSWORD"
    echo -e "${GREEN}=========================${NC}\n"
    
    echo -e "\n${GREEN}=== LƯU Ý QUAN TRỌNG ===${NC}"
    echo "1. Lưu lại thông tin đăng nhập và database ở trên"
    echo "2. Nếu bạn đang dùng chứng chỉ tự ký, trình duyệt sẽ cảnh báo về chứng chỉ không đáng tin cậy"
    echo "3. Để nâng cấp Keycloak trong tương lai, hãy dừng dịch vụ, tải phiên bản mới và làm theo các bước tương tự"
    echo -e "${GREEN}=========================${NC}\n"
}

# Hàm chính
main() {
    log_info "Bắt đầu cài đặt Keycloak trên Ubuntu 24.04 LTS"
    
    # Lấy thông tin từ người dùng
    get_user_input
    
    # Cập nhật hệ thống
    update_system
    
    # Cài đặt các gói cần thiết
    install_packages
    
    # Cài đặt database
    install_database
    
    # Cài đặt Keycloak
    install_keycloak
    
    # Cấu hình Nginx
    configure_nginx
    
    # Cấu hình SSL
    configure_ssl
    
    # Cấu hình firewall
    configure_firewall
    
    # Hiển thị thông tin hoàn tất
    show_completion_info
    
    log_info "Cài đặt hoàn tất!"
}

# Chạy hàm chính
main