---
term: vSphere Security Hardening Guide
category: Security
language: vi
---

vSphere Security Hardening Guide là tài liệu hướng dẫn toàn diện của VMware cung cấp các khuyến nghị và thực hành tốt nhất để bảo mật môi trường ảo hóa vSphere. Hướng dẫn này giúp các tổ chức triển khai các biện pháp bảo mật phù hợp để bảo vệ hạ tầng ảo hóa khỏi các mối đe dọa an ninh.

## Tổng quan

Security Hardening Guide có các đặc điểm chính sau:
- Tài liệu hướng dẫn bảo mật chính thức từ VMware
- Cung cấp khuyến nghị cho từng phiên bản vSphere
- Phân loại khuyến nghị theo mức độ rủi ro
- Hỗ trợ compliance và audit

## Kiến trúc

### Các thành phần chính
Hướng dẫn bao gồm các thành phần sau:
- **Security Recommendations**: Khuyến nghị bảo mật chi tiết
- **Risk Assessment**: Đánh giá mức độ rủi ro
- **Compliance Mapping**: Ánh xạ với các tiêu chuẩn bảo mật
- **Implementation Guidance**: Hướng dẫn triển khai

### Các lĩnh vực bảo mật
- **Host Security**: Bảo mật ESXi host
- **Virtual Machine Security**: Bảo mật máy ảo
- **Network Security**: Bảo mật mạng
- **Storage Security**: Bảo mật lưu trữ
- **Access Control**: Kiểm soát truy cập
- **Audit and Logging**: Kiểm toán và ghi log

## Các tính năng chính

### Phân loại khuyến nghị
- **Level 1**: Khuyến nghị cơ bản cho tất cả môi trường
- **Level 2**: Khuyến nghị nâng cao cho môi trường nhạy cảm
- **Optional**: Khuyến nghị tùy chọn theo nhu cầu

### Ánh xạ compliance
- **NIST SP 800-53**: Tiêu chuẩn bảo mật của NIST
- **CIS Controls**: Các điều khiển CIS
- **ISO 27001**: Tiêu chuẩn ISO 27001
- **PCI DSS**: Tiêu chuẩn PCI DSS

### Đánh giá rủi ro
- **Risk Rating**: Xếp hạng mức độ rủi ro
- **Impact Assessment**: Đánh giá tác động
- **Mitigation Strategy**: Chiến lược giảm thiểu
- **Implementation Priority**: Ưu tiên triển khai

## vSphere 8 Security Hardening Guide

### Các cải tiến mới
- Cập nhật khuyến nghị cho vSphere 8
- Hỗ trợ các công nghệ mới (Tanzu, NSX, vSAN)
- Tích hợp với vSphere Trust Authority
- Hỗ trợ VMware Cloud on AWS

### Các chủ đề chính
- **Identity and Access Management**: Quản lý danh tính và truy cập
- **Network Security**: Bảo mật mạng nâng cao
- **Data Protection**: Bảo vệ dữ liệu
- **Monitoring and Auditing**: Giám sát và kiểm toán
- **Incident Response**: Phản ứng sự cố

## Các khuyến nghị quan trọng

### ESXi Host Security
- **Secure Boot**: Bật Secure Boot trên host
- **Lockdown Mode**: Sử dụng Lockdown Mode
- **SSH Access**: Hạn chế truy cập SSH
- **Firewall Configuration**: Cấu hình firewall phù hợp

### Virtual Machine Security
- **VM Encryption**: Mã hóa máy ảo quan trọng
- **Guest OS Hardening**: Tăng cường bảo mật guest OS
- **VM Isolation**: Cách ly VM theo yêu cầu
- **Device Control**: Kiểm soát thiết bị VM

### Network Security
- **vSphere Distributed Switch**: Sử dụng vDS cho tính năng nâng cao
- **Network I/O Control**: Kiểm soát băng thông mạng
- **Private VLAN**: Sử dụng Private VLAN để phân đoạn
- **Firewall Rules**: Cấu hình firewall rules phù hợp

### Access Control
- **Role-Based Access Control**: Sử dụng RBAC phù hợp
- **Multi-Factor Authentication**: Xác thực đa yếu tố
- **Certificate Management**: Quản lý chứng chỉ
- **Password Policies**: Chính sách mật khẩu mạnh

## Triển khai

### Các bước cơ bản
1. Đánh giá môi trường hiện tại
2. Xác định mức độ bảo mật cần thiết
3. Áp dụng khuyến nghị Level 1
4. Triển khai khuyến nghị Level 2 (nếu cần)
5. Kiểm tra và xác minh

### Công cụ hỗ trợ
- **VMware Compliance Checker**: Công cụ kiểm tra compliance
- **PowerCLI Scripts**: Script tự động hóa
- **Third-party Tools**: Công cụ bên thứ ba
- **Manual Verification**: Kiểm tra thủ công

## Thực hành tốt nhất

1. **Đánh giá định kỳ**: Đánh giá bảo mật định kỳ
2. **Kiểm tra compliance**: Kiểm tra compliance thường xuyên
3. **Tài liệu**: Ghi chép các biện pháp bảo mật
4. **Đào tạo**: Đào tạo nhân viên về bảo mật
5. **Cập nhật**: Theo dõi cập nhật hướng dẫn mới

## Các công nghệ liên quan

- [vSphere Trust Authority](/glossary/term/vsphere-trust-authority.md)
- [VM Encryption](/glossary/term/vm-encryption)
- [Role-Based Access Control](/glossary/term/role-based-access-control)
- [Network Security](/glossary/term/network-security)