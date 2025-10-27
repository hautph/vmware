---
term: HBA/HCA Card (Host Bus Adapter/Host Channel Adapter)
category: Hardware
---

HBA (Bộ Điều Hợp Bus Máy Chủ) hoặc HCA (Bộ Điều Hợp Kênh Máy Chủ) là thành phần phần cứng kết nối bus máy chủ hoặc bus hệ thống của máy tính với các thành phần khác, thường là thiết bị lưu trữ hoặc mạng. Trong môi trường ảo hóa, HBAs/HCAs cung cấp kết nối tốc độ cao đến mạng lưu trữ (SAN), mạng fiber channel và mạng InfiniBand cho khối lượng công việc lưu trữ doanh nghiệp và tính toán hiệu suất cao.

## Tổng Quan

HBA/HCA Card cung cấp:
- Kết nối tốc độ cao đến mạng lưu trữ và mạng
- Dịch thuật giao thức giữa máy chủ và thiết bị đích
- Tải xuống phần cứng cho hoạt động lưu trữ và mạng
- Hỗ trợ ảo hóa cho nhiều máy ảo

## Tính Năng Chính

### Kết Nối Lưu Trữ
- **Hỗ Trợ Fiber Channel**: Kết nối FC 4/8/16/32 Gbps
- **Fiber Channel over Ethernet (FCoE)**: Kết nối mạng và lưu trữ hội tụ
- **Hỗ Trợ iSCSI**: Kết nối mạng lưu trữ dựa trên IP
- **Kết Nối SAS**: Serial Attached SCSI cho lưu trữ gắn trực tiếp

### Kết Nối Mạng
- **Hỗ Trợ InfiniBand**: Liên kết tốc độ cao cho môi trường HPC
- **Khả Năng RDMA**: Truy Cập Bộ Nhớ Trực Tiếp Từ Xa cho giao tiếp độ trễ thấp
- **Mạng Hội Tụ**: Vải thống nhất cho lưu lượng mạng và lưu trữ
- **Băng Thông Cao**: Hỗ trợ tốc độ mạng đa gigabit

### Khả Năng Hiệu Suất
- **Độ Trễ Thấp**: Độ trễ tối thiểu trong truyền dữ liệu
- **Thông Lượng Cao**: Hỗ trợ cho ứng dụng băng thông cao
- **Tải Xuống Phần Cứng**: Tải xuống xử lý lưu trữ và mạng cho phần cứng chuyên dụng
- **Chất Lượng Dịch Vụ**: Ưu tiên lưu lượng và quản lý băng thông

### Hỗ Trợ Ảo Hóa
- **Hỗ Trợ NPIV**: Ảo Hóa ID N_Port cho nhiều HBA ảo
- **VM Direct Path I/O**: Truy cập phần cứng trực tiếp cho máy ảo
- **Kiểm Soát I/O Lưu Trữ**: Phân bổ tài nguyên và định hình lưu lượng
- **Đa Đường Dẫn**: Đường dẫn dự phòng để cải thiện khả năng sẵn sàng

## Kiến Trúc

### Thành Phần Cốt Lõi
- **Giao Diện Máy Chủ**: Kết nối với bus hệ thống của máy tính (PCIe)
- **Bộ Xử Lý Giao Thức**: Đơn vị xử lý cho giao thức lưu trữ/mạng
- **Bộ Đệm Bộ Nhớ**: Lưu trữ tạm thời cho dữ liệu và lệnh
- **Giao Diện Vật Lý**: Đầu nối cho cáp và thiết bị bên ngoài

### Loại Giao Diện
- **Cổng Fiber Channel**: Mô-đun SFP/SFP+ cho kết nối quang
- **Cổng Ethernet**: Đầu nối RJ-45 cho kết nối đồng
- **Đầu Nối SAS**: Đầu nối SFF/SAS cho lưu trữ gắn trực tiếp
- **Cổng InfiniBand**: Đầu nối chuyên dụng cho mạng InfiniBand

### Tính Năng Tải Xuống
- **Tải Xuống Giao Thức**: Tăng tốc phần cứng cho giao thức FC, FCoE, iSCSI
- **Tải Xuống Kiểm Tra**: Tính toán kiểm tra toàn vẹn dữ liệu phần cứng
- **Tải Xuống Mã Hóa**: Mã hóa và giải mã dữ liệu dựa trên phần cứng
- **Tải Xuống Nén**: Nén và giải nén dữ liệu dựa trên phần cứng

## Ảo Hóa trong VMware

### Trừ Tượng HBA/HCA Vật Lý
- **vmhba**: Đại diện HBA/HCA vật lý trong ESXi
- **Quản Lý Đường Dẫn Lưu Trữ**: Kết nối giữa HBA vật lý và thiết bị lưu trữ
- **Đa Đường Dẫn**: Cân bằng tải và chuyển đổi dự phòng cho dự phòng lưu trữ
- **Giám Sát Lưu Trữ**: Theo dõi hiệu suất và khắc phục sự cố

