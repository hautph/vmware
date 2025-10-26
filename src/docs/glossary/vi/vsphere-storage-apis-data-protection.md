---
term: VMware vSphere Storage APIs – Data Protection
category: Integration_APIs
language: vi
---

VMware vSphere Storage APIs – Data Protection (VADP), thường được gọi là VADP (trước đây là vStorage APIs for Data Protection), là một framework do VMware cung cấp cho phép sao lưu và phục hồi tập trung, hiệu quả và không phụ thuộc vào máy chủ lưu trữ các máy ảo vSphere.

## Tổng quan

VMware vSphere Storage APIs – Data Protection (VADP) là một thành phần quan trọng trong hệ sinh thái bảo vệ dữ liệu của VMware, cung cấp giao diện tiêu chuẩn cho các ứng dụng sao lưu của bên thứ ba thực hiện các hoạt động sao lưu và phục hồi trên các máy ảo vSphere. VADP đã thay thế framework VMware Consolidated Backup (VCB) và mang lại những cải tiến đáng kể về hiệu suất, hiệu quả và chức năng.

VADP cho phép các giải pháp sao lưu:
*   Thực hiện các hoạt động sao lưu không phụ thuộc vào máy chủ mà không ảnh hưởng đến hiệu suất máy ảo
*   Sử dụng Changed Block Tracking (CBT) để sao lưu gia tăng
*   Tận dụng công nghệ ảnh chụp nhanh để có các bản sao lưu nhất quán theo thời gian
*   Hỗ trợ sao lưu nhận thức ứng dụng thông qua VMware Tools và VSS

## Các tính năng chính

*   **Theo dõi khối thay đổi (CBT):** Xác định chỉ những khối đã thay đổi kể từ lần sao lưu cuối cùng, giảm đáng kể thời gian sao lưu và lưu lượng mạng
*   **Sao lưu dựa trên ảnh chụp nhanh:** Tạo ảnh chụp nhanh tạm ngưng của các máy ảo để sao lưu nhất quán mà không cần thời gian ngừng hoạt động
*   **Xử lý không phụ thuộc máy chủ:** Chuyển xử lý sao lưu ra khỏi máy chủ ESXi sang các máy chủ proxy chuyên dụng, giảm tiêu thụ tài nguyên máy chủ
*   **Nhận thức ứng dụng:** Tích hợp với VMware Tools và Dịch vụ Sao chép Âm lượng (VSS) để đảm bảo sao lưu nhất quán với ứng dụng
*   **Truyền dữ liệu hiệu quả:** Sử dụng các đường dẫn dữ liệu được tối ưu hóa để sao lưu và phục hồi nhanh hơn
*   **Phục hồi chi tiết:** Hỗ trợ tùy chọn phục hồi ở cấp độ tệp, đĩa và máy ảo đầy đủ
*   **Hỗ trợ sao chép:** Cho phép sao chép dữ liệu sao lưu cho các kịch bản phục hồi thảm họa

## Kiến trúc

### Các thành phần cốt lõi

*   **Máy chủ Proxy Sao lưu:** Máy chủ chuyên dụng xử lý sao lưu và truyền dữ liệu
*   **vCenter Server:** Điểm quản lý tập trung phối hợp các hoạt động sao lưu
*   **Máy chủ ESXi:** Các máy chủ vật lý chạy các máy ảo đang được sao lưu
*   **Cơ sở hạ tầng lưu trữ:** Các hệ thống lưu trữ backend nơi dữ liệu máy ảo được lưu trữ

### Luồng dữ liệu

1. **Khởi tạo sao lưu:** Ứng dụng sao lưu giao tiếp với vCenter Server thông qua API VADP
2. **Tạo ảnh chụp nhanh:** vCenter Server phối hợp với các máy chủ ESXi để tạo ảnh chụp nhanh tạm ngưng
3. **Xác định dữ liệu:** CBT xác định các khối đã thay đổi kể từ lần sao lưu cuối cùng
4. **Truyền dữ liệu:** Các khối đã thay đổi được truyền từ máy chủ ESXi đến máy chủ proxy sao lưu
5. **Xử lý sao lưu:** Proxy sao lưu xử lý và lưu trữ dữ liệu sao lưu trong các kho lưu trữ sao lưu
6. **Dọn dẹp:** Ảnh chụp nhanh được xóa sau khi hoàn tất sao lưu thành công

### Sơ đồ kiến trúc
```
Ứng dụng sao lưu
       |
    API VADP
       |
  vCenter Server
       |
   Máy chủ ESXi
   ├── Ảnh chụp VM1
   ├── Ảnh chụp VM2
   └── Ảnh chụp VMn
       |
  Máy chủ Proxy Sao lưu
       |
  Kho lưu trữ sao lưu
```

## Cấu hình và quản lý

### Điều kiện tiên quyết

*   **vCenter Server:** Cần thiết để quản lý tập trung các hoạt động sao lưu
*   **VMware Tools:** Phải được cài đặt và chạy trên tất cả các máy ảo được sao lưu
*   **Máy chủ Proxy Sao lưu:** Máy chủ chuyên dụng với tài nguyên đủ để xử lý sao lưu
*   **Kết nối mạng:** Cấu hình mạng phù hợp giữa tất cả các thành phần
*   **Truy cập lưu trữ:** Quyền truy cập và kết nối lưu trữ phù hợp

