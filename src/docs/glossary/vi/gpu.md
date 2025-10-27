---
term: GPU (Graphics Processing Unit)
category: Hardware
---

GPU (Bộ xử lý đồ họa) là mạch điện tử chuyên dụng được thiết kế để thao tác và thay đổi bộ nhớ nhanh chóng nhằm tăng tốc việc tạo hình ảnh trong bộ đệm khung hình dự định xuất ra thiết bị hiển thị. Trong môi trường ảo hóa hiện đại, GPU có thể được chia sẻ giữa nhiều máy ảo thông qua các công nghệ ảo hóa GPU, cho phép các khối lượng công việc đòi hỏi đồ họa như kết xuất 3D, học máy và tính toán khoa học.

## Tổng Quan

GPU cung cấp:
- Khả năng xử lý song song cho khối lượng công việc đồ họa và tính toán
- Xử lý thông lượng cao cho các ứng dụng dữ liệu lớn
- Tăng tốc phần cứng cho các thuật toán cụ thể
- Hỗ trợ GPU ảo cho nhiều máy ảo

## Tính Năng Chính

### Xử Lý Đồ Họa
- **Raster hóa**: Chuyển đổi mô hình 3D thành hình ảnh 2D
- **Shading**: Áp dụng hiệu ứng ánh sáng và kết cấu
- **Kết xuất**: Tạo hình ảnh cuối cùng để hiển thị
- **Chống răng cưa**: Làm mịn các cạnh răng cưa trong hình ảnh

### Khả Năng Tính Toán
- **Xử Lý Song Song**: Hàng ngàn nhân cho hoạt động đồng thời
- **Băng Thông Bộ Nhớ Cao**: Truyền dữ liệu nhanh để xử lý
- **Hiệu Suất Dấu Chấm Động**: Các phép toán toán học độ chính xác cao
- **Lệnh Chuyên Dụng**: Hỗ trợ cho hoạt động đồ họa và tính toán

### Hỗ Trợ Ảo Hóa
- **vGPU**: Công nghệ GPU ảo để chia sẻ tài nguyên GPU
- **DirectPath I/O**: Gán GPU trực tiếp cho VM
- **GPU Passthrough**: Truy cập GPU chuyên dụng cho VM
- **GPU Chia Sẻ**: Truy cập GPU chia thời gian cho nhiều VM

## Kiến Trúc

### Thành Phần Cốt Lõi
- **Bộ Xử Lý Đa Phương Tiện**: Đơn vị xử lý cho thực thi song song
- **Hệ Thống Bộ Nhớ**: Bộ nhớ tốc độ cao để lưu trữ dữ liệu
- **Đơn Vị Hoạt Động Raster**: Phần cứng để xử lý pixel
- **Đơn Vị Kết Cấu**: Bộ xử lý chuyên dụng cho ánh xạ kết cấu

### Kiến Trúc Bộ Nhớ
- **Bộ Nhớ Video (VRAM)**: Bộ nhớ chuyên dụng cho hoạt động GPU
- **Bộ Điều Khiển Bộ Nhớ**: Quản lý các mẫu truy cập bộ nhớ
- **Phân Cấp Cache**: Cache L1 và L2 để tối ưu hiệu suất
- **Tối Ưu Băng Thông**: Các kỹ thuật để tối đa hóa thông lượng bộ nhớ

### Kiến Trúc Tính Toán
- **Nhân CUDA**: Đơn vị xử lý trong GPU NVIDIA
- **Bộ Xử Lý Luồng**: Đơn vị xử lý trong GPU AMD
- **Nhân Tensor**: Đơn vị chuyên dụng cho hoạt động AI/ML
- **Nhân RT**: Đơn vị tăng tốc dò tia

## Ảo Hóa trong VMware

### Công Nghệ Ảo Hóa GPU
- **vSphere với Tanzu**: Hỗ trợ GPU tích hợp cho khối lượng công việc Kubernetes
- **vSGA**: Kiến trúc GPU chia sẻ cho nhiều VM
- **vDGA**: Gán GPU chuyên dụng cho VM đơn
- **vGPU**: Công nghệ GPU ảo để phân bổ tài nguyên linh hoạt

