---
term: Transparent Page Sharing
category: Memory_Management
language: vi
---

Transparent Page Sharing (TPS) là kỹ thuật tiết kiệm bộ nhớ trong vSphere bằng cách chia sẻ các memory page giống nhau giữa các máy ảo (VM). TPS giúp giảm tổng dung lượng bộ nhớ vật lý cần thiết bằng cách loại bỏ sự trùng lặp trong memory content.

## Tổng quan

Transparent Page Sharing có các đặc điểm chính sau:
- Tự động chia sẻ các memory page giống nhau giữa các VM
- Hoạt động ở mức hypervisor mà không cần can thiệp của Guest OS
- Giúp tăng density của VM trên host bằng cách tiết kiệm memory

## Cách thức hoạt động

### Page Hashing
Quá trình TPS bao gồm:
- Tính hash cho từng memory page
- So sánh hash giữa các page
- Nếu hash giống nhau, so sánh nội dung chi tiết
- Chia sẻ page nếu nội dung giống hệt nhau

### Memory Page Sharing
Khi chia sẻ page:
- Chỉ duy trì một bản copy vật lý của page giống nhau
- Các VM truy cập vào cùng một page vật lý
- Page được đánh dấu là read-only để đảm bảo an toàn

### Security Considerations
- Từ vSphere 5.5, TPS giữa các VM khác nhau bị disable mặc định
- Chỉ cho phép TPS giữa các VM cùng owner hoặc cùng cluster
- Nhằm ngăn chặn các cuộc tấn công side-channel

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Kiểm tra TPS status
Get-VMHost "esxi01.example.com" | Get-AdvancedSetting -Name "Mem.ShareForceSalting"

# Cấu hình TPS
Get-VMHost "esxi01.example.com" | Get-AdvancedSetting -Name "Mem.ShareScanTime" | Set-AdvancedSetting -Value 60
```

### CLI Configuration
```bash
# Kiểm tra TPS statistics
esxcli system settings advanced list -o /Mem/ShareScanTime

# Xem thông tin memory sharing
esxtop

# Kiểm tra TPS security settings
esxcli system settings advanced list -o /Mem/ShareForceSalting
```

## Hiệu quả tiết kiệm memory

### Memory Savings
- Tiết kiệm đáng kể trong môi trường có nhiều VM giống nhau
- Hiệu quả cao với các VM chạy cùng OS hoặc ứng dụng
- Tiết kiệm có thể đạt từ 5-20% tùy vào workload

### Factors Affecting Efficiency
- Số lượng VM giống nhau trên host
- Loại Guest OS và ứng dụng chạy trên VM
- Mức độ sử dụng memory của các VM

## Các tính năng nâng cao trong vSphere 8

### Enhanced Memory Sharing
- Cải thiện thuật toán hashing để tăng tốc độ
- Tối ưu hóa việc scan memory page
- Giảm overhead của TPS

### Inter-VM TPS Controls
- Cung cấp kiểm soát chi tiết hơn cho TPS giữa các VM
- Cho phép cấu hình theo cluster hoặc theo policy
- Tăng tính bảo mật và linh hoạt

## Thực hành tốt nhất

1. **Security Awareness**: Hiểu rõ các rủi ro bảo mật liên quan đến TPS
2. **Monitoring**: Theo dõi hiệu quả tiết kiệm memory từ TPS
3. **Workload Planning**: Sử dụng TPS hiệu quả với các workload phù hợp
4. **Policy Configuration**: Cấu hình chính sách TPS phù hợp với yêu cầu bảo mật

## Lệnh khắc phục sự cố

```bash
# Kiểm tra TPS statistics
esxtop

# Xem thông tin memory sharing
esxcli system settings advanced list -o /Mem/ShareScanTime

# Kiểm tra TPS security settings
esxcli system settings advanced list -o /Mem/ShareForceSalting

# Xem thông tin memory usage
esxcli system memory get
```

## Công nghệ liên quan

- [Memory Overcommit](/glossary/term/memory-overcommit.md)
- [Ballooning](/glossary/term/ballooning)
- [Memory Compression](/glossary/term/memory-compression.md)
- [Swapping](/glossary/term/swapping)
- [Large Pages](/glossary/term/large-pages)