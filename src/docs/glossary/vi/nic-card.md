---
term: NIC Card (Network Interface Card)
category: Hardware
---

NIC (Thẻ Giao Diện Mạng) là thành phần phần cứng cho phép hệ thống máy tính kết nối và giao tiếp qua mạng máy tính. Trong môi trường ảo hóa, NIC vật lý được trừu tượng hóa bởi hypervisor để cung cấp kết nối mạng cho máy ảo thông qua bộ điều hợp mạng ảo và switch phân tán.

## Tổng Quan

NIC Card cung cấp:
- Kết nối mạng vật lý cho hệ thống máy tính
- Truyền và nhận dữ liệu qua phương tiện mạng
- Triển khai và xử lý giao thức mạng
- Hỗ trợ bộ điều hợp mạng ảo cho máy ảo

## Tính Năng Chính

### Kết Nối Mạng
- **Hỗ Trợ Ethernet**: Các tùy chọn kết nối 10/100/1000/10000 Mbps
- **Hỗ Trợ Fiber Channel**: Kết nối mạng quang học tốc độ cao
- **Kết Nối Không Dây**: Các tiêu chuẩn mạng không dây Wi-Fi và khác
- **Hỗ Trợ Nhiều Cổng**: Cấu hình NIC đơn và đa cổng

### Khả Năng Hiệu Suất
- **Băng Thông Cao**: Hỗ trợ tốc độ gigabit và đa gigabit
- **Độ Trễ Thấp**: Độ trễ tối thiểu trong xử lý gói mạng
- **Tải Xuống Phần Cứng**: Tải xuống xử lý mạng cho phần cứng chuyên dụng
- **Chất Lượng Dịch Vụ**: Ưu tiên lưu lượng và quản lý băng thông

### Hỗ Trợ Ảo Hóa
- **Mạng VMkernel**: Mạng máy chủ ESXi và mạng vMotion
- **Mạng Máy Ảo**: Kết nối mạng hệ điều hành khách
- **Kiểm Soát I/O Mạng**: Phân bổ tài nguyên và định hình lưu lượng
- **Tổng Hợp Liên Kết**: Kết hợp nhiều NIC để tăng băng thông

## Kiến Trúc

### Thành Phần Cốt Lõi
- **Bộ Xử Lý Mạng**: Chip chuyên dụng để xử lý gói
- **Địa Chỉ MAC**: Định danh phần cứng duy nhất cho giao tiếp mạng
- **Bộ Thu Phát**: Thành phần chuyển đổi tín hiệu điện sang quang
- **Bộ Đệm Bộ Nhớ**: Lưu trữ tạm thời cho gói mạng

### Loại Giao Diện
- **RJ-45**: Đầu nối Ethernet tiêu chuẩn cho cáp đồng
- **SFP/SFP+**: Mô-đun dạng nhỏ có thể cắm cho kết nối quang
- **QSFP/QSFP+**: Mô-đun dạng nhỏ có thể cắm tứ giác cho kết nối tốc độ cao
- **USB**: Bộ điều hợp mạng USB cho kết nối di động

### Tính Năng Tải Xuống
- **Tải Xuống TCP/IP**: Tăng tốc phần cứng cho xử lý TCP/IP
- **Tải Xuống Kiểm Tra**: Tính toán kiểm tra gói phần cứng
- **Tải Xuống Gửi Lớn (LSO)**: Phân đoạn các gói mạng lớn
- **Mở Rộng Phía Nhận (RSS)**: Phân phối xử lý nhận qua các nhân CPU

## Ảo Hóa trong VMware

### Trừu Tượng NIC Vật Lý
- **vmnic**: Đại diện NIC vật lý trong ESXi
- **Ánh Xạ Uplink**: Kết nối giữa NIC vật lý và switch ảo
- **Tổ Hợp NIC**: Cân bằng tải và chuyển đổi dự phòng cho dự phòng mạng
- **Giám Sát Mạng**: Theo dõi hiệu suất và khắc phục sự cố

### Bộ Điều Hợp Mạng Ảo
- **vmxnet3**: Bộ điều hợp mạng ảo hóa để hiệu suất tối ưu
- **E1000**: Bộ điều hợp mạng mô phỏng để tương thích
- **E1000e**: Bộ điều hợp mạng mô phỏng nâng cao cho hệ điều hành khách mới
- **SR-IOV**: Ảo Hóa I/O Gốc Đơn cho truy cập phần cứng trực tiếp

