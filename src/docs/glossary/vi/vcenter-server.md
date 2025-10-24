---
term: [VI] vCenter Server
category: Core_Architecture
language: vi
---

vCenter Server là nền tảng quản lý tập trung cho các môi trường ảo hóa VMware vSphere. Nó cung cấp giao diện duy nhất để quản lý nhiều host ESXi và các máy ảo chạy trên chúng, cho phép quản trị viên thực hiện các tác vụ quản lý quy mô lớn một cách hiệu quả.

## Tổng quan

vCenter Server có các đặc điểm chính sau:
- Quản lý tập trung cho các cụm ESXi và VM
- Cung cấp giao diện web để quản trị
- Hỗ trợ tự động hóa và lập lịch
- Tích hợp với các sản phẩm VMware khác

## Kiến trúc

### Các thành phần chính
vCenter Server bao gồm các thành phần sau:
- **vCenter Server Appliance (VCSA)**: Phiên bản được đóng gói sẵn để triển khai
- **Platform Services Controller (PSC)**: Quản lý dịch vụ nhận dạng và chứng chỉ (trong các phiên bản cũ)
- **vSphere Client**: Giao diện người dùng dựa trên web
- **vSphere Web Client SDK**: Bộ công cụ phát triển cho tích hợp

### Kiến trúc triển khai
- **Embedded PSC**: PSC được tích hợp trong cùng thiết bị với vCenter Server
- **External PSC**: PSC riêng biệt để quản lý nhiều vCenter Server

## Các tính năng chính

### Quản lý tài nguyên
- Tạo và quản lý cụm (clusters)
- Phân bổ và quản lý tài nguyên (CPU, bộ nhớ, lưu trữ)
- Chính sách quản lý tài nguyên dựa trên SLA

### Tự động hóa
- vSphere Distributed Resource Scheduler (DRS)
- vSphere High Availability (HA)
- vSphere Fault Tolerance (FT)
- vSphere Auto Deploy

### Bảo mật
- Quản lý chứng chỉ và xác thực tập trung
- Role-Based Access Control (RBAC)
- Audit logging cho tuân thủ

### Giám sát và báo cáo
- Hiệu suất thời gian thực
- Cảnh báo và thông báo
- Báo cáo tùy chỉnh
- Tích hợp với vRealize Operations

## vCenter Server 8 Cải tiến

### Kiến trúc nâng cao
- Tối ưu hóa hiệu suất và khả năng mở rộng
- Cải thiện khả năng phục hồi
- Hỗ trợ các tiêu chuẩn bảo mật mới nhất

### Quản lý vòng đời
- Tích hợp với vSphere Lifecycle Manager
- Quy trình nâng cấp đơn giản hóa
- Hỗ trợ rollback khi cần thiết

### Trải nghiệm người dùng
- Giao diện người dùng hiện đại hóa
- Tối ưu hóa hiệu suất giao diện
- Cải thiện khả năng truy cập

## Các phiên bản và giấy phép

### Phiên bản Standard
- Quản lý cơ bản cho các môi trường nhỏ
- Hỗ trợ vMotion và HA cơ bản
- Giới hạn số lượng host được quản lý

### Phiên bản Enterprise Plus
- Tất cả các tính năng nâng cao
- Hỗ trợ DRS, FT, và Auto Deploy
- Không giới hạn số lượng host

## Thực hành tốt nhất

1. **Triển khai**: Sử dụng VCSA cho các triển khai mới
2. **Sao lưu**: Thực hiện sao lưu vCenter Server định kỳ
3. **Giám sát**: Theo dõi hiệu suất và tình trạng hệ thống
4. **Bảo mật**: Áp dụng nguyên tắc least privilege cho quyền truy cập
5. **Cập nhật**: Duy trì phiên bản mới nhất với các bản vá bảo mật

## Lệnh quản lý

```bash
# Kiểm tra tình trạng dịch vụ
service-control --status-all

# Quản lý dịch vụ
service-control --start vmware-vpxd

# Sao lưu cấu hình
vdcfg-backup -b /tmp/backup.zip

# Khôi phục cấu hình
vdcfg-backup -r /tmp/backup.zip
```

## Các công nghệ liên quan

- [vSphere](/glossary/term/vsphere)
- [ESXi](/glossary/term/esxi)
- [vSphere Client](/glossary/term/vsphere-client)
- [DRS](/glossary/term/drs)
- [HA](/glossary/term/vsphere-high-availability)