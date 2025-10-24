---
term: VMkernel Port (vmknic)
category: Networking
language: vi
---

VMkernel Port (vmknic) là giao diện mạng đặc biệt trong vSphere dùng cho các dịch vụ của ESXi như Management, vMotion, Fault Tolerance, iSCSI, NFS và vSAN. VMkernel Port cung cấp kết nối mạng cho các chức năng kernel-level của hypervisor, khác với các port dùng cho máy ảo (VM).

## Tổng quan

VMkernel Port (vmknic) có các đặc điểm chính sau:
- Là giao diện mạng cho các dịch vụ ESXi
- Không dùng cho traffic của máy ảo
- Có địa chỉ IP và có thể được cấu hình VLAN
- Hỗ trợ các dịch vụ như Management, vMotion, vSAN, v.v.

## Cách thức hoạt động

### VMkernel Stack
VMkernel networking stack:
- Mỗi VMkernel port thuộc về một TCP/IP stack
- Hỗ trợ multiple TCP/IP stacks cho các dịch vụ khác nhau
- Cung cấp routing và firewall cho traffic kernel

### Service Types
Các loại dịch vụ trên VMkernel Port:
- **Management**: Quản lý ESXi host
- **vMotion**: Di chuyển VM giữa các host
- **Fault Tolerance**: Đồng bộ dữ liệu cho FT
- **iSCSI**: Truy cập storage qua iSCSI
- **NFS**: Truy cập NFS datastore
- **vSAN**: Giao tiếp trong vSAN cluster

### Network Configuration
Cấu hình VMkernel Port:
- Địa chỉ IP static hoặc DHCP
- Subnet mask và default gateway
- VLAN ID (nếu cần)
- TCP/IP stack assignment

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Tạo VMkernel Port mới cho vMotion
New-VMHostNetworkAdapter -VMHost "esxi01.example.com" -PortGroup "vMotion" -VirtualSwitch "vSwitch1" -IP "192.168.10.10" -SubnetMask "255.255.255.0" -VMotionEnabled $true

# Xem thông tin VMkernel Port
Get-VMHostNetworkAdapter -VMHost "esxi01.example.com" -VMKernel

# Cấu hình VMkernel Port cho multiple services
Get-VMHostNetworkAdapter -VMHost "esxi01.example.com" -Name "vmk1" | Set-VMHostNetworkAdapter -VMotionEnabled $true -FaultToleranceLoggingEnabled $true

# Xóa VMkernel Port
Remove-VMHostNetworkAdapter -Nic (Get-VMHostNetworkAdapter -VMHost "esxi01.example.com" -Name "vmk2")
```

### CLI Configuration
```bash
# Xem thông tin VMkernel Port
esxcli network ip interface list

# Tạo VMkernel Port mới
esxcli network ip interface add -i vmk2 -p "Management Network" -M 00:50:56:63:01:02

# Cấu hình IP cho VMkernel Port
esxcli network ip interface ipv4 set -i vmk2 -t static -I 192.168.1.10 -N 255.255.255.0 -g 192.168.1.1

# Cấu hình dịch vụ cho VMkernel Port
esxcli network ip interface tag add -i vmk2 -t VMotion

# Xóa VMkernel Port
esxcli network ip interface remove -i vmk2
```

## Các loại VMkernel Port

### Management Port
- Dùng cho quản lý ESXi host
- Truy cập qua vSphere Client, SSH, v.v.
- Thường là vmk0

### vMotion Port
- Dùng cho vMotion operations
- Yêu cầu network riêng biệt cho hiệu suất
- Có thể được cấu hình VLAN

### vSAN Port
- Dùng cho giao tiếp vSAN
- Yêu cầu low latency network
- Hỗ trợ jumbo frames

### iSCSI Port
- Dùng cho iSCSI storage access
- Có thể hardware hoặc software iSCSI
- Yêu cầu cấu hình đặc biệt

## Các tính năng nâng cao trong vSphere 8

### Enhanced Networking Stack
- Cải thiện hiệu suất VMkernel networking
- Hỗ trợ các network technology mới
- Tối ưu hóa việc sử dụng CPU

### TCP/IP Stack Management
- Hỗ trợ multiple TCP/IP stacks
- Cấu hình riêng biệt cho từng dịch vụ
- Tăng tính bảo mật và hiệu suất

## Thực hành tốt nhất

1. **Network Segmentation**: Phân tách traffic theo loại dịch vụ
2. **IP Address Planning**: Lên kế hoạch địa chỉ IP phù hợp
3. **VLAN Configuration**: Sử dụng VLAN để phân tách traffic
4. **Monitoring**: Theo dõi hiệu suất và lỗi network

## Lệnh khắc phục sự cố

```bash
# Xem thông tin VMkernel Port
esxcli network ip interface list

# Kiểm tra kết nối network
esxcli network ip interface ipv4 get

# Xem thông tin routing
esxcli network ip route ipv4 list

# Kiểm tra log network
tail -f /var/log/vmkernel.log | grep -i net
```

## Công nghệ liên quan

- [Virtual Switch](/glossary/term/virtual-switch)
- [Port Group](/glossary/term/port-group)
- [vMotion](/glossary/term/vmotion)
- [vSAN](/glossary/term/vsan)
- [TCP/IP Stack](/glossary/term/tcp-ip-stack)