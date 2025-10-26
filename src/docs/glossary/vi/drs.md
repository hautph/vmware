---
term: vSphere Distributed Resource Scheduler (DRS)
category: Compute_Resource_Management
language: vi
---

vSphere Distributed Resource Scheduler (DRS) là tính năng nâng cao của VMware vSphere tự động cân bằng tải các máy ảo giữa các host trong một cụm (cluster) dựa trên chính sách và mức độ sử dụng tài nguyên. DRS giúp tối ưu hóa hiệu suất và đảm bảo phân bổ tài nguyên hiệu quả trong môi trường ảo hóa.

## Tổng quan

DRS có các đặc điểm chính sau:
- Tự động di chuyển VM giữa các host để cân bằng tải
- Dựa trên các metric tài nguyên như CPU và bộ nhớ
- Hỗ trợ các mức độ can thiệp khác nhau (Manual, Partial, Full)
- Tích hợp với vSphere HA để đảm bảo tính sẵn sàng

## Kiến trúc

### Các thành phần chính
DRS bao gồm các thành phần sau:
- **DRS Service**: Dịch vụ chạy trên vCenter Server
- **Cluster Agent**: Tác nhân trên mỗi ESXi host trong cluster
- **Load Balancer**: Thành phần phân tích và đưa ra quyết định
- **Migration Engine**: Động cơ thực hiện vMotion

### Quy trình hoạt động
1. Thu thập metric tài nguyên từ các host
2. Phân tích mức độ sử dụng và mất cân bằng
3. Tạo các khuyến nghị hoặc thực hiện migration tự động
4. Thực hiện vMotion để di chuyển VM
5. Giám sát kết quả và điều chỉnh

## Các tính năng chính

### Cân bằng tải động
- Theo dõi liên tục mức độ sử dụng tài nguyên
- Tự động xác định mất cân bằng
- Tạo khuyến nghị hoặc thực hiện migration tự động
- Hỗ trợ các metric CPU, bộ nhớ, và mạng

### Chính sách linh hoạt
- Thiết lập mức độ can thiệp (Manual, Partial, Full)
- Định nghĩa ngưỡng kích hoạt
- Tạo affinity và anti-affinity rules
- Hỗ trợ power management với DPM

### Tối ưu hóa hiệu suất
- Giảm contention tài nguyên
- Cải thiện hiệu suất tổng thể của cluster
- Tối ưu hóa phân bổ tài nguyên
- Hỗ trợ workload distribution

## DRS 8 Cải tiến

### Thuật toán thông minh
- Thuật toán mới cải thiện độ chính xác
- Tối ưu hóa thời gian phản hồi
- Hỗ trợ các workload mới và phức tạp hơn

### Tích hợp nâng cao
- Tích hợp chặt chẽ hơn với vSAN
- Hỗ trợ Tanzu và Kubernetes workloads
- Cải thiện khả năng làm việc với các dịch vụ cloud

### Giám sát và báo cáo
- Dashboard trực quan hơn
- Cảnh báo nâng cao
- Báo cáo hiệu quả và đề xuất cải thiện

## Các mức độ DRS

### Manual
- Chỉ tạo khuyến nghị, không tự động thực hiện
- Người quản trị quyết định có thực hiện hay không
- Phù hợp cho môi trường yêu cầu kiểm soát cao

### Partial
- Tự động thực hiện các khuyến nghị quan trọng
- Vẫn tạo khuyến nghị cho các trường hợp ít quan trọng
- Cân bằng giữa tự động và kiểm soát

### Full
- Tự động thực hiện tất cả các khuyến nghị
- Mức độ tự động hóa cao nhất
- Phù hợp cho môi trường linh hoạt

## Thực hành tốt nhất

1. **Cấu hình**: Thiết lập ngưỡng phù hợp với workload
2. **Giám sát**: Theo dõi hiệu quả của DRS thường xuyên
3. **Rules**: Sử dụng affinity rules hợp lý
4. **Bảo trì**: Loại bỏ host khỏi DRS khi bảo trì
5. **Tối ưu hóa**: Điều chỉnh cấu hình dựa trên hiệu suất thực tế

## Lệnh quản lý

```powershell
# Bật DRS cho cluster
Set-Cluster -Cluster "Cluster01" -DrsEnabled $true -DrsAutomationLevel FullyAutomated

# Kiểm tra tình trạng DRS
Get-Cluster "Cluster01" | Select Name, DrsEnabled, DrsAutomationLevel

# Xem các khuyến nghị DRS
Get-DrsRecommendation -Cluster "Cluster01"

# Áp dụng khuyến nghị DRS
Get-DrsRecommendation -Cluster "Cluster01" | Apply-DrsRecommendation
```

## Các công nghệ liên quan

- [vSphere](/glossary/term/vsphere.md)
- [vMotion](/glossary/term/vmotion.md)
- [vSphere HA](/glossary/term/vsphere-high-availability.md)
- [Cluster](/glossary/term/cluster)