---
term: VMware vCenter Converter
category: Migration
---

VMware vCenter Converter là công cụ phần mềm cho phép chuyển đổi máy vật lý và máy ảo từ các nền tảng bên thứ ba thành máy ảo VMware. Nó cung cấp quy trình đơn giản hóa để di chuyển khối lượng công việc đến môi trường VMware vSphere, hỗ trợ cả di chuyển nóng (trực tiếp) và lạnh (ngoại tuyến) với thời gian ngừng hoạt động tối thiểu.

## Tổng Quan

VMware vCenter Converter cung cấp:
- Khả năng chuyển đổi Vật lý sang Ảo (P2V)
- Chuyển đổi Ảo sang Ảo (V2V) giữa các nền tảng ảo hóa khác nhau
- Hỗ trợ di chuyển trực tiếp với thời gian ngừng hoạt động tối thiểu
- Quản lý tập trung thông qua tích hợp vCenter Server

## Tính Năng Chính

### Loại Chuyển Đổi
- **Vật lý sang Ảo (P2V)**: Chuyển đổi máy vật lý thành VM VMware
- **Ảo sang Ảo (V2V)**: Chuyển đổi VM từ các nền tảng khác (Hyper-V, Xen, v.v.)
- **Di Chuyển Nóng**: Chuyển đổi hệ thống đang chạy mà không cần tắt máy
- **Di Chuyển Lạnh**: Chuyển đổi hệ thống ngoại tuyến cho di chuyển có kế hoạch

### Hỗ Trợ Nền Tảng
- **Nền Tảng Nguồn**: Windows, Linux, Hyper-V, Xen, VirtualBox
- **Nền Tảng Đích**: VMware vSphere, ESXi, Workstation
- **Hỗ Trợ Phần Cứng**: Các kiến trúc CPU và loại thiết bị khác nhau
- **Hỗ Trợ Hệ Thống Tập Tin**: NTFS, FAT, ext2, ext3, ext4, XFS

### Tùy Chọn Di Chuyển
- **Chuyển Đổi Trực Tiếp**: Chuyển đổi hệ thống đang chạy mà không cần tắt máy
- **Chuyển Đổi Ngoại Tuyến**: Chuyển đổi hệ thống đã tắt nguồn
- **Chuyển Đổi Đồng Bộ Hóa**: Nhiều lần đồng bộ hóa để thời gian ngừng hoạt động tối thiểu
- **Cài Đặt Tùy Chỉnh**: Điều chỉnh cấu hình CPU, bộ nhớ và đĩa

## Kiến Trúc

### Thành Phần
- **Converter Độc Lập**: Ứng dụng độc lập để chuyển đổi trực tiếp
- **Converter Doanh Nghiệp**: Phiên bản tích hợp vCenter Server để quản lý tập trung
- **Agent Converter**: Phần mềm nhẹ được cài đặt trên máy nguồn
- **Trình Quản Lý Converter**: Thành phần quản lý trung tâm cho phiên bản Doanh Nghiệp

### Quy Trình Chuyển Đổi
1. **Chuẩn Bị**: Cài đặt agent và cấu hình cài đặt chuyển đổi
2. **Phân Tích**: Phân tích hệ thống nguồn để kiểm tra tính tương thích
3. **Chuyển Đổi**: Sao chép dữ liệu và tạo máy ảo
4. **Tùy Chỉnh**: Điều chỉnh cài đặt VM và cài đặt VMware Tools
5. **Xác Nhận**: Xác minh chuyển đổi thành công và chức năng

### Phương Pháp Truyền Dữ Liệu
- **Sao chép nóng**: Sao chép dữ liệu từ hệ thống đang chạy
- **Sao chép lạnh**: Sao chép dữ liệu từ hệ thống ngoại tuyến
- **Cập nhật gia tăng**: Đồng bộ hóa thay đổi trong chuyển đổi nhiều lần
- **Truyền qua mạng**: Truyền dữ liệu qua kết nối mạng
- **Phương tiện di động**: Sử dụng ổ USB hoặc phương tiện khác để truyền dữ liệu

## Ví Dụ Cấu Hình

