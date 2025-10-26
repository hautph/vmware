---
term: Sao lưu & Phục hồi Thảm họa
category: Backup_Disaster_Recovery
language: vi
---

Sao lưu & Phục hồi Thảm họa bao gồm các chiến lược, công nghệ và quy trình được thiết kế để bảo vệ và khôi phục dữ liệu và hệ thống khi xảy ra gián đoạn, sự cố hoặc thảm họa. Khía cạnh quan trọng này của cơ sở hạ tầng CNTT đảm bảo tính liên tục kinh doanh và giảm thiểu mất dữ liệu.

## Tổng quan

Sao lưu & Phục hồi Thảm họa bao gồm:
- Bảo vệ dữ liệu thông qua sao lưu định kỳ
- Chiến lược phục hồi cho sự cố hệ thống
- Lập kế hoạch liên tục kinh doanh
- Đánh giá và giảm thiểu rủi ro
- Tuân thủ các yêu cầu quy định

## Các khái niệm chính

### Chiến lược sao lưu
- **Sao lưu toàn bộ**: Bản sao hoàn chỉnh của tất cả dữ liệu
- **Sao lưu gia tăng**: Chỉ dữ liệu đã thay đổi kể từ lần sao lưu cuối
- **Sao lưu khác biệt**: Thay đổi kể từ lần sao lưu toàn bộ cuối cùng
- **Sao lưu dựa trên ảnh chụp**: Bản sao tại thời điểm cụ thể

### Các mục tiêu phục hồi
- **Mục tiêu Điểm Phục hồi (RPO)**: Mức mất dữ liệu có thể chấp nhận tối đa
- **Mục tiêu Thời gian Phục hồi (RTO)**: Thời gian ngừng hoạt động có thể chấp nhận tối đa
- **Mục tiêu Dung lượng Phục hồi (RCO)**: Tài nguyên cần thiết để phục hồi

### Các site phục hồi thảm họa
- **Site nóng**: Cơ sở dự phòng hoạt động đầy đủ
- **Site ấm**: Cơ sở được cấu hình một phần
- **Site lạnh**: Chỉ có hạ tầng cơ bản

## Các giải pháp VMware

### vSphere Replication
Giải pháp sao chép dựa trên hypervisor của VMware cung cấp:
- Sao chép bất đồng bộ các máy ảo
- RPO thấp tới 15 phút
- Tích hợp với vCenter Server
- Hỗ trợ sao chép trong site và giữa các site

### Site Recovery Manager (SRM)
Giải pháp điều phối cho phục hồi thảm họa cung cấp:
- Failover và failback tự động
- Kiểm thử kế hoạch phục hồi không ảnh hưởng
- Quản lý kế hoạch phục hồi tập trung
- Tích hợp với sao chép dựa trên mảng

### vSphere Data Protection (VDP)
Giải pháp sao lưu dựa trên ảnh cung cấp:
- Sao lưu cấp độ đĩa của máy ảo
- Sao lưu nhận thức ứng dụng
- Deduplication và nén
- Tích hợp với vCenter Server

## Ví dụ triển khai

### Cấu hình PowerShell/PowerCLI
```powershell
# Cấu hình vSphere Replication
New-VMReplication -VM "CriticalVM" -TargetSite "DR-Site" -RPO 15

# Tạo công việc sao lưu với PowerCLI
New-VBRJob -Name "DailyBackup" -BackupRepository "BackupRepo" -Entity (Get-VM "ProductionVMs")

# Giám sát trạng thái sao chép
Get-VMReplication -VM "CriticalVM" | Select VMName, State, RPO, LastSyncTime
```

### Lệnh ESXi CLI
```bash
# Kiểm tra trạng thái sao lưu
vim-cmd vimsvc/task_list | grep -i backup

# Xem cấu hình sao chép
esxcli system settings advanced list -o /VR

# Giám sát ảnh chụp lưu trữ
esxcli storage vmfs snapshot list
```

## Cải tiến vSphere 8

### Bảo vệ dữ liệu nâng cao
- **Quản lý RPO nâng cao**: Kiểm soát chi tiết hơn về các mục tiêu điểm phục hồi
- **Tối ưu hóa RTO nâng cao**: Tối ưu hóa tốt hơn về mục tiêu thời gian phục hồi
- **Thiết lập sao chép đơn giản**: Cấu hình đơn giản hóa cho các chính sách sao chép
- **Giám sát nâng cao**: Khả năng hiển thị nâng cao về trạng thái sao chép và phục hồi

### Tích hợp quản lý hiện đại
- **Quản lý vòng đời**: Tích hợp tốt hơn với vSphere Lifecycle Manager
- **Quản lý dựa trên chính sách**: Tự động hóa dựa trên chính sách nâng cao
- **Hoạt động đơn giản**: Các hoạt động quản lý được đơn giản hóa
- **Khắc phục sự cố nâng cao**: Khả năng chẩn đoán tốt hơn

## Thực hành tốt nhất

1. **Xác định RPO/RTO**: Thiết lập các mục tiêu phục hồi rõ ràng cho các ứng dụng khác nhau
2. **Kiểm tra định kỳ**: Kiểm tra các quy trình sao lưu và phục hồi thường xuyên
3. **Nhiều bản sao**: Duy trì nhiều bản sao của dữ liệu quan trọng
4. **Lưu trữ ngoài site**: Lưu trữ sao lưu tại các vị trí địa lý riêng biệt
5. **Mã hóa**: Mã hóa sao lưu cả khi truyền và lưu trữ
6. **Giám sát**: Liên tục giám sát trạng thái sao lưu và sao chép
7. **Tài liệu**: Duy trì tài liệu chi tiết về tất cả các quy trình

## Xem xét bảo mật

### Bảo vệ dữ liệu
- **Mã hóa**: Đảm bảo sao lưu được mã hóa
- **Kiểm soát truy cập**: Hạn chế truy cập vào các hệ thống sao lưu
- **Xác minh tính toàn vẹn**: Thường xuyên xác minh tính toàn vẹn của sao lưu
- **Tuân thủ**: Đáp ứng các yêu cầu quy định về bảo vệ dữ liệu

### Bảo mật mạng
- **Mạng chuyên dụng**: Sử dụng mạng riêng cho lưu lượng sao lưu
- **Giao thức an toàn**: Sử dụng giao thức an toàn để truyền dữ liệu
- **Quy tắc tường lửa**: Triển khai các quy tắc tường lửa phù hợp
- **VPN**: Sử dụng VPN cho kết nối sao lưu từ xa

## Lệnh khắc phục sự cố

```bash
# Kiểm tra trạng thái dịch vụ vSphere Replication
service-control --status vmware-vr

# Xem nhật ký sao chép
tail -f /var/log/vmware/vsphere-replication/*.log

# Kiểm tra trạng thái công việc sao lưu
vim-cmd vimsvc/task_list | grep -i backup

# Giám sát ảnh chụp lưu trữ
esxcli storage vmfs snapshot list
```

## Các công nghệ liên quan

- [Recovery Point Objective (RPO)](/glossary/term/recovery-point-objective.md)
- [Recovery Time Objective (RTO)](/glossary/term/recovery-time-objective.md)
- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [Site Recovery Manager](/glossary/term/site-recovery-manager.md)
- [vSphere Data Protection](/glossary/term/vsphere-data-protection.md)
- [Snapshot](/glossary/term/snapshot.md)