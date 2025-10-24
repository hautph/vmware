---
term: vCPU
category: Resource_Management
language: vi
---

vCPU (Virtual CPU) là CPU ảo được cấp phát cho máy ảo (VM) trong môi trường vSphere. vCPU mô phỏng hoạt động của CPU vật lý và cho phép Guest OS thực thi các tác vụ như thể đang chạy trên phần cứng thực sự.

## Tổng quan

vCPU có các đặc điểm chính sau:
- Là đại diện ảo của CPU vật lý
- Được quản lý và phân phối bởi hypervisor
- Có thể được cấu hình linh hoạt cho từng VM
- Hỗ trợ các tính năng như CPU Hot Add

## Cách thức hoạt động

### CPU Virtualization
Quá trình ảo hóa CPU bao gồm:
- Mapping vCPU với pCPU vật lý
- Lập lịch thực thi các tác vụ của vCPU
- Quản lý tài nguyên CPU giữa các VM

### CPU Scheduling
Hypervisor sử dụng scheduler để:
- Phân bổ thời gian CPU cho các vCPU
- Đảm bảo công bằng trong phân phối tài nguyên
- Tối ưu hóa hiệu suất tổng thể

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Thiết lập số lượng vCPU cho VM
Get-VM "MyVM" | Set-VM -NumCpu 4 -Confirm:$false

# Kích hoạt CPU Hot Add
Get-VM "MyVM" | Get-View | ForEach-Object {
    $configSpec = New-Object VMware.Vim.VirtualMachineConfigSpec
    $configSpec.CpuHotAddEnabled = $true
    $_.ReconfigVM($configSpec)
}
```

### CLI Configuration
```bash
# Kiểm tra thông tin vCPU của VM
vim-cmd vmsvc/get.config 123 | grep -i numcpu

# Xem thông tin CPU từ ESXi host
esxcli hardware cpu list
```

## Virtual SMP

### Đa xử lý đối xứng
- Cho phép một VM sử dụng nhiều vCPU
- Cải thiện hiệu suất cho các ứng dụng đa luồng
- Yêu cầu hỗ trợ từ Guest OS

### Giới hạn
- Số lượng vCPU tối đa phụ thuộc vào phiên bản vSphere
- Hiệu suất có thể bị ảnh hưởng nếu không cấu hình đúng

## Các tính năng nâng cao trong vSphere 8

### CPU Performance Enhancements
- Tối ưu hóa scheduler để giảm độ trễ
- Cải thiện hiệu suất cho các workload đòi hỏi nhiều CPU
- Hỗ trợ các instruction set mới của CPU

### CPU Resource Management
- Quản lý tài nguyên CPU linh hoạt hơn
- Tích hợp với DRS để phân phối tải tốt hơn
- Hỗ trợ các profile cấu hình CPU

## Thực hành tốt nhất

1. **Right-sizing**: Cấp phát đúng số lượng vCPU cần thiết
2. **Monitoring**: Theo dõi hiệu suất CPU và ready time
3. **Reservation và Limit**: Sử dụng hợp lý reservation và limit
4. **Shares**: Điều chỉnh shares để ưu tiên các VM quan trọng

## Lệnh khắc phục sự cố

```bash
# Kiểm tra hiệu suất CPU
esxtop

# Xem thông tin vCPU của VM
vim-cmd vmsvc/get.config 123 | grep -i cpu

# Kiểm tra trạng thái CPU scheduler
esxcli system settings advanced list -o /Scheduler/CpuScheduler

# Xem thông tin CPU topology
esxcli hardware cpu global get
```

## Công nghệ liên quan

- [pCPU](/glossary/term/pcpu)
- [Virtual SMP](/glossary/term/virtual-smp)
- [CPU Reservation](/glossary/term/cpu-reservation)
- [CPU Limit](/glossary/term/cpu-limit)
- [CPU Shares](/glossary/term/cpu-shares)