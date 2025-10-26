---
term: Horizon
category: Desktop_Virtualization
language: vi
---

Horizon là nền tảng Desktop và Application Virtualization của VMware cung cấp giải pháp Virtual Desktop Infrastructure (VDI) và Published Desktop/Applications. Horizon cho phép các tổ chức cung cấp desktop và ứng dụng ảo hóa đến người dùng cuối từ trung tâm dữ liệu hoặc cloud một cách an toàn và hiệu quả.

## Tổng quan

Horizon có các đặc điểm chính sau:
- Giải pháp VDI và application virtualization toàn diện
- Hỗ trợ deployment on-premises và cloud
- Cung cấp trải nghiệm người dùng nhất quán
- Tích hợp chặt chẽ với hệ sinh thái VMware

## Kiến trúc

### Các thành phần chính
Horizon bao gồm các thành phần sau:
- **Horizon Connection Server**: Máy chủ kết nối quản lý người dùng
- **Horizon Agent**: Tác nhân trên desktop ảo
- **Horizon Client**: Client cho người dùng truy cập
- **Horizon Administrator Console**: Giao diện quản lý tập trung

### Các loại desktop
- **Full Clones**: Desktop hoàn chỉnh từ master image
- **Linked Clones**: Desktop chia sẻ disk với master image
- **Instant Clones**: Desktop tạo nhanh với hiệu suất cao
- **RDS Desktops**: Desktop dựa trên Remote Desktop Services

## Các tính năng chính

### Desktop Delivery
- **Pool Management**: Quản lý nhóm desktop
- **User Assignment**: Gán desktop cho người dùng
- **Session Management**: Quản lý session người dùng
- **Load Balancing**: Cân bằng tải giữa các desktop

### Application Delivery
- **Published Applications**: Ứng dụng được publish riêng lẻ
- **RDS Farms**: Farm ứng dụng RDS
- **Application Pooling**: Nhóm ứng dụng
- **User Entitlement**: Quyền truy cập ứng dụng

### Bảo mật
- **Tunneling**: Đường hầm bảo mật cho kết nối
- **Certificate Management**: Quản lý chứng chỉ
- **Smart Card Authentication**: Xác thực bằng smart card
- **Two-Factor Authentication**: Xác thực hai yếu tố

## Horizon 8 Cải tiến

### Hiệu suất
- Cải thiện hiệu suất cho Instant Clones
- Tối ưu hóa băng thông mạng
- Hỗ trợ các giao thức display mới
- Cải thiện trải nghiệm người dùng

### Tích hợp cloud
- Hỗ trợ VMware Cloud on AWS
- Tích hợp với vSphere with Tanzu
- Hỗ trợ hybrid cloud deployment
- Cải thiện khả năng mở rộng

### Quản lý
- Giao diện người dùng trực quan hơn
- PowerCLI nâng cao cho quản lý
- Template và profile cho cấu hình nhất quán
- Cải thiện khả năng giám sát

## Các loại deployment

### On-Premises
- Triển khai trong trung tâm dữ liệu
- Toàn bộ kiểm soát bởi tổ chức
- Hỗ trợ các phiên bản Horizon khác nhau
- Yêu cầu hạ tầng vật lý

### Cloud
- Triển khai trên VMware Cloud on AWS
- Quản lý bởi VMware hoặc đối tác
- Dễ dàng mở rộng và thu nhỏ
- Giảm chi phí hạ tầng ban đầu

### Hybrid
- Kết hợp on-premises và cloud
- Linh hoạt trong việc phân bổ workload
- Tối ưu chi phí và hiệu suất
- Hỗ trợ di chuyển workload

## Cấu hình

### Các bước cơ bản
1. Cài đặt Horizon Connection Server
2. Cấu hình Active Directory
3. Tạo desktop pools
4. Cấu hình Horizon Agent
5. Triển khai Horizon Client
6. Gán người dùng và kiểm tra

### Các tham số quan trọng
- **Farm Settings**: Cấu hình farm cho RDS
- **Pool Settings**: Cấu hình pool cho VDI
- **Protocol Settings**: Cấu hình giao thức display
- **Security Settings**: Cấu hình bảo mật

## Thực hành tốt nhất

1. **Lập kế hoạch**: Xác định yêu cầu và quy mô
2. **Kiểm thử**: Kiểm tra trước khi triển khai production
3. **Giám sát**: Theo dõi hiệu suất và trải nghiệm người dùng
4. **Tài liệu**: Ghi chép cấu hình và quy trình
5. **Bảo trì**: Lên kế hoạch cập nhật và bảo trì

## Lệnh quản lý

```powershell
# Kết nối đến Horizon Connection Server
Connect-HVServer -Server "horizon-server.domain.local"

# Xem desktop pools
Get-HVPool

# Tạo desktop pool mới
New-HVPool -PoolSettings $poolSettings

# Xem trạng thái Horizon
Get-HVHealth
```

## Các công nghệ liên quan

- [Virtual Desktop Infrastructure](/glossary/term/virtual-desktop-infrastructure)
- [Application Virtualization](/glossary/term/application-virtualization)
- [VDI](/glossary/term/vdi)
- [Remote Desktop Services](/glossary/term/remote-desktop-services)