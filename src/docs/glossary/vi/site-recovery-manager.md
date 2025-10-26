---
term: Site Recovery Manager (SRM)
category: Backup_Disaster_Recovery
language: vi
---

Site Recovery Manager (SRM) là giải pháp quản lý phục hồi sau thảm họa của VMware tự động hóa quy trình failover và failback giữa site chính và site dự phòng. SRM giúp các tổ chức đảm bảo tính liên tục kinh doanh bằng cách cung cấp quy trình DR được kiểm thử và tự động hóa.

## Tổng quan

SRM có các đặc điểm chính sau:
- Tự động hóa quy trình phục hồi sau thảm họa
- Kiểm thử DR không ảnh hưởng đến production
- Tích hợp với vSphere Replication và storage replication
- Cung cấp orchestration cho các ứng dụng phức tạp

## Kiến trúc

### Các thành phần chính
SRM bao gồm các thành phần sau:
- **SRM Server**: Máy chủ quản lý tại mỗi site
- **SRM Database**: Cơ sở dữ liệu lưu trữ cấu hình DR
- **vCenter Server**: Quản lý các host và VM
- **Replication**: vSphere Replication hoặc storage array replication

### Cách thức hoạt động
1. SRM thu thập thông tin về VM và phụ thuộc
2. Tạo recovery plan dựa trên cấu hình
3. Đồng bộ hóa dữ liệu giữa các site
4. Khi thảm họa xảy ra, SRM thực hiện failover tự động
5. Sau khi site chính phục hồi, SRM thực hiện failback

## Các tính năng chính

### Orchestration
- **Recovery Plans**: Kế hoạch phục hồi cho các ứng dụng
- **Dependencies Mapping**: Ánh xạ phụ thuộc giữa các VM
- **Boot Order**: Thứ tự khởi động cho các VM
- **Custom Scripts**: Script tùy chỉnh trong quy trình DR

### Tự động hóa
- **Automated Failover**: Failover tự động khi thảm họa
- **Automated Failback**: Failback tự động khi site chính phục hồi
- **Test Failover**: Kiểm thử DR mà không ảnh hưởng production
- **Reprotect**: Tự động bảo vệ lại VM sau failover

### Giám sát và báo cáo
- **Dashboard**: Bảng điều khiển trạng thái DR
- **Alerting**: Cảnh báo về trạng thái replication
- **Reporting**: Báo cáo hiệu suất và compliance
- **Audit Trail**: Nhật ký hoạt động DR

## SRM 8 Cải tiến

### Tích hợp nâng cao
- Tích hợp tốt hơn với Tanzu và Kubernetes
- Hỗ trợ các workload cloud-native
- Cải thiện khả năng làm việc với NSX
- Hỗ trợ VMware Cloud on AWS

### Giao diện người dùng
- Giao diện trực quan hơn với vSphere Client
- Cải thiện trải nghiệm người dùng
- Hỗ trợ mobile cho các tác vụ cơ bản
- Template và wizard cho cấu hình nhanh

### Hiệu suất
- Tối ưu hóa quy trình failover
- Giảm thời gian RTO
- Cải thiện hiệu suất test failover
- Hỗ trợ các công nghệ mạng mới

## Cấu hình

### Các bước cơ bản
1. Cài đặt SRM Server tại cả hai site
2. Cấu hình kết nối giữa các site
3. Cấu hình replication (vSphere Replication hoặc array-based)
4. Tạo protection groups
5. Thiết kế recovery plans
6. Kiểm thử và tinh chỉnh

### Các khái niệm quan trọng
- **Protection Groups**: Nhóm VM được bảo vệ cùng nhau
- **Recovery Plans**: Kế hoạch phục hồi cho các ứng dụng
- **RPO (Recovery Point Objective)**: Thời gian tối đa mất dữ liệu
- **RTO (Recovery Time Objective)**: Thời gian tối đa downtime

## Thực hành tốt nhất

1. **Lập kế hoạch**: Xác định RPO và RTO cho từng ứng dụng
2. **Kiểm thử**: Kiểm tra quy trình DR định kỳ
3. **Tài liệu**: Ghi chép chi tiết về cấu hình và quy trình
4. **Đào tạo**: Đào tạo nhân viên về quy trình DR
5. **Cập nhật**: Duy trì phiên bản mới nhất của SRM

## Lệnh quản lý

```powershell
# Kết nối đến SRM Server
Connect-SrmServer -Server "srm-server.domain.local"

# Xem protection groups
Get-SrmProtectionGroup

# Test recovery plan
Start-SrmTestFailover -RecoveryPlan "RecoveryPlan01"

# Xem trạng thái SRM
Get-SrmStatus
```

## Các công nghệ liên quan

- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [Recovery Point Objective (RPO)](/glossary/term/recovery-point-objective.md)
- [Recovery Time Objective (RTO)](/glossary/term/recovery-time-objective.md)
