---
term: Virtual SMP
category: Resource_Management
language: vi
---

Virtual SMP (Symmetric Multi-Processing) là khả năng của một máy ảo (VM) sử dụng nhiều vCPU (Virtual CPUs) để cải thiện hiệu suất xử lý. Virtual SMP cho phép các ứng dụng đa luồng chạy hiệu quả hơn trong môi trường ảo hóa.

## Tổng quan

Virtual SMP có các đặc điểm chính sau:
- Cho phép một VM sử dụng nhiều vCPU
- Hỗ trợ các ứng dụng đa luồng và đa xử lý
- Cải thiện hiệu suất cho các workload đòi hỏi nhiều CPU
- Phụ thuộc vào hỗ trợ từ Guest OS

## Cách thức hoạt động

### Multi-Core Virtualization
Virtual SMP hoạt động bằng cách:
- Cấp phát nhiều vCPU cho một VM
- Mapping các vCPU với pCPU vật lý
- Đồng bộ hóa giữa các vCPU trong cùng một VM

### CPU Scheduling
Hypervisor quản lý Virtual SMP thông qua:
- Đảm bảo các vCPU của cùng một VM được lập lịch hợp lý
- Tránh tình trạng các vCPU của cùng VM chạy trên các pCPU khác nhau gây tăng độ trễ
- Tối ưu hóa việc phân phối tài nguyên

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Thiết lập Virtual SMP cho VM
Get-VM "MyVM" | Set-VM -NumCpu 4 -CoresPerSocket 2 -Confirm:$false

# Kiểm tra cấu hình Virtual SMP
Get-VM "MyVM" | Select Name, NumCpu, CoresPerSocket
```

### CLI Configuration
```bash
# Kiểm tra cấu hình Virtual SMP của VM
vim-cmd vmsvc/get.config 123 | grep -i cpu

# Xem thông tin CPU topology
esxcli hardware cpu global get
```

## Giới hạn và hạn chế

### Maximum vCPUs
- Số lượng vCPU tối đa phụ thuộc vào phiên bản vSphere
- Phiên bản mới nhất hỗ trợ lên đến 768 vCPUs cho một VM
- Guest OS cũng có giới hạn riêng về số lượng CPU

### NUMA Considerations
- Hiệu suất tốt hơn khi các vCPU của cùng VM chạy trên cùng NUMA node
- Hypervisor cố gắng giữ các vCPU của cùng VM trên cùng node
- Có thể cấu hình NUMA topology cho VM

## Các tính năng nâng cao trong vSphere 8

### Enhanced Scheduling
- Cải thiện scheduler để xử lý tốt hơn các VM với nhiều vCPU
- Tối ưu hóa cho các workload HPC (High-Performance Computing)
- Giảm độ trễ giữa các vCPU trong cùng VM

### CPU Topology Awareness
- Nhận biết topology CPU vật lý
- Tối ưu hóa placement vCPU
- Hỗ trợ các cấu hình CPU phức tạp

## Thực hành tốt nhất

1. **Right-sizing**: Cấp phát đúng số lượng vCPU cần thiết
2. **NUMA Awareness**: Cấu hình phù hợp với NUMA topology
3. **Monitoring**: Theo dõi hiệu suất và ready time
4. **Application Requirements**: Hiểu rõ yêu cầu CPU của ứng dụng

## Lệnh khắc phục sự cố

```bash
# Kiểm tra cấu hình Virtual SMP
vim-cmd vmsvc/get.config 123 | grep -i cpu

# Xem thông tin NUMA
esxcli hardware numa node list

# Kiểm tra hiệu suất CPU
esxtop

# Xem thông tin CPU scheduler
esxcli system settings advanced list -o /Scheduler/CpuScheduler
```

## Công nghệ liên quan

- [vCPU](/glossary/term/vcpu)
- [pCPU](/glossary/term/pcpu)
- [NUMA](/glossary/term/numa)
- [CPU Hot Add](/glossary/term/cpu-hot-add)
- [CPU Ready Time](/glossary/term/cpu-ready-time)