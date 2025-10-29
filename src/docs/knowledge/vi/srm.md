---
title: VMware Site Recovery Manager (SRM) - Cái Nhìn Toàn Diện
category: Disaster Recovery
excerpt: Bài viết toàn diện về VMware Site Recovery Manager (SRM), công cụ then chốt cho giải pháp Disaster Recovery (DR) giữa 2 datacenter.
language: vi
---

# VMware Site Recovery Manager (SRM) - Cái Nhìn Toàn Diện

**VMware Site Recovery Manager (SRM)** là một sản phẩm phần mềm tự động hóa toàn bộ quy trình kế hoạch phục hồi sau thảm họa (Disaster Recovery Plan) cho các máy ảo chạy trên nền tảng vSphere. Hiểu đơn giản:

*   **Nó là "bộ não" tự động hóa DR:** Thay vì khi xảy ra sự cố, admin phải thủ công khởi động từng máy ảo, cấu hình lại network, IP... một cách vội vàng và dễ sai sót, SRM sẽ thực hiện tất cả các bước này một cách tự động, có trật tự theo một **kế hoạch được định nghĩa sẵn** (Recovery Plan).
*   **Mục tiêu chính:** Giảm thiểu tối đa **thời gian ngừng dịch vụ (RTO)** và đảm bảo tính nhất quán của dữ liệu.

## Kiến Trúc & Các Thành Phần Chính Để SRM Hoạt Động

Để SRM hoạt động, bạn cần một nhóm các thành phần phối hợp với nhau. Kiến trúc cơ bản giữa 2 Site (Site A - Protected, Site B - Recovery) như sau:

**(Hình ảnh minh họa: Sơ đồ 2 site, mỗi site có 1 vCenter, 1 SRM, kết nối với nhau và với nguồn nhân bản dữ liệu)**

### 1. VMware vCenter Server:
*   **Bắt buộc phải có một vCenter Server riêng biệt ở mỗi site.** SRM không thể chạy mà không có vCenter.
*   vCenter tại mỗi site quản lý các host ESXi và tài nguyên tại site đó.

### 2. VMware Site Recovery Manager Server:
*   **Cài đặt một instance SRM tại mỗi site.** Hai instance này được "pair" (ghép nối) với nhau.
*   SRM tại Site A (Protected Site) sẽ giao tiếp với SRM tại Site B (Recovery Site) để quản lý các kế hoạch phục hồi và thử nghiệm.

### 3. Công Nghệ Nhân Bản Dữ Liệu (Replication Technology):
*   Đây là trái tim của DR. SRM **không tự nó nhân bản dữ liệu**, mà nó **quản lý và điều phối** các công nghệ nhân bản có sẵn. Có 2 lựa chọn chính:

    *   **a. vSphere Replication:**
        *   Là công nghệ nhân bản ở cấp **máy ảo (VM-level)**, được tích hợp sẵn trong vSphere.
        *   **Cách hoạt động:** Một bộ phận (VR appliance) được cài đặt tại mỗi site, chịu trách nhiệm sao chép các disk của máy ảo từ site này sang datastore ở site kia.
        *   **Ưu điểm:**
            *   Linh hoạt: Có thể chọn nhân bản từng máy ảo riêng lẻ, không phụ thuộc vào loại storage.
            *   Chi phí thấp hơn vì tận dụng công nghệ của VMware.
        *   **Nhược điểm:** Có thể tạo thêm overhead cho host ESXi so với nhân bản từ storage.

    *   **b. Array-Based Replication (với Storage Replication Adapters - SRA):**
        *   Sử dụng cơ chế nhân bản nguyên khối (block-level) có sẵn của **phần cứng storage** (ví dụ: Dell EMC, NetApp, HPE, v.v.).
        *   **Cách hoạt động:** SRM giao tiếp với storage thông qua một driver gọi là SRA (Storage Replication Adapter). SRA này cho phép SRM ra lệnh cho hệ thống storage bắt đầu/dừng nhân bản, đồng bộ hóa, và thực hiện các thao tác chuyển đổi.
        *   **Ưu điểm:**
            *   Hiệu suất cao, ổn định vì dùng sức mạnh phần cứng chuyên dụng.
            *   Thường nhân bản toàn bộ LUN/Volume, phù hợp cho nhóm máy ảo lớn.
        *   **Nhược điểm:**
            *   Đắt tiền (cần storage hỗ trợ và license nhân bản).
            *   Phụ thuộc vào loại storage (thường cần cùng hãng hoặc cùng dòng sản phẩm giữa 2 site).

### 4. Kế Hoạch Phục Hồi (Recovery Plan):
*   Đây là "kịch bản" mà SRM sẽ chạy khi xảy ra sự cố.
*   Trong Recovery Plan, bạn có thể định nghĩa:
    *   **Máy ảo nào** sẽ được khôi phục.
    *   **Thứ tự khởi động/tắt máy** (Ví dụ: khởi động Domain Controller trước, rồi đến Database Server, cuối cùng mới đến Application Server).
    *   **Cấu hình mạng tại site phục hồi:** SRM có tính năng "Re-IP" tự động đổi địa chỉ IP của máy ảo sang dải mạng của site phục hồi.
    *   Các bước script tùy chỉnh (pre/post-power-on scripts) nếu cần.

