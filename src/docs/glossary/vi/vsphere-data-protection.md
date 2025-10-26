---
term: vSphere Data Protection
category: Data_Protection
language: vi
---

vSphere Data Protection (VDP) là giải pháp sao lưu và phục hồi dựa trên đĩa cho các môi trường vSphere, được cung cấp bởi EMC Avamar. Nó cung cấp sao lưu không cần agent ở cấp độ hình ảnh của các máy ảo và mang lại các tính năng như loại bỏ trùng lặp, sao chép và các tùy chọn phục hồi chi tiết. Mặc dù VDP đã hết vòng đời, nhưng khái niệm bảo vệ dữ liệu vẫn rất quan trọng trong các môi trường vSphere, thường được thực hiện bởi các giải pháp sao lưu của bên thứ ba.

## Tổng quan

vSphere Data Protection (VDP) là giải pháp sao lưu và phục hồi tích hợp của VMware được thiết kế đặc biệt cho các môi trường ảo hóa. Được xây dựng dựa trên công nghệ EMC Avamar, VDP cung cấp bảo vệ dữ liệu hiệu quả và có thể mở rộng cho các môi trường VMware vSphere với các tính năng như loại bỏ trùng lặp độ dài biến, sao lưu không cần agent và tích hợp liền mạch với vCenter Server. Mặc dù VDP đã kết thúc vòng đời vào năm 2016, nhưng nó đã đóng vai trò quan trọng trong việc thiết lập chiến lược bảo vệ dữ liệu của VMware và đặt nền móng cho các giải pháp sao lưu hiện đại.

## Các tính năng chính (Lịch sử)

*   **Sao lưu không cần Agent:** Thực hiện sao lưu ở cấp độ hình ảnh của các máy ảo mà không cần agent trong hệ điều hành khách.
*   **Loại bỏ trùng lặp độ dài biến:** Giảm đáng kể việc tiêu thụ lưu trữ bằng cách loại bỏ dữ liệu trùng lặp.
*   **Tích hợp với vCenter Server:** Quản lý trực tiếp từ vSphere Client, đơn giản hóa việc quản trị sao lưu.
*   **Phục hồi chi tiết:** Cho phép phục hồi toàn bộ máy ảo, đĩa riêng lẻ hoặc thậm chí các tệp cụ thể.
*   **Sao chép:** Hỗ trợ sao chép dữ liệu sao lưu sang thiết bị VDP phụ để phục hồi thảm họa.
*   **Xử lý nhận thức ứng dụng:** Sử dụng VMware Tools và ảnh chụp nhanh VSS để sao lưu ứng dụng nhất quán.
*   **Xác minh sao lưu:** Bao gồm xác minh sao lưu tích hợp để đảm bảo tính toàn vẹn của dữ liệu.
*   **Chính sách lưu giữ:** Chính sách lưu giữ có thể cấu hình để quản lý vòng đời sao lưu tự động.

## Kiến trúc

### Các thành phần cốt lõi

*   **Thiết bị VDP:** Thiết bị ảo được cấu hình sẵn chạy SUSE Linux Enterprise Server với phần mềm EMC Avamar.
*   **Tích hợp vCenter Server:** Tích hợp trực tiếp với vCenter Server để quản lý tập trung.
*   **vStorage APIs for Data Protection (VADP):** Tận dụng các API của VMware để thực hiện các hoạt động sao lưu hiệu quả.
*   **Kho lưu trữ:** Không gian lưu trữ chuyên dụng cho dữ liệu sao lưu với loại bỏ trùng lặp tích hợp.

### Luồng dữ liệu

1. **Khởi tạo sao lưu:** Công việc sao lưu được khởi tạo thông qua vSphere Web Client hoặc được lên lịch tự động.
2. **Tạo ảnh chụp nhanh:** VADP tạo ảnh chụp nhanh tạm ngưng của máy ảo.
3. **Truyền dữ liệu:** Theo dõi khối thay đổi (CBT) xác định và truyền chỉ các khối đã sửa đổi.
4. **Loại bỏ trùng lặp:** Loại bỏ trùng lặp độ dài biến giảm dấu chân dữ liệu trước khi lưu trữ.
5. **Lưu trữ:** Dữ liệu đã xử lý được lưu trữ trong kho lưu trữ của thiết bị VDP.

### Sơ đồ kiến trúc
```
Môi trường vSphere
├── vCenter Server
│   └── Plugin VDP
├── Máy chủ ESXi
│   ├── VM1
│   ├── VM2
│   └── VMn
└── Thiết bị VDP
    ├── Công cụ Avamar
    ├── Kho lưu trữ
    └── Giao diện quản lý
```

## Cấu hình và quản lý

### Yêu cầu triển khai

*   **Tài nguyên phần cứng:** Tối thiểu 8 vCPU, 16GB RAM và lưu trữ chuyên dụng cho kho lưu trữ sao lưu
*   **Mạng:** Giao diện mạng chuyên dụng cho lưu lượng sao lưu được khuyến nghị
*   **Lưu trữ:** Lưu trữ gắn trực tiếp, NFS hoặc datastore VMFS cho kho lưu trữ sao lưu
*   **Giấy phép:** Yêu cầu vSphere Enterprise Plus hoặc vSphere with Operations Management Enterprise Plus

