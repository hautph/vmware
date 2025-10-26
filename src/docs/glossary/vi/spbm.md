---
term: Storage Policy-Based Management (SPBM)
category: Storage
language: vi
---

Storage Policy-Based Management (SPBM) là framework quản lý storage trong vSphere dựa trên các chính sách. SPBM cho phép quản trị viên định nghĩa các yêu cầu storage cho máy ảo (VM) thông qua các chính sách, sau đó tự động áp dụng và thực thi các yêu cầu đó trên các thiết bị lưu trữ hỗ trợ.

## Tổng quan

Storage Policy-Based Management (SPBM) có các đặc điểm chính sau:
- Cho phép định nghĩa storage requirements thông qua policy
- Tự động áp dụng policy cho VM và datastore
- Hỗ trợ cả VMFS/NFS và Virtual Volumes (vVol)
- Là nền tảng cho vVol và các storage service nâng cao

## Cách thức hoạt động

### Policy Definition
Định nghĩa policy trong SPBM:
- Định nghĩa các capability requirements
- Gán policy cho VM hoặc virtual disk
- Hỗ trợ các policy built-in và custom

### Policy Compliance
Kiểm tra compliance policy:
- Theo dõi trạng thái compliance của VM
- Cảnh báo khi VM không compliant
- Tự động remediate khi có thể

### Storage Provider Integration
Tích hợp với storage provider:
- Nhận capability information từ storage array
- Ánh xạ policy requirements với storage capabilities
- Hỗ trợ VASA (vSphere APIs for Storage Awareness)

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Xem các storage policy hiện có
Get-SpbmStoragePolicy

# Tạo storage policy mới
$rule = New-SpbmRule -Name "PerformanceRule" -AnyOfTags "Gold", "Silver"
$capability = New-SpbmCapability -Name "Performance" -Value "High"
$policy = New-SpbmStoragePolicy -Name "HighPerformancePolicy" -Description "Policy for high performance workloads" -Rule $rule -Capability $capability

# Gán policy cho VM
Get-VM "MyVM" | Set-SpbmEntityConfiguration -StoragePolicy $policy

# Kiểm tra policy compliance
Get-SpbmEntityConfiguration -VM "MyVM" | Select Entity, StoragePolicy, ComplianceStatus
```

### CLI Configuration
```bash
# Xem các storage policy hiện có
esxcli storage vvol policy list

# Kiểm tra VASA provider
esxcli storage vasa provider list

# Xem thông tin storage capability
esxcli storage core device list

# Kiểm tra policy compliance
esxcli storage vvol policy compliance check -v volume-id
```

## Các thành phần chính

### VM Storage Policies
- Các policy được định nghĩa cho VM
- Có thể là built-in hoặc custom
- Áp dụng cho VM home và virtual disk

### Storage Providers
- Cung cấp storage capability information
- Hỗ trợ VASA protocol
- Giao tiếp với vCenter Server

### Capabilities and Constraints
- Định nghĩa các storage requirements
- Có thể là vendor-specific hoặc generic
- Hỗ trợ các constraint như performance, availability

## Các tính năng nâng cao trong vSphere 8

### Enhanced Policy Management
- Cải thiện giao diện quản lý policy
- Hỗ trợ các policy phức tạp hơn
- Tăng hiệu suất policy evaluation

### Policy-Based Provisioning
- Tự động provisioning theo policy
- Hỗ trợ các storage service nâng cao
- Tích hợp tốt hơn với vVol

## Thực hành tốt nhất

1. **Policy Design**: Thiết kế policy phù hợp với workload requirements
2. **Monitoring**: Theo dõi policy compliance status
3. **Documentation**: Tài liệu hóa các policy để quản lý
4. **Testing**: Kiểm tra policy trong môi trường thử nghiệm

## Lệnh khắc phục sự cố

```bash
# Xem các storage policy hiện có
esxcli storage vvol policy list

# Kiểm tra VASA provider
esxcli storage vasa provider list

# Kiểm tra policy compliance
esxcli storage vvol policy compliance check -v volume-id

# Xem log SPBM
tail -f /var/log/vmware/spbm.log
```

## Công nghệ liên quan

- [vVol (Virtual Volumes)](/glossary/term/vvol)
- [VASA (vSphere APIs for Storage Awareness)](/glossary/term/vasa.md)
- [Storage DRS](/glossary/term/storage-drs.md)
- [Datastore](/glossary/term/datastore.md)
- [VM Storage Policy](/glossary/term/vm-storage-policy)