## Quy Trình Hoạt Động Chính Của SRM

### 1. Thiết lập và Cấu hình:
*   Cài đặt và ghép nối SRM giữa 2 site.
*   Cấu hình kết nối đến nguồn nhân bản (vSphere Replication hoặc Array-Based Replication qua SRA).
*   Tạo các Recovery Plan, định nghĩa thứ tự, mạng, và các tùy chọn.

### 2. Nhân Bản và Đồng Bộ:
*   Dữ liệu từ các máy ảo được nhân bản liên tục từ Site A sang Site B. Quá trình này diễn ra trong nền.

### 3. Kiểm Tra Không Gián Đoạn (Non-Disruptive Testing):
*   **Đây là tính năng CỰC KỲ quan trọng của SRM.**
*   Bạn có thể chạy thử nghiệm Recovery Plan bất kỳ lúc nào mà **không ảnh hưởng đến hoạt động tại Site chính và cả Site phục hồi**.
*   **Cách SRM làm điều này:**
    *   SRM tạo ra một bản copy isolated của các máy ảo được nhân bản trong một mạng thử nghiệm riêng biệt tại Site phục hồi.
    *   Bạn có thể truy cập vào các máy ảo này, kiểm tra ứng dụng, xem log... để đảm bảo mọi thứ hoạt động đúng.
    *   Khi kết thúc bài test, SRM sẽ dọn dẹp toàn bộ môi trường test này. Điều này cho phép bạn tự tin vào kế hoạch DR của mình.

### 4. Kích Hoạt Phục Hồi (Failover):
*   Khi thảm họa xảy ra tại Site A, bạn chạy Recovery Plan tại Site B.
*   SRM sẽ thực hiện các bước sau (tự động và theo trật tự):
    *   Ngừng kết nối nhân bản.
    *   Khôi phục (mount) các bản sao dữ liệu mới nhất tại Site B.
    *   Đăng ký và khởi động các máy ảo theo thứ tự đã định nghĩa.
    *   Áp dụng cấu hình Re-IP để máy ảo có thể giao tiếp trong mạng của Site B.
*   Sau vài chục phút, toàn bộ cụm ứng dụng của bạn đã chạy tại Site B.

### 5. Kích Hoạt Quay Về (Failback):
*   Khi Site A đã sẵn sàng hoạt động trở lại, bạn có thể thực hiện Failback.
*   Về cơ bản, quy trình này ngược lại với Failover. SRM sẽ thiết lập kết nối nhân bản từ Site B về Site A, và thực hiện một kế hoạch phục hồi ngược lại.

## Ưu & Nhược Điểm Chi Tiết Của SRM

| Ưu Điểm | Nhược Điểm & Thách Thức |
| :--- | :--- |
| **Tự động hóa hoàn toàn:** Loại bỏ lỗi thủ công, giảm RTO từ hàng giờ xuống còn vài chục phút. | **Chi phí:** License SRM (tính theo số lượng VM được bảo vệ), chi phí cho hạ tầng site DR, và chi phí cho công nghệ nhân bản (storage array replication). |
| **Kiểm tra không gián đoạn:** Cho phép xác nhận kế hoạch DR thường xuyên mà không gây gián đoạn. | **Độ phức tạp:** Triển khai và quản lý đòi hỏi kiến thức chuyên sâu về vSphere, storage, và mạng. |
| **Bảo vệ cấp ứng dụng:** Kiểm soát thứ tự khởi động/tắt máy, đảm bảo các dịch vụ phụ thuộc hoạt động đúng. | **Thiết kế mạng:** Cần lập kế hoạch kỹ lưỡng cho việc Re-IP hoặc sử dụng các công nghệ như NSX để kéo dài segment mạng một cách an toàn. |
| **Linh hoạt và Mạnh mẽ:** Hỗ trợ nhiều kiến trúc phức tạp (1-nhiều, nhiều-1), tích hợp sâu với vSphere và các hệ thống storage hàng đầu. | **Phụ thuộc vào hạ tầng cơ bản:** SRM phụ thuộc vào tính sẵn sàng của vCenter, kết nối mạng site-to-site, và hệ thống nhân bản. |

## Kết Luận

**VMware Site Recovery Manager (SRM)** chính là câu trả lời chính thức, mạnh mẽ và được hỗ trợ tốt nhất của VMware cho bài toán "Tôi muốn có một kế hoạch DR tự động, đáng tin cậy giữa hai datacenter". Nó biến một quy trình phức tạp, dễ xảy ra lỗi thành một quy trình có thể lập kế hoạch, kiểm tra và thực thi một cách nhàn nhã.