### Công Nghệ Mạng Ảo Hóa
- **Switch Chuẩn vSphere (vSS)**: Chức năng switch ảo cơ bản
- **Switch Phân Tán vSphere (vDS)**: Chuyển mạch nâng cao với quản lý tập trung
- **NSX-T**: Mạng định nghĩa bằng phần mềm cho môi trường ảo
- **Phản Chiếu Cổng**: Giám sát và phân tích lưu lượng mạng

## Ví Dụ Cấu Hình

### Cấu Hình NIC ESXi
```bash
# Xem thông tin NIC vật lý
esxcli network nic list

# Kiểm tra thông tin trình điều khiển NIC
esxcli network nic get -n vmnic0

# Xem thống kê NIC
esxcli network nic stats get -n vmnic0

# Kiểm tra trạng thái liên kết NIC
esxcli network nic get -n vmnic0 | grep -i link
```

### Quản Lý NIC PowerCLI
```powershell
# Xem thông tin NIC vật lý cho host ESXi
Get-VMHost | Get-VMHostNetworkAdapter -Physical

# Cấu hình chính sách tổ hợp NIC
Get-VDSwitch "MyVDSwitch" | Get-VDUplinkPort | Set-VDUplinkPort -ActiveUplinkPort "vmnic0","vmnic1"

# Kiểm tra trạng thái NIC
Get-VMHost "esxi01.domain.com" | Get-VMHostNetworkAdapter -Physical | Select-Object Name, LinkSpeed, FullDuplex

# Bật/tắt NIC vật lý
Get-VMHostNetworkAdapter -Physical -Name "vmnic0" | Set-VMHostNetworkAdapter -Enabled $false -Confirm:$false
```

### Cấu Hình vSphere Client
```bash
# Cấu hình Switch Phân Tán vSphere
# 1. Điều hướng đến Mạng > Switch Phân Tán
# 2. Nhấp chuột phải và chọn "Switch Phân Tán Mới"
# 3. Cấu hình cài đặt switch và phiên bản
# 4. Thêm host và uplink NIC vật lý
# 5. Cấu hình nhóm cổng và chính sách
```

## Yêu Cầu

### Phần Cứng
- **NIC Tương Thích**: NIC từ Danh Sách Tương Thích Phần Cứng VMware (HCL)
- **Băng Thông Tối Thiểu**: Tốc độ mạng đủ cho yêu cầu khối lượng công việc
- **Hỗ Trợ Trình Điều Khiển**: Trình điều khiển tương thích cho phiên bản ESXi
- **Yêu Cầu Điện Năng**: Nguồn điện đầy đủ cho hoạt động NIC

### Phần Mềm
- **ESXi 6.5 trở lên**: Host với hỗ trợ ảo hóa NIC
- **vCenter Server**: Quản lý tài nguyên NIC tập trung
- **Giấy Phép Thích Hợp**: Giấy phép vSphere cho tính năng mạng
- **Cập Nhật Firmware**: Firmware hiện tại để hiệu suất tối ưu

### Tương Thích
- **Mô Hình NIC**: Hỗ trợ cho các mô hình NIC và nhà sản xuất cụ thể
- **Yêu Cầu Tốc Độ**: Tương thích với tốc độ mạng yêu cầu
- **Tính Năng Ảo Hóa**: Hỗ trợ cho các công nghệ ảo hóa nâng cao
- **Giao Thức Quản Lý**: Hỗ trợ SNMP, LLDP và các giao thức khác

## Tổ Hợp NIC và Dự Phòng

### Thuật Toán Cân Bằng Tải
- **Định Tuyến Dựa Trên ID Cổng Ảo Gốc**: Chính sách cân bằng tải mặc định
- **Định Tuyến Dựa Trên Băm IP**: Cân bằng tải dựa trên IP nguồn và đích
- **Định Tuyến Dựa Trên Băm MAC Nguồn**: Cân bằng tải dựa trên địa chỉ MAC nguồn
- **Định Tuyến Dựa Trên Tải NIC Vật Lý**: Cân bằng tải động dựa trên sử dụng

### Chính Sách Chuyển Đổi Dự Phòng
- **Bộ Điều Hợp Hoạt Động**: NIC chính cho lưu lượng mạng
- **Bộ Điều Hợp Dự Phòng**: NIC dự phòng cho kịch bản chuyển đổi
- **Bộ Điều Hợp Không Sử Dụng**: NIC dự trữ cho mở rộng tương lai
- **Phát Hiện Chuyển Đổi Mạng**: Phương pháp phát hiện lỗi mạng

