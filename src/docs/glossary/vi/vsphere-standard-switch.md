---
term: [VI] vSphere Standard Switch (vSS)
category: Networking
language: vi
---

vSphere Standard Switch (vSS) là loại switch ảo trong VMware vSphere được quản lý cục bộ trên từng host ESXi. vSS cung cấp kết nối mạng cơ bản cho các máy ảo và dịch vụ ESXi trên host cụ thể, nhưng không chia sẻ cấu hình giữa các host trong cluster.

## Tổng quan

vSS có các đặc điểm chính sau:
- Quản lý cục bộ trên từng host ESXi
- Cấu hình độc lập cho từng host
- Phù hợp cho môi trường nhỏ hoặc đơn giản
- Dễ triển khai và cấu hình cơ bản

## Kiến trúc

### Phạm vi quản lý
- Chỉ tồn tại và được quản lý trên host đơn lẻ
- Không có khả năng chia sẻ cấu hình giữa các host
- Mỗi host có thể có nhiều vSS riêng biệt
- Không hỗ trợ các tính năng nâng cao của vDS

### Các thành phần
- **Port Groups**: Nhóm port với cùng cấu hình
- **Uplink Ports**: Kết nối đến mạng vật lý
- **VMkernel Ports**: Cổng cho dịch vụ ESXi
- **Security Policies**: Chính sách bảo mật cục bộ

## Các tính năng chính

### Kết nối mạng cơ bản
- Kết nối máy ảo với mạng nội bộ
- Cung cấp kết nối đến mạng vật lý
- Hỗ trợ VLAN tagging cơ bản
- Chuyển mạch Layer 2 cho lưu lượng nội bộ

### Bảo mật
- Security policies cho từng port group
- Traffic shaping để kiểm soát băng thông
- MAC address filtering
- Promiscuous mode control

### Quản lý đơn giản
- Giao diện vSphere Client trực quan
- Cấu hình thông qua host-specific settings
- Phù hợp cho môi trường nhỏ
- Không yêu cầu vCenter Server (có thể quản lý trực tiếp ESXi)

## vSS 8 Cải tiến

### Hiệu suất
- Tối ưu hóa ngăn xếp mạng
- Hỗ trợ card mạng tốc độ cao hơn
- Cải thiện độ trễ và throughput
- Tối ưu hóa cho các workload hiện đại

### Bảo mật
- Cải thiện security policies
- Hỗ trợ network encryption cơ bản
- Tích hợp tốt hơn với vSphere security features
- Cải thiện khả năng giám sát

### Quản lý
- Giao diện người dùng được cải thiện
- Hỗ trợ PowerCLI nâng cao
- Template cấu hình cơ bản
- Cảnh báo và thông báo tốt hơn

## So sánh với vSphere Distributed Switch

### vSphere Standard Switch (vSS)
- Quản lý cục bộ trên từng host
- Cấu hình độc lập
- Phù hợp cho môi trường nhỏ
- Không có uplink failover nâng cao
- Không hỗ trợ Network I/O Control

### vSphere Distributed Switch (vDS)
- Quản lý tập trung cho nhiều host
- Cấu hình chia sẻ giữa các host
- Phù hợp cho môi trường doanh nghiệp
- Hỗ trợ uplink failover nâng cao
- Hỗ trợ Network I/O Control

## Thực hành tốt nhất

1. **Thiết kế**: Sử dụng vSS cho môi trường nhỏ (<10 host)
2. **Cấu hình**: Đảm bảo cấu hình nhất quán giữa các host
3. **Bảo mật**: Áp dụng security policies phù hợp
4. **Giám sát**: Theo dõi hiệu suất mạng
5. **Tài liệu**: Ghi chép cấu hình chi tiết

## Lệnh quản lý

```powershell
# Tạo vSS mới
New-VirtualSwitch -Name "vSwitch0" -Nic "vmnic0" -NumPorts 128

# Thêm port group vào vSS
New-VirtualPortGroup -VirtualSwitch "vSwitch0" -Name "Web-Tier"

# Xem thông tin vSS
Get-VirtualSwitch -Name "vSwitch0" | Select Name, NumPorts, Nic

# Thêm uplink vào vSS
Get-VirtualSwitch -Name "vSwitch0" | Set-VirtualSwitch -Nic "vmnic0", "vmnic1"
```

## Các công nghệ liên quan

- [Virtual Switch](/glossary/term/virtual-switch)
- [vSphere Distributed Switch](/glossary/term/vsphere-distributed-switch)
- [Port Group](/glossary/term/port-group)
- [Uplink](/glossary/term/uplinks)