### Bộ Điều Hợp Lưu Trữ Ảo
- **Hỗ Trợ NPIV**: Nhiều HBA ảo cho máy ảo
- **Hỗ Trợ RDM**: Ánh xạ thiết bị thô cho truy cập lưu trữ trực tiếp
- **VM Direct Path I/O**: Truy cập phần cứng trực tiếp cho máy ảo
- **SCSI Ảo Hóa**: Bộ điều hợp lưu trữ tối ưu cho môi trường ảo

### Công Nghệ Ảo Hóa Lưu Trữ
- **API Lưu Trữ vSphere**: Tích hợp với tính năng mảng lưu trữ
- **Kiểm Soát I/O Lưu Trữ**: Quản lý tài nguyên cho khối lượng công việc lưu trữ
- **Khối Lượng Ảo (vVols)**: Quản lý lưu trữ dựa trên chính sách
- **vSAN**: Lưu trữ định nghĩa bằng phần mềm cho môi trường ảo

## Ví Dụ Cấu Hình

### Cấu Hình HBA/HCA ESXi
```bash
# Xem thông tin HBA vật lý
esxcli storage core adapter list

# Kiểm tra thông tin trình điều khiển HBA
esxcli storage core adapter get -a vmhba0

# Xem thống kê HBA
esxcli storage core adapter stats get -a vmhba0

# Kiểm tra trạng thái liên kết HBA
esxcli storage san fc list

# Xem đường dẫn lưu trữ
esxcli storage core path list
```

### Quản Lý HBA PowerCLI
```powershell
# Xem thông tin HBA vật lý cho host ESXi
Get-VMHost | Get-VMHostHba

# Cấu hình cài đặt HBA
Get-VMHost "esxi01.domain.com" | Get-VMHostHba -Type FibreChannel | Set-VMHostHba -SoftwareLoopback $true

# Kiểm tra trạng thái HBA
Get-VMHost "esxi01.domain.com" | Get-VMHostHba | Select-Object Device, Model, Status

# Bật/tắt HBA vật lý
Get-VMHostHba -Device "vmhba1" | Set-VMHostHba -Enabled $false -Confirm:$false
```

### Cấu Hình Lưu Trữ
```bash
# Cấu hình NPIV cho máy ảo
# 1. Bật NPIV trên host
esxcli system settings advanced set -o /Lun/EnableNPIV -i 1

# 2. Cấu hình HBA ảo trong VM
vim-cmd vmsvc/devices.createx <vmid> "vHBA" "vhba0"

# 3. Gán WWPN cho HBA ảo
vim-cmd vmsvc/devices.connect <vmid> "vhba0"
```

## Yêu Cầu

### Phần Cứng
- **HBA/HCA Tương Thích**: Thiết bị từ Danh Sách Tương Thích Phần Cứng VMware (HCL)
- **Băng Thông Tối Thiểu**: Tốc độ đủ cho yêu cầu lưu trữ/mạng
- **Hỗ Trợ Trình Điều Khiển**: Trình điều khiển tương thích cho phiên bản ESXi
- **Yêu Cầu Điện Năng**: Nguồn điện đầy đủ cho hoạt động HBA/HCA

### Phần Mềm
- **ESXi 6.5 trở lên**: Host với hỗ trợ ảo hóa HBA/HCA
- **vCenter Server**: Quản lý tài nguyên HBA/HCA tập trung
- **Giấy Phép Thích Hợp**: Giấy phép vSphere cho tính năng lưu trữ
- **Cập Nhật Firmware**: Firmware hiện tại để hiệu suất tối ưu

### Tương Thích
- **Mô Hình HBA/HCA**: Hỗ trợ cho các mô hình và nhà sản xuất cụ thể
- **Yêu Cầu Tốc Độ**: Tương thích với tốc độ yêu cầu
- **Tính Năng Ảo Hóa**: Hỗ trợ cho các công nghệ ảo hóa nâng cao
- **Giao Thức Quản Lý**: Hỗ trợ SNMP, SCSI và các giao thức khác

## Mạng Lưu Trữ và Dự Phòng

### Đa Đường Dẫn
- **Đa Đường Dẫn Tự Nhiên (NMP)**: Chính sách lựa chọn đường dẫn mặc định trong ESXi
- **Chính Sách Lựa Chọn Đường Dẫn**: Thuật toán để chọn đường dẫn lưu trữ tối ưu
- **Plugin Loại Mảng Lưu Trữ (SATPs)**: Tích hợp với tính năng mảng lưu trữ
- **Quy Tắc Yêu Cầu**: Quy tắc cho yêu cầu đường dẫn và gán chính sách