### Sử Dụng Converter Độc Lập
```powershell
# Chuyển đổi máy vật lý Windows thành VM
# 1. Khởi chạy VMware vCenter Converter Standalone
# 2. Chọn "Chuyển Đổi Máy"
# 3. Chọn loại nguồn: "Máy đang chạy"
# 4. Nhập chi tiết máy nguồn (IP, thông tin xác thực)
# 5. Chọn đích: vCenter Server hoặc host ESXi
# 6. Cấu hình cài đặt VM (tên, tài nguyên, lưu trữ)
# 7. Lên lịch chuyển đổi và bắt đầu quy trình

# Ví dụ chuyển đổi dòng lệnh
vmware-converter-cli --source-type=physical --source-ip=192.168.1.100 --source-user=administrator --source-password=password --dest-type=virtual --dest-host=esxi01.domain.com --vm-name="MigratedVM"
```

### Cấu Hình Converter Doanh Nghiệp
```powershell
# Cấu hình Converter Enterprise trong vCenter
# 1. Cài đặt VMware vCenter Converter Enterprise
# 2. Thêm Converter như tiện ích mở rộng trong vCenter
# 3. Cấu hình cài đặt Converter trong vSphere Client
# 4. Triển khai agent Converter đến máy nguồn
# 5. Tạo công việc chuyển đổi thông qua vSphere Client

# Script PowerShell cho chuyển đổi hàng loạt
$Converter = Connect-Converter -Server "vcenter.domain.com" -User "administrator@vsphere.local" -Password "password"
$SourceMachines = @("server01", "server02", "server03")
foreach ($Machine in $SourceMachines) {
    New-ConverterJob -Source $Machine -Destination "esxi01.domain.com" -VMName "$Machine-VM" -StartImmediately
}
```

## Yêu Cầu

### Yêu Cầu Hệ Thống
- **Máy Chủ Converter**: Windows Server 2008 R2 trở lên
- **Máy Nguồn**: Hệ điều hành Windows hoặc Linux được hỗ trợ
- **Máy Chủ Đích**: ESXi 4.0 trở lên, vCenter Server 4.0 trở lên
- **Mạng**: Kết nối giữa hệ thống nguồn, converter và đích

### Yêu Cầu Phần Cứng
- **CPU**: Bộ xử lý tối thiểu 2 GHz (khuyến nghị: 4 nhân)
- **Bộ Nhớ**: RAM tối thiểu 4 GB (khuyến nghị: 8 GB trở lên)
- **Dung Lượng Đĩa**: Dung lượng đủ cho tệp tạm thời và nhật ký
- **Mạng**: Kết nối mạng 1 Gbps (khuyến nghị: 10 Gbps cho di chuyển lớn)

### Yêu Cầu Phần Mềm
- **vCenter Server**: Để tích hợp phiên bản Enterprise
- **VMware Tools**: Để hiệu suất VM tối ưu sau chuyển đổi
- **Trình Duyệt Được Hỗ Trợ**: Cho giao diện quản lý dựa trên web
- **Loại Trừ Diệt Virus**: Loại trừ thư mục Converter khỏi quét diệt virus

## Lập Kế Hoạch Di Chuyển

### Đánh Giá Trước Di Chuyển
- **Kiểm Kê Hệ Thống**: Danh mục hệ thống và ứng dụng nguồn
- **Kiểm Tra Tương Thích**: Xác minh tính tương thích phần cứng và phần mềm
- **Lập Kế Hoạch Tài Nguyên**: Đánh giá yêu cầu tài nguyên đích
- **Lập Kế Hoạch Mạng**: Lập kế hoạch băng thông mạng và kết nối
- **Chiến Lược Sao Lưu**: Đảm bảo sao lưu trước di chuyển

### Thực Hành Tốt Nhất Cho Chuyển Đổi
- **Di Chuyển Thử Nghiệm**: Thực hiện chuyển đổi thử nghiệm trước di chuyển sản xuất
- **Lên Lịch Thời Gian Dừng**: Lên kế hoạch thời gian dừng ngắn trong đồng bộ hóa cuối cùng
- **Giám Sát Tiến Độ**: Theo dõi tiến độ và hiệu suất chuyển đổi
- **Xác Nhận Kết Quả**: Xác minh chức năng sau chuyển đổi
- **Cập Nhật Tài Liệu**: Tài liệu hóa hệ thống và cấu hình đã chuyển đổi

