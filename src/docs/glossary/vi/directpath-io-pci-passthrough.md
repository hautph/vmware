---
term: DirectPath I/O & PCI Passthrough
category: Hardware_Integration
language: vi
---

DirectPath I/O & PCI Passthrough là công nghệ trong vSphere cho phép máy ảo (VM) truy cập trực tiếp vào phần cứng vật lý như card mạng, card đồ họa (GPU), HBA và các thiết bị PCI khác. Công nghệ này bỏ qua lớp ảo hóa truyền thống để cung cấp hiệu suất gần như native cho các thiết bị phần cứng.

## Tổng quan

DirectPath I/O & PCI Passthrough có các đặc điểm chính sau:
- Cho phép VM truy cập trực tiếp thiết bị phần cứng
- Bỏ qua lớp ảo hóa để giảm độ trễ
- Cung cấp hiệu suất gần như native
- Hỗ trợ các thiết bị chuyên dụng như GPU, HBA, v.v.

## Cách thức hoạt động

### PCI Passthrough
Quá trình PCI Passthrough:
- Thiết bị PCI vật lý được gán trực tiếp cho VM
- Hypervisor bỏ qua việc ảo hóa thiết bị
- VM tương tác trực tiếp với driver thiết bị
- Chỉ một VM có thể sử dụng thiết bị tại một thời điểm

### DirectPath I/O
Quá trình DirectPath I/O:
- Mở rộng của PCI Passthrough
- Cho phép chia sẻ thiết bị giữa nhiều VM
- Sử dụng SR-IOV (Single Root I/O Virtualization)
- Tạo các hàm ảo từ thiết bị vật lý

### Hardware Requirements
Yêu cầu phần cứng:
- CPU hỗ trợ VT-d (Intel) hoặc AMD-Vi
- Mainboard hỗ trợ IOMMU
- Thiết bị PCI hỗ trợ passthrough
- BIOS/UEFI được cấu hình đúng

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Kích hoạt PCI Passthrough cho host
Get-VMHost "esxi01.example.com" | Get-PassthroughDevice -Type Pci | Where-Object {$_.Name -like "*GPU*"} | Add-PassthroughDevice

# Gán thiết bị PCI cho VM
Get-VM "MyVM" | Add-PassthroughDevice -PassthroughDevice (Get-PassthroughDevice -VMHost "esxi01.example.com" -Type Pci | Where-Object {$_.Name -like "*GPU*"})

# Xem các thiết bị passthrough hiện có
Get-PassthroughDevice -VMHost "esxi01.example.com" -Type Pci
```

### CLI Configuration
```bash
# Xem các thiết bị PCI có thể passthrough
esxcli hardware pci list

# Kích hoạt PCI passthrough
esxcli system settings advanced set -o /VMkernel/Boot/passthru -i 1

# Xem thông tin IOMMU
esxcli system settings advanced list -o /VMkernel/Boot/iommu
```

## Các loại thiết bị hỗ trợ

### Graphics Processing Units (GPU)
- NVIDIA Tesla, Quadro series
- AMD FirePro series
- Sử dụng cho machine learning, rendering, v.v.

### Host Bus Adapters (HBA)
- HBA Fibre Channel
- HBA SAS
- Truy cập trực tiếp storage

### Network Interface Cards (NIC)
- NIC chuyên dụng
- NIC có hỗ trợ SR-IOV
- Giảm độ trễ mạng

## Các tính năng nâng cao trong vSphere 8

### Enhanced GPU Support
- Hỗ trợ nhiều loại GPU hơn
- Cải thiện hiệu suất GPU passthrough
- Tích hợp tốt hơn với VMware Tanzu

### SR-IOV Enhancements
- Hỗ trợ nhiều thiết bị SR-IOV hơn
- Cải thiện hiệu suất mạng
- Tăng số lượng hàm ảo có thể tạo

## Thực hành tốt nhất

1. **Hardware Compatibility**: Đảm bảo thiết bị được hỗ trợ trong HCL
2. **Driver Management**: Quản lý driver trong Guest OS
3. **Resource Planning**: Lên kế hoạch tài nguyên cho các thiết bị
4. **Monitoring**: Theo dõi hiệu suất và lỗi của thiết bị

## Lệnh khắc phục sự cố

```bash
# Xem các thiết bị PCI có thể passthrough
esxcli hardware pci list

# Kiểm tra trạng thái IOMMU
esxcli system settings advanced list -o /VMkernel/Boot/iommu

# Xem log passthrough
tail -f /var/log/vmkernel.log | grep -i passthrough

# Kiểm tra thiết bị trong VM
lspci (trong Guest OS)
```

## Công nghệ liên quan

- [SR-IOV](/glossary/term/sr-iov.md)
- [GPU Virtualization](/glossary/term/gpu-virtualization)
- [PCI Devices](/glossary/term/pci-devices)
- [IOMMU](/glossary/term/iommu)
- [VT-d/AMD-Vi](/glossary/term/vt-d-amd-vi)