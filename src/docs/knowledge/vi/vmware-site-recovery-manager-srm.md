---
title: VMware Site Recovery Manager (SRM) - Hướng dẫn toàn diện
category: Disaster Recovery
excerpt: Hướng dẫn toàn diện về VMware Site Recovery Manager (SRM), bao gồm kiến trúc, triển khai, thực hành tốt nhất và cấu hình nâng cao cho phục hồi thảm họa doanh nghiệp.
language: vi
---

# VMware Site Recovery Manager (SRM) - Hướng dẫn toàn diện

VMware Site Recovery Manager (SRM) là giải pháp quản lý phục hồi sau thảm họa doanh nghiệp tự động hóa quy trình failover và failback các máy ảo và ứng dụng liên quan giữa site chính và site phục hồi. Hướng dẫn toàn diện này bao gồm kiến trúc SRM, chiến lược triển khai, thực hành tốt nhất và các tùy chọn cấu hình nâng cao.

## Giới thiệu về Site Recovery Manager

Site Recovery Manager giải quyết nhu cầu thiết yếu của các tổ chức trong việc duy trì tính liên tục kinh doanh trước các thảm họa, sự cố phần cứng hoặc các sự kiện bảo trì có kế hoạch. Nó chuyển đổi các quy trình phục hồi thảm họa phức tạp, thủ công thành các thủ tục tự động, có thể lặp lại mà có thể được kiểm tra và xác nhận mà không ảnh hưởng đến môi trường sản xuất.

### Giá trị cốt lõi

- **Tự động hóa Orchestration**: Loại bỏ can thiệp thủ công trong quy trình phục hồi thảm họa
- **Kiểm thử không gián đoạn**: Cho phép kiểm tra định kỳ kế hoạch phục hồi mà không ảnh hưởng đến khối lượng công việc sản xuất
- **Đảm bảo tuân thủ**: Giúp các tổ chức đáp ứng các yêu cầu quy định về phục hồi thảm họa
- **Giảm thiểu rủi ro**: Giảm rủi ro thời gian ngừng hoạt động kéo dài trong các kịch bản thảm họa

## Kiến trúc SRM và các thành phần

### Các thành phần cốt lõi

1. **Site Recovery Manager Server**: Thành phần quản lý chính được cài đặt tại cả hai site
2. **Recovery Plans**: Các định nghĩa dựa trên XML của các quy trình phục hồi và phụ thuộc
3. **Placeholder VMs**: Đại diện nhẹ của các VM được bảo vệ tại site phục hồi
4. **Mapping Objects**: Xác định mối quan hệ giữa tài nguyên site được bảo vệ và site phục hồi

### Cấu hình Site

- **Site được bảo vệ**: Trung tâm dữ liệu chính chạy khối lượng công việc sản xuất
- **Site phục hồi**: Trung tâm dữ liệu phụ cho phục hồi thảm họa
- **Các phiên bản vCenter Server**: Các phiên bản riêng biệt quản lý từng site
- **Cấu hình mạng**: Xác định ánh xạ mạng giữa các site

### Công nghệ Replication

SRM hỗ trợ nhiều công nghệ replication:
- **vSphere Replication**: Giải pháp replication dựa trên hypervisor của VMware
- **Replication dựa trên Array**: Các công nghệ replication cụ thể của nhà cung cấp lưu trữ
- **Tích hợp bên thứ ba**: Hỗ trợ cho nhiều nhà cung cấp mảng lưu trữ khác nhau

## Hướng dẫn triển khai

### Điều kiện tiên quyết

Trước khi triển khai SRM, hãy đảm bảo đáp ứng các điều kiện tiên quyết sau:
- vCenter Server 7.0 trở lên tại cả hai site
- Hạ tầng lưu trữ tương thích
- Kết nối mạng giữa các site
- Tài nguyên đầy đủ tại site phục hồi
- Đồng bộ hóa DNS và thời gian phù hợp

### Các bước cài đặt

1. **Cài đặt SRM Server**
   - Tải trình cài đặt SRM từ VMware Customer Connect
   - Cài đặt SRM Server tại cả site được bảo vệ và site phục hồi
   - Cấu hình kết nối cơ sở dữ liệu
   - Thiết lập ghép nối site giữa site được bảo vệ và site phục hồi

2. **Cấu hình Replication**
   - Chọn phương pháp replication (vSphere Replication hoặc dựa trên mảng)
   - Cấu hình cài đặt replication cho VM
   - Đặt giá trị RPO dựa trên yêu cầu kinh doanh
   - Giám sát tiến trình đồng bộ hóa ban đầu

3. **Tạo Protection Groups**
   - Nhóm các VM liên quan vào các nhóm bảo vệ
   - Xác định chính sách replication cho từng nhóm
   - Cấu hình mạng kiểm thử
   - Xác nhận cấu hình nhóm bảo vệ

4. **Thiết kế Recovery Plans**
   - Tạo recovery plans cho các nhóm ứng dụng
   - Xác định thứ tự khởi động VM và phụ thuộc
   - Cấu hình ánh xạ mạng
   - Thêm script tùy chỉnh cho các tác vụ cụ thể của ứng dụng

### Ví dụ cấu hình

#### Cấu hình PowerShell/PowerCLI
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

#### Cấu hình ESXi CLI
```bash
# Kiểm tra trạng thái dịch vụ SRM
service-control --status vmware-srm

# Xem trạng thái nhóm bảo vệ
/usr/lib/vmware-srm/bin/srmctl protection-group list

# Giám sát thực thi recovery plan
tail -f /var/log/vmware/srm/*.log
```

## Thực hành tốt nhất

