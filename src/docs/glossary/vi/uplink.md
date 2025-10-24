---
term: [VI] Uplink
category: Networking
language: vi
---

Uplink là kết nối vật lý giữa switch ảo (vSwitch) trong VMware vSphere và mạng vật lý bên ngoài. Uplink cho phép lưu lượng mạng từ các máy ảo đi ra mạng vật lý và ngược lại, đóng vai trò cầu nối giữa môi trường ảo và vật lý.

## Tổng quan

Uplink có các đặc điểm chính sau:
- Là kết nối vật lý giữa vSwitch và mạng vật lý
- Cho phép lưu lượng mạng giữa VM và mạng bên ngoài
- Hỗ trợ NIC teaming để dự phòng và cân bằng tải
- Có thể được cấu hình trên vSS hoặc vDS

## Kiến trúc

### Các loại Uplink
- **Physical NIC Uplinks**: Kết nối đến card mạng vật lý
- **Trunk Uplinks**: Mang lưu lượng từ nhiều VLAN
- **Access Uplinks**: Kết nối đến VLAN cụ thể

### Các thành phần
- **Physical NICs (vmnics)**: Card mạng vật lý trên host ESXi
- **Uplink Port Groups**: Nhóm port cho kết nối uplink
- **Link Aggregation**: Gom nhóm các liên kết vật lý
- **Redundancy**: Cơ chế dự phòng kết nối

## Các tính năng chính

### NIC Teaming
- **Load Balancing**: Phân phối lưu lượng giữa các NIC
- **Failover**: Chuyển đổi tự động khi NIC lỗi
- **Notify Switches**: Thông báo trạng thái cho switch vật lý
- **Failback**: Quay trở lại NIC chính khi phục hồi

### Link Aggregation
- **LACP (Link Aggregation Control Protocol)**: Chuẩn IEEE 802.3ad
- **Static EtherChannel**: Cấu hình tĩnh
- **Enhanced LACP**: Phiên bản nâng cao trong vSphere 8
- **Load Distribution**: Phân phối tải giữa các liên kết

### Bandwidth Management
- **Link Speed**: Tốc độ kết nối vật lý (1Gbps, 10Gbps, v.v.)
- **Duplex Mode**: Full-duplex hoặc half-duplex
- **Quality of Service**: Ưu tiên lưu lượng
- **Traffic Shaping**: Kiểm soát băng thông

## Uplink trên vSS vs vDS

### vSphere Standard Switch Uplink
- Quản lý cục bộ trên từng host
- Cấu hình độc lập cho từng host
- Hạn chế trong failover nâng cao
- Không có Network I/O Control

### vSphere Distributed Switch Uplink
- Quản lý tập trung từ vCenter Server
- Cấu hình chia sẻ giữa các host
- Hỗ trợ failover nâng cao
- Tích hợp với Network I/O Control

## Cấu hình nâng cao

### Load Balancing Algorithms
- **Route based on originating virtual port ID**: Dựa trên port VM
- **Route based on source MAC hash**: Dựa trên địa chỉ MAC
- **Route based on IP hash**: Dựa trên địa chỉ IP
- **Route based on physical NIC load**: Dựa trên tải NIC
- **Use explicit failover order**: Thứ tự failover rõ ràng

### Failover Configuration
- **Active Uplinks**: Các uplink đang hoạt động
- **Standby Uplinks**: Các uplink dự phòng
- **Unused Uplinks**: Các uplink không sử dụng
- **Failback**: Quay trở lại uplink chính
- **Notify Switches**: Thông báo cho switch vật lý

## vSphere 8 Cải tiến

### Hiệu suất nâng cao
- Hỗ trợ card mạng tốc độ cực cao (25Gbps, 40Gbps, 100Gbps)
- Tối ưu hóa ngăn xếp mạng
- Cải thiện độ trễ cho các workload nhạy cảm

### Tích hợp ESXi
- Hỗ trợ SR-IOV nâng cao
- Tích hợp tốt hơn với vSAN
- Cải thiện khả năng làm việc với Tanzu

### Giám sát và gỡ lỗi
- NetFlow và sFlow cho phân tích lưu lượng
- Cải thiện khả năng giám sát hiệu suất
- Cảnh báo nâng cao về trạng thái uplink

## Thực hành tốt nhất

1. **Dự phòng**: Luôn sử dụng ít nhất 2 uplinks
2. **Cân bằng tải**: Cấu hình load balancing phù hợp
3. **Giám sát**: Theo dõi trạng thái và hiệu suất uplink
4. **Tài liệu**: Ghi chép cấu hình và thiết kế mạng
5. **Kiểm thử**: Kiểm tra failover trước khi triển khai

## Lệnh quản lý

```bash
# Xem thông tin uplink trên ESXi host
esxcli network nic list

# Kiểm tra trạng thái uplink
esxcli network vswitch standard uplink list

# Xem thông tin chi tiết về NIC
esxcli network nic get -n vmnic0

# Kiểm tra thống kê lưu lượng
esxcli network nic stats get -n vmnic0
```

## Các công nghệ liên quan

- [Virtual Switch](/glossary/term/virtual-switch)
- [Port Group](/glossary/term/port-group)
- [NIC Teaming](/glossary/term/nic-teaming)
- [LACP](/glossary/term/lacp)