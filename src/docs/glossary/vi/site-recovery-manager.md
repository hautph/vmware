---
term: Site Recovery Manager (SRM)
category: Backup_Disaster_Recovery
language: vi
---

VMware Site Recovery Manager (SRM) là giải pháp quản lý phục hồi sau thảm họa doanh nghiệp tự động hóa quy trình failover và failback các máy ảo và ứng dụng liên quan giữa site chính và site phục hồi. SRM cung cấp một framework toàn diện để triển khai, kiểm thử và thực thi các kế hoạch phục hồi thảm họa trong khi giảm thiểu thời gian ngừng hoạt động và đảm bảo tính liên tục kinh doanh.

## Tổng quan

Site Recovery Manager giải quyết nhu cầu thiết yếu của các tổ chức trong việc duy trì tính liên tục kinh doanh trước các thảm họa, sự cố phần cứng hoặc các sự kiện bảo trì có kế hoạch. Nó chuyển đổi các quy trình phục hồi thảm họa phức tạp, thủ công thành các thủ tục tự động, có thể lặp lại mà có thể được kiểm tra và xác nhận mà không ảnh hưởng đến môi trường sản xuất.

### Giá trị cốt lõi

- **Tự động hóa Orchestration**: Loại bỏ can thiệp thủ công trong quy trình phục hồi thảm họa
- **Kiểm thử không gián đoạn**: Cho phép kiểm tra định kỳ kế hoạch phục hồi mà không ảnh hưởng đến khối lượng công việc sản xuất
- **Đảm bảo tuân thủ**: Giúp các tổ chức đáp ứng các yêu cầu quy định về phục hồi thảm họa
- **Giảm thiểu rủi ro**: Giảm rủi ro thời gian ngừng hoạt động kéo dài trong các kịch bản thảm họa

## Các tính năng chính

### Tự động hóa Recovery Plan
- **Failover tự động**: Điều phối việc phục hồi VM và ứng dụng theo trình tự được xác định trước
- **Kế hoạch phục hồi tùy chỉnh**: Cho phép quản trị viên xác định các bước phục hồi và phụ thuộc
- **Kiểm thử không gián đoạn**: Cho phép kiểm tra định kỳ kế hoạch phục hồi thảm họa mà không ảnh hưởng đến sản xuất
- **Failback tự động**: Tự động hóa quy trình trả lại dịch vụ về site chính sau khi phục hồi

### Tích hợp Replication
- **Hỗ trợ vSphere Replication**: Làm việc với giải pháp replication gốc của VMware
- **Replication dựa trên Array**: Tích hợp với các công nghệ replication mảng lưu trữ
- **Giám sát Replication**: Cung cấp khả năng hiển thị trạng thái và sức khỏe của replication
- **Tối ưu hóa băng thông**: Tối ưu hóa lưu lượng replication để giảm thiểu tác động mạng

### Quản lý tập trung
- **Tích hợp vCenter Server**: Quản lý thông qua giao diện vSphere Client
- **Mẫu Recovery Plan**: Các mẫu có thể tái sử dụng cho các kịch bản phục hồi phổ biến
- **Kiểm soát truy cập dựa trên vai trò**: Quyền hạn chi tiết cho các hoạt động phục hồi
- **Quản lý đa site**: Quản lý tập trung nhiều site phục hồi

### Khả năng nâng cao
- **Cách ly mạng**: Đảm bảo an ninh mạng trong quá trình failover
- **Tính nhất quán ứng dụng**: Duy trì tính nhất quán cấp ứng dụng trong quá trình phục hồi
- **Ánh xạ lưu trữ**: Thông minh ánh xạ tài nguyên lưu trữ giữa các site
- **Script tùy chỉnh**: Mở rộng khả năng phục hồi thông qua script tùy chỉnh

## Kiến trúc

### Các thành phần cốt lõi
- **Site Recovery Manager Server**: Thành phần quản lý chính được cài đặt tại cả hai site
- **Recovery Plans**: Các định nghĩa dựa trên XML của các quy trình phục hồi và phụ thuộc
- **Placeholder VMs**: Đại diện nhẹ của các VM được bảo vệ tại site phục hồi
- **Mapping Objects**: Xác định mối quan hệ giữa tài nguyên site được bảo vệ và site phục hồi

### Cấu hình Site
- **Site được bảo vệ**: Trung tâm dữ liệu chính chạy khối lượng công việc sản xuất
- **Site phục hồi**: Trung tâm dữ liệu phụ cho phục hồi thảm họa
- **Các phiên bản vCenter Server**: Các phiên bản riêng biệt quản lý từng site
- **Cấu hình mạng**: Xác định ánh xạ mạng giữa các site

### Công nghệ Replication
- **vSphere Replication**: Giải pháp replication dựa trên hypervisor của VMware
- **Replication dựa trên Array**: Các công nghệ replication cụ thể của nhà cung cấp lưu trữ
- **Tích hợp bên thứ ba**: Hỗ trợ cho nhiều nhà cung cấp mảng lưu trữ khác nhau
- **Chính sách Replication**: Kiểm soát chi tiết các tham số replication

