---
term: Single Root I/O Virtualization (SR-IOV)
category: Networking
language: vi
---

Single Root I/O Virtualization (SR-IOV) là công nghệ ảo hóa phần cứng cho phép một thiết bị PCIe đơn lẻ xuất hiện như nhiều thiết bị PCIe riêng biệt, cung cấp hiệu suất mạng gần như bản địa cho các máy ảo. SR-IOV bypass hypervisor và cho phép VM truy cập trực tiếp vào phần cứng mạng.

## Tổng quan

SR-IOV có các đặc điểm chính sau:
- Công nghệ ảo hóa phần cứng cho thiết bị PCIe
- Cung cấp hiệu suất gần như bản địa cho VM
- Bypass hypervisor để giảm độ trễ
- Yêu cầu hỗ trợ từ phần cứng và driver

## Kiến trúc

### Các thành phần chính
SR-IOV bao gồm các thành phần sau:
- **Physical Function (PF)**: Chức năng vật lý đầy đủ với khả năng SR-IOV
- **Virtual Functions (VFs)**: Các chức năng nhẹ được tạo từ PF
- **SR-IOV Capable NIC**: Card mạng hỗ trợ SR-IOV
- **Hypervisor Support**: Hỗ trợ từ ESXi để quản lý SR-IOV

### Cách thức hoạt động
1. PF được cấu hình trên host ESXi
2. VFs được tạo từ PF
3. VFs được gán trực tiếp cho VM
4. VM truy cập trực tiếp phần cứng thông qua VF
5. Hypervisor không xử lý lưu lượng mạng

## Các tính năng chính

### Hiệu suất nâng cao
- Độ trễ thấp hơn đáng kể so với networking thông thường
- Throughput cao hơn cho các workload mạng
- Giảm CPU overhead cho xử lý mạng
- Hiệu suất gần như bản địa cho VM

### Khả năng mở rộng
- Một PF có thể tạo hàng chục hoặc hàng trăm VFs
- Hỗ trợ nhiều VM trên một card mạng vật lý
- Quản lý tài nguyên mạng linh hoạt
- Tối ưu hóa sử dụng phần cứng

### Tương thích
- Hỗ trợ các card mạng phổ biến (Intel, Broadcom, Mellanox)
- Tương thích với các hệ điều hành khách hiện đại
- Hỗ trợ các giao thức mạng chuẩn
- Tích hợp với vSphere networking

## SR-IOV 8 Cải tiến

### Hỗ trợ phần cứng
- Hỗ trợ các card mạng thế hệ mới
- Cải thiện tương thích với các thiết bị PCIe mới
- Hỗ trợ các công nghệ mạng mới (RDMA, NVMe over Fabrics)
- Tối ưu hóa cho các workload cloud-native

### Quản lý
- Giao diện vSphere Client cải tiến
- PowerCLI nâng cao cho quản lý SR-IOV
- Template và profile cho cấu hình nhất quán
- Cải thiện khả năng giám sát

### Bảo mật
- Tích hợp với vSphere Trust Authority
- Hỗ trợ network encryption
- Cải thiện isolation giữa các VM
- Giám sát và gỡ lỗi nâng cao

## Yêu cầu hệ thống

### Phần cứng
- SR-IOV capable PCIe NIC
- ESXi host hỗ trợ SR-IOV
- Hỗ trợ từ BIOS/UEFI
- Đủ băng thông PCIe

### Phần mềm
- vSphere 8 hoặc phiên bản hỗ trợ
- Driver phù hợp cho NIC
- Hỗ trợ từ hệ điều hành khách
- vCenter Server để quản lý

## Cấu hình

### Bật SR-IOV trên host
1. Kiểm tra hỗ trợ phần cứng
2. Bật SR-IOV trong BIOS/UEFI
3. Cấu hình SR-IOV trong ESXi
4. Tạo VFs từ PF

### Gán VF cho VM
1. Chỉnh sửa cấu hình VM
2. Thêm SR-IOV device
3. Chọn VF để gán
4. Cài đặt driver trong guest OS

## Thực hành tốt nhất

1. **Kiểm tra tương thích**: Đảm bảo phần cứng và driver hỗ trợ SR-IOV
2. **Lập kế hoạch**: Xác định số lượng VFs cần thiết
3. **Giám sát**: Theo dõi hiệu suất và tài nguyên
4. **Tài liệu**: Ghi chép cấu hình và thiết kế
5. **Kiểm thử**: Kiểm tra kỹ trước khi triển khai production

## Lệnh quản lý

```bash
# Kiểm tra SR-IOV capable NICs
esxcli network nic list | grep -i sriov

# Xem thông tin SR-IOV
esxcli network sriov nic list

# Bật SR-IOV cho NIC
esxcli network sriov nic set -n vmnic0 -e true -n 8

# Xem VFs được tạo
esxcli network sriov vf list -n vmnic0
```

## Các công nghệ liên quan

- [PCI Passthrough](/glossary/term/pci-passthrough)
- [Virtual Switch](/glossary/term/virtual-switch.md)
- [Network Performance](/glossary/term/network-performance)
- [Hardware Acceleration](/glossary/term/hardware-acceleration)