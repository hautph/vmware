---
term: Virtual Disk File (.vmdk)
category: Storage
language: vi
---

Virtual Disk File (.vmdk) là file đĩa ảo đại diện cho ổ đĩa cứng của máy ảo (VM) trong vSphere. File .vmdk chứa dữ liệu của hệ điều hành, ứng dụng và dữ liệu người dùng của VM. Đây là thành phần quan trọng nhất của VM về mặt lưu trữ.

## Tổng quan

Virtual Disk File (.vmdk) có các đặc điểm chính sau:
- Là file đại diện cho ổ đĩa cứng ảo của VM
- Có thể được lưu trữ trên local storage hoặc shared storage
- Hỗ trợ nhiều loại disk provisioning (thick, thin)
- Có thể được mở rộng, thu nhỏ và chuyển đổi giữa các loại

## Cách thức hoạt động

### Disk Descriptor và Data Files
File .vmdk bao gồm:
- Descriptor file: Chứa metadata về disk (kích thước, loại, parent, v.v.)
- Data files: Chứa dữ liệu thực tế của disk
- Trong một số trường hợp, có thể có nhiều data files

### Disk Types
Các loại disk trong vSphere:
- **Thick Provision Lazy Zeroed**: Phân bổ toàn bộ không gian ngay lập tức, zero khi ghi
- **Thick Provision Eager Zeroed**: Phân bổ toàn bộ không gian và zero ngay lập tức
- **Thin Provision**: Phân bổ không gian khi cần thiết

### Disk Modes
Các chế độ disk:
- **Persistent**: Thay đổi được lưu trữ vĩnh viễn
- **Non-persistent**: Thay đổi bị mất khi VM reboot
- **Undoable**: Thay đổi được lưu vào file riêng và có thể undo

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
``powershell
# Tạo virtual disk mới
New-HardDisk -VM "MyVM" -CapacityGB 100 -StorageFormat Thick

# Xem thông tin virtual disk
Get-VM "MyVM" | Get-HardDisk

# Thay đổi disk mode
Get-VM "MyVM" | Get-HardDisk | Set-HardDisk -Persistence "IndependentPersistent"

# Mở rộng virtual disk
Get-VM "MyVM" | Get-HardDisk | Set-HardDisk -CapacityGB 200 -Confirm:$false
```

### CLI Configuration
```bash
# Xem thông tin virtual disk
vim-cmd vmsvc/device.getdevices 123

# Tạo virtual disk mới
vmkfstools -c 100G -d thin /vmfs/volumes/datastore1/MyVM/MyDisk.vmdk

# Mở rộng virtual disk
vmkfstools -X 200G /vmfs/volumes/datastore1/MyVM/MyDisk.vmdk

# Xem thông tin chi tiết disk
vmkfstools -q /vmfs/volumes/datastore1/MyVM/MyDisk.vmdk
```

## Các tính năng nâng cao

### Linked Clones
- Tạo VM từ snapshot của VM khác
- Tiết kiệm không gian lưu trữ
- Hữu ích cho môi trường test/dev

### Storage vMotion
- Di chuyển disk file giữa các datastore
- Không downtime cho VM
- Hỗ trợ chuyển đổi disk format

### Snapshot Support
- Tạo snapshot của disk
- Cho phép rollback trạng thái
- Hỗ trợ backup và recovery

## Các tính năng nâng cao trong vSphere 8

### Enhanced Disk Management
- Cải thiện hiệu suất disk I/O
- Hỗ trợ các disk format mới
- Tối ưu hóa việc sử dụng storage

### NVMe Support
- Hỗ trợ NVMe devices
- Cải thiện hiệu suất storage
- Tích hợp tốt hơn với các storage modern

## Thực hành tốt nhất

1. **Disk Sizing**: Kế hoạch dung lượng disk phù hợp
2. **Provisioning Type**: Chọn loại provisioning phù hợp với workload
3. **Monitoring**: Theo dõi hiệu suất và dung lượng disk
4. **Backup**: Thực hiện backup định kỳ cho disk

## Lệnh khắc phục sự cố

```bash
# Xem thông tin virtual disk
vim-cmd vmsvc/device.getdevices 123

# Kiểm tra disk file
vmkfstools -q /vmfs/volumes/datastore1/MyVM/MyDisk.vmdk

# Xem thông tin chi tiết disk
vmkfstools -D /vmfs/volumes/datastore1/MyVM/MyDisk.vmdk

# Kiểm tra log disk
tail -f /var/log/vmkernel.log | grep -i disk
```

## Công nghệ liên quan

- [Datastore](/glossary/term/datastore)
- [Storage vMotion](/glossary/term/storage-vmotion)
- [Snapshot](/glossary/term/snapshot)
- [Thin Provisioning](/glossary/term/thin-provisioning)
- [Thick Provisioning](/glossary/term/thick-provisioning)