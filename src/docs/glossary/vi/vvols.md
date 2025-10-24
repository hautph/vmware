---
term: Virtual Volumes (vVols)
category: Storage
language: vi
---

Virtual Volumes (vVols) là kiến trúc lưu trữ mới trong vSphere ánh xạ trực tiếp một máy ảo (VM) hoặc disk thành một object trên storage array. vVols cung cấp quản lý storage ở mức độ granular, cho phép áp dụng các chính sách và dịch vụ storage riêng biệt cho từng VM hoặc disk.

## Tổng quan

Virtual Volumes (vVols) có các đặc điểm chính sau:
- Ánh xạ trực tiếp VM/disk thành storage object
- Cung cấp quản lý storage ở mức độ granular
- Hỗ trợ policy-based management
- Là nền tảng cho các storage service nâng cao

## Cách thức hoạt động

### vVol Architecture
Kiến trúc vVol bao gồm:
- **vVol**: Object lưu trữ đại diện cho VM hoặc disk
- **Storage Container**: Logical container cho vVol
- **Storage Provider**: Cung cấp storage services và capabilities
- **Protocol Endpoint**: Giao diện giao tiếp giữa ESXi và storage array

### vVol Types
Các loại vVol:
- **Config vVol**: Chứa metadata cấu hình VM
- **Data vVol**: Chứa dữ liệu disk của VM
- **Swap vVol**: Chứa swap file của VM
- **Memory vVol**: Chứa memory state khi suspend

### vVol Workflow
Quy trình vVol:
1. ESXi phát hiện storage array hỗ trợ vVol
2. Tạo storage container trên array
3. Tạo VM sẽ tự động tạo các vVol tương ứng
4. Áp dụng storage policy cho vVol
5. Array cung cấp các dịch vụ theo policy

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Xem các vVol datastore hiện có
Get-Datastore | Where-Object {$_.Type -eq "VVOL"} | Select Name, CapacityGB, FreeSpaceGB

# Tạo VM trên vVol datastore
New-VM -Name "MyVM" -VMHost "esxi01.example.com" -Datastore "VVOL-Datastore" -DiskGB 100

# Xem thông tin vVol
Get-VM "MyVM" | Get-HardDisk | Select Name, FileName

# Áp dụng storage policy cho vVol
Get-VM "MyVM" | Set-SpbmEntityConfiguration -StoragePolicy "HighPerformancePolicy"
```

### CLI Configuration
```bash
# Xem thông tin vVol datastore
esxcli storage filesystem list | grep VVOL

# Kiểm tra vVol protocol endpoint
esxcli storage vvol protocolendpoint list

# Xem thông tin vVol
esxcli storage vvol disk list

# Kiểm tra vVol binding
esxcli storage vvol binding list
```

## Các thành phần chính

### Storage Provider
- Cung cấp storage capabilities
- Giao tiếp với vCenter qua VASA
- Quản lý vVol lifecycle

### Protocol Endpoint
- Giao diện giao tiếp cho vVol
- Hỗ trợ NFS và iSCSI
- Cung cấp discovery và binding

### Storage Container
- Logical container cho vVol
- Ánh xạ với storage pool trên array
- Hỗ trợ policy và QoS

## Các tính năng nâng cao trong vSphere 8

### Enhanced vVol Support
- Cải thiện hiệu suất vVol operations
- Hỗ trợ các storage array mới
- Tối ưu hóa việc sử dụng storage

### Policy-Based Services
- Tự động áp dụng storage services
- Hỗ trợ các service level khác nhau
- Tích hợp tốt hơn với SPBM

## Thực hành tốt nhất

1. **Array Compatibility**: Đảm bảo storage array hỗ trợ vVol
2. **Policy Design**: Thiết kế policy phù hợp với workload requirements
3. **Monitoring**: Theo dõi hiệu suất và trạng thái vVol
4. **Backup**: Thực hiện backup phù hợp với vVol architecture

## Lệnh khắc phục sự cố

```bash
# Xem thông tin vVol datastore
esxcli storage filesystem list | grep VVOL

# Kiểm tra vVol protocol endpoint
esxcli storage vvol protocolendpoint list

# Xem thông tin vVol
esxcli storage vvol disk list

# Kiểm tra log vVol
tail -f /var/log/vmware/vvol.log
```

## Công nghệ liên quan

- [SPBM (Storage Policy-Based Management)](/glossary/term/spbm)
- [VASA (vSphere APIs for Storage Awareness)](/glossary/term/vasa)
- [Datastore](/glossary/term/datastore)
- [Storage Container](/glossary/term/storage-container)
- [Protocol Endpoint](/glossary/term/protocol-endpoint)