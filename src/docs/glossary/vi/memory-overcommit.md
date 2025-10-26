---
term: Memory Overcommit
category: Resource_Management
language: vi
---

Memory Overcommit là kỹ thuật cho phép hypervisor cấp phát tổng dung lượng bộ nhớ cho các máy ảo (VM) vượt quá dung lượng bộ nhớ vật lý thực tế có sẵn trên host. Đây là một tính năng quan trọng trong ảo hóa giúp tối ưu hóa việc sử dụng tài nguyên.

## Tổng quan

Memory Overcommit có các đặc điểm chính sau:
- Cho phép cấp phát nhiều memory hơn dung lượng vật lý
- Dựa trên giả định rằng không phải tất cả VM đều sử dụng 100% memory cùng lúc
- Sử dụng các kỹ thuật tiết kiệm memory như TPS, ballooning, compression, swapping

## Cách thức hoạt động

### Memory Allocation
Quá trình cấp phát memory:
- Tổng memory được cấp phát cho VM có thể vượt quá physical memory
- Hypervisor theo dõi việc sử dụng memory thực tế
- Áp dụng các kỹ thuật tiết kiệm memory khi cần thiết

### Memory Reclamation Techniques
Các kỹ thuật thu hồi memory bao gồm:
- Transparent Page Sharing (TPS)
- Ballooning
- Memory Compression
- Swapping

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Kiểm tra memory overcommit trên host
Get-VMHost "esxi01.example.com" | Select Name, MemoryTotalGB, MemoryUsageGB

# Xem thông tin memory của VM
Get-VM "MyVM" | Select Name, MemoryGB, MemoryUsageGB
```

### CLI Configuration
```bash
# Kiểm tra memory usage trên host
esxcli system memory get

# Xem thông tin memory của VM
vim-cmd vmsvc/get.summary 123 | grep -i memory

# Kiểm tra memory overcommit ratio
esxtop
```

## Các kỹ thuật tiết kiệm memory

### Transparent Page Sharing (TPS)
- Chia sẻ các memory page giống nhau giữa các VM
- Giảm tổng dung lượng memory sử dụng
- Hoạt động ở mức hypervisor

### Ballooning
- Sử dụng balloon driver trong Guest OS
- Thu hồi memory từ Guest OS khi host thiếu memory
- Không ảnh hưởng đến hiệu suất nếu ở mức độ vừa phải

### Memory Compression
- Nén memory page trước khi swap
- Giảm I/O khi swap
- Cải thiện hiệu suất so với swapping truyền thống

### Swapping
- Di chuyển memory page đến swap file trên disk
- Giải pháp cuối cùng khi thiếu memory
- Có thể ảnh hưởng đến hiệu suất

## Các tính năng nâng cao trong vSphere 8

### Intelligent Memory Management
- Cải thiện các thuật toán thu hồi memory
- Tối ưu hóa việc sử dụng các kỹ thuật tiết kiệm memory
- Giảm tác động đến hiệu suất VM

### Memory Monitoring
- Cung cấp thông tin chi tiết về việc sử dụng memory
- Cảnh báo khi có memory contention
- Tích hợp với vRealize Operations

## Thực hành tốt nhất

1. **Capacity Planning**: Lên kế hoạch dung lượng memory phù hợp
2. **Monitoring**: Theo dõi memory usage và overcommit ratio
3. **Reservation và Limit**: Sử dụng hợp lý reservation và limit
4. **Avoid Overcommitment**: Tránh overcommit quá mức gây ảnh hưởng hiệu suất

## Lệnh khắc phục sự cố

```bash
# Kiểm tra memory usage trên host
esxcli system memory get

# Xem thông tin memory của VM
vim-cmd vmsvc/get.summary 123 | grep -i memory

# Kiểm tra memory overcommit ratio
esxtop

# Xem thông tin balloon driver
esxcli vm process list
```

## Công nghệ liên quan

- [Transparent Page Sharing](/glossary/term/transparent-page-sharing.md)
- [Ballooning](/glossary/term/ballooning)
- [Memory Compression](/glossary/term/memory-compression.md)
- [Swapping](/glossary/term/swapping)
- [Memory Reservation](/glossary/term/memory-reservation)