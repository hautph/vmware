---
term: OVF/OVA (Open Virtualization Format/Open Virtualization Archive)
category: Virtualization
---

OVF (Định dạng Ảo hóa Mở) và OVA (Kho lưu trữ Ảo hóa Mở) là các tiêu chuẩn mở để đóng gói và phân phối các thiết bị ảo và giải pháp phần mềm. OVF xác định định dạng dựa trên XML để mô tả máy ảo và tài nguyên của chúng, trong khi OVA cung cấp định dạng lưu trữ tệp đơn gói tất cả các thành phần OVF để phân phối và triển khai dễ dàng.

## Tổng Quan

OVF/OVA cung cấp:
- Định dạng tiêu chuẩn cho phân phối thiết bị ảo
- Đóng gói máy ảo độc lập nền tảng
- Tùy chọn siêu dữ liệu và cấu hình có thể mở rộng
- Hỗ trợ cho ứng dụng nhiều tầng và triển khai phức tạp

## Tính Năng Chính

### Tính Năng OVF
- **Mô Tả Dựa Trên XML**: Định dạng có thể đọc được cho cấu hình VM
- **Cấu Trúc Đa Tệp**: Các tệp riêng biệt cho mô tả, hình ảnh đĩa và chứng chỉ
- **Lược Đồ Có Thể Mở Rộng**: Hỗ trợ thuộc tính tùy chỉnh và tiện ích mở rộng
- **Độc Lập Nền Tảng**: Hoạt động trên các nền tảng ảo hóa khác nhau

### Tính Năng OVA
- **Lưu Trữ Tệp Đơn**: Lưu trữ TAR chứa tất cả các thành phần OVF
- **Phân Phối Dễ Dàng**: Chia sẻ và triển khai thiết bị ảo đơn giản
- **Kiểm Tra Tính Toàn Vẹn**: Kiểm tra tổng hợp tích hợp để xác minh tệp
- **Hỗ Trợ Nén**: Nén tùy chọn để giảm kích thước tệp

### Khả Năng Định Dạng
- **Hỗ Trợ Đa VM**: Gói nhiều máy ảo trong một OVF đơn
- **Thông Số Tài Nguyên**: Xác định yêu cầu CPU, bộ nhớ, đĩa và mạng
- **Cấu Hình Mạng**: Chỉ định bộ điều hợp mạng ảo và ánh xạ
- **Thuộc Tính Tùy Chỉnh**: Bao gồm các tham số cấu hình cụ thể của ứng dụng

## Kiến Trúc

### Thành Phần OVF
- **Mô Tả OVF**: Tệp XML mô tả cấu hình và tài nguyên VM
- **Tệp Hình Ảnh Đĩa**: Tệp đĩa ảo ở nhiều định dạng (VMDK, VHD, v.v.)
- **Tệp Manifest**: Tệp tùy chọn chứa tổng kiểm tra để xác minh tính toàn vẹn
- **Tệp Chứng Chỉ**: Chữ ký số tùy chọn để xác minh tính xác thực

### Cấu Trúc Mô Tả OVF
- **Phong Bì**: Phần tử gốc chứa tất cả nội dung OVF
- **Tham Chiếu**: Danh sách các tệp bên ngoài được tham chiếu bởi OVF
- **Phần Đĩa**: Định nghĩa các đĩa ảo và thuộc tính của chúng
- **Phần Mạng**: Định nghĩa các mạng ảo và bộ điều hợp
- **Hệ Thống Ảo**: Mô tả phần cứng ảo và cấu hình

### Tùy Chọn Đóng Gói
- **VM Đơn**: Gói các máy ảo riêng lẻ
- **Ứng Dụng Đa Tầng**: Gói các ứng dụng phức tạp với nhiều VM
- **Mẫu**: Tạo mẫu VM có thể tái sử dụng để triển khai nhanh
- **Thiết Bị**: Gói các giải pháp phần mềm hoàn chỉnh với cài đặt được cấu hình trước

## Ví Dụ Cấu Hình

