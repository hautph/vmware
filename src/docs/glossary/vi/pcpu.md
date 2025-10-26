---
term: pCPU
category: Resource_Management
language: vi
---

pCPU (Physical CPU) là CPU vật lý thực sự trên host ESXi. pCPU là tài nguyên phần cứng thực tế được hypervisor sử dụng để thực thi các tác vụ cho các máy ảo (VM) thông qua việc mapping với vCPU.

## Tổng quan

pCPU có các đặc điểm chính sau:
- Là CPU vật lý thực sự trên server
- Được chia sẻ giữa các VM thông qua vCPU
- Hiệu suất ảnh hưởng trực tiếp đến hiệu suất của VM
- Có kiến trúc NUMA trong các hệ thống đa socket

## Cách thức hoạt động

### CPU Mapping
Quá trình mapping giữa vCPU và pCPU:
- Hypervisor quản lý việc mapping động
- Một vCPU có thể được thực thi trên nhiều pCPU khác nhau
- Scheduler đảm bảo phân phối công bằng tài nguyên

### NUMA Topology
Trong các hệ thống đa socket:
- Mỗi socket CPU tạo thành một NUMA node
- Memory local với mỗi NUMA node
- Hiệu suất tốt hơn khi VM chạy trên cùng một NUMA node

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Kiểm tra thông tin CPU vật lý
Get-VMHost "esxi01.example.com" | Get-View | Select -ExpandProperty Hardware | Select -ExpandProperty CpuInfo

# Xem thông tin NUMA
Get-VMHost "esxi01.example.com" | Get-View | Select -ExpandProperty Hardware | Select -ExpandProperty NumaInfo
```

### CLI Configuration
```bash
# Kiểm tra thông tin CPU vật lý
esxcli hardware cpu list

# Xem thông tin NUMA
esxcli hardware numa node list

# Kiểm tra hiệu suất CPU
esxtop
```

## CPU Overcommit

### Overcommitment Ratio
- Cho phép cấp phát nhiều vCPU hơn số pCPU vật lý
- Dựa trên giả định rằng không phải tất cả VM đều sử dụng 100% CPU cùng lúc
- Cần giám sát để tránh tình trạng contention

### Impact on Performance
- Overcommit cao có thể gây tăng ready time
- Ảnh hưởng đến hiệu suất ứng dụng
- Cần cân bằng giữa density và performance

## Các tính năng nâng cao trong vSphere 8

### CPU Scheduling Enhancements
- Cải thiện scheduler để giảm độ trễ
- Tối ưu hóa cho các workload đòi hỏi nhiều CPU
- Hỗ trợ các instruction set mới của CPU

### CPU Resource Monitoring
- Cung cấp thông tin chi tiết về sử dụng CPU
- Cảnh báo khi có contention
- Tích hợp với vRealize Operations

## Thực hành tốt nhất

1. **Capacity Planning**: Lên kế hoạch dung lượng CPU phù hợp
2. **Monitoring**: Theo dõi hiệu suất và ready time
3. **NUMA Awareness**: Cấu hình VM phù hợp với NUMA topology
4. **Overcommit Ratio**: Duy trì tỷ lệ overcommit hợp lý

## Lệnh khắc phục sự cố

```bash
# Kiểm tra thông tin CPU vật lý
esxcli hardware cpu list

# Xem thông tin NUMA
esxcli hardware numa node list

# Kiểm tra hiệu suất CPU
esxtop

# Xem thông tin CPU scheduler
esxcli system settings advanced list -o /Scheduler/CpuScheduler
```

## Công nghệ liên quan

- [vCPU](/glossary/term/vcpu.md)
- [Virtual SMP](/glossary/term/virtual-smp.md)
- [NUMA](/glossary/term/numa)
- [CPU Ready Time](/glossary/term/cpu-ready-time)
- [CPU Overcommit](/glossary/term/cpu-overcommit)