### Chính Sách Dự Phòng
- **Đường Dẫn Hoạt Động**: Đường dẫn chính cho lưu lượng lưu trữ
- **Đường Dẫn Dự Phòng**: Đường dẫn dự phòng cho kịch bản chuyển đổi
- **Đường Dẫn Vô Hiệu**: Đường dẫn dự trữ cho mở rộng tương lai
- **Giám Sát Đường Dẫn**: Phương pháp phát hiện lỗi đường dẫn

### Giám Sát và Khắc Phục Sự Cố
- **Giám Sát Trạng Thái Đường Dẫn**: Giám sát thời gian thực trạng thái đường dẫn lưu trữ
- **Chỉ Số Hiệu Suất**: Sử dụng băng thông và thống kê lỗi
- **Phân Tích Lưu Lượng**: Mẫu lưu lượng lưu trữ và bất thường
- **Cảnh Báo**: Thông báo cho vấn đề lưu trữ và sự cố

## Thực Hành Tốt Nhất

1. **Lựa Chọn Phần Cứng**: Sử dụng HBA/HCA từ HCL của VMware
2. **Lập Kế Hoạch Dự Phòng**: Triển khai đa đường dẫn để chịu lỗi
3. **Giám Sát Hiệu Suất**: Thường xuyên giám sát sử dụng và hiệu suất lưu trữ
4. **Quản Lý Trình Điều Khiển**: Cập nhật trình điều khiển và firmware HBA/HCA
5. **Quản Lý Cáp**: Sử dụng cáp chất lượng và quản lý cáp đúng cách
6. **Lập Kế Hoạch Băng Thông**: Định kích thước băng thông lưu trữ phù hợp cho khối lượng công việc
7. **Cấu Hình Bảo Mật**: Triển khai thực hành bảo mật lưu trữ tốt nhất
8. **Tài Liệu**: Duy trì tài liệu về cấu hình HBA/HCA

## Cải Tiến vSphere 8

### Cải Thiện Hiệu Suất Lưu Trữ
- **Hỗ Trợ NPIV Nâng Cao**: Hiệu suất và tính năng cải thiện cho HBA ảo
- **Tải Xuống Phần Cứng Tốt Hơn**: Hỗ trợ nâng cao cho tính năng tải xuống phần cứng
- **Độ Trễ Giảm**: Độ trễ lưu trữ thấp hơn cho lưu lượng máy ảo
- **Khả Năng Mở Rộng Cải Thiện**: Hiệu suất tốt hơn với cấu hình số cổng cao

### Cải Thiện Bảo Mật
- **Truy Cập Lưu Trữ An Toàn**: Bảo mật nâng cao cho giao tiếp lưu trữ
- **Lưu Lượng Được Mã Hóa**: Hỗ trợ mã hóa lưu lượng lưu trữ
- **Phân Đoạn Vi Mô**: Chính sách bảo mật lưu trữ chi tiết
- **Chứng Thực**: Chứng thực và xác minh thiết bị lưu trữ tốt hơn

### Tính Năng Quản Lý
- **Giám Sát Nâng Cao**: Giám sát hiệu suất lưu trữ nâng cao
- **Tối Ưu Hóa Tự Động**: Tối ưu hóa tài nguyên lưu trữ tự động
- **Khắc Phục Sự Cố Cải Thiện**: Công cụ tốt hơn để phân tích hiệu suất lưu trữ
- **Cấu Hình Đơn Giản Hóa**: Quy trình cấu hình lưu trữ đơn giản hóa

## Lệnh Khắc Phục Sự Cố

```bash
# Kiểm tra thông tin HBA vật lý
esxcli storage core adapter list

# Xem thông tin trình điều khiển HBA
esxcli storage core adapter get -a vmhba0

# Kiểm tra thống kê HBA
esxcli storage core adapter stats get -a vmhba0

# Xem kết nối lưu trữ
esxcli storage san fc list

# Kiểm tra đường dẫn lưu trữ
esxcli storage core path list

# Xem thiết bị lưu trữ
esxcli storage core device list

# Kiểm tra vấn đề hiệu suất lưu trữ
tail -f /var/log/vmkernel.log | grep -i scsi

# Kiểm tra kết nối lưu trữ
esxcli storage core device vaai status get
```

## Công Nghệ Liên Quan

- [ESXi](/glossary/term/esxi.md)
- [vSphere](/glossary/term/vsphere.md)
- [Kiểm Soát I/O Lưu Trữ](/glossary/term/storage-io-control.md)
- [NPIV](/glossary/term/npiv.md)
- [RDM](/glossary/term/rdm.md)
- [vSAN](/glossary/term/vsan.md)
- [vVols](/glossary/term/vvols.md)
- [Đa Đường Dẫn](/glossary/term/multipathing.md)