### Ví Dụ Mô Tả OVF
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Envelope xmlns="http://schemas.dmtf.org/ovf/envelope/1">
  <References>
    <File ovf:href="disk1.vmdk" ovf:id="file1"/>
  </References>
  <DiskSection>
    <Disk ovf:diskId="disk1" ovf:fileRef="file1" ovf:capacity="10737418240"/>
  </DiskSection>
  <VirtualSystem ovf:id="MyVirtualAppliance">
    <Name>MyVirtualAppliance</Name>
    <OperatingSystemSection ovf:id="100">
      <Description>Microsoft Windows Server 2019</Description>
    </OperatingSystemSection>
    <VirtualHardwareSection>
      <System>
        <vssd:ElementName>Họ Phần Cứng Ảo</vssd:ElementName>
        <vssd:InstanceID>0</vssd:InstanceID>
        <vssd:VirtualSystemType>vmx-13</vssd:VirtualSystemType>
      </System>
      <Item>
        <rasd:ElementName>1 CPU</rasd:ElementName>
        <rasd:InstanceID>1</rasd:InstanceID>
        <rasd:ResourceType>3</rasd:ResourceType>
        <rasd:VirtualQuantity>1</rasd:VirtualQuantity>
      </Item>
      <Item>
        <rasd:ElementName>2048 MB bộ nhớ</rasd:ElementName>
        <rasd:InstanceID>2</rasd:InstanceID>
        <rasd:ResourceType>4</rasd:ResourceType>
        <rasd:VirtualQuantity>2048</rasd:VirtualQuantity>
      </Item>
    </VirtualHardwareSection>
  </VirtualSystem>
</Envelope>
```

### Lệnh Tạo OVA
```bash
# Tạo OVA từ các thành phần OVF
tar -cf MyAppliance.ova MyAppliance.ovf MyAppliance.vmdk MyAppliance.mf

# Tạo OVA với nén
tar -czf MyAppliance.ova MyAppliance.ovf MyAppliance.vmdk MyAppliance.mf

# Trích xuất nội dung OVA
tar -xf MyAppliance.ova

# Xác minh tính toàn vẹn OVA
openssl sha1 MyAppliance.ova
```

### Sử Dụng Công Cụ OVF VMware
```bash
# Xuất VM sang OVF
ovftool vi://user:password@vcenter-host/MyDatacenter/vm/MyVM MyVM.ovf

# Nhập OVF vào vCenter
ovftool MyVM.ovf vi://user:password@vcenter-host/MyDatacenter/host/MyHost

# Triển khai OVA vào ESXi
ovftool MyAppliance.ova vi://root:password@esxi-host/

# Xác nhận tệp OVF
ovftool --verify MyVM.ovf

