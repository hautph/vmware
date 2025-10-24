---
term: [VI] vSphere Distributed Switch (vDS)
category: Networking
language: vi
---

vSphere Distributed Switch (vDS) là switch ảo nâng cao trong VMware vSphere được quản lý tập trung cho nhiều host ESXi trong một datacenter. vDS cung cấp các tính năng mạng nâng cao như Network I/O Control, Private VLAN, và khả năng giám sát lưu lượng mạng toàn diện.

## Tổng quan

vDS có các đặc điểm chính sau:
- Quản lý tập trung cho nhiều host ESXi
- Chia sẻ cấu hình giữa các host trong datacenter
- Hỗ trợ các tính năng mạng nâng cao
- Yêu cầu vCenter Server để quản lý

## Kiến trúc

### Phạm vi quản lý
- Quản lý tập trung từ vCenter Server
- Cấu hình được chia sẻ giữa tất cả host trong datacenter
- Hỗ trợ nhiều phiên bản và nâng cấp
- Tích hợp chặt chẽ với các tính năng vSphere khác

### Các thành phần
- **Distributed Port Groups**: Nhóm port với cấu hình chia sẻ
- **Uplink Port Groups**: Nhóm port kết nối đến mạng vật lý
- **Distributed Ports**: Các port ảo trên vDS
- **Network I/O Control**: Quản lý băng thông mạng

## Các tính năng chính

### Quản lý tập trung
- Cấu hình nhất quán giữa các host
- Áp dụng thay đổi đồng thời cho nhiều host
- Template và profile cho cấu hình chuẩn
- Hỗ trợ rollback cấu hình

### Network I/O Control
- Phân bổ băng thông theo priority
- Hỗ trợ resource pools cho mạng
- Monitoring và reporting nâng cao
- SLA cho các loại lưu lượng khác nhau

### Bảo mật nâng cao
- Private VLAN hỗ trợ micro-segmentation
- Port mirroring để giám sát lưu lượng
- Security policies nâng cao
- Network encryption

### Giám sát và gỡ lỗi
- NetFlow và sFlow để phân tích lưu lượng
- Port mirroring (ERSPAN) cho gỡ lỗi
- Syslog và SNMP cho monitoring
- Health check và alerting

## vDS 8 Cải tiến

### Hiệu suất
- Tối ưu hóa ngăn xếp mạng nâng cao
- Hỗ trợ card mạng tốc độ cực cao
- Cải thiện độ trễ cho các workload nhạy cảm
- Tối ưu hóa cho NVMe over Fabrics

### Tích hợp cloud
- Hỗ trợ VMware Cloud on AWS
- Tích hợp tốt hơn với NSX-T
- Hỗ trợ Kubernetes networking
- API nâng cao cho tự động hóa

### Bảo mật
- Tích hợp với vSphere Trust Authority
- Hỗ trợ network encryption nâng cao
- Micro-segmentation cải tiến
- Giám sát an ninh nâng cao

## Các phiên bản vDS

### vDS 7.0
- Hỗ trợ vSphere 7.0
- Cải thiện hiệu suất và khả năng mở rộng
- Hỗ trợ các tính năng mới của vSphere 7.0

### vDS 8.0
- Hỗ trợ vSphere 8
- Tối ưu hóa cho các workload hiện đại
- Cải thiện tích hợp với Tanzu
- Hỗ trợ các công nghệ mạng mới

## Thực hành tốt nhất

1. **Triển khai**: Sử dụng vDS cho môi trường doanh nghiệp
2. **Cấu hình**: Áp dụng Network I/O Control phù hợp
3. **Giám sát**: Sử dụng NetFlow và sFlow để phân tích
4. **Bảo mật**: Áp dụng Private VLAN và security policies
5. **Tài liệu**: Ghi chép cấu hình và chính sách mạng

## Lệnh quản lý

```powershell
# Tạo vDS mới
New-VDSwitch -Name "DistributedSwitch" -Location "Datacenter" -NumUplinkPorts 4

# Tạo Distributed Port Group
New-VDPortgroup -VDSwitch "DistributedSwitch" -Name "Web-Tier"

# Thêm host vào vDS
Add-VDSwitchVMHost -VDSwitch "DistributedSwitch" -VMHost "ESXi-Host"

# Xem thông tin vDS
Get-VDSwitch -Name "DistributedSwitch" | Select Name, NumPorts, UplinkPorts
```

## Các công nghệ liên quan

- [Virtual Switch](/glossary/term/virtual-switch)
- [vSphere Standard Switch](/glossary/term/vsphere-standard-switch)
- [Network I/O Control](/glossary/term/network-i-o-control-nioc)
- [Private VLAN](/glossary/term/pvlan)