### Quản Lý Tài Nguyên
- **Hồ Sơ GPU**: Phân bổ tài nguyên GPU được xác định trước
- **Phân Vùng Bộ Nhớ**: Chia sẻ bộ nhớ GPU giữa các VM
- **Lập Lịch Tính Toán**: Quản lý khối lượng công việc tính toán GPU
- **Giám Sát Hiệu Suất**: Theo dõi sử dụng và hiệu suất GPU

### Tùy Chọn Cấu Hình
- **Gán Tĩnh**: Phân bổ GPU cố định cho VM
- **Phân Bổ Động**: Phân phối tài nguyên GPU linh hoạt
- **Chất Lượng Dịch Vụ**: Đảm bảo hiệu suất cho khối lượng công việc GPU
- **Cân Bằng Tải**: Phân phối khối lượng công việc GPU qua các tài nguyên

## Ví Dụ Cấu Hình

### Cấu Hình GPU ESXi
```bash
# Xem thông tin GPU
esxcli graphics device list

# Kiểm tra cài đặt lập lịch GPU
esxcli system settings advanced list -o /Graphics/

# Xem thông tin bộ nhớ GPU
esxcli graphics device get -d <device-id>

# Kiểm tra quản lý điện năng GPU
esxcli system settings advanced list -o /Power/GpuPolicy
```

### Quản Lý GPU PowerCLI
```powershell
# Xem thông tin GPU cho host ESXi
Get-VMHost | Get-View | Select-Object Name, @{N="GPUs";E={$_.Hardware.Gpu}}

# Cấu hình hồ sơ GPU cho VM
Get-VM "MyVM" | New-AdvancedSetting -Name "pciPassthru.use64bitMMIO" -Value 1 -Confirm:$false

# Bật passthrough GPU cho VM
Get-VM "MyVM" | New-AdvancedSetting -Name "pciPassthru.0.functionId" -Value 0 -Confirm:$false

# Đặt chỗ bộ nhớ GPU cho VM
Get-VM "MyVM" | Get-View | Select-Object Name, @{N="GpuMemory";E={$_.Config.Hardware.Device | Where-Object {$_.DeviceInfo.Label -like "*GPU*"}}}
```

## Yêu Cầu

### Phần Cứng
- **GPU Tương Thích**: GPU NVIDIA hoặc AMD với hỗ trợ ảo hóa
- **Bộ Nhớ Tối Thiểu**: VRAM đủ cho yêu cầu khối lượng công việc
- **Khả Năng Tính Toán**: Công suất tính toán phù hợp cho ứng dụng
- **Yêu Cầu Điện Năng**: Nguồn điện đầy đủ cho hoạt động GPU

### Phần Mềm
- **ESXi 6.5 trở lên**: Host với hỗ trợ ảo hóa GPU
- **vCenter Server**: Quản lý tài nguyên GPU tập trung
- **VMware Tools**: Tối ưu hóa hệ điều hành khách cho sử dụng GPU
- **Giấy Phép Thích Hợp**: Giấy phép vSphere cho tài nguyên GPU

### Tương Thích
- **Mô Hình GPU**: Hỗ trợ cho các mô hình và thế hệ GPU cụ thể
- **Phiên Bản Trình Điều Khiển**: Tương thích với trình điều khiển GPU yêu cầu
- **Tính Năng Ảo Hóa**: Hỗ trợ cho các công nghệ ảo hóa GPU
- **Quản Lý Điện Năng**: Tương thích với các tính năng quản lý điện năng GPU

## Trường Hợp Sử Dụng

### Khối Lượng Công Việc Đồ Họa
- **Kết Xuất 3D**: Tăng tốc kết xuất cho ứng dụng thiết kế và phương tiện
- **Xử Lý Video**: Mã hóa và giải mã video thời gian thực
- **CAD/CAM**: Tăng tốc phần cứng cho ứng dụng kỹ thuật
- **Ảo Hóa Máy Tính Để Bàn**: Đồ họa nâng cao cho máy tính ảo

### Khối Lượng Công Việc Tính Toán
- **Học Máy**: Tăng tốc GPU cho đào tạo và suy luận AI/ML
- **Tính Toán Khoa Học**: Tính toán hiệu suất cao cho nghiên cứu
- **Mô Hình Tài Chính**: Xử lý song song cho tính toán tài chính
- **Phân Tích Dữ Liệu**: Xử lý tăng tốc cho ứng dụng dữ liệu lớn

