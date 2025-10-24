---
term: Synchronous Mirroring
category: Data_Protection
language: vi
---

Synchronous Mirroring là kỹ thuật nhân bản dữ liệu đồng bộ trong vSphere, đảm bảo dữ liệu được ghi đồng thời trên cả site chính và site phụ trước khi xác nhận hoàn tất ghi. Kỹ thuật này cung cấp sự bảo vệ dữ liệu cao nhất với RPO (Recovery Point Objective) bằng 0, nhưng có thể ảnh hưởng đến hiệu suất do độ trễ mạng.

## Tổng quan

Synchronous Mirroring có các đặc điểm chính sau:
- Nhân bản dữ liệu đồng bộ giữa hai site
- RPO bằng 0 - không mất dữ liệu
- Có độ trễ mạng do chờ xác nhận từ site phụ
- Phù hợp cho các ứng dụng quan trọng đòi hỏi tính sẵn sàng cao

## Cách thức hoạt động

### Write Operation Flow
Quy trình ghi dữ liệu:
1. Ứng dụng ghi dữ liệu đến VM
2. ESXi ghi dữ liệu đến local storage
3. Dữ liệu được gửi đến site phụ
4. Site phụ ghi dữ liệu và xác nhận
5. Site chính xác nhận hoàn tất ghi cho ứng dụng

### Data Consistency
Đảm bảo tính nhất quán dữ liệu:
- Dữ liệu luôn đồng nhất giữa hai site
- Không có dữ liệu "dirty" hoặc chưa xác nhận
- Transaction được commit đồng thời trên cả hai site

### Latency Considerations
Yếu tố độ trễ:
- Độ trễ mạng ảnh hưởng đến hiệu suất
- Khoảng cách địa lý ảnh hưởng đến latency
- Cần network có độ trễ thấp và băng thông cao

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Cấu hình vSphere Replication cho synchronous mirroring
New-ReplicationJob -VM "CriticalVM" -TargetSite "DR-Site" -RPO 00:00:00 -NetworkCompressionEnabled $true

# Xem thông tin replication job
Get-ReplicationJob -VM "CriticalVM"

# Kiểm tra trạng thái replication
Get-ReplicationStatus -VM "CriticalVM"

# Cập nhật replication settings
Set-ReplicationJob -VM "CriticalVM" -RPO 00:00:00 -QuiesceGuestEnabled $true
```

### CLI Configuration
```bash
# Xem thông tin replication
vim-cmd vimsvc/task_list | grep -i replication

# Kiểm tra trạng thái replication
esxcli storage vmfs snapshot list

# Xem log replication
tail -f /var/log/vmware/vr.log

# Kiểm tra network latency
ping -c 10 dr-site.example.com
```

## So sánh với các phương pháp khác

### Asynchronous Replication
- RPO lớn hơn 0
- Ít ảnh hưởng đến hiệu suất
- Có thể mất dữ liệu trong khoảng thời gian RPO

### Semi-Synchronous Replication
- Cân bằng giữa synchronous và asynchronous
- Xác nhận ghi khi dữ liệu đến site phụ (chưa ghi)
- RPO gần bằng 0 với hiệu suất tốt hơn

## Các tính năng nâng cao trong vSphere 8

### Enhanced Replication Engine
- Cải thiện hiệu suất replication
- Hỗ trợ các network mới
- Tối ưu hóa việc sử dụng bandwidth

### Network Optimization
- Nén và encryption hiệu quả hơn
- Hỗ trợ multiple network paths
- Adaptive compression based on network conditions

## Thực hành tốt nhất

1. **Network Requirements**: Đảm bảo network có độ trễ thấp
2. **Distance Considerations**: Hạn chế khoảng cách giữa các site
3. **Performance Monitoring**: Theo dõi hiệu suất và latency
4. **Capacity Planning**: Lên kế hoạch dung lượng storage phù hợp

## Lệnh khắc phục sự cố

```bash
# Kiểm tra trạng thái replication
vim-cmd vimsvc/task_list | grep -i replication

# Xem log replication
tail -f /var/log/vmware/vr.log

# Kiểm tra network latency
ping -c 10 dr-site.example.com

# Xem thông tin storage
esxcli storage core path list
```

## Công nghệ liên quan

- [vSphere Replication](/glossary/term/vsphere-replication)
- [Site Recovery Manager (SRM)](/glossary/term/site-recovery-manager)
- [RPO (Recovery Point Objective)](/glossary/term/rpo)
- [RTO (Recovery Time Objective)](/glossary/term/rto)
- [Disaster Recovery](/glossary/term/disaster-recovery)