---
term: [VI] Port Group
category: Networking
language: vi
---

Port Group là nhóm các port ảo trong VMware vSphere có cùng cấu hình mạng, được sử dụng để kết nối các máy ảo và dịch vụ ESXi với switch ảo (vSS hoặc vDS). Port Group xác định các thuộc tính mạng như VLAN, security policies, và traffic shaping cho các port thành viên.

## Tổng quan

Port Group có các đặc điểm chính sau:
- Nhóm các port với cùng cấu hình mạng
- Xác định VLAN và các thuộc tính mạng
- Áp dụng security policies và QoS
- Có thể được tạo trên vSS hoặc vDS

## Kiến trúc

### Các loại Port Group
- **Virtual Machine Port Group**: Kết nối máy ảo với mạng
- **VMkernel Port Group**: Kết nối dịch vụ ESXi với mạng

### Các thành phần cấu hình
- **VLAN ID**: Xác định VLAN cho port group
- **Security Policies**: Kiểm soát bảo mật mạng
- **Traffic Shaping**: Quản lý băng thông
- **Teaming và Failover**: Cấu hình NIC teaming

## Các tính năng chính

### VLAN Configuration
- **VLAN ID 0**: Port group không có VLAN tagging
- **VLAN ID 1-4094**: Port group thuộc về VLAN cụ thể
- **VLAN trunking (4095)**: Hỗ trợ multiple VLANs
- **Private VLAN**: Hỗ trợ phân đoạn mạng nâng cao

### Security Policies
- **Promiscuous Mode**: Kiểm soát nhận tất cả lưu lượng
- **MAC Address Changes**: Kiểm soát thay đổi địa chỉ MAC
- **Forged Transmits**: Kiểm soát gửi frame với MAC nguồn giả

### Traffic Shaping
- **Inbound Shaping**: Kiểm soát lưu lượng vào
- **Outbound Shaping**: Kiểm soát lưu lượng ra
- **Bandwidth Limits**: Giới hạn băng thông tối đa
- **Burst Size**: Kích thước burst cho traffic shaping

## Port Group trên vSS vs vDS

### vSphere Standard Switch Port Group
- Quản lý cục bộ trên từng host
- Cấu hình độc lập cho từng host
- Không có uplink failover nâng cao
- Hạn chế trong monitoring và reporting

### vSphere Distributed Switch Port Group
- Quản lý tập trung từ vCenter Server
- Cấu hình chia sẻ giữa các host
- Hỗ trợ uplink failover nâng cao
- Monitoring và reporting toàn diện

## Cấu hình nâng cao

### Load Balancing
- **Route based on originating virtual port ID**: Mặc định
- **Route based on source MAC hash**: Dựa trên địa chỉ MAC
- **Route based on IP hash**: Dựa trên địa chỉ IP
- **Route based on physical NIC load**: Dựa trên tải NIC
- **Use explicit failover order**: Thứ tự failover rõ ràng

### Failover
- **Notify Switches**: Thông báo khi failover
- **Failback**: Quay trở lại uplink chính
- **Active Uplinks**: Các uplink đang hoạt động
- **Standby Uplinks**: Các uplink dự phòng

## Thực hành tốt nhất

1. **Đặt tên**: Sử dụng tên mô tả rõ ràng cho port group
2. **VLAN**: Áp dụng VLAN ID phù hợp với thiết kế mạng
3. **Bảo mật**: Cấu hình security policies phù hợp
4. **QoS**: Áp dụng traffic shaping khi cần thiết
5. **Tài liệu**: Ghi chép cấu hình và chính sách mạng

## Lệnh quản lý

```powershell
# Tạo Port Group trên vSS
New-VirtualPortGroup -VirtualSwitch "vSwitch0" -Name "Web-Tier" -VLanId 10

# Tạo Port Group trên vDS
New-VDPortgroup -VDSwitch "DistributedSwitch" -Name "App-Tier" -VlanConfiguration (New-VDVlanConfiguration -VlanId 20)

# Xem thông tin Port Group
Get-VirtualPortGroup -Name "Web-Tier" | Select Name, VLanId, VirtualSwitch

# Cấu hình security policies
Get-VirtualPortGroup -Name "Web-Tier" | Set-SecurityPolicy -AllowPromiscuous $false -MacChanges $false -ForgedTransmits $false
```

## Các công nghệ liên quan

- [Virtual Switch](/glossary/term/virtual-switch)
- [vSphere Standard Switch](/glossary/term/vsphere-standard-switch)
- [vSphere Distributed Switch](/glossary/term/vsphere-distributed-switch)
- [VLAN](/glossary/term/vlan)