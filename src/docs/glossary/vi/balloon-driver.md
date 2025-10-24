---
term: Balloon Driver
category: Memory_Management
language: vi
---

Balloon Driver (còn gọi là vmmemctl) là thành phần trong máy ảo (VM) giúp ESXi hypervisor thu hồi bộ nhớ từ Guest OS khi host bị thiếu memory. Balloon driver là một trong những kỹ thuật chính để quản lý memory overcommit trong môi trường vSphere.

## Tổng quan

Balloon Driver có các đặc điểm chính sau:
- Là một thành phần trong VMware Tools
- Chạy bên trong Guest OS của VM
- Giúp hypervisor thu hồi memory từ Guest OS một cách an toàn
- Hoạt động như một "proxy" giữa hypervisor và Guest OS

## Cách thức hoạt động

### Memory Inflation
Quá trình thu hồi memory:
- Hypervisor yêu cầu balloon driver inflate
- Balloon driver yêu cầu memory từ Guest OS kernel
- Guest OS kernel thu hồi memory từ các process
- Memory được đánh dấu là "used" bởi balloon driver

### Memory Deflation
Khi host có đủ memory:
- Hypervisor yêu cầu balloon driver deflate
- Balloon driver trả lại memory cho Guest OS
- Guest OS có thể sử dụng lại memory cho các process

### Memory Reclamation Process
1. Host thiếu memory
2. Hypervisor xác định VM cần thu hồi memory
3. Hypervisor gửi yêu cầu inflate đến balloon driver
4. Balloon driver inflate và chiếm dụng memory
5. Guest OS kernel thu hồi memory từ các process
6. Memory được giải phóng cho host sử dụng

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Kiểm tra balloon memory trên VM
Get-VM "MyVM" | Select Name, MemoryGB, MemoryUsageGB, BalloonedMemoryMB

# Xem thông tin balloon driver
Get-VM "MyVM" | Get-View | Select -ExpandProperty Summary | Select -ExpandProperty QuickStats | Select balloonedMemory
```

### CLI Configuration
```bash
# Kiểm tra balloon memory trên host
esxtop

# Xem thông tin balloon driver trên VM
vim-cmd vmsvc/get.summary 123 | grep -i balloon

# Kiểm tra trạng thái balloon driver
esxcli vm process list
```

## Hiệu quả và tác động

### Performance Impact
- Ballooning ở mức độ vừa phải không ảnh hưởng nhiều đến hiệu suất
- Ballooning quá mức có thể gây performance degradation
- Ứng dụng trong Guest OS có thể bị ảnh hưởng nếu thiếu memory

### Monitoring Metrics
- Ballooned memory: Lượng memory bị chiếm dụng bởi balloon driver
- Swap waited: Thời gian chờ swap
- Swap out rate: Tốc độ swap out memory

## Các tính năng nâng cao trong vSphere 8

### Enhanced Ballooning
- Cải thiện thuật toán thu hồi memory
- Tối ưu hóa việc inflate/deflate balloon
- Giảm tác động đến hiệu suất Guest OS

### Balloon Driver Improvements
- Hỗ trợ các Guest OS mới
- Tăng độ tin cậy của balloon driver
- Cải thiện khả năng tương thích

## Thực hành tốt nhất

1. **Monitoring**: Theo dõi lượng ballooned memory
2. **Capacity Planning**: Tránh overcommit memory quá mức
3. **Reservation và Limit**: Sử dụng reservation để đảm bảo memory tối thiểu
4. **Application Awareness**: Hiểu rõ yêu cầu memory của ứng dụng

## Lệnh khắc phục sự cố

```bash
# Kiểm tra balloon memory
esxtop

# Xem thông tin balloon driver trên VM
vim-cmd vmsvc/get.summary 123 | grep -i balloon

# Kiểm tra trạng thái balloon driver
esxcli vm process list

# Xem log balloon driver
tail -f /var/log/vmware/vmmemctl.log
```

## Công nghệ liên quan

- [Memory Overcommit](/glossary/term/memory-overcommit)
- [Transparent Page Sharing](/glossary/term/transparent-page-sharing)
- [Memory Compression](/glossary/term/memory-compression)
- [Swapping](/glossary/term/swapping)
- [VMware Tools](/glossary/term/vmware-tools)