### Cấu hình sao lưu

```bash
# Ví dụ cấu hình công việc sao lưu qua vSphere Web Client
1. Điều hướng đến vSphere Web Client > Home > Inventories > VMs and Templates
2. Nhấp chuột phải VM mục tiêu > All VDP Actions > Create Backup Job
3. Cấu hình lịch trình sao lưu, chính sách lưu giữ và cài đặt thông báo
4. Bật xử lý nhận thức ứng dụng nếu cần
5. Xem xét và xác nhận cài đặt công việc sao lưu
```

### Hoạt động quản lý

*   **Quản lý công việc sao lưu:** Tạo, sửa đổi và lên lịch công việc sao lưu
*   **Hoạt động phục hồi:** Thực hiện phục hồi VM đầy đủ, đĩa hoặc cấp độ tệp
*   **Giám sát:** Giám sát trạng thái và hiệu suất công việc sao lưu
*   **Báo cáo:** Tạo báo cáo sao lưu và tài liệu tuân thủ

## Thực hành tốt nhất

1. **Phân bổ tài nguyên:** Phân bổ đủ CPU, bộ nhớ và tài nguyên lưu trữ cho thiết bị VDP
2. **Phân đoạn mạng:** Sử dụng giao diện mạng chuyên dụng cho lưu lượng sao lưu để tránh tác động đến hiệu suất
3. **Lập kế hoạch lưu trữ:** Lập kế hoạch công suất lưu trữ xem xét tỷ lệ loại bỏ trùng lặp và yêu cầu lưu giữ
4. **Lên lịch sao lưu:** Lên lịch sao lưu trong thời gian bảo trì để giảm thiểu tác động đến hiệu suất
5. **Bảo trì định kỳ:** Thực hiện các tác vụ bảo trì định kỳ như thu gom rác và kiểm tra tính toàn vẹn
6. **Giám sát:** Giám sát tỷ lệ thành công của công việc sao lưu và sử dụng lưu trữ thường xuyên
7. **Kiểm tra:** Thường xuyên kiểm tra hoạt động phục hồi để đảm bảo tính toàn vẹn của sao lưu

## Lệnh khắc phục sự cố

```bash
# Kiểm tra trạng thái thiết bị VDP
ssh dpn
dpnctl status

# Xem nhật ký công việc sao lưu
less /var/log/avamar/*.log

# Kiểm tra sử dụng lưu trữ
mccli storage show --capacity=true

# Xác minh kết nối mạng
ping <vcenter-server-ip>
```

## Các giải pháp thay thế hiện đại

Ngày nay, nhiều giải pháp sao lưu và phục hồi của bên thứ ba tích hợp với vSphere APIs for Data Protection (VADP) để cung cấp khả năng bảo vệ dữ liệu toàn diện, mang lại các tính năng nâng cao và khả năng tương thích rộng hơn.

### Các giải pháp của bên thứ ba phổ biến

*   **Veeam Backup & Replication:** Giải pháp dẫn đầu thị trường với tích hợp vSphere nâng cao
*   **Commvault:** Giải pháp sao lưu cấp doanh nghiệp với hỗ trợ ảo hóa toàn diện
*   **Veritas NetBackup:** Giải pháp sao lưu có thể mở rộng cho doanh nghiệp với tích hợp VMware
*   **Rubrik:** Nền tảng sao lưu và phục hồi đám mây với kiến trúc hiện đại

### Ưu điểm của các giải pháp hiện đại

*   **Tính năng nâng cao:** Các tính năng nâng cao như phục hồi tức thì, sao chép và tích hợp đám mây
*   **Hiệu suất tốt hơn:** Hiệu suất sao lưu và phục hồi được cải thiện với kiến trúc hiện đại
*   **Tích hợp đám mây:** Tích hợp liền mạch với các nền tảng đám mây công cộng cho môi trường lai
*   **Khả năng mở rộng:** Khả năng mở rộng tốt hơn cho các môi trường doanh nghiệp lớn
*   **Hỗ trợ:** Hỗ trợ nhà cung cấp tích cực và cập nhật thường xuyên

## Các công nghệ liên quan

*   [vSphere APIs for Data Protection (VADP)](/glossary/term/vsphere-storage-apis-data-protection) - Khung công tác của VMware cho các giải pháp sao lưu và phục hồi
*   [Theo dõi khối thay đổi (CBT)](/glossary/term/changed-block-tracking) - Công nghệ xác định các khối đã sửa đổi để sao lưu hiệu quả
*   [VMware Tools](/glossary/term/vi/vmware-tools) - Bộ tiện ích nâng cao hiệu suất và quản lý VM
*   [vCenter Server](/glossary/term/vi/vcenter-server) - Nền tảng quản lý tập trung cho các môi trường vSphere