### Tích hợp với các giải pháp sao lưu

```bash
# Quy trình sao lưu mẫu sử dụng giải pháp sao lưu hỗ trợ VADP
1. Ứng dụng sao lưu kết nối với vCenter Server qua API VADP
2. Công việc sao lưu được lên lịch và khởi tạo
3. vCenter Server tạo ảnh chụp nhanh của các máy ảo mục tiêu
4. CBT xác định các khối đã thay đổi để sao lưu gia tăng
5. Dữ liệu được truyền đến máy chủ proxy sao lưu để xử lý
6. Dữ liệu sao lưu được lưu trữ trong kho lưu trữ được chỉ định
7. Ảnh chụp nhanh được xóa và công việc sao lưu hoàn tất
```

### Hoạt động quản lý

*   **Cấu hình công việc sao lưu:** Xác định lịch trình sao lưu, chính sách lưu giữ và cài đặt thông báo
*   **Giám sát và báo cáo:** Theo dõi trạng thái công việc sao lưu, số liệu hiệu suất và tỷ lệ thành công
*   **Hoạt động phục hồi:** Thực hiện các kịch bản phục hồi khác nhau bao gồm máy ảo đầy đủ, đĩa và phục hồi cấp độ tệp
*   **Tác vụ bảo trì:** Dọn dẹp định kỳ, quản lý kho lưu trữ và tối ưu hóa hiệu suất

## Thực hành tốt nhất

1. **Lập kế hoạch tài nguyên:** Phân bổ đủ CPU, bộ nhớ và tài nguyên mạng cho các máy chủ proxy sao lưu
2. **Tối ưu hóa mạng:** Sử dụng giao diện mạng chuyên dụng cho lưu lượng sao lưu để tránh ảnh hưởng đến hiệu suất
3. **Xem xét lưu trữ:** Lập kế hoạch công suất lưu trữ với hiệu quả CBT và chính sách lưu giữ
4. **Lên lịch sao lưu:** Lên lịch sao lưu trong thời gian bảo trì để giảm thiểu ảnh hưởng đến hiệu suất
5. **Kiểm tra định kỳ:** Kiểm tra hoạt động phục hồi thường xuyên để đảm bảo tính toàn vẹn của sao lưu
6. **Giám sát:** Giám sát tỷ lệ thành công và số liệu hiệu suất của công việc sao lưu liên tục
7. **Bảo mật:** Triển khai kiểm soát truy cập và mã hóa phù hợp cho dữ liệu sao lưu

## Lệnh khắc phục sự cố

```bash
# Kiểm tra trạng thái VMware Tools trên các máy ảo
vim-cmd vmsvc/get.guest <vmid> | grep -A 5 toolsStatus

# Xác minh trạng thái CBT trên các máy ảo
vim-cmd vmsvc/get.config <vmid> | grep -A 10 changeTrackingEnabled

# Kiểm tra trạng thái ảnh chụp nhanh
vim-cmd vmsvc/snapshot.get <vmid>

# Xác minh kết nối mạng với vCenter Server
ping <vcenter-server-ip>

# Kiểm tra tài nguyên máy chủ proxy sao lưu
esxtop hoặc top
```

## VADP so với các công nghệ trước đó

### Ưu điểm so với VMware Consolidated Backup (VCB)

*   **Hiệu suất:** Hoạt động sao lưu và phục hồi nhanh hơn đáng kể
*   **Hiệu quả:** CBT giảm thời gian sao lưu và lưu lượng mạng
*   **Sử dụng tài nguyên:** Xử lý không phụ thuộc máy chủ giảm tiêu thụ tài nguyên máy chủ ESXi
*   **Tích hợp:** Tích hợp tốt hơn với các ứng dụng sao lưu hiện đại
*   **Khả năng mở rộng:** Khả năng mở rộng được cải thiện cho các môi trường lớn

### Phát triển từ VCB

*   **Kiến trúc đơn giản:** Loại bỏ thiết lập máy chủ proxy VCB phức tạp
*   **API nâng cao:** Bộ API mạnh mẽ và phong phú hơn về tính năng
*   **Tích hợp gốc:** Tích hợp trực tiếp với các thành phần vSphere
*   **Độ tin cậy được cải thiện:** Cơ chế xử lý lỗi và phục hồi tốt hơn

## Các công nghệ liên quan

*   [Theo dõi khối thay đổi (CBT)](/glossary/term/changed-block-tracking) - Công nghệ xác định các khối đã sửa đổi để sao lưu hiệu quả
*   [VMware Tools](/glossary/term/vmware-tools) - Bộ tiện ích nâng cao hiệu suất và quản lý VM
*   [vCenter Server](/glossary/term/vcenter) - Nền tảng quản lý tập trung cho các môi trường vSphere
*   [Ảnh chụp nhanh](/glossary/term/snapshot) - Bản sao thời điểm của trạng thái máy ảo