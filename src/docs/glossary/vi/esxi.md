---
term: ESXi
category: Core_Architecture
language: vi
---

ESXi là hypervisor loại 1 (bare-metal) của VMware, chạy trực tiếp trên phần cứng máy chủ mà không cần hệ điều hành cơ sở. Đây là thành phần cốt lõi của nền tảng ảo hóa VMware vSphere, chịu trách nhiệm tạo và chạy các máy ảo (VM).

## Tổng quan

ESXi có các đặc điểm chính sau:
- Là hypervisor bare-metal, không yêu cầu hệ điều hành riêng
- Có dấu chân nhỏ gọn (~150MB) để tối ưu hóa hiệu suất
- Cung cấp khả năng ảo hóa gần với hiệu suất phần cứng vật lý
- Hỗ trợ nhiều hệ điều hành khách khác nhau

## Kiến trúc

### Kiến trúc microkernel
ESXi được xây dựng trên kiến trúc microkernel với các thành phần chính:
- **VMkernel**: Nhân hệ điều hành chuyên dụng cho ảo hóa
- **VMM (Virtual Machine Monitor)**: Quản lý và thực thi các máy ảo
- **Các module dịch vụ**: Cung cấp các chức năng mạng, lưu trữ, bảo mật

### Quản lý tài nguyên
ESXi quản lý các tài nguyên vật lý:
- **CPU**: Phân phối và lập lịch cho các vCPU của VM
- **Bộ nhớ**: Quản lý bộ nhớ vật lý và ảo hóa bộ nhớ
- **Lưu trữ**: Cung cấp truy cập đến các thiết bị lưu trữ
- **Mạng**: Xử lý kết nối mạng cho các VM

## Các tính năng chính

### Ảo hóa phần cứng
- Ảo hóa CPU với hiệu suất cao
- Quản lý bộ nhớ nâng cao (TPS, ballooning, compression)
- Hỗ trợ nhiều loại thiết bị lưu trữ (SAN, NAS, local storage)
- Ảo hóa mạng với virtual switches

### Bảo mật
- Secure Boot để ngăn chặn phần mềm độc hại
- VM Encryption để bảo vệ dữ liệu
- Lockdown Mode để hạn chế truy cập không ủy quyền

### Quản lý
- Direct Console User Interface (DCUI) để quản lý cục bộ
- SSH và CIM để quản lý từ xa
- API hỗ trợ tự động hóa và tích hợp

## ESXi 8 Cải tiến

### Hiệu suất nâng cao
- Hỗ trợ CPU và bộ nhớ thế hệ mới
- Tối ưu hóa ngăn xếp lưu trữ
- Cải thiện hiệu suất mạng với SR-IOV

### Quản lý vòng đời
- Tích hợp với vSphere Lifecycle Manager
- Hỗ trợ firmware và driver nâng cao
- Quy trình cập nhật và vá lỗi đơn giản hóa

### Hỗ trợ phần cứng
- Hỗ trợ các thiết bị phần cứng mới nhất
- Cải thiện tương thích với các nền tảng CPU
- Hỗ trợ bộ nhớ và lưu trữ tốc độ cao

## Thực hành tốt nhất

1. **Bảo mật**: Luôn bật Secure Boot và sử dụng Lockdown Mode
2. **Cập nhật**: Duy trì ESXi ở phiên bản mới nhất với các bản vá bảo mật
3. **Giám sát**: Theo dõi hiệu suất và tình trạng hệ thống thường xuyên
4. **Sao lưu**: Sao lưu cấu hình ESXi định kỳ
5. **Phân vùng**: Sử dụng phân vùng riêng cho dữ liệu và hệ điều hành

## Khắc phục sự cố

```bash
# Kiểm tra tình trạng hệ thống
esxcli system settings advanced list

# Xem thông tin phần cứng
esxcli hardware platform get

# Kiểm tra hiệu suất
esxtop

# Quản lý dịch vụ
/etc/init.d/vpxa status
```

## Các công nghệ liên quan

- [vSphere](/glossary/term/vsphere.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [Virtual Machine](/glossary/term/virtual-machine.md)
- [VMkernel](/glossary/term/vmkernel.md)