# Tùy chỉnh tham số triển khai
ovftool --prop:ip0=192.168.1.100 --prop:netmask0=255.255.255.0 MyAppliance.ova vi://user:password@vcenter-host/
```

## Yêu Cầu

### Yêu Cầu Hệ Thống
- **Nền Tảng Ảo Hóa**: VMware, Hyper-V, KVM, VirtualBox hoặc hypervisor tương thích OVF khác
- **Dung Lượng Đĩa**: Dung lượng đủ cho tệp OVF/OVA và nội dung được trích xuất
- **Bộ Nhớ**: RAM đầy đủ để triển khai và vận hành VM
- **CPU**: Kiến trúc bộ xử lý tương thích cho VM đích

### Yêu Cầu Phần Mềm
- **Công Cụ OVF**: Công cụ OVF VMware hoặc tiện ích tương thích để thao tác nhập/xuất
- **Phần Mềm Ảo Hóa**: Phần mềm hypervisor hỗ trợ định dạng OVF/OVA
- **Hệ Thống Tập Tin**: Hỗ trợ cho hoạt động tệp lớn (OVA có thể vài GB)
- **Mạng**: Kết nối để tải xuống/tải lên tệp OVF/OVA

### Tương Thích
- **Hỗ Trợ Phiên Bản**: Tương thích OVF 1.0, 1.1, 2.0 trên các nền tảng
- **Định Dạng Đĩa**: Hỗ trợ VMDK, VHD, QCOW2 và các định dạng đĩa ảo khác
- **Hệ Điều Hành**: Windows, Linux và các hệ điều hành khách khác
- **Giao Thức Mạng**: HTTP, HTTPS, FTP để truyền tệp

## Kịch Bản Triển Khai

### Phân Phối Thiết Bị Ảo
- **Nhà Cung Cấp Phần Mềm**: Phân phối các giải pháp phần mềm được cấu hình trước
- **ISV**: Đóng gói ứng dụng với cấu hình VM được tối ưu hóa
- **Nhà Cung Cấp Đám Mây**: Cung cấp hình ảnh VM tiêu chuẩn để triển khai
- **Doanh Nghiệp IT**: Chia sẻ mẫu VM tiêu chuẩn giữa các nhóm

### Di Chuyển và Sao Lưu
- **Di Chuyển Đa Nền Tảng**: Di chuyển VM giữa các nền tảng ảo hóa khác nhau
- **Sao Lưu và Phục Hồi**: Lưu trữ VM ở định dạng di động
- **Phục Hồi Thảm Họa**: Lưu trữ bản sao VM để phục hồi nhanh
- **Di Chuyển Đám Mây**: Chuyển khối lượng công việc đến và từ môi trường đám mây

### Phát Triển và Kiểm Thử
- **Môi Trường Phát Triển**: Chia sẻ VM phát triển nhất quán
- **Phòng Thí Nghiệm Kiểm Thử**: Triển khai môi trường kiểm thử giống hệt nhau nhanh chóng
- **Đào Tạo**: Phân phối môi trường đào tạo được cấu hình trước
- **Trình Diễn**: Đóng gói môi trường trình diễn để triển khai dễ dàng

## Thực Hành Tốt Nhất

### Tạo OVF
- **Tối Ưu Hóa Hình Ảnh Đĩa**: Nén và tối ưu hóa đĩa ảo trước khi đóng gói
- **Bao Gồm Tài Liệu**: Thêm tệp README và hướng dẫn triển khai
- **Kiểm Tra Triển Khai**: Xác minh OVF/OVA hoạt động đúng trên nền tảng đích
- **Kiểm Soát Phiên Bản**: Duy trì lịch sử phiên bản và nhật ký thay đổi

### Lập Kế Hoạch Triển Khai
- **Đánh Giá Tài Nguyên**: Xác minh môi trường đích có tài nguyên đầy đủ
- **Lập Kế Hoạch Mạng**: Lên kế hoạch địa chỉ IP và kết nối mạng
- **Cấu Hình Bảo Mật**: Cấu hình tường lửa và cài đặt bảo mật
- **Tùy Chỉnh**: Sử dụng thuộc tính OVF cho cài đặt cụ thể môi trường

### Xem Xét Bảo Mật
- **Chữ Ký Số**: Ký tệp OVF/OVA để xác minh tính xác thực
- **Kiểm Tra Tính Toàn Vẹn**: Xác minh tổng kiểm tra trước triển khai
- **Truyền An Toàn**: Sử dụng giao thức mã hóa để truyền tệp
- **Quét Lỗ Hổng**: Quét nội dung OVF/OVA để tìm vấn đề bảo mật

## Khắc Phục Sự Cố

### Vấn Đề Phổ Biến
- **Lỗi Nhập**: Phiên bản phần cứng hoặc phần mềm không tương thích
- **Cấu Hình Mạng**: Cài đặt hoặc ánh xạ mạng không đúng
- **Dung Lượng Đĩa**: Không đủ dung lượng để triển khai
- **Tệp Bị Hỏng**: Tệp OVF/OVA bị hỏng
- **Lỗi Quyền**: Quyền không đủ để triển khai

### Lệnh Chẩn Đoán
```bash
# Xác nhận mô tả OVF
xmllint --noout MyAppliance.ovf

# Kiểm tra tính toàn vẹn tệp
sha1sum -c MyAppliance.mf

# Trích xuất OVA để kiểm tra
tar -tvf MyAppliance.ova

# Kiểm tra phiên bản công cụ OVF
ovftool --version

# Bật ghi nhật ký chi tiết
ovftool --logLevel=verbose MyAppliance.ova vi://user:password@vcenter-host/

# Kiểm tra tương thích hypervisor
ovftool --verifyManifest MyAppliance.ova
```

## Tích Hợp vSphere

### Hỗ Trợ vCenter Server
- **Hoạt Động Nhập**: Triển khai OVF/OVA thông qua vSphere Client
- **Hoạt Động Xuất**: Tạo OVF/OVA từ VM hiện có
- **Tùy Chỉnh**: Sử dụng thuộc tính môi trường OVF để cấu hình
- **Thư Viện Nội Dung**: Lưu trữ mẫu OVF/OVA trong thư viện nội dung

### Khả Năng Tự Động Hóa
- **PowerCLI**: Tự động hóa triển khai OVF/OVA với PowerShell
- **REST API**: Triển khai lập trình thông qua API vSphere
- **Tích Hợp CI/CD**: Bao gồm triển khai OVF/OVA trong pipeline DevOps
- **Quản Lý Mẫu**: Quản lý mẫu OVF theo chương trình

## Công Nghệ Liên Quan

- [VMware vCenter Converter](/glossary/term/vmware-vcenter-converter.md)
- [Open Tool Convert](/glossary/term/open-tool-convert.md)
- [vSphere](/glossary/term/vsphere.md)
- [ESXi](/glossary/term/esxi.md)
- [Máy Ảo](/glossary/term/virtual-machine.md)
- [Thư Viện Nội Dung](/glossary/term/content-library.md)