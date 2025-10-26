---
term: vSphere High Availability (HA)
category: Availability_Data_Protection
language: vi
---

vSphere High Availability (HA) là tính năng của VMware vSphere tự động khởi động lại các máy ảo trên các host khác trong cluster khi host hiện tại gặp sự cố. HA giúp đảm bảo tính sẵn sàng cao cho các ứng dụng và dịch vụ chạy trên máy ảo mà không yêu cầu cấu hình phức tạp.

## Tổng quan

HA có các đặc điểm chính sau:
- Tự động phát hiện sự cố host
- Khởi động lại VM trên host còn hoạt động
- Không yêu cầu cấu hình phức tạp
- Hỗ trợ các mức độ sẵn sàng khác nhau

## Kiến trúc

### Các thành phần chính
HA bao gồm các thành phần sau:
- **HA Agent**: Tác nhân chạy trên mỗi ESXi host
- **Master Node**: Host điều phối hoạt động HA
- **Slave Nodes**: Các host còn lại trong cluster
- **Heartbeat**: Cơ chế kiểm tra tình trạng host

### Cách thức hoạt động
1. HA Agent trên mỗi host gửi heartbeat
2. Master node giám sát heartbeat từ các slave
3. Khi phát hiện host lỗi, master node khởi động lại VM
4. VM được khởi động lại trên host còn hoạt động khác

## Các tính năng chính

### Phát hiện sự cố
- **Host Failure Detection**: Phát hiện host không phản hồi
- **Network Isolation Detection**: Phát hiện host bị cô lập mạng
- **Datastore Heartbeating**: Kiểm tra khả năng truy cập datastore
- **Management Network Monitoring**: Giám sát mạng quản lý

### Khởi động lại VM
- **Automatic VM Restart**: Tự động khởi động lại VM lỗi
- **VM Restart Priority**: Ưu tiên khởi động lại theo mức độ quan trọng
- **VM Dependencies**: Xử lý phụ thuộc giữa các VM
- **Host Selection**: Chọn host phù hợp để khởi động lại

### Bảo vệ dữ liệu
- **VM Component Protection**: Bảo vệ các thành phần VM
- **Datastore Access Guard**: Bảo vệ truy cập datastore
- **Network Component Protection**: Bảo vệ thành phần mạng
- **Admission Control**: Kiểm soát tài nguyên sẵn có

## HA 8 Cải tiến

### Thuật toán nâng cao
- Thuật toán phát hiện sự cố cải tiến
- Giảm thời gian phát hiện sự cố
- Cải thiện độ chính xác trong phát hiện lỗi
- Hỗ trợ các workload hiện đại

### Tích hợp
- Tích hợp tốt hơn với vSAN
- Hỗ trợ Tanzu và Kubernetes workloads
- Cải thiện khả năng làm việc với NSX
- Hỗ trợ VMware Cloud on AWS

### Quản lý
- Giao diện người dùng trực quan hơn
- PowerCLI nâng cao cho quản lý HA
- Template và profile cho cấu hình nhất quán
- Cải thiện khả năng giám sát

## Các chế độ HA

### Host Monitoring
- **Enabled**: Giám sát tình trạng host
- **Disabled**: Không giám sát host

### VM Monitoring
- **VM Monitoring Only**: Chỉ giám sát VM
- **VM and Application Monitoring**: Giám sát cả VM và ứng dụng
- **Disabled**: Không giám sát

### Admission Control
- **Host Failures Cluster Tolerates**: Dựa trên số host lỗi có thể chịu được
- **Percentage of Cluster Resources**: Dựa trên phần trăm tài nguyên
- **Specify Failover Hosts**: Chỉ định host dự phòng
- **Slot Policy**: Dựa trên slot policy

## Cấu hình

### Các tham số quan trọng
- **Heartbeat Datastores**: Datastore dùng để heartbeat
- **Advanced Options**: Các tùy chọn nâng cao
- **VM Restart Priority**: Ưu tiên khởi động lại VM
- **Host Isolation Response**: Phản ứng khi host bị cô lập

## Thực hành tốt nhất

1. **Lập kế hoạch**: Xác định yêu cầu sẵn sàng và tài nguyên cần thiết
2. **Kiểm thử**: Kiểm tra HA trước khi triển khai production
3. **Giám sát**: Theo dõi hiệu suất và tình trạng HA
4. **Tài liệu**: Ghi chép cấu hình và chính sách HA
5. **Bảo trì**: Loại bỏ host khỏi HA khi bảo trì

## Lệnh quản lý

```powershell
# Bật HA cho cluster
Set-Cluster -Cluster "Cluster01" -HAEnabled $true -HAAdmissionControlEnabled $true

# Cấu hình VM restart priority
Set-VMResourceConfiguration -VM "VM01" -RestartPriority High

# Xem thông tin HA
Get-Cluster "Cluster01" | Select Name, HAEnabled, HAAdmissionControlEnabled

# Kiểm tra tình trạng HA
Get-View -ViewType ClusterComputeResource -Property Name,Summary | Select Name,Summary.HAEnabled
```

## Các công nghệ liên quan

- [vSphere Fault Tolerance](/glossary/term/fault-tolerance.md)
- [DRS](/glossary/term/drs.md)
- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [Site Recovery Manager](/glossary/term/site-recovery-manager.md)