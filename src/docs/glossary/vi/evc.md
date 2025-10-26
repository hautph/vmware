---
term: [VI] vSphere Enhanced vMotion Compatibility (EVC)
category: Compute_Resource_Management
language: vi
---

vSphere Enhanced vMotion Compatibility (EVC) là tính năng của VMware vSphere đảm bảo tính tương thích CPU giữa các host khác nhau trong một cụm (cluster), cho phép thực hiện vMotion thành công ngay cả khi các host sử dụng CPU thế hệ khác nhau. EVC giúp duy trì tính di động của máy ảo trong môi trường đa thế hệ phần cứng.

## Tổng quan

EVC có các đặc điểm chính sau:
- Đảm bảo tính tương thích CPU cho vMotion
- Hỗ trợ các host với CPU thế hệ khác nhau trong cùng cluster
- Duy trì khả năng di chuyển VM linh hoạt
- Giúp nâng cấp phần cứng dễ dàng hơn

## Kiến trúc

### Cơ chế hoạt động
EVC hoạt động bằng cách:
- Che giấu các tính năng CPU mới khỏi máy ảo
- Đảm bảo tất cả host trong cluster hiển thị cùng tập tính năng CPU
- Sử dụng Intel FlexMigration hoặc AMD-V Extended Migration
- Áp dụng mask CPU để đồng nhất tính năng

### Các cấp độ EVC
- **Intel**: Các cấp độ từ Merom đến thế hệ mới nhất
- **AMD**: Các cấp độ từ Rev_F đến thế hệ mới nhất
- **Mixed**: Không hỗ trợ môi trường hỗn hợp Intel và AMD

## Các tính năng chính

### Tương thích CPU
- Che giấu các tính năng CPU nâng cao
- Đảm bảo VM không nhận thấy sự khác biệt phần cứng
- Hỗ trợ vMotion giữa các thế hệ CPU khác nhau
- Duy trì hiệu suất gần như bản địa

### Quản lý nâng cấp
- Cho phép nâng cấp phần cứng dần dần
- Không yêu cầu downtime cho VM
- Hỗ trợ migration từ thế hệ cũ sang mới
- Giảm rủi ro trong quá trình nâng cấp

### Linh hoạt trong triển khai
- Hỗ trợ các mô hình triển khai khác nhau
- Tương thích với DRS và HA
- Hỗ trợ các loại workload khác nhau
- Dễ dàng quản lý trong môi trường lớn

## EVC 8 Cải tiến

### Hỗ trợ CPU mới
- Hỗ trợ các thế hệ CPU mới nhất từ Intel và AMD
- Cải thiện hiệu suất khi sử dụng EVC
- Tối ưu hóa cho các workload hiện đại

### Quản lý dễ dàng
- Giao diện người dùng trực quan hơn
- Cảnh báo nâng cao về tính tương thích
- Đề xuất cấp độ EVC tối ưu

### Hiệu suất
- Giảm overhead khi sử dụng EVC
- Cải thiện độ trễ cho các tác vụ
- Tối ưu hóa cho các ứng dụng nhạy cảm với hiệu suất

## Các cấp độ EVC phổ biến

### Intel
- **Cascade Lake**: Hỗ trợ thế hệ Xeon 2nd Gen
- **Skylake**: Hỗ trợ thế hệ Xeon 1st Gen
- **Broadwell**: Hỗ trợ thế hệ Xeon E5-2600 v4/v3
- **Haswell**: Hỗ trợ thế hệ Xeon E5-2600 v3/v2

### AMD
- **Milan**: Hỗ trợ EPYC 3rd Gen
- **Rome**: Hỗ trợ EPYC 2nd Gen
- **Naples**: Hỗ trợ EPYC 1st Gen

## Thực hành tốt nhất

1. **Lập kế hoạch**: Chọn cấp độ EVC phù hợp với mục tiêu nâng cấp
2. **Kiểm thử**: Luôn kiểm thử trong môi trường thử nghiệm
3. **Giám sát**: Theo dõi hiệu suất khi sử dụng EVC
4. **Tài liệu**: Ghi chép về cấu hình EVC hiện tại
5. **Nâng cấp**: Sử dụng EVC để nâng cấp phần cứng dễ dàng

## Lệnh quản lý

```powershell
# Kiểm tra cấp độ EVC hiện tại của cluster
Get-Cluster "Cluster01" | Select Name, EVCMode

# Bật EVC cho cluster
Set-Cluster -Cluster "Cluster01" -EVCMode "Intel-IvyBridge"

# Xem các host trong cluster và cấp độ EVC
Get-Cluster "Cluster01" | Get-VMHost | Select Name, ProcessorType, EVCSupported

# Vô hiệu hóa EVC
Set-Cluster -Cluster "Cluster01" -EVCMode $null
```

## Các công nghệ liên quan

- [vMotion](/glossary/term/vmotion.md)
- [DRS](/glossary/term/drs.md)
- [vSphere](/glossary/term/vsphere.md)
- [CPU Compatibility](/glossary/term/cpu-compatibility)