### Trò Chơi và Giải Trí
- **Phát Triển Trò Chơi**: Kết xuất thời gian thực cho phát triển trò chơi
- **Thực Tế Ảo**: Tăng tốc phần cứng cho ứng dụng VR
- **Phát Trực Tuyến**: Mã hóa GPU cho dịch vụ phát video
- **Tạo Nội Dung**: Chỉnh sửa video và hình ảnh tăng tốc

## Thực Hành Tốt Nhất

1. **Đánh Giá Khối Lượng Công Việc**: Đánh giá yêu cầu GPU cho ứng dụng cụ thể
2. **Lập Kế Hoạch Tài Nguyên**: Định kích thước tài nguyên GPU phù hợp cho khối lượng công việc
3. **Giám Sát**: Thường xuyên giám sát sử dụng và hiệu suất GPU
4. **Quản Lý Trình Điều Khiển**: Cập nhật trình điều khiển GPU để hiệu suất tối ưu
5. **Quản Lý Điện Năng**: Cấu hình chính sách điện năng GPU phù hợp
6. **Phân Bổ Bộ Nhớ**: Đảm bảo bộ nhớ GPU đầy đủ cho ứng dụng
7. **Làm Mát**: Cung cấp làm mát đầy đủ cho khối lượng công việc tập trung GPU

## Cải Tiến vSphere 8

### Cải Thiện Hiệu Suất GPU
- **Hỗ Trợ vGPU Nâng Cao**: Hỗ trợ công nghệ GPU ảo tốt hơn
- **DirectPath I/O Cải Thiện**: Hiệu suất passthrough GPU nâng cao
- **Giảm Chi Phí**: Chi phí ảo hóa thấp hơn cho hoạt động GPU
- **Khả Năng Mở Rộng Tốt Hơn**: Hiệu suất cải thiện với GPU cấp cao

### Cải Thiện Bảo Mật
- **Truy Cập GPU An Toàn**: Bảo mật nâng cao cho hoạt động GPU
- **Mã Hóa Bộ Nhớ**: Hỗ trợ mã hóa bộ nhớ GPU dựa trên phần cứng
- **Chứng Thực**: Chứng thực và xác minh GPU tốt hơn
- **Cách Ly**: Cải thiện cách ly giữa các khối lượng công việc GPU

### Tính Năng Quản Lý
- **Giám Sát Nâng Cao**: Giám sát hiệu suất GPU nâng cao
- **Tối Ưu Hóa Tự Động**: Tối ưu hóa tài nguyên GPU tự động
- **Khắc Phục Sự Cố Cải Thiện**: Công cụ tốt hơn để phân tích hiệu suất GPU
- **Cấu Hình Đơn Giản Hóa**: Quy trình cấu hình GPU đơn giản hóa

## Lệnh Khắc Phục Sự Cố

```bash
# Kiểm tra thông tin GPU
esxcli graphics device list

# Xem sử dụng GPU
esxtop  # Nhấn 'g' để xem thông tin GPU cụ thể

# Kiểm tra cài đặt lập lịch GPU
esxcli system settings advanced list -o /Graphics/

# Xem thông tin bộ nhớ GPU
esxcli graphics device get -d <device-id>

# Kiểm tra quản lý điện năng GPU
esxcli system settings advanced list -o /Power/GpuPolicy

# Xem cấu hình passthrough GPU
vim-cmd vmsvc/device.getdevices <vmid> | grep -i gpu

# Kiểm tra vấn đề hiệu suất GPU
tail -f /var/log/vmkernel.log | grep -i gpu
```

## Công Nghệ Liên Quan

- [ESXi](/glossary/term/esxi.md)
- [vSphere](/glossary/term/vsphere.md)
- [DirectPath I/O](/glossary/term/directpath-io.md)
- [vGPU](/glossary/term/vgpu.md)
- [PCI Passthrough](/glossary/term/pci-passthrough.md)
- [Quản Lý Tài Nguyên](/glossary/term/resource-management.md)