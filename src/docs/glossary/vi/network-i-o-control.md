---
term: Network I/O Control (NIOC)
category: Networking
language: vi
---

Network I/O Control (NIOC) là tính năng của VMware vSphere cho phép quản lý và phân bổ băng thông mạng cho các loại lưu lượng khác nhau trên vSphere Distributed Switch (vDS). NIOC giúp đảm bảo rằng các lưu lượng quan trọng nhận được đủ băng thông cần thiết trong khi giới hạn lưu lượng ít quan trọng hơn.

## Tổng quan

NIOC có các đặc điểm chính sau:
- Quản lý băng thông mạng trên vDS
- Phân bổ tài nguyên theo priority và shares
- Hỗ trợ các loại lưu lượng khác nhau
- Yêu cầu vSphere Enterprise Plus license

## Kiến trúc

### Các thành phần chính
NIOC bao gồm các thành phần sau:
- **Resource Pools**: Nhóm tài nguyên mạng cho các loại lưu lượng
- **Shares**: Giá trị chia sẻ để phân bổ băng thông
- **Limits**: Giới hạn băng thông tối đa
- **Reservations**: Đảm bảo băng thông tối thiểu

### Các loại lưu lượng hỗ trợ
- **Virtual Machine Traffic**: Lưu lượng từ máy ảo
- **vSphere vMotion**: Lưu lượng migration VM
- **iSCSI**: Lưu lượng storage iSCSI
- **NFS**: Lưu lượng storage NFS
- **vSphere Fault Tolerance**: Lưu lượng FT logging
- **vSphere Replication**: Lưu lượng replication
- **Management Traffic**: Lưu lượng quản lý ESXi
- **vSphere High Availability**: Lưu lượng HA

## Các tính năng chính

### Phân bổ băng thông
- **Shares-based allocation**: Phân bổ theo tỷ lệ shares
- **Reservation-based allocation**: Đảm bảo băng thông tối thiểu
- **Limit-based allocation**: Giới hạn băng thông tối đa
- **Priority-based allocation**: Ưu tiên theo loại lưu lượng

### Monitoring và reporting
- **Real-time monitoring**: Giám sát hiệu suất thời gian thực
- **Historical reporting**: Báo cáo lịch sử sử dụng băng thông
- **Alerting**: Cảnh báo khi vượt ngưỡng
- **Capacity planning**: Lập kế hoạch dung lượng

### Quality of Service
- **Traffic prioritization**: Ưu tiên lưu lượng quan trọng
- **Congestion control**: Kiểm soát nghẽn mạng
- **Bandwidth guarantees**: Đảm bảo băng thông cho SLA
- **Performance isolation**: Cách ly hiệu suất giữa các loại lưu lượng

## NIOC 8 Cải tiến

### Quản lý nâng cao
- Hỗ trợ thêm loại lưu lượng mới
- Cải thiện thuật toán phân bổ
- Tối ưu hóa cho các workload hiện đại
- Hỗ trợ Tanzu và Kubernetes networking

### Tích hợp
- Tích hợp tốt hơn với NSX-T
- Hỗ trợ VMware Cloud on AWS
- Cải thiện khả năng làm việc với vSAN
- Hỗ trợ các công nghệ mạng mới

### Giám sát
- Dashboard trực quan hơn
- Cảnh báo nâng cao
- Báo cáo tùy chỉnh
- Export dữ liệu cho phân tích

## Các cấp độ NIOC

### NIOC Version 1
- Hỗ trợ các loại lưu lượng cơ bản
- Quản lý băng thông đơn giản
- Giới hạn trong monitoring

### NIOC Version 2
- Hỗ trợ thêm loại lưu lượng
- Cải thiện monitoring và reporting
- Hỗ trợ custom resource pools

### NIOC Version 3
- Hỗ trợ tất cả loại lưu lượng
- Monitoring và reporting nâng cao
- Hỗ trợ network resource pools linh hoạt

## Cấu hình

### Shares Values
- **Low**: 25 shares
- **Normal**: 50 shares (mặc định)
- **High**: 100 shares
- **Custom**: Giá trị tùy chỉnh

### Resource Allocation
- **Reservation**: Băng thông đảm bảo tối thiểu (Mbps)
- **Limit**: Băng thông tối đa (Mbps)
- **Shares**: Ưu tiên phân bổ băng thông

## Thực hành tốt nhất

1. **Lập kế hoạch**: Xác định băng thông cần thiết cho từng loại lưu lượng
2. **Giám sát**: Theo dõi sử dụng băng thông thường xuyên
3. **Điều chỉnh**: Tối ưu hóa cấu hình dựa trên hiệu suất thực tế
4. **Tài liệu**: Ghi chép chính sách và cấu hình NIOC
5. **Kiểm thử**: Kiểm tra trước khi áp dụng trong production

## Lệnh quản lý

```powershell
# Bật NIOC cho vDS
Set-VDSwitch -VDSwitch "DistributedSwitch" -EnableNetworkResourceManagement $true

# Cấu hình shares cho VM traffic
Get-VDPortgroup -Name "VM Network" | Get-VDResourcePool | Set-VDResourcePool -SharesLevel High

# Xem thông tin NIOC
Get-VDSwitch -Name "DistributedSwitch" | Select Name, NetworkResourceManagementEnabled

# Cấu hình reservation và limit
Set-VDResourcePool -Name "Management" -Reservation 100 -Limit 500
```

## Các công nghệ liên quan

- [vSphere Distributed Switch](/glossary/term/vsphere-distributed-switch.md)
- [Quality of Service](/glossary/term/quality-of-service)
- [Resource Pool](/glossary/term/resource-pool.md)
- [Traffic Shaping](/glossary/term/traffic-shaping)