## Ví dụ cấu hình

### Cấu hình PowerShell/PowerCLI
```powershell
# Kết nối đến vCenter Server
Connect-VIServer -Server "vcenter-primary.local"

# Tạo recovery plan mới
New-SRMRecoveryPlan -Name "Production-DR-Plan" -Description "Kế hoạch phục hồi sản xuất chính"

# Thêm VM vào nhóm bảo vệ
Get-SRMProtectionGroup -Name "Production-PG" | Add-SRMProtectedVM -VM (Get-VM -Name "WebServer01", "AppServer01", "DBServer01")

# Kiểm thử recovery plan
Start-SRMRecoveryPlan -RecoveryPlan (Get-SRMRecoveryPlan -Name "Production-DR-Plan") -ValidateOnly

# Thực hiện failover
Start-SRMRecoveryPlan -RecoveryPlan (Get-SRMRecoveryPlan -Name "Production-DR-Plan")
```

### Cấu hình ESXi CLI
```bash
# Kiểm tra trạng thái dịch vụ SRM
service-control --status vmware-srm

# Xem trạng thái nhóm bảo vệ
/usr/lib/vmware-srm/bin/srmctl protection-group list

# Giám sát thực thi recovery plan
tail -f /var/log/vmware/srm/*.log
```

## Cải tiến vSphere 8

### Replication nâng cao
Trong vSphere 8, Site Recovery Manager đã được nâng cấp với:
- **Quản lý RPO cải tiến**: Kiểm soát chi tiết hơn đối với các mục tiêu điểm phục hồi
- **Tối ưu hóa RTO nâng cao**: Tối ưu hóa tốt hơn mục tiêu thời gian phục hồi
- **Thiết lập Replication đơn giản hóa**: Cấu hình đơn giản cho các chính sách replication
- **Giám sát nâng cao**: Khả năng hiển thị nâng cao về trạng thái replication và phục hồi

### Tích hợp quản lý hiện đại
- **Quản lý vòng đời**: Tích hợp tốt hơn với vSphere Lifecycle Manager
- **Quản lý dựa trên chính sách**: Tự động hóa dựa trên chính sách nâng cao
- **Hoạt động đơn giản hóa**: Đơn giản hóa các hoạt động quản lý
- **Khắc phục sự cố cải tiến**: Khả năng chẩn đoán tốt hơn

### Tích hợp đám mây
- **VMware Cloud on AWS**: Hỗ trợ nâng cao cho phục hồi thảm họa đám mây lai
- **Orchestration đa đám mây**: Điều phối trên nhiều môi trường đám mây
- **Khối lượng công việc Cloud-Native**: Hỗ trợ cho các kiến trúc ứng dụng hiện đại
- **Tích hợp SDDC**: Tích hợp liền mạch với Trung tâm dữ liệu được xác định bằng phần mềm

## Thực hành tốt nhất

1. **Mục tiêu phục hồi**: Xác định giá trị RTO và RPO phù hợp cho các ứng dụng khác nhau
2. **Kiểm tra định kỳ**: Kiểm tra định kỳ các kế hoạch phục hồi để đảm bảo chúng hoạt động như mong đợi
3. **Lập kế hoạch mạng**: Lập kế hoạch cẩn thận cấu hình mạng để đảm bảo failover đúng cách
4. **Kích thước tài nguyên**: Đảm bảo tài nguyên đầy đủ tại site phục hồi cho các kịch bản failover
5. **Tài liệu**: Duy trì tài liệu chi tiết về quy trình phục hồi và phụ thuộc
6. **Đào tạo**: Đào tạo nhân viên về quy trình và công cụ phục hồi
7. **Giám sát**: Triển khai giám sát liên tục trạng thái replication và phục hồi
8. **Tuân thủ**: Đảm bảo các kế hoạch phục hồi đáp ứng các yêu cầu quy định và tuân thủ

## Lệnh khắc phục sự cố

```bash
# Kiểm tra trạng thái dịch vụ SRM
service-control --status vmware-srm

# Xem log SRM
tail -f /var/log/vmware/srm/*.log

# Kiểm tra trạng thái nhóm bảo vệ
/usr/lib/vmware-srm/bin/srmctl protection-group list

# Giám sát trạng thái replication
/usr/lib/vmware-srm/bin/srmctl replication-group list

# Kiểm tra kết nối cơ sở dữ liệu SRM
/usr/lib/vmware-srm/bin/srmctl database status
```

## Các công nghệ liên quan

- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [Recovery Point Objective (RPO)](/glossary/term/recovery-point-objective.md)
- [Recovery Time Objective (RTO)](/glossary/term/recovery-time-objective.md)
- [VMware Cloud on AWS](/glossary/term/vmware-cloud-on-aws.md)
- [vCenter Server](/glossary/term/vcenter.md)