### Tác Vụ Sau Di Chuyển
- **Cài Đặt VMware Tools**: Cài đặt hoặc cập nhật VMware Tools
- **Tối Ưu Hóa Hệ Thống**: Tối ưu hóa cài đặt VM cho môi trường ảo
- **Cấu Hình Mạng**: Cập nhật địa chỉ IP và cài đặt mạng
- **Kiểm Tra Ứng Dụng**: Xác minh chức năng ứng dụng
- **Hủy Bỏ Nguồn**: Loại bỏ hoặc tái sử dụng hệ thống nguồn

## Khắc Phục Sự Cố

### Vấn Đề Phổ Biến
- **Lỗi Cài Đặt Agent**: Kiểm tra cài đặt tường lửa và diệt virus
- **Kết Nối Mạng**: Xác minh kết nối mạng và quyền
- **Lỗi Chuyển Đổi Đĩa**: Kiểm tra dung lượng đĩa và tính tương thích hệ thống tập tin
- **Vấn Đề Hiệu Suất**: Giám sát sử dụng tài nguyên trong chuyển đổi
- **Vấn Đề Khởi Động**: Xác minh cấu hình khởi động và cài đặt VMware Tools

### Lệnh Chẩn Đoán
```bash
# Kiểm tra trạng thái dịch vụ Converter
sc query vmware-converter

# Xem nhật ký Converter
Get-Content "C:\ProgramData\VMware\VMware vCenter Converter Standalone\Logs\*.log" -Tail 100

# Giám sát hiệu suất mạng trong chuyển đổi
netstat -an | findstr :443

# Kiểm tra dung lượng đĩa trên đích
Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'" | Select-Object Size,FreeSpace

# Xác minh kết nối hệ thống nguồn
Test-NetConnection -ComputerName "source-machine" -Port 443
```

## Tích Hợp vSphere

### Tích Hợp vCenter Server
- **Quản Lý Tập Trung**: Quản lý chuyển đổi thông qua vSphere Client
- **Truy Cập Dựa Trên Vai Trò**: Kiểm soát truy cập thông qua quyền vCenter
- **Giám Sát Tác Vụ**: Giám sát tác vụ chuyển đổi thông qua tác vụ vCenter
- **Quản Lý Tài Nguyên**: Tích hợp với nhóm tài nguyên và thư mục vCenter

### Khả Năng Tự Động Hóa
- **Hỗ Trợ PowerCLI**: Tự động hóa chuyển đổi với script PowerShell
- **Chuyển Đổi Theo Lịch**: Lên kế hoạch và lên lịch công việc chuyển đổi
- **Hoạt Động Hàng Loạt**: Chuyển đổi nhiều hệ thống đồng thời
- **Báo Cáo**: Tạo báo cáo về trạng thái và kết quả chuyển đổi

## Xem Xét Bảo Mật

### Xác Thực và Ủy Quyền
- **Quản Lý Thông Tin Xác Thực**: Lưu trữ và xử lý thông tin xác thực nguồn an toàn
- **Truy Cập Dựa Trên Vai Trò**: Kiểm soát truy cập vào chức năng chuyển đổi
- **Ghi Nhật Ký Kiểm Toán**: Theo dõi hoạt động và thay đổi chuyển đổi
- **Mã Hóa**: Truyền thông an toàn giữa các thành phần

### Bảo Vệ Dữ Liệu
- **Mã Hóa Mạng**: Truyền dữ liệu an toàn qua mạng
- **Quyền Hệ Thống Tập Tin**: Duy trì quyền tập tin trong chuyển đổi
- **Toàn Vẹn Dữ Liệu**: Xác minh toàn vẹn dữ liệu trong và sau chuyển đổi
- **Tuân Thủ**: Đảm bảo tuân thủ các quy định bảo vệ dữ liệu

## Công Nghệ Liên Quan

- [vSphere](/glossary/term/vsphere.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [VMware Tools](/glossary/term/vmware-tools.md)
- [vMotion](/glossary/term/vmotion.md)
- [Storage vMotion](/glossary/term/storage-vmotion.md)
- [VMware HCX](/glossary/term/hcx.md)