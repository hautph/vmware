---
term: vSphere with Tanzu
category: Other_Products_Solutions
language: vi
---

vSphere with Tanzu là tính năng tích hợp của VMware vSphere cung cấp nền tảng Kubernetes native trực tiếp trong hạ tầng vSphere. Nó biến vSphere thành một nền tảng ứng dụng hiện đại, cho phép chạy cả máy ảo và container trên cùng một hạ tầng với hiệu suất cao và bảo mật doanh nghiệp.

## Tổng quan

vSphere with Tanzu có các đặc điểm chính sau:
- Kubernetes native tích hợp trong vSphere
- Hỗ trợ chạy cả VM và container trên cùng hạ tầng
- Cung cấp developer-ready infrastructure
- Tích hợp chặt chẽ với hệ sinh thái VMware

## Kiến trúc

### Các thành phần chính
vSphere with Tanzu bao gồm các thành phần sau:
- **Supervisor Cluster**: Cluster quản lý tích hợp trong ESXi
- **Namespace**: Không gian làm việc cho developer
- **Tanzu Kubernetes Cluster**: Cluster Kubernetes được provision
- **VM Service**: Dịch vụ quản lý VM nâng cao
- **Container Storage Interface (CSI)**: Giao diện lưu trữ container
- **Container Network Interface (CNI)**: Giao diện mạng container

### Kiến trúc tích hợp
- **Native Pod**: Pod chạy trực tiếp trên ESXi
- **Supervisor Namespace**: Namespace quản lý tài nguyên
- **Workload Clusters**: Cluster Kubernetes được tạo
- **Control Plane**: Plane điều khiển tích hợp

## Các tính năng chính

### Kubernetes Native
- **Native Pod Support**: Pod chạy trực tiếp trên ESXi
- **Supervisor Services**: Dịch vụ supervisor nâng cao
- **Resource Management**: Quản lý tài nguyên linh hoạt
- **Policy Enforcement**: Thực thi chính sách bảo mật

### Developer Experience
- **Self-Service Provisioning**: Provisioning tự phục vụ
- **Developer Portal**: Cổng thông tin cho developer
- **Application Accelerators**: Template ứng dụng
- **Live Update**: Cập nhật trực tiếp cho development

### Operations và Security
- **Unified Management**: Quản lý thống nhất VM và container
- **Role-Based Access Control**: Kiểm soát truy cập theo vai trò
- **Network Security**: Bảo mật mạng nâng cao
- **Compliance**: Tuân thủ doanh nghiệp

## vSphere with Tanzu 8 Cải tiến

### Hiệu suất nâng cao
- **Improved Pod Performance**: Hiệu suất pod được cải thiện
- **Enhanced Resource Management**: Quản lý tài nguyên nâng cao
- **Optimized Networking**: Mạng được tối ưu hóa
- **Reduced Latency**: Giảm độ trễ

### Tích hợp nâng cao
- **Tanzu Mission Control**: Tích hợp với quản lý đa cluster
- **Tanzu Observability**: Tích hợp quan sát nâng cao
- **Tanzu Service Mesh**: Tích hợp service mesh
- **Multi-Cloud Support**: Hỗ trợ đa cloud

### Developer Experience
- **Enhanced Developer Portal**: Cổng thông tin nâng cao
- **Improved Tooling**: Công cụ phát triển được cải thiện
- **Better Debugging**: Gỡ lỗi tốt hơn
- **Streamlined Workflows**: Quy trình được đơn giản hóa

## Các khái niệm quan trọng

### Supervisor Cluster
- **Integrated Management**: Quản lý tích hợp trong ESXi
- **Control Plane**: Plane điều khiển cho Tanzu
- **Resource Governance**: Quản lý tài nguyên
- **Security Boundary**: Biên giới bảo mật

### Namespace
- **Resource Quotas**: Hạn ngạch tài nguyên
- **Storage Policies**: Chính sách lưu trữ
- **Network Policies**: Chính sách mạng
- **Access Control**: Kiểm soát truy cập

### Tanzu Kubernetes Cluster
- **Provisioned Clusters**: Cluster được provision
- **Lifecycle Management**: Quản lý vòng đời
- **Customization**: Tùy chỉnh cluster
- **Integration**: Tích hợp với vSphere

## Triển khai

### Yêu cầu hệ thống
- **vSphere Version**: Yêu cầu vSphere 7.0 hoặc cao hơn
- **ESXi Hosts**: Host hỗ trợ Tanzu
- **Storage**: Lưu trữ hỗ trợ CSI
- **Networking**: Mạng hỗ trợ CNI

### Các bước cơ bản
1. Bật vSphere with Tanzu trên cluster
2. Cấu hình Supervisor Cluster
3. Tạo Namespace
4. Cấu hình chính sách tài nguyên
5. Provision Tanzu Kubernetes Cluster
6. Triển khai ứng dụng

## Thực hành tốt nhất

1. **Lập kế hoạch tài nguyên**: Xác định nhu cầu tài nguyên cho workload
2. **Security First**: Áp dụng nguyên tắc bảo mật từ đầu
3. **Monitoring**: Thiết lập monitoring và alerting
4. **Backup**: Kế hoạch backup và disaster recovery
5. **Training**: Đào tạo đội ngũ vận hành và phát triển

## Lệnh quản lý

```bash
# Kết nối đến Supervisor Cluster
kubectl vsphere login --server=supervisor-cluster-ip --vsphere-username username

# Xem các namespace
kubectl get namespaces

# Tạo Tanzu Kubernetes Cluster
kubectl apply -f tkg-cluster.yaml

# Xem trạng thái cluster
kubectl get tanzukubernetesclusters

# Quản lý tài nguyên
kubectl describe resourcequota
```

## Các công nghệ liên quan

- [Tanzu Kubernetes Grid](/glossary/term/tanzu-kubernetes-grid)
- [Kubernetes Native](/glossary/term/kubernetes-native)
- [Container Orchestration](/glossary/term/container-orchestration)
- [Developer-Ready Infrastructure](/glossary/term/developer-ready-infrastructure)