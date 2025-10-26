---
term: [VI] vSphere
category: Virtualization_Platform
language: vi
---

VMware vSphere là nền tảng ảo hóa của VMware biến đổi các trung tâm dữ liệu thành các cơ sở hạ tầng máy tính tổng hợp gồm các máy ảo. Nó đóng vai trò nền tảng cho các dịch vụ điện toán đám mây của VMware và cung cấp khả năng ảo hóa cấp doanh nghiệp.

## Tổng quan

vSphere bao gồm một số thành phần chính:
- **ESXi**: Hypervisor ảo hóa phần cứng vật lý
- **vCenter Server**: Nền tảng quản lý tập trung
- **vSphere Client**: Giao diện dựa trên web để quản trị
- **vSAN**: Giải pháp lưu trữ được xác định bằng phần mềm
- **NSX**: Nền tảng ảo hóa mạng

## Các tính năng chính

### Khả năng ảo hóa
- Ảo hóa máy chủ với hiệu suất gần như bản địa
- Gom nhóm và phân bổ tài nguyên
- Di chuyển trực tiếp (vMotion) giữa các host
- Tính sẵn sàng cao và khả năng chịu lỗi

### Các tính năng quản lý
- Quản lý tập trung nhiều host
- Tối ưu hóa tài nguyên tự động với DRS
- Quản lý cơ sở hạ tầng dựa trên chính sách
- Giám sát và báo cáo toàn diện

### Các tính năng bảo mật
- Mã hóa và cách ly VM
- Khởi động an toàn và các module nền tảng đáng tin cậy
- Kiểm soát truy cập dựa trên vai trò
- Mã hóa mạng và lưu trữ

## Kiến trúc

### Lớp Hypervisor
- ESXi chạy trực tiếp trên phần cứng vật lý
- Dấu chân tối thiểu để đạt hiệu quả tối đa
- Trừu tượng hóa phần cứng cho hệ điều hành khách

### Lớp quản lý
- vCenter Server cung cấp kiểm soát tập trung
- Giao diện duy nhất cho tất cả cơ sở hạ tầng ảo
- Truy cập API để tự động hóa và tích hợp

### Lớp dịch vụ
- vSAN cho lưu trữ được xác định bằng phần mềm
- NSX cho ảo hóa mạng
- Bộ công cụ vRealize để quản lý hoạt động

## Các phiên bản vSphere

### Phiên bản Standard
- Khả năng ảo hóa cơ bản
- vMotion để di chuyển trực tiếp
- Các tính năng tính sẵn sàng cao

### Phiên bản Enterprise Plus
- Các tính năng nâng cao như DRS và FT
- Khả năng bảo mật nâng cao
- Các công cụ quản lý toàn diện

## Các cải tiến vSphere 8

### Cải thiện hiệu suất
- Ảo hóa CPU và bộ nhớ nâng cao
- Hiệu suất ngăn xếp lưu trữ được cải thiện
- Xử lý mạng được tối ưu hóa

### Quản lý vòng đời hiện đại
- Quy trình cập nhật và vá lỗi đơn giản hóa
- Triển khai và quản lý dựa trên hình ảnh
- Thủ tục nâng cấp hợp lý hóa

### Cơ sở hạ tầng sẵn sàng cho nhà phát triển
- Tích hợp Kubernetes với Tanzu
- Hỗ trợ container
- Cách tiếp cận ưu tiên API để tự động hóa

## Các trường hợp sử dụng

### Hợp nhất trung tâm dữ liệu
- Giảm dấu chân phần cứng
- Giảm chi phí vận hành
- Quản lý đơn giản hóa

### Khôi phục sau thảm họa
- Khả năng chuyển đổi dự phòng tự động
- Dịch vụ sao chép
- Điều phối khôi phục trang web

### Di chuyển đám mây
- Kết nối đám mây lai
- Cơ sở hạ tầng nhất quán giữa các môi trường
- Tính di động của khối lượng công việc

## Các công nghệ liên quan

- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [vSphere Client](/glossary/term/vsphere-client.md)
- [vSAN](/glossary/term/vsan.md)
- [NSX](/glossary/term/nsx.md)