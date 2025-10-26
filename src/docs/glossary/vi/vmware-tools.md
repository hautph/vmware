---
term: VMware Tools
category: Core_Architecture
language: vi
---

VMware Tools là bộ tiện ích và driver được cài đặt trong hệ điều hành khách của máy ảo để tối ưu hóa hiệu suất và quản lý VM. VMware Tools cung cấp tích hợp chặt chẽ giữa hypervisor và guest OS, cải thiện hiệu suất, bảo mật và khả năng quản lý của máy ảo.

## Tổng quan

VMware Tools có các đặc điểm chính sau:
- Bộ driver và tiện ích cho guest OS
- Cải thiện hiệu suất và khả năng quản lý VM
- Hỗ trợ nhiều hệ điều hành khách khác nhau
- Tự động cập nhật với phiên bản mới

## Kiến trúc

### Các thành phần chính
VMware Tools bao gồm các thành phần sau:
- **Device Drivers**: Driver thiết bị ảo hóa
- **VMware Services**: Dịch vụ nền trong guest OS
- **User Components**: Thành phần người dùng (giao diện)
- **VMware Tools API**: API cho tích hợp và tự động hóa

### Các dịch vụ chính
- **VMware Tools Service**: Dịch vụ chính quản lý các thành phần
- **PVSCSI Driver**: Driver SCSI ảo hiệu suất cao
- **VMXNET Driver**: Driver mạng ảo hiệu suất cao
- **Balloon Driver**: Driver quản lý bộ nhớ

## Các tính năng chính

### Tối ưu hóa hiệu suất
- **Paravirtualized Drivers**: Driver ảo hóa song song
- **Memory Ballooning**: Quản lý bộ nhớ động
- **Time Synchronization**: Đồng bộ thời gian với host
- **CPU Optimization**: Tối ưu hóa sử dụng CPU

### Quản lý nâng cao
- **Guest Operations**: Thực thi lệnh trong guest OS
- **File Transfer**: Sao chép file vào/ra VM
- **Snapshot Optimization**: Tối ưu hóa snapshot
- **Quiescing**: Tạm dừng ứng dụng để backup nhất quán

### Tích hợp desktop
- **Unity Mode**: Tích hợp ứng dụng VM với desktop host
- **Shared Folders**: Thư mục chia sẻ giữa host và guest
- **Drag and Drop**: Kéo thả giữa host và guest
- **Copy/Paste**: Sao chép/dán giữa host và guest

## VMware Tools 8 Cải tiến

### Hiệu suất
- Tối ưu hóa driver mới cho hiệu suất cao hơn
- Cải thiện độ trễ mạng và lưu trữ
- Hỗ trợ các công nghệ phần cứng mới
- Tối ưu hóa cho các workload hiện đại

### Bảo mật
- Tích hợp với vSphere Trust Authority
- Cải thiện mã hóa giao tiếp
- Hỗ trợ các giao thức bảo mật mới
- Giảm bề mặt tấn công

### Quản lý
- Tự động cập nhật nâng cao
- PowerCLI nâng cao cho quản lý
- Cải thiện khả năng giám sát
- Template và profile cho cấu hình nhất quán

## Các loại VMware Tools

### Operating System Specific Packages (OSPs)
- Gói riêng biệt cho từng hệ điều hành
- Quản lý thông qua package manager
- Tự động cập nhật với hệ điều hành
- Hỗ trợ repository riêng

### VMware Tools ISO
- Image ISO chứa các phiên bản Tools
- Cài đặt thủ công hoặc tự động
- Hỗ trợ nhiều hệ điều hành
- Dễ dàng phân phối

### Open VM Tools
- Phiên bản mã nguồn mở của VMware Tools
- Hỗ trợ cho các hệ điều hành Linux
- Quản lý thông qua package manager
- Không có một số tính năng desktop

## Cấu hình

### Cài đặt
1. Mount VMware Tools ISO
2. Chạy installer trong guest OS
3. Khởi động lại guest OS
4. Xác minh cài đặt

### Cấu hình nâng cao
- **Time Synchronization**: Cấu hình đồng bộ thời gian
- **Memory Management**: Cấu hình quản lý bộ nhớ
- **Network Settings**: Cấu hình mạng
- **Security Settings**: Cấu hình bảo mật

## Thực hành tốt nhất

1. **Luôn cập nhật**: Duy trì phiên bản mới nhất của VMware Tools
2. **Giám sát**: Theo dõi hiệu suất và trạng thái Tools
3. **Backup**: Backup trước khi cập nhật Tools
4. **Kiểm thử**: Kiểm tra sau khi cập nhật Tools
5. **Tài liệu**: Ghi chép phiên bản và cấu hình Tools

## Lệnh quản lý

```bash
# Kiểm tra phiên bản VMware Tools trong guest OS
vmware-toolbox-cmd -v

# Kiểm tra trạng thái VMware Tools
vmware-toolbox-cmd stat raw text session

# Đồng bộ thời gian với host
vmware-toolbox-cmd timesync enable

# Xem thông tin disk
vmware-toolbox-cmd disk list
```

```powershell
# Cài đặt VMware Tools cho VM
Mount-Tools -VM "VM01"

# Kiểm tra trạng thái VMware Tools
Get-VM "VM01" | Get-View | Select Name, Guest.ToolsVersion, Guest.ToolsRunningStatus

# Nâng cấp VMware Tools
Update-Tools -VM "VM01" -NoReboot
```

## Các công nghệ liên quan

- [Guest Operating System](/glossary/term/guest-operating-system.md)
- [Virtual Machine](/glossary/term/virtual-machine.md)
- [Paravirtualization](/glossary/term/paravirtualization)
- [VMware Tools API](/glossary/term/vmware-tools-api)