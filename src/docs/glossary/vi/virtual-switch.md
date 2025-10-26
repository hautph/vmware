---
term: [VI] Virtual Switch (vSwitch)
category: Networking
language: vi
---

Virtual Switch (vSwitch) là thành phần mạng ảo trong VMware vSphere mô phỏng chức năng của switch vật lý để kết nối các máy ảo với nhau và với mạng vật lý. vSwitch xử lý việc chuyển mạch và định tuyến lưu lượng mạng giữa các VM và giữa VM với mạng bên ngoài.

## Tổng quan

vSwitch có các đặc điểm chính sau:
- Mô phỏng chức năng của switch vật lý
- Kết nối các máy ảo trong cùng host
- Cung cấp kết nối đến mạng vật lý thông qua uplinks
- Hỗ trợ các tính năng bảo mật và QoS

## Kiến trúc

### Các thành phần chính
vSwitch bao gồm các thành phần sau:
- **Port Groups**: Nhóm các port với cùng cấu hình mạng
- **Uplink Ports**: Kết nối đến mạng vật lý
- **VMkernel Ports**: Cổng cho dịch vụ ESXi (management, vMotion, etc.)
- **Routing Table**: Bảng định tuyến cho lưu lượng mạng

### Các loại vSwitch
- **vSphere Standard Switch (vSS)**: Quản lý cục bộ trên từng host
- **vSphere Distributed Switch (vDS)**: Quản lý tập trung cho nhiều host

## Các tính năng chính

### Chuyển mạch Layer 2
- Học địa chỉ MAC từ lưu lượng mạng
- Forward frame dựa trên bảng MAC address
- Hỗ trợ VLAN tagging và trunking
- Cung cấp switching fabric ảo

### Bảo mật mạng
- Security policies (Promiscuous Mode, MAC Address Changes, Forged Transmits)
- Traffic shaping để kiểm soát băng thông
- Private VLAN để phân đoạn mạng
- Port security để giới hạn địa chỉ MAC

### Quản lý chất lượng dịch vụ
- Network I/O Control (NIOC) cho phân bổ băng thông
- Traffic filtering và marking
- Hỗ trợ IEEE 802.1p QoS tagging
- Priority-based traffic handling

## vSwitch 8 Cải tiến

### Hiệu suất nâng cao
- Tối ưu hóa ngăn xếp mạng
- Hỗ trợ các card mạng tốc độ cao hơn
- Cải thiện độ trễ và throughput
- Hỗ trợ SR-IOV nâng cao

### Bảo mật
- Tích hợp với vSphere Trust Authority
- Hỗ trợ network encryption
- Cải thiện khả năng giám sát và gỡ lỗi
- Hỗ trợ micro-segmentation

### Quản lý dễ dàng
- Giao diện người dùng trực quan hơn
- Tự động hóa cấu hình
- Template và profile cho cấu hình nhất quán
- Cải thiện khả năng giám sát

## Các loại Port trong vSwitch

### Access Ports
- Kết nối các máy ảo với VLAN cụ thể
- Không có VLAN tagging
- Mỗi port group thuộc về một VLAN

### Trunk Ports
- Mang lưu lượng từ nhiều VLAN
- Sử dụng VLAN tagging (802.1Q)
- Kết nối đến switch vật lý

### VMkernel Ports
- Dành cho dịch vụ ESXi
- Hỗ trợ management, vMotion, FT, iSCSI, NFS, vSAN
- Có thể cấu hình VLAN tagging

## Thực hành tốt nhất

1. **Thiết kế**: Lập kế hoạch mạng trước khi triển khai
2. **Bảo mật**: Áp dụng security policies phù hợp
3. **Giám sát**: Theo dõi hiệu suất mạng thường xuyên
4. **Tài liệu**: Ghi chép về cấu hình và thiết kế mạng
5. **Dự phòng**: Sử dụng NIC teaming cho uplinks

## Lệnh cấu hình

```bash
# Xem thông tin vSwitch trên ESXi host
esxcli network vswitch standard list

# Tạo port group mới
esxcli network vswitch standard portgroup add --portgroup-name="Web-Tier" --vswitch-name="vSwitch0"

# Thêm uplink vào vSwitch
esxcli network vswitch standard uplink add --uplink-name=vmnic1 --vswitch-name=vSwitch0

# Xem thông tin port group
esxcli network vswitch standard portgroup list
```

## Các công nghệ liên quan

- [vSphere Standard Switch](/glossary/term/vsphere-standard-switch.md)
- [vSphere Distributed Switch](/glossary/term/vsphere-distributed-switch.md)
- [Port Group](/glossary/term/port-group.md)
- [Uplink](/glossary/term/uplinks.md)