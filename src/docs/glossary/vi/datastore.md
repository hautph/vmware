---
term: Datastore
category: Storage
language: vi
---

Datastore là kho lưu trữ logic trong vSphere chứa các file máy ảo (VM) và các thành phần liên quan. Datastore có thể được tạo trên VMFS, NFS, hoặc Virtual Volumes (vVol) và được mount bởi nhiều host ESXi trong cùng một datacenter. Datastore là thành phần trung tâm trong kiến trúc lưu trữ của vSphere.

## Tổng quan

Datastore có các đặc điểm chính sau:
- Là kho lưu trữ logic cho file VM
- Có thể được tạo trên nhiều loại storage (VMFS, NFS, vVol)
- Được mount bởi nhiều ESXi host
- Hỗ trợ các tính năng như Storage vMotion, snapshot, v.v.

## Cách thức hoạt động

### Storage Abstraction
Datastore cung cấp lớp trừu tượng:
- Che giấu chi tiết về storage backend
- Cung cấp giao diện thống nhất cho VM
- Hỗ trợ nhiều loại storage khác nhau

### Mounting and Sharing
Quá trình mount datastore:
- Datastore được mount bởi nhiều ESXi host
- Sử dụng distributed locking để ngăn ngừa data corruption
- Hỗ trợ cả SAN và NAS storage

### Datastore Browser
Datastore browser cho phép:
- Duyệt nội dung datastore
- Quản lý file VM
- Upload/download file
- Kiểm tra dung lượng và hiệu suất

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Xem thông tin datastore
Get-Datastore | Select Name, Type, CapacityGB, FreeSpaceGB, State

# Tạo VMFS datastore mới
New-Datastore -VMHost "esxi01.example.com" -Name "VMFS-Datastore" -Path "naa.600508b1001c4a2f0000000000000001" -Vmfs

# Tạo NFS datastore mới
New-Datastore -VMHost "esxi01.example.com" -Name "NFS-Datastore" -Path "/nfs/volumes/datastore" -Nfs -NfsHost "nfsserver.example.com"

# Mở rộng datastore
Get-Datastore "VMFS-Datastore" | Expand-Datastore -CapacityGB 2000
```

### CLI Configuration
```bash
# Xem thông tin datastore
esxcli storage filesystem list

# Tạo VMFS datastore
vmkfstools -C vmfs6 -b 1m -S "VMFS-Datastore" /vmfs/devices/disks/naa.600508b1001c4a2f0000000000000001

# Mount NFS datastore
esxcli storage nfs add -H nfsserver.example.com -P /nfs/volumes/datastore -v NFS-Datastore

# Kiểm tra datastore health
esxcli storage core device list
```

## Các loại Datastore

### VMFS Datastore
- Dựa trên VMFS file system
- Hỗ trợ SAN storage
- Hỗ trợ multiple host access
- Có nhiều phiên bản (VMFS-3, VMFS-5, VMFS-6)

### NFS Datastore
- Dựa trên NFS protocol
- Hỗ trợ NAS storage
- Dễ quản lý và mở rộng
- Hỗ trợ NFS v3 và v4.1

### vVol Datastore
- Dựa trên Virtual Volumes
- Hỗ trợ array-based storage
- Cung cấp policy-based management
- Hỗ trợ advanced storage services

## Các tính năng nâng cao trong vSphere 8

### Enhanced Datastore Management
- Cải thiện hiệu suất datastore operations
- Hỗ trợ các storage mới
- Tối ưu hóa việc sử dụng storage

### Storage Policy-Based Management
- Quản lý storage dựa trên policy
- Tự động hóa việc provisioning
- Hỗ trợ các service level khác nhau

## Thực hành tốt nhất

1. **Capacity Planning**: Lên kế hoạch dung lượng datastore phù hợp
2. **Monitoring**: Theo dõi hiệu suất và dung lượng datastore
3. **Maintenance**: Thực hiện maintenance định kỳ
4. **Backup**: Thực hiện backup và disaster recovery

## Lệnh khắc phục sự cố

```bash
# Xem thông tin datastore
esxcli storage filesystem list

# Kiểm tra datastore health
esxcli storage core device list

# Xem log datastore
tail -f /var/log/vmkernel.log | grep -i datastore

# Kiểm tra NFS mounts
esxcli storage nfs list
```

## Công nghệ liên quan

- [VMFS](/glossary/term/vmfs.md)
- [NFS](/glossary/term/nfs.md)
- [vVol](/glossary/term/vvol)
- [Storage vMotion](/glossary/term/storage-vmotion.md)
- [Datastore Browser](/glossary/term/datastore-browser)