### Mục tiêu phục hồi
- Xác định giá trị RTO và RPO phù hợp cho các ứng dụng khác nhau
- Căn chỉnh mục tiêu phục hồi với mức độ quan trọng kinh doanh
- Thường xuyên xem xét và cập nhật mục tiêu dựa trên yêu cầu thay đổi

### Kiểm tra định kỳ
- Kiểm tra định kỳ các kế hoạch phục hồi để đảm bảo chúng hoạt động như mong đợi
- Lên lịch kiểm tra trong thời gian bảo trì
- Tài liệu hóa kết quả kiểm tra và bất kỳ sự cố nào gặp phải
- Bao gồm các bên liên quan kinh doanh trong xác nhận kiểm tra

### Lập kế hoạch mạng
- Lập kế hoạch cẩn thận cấu hình mạng để đảm bảo failover đúng cách
- Cấu hình mạng kiểm thử cho kiểm tra không gián đoạn
- Tài liệu hóa ánh xạ địa chỉ IP giữa các site
- Lập kế hoạch cho các cân nhắc DNS và Active Directory

### Kích thước tài nguyên
- Đảm bảo tài nguyên đầy đủ tại site phục hồi cho các kịch bản failover
- Cân nhắc yêu cầu tải đỉnh trong quá trình failover
- Lập kế hoạch cho dung lượng lưu trữ tại site phục hồi
- Tính đến tài nguyên bổ sung cần thiết trong quá trình kiểm tra

### Tài liệu
- Duy trì tài liệu chi tiết về quy trình phục hồi và phụ thuộc
- Cập nhật tài liệu với các thay đổi cấu hình
- Bao gồm thông tin liên hệ cho nhân viên chủ chốt
- Tài liệu hóa quy trình leo thang

### Đào tạo
- Đào tạo nhân viên về quy trình phục hồi và công cụ
- Tiến hành các buổi đào tạo định kỳ cho thành viên nhóm mới
- Cung cấp thực hành trực tiếp với giao diện SRM
- Bao gồm người dùng kinh doanh trong các quy trình DR

## Cấu hình nâng cao

### Cải tiến vSphere 8

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

## Khắc phục sự cố

### Các vấn đề phổ biến và giải pháp

1. **Lỗi Replication**
   - Kiểm tra kết nối mạng giữa các site
   - Xác minh cấu hình mảng lưu trữ
   - Xem xét log replication để biết lỗi cụ thể
   - Đảm bảo băng thông đủ cho lưu lượng replication

2. **Lỗi thực thi Recovery Plan**
   - Xác nhận cấu hình VM tại site phục hồi
   - Kiểm tra ánh xạ mạng và kết nối
   - Xem xét log thực thi script tùy chỉnh
   - Xác minh tính sẵn có tài nguyên tại site phục hồi

3. **Vấn đề ghép nối Site**
   - Xác nhận độ tin cậy chứng chỉ giữa các site
   - Xác minh kết nối vCenter Server
   - Kiểm tra trạng thái dịch vụ SRM tại cả hai site
   - Xem xét cấu hình xác thực

### Lệnh khắc phục sự cố

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

## Giám sát và bảo trì

### Các chỉ số chính cần giám sát

- **Trạng thái Replication**: Đảm bảo tất cả VM được bảo vệ đang replicating thành công
- **Tuân thủ RPO**: Giám sát rằng các mục tiêu RPO đang được đáp ứng
- **Sử dụng lưu trữ**: Theo dõi tiêu thụ lưu trữ tại site phục hồi
- **Băng thông mạng**: Giám sát tác động lưu lượng replication đến mạng
- **Sức khỏe dịch vụ**: Xác minh dịch vụ SRM đang chạy đúng cách

### Các tác vụ bảo trì định kỳ

- **Xoay vòng Log**: Triển khai chính sách xoay vòng log để quản lý dung lượng đĩa
- **Quản lý chứng chỉ**: Gia hạn chứng chỉ trước khi hết hạn
- **Cập nhật phần mềm**: Áp dụng cập nhật và bản vá SRM khi cần
- **Tinh chỉnh hiệu suất**: Tối ưu hóa cấu hình dựa trên mô hình sử dụng

## Cân nhắc bảo mật

### Xác thực và ủy quyền
- Triển khai xác thực mạnh cho quản trị SRM
- Sử dụng kiểm soát truy cập dựa trên vai trò để giới hạn đặc quyền quản trị
- Thường xuyên xem xét và kiểm tra quyền truy cập người dùng
- Bật xác thực đa yếu tố khi có thể

### Bảo vệ dữ liệu
- Mã hóa lưu lượng replication giữa các site
- Triển khai phân đoạn mạng cho lưu lượng replication
- Bảo mật lưu trữ backup cấu hình
- Thường xuyên kiểm tra tính toàn vẹn dữ liệu của VM được replicated

## Kết luận

VMware Site Recovery Manager cung cấp giải pháp phục hồi thảm họa toàn diện tự động hóa quy trình phức tạp của failover và failback trong khi cho phép kiểm tra thường xuyên, không gián đoạn. Bằng cách tuân theo hướng dẫn triển khai, thực hành tốt nhất và các tùy chọn cấu hình nâng cao được nêu trong hướng dẫn này, các tổ chức có thể xây dựng khả năng phục hồi thảm họa mạnh mẽ đáp ứng yêu cầu liên tục kinh doanh của họ.

Kiểm tra định kỳ, tài liệu hóa đúng cách và bảo trì liên tục là chìa khóa để đảm bảo SRM tiếp tục cung cấp bảo vệ đáng tin cậy cho các ứng dụng kinh doanh quan trọng. Với các khả năng nâng cao trong vSphere 8 và các tính năng tích hợp đám mây, SRM vẫn là trụ cột của các chiến lược phục hồi thảm họa doanh nghiệp.