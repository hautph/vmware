---
term: Cluster Classes
category: Cloud_Native
language: vi
---

Cluster Classes là một cách khai báo để xác định và quản lý các cấu hình cụm Kubernetes trong các môi trường VMware Tanzu. Chúng cung cấp một cách tiếp cận tiêu chuẩn hóa để cấp phép cụm bằng cách xác định các mẫu có thể tái sử dụng chỉ định cấu hình mong muốn, cài đặt nhà cung cấp cơ sở hạ tầng và cấu trúc cụm. Cluster Classes cho phép cấp phép cụm nhất quán và quản lý trên các môi trường khác nhau trong khi cho phép tùy chỉnh thông qua các tham số có thể cấu hình.

## Tổng quan

Cluster Classes cung cấp:
- Quản lý cấu hình cụm khai báo
- Mẫu cụm có thể tái sử dụng
- Cấp phép cụm tiêu chuẩn hóa
- Định nghĩa cụm không phụ thuộc môi trường
- Tùy chọn tùy chỉnh tham số

## Các khái niệm chính

### Cấp phép dựa trên mẫu
- **Cluster Templates**: Cấu hình cụm được xác định trước
- **Variable Substitution**: Giá trị cấu hình tham số
- **Infrastructure Agnostic**: Hoạt động trên các nhà cung cấp cơ sở hạ tầng khác nhau
- **Version Control**: Quản lý vòng đời mẫu

### Cách tiếp cận khai báo
- **Desired State**: Xác định cụm nên trông như thế nào
- **Automatic Reconciliation**: Hệ thống đảm bảo cụm khớp với định nghĩa
- **Drift Detection**: Tự động phát hiện sự lệch cấu hình
- **Self-Healing**: Tự động sửa chữa các vấn đề cấu hình

## Kiến trúc

### Các thành phần
- **ClusterClass**: Định nghĩa mẫu
- **Cluster**: Phiên bản được tạo từ một ClusterClass
- **Variables**: Tham số có thể cấu hình
- **Patches**: Tùy chỉnh được áp dụng cho mẫu cơ sở

### Cấu trúc
- **Infrastructure Reference**: Chỉ định nhà cung cấp cơ sở hạ tầng
- **Control Plane Configuration**: Cài đặt control plane
- **Worker Node Configuration**: Cài đặt nút worker
- **Networking Configuration**: Cài đặt và chính sách mạng

## Triển khai VMware Tanzu

### Tanzu Kubernetes Grid
- **Cluster API Integration**: Xây dựng trên các khái niệm Cluster API
- **Hỗ trợ đa đám mây**: Trải nghiệm nhất quán trên các môi trường
- **Quản lý vòng đời**: Cấp phép và nâng cấp tự động
- **Định nghĩa tài nguyên tùy chỉnh**: Cấu hình cụm có thể mở rộng

### vSphere với Tanzu
- **Supervisor Cluster Integration**: Hoạt động với Supervisor Clusters
- **Quản lý dựa trên Namespace**: Thực thi hạn ngạch tài nguyên
- **Kiểm soát truy cập dựa trên vai trò**: Kiểm soát truy cập chi tiết
- **Thực thi chính sách**: Tuân thủ chính sách tự động

## Các tính năng chính

### Tiêu chuẩn hóa
- **Cấu hình nhất quán**: Triển khai cụm đồng nhất
- **Thực thi thực hành tốt nhất**: Hướng dẫn cấu hình tích hợp
- **Tuân thủ quản trị**: Quản lý cụm dựa trên chính sách
- **Audit Trail**: Lịch sử cấu hình hoàn chỉnh

### Linh hoạt
- **Tùy chỉnh tham số**: Tham số mẫu có thể cấu hình
- **Logic có điều kiện**: Cấu hình động dựa trên tham số
- **Khả năng ghi đè**: Ghi đè cấu hình từng cụm
- **Điểm mở rộng**: Mở rộng mẫu tùy chỉnh

### Tự động hóa
- **Tự động cấp phép**: Cấp phép cụm tự động
- **Điều phối nâng cấp**: Nâng cấp cụm được hợp lý hóa
- **Hoạt động mở rộng**: Mở rộng tự động dựa trên nhu cầu
- **Sao lưu và khôi phục**: Giải pháp sao lưu tích hợp

## Lợi ích

### Hiệu quả hoạt động
- **Giảm lỗi cấu hình**: Mẫu tiêu chuẩn hóa giảm sai sót
- **Cấp phép nhanh hơn**: Triển khai cụm tự động
- **Quản lý đơn giản**: Quản lý cụm tập trung
- **Cải thiện nhất quán**: Cấu hình cụm đồng nhất

### Bảo mật và tuân thủ
- **Thực thi chính sách**: Kiểm tra tuân thủ tự động
- **Xác thực cấu hình**: Xác thực cấu hình tích hợp
- **Khả năng kiểm tra**: Dấu vết kiểm tra cấu hình hoàn chỉnh
- **Kiểm soát truy cập dựa trên vai trò**: Kiểm soát truy cập chi tiết

### Trải nghiệm nhà phát triển
- **Cấp phép tự phục vụ**: Tạo cụm do nhà phát triển điều khiển
- **Tích hợp nhanh**: Thiết lập môi trường nhanh chóng
- **Trải nghiệm nhất quán**: Đồng nhất trên các môi trường
- **Tích hợp tài liệu**: Tài liệu cấu hình tích hợp

## Các thực hành tốt nhất

1. **Thiết kế mẫu**: Thiết kế mẫu có thể tái sử dụng và linh hoạt
2. **Quản lý phiên bản**: Triển khai quản lý phiên bản mẫu đúng cách
3. **Xác thực tham số**: Xác thực tham số mẫu
4. **Cấu hình bảo mật**: Áp dụng thực hành bảo mật tốt nhất
5. **Thiết lập giám sát**: Cấu hình giám sát và cảnh báo
6. **Chiến lược sao lưu**: Triển khai quy trình sao lưu và khôi phục

## Các lệnh khắc phục sự cố

```bash
# Liệt kê ClusterClasses khả dụng
kubectl get clusterclasses -A

# Xem chi tiết ClusterClass
kubectl get clusterclass <class-name> -o yaml

# Kiểm tra trạng thái cấp phép cụm
kubectl get clusters -A

# Xem cấu hình cụm
kubectl get cluster <cluster-name> -o yaml

# Kiểm tra điều kiện cụm
kubectl describe cluster <cluster-name>
```

## Các công nghệ liên quan

- [Kubernetes](/glossary/term/kubernetes.md)
- [Tanzu Kubernetes Grid](/glossary/term/tanzu.md)
- [Supervisor Cluster](/glossary/term/supervisor-cluster.md)
- [Workload Availability Zones](/glossary/term/workload-availability-zones.md)
- [vSphere với Tanzu](/glossary/term/vsphere-with-tanzu.md)