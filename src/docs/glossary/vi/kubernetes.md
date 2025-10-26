---
term: Kubernetes
category: Cloud_Native
language: vi
---

Kubernetes là một nền tảng điều phối container mã nguồn mở tự động hóa việc triển khai, mở rộng và quản lý các ứng dụng được container hóa trên các cụm máy chủ. Được phát triển ban đầu bởi Google và hiện đang được duy trì bởi Cloud Native Computing Foundation (CNCF), Kubernetes đã trở thành tiêu chuẩn de facto cho việc điều phối container trong các môi trường cloud-native hiện đại.

## Tổng quan

Kubernetes cung cấp:
- Tự động triển khai và mở rộng container
- Khám phá dịch vụ và cân bằng tải
- Điều phối lưu trữ
- Khả năng tự phục hồi
- Quản lý bí mật và cấu hình
- Thực thi hàng loạt và lập lịch công việc

## Các khái niệm chính

### Kiến trúc cụm
- **Control Plane**: Quản lý trạng thái cụm và điều phối khối lượng công việc
- **Worker Nodes**: Chạy các ứng dụng được container hóa
- **etcd**: Cơ sở dữ liệu phân tán lưu trữ trạng thái cụm
- **API Server**: Giao diện chính cho tất cả các giao tiếp cụm

### Các thành phần cốt lõi
- **Pods**: Đơn vị triển khai nhỏ nhất trong Kubernetes
- **Services**: Cung cấp điểm cuối mạng ổn định cho các ứng dụng
- **Volumes**: Lưu trữ bền vững cho các ứng dụng được container hóa
- **Namespaces**: Phân vùng logic tài nguyên cụm

### Khối lượng công việc
- **Deployments**: Cập nhật khai báo cho các ứng dụng
- **StatefulSets**: Cho các ứng dụng có trạng thái
- **DaemonSets**: Đảm bảo pods chạy trên tất cả các nút
- **Jobs**: Chạy khối lượng công việc hàng loạt đến khi hoàn thành

## Kiến trúc

### Các thành phần Control Plane
- **kube-apiserver**: Phơi bày API Kubernetes
- **etcd**: Cơ sở dữ liệu khóa-giá trị nhất quán và có độ sẵn sàng cao
- **kube-scheduler**: Lập lịch pods lên các nút
- **kube-controller-manager**: Chạy các quy trình điều khiển
- **cloud-controller-manager**: Giao diện với các nhà cung cấp đám mây

### Các thành phần Node
- **kubelet**: Tác nhân đảm bảo các container đang chạy trong một pod
- **kube-proxy**: Proxy mạng cho khám phá dịch vụ
- **Container Runtime**: Phần mềm chịu trách nhiệm chạy các container

### Addons
- **DNS**: Dịch vụ DNS cụm
- **Web UI**: Bảng điều khiển cho quản lý cụm
- **Container Network Interface (CNI)**: Plugin mạng
- **Ingress Controller**: Định tuyến HTTP/HTTPS

## Tích hợp VMware Tanzu

### vSphere với Tanzu
- **Supervisor Clusters**: Control plane Kubernetes gốc vSphere
- **Tanzu Kubernetes Clusters**: Cụm Kubernetes tuân thủ CNCF đầy đủ
- **vSphere Pods**: VM thay thế nhẹ cho container
- **Quản lý Namespace**: Hạn ngạch tài nguyên và kiểm soát truy cập

### Tanzu Kubernetes Grid
- **Kubernetes đa đám mây**: Trải nghiệm nhất quán trên các môi trường
- **Quản lý vòng đời**: Tự động cấp phép và nâng cấp
- **Quản lý gói**: Tích hợp biểu đồ Helm và gói Carvel
- **Khả năng quan sát**: Giám sát và ghi log tích hợp

## Các tính năng chính

### Quản lý khai báo
- Cấu hình trạng thái mong muốn
- Tự động điều hòa
- Khả năng quay lại
- Tích hợp kiểm soát phiên bản

### Khả năng mở rộng
- Tự động mở rộng pod ngang
- Tự động mở rộng pod dọc
- Tự động mở rộng cụm
- Hạn ngạch tài nguyên và giới hạn

### Bảo mật
- Kiểm soát truy cập dựa trên vai trò (RBAC)
- Chính sách bảo mật Pod
- Chính sách mạng
- Quản lý bí mật

### Mạng
- Khám phá dịch vụ
- Cân bằng tải
- Bộ điều khiển Ingress
- Chính sách mạng

## Các thực hành tốt nhất

1. **Quản lý tài nguyên**: Cấu hình yêu cầu và giới hạn tài nguyên đúng cách
2. **Bảo mật**: Triển khai RBAC và chính sách mạng
3. **Giám sát**: Thiết lập giám sát và ghi log toàn diện
4. **Sao lưu**: Sao lưu định kỳ etcd và khối lượng lưu trữ bền vững
5. **Cập nhật**: Lập kế hoạch và kiểm tra nâng cấp phiên bản Kubernetes

## Các lệnh khắc phục sự cố

```bash
# Kiểm tra trạng thái cụm
kubectl cluster-info

# Xem các nút
kubectl get nodes

# Kiểm tra trạng thái pod
kubectl get pods -A

# Xem log
kubectl logs <pod-name> -n <namespace>

# Mô tả tài nguyên
kubectl describe pod <pod-name> -n <namespace>

# Kiểm tra sự kiện
kubectl get events -A
```

## Các công nghệ liên quan

- [Tanzu Kubernetes Grid](/glossary/term/tanzu.md)
- [vSphere với Tanzu](/glossary/term/vsphere-with-tanzu.md)
- [Supervisor Cluster](/glossary/term/supervisor-cluster.md)
- [Workload Availability Zones](/glossary/term/workload-availability-zones.md)
- [Cluster Classes](/glossary/term/cluster-classes.md)