### Giám Sát và Khắc Phục Sự Cố
- **Giám Sát Trạng Thái Liên Kết**: Giám sát thời gian thực trạng thái liên kết NIC
- **Chỉ Số Hiệu Suất**: Sử dụng băng thông và thống kê lỗi
- **Phân Tích Lưu Lượng**: Mẫu lưu lượng mạng và bất thường
- **Cảnh Báo**: Thông báo cho vấn đề mạng và sự cố

## Thực Hành Tốt Nhất

1. **Lựa Chọn Phần Cứng**: Sử dụng NIC từ HCL của VMware
2. **Lập Kế Hoạch Dự Phòng**: Triển khai tổ hợp NIC để chịu lỗi
3. **Giám Sát Hiệu Suất**: Thường xuyên giám sát sử dụng và hiệu suất mạng
4. **Quản Lý Trình Điều Khiển**: Cập nhật trình điều khiển và firmware NIC
5. **Quản Lý Cáp**: Sử dụng cáp chất lượng và quản lý cáp đúng cách
6. **Lập Kế Hoạch Băng Thông**: Định kích thước băng thông mạng phù hợp cho khối lượng công việc
7. **Cấu Hình Bảo Mật**: Triển khai thực hành bảo mật mạng tốt nhất
8. **Tài Liệu**: Duy trì tài liệu về cấu hình NIC

## Cải Tiến vSphere 8

### Cải Thiện Hiệu Suất Mạng
- **vmxnet3 Nâng Cao**: Hiệu suất và tính năng cải thiện cho bộ điều hợp mạng ảo
- **Tải Xuống Phần Cứng Tốt Hơn**: Hỗ trợ nâng cao cho tính năng tải xuống phần cứng
- **Độ Trễ Giảm**: Độ trễ mạng thấp hơn cho lưu lượng máy ảo
- **Khả Năng Mở Rộng Cải Thiện**: Hiệu suất tốt hơn với cấu hình số cổng cao

### Cải Thiện Bảo Mật
- **Truy Cập Mạng An Toàn**: Bảo mật nâng cao cho giao tiếp mạng
- **Lưu Lượng Được Mã Hóa**: Hỗ trợ mã hóa lưu lượng mạng
- **Phân Đoạn Vi Mô**: Chính sách bảo mật mạng chi tiết
- **Chứng Thực**: Chứng thực và xác minh thiết bị mạng tốt hơn

### Tính Năng Quản Lý
- **Giám Sát Nâng Cao**: Giám sát hiệu suất mạng nâng cao
- **Tối Ưu Hóa Tự Động**: Tối ưu hóa tài nguyên mạng tự động
- **Khắc Phục Sự Cố Cải Thiện**: Công cụ tốt hơn để phân tích hiệu suất mạng
- **Cấu Hình Đơn Giản Hóa**: Quy trình cấu hình mạng đơn giản hóa

## Lệnh Khắc Phục Sự Cố

```bash
# Kiểm tra thông tin NIC vật lý
esxcli network nic list

# Xem thông tin trình điều khiển NIC
esxcli network nic get -n vmnic0

# Kiểm tra thống kê NIC
esxcli network nic stats get -n vmnic0

# Xem kết nối mạng
esxcli network vm list

# Kiểm tra cấu hình mạng
esxcli network ip interface list

# Xem thông tin switch
esxcli network vswitch standard list

# Kiểm tra vấn đề hiệu suất mạng
tail -f /var/log/vmkernel.log | grep -i network

# Kiểm tra kết nối mạng
vmkping -I vmk0 192.168.1.1
```

## Công Nghệ Liên Quan

- [ESXi](/glossary/term/esxi.md)
- [vSphere](/glossary/term/vsphere.md)
- [Switch Phân Tán vSphere](/glossary/term/vsphere-distributed-switch.md)
- [Tổ Hợp NIC](/glossary/term/nic-teaming.md)
- [Kiểm Soát I/O Mạng](/glossary/term/network-i-o-control-nioc.md)
- [SR-IOV](/glossary/term/sr-iov.md)
- [Nhóm Cổng](/glossary/term/port-group.md)
- [Uplink](/glossary/term/uplinks.md)