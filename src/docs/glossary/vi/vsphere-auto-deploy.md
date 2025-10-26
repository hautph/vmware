---
term: [VI] vSphere Auto Deploy
category: Core_Architecture
language: vi
---

vSphere Auto Deploy là công nghệ của VMware cho phép triển khai và quản lý ESXi host một cách tự động và không trạng thái (stateless). Nó giúp các tổ chức dễ dàng triển khai hàng loạt host ESXi với cấu hình nhất quán và giảm thiểu công việc quản lý thủ công.

## Tổng quan

vSphere Auto Deploy có các đặc điểm chính sau:
- Triển khai ESXi host tự động từ một image trung tâm
- Quản lý host không trạng thái (stateless) hoặc trạng thái (stateful)
- Đảm bảo cấu hình nhất quán giữa các host
- Giảm thời gian và công sức triển khai

## Kiến trúc

### Các thành phần chính
Auto Deploy bao gồm các thành phần sau:
- **Auto Deploy Server**: Dịch vụ trên vCenter Server xử lý các yêu cầu deploy
- **Image Profile**: Định nghĩa phiên bản ESXi và các gói VIB
- **Host Profile**: Định nghĩa cấu hình phần cứng và phần mềm cho host
- **Rule**: Quy tắc ánh xạ host với image và host profile
- **TFTP Server**: Phục vụ các file boot ban đầu

### Quy trình deploy
1. Host khởi động từ mạng (PXE boot)
2. Tải image ESXi từ Auto Deploy Server
3. Áp dụng Host Profile để cấu hình
4. Host sẵn sàng để sử dụng

## Các tính năng chính

### Triển khai hàng loạt
- Triển khai đồng thời hàng trăm host
- Đảm bảo cấu hình nhất quán
- Tự động đăng ký với vCenter Server
- Hỗ trợ rollback khi cần thiết

### Quản lý không trạng thái
- Host không lưu trữ hệ điều hành cục bộ
- Cấu hình được lưu trữ trung tâm
- Dễ dàng cập nhật và vá lỗi
- Phục hồi nhanh chóng sau sự cố

### Tùy chỉnh linh hoạt
- Tạo image profile tùy chỉnh
- Định nghĩa host profile theo yêu cầu
- Áp dụng rule cho các nhóm host khác nhau
- Hỗ trợ các thiết bị phần cứng khác nhau

## vSphere Auto Deploy 8 Cải tiến

### Hiệu suất nâng cao
- Tối ưu hóa tốc độ deploy
- Cải thiện hiệu suất mạng
- Hỗ trợ các thiết bị phần cứng mới

### Bảo mật
- Tích hợp với vSphere Trust Authority
- Hỗ trợ secure boot nâng cao
- Mã hóa giao tiếp giữa các thành phần

### Quản lý dễ dàng
- Giao diện người dùng trực quan hơn
- Tự động hóa quy trình nâng cấp
- Cải thiện khả năng giám sát và gỡ lỗi

## Thực hành tốt nhất

1. **Lập kế hoạch**: Thiết kế image và host profile trước khi triển khai
2. **Kiểm thử**: Luôn kiểm thử image mới trong môi trường thử nghiệm
3. **Sao lưu**: Sao lưu cấu hình và image định kỳ
4. **Giám sát**: Theo dõi hiệu suất và tình trạng deploy
5. **Tài liệu**: Ghi chép đầy đủ về các image và profile

## Lệnh quản lý

```powershell
# Kết nối đến vCenter Server
Connect-VIServer -Server "vcenter-server.domain.local"

# Liệt kê các image profile
Get-DeployImageProfile

# Tạo rule mới
New-DeployRule -Name "Rule01" -Item "ImageProfile01", "HostProfile01" -Pattern "ipv4=192.168.1.10-192.168.1.20"

# Áp dụng rule
Add-DeployRule -DeployRule "Rule01"

# Kiểm tra host được deploy
Get-VMHost | Select Name, ConnectionState, Version
```

## Các công nghệ liên quan

- [vSphere](/glossary/term/vsphere.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [Host Profile](/glossary/term/host-profile)