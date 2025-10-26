---
term: Recovery Point Objective (RPO)
category: Backup_Disaster_Recovery
language: vi
---

Recovery Point Objective (RPO) là khoảng thời gian tối đa có thể chấp nhận được mà một tổ chức có thể chịu mất dữ liệu trong quá trình thảm họa hoặc sự cố hệ thống. RPO xác định điểm thời gian mà dữ liệu phải được phục hồi, hiệu quả quyết định lượng dữ liệu có thể bị mất trong khi gián đoạn.

## Tổng quan

RPO đại diện cho:
- Khoảng thời gian mất dữ liệu có thể chịu được tối đa
- Tần suất sao lưu hoặc sao chép dữ liệu
- Tham số quan trọng trong lập kế hoạch phục hồi thảm họa
- Chỉ số then chốt cho chiến lược liên tục kinh doanh

## Các khái niệm chính

### Đo lường theo thời gian
- Đo bằng giây, phút, giờ hoặc ngày
- Đại diện cho khoảng thời gian giữa điểm phục hồi dữ liệu cuối cùng và sự cố
- Quy định tần suất sao lưu và sao chép yêu cầu

### Tác động kinh doanh
- Tương quan trực tiếp với mức mất dữ liệu tiềm năng
- Ảnh hưởng đến chiến lược sao lưu và lựa chọn công nghệ
- Tác động đến chi phí giải pháp phục hồi thảm họa
- Xác định mức rủi ro kinh doanh có thể chấp nhận

## Các kịch bản RPO

### RPO bằng không (0 giây)
- Không chấp nhận mất dữ liệu
- Yêu cầu bảo vệ dữ liệu liên tục
- Triển khai với sao chép đồng bộ
- Chi phí và độ phức tạp cao nhất

### RPO thấp (Phút đến giờ)
- Chấp nhận mất dữ liệu tối thiểu
- Phổ biến cho các ứng dụng kinh doanh quan trọng
- Triển khai với sao lưu hoặc sao chép thường xuyên
- Cân bằng chi phí và bảo vệ

### RPO trung bình (Giờ đến ngày)
- Chấp nhận mất dữ liệu nhất định
- Phù hợp cho các hệ thống không quan trọng
- Triển khai với sao lưu định kỳ
- Giải pháp chi phí thấp hơn

### RPO cao (Ngày hoặc tuần)
- Chấp nhận mất dữ liệu đáng kể
- Phù hợp cho dữ liệu lưu trữ hoặc tham khảo
- Triển khai với sao lưu không thường xuyên
- Giải pháp chi phí thấp nhất

## Ví dụ triển khai

### Các giải pháp VMware
```powershell
# Cấu hình vSphere Replication với RPO 15 phút
New-VMReplication -VM "CriticalVM" -TargetSite "DR-Site" -RPO 15

# Giám sát tuân thủ RPO
Get-VMReplication -VM "CriticalVM" | Select VMName, RPO, LastReplicationTime
```

### Sao chép dựa trên Storage
```bash
# Cấu hình sao chép array-based với RPO cụ thể
esxcli storage core path list | grep -i replication
```

## Cải tiến vSphere 8

### Quản lý RPO nâng cao
- **Kiểm soát chi tiết**: Cài đặt RPO chính xác hơn đến từng giây
- **RPO thích ứng**: Điều chỉnh động dựa trên mẫu workload
- **Giám sát RPO**: Khả năng hiển thị nâng cao về tuân thủ RPO
- **Khắc phục tự động**: Hành động tự động khi bỏ lỡ mục tiêu RPO

### Tích hợp quản lý hiện đại
- **Chính sách RPO**: Quản lý chính sách RPO tập trung
- **Tích hợp vòng đời**: Tích hợp tốt hơn với vSphere Lifecycle Manager
- **Cấu hình đơn giản**: Quy trình thiết lập RPO được đơn giản hóa
- **Báo cáo nâng cao**: Báo cáo tuân thủ RPO chi tiết

## Thực hành tốt nhất

1. **Căn chỉnh kinh doanh**: Căn chỉnh RPO với yêu cầu kinh doanh và mức chấp nhận rủi ro
2. **Đánh giá ứng dụng**: Xác định mức độ quan trọng của từng ứng dụng
3. **Phân tích chi phí-lợi ích**: Cân bằng chi phí bảo vệ với mức mất dữ liệu có thể chấp nhận
4. **Xem xét định kỳ**: Định kỳ đánh giá lại yêu cầu RPO
5. **Kiểm thử**: Xác nhận tuân thủ RPO thông qua kiểm thử định kỳ
6. **Giám sát**: Triển khai giám sát tuân thủ RPO liên tục

## Các công nghệ liên quan

- [Recovery Time Objective (RTO)](/glossary/term/recovery-time-objective.md)
- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [Site Recovery Manager](/glossary/term/site-recovery-manager.md)
- [Backup & Disaster Recovery](/glossary/term/backup-disaster-recovery.md)