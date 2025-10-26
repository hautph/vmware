---
term: Memory Compression & Swap
category: Memory_Management
language: vi
---

Memory Compression & Swap là các cơ chế quản lý bộ nhớ trong vSphere được sử dụng khi host bị thiếu memory. Đây là các kỹ thuật cuối cùng trong chuỗi các phương pháp thu hồi memory, được áp dụng khi các phương pháp khác như TPS và ballooning không đủ để giải quyết tình trạng thiếu memory.

## Tổng quan

Memory Compression & Swap có các đặc điểm chính sau:
- Là các cơ chế cuối cùng để giải quyết tình trạng thiếu memory
- Memory Compression nén memory page trước khi swap
- Swapping di chuyển memory page đến swap file trên disk
- Có thể ảnh hưởng đến hiệu suất VM nếu được sử dụng thường xuyên

## Cách thức hoạt động

### Memory Compression
Quá trình nén memory:
- Khi host thiếu memory, hypervisor nén memory page
- Page được nén xuống còn khoảng 50-75% kích thước gốc
- Page nén được lưu trong compression cache
- Nếu VM cần lại page, nó được giải nén và trả lại

### Swapping
Quá trình swap:
- Khi compression cache đầy, hypervisor swap page ra disk
- Page được ghi vào swap file (.vswp) của VM
- Khi VM cần lại page, nó được đọc từ disk
- Swap file có kích thước bằng memory allocation của VM

### Memory Reclamation Hierarchy
Thứ tự ưu tiên các phương pháp thu hồi memory:
1. Transparent Page Sharing (TPS)
2. Ballooning
3. Memory Compression
4. Swapping

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Kiểm tra memory compression và swap trên VM
Get-VM "MyVM" | Select Name, CompressedMemoryMB, SwappedMemoryMB

# Xem thông tin memory reclamation
Get-VM "MyVM" | Get-View | Select -ExpandProperty Summary | Select -ExpandProperty QuickStats
```

### CLI Configuration
```bash
# Kiểm tra memory compression và swap
esxtop

# Xem thông tin swap file
vim-cmd vmsvc/get.summary 123 | grep -i swap

# Kiểm tra compression cache
esxcli system settings advanced list -o /Mem/ZipMax
```

## Hiệu quả và tác động

### Performance Impact
- Memory Compression: Tác động nhỏ đến hiệu suất, giảm I/O so với swapping
- Swapping: Tác động lớn đến hiệu suất do I/O disk
- Cả hai đều nên được tránh trong môi trường production

### Monitoring Metrics
- Compressed memory: Lượng memory được nén
- Swapped memory: Lượng memory được swap
- Swap in/out rate: Tốc độ swap vào/ra

## Các tính năng nâng cao trong vSphere 8

### Enhanced Compression
- Cải thiện thuật toán nén memory
- Tăng hiệu quả nén để giảm kích thước page
- Tối ưu hóa việc sử dụng compression cache

### Swap Optimization
- Tối ưu hóa vị trí và I/O của swap file
- Hỗ trợ các storage type khác nhau
- Cải thiện hiệu suất swap

## Thực hành tốt nhất

1. **Avoid Overcommitment**: Tránh overcommit memory quá mức
2. **Monitoring**: Theo dõi lượng compressed và swapped memory
3. **Capacity Planning**: Đảm bảo đủ memory cho các VM
4. **Storage Performance**: Sử dụng storage có hiệu suất tốt cho swap file

## Lệnh khắc phục sự cố

```bash
# Kiểm tra memory compression và swap
esxtop

# Xem thông tin swap file
vim-cmd vmsvc/get.summary 123 | grep -i swap

# Kiểm tra compression cache
esxcli system settings advanced list -o /Mem/ZipMax

# Xem log memory management
tail -f /var/log/vmware/mem.log
```

## Công nghệ liên quan

- [Memory Overcommit](/glossary/term/memory-overcommit.md)
- [Transparent Page Sharing](/glossary/term/transparent-page-sharing.md)
- [Ballooning](/glossary/term/ballooning)
- [Swap File](/glossary/term/swap-file)
- [Compression Cache](/glossary/term/compression-cache)