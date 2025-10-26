---
term: [VI] Guest Operating System
category: Virtual_Machine
language: vi
---

Guest Operating System (Guest OS) là hệ điều hành chạy bên trong máy ảo (VM). Guest OS không biết rằng nó đang chạy trên một môi trường ảo hóa và hoạt động như thể đang chạy trên phần cứng vật lý thực sự.

## Tổng quan

Guest OS có các đặc điểm chính sau:
- Hoạt động độc lập với hệ điều hành của host
- Được cài đặt và cấu hình giống như trên máy tính vật lý
- Có thể là bất kỳ hệ điều hành nào được hỗ trợ bởi VMware
- Tương tác với phần cứng ảo thông qua hypervisor

## Cách thức hoạt động

### Virtual Hardware Abstraction
Guest OS tương tác với phần cứng ảo thông qua:
- Virtual CPU (vCPU) thay vì CPU vật lý
- Virtual memory thay vì RAM vật lý
- Virtual storage devices thay vì ổ đĩa vật lý
- Virtual network adapters thay vì card mạng vật lý

### VMware Tools
VMware Tools là một bộ tiện ích được cài đặt trong Guest OS để:
- Tối ưu hóa hiệu suất của VM
- Cung cấp tích hợp chặt chẽ hơn với hypervisor
- Hỗ trợ các tính năng nâng cao như vMotion
- Cho phép thu thập thông tin chi tiết về Guest OS

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Kiểm tra Guest OS của VM
Get-VM "MyVM" | Select Name, Guest, PowerState

# Cài đặt VMware Tools cho VM
Get-VM "MyVM" | Mount-Tools
```

### CLI Configuration
```bash
# Kiểm tra thông tin Guest OS từ ESXi host
vim-cmd vmsvc/get.guest 123

# Kiểm tra trạng thái VMware Tools
vim-cmd vmsvc/tools.installstate 123
```

## Các loại Guest OS được hỗ trợ

### Windows
- Windows Server 2022, 2019, 2016, 2012 R2
- Windows 11, 10, 8.1

### Linux
- Red Hat Enterprise Linux (RHEL) 6, 7, 8, 9
- SUSE Linux Enterprise Server (SLES) 12, 15
- Ubuntu Server 18.04, 20.04, 22.04
- CentOS 7, 8

### Các hệ điều hành khác
- FreeBSD
- Solaris
- macOS (giới hạn bởi giấy phép)

## Các tính năng nâng cao trong vSphere 8

### Guest OS Hardening
- Tăng cường bảo mật cho Guest OS
- Tích hợp với vSphere Trust Authority
- Hỗ trợ mã hóa VM

### Guest Operations
- Thực thi lệnh từ xa trong Guest OS
- Sao chép file vào/ra Guest OS
- Quản lý process trong Guest OS

## Thực hành tốt nhất

1. **Cập nhật định kỳ**: Luôn cập nhật Guest OS với các bản vá bảo mật mới nhất
2. **VMware Tools**: Luôn cài đặt và cập nhật VMware Tools
3. **Resource Allocation**: Cấp phát tài nguyên phù hợp cho Guest OS
4. **Monitoring**: Giám sát hiệu suất và tình trạng của Guest OS
5. **Backup**: Thực hiện backup định kỳ cho Guest OS

## Lệnh khắc phục sự cố

```bash
# Kiểm tra trạng thái Guest OS từ ESXi host
esxcli vm process list

# Xem thông tin IP của Guest OS
vim-cmd vmsvc/get.guest 123 | grep ipAddress

# Kiểm tra trạng thái VMware Tools
vim-cmd vmsvc/tools.installstate 123

# Kiểm tra hiệu suất của Guest OS
esxtop -c /path/to/guest/config
```

## Công nghệ liên quan

- [Virtual Machine](/glossary/term/virtual-machine.md)
- [VMware Tools](/glossary/term/vmware-tools.md)
- [vSphere Client](/glossary/term/vsphere-client.md)
- [Guest Operations API](/glossary/term/guest-operations-api)