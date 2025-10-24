---
term: [VI] vSphere Fault Tolerance (FT)
category: Availability_Data_Protection
language: vi
---

vSphere Fault Tolerance (FT) là tính năng của VMware vSphere cung cấp khả năng sẵn sàng cao cấp độ doanh nghiệp bằng cách tạo bản sao chính xác của máy ảo chạy song song trên hai host khác nhau. FT đảm bảo zero downtime và zero data loss khi có sự cố xảy ra với host hoặc phần cứng.

## Tổng quan

FT có các đặc điểm chính sau:
- Sao chép chính xác máy ảo theo thời gian thực
- Zero downtime và zero data loss
- Tự động failover khi có sự cố
- Hỗ trợ các workload quan trọng

## Kiến trúc

### Các thành phần chính
FT bao gồm các thành phần sau:
- **Primary VM**: Máy ảo chính chạy trên host nguồn
- **Secondary VM**: Máy ảo sao chép chạy trên host đích
- **FT Logging Network**: Mạng chuyên dụng cho đồng bộ hóa
- **vLockstep**: Cơ chế đồng bộ hóa trạng thái VM

### Cách thức hoạt động
1. Primary VM nhận và thực thi các yêu cầu
2. Các thay đổi trạng thái được ghi log và gửi đến Secondary VM
3. Secondary VM nhận log và tái tạo chính xác các thay đổi
4. Khi Primary VM lỗi, Secondary VM tự động kích hoạt

## Các tính năng chính

### Đồng bộ hóa theo thời gian thực
- **vLockstep Protocol**: Giao thức đồng bộ hóa trạng thái
- **Deterministic Replay**: Tái tạo chính xác trạng thái VM
- **Input Logging**: Ghi log các input đầu vào
- **Output Suppression**: Ức chế output từ Secondary VM

### Zero Downtime
- **Automatic Failover**: Chuyển đổi tự động khi có sự cố
- **No Data Loss**: Không mất dữ liệu trong quá trình failover
- **Transparent to Users**: Trong suốt với người dùng cuối
- **Fast Recovery**: Thời gian phục hồi cực nhanh

### Hỗ trợ workload
- **Single vCPU VMs**: Hỗ trợ VM với một vCPU
- **Limited Memory**: Hạn chế dung lượng bộ nhớ (tùy phiên bản)
- **Supported Guest OS**: Hỗ trợ các hệ điều hành khách nhất định
- **Application Compatibility**: Tương thích với các ứng dụng

## FT 8 Cải tiến

### Hiệu suất nâng cao
- Hỗ trợ Multi-Socket FT (đa vCPU)
- Cải thiện hiệu suất cho các workload hiện đại
- Giảm độ trễ trong đồng bộ hóa
- Tối ưu hóa cho các ứng dụng nhạy cảm

### Tích hợp
- Tích hợp tốt hơn với vSAN
- Hỗ trợ Tanzu và Kubernetes workloads
- Cải thiện khả năng làm việc với NSX
- Hỗ trợ VMware Cloud on AWS

### Quản lý
- Giao diện người dùng trực quan hơn
- PowerCLI nâng cao cho quản lý FT
- Template và profile cho cấu hình nhất quán
- Cải thiện khả năng giám sát

## Các loại FT

### vSphere FT (Phiên bản cũ)
- Hỗ trợ VM với một vCPU
- Hạn chế dung lượng bộ nhớ
- Yêu cầu FT logging network chuyên dụng

### vSphere FT (Phiên bản mới)
- Hỗ trợ VM với nhiều vCPU
- Dung lượng bộ nhớ lớn hơn
- Cải thiện hiệu suất và độ tin cậy

## Yêu cầu hệ thống

### Phần cứng
- CPU hỗ trợ EVC (Enhanced vMotion Compatibility)
- Đủ băng thông mạng cho FT logging
- Bộ nhớ đủ cho cả primary và secondary VM
- Storage hỗ trợ FT

### Phần mềm
- vSphere Enterprise Plus license
- vCenter Server để quản lý
- Hỗ trợ từ hệ điều hành khách
- Network configuration phù hợp

## Cấu hình

### Các bước cơ bản
1. Kiểm tra yêu cầu hệ thống
2. Cấu hình FT logging network
3. Bật FT cho VM
4. Kiểm tra trạng thái FT
5. Giám sát hiệu suất

## Thực hành tốt nhất

1. **Lập kế hoạch**: Xác định workload phù hợp với FT
2. **Kiểm thử**: Kiểm tra kỹ trước khi triển khai production
3. **Giám sát**: Theo dõi hiệu suất và tài nguyên
4. **Tài liệu**: Ghi chép cấu hình và thiết kế
5. **Bảo trì**: Lên kế hoạch bảo trì có xem xét FT

## Lệnh quản lý

```powershell
# Bật FT cho VM
Set-VM -VM "VM01" -FaultToleranceEnabled $true

# Khởi động FT cho VM
Start-VMFaultTolerance -VM "VM01"

# Xem thông tin FT
Get-VM "VM01" | Select Name, FaultToleranceEnabled, FaultToleranceState

# Tắt FT cho VM
Stop-VMFaultTolerance -VM "VM01"
```

## Các công nghệ liên quan

- [vSphere High Availability](/glossary/term/vsphere-high-availability)
- [vMotion](/glossary/term/vmotion)
- [DRS](/glossary/term/drs)
- [Synchronous Mirroring](/glossary/term/synchronous-mirroring)