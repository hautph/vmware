---
term: vSphere Replication
category: Availability_Data_Protection
language: vi
---

vSphere Replication là giải pháp sao chép dữ liệu của VMware cung cấp khả năng bảo vệ khỏi mất dữ liệu bằng cách sao chép máy ảo từ site này sang site khác. Nó cho phép phục hồi sau thảm họa (DR) bằng cách duy trì bản sao cập nhật của các máy ảo quan trọng tại site dự phòng.

## Tổng quan

vSphere Replication có các đặc điểm chính sau:
- Sao chép máy ảo cấp độ hypervisor
- Hỗ trợ RPO từ 5 phút đến 24 giờ
- Tích hợp với vCenter Server và Site Recovery Manager
- Không yêu cầu storage array đắt tiền

## Kiến trúc

### Các thành phần chính
vSphere Replication bao gồm các thành phần sau:
- **vSphere Replication Appliance**: Thiết bị quản lý trung tâm
- **vSphere Replication Server**: Máy chủ xử lý dữ liệu sao chép
- **Replication Agent**: Tác nhân trên ESXi host nguồn
- **Target Host**: Host nhận dữ liệu sao chép

### Cách thức hoạt động
1. Replication Agent theo dõi thay đổi trên VM nguồn
2. Thay đổi được nén và mã hóa trước khi truyền
3. Dữ liệu được truyền qua mạng đến site đích
4. vSphere Replication Server xử lý và áp dụng thay đổi
5. VM đích được cập nhật theo thời gian thực

## Các tính năng chính

### Sao chép linh hoạt
- **RPO Configuration**: Cấu hình RPO từ 5 phút đến 24 giờ
- **Bandwidth Throttling**: Kiểm soát băng thông sao chép
- **Network Compression**: Nén dữ liệu để tiết kiệm băng thông
- **Encryption**: Mã hóa dữ liệu trong quá trình truyền

### Quản lý tập trung
- **vSphere Web Client Integration**: Tích hợp với giao diện vSphere
- **Replication Monitoring**: Giám sát trạng thái sao chép
- **Alerting and Reporting**: Cảnh báo và báo cáo
- **Scheduling**: Lên lịch sao chép theo nhu cầu

### Khôi phục
- **Point-in-Time Recovery**: Khôi phục đến thời điểm cụ thể
- **Test Failover**: Kiểm tra failover mà không ảnh hưởng production
- **Reprotect**: Bảo vệ lại VM sau khi failover
- **Failback**: Quay trở lại site chính

## vSphere Replication 8 Cải tiến

### Hiệu suất
- Tăng tốc độ sao chép đáng kể
- Cải thiện hiệu suất nén và mã hóa
- Tối ưu hóa cho các workload hiện đại
- Hỗ trợ băng thông mạng cao hơn

### Tích hợp
- Tích hợp chặt chẽ hơn với vSAN
- Hỗ trợ Tanzu và Kubernetes workloads
- Cải thiện khả năng làm việc với NSX
- Hỗ trợ VMware Cloud on AWS

### Quản lý
- Giao diện người dùng trực quan hơn
- PowerCLI nâng cao cho quản lý
- Template và profile cho cấu hình nhất quán
- Cải thiện khả năng giám sát

## Cấu hình

### Các bước cơ bản
1. Triển khai vSphere Replication Appliance
2. Cấu hình kết nối giữa các site
3. Cấu hình replication cho VM
4. Thiết lập RPO và lịch sao chép
5. Kiểm tra và giám sát replication

### Các tham số quan trọng
- **RPO (Recovery Point Objective)**: Thời gian tối đa mất dữ liệu
- **RTO (Recovery Time Objective)**: Thời gian tối đa downtime
- **Bandwidth Limit**: Giới hạn băng thông sao chép
- **Quiescing**: Tạm dừng ứng dụng để đảm bảo nhất quán dữ liệu

## Thực hành tốt nhất

1. **Lập kế hoạch**: Xác định RPO và RTO phù hợp
2. **Kiểm thử**: Kiểm tra quy trình DR thường xuyên
3. **Giám sát**: Theo dõi hiệu suất và trạng thái sao chép
4. **Tài liệu**: Ghi chép cấu hình và quy trình DR
5. **Bảo trì**: Lên kế hoạch bảo trì có xem xét replication

## Lệnh quản lý

```powershell
# Cấu hình replication cho VM
New-VMReplication -VM "VM01" -TargetSite "DR-Site" -RPO 15

# Bắt đầu replication
Start-VMReplication -VM "VM01"

# Xem trạng thái replication
Get-VMReplication -VM "VM01" | Select VMName, State, RPO

# Dừng replication
Stop-VMReplication -VM "VM01"
```

## Các công nghệ liên quan

- [Site Recovery Manager](/glossary/term/site-recovery-manager.md)
- [vSphere High Availability](/glossary/term/vsphere-high-availability.md)
- [Disaster Recovery](/glossary/term/disaster-recovery)
- [Data Protection](/glossary/term/data-protection)
- [Recovery Point Objective (RPO)](/glossary/term/recovery-point-objective.md)
- [Recovery Time Objective (RTO)](/glossary/term/recovery-time-objective.md)
