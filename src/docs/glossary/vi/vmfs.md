---
term: Virtual Machine File System (VMFS)
category: Storage
language: vi
---

Virtual Machine File System (VMFS) là hệ thống file chuyên dụng của VMware được thiết kế để lưu trữ máy ảo (VM) trên storage shared (SAN/NAS). VMFS cho phép nhiều host ESXi truy cập đồng thời vào cùng một datastore, hỗ trợ các tính năng quan trọng như clustering, locking và đồng bộ hóa.

## Tổng quan

Virtual Machine File System (VMFS) có các đặc điểm chính sau:
- Là hệ thống file cluster của VMware
- Hỗ trợ shared storage cho nhiều ESXi host
- Cung cấp locking để ngăn ngừa data corruption
- Hỗ trợ các tính năng như snapshot, cloning, v.v.

## Cách thức hoạt động

### Cluster File System
VMFS hoạt động như một cluster file system:
- Nhiều ESXi host có thể mount cùng một VMFS volume
- Sử dụng distributed locking để đồng bộ truy cập
- Hỗ trợ cả SCSI và NFS storage

### Block and File Level Operations
VMFS hỗ trợ:
- **File level**: Quản lý file VM (.vmdk, .vmx, v.v.)
- **Block level**: Quản lý block storage cho disk
- **Metadata**: Quản lý metadata cho cluster operations

### Volume Management
Quản lý volume trong VMFS:
- Hỗ trợ volume lên đến 64TB (VMFS-6)
- Hỗ trợ extent để mở rộng volume
- Hỗ trợ multiple extents trong một volume

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Xem thông tin datastore VMFS
Get-Datastore | Where-Object {$_.Type -eq "VMFS"} | Select Name, CapacityGB, FreeSpaceGB

# Tạo VMFS datastore mới
New-Datastore -VMHost "esxi01.example.com" -Name "VMFS-Datastore" -Path "naa.600508b1001c4a2f0000000000000001" -Vmfs

# Mở rộng VMFS datastore
Get-Datastore "VMFS-Datastore" | Expand-Datastore -CapacityGB 2000
```

### CLI Configuration
```bash
# Xem thông tin VMFS datastore
esxcli storage vmfs extent list

# Tạo VMFS volume mới
vmkfstools -C vmfs5 -b 1m -S "VMFS-Datastore" /vmfs/devices/disks/naa.600508b1001c4a2f0000000000000001

# Mở rộng VMFS volume
vmkfstools -Z /vmfs/devices/disks/naa.600508b1001c4a2f0000000000000002 /vmfs/volumes/VMFS-Datastore

# Kiểm tra VMFS version
vmkfstools -P /vmfs/volumes/VMFS-Datastore
```

## Các phiên bản VMFS

### VMFS-3
- Phiên bản cũ, không còn được hỗ trợ
- Hỗ trợ volume lên đến 2TB
- Không hỗ trợ các tính năng mới

### VMFS-5
- Phiên bản cũ hơn, vẫn được hỗ trợ
- Hỗ trợ volume lên đến 64TB
- Hỗ trợ block size 1MB

### VMFS-6
- Phiên bản mới nhất
- Hỗ trợ volume lên đến 64TB
- Hỗ trợ automatic UNMAP
- Cải thiện hiệu suất và scalability

## Các tính năng nâng cao trong vSphere 8

### Enhanced VMFS Management
- Cải thiện hiệu suất VMFS operations
- Hỗ trợ các storage mới
- Tối ưu hóa việc sử dụng storage

### Automatic UNMAP
- Tự động giải phóng không gian không sử dụng
- Cải thiện hiệu suất storage
- Giảm dung lượng lưu trữ thực tế

## Thực hành tốt nhất

1. **Capacity Planning**: Lên kế hoạch dung lượng VMFS phù hợp
2. **Monitoring**: Theo dõi hiệu suất và dung lượng VMFS
3. **Upgrades**: Nâng cấp lên VMFS-6 khi có thể
4. **Maintenance**: Thực hiện maintenance định kỳ

## Lệnh khắc phục sự cố

```bash
# Xem thông tin VMFS datastore
esxcli storage vmfs extent list

# Kiểm tra VMFS volume
vmkfstools -P /vmfs/volumes/VMFS-Datastore

# Xem log VMFS
tail -f /var/log/vmkernel.log | grep -i vmfs

# Kiểm tra locking
esxcli system settings advanced list -o /VMFS3/UseATSForHBOnVMFS5
```

## Công nghệ liên quan

- [Datastore](/glossary/term/datastore)
- [NFS](/glossary/term/nfs)
- [Storage vMotion](/glossary/term/storage-vmotion)
- [VMFS Extent](/glossary/term/vmfs-extent)
- [Cluster File System](/glossary/term/cluster-file-system)