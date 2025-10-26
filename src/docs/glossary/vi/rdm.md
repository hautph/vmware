---
term: Raw Device Mapping (RDM)
category: Storage
language: vi
---

Raw Device Mapping (RDM) là cơ chế trong vSphere cho phép ánh xạ một LUN từ storage trực tiếp vào máy ảo (VM), bỏ qua lớp VMFS. RDM cho phép VM truy cập trực tiếp vào thiết bị lưu trữ vật lý, hỗ trợ các tính năng như clustering, SAN management và migration.

## Tổng quan

Raw Device Mapping (RDM) có các đặc điểm chính sau:
- Ánh xạ trực tiếp LUN storage vào VM
- Bỏ qua lớp VMFS để truy cập thiết bị vật lý
- Hỗ trợ các tính năng clustering và SAN management
- Có hai chế độ: Physical Compatibility và Virtual Compatibility

## Cách thức hoạt động

### Physical Compatibility Mode
Chế độ Physical Compatibility:
- VM thấy thiết bị vật lý thực sự
- Hỗ trợ các lệnh SCSI pass-through
- Không hỗ trợ snapshot và cloning
- Phù hợp cho clustering và SAN management

### Virtual Compatibility Mode
Chế độ Virtual Compatibility:
- VM thấy virtual disk giống như .vmdk
- Hỗ trợ snapshot, cloning và Storage vMotion
- Không hỗ trợ các lệnh SCSI đặc biệt
- Phù hợp cho migration và backup

### RDM Mapping File
File mapping RDM bao gồm:
- Metadata về thiết bị vật lý
- Thông tin mapping giữa VM và LUN
- Các thiết lập compatibility mode
- Được lưu trữ trên VMFS datastore

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
``powershell
# Tạo RDM mới ở chế độ Physical Compatibility
New-HardDisk -VM "MyVM" -DiskType RawPhysical -ScsiController 0 -ScsiId 1

# Tạo RDM mới ở chế độ Virtual Compatibility
New-HardDisk -VM "MyVM" -DiskType RawVirtual -ScsiController 0 -ScsiId 1

# Xem thông tin RDM
Get-VM "MyVM" | Get-HardDisk | Where-Object {$_.DiskType -like "Raw*"}

# Chuyển đổi RDM mode
Get-VM "MyVM" | Get-HardDisk | Where-Object {$_.Name -eq "Hard disk 2"} | Set-HardDisk -DiskType RawVirtual
```

### CLI Configuration
``bash
# Tạo RDM mapping file
vmkfstools -z /vmfs/devices/disks/naa.600508b1001c4a2f0000000000000001 /vmfs/volumes/datastore1/MyVM/MyRDM.vmdk

# Xem thông tin RDM
vmkfstools -q /vmfs/volumes/datastore1/MyVM/MyRDM.vmdk

# Kiểm tra LUN mapping
esxcli storage core path list

# Xem thông tin thiết bị
esxcli storage core device list -d naa.600508b1001c4a2f0000000000000001
```

## Các tình huống sử dụng

### Microsoft Cluster Service (MSCS)
- Clustering trên Windows Server
- Yêu cầu truy cập trực tiếp LUN
- Sử dụng Physical Compatibility mode

### SAN Management Applications
- Ứng dụng quản lý SAN
- Cần truy cập trực tiếp thiết bị
- Sử dụng Physical Compatibility mode

### Physical to Virtual (P2V) Migration
- Migration từ physical server
- Giữ nguyên cấu hình storage
- Sử dụng Virtual Compatibility mode

## Các tính năng nâng cao trong vSphere 8

### Enhanced RDM Support
- Cải thiện hiệu suất RDM operations
- Hỗ trợ các storage mới
- Tối ưu hóa việc sử dụng storage

### RDM Management
- Cải thiện giao diện quản lý RDM
- Hỗ trợ các tính năng mới
- Tăng độ tin cậy

## Thực hành tốt nhất

1. **Compatibility Mode Selection**: Chọn chế độ phù hợp với yêu cầu
2. **LUN Management**: Quản lý LUN đúng cách
3. **Monitoring**: Theo dõi hiệu suất và lỗi RDM
4. **Backup**: Thực hiện backup phù hợp với loại RDM

## Lệnh khắc phục sự cố

```bash
# Xem thông tin RDM
vmkfstools -q /vmfs/volumes/datastore1/MyVM/MyRDM.vmdk

# Kiểm tra LUN mapping
esxcli storage core path list

# Xem thông tin thiết bị
esxcli storage core device list -d naa.600508b1001c4a2f0000000000000001

# Kiểm tra log RDM
tail -f /var/log/vmkernel.log | grep -i rdm
```

## Công nghệ liên quan

- [VMFS](/glossary/term/vmfs.md)
- [Datastore](/glossary/term/datastore.md)
- [LUN](/glossary/term/lun)
- [Storage vMotion](/glossary/term/storage-vmotion.md)
- [Clustering](/glossary/term/clustering)