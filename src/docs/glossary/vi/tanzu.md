---
term: Tanzu
category: Other_Products_Solutions
language: vi
---

Tanzu là bộ sản phẩm Kubernetes và container platform của VMware giúp các tổ chức xây dựng, vận hành và bảo mật các ứng dụng hiện đại trên bất kỳ đám mây nào. Tanzu cung cấp nền tảng hoàn chỉnh để chạy và quản lý các workload containerized với hiệu suất cao và bảo mật doanh nghiệp.

## Tổng quan

Tanzu có các đặc điểm chính sau:
- Nền tảng Kubernetes doanh nghiệp
- Hỗ trợ đa cloud và môi trường lai
- Tích hợp chặt chẽ với hệ sinh thái VMware
- Cung cấp DevOps và SRE capabilities

## Kiến trúc

### Các thành phần chính
Tanzu bao gồm các thành phần sau:
- **Tanzu Kubernetes Grid (TKG)**: Kubernetes distribution
- **Tanzu Application Catalog**: Danh mục ứng dụng bảo mật
- **Tanzu Mission Control**: Quản lý đa cluster tập trung
- **Tanzu Application Service**: PaaS cho ứng dụng hiện đại
- **Tanzu Observability**: Quan sát và monitoring
- **Tanzu Service Mesh**: Service mesh cho microservices

### Kiến trúc triển khai
- **Supervisor Cluster**: Cluster quản lý trong vSphere with Tanzu
- **Workload Clusters**: Các cluster chạy ứng dụng
- **Management Cluster**: Cluster quản lý TKG
- **Guest Clusters**: Cluster khách trong TKG

## Các tính năng chính

### Kubernetes Distribution
- **Conformant Kubernetes**: Phù hợp với tiêu chuẩn CNCF
- **Enterprise-Grade Security**: Bảo mật cấp doanh nghiệp
- **Multi-Cloud Support**: Hỗ trợ đa cloud
- **Lifecycle Management**: Quản lý vòng đời cluster

### Application Modernization
- **Container Runtime**: Runtime container bảo mật
- **Image Registry**: Registry image tích hợp
- **Build Service**: Dịch vụ build image tự động
- **Developer Portal**: Cổng thông tin cho developer

### Operations và Security
- **Centralized Management**: Quản lý tập trung đa cluster
- **Policy Enforcement**: Thực thi chính sách bảo mật
- **Compliance Monitoring**: Giám sát tuân thủ
- **Incident Response**: Phản ứng sự cố

## Tanzu 8 Cải tiến

### Tích hợp vSphere
- **vSphere with Tanzu**: Tích hợp sâu với vSphere
- **Native Pod Support**: Hỗ trợ pod native trong ESXi
- **Supervisor Services**: Dịch vụ supervisor nâng cao
- **Improved Performance**: Hiệu suất được cải thiện

### Developer Experience
- **Tanzu Developer Tools**: Công cụ cho developer
- **Application Accelerators**: Template ứng dụng
- **Live Update**: Cập nhật trực tiếp cho development
- **Debugging Support**: Hỗ trợ gỡ lỗi nâng cao

### Multi-Cloud
- **Tanzu Mission Control**: Quản lý đa cloud nâng cao
- **Cloud Templates**: Template cho các cloud khác nhau
- **Cross-Cloud Networking**: Mạng giữa các cloud
- **Unified Policy**: Chính sách thống nhất

## Các sản phẩm Tanzu

### Tanzu Kubernetes Grid (TKG)
- **TKG Multi-Cloud**: Cho môi trường đa cloud
- **TKG Integrated Edition**: Tích hợp với vSphere
- **TKG Small Footprint**: Phiên bản nhỏ gọn

### Tanzu Application Service
- **TAS for VMs**: Phiên bản cho virtual machines
- **TAS for Kubernetes**: Phiên bản cho Kubernetes
- **Buildpacks**: Buildpack cho các ngôn ngữ khác nhau

### Tanzu Mission Control
- **Cluster Management**: Quản lý cluster tập trung
- **Policy Management**: Quản lý chính sách bảo mật
- **Audit and Compliance**: Kiểm toán và tuân thủ
- **Multi-Cloud Support**: Hỗ trợ đa cloud

## Triển khai

### Các mô hình triển khai
- **vSphere with Tanzu**: Tích hợp với vSphere
- **TKG Multi-Cloud**: Trên các cloud khác nhau
- **TKG Integrated**: Tích hợp với vSphere
- **TKG Standalone**: Độc lập

### Các bước cơ bản
1. Cài đặt và cấu hình management cluster
2. Tạo workload clusters
3. Cấu hình networking và storage
4. Triển khai ứng dụng
5. Cấu hình monitoring và security

## Thực hành tốt nhất

1. **Lập kế hoạch**: Xác định yêu cầu và kiến trúc phù hợp
2. **Security First**: Áp dụng nguyên tắc bảo mật từ đầu
3. **Monitoring**: Thiết lập monitoring và alerting
4. **Backup**: Kế hoạch backup và disaster recovery
5. **Training**: Đào tạo đội ngũ vận hành và phát triển

## Lệnh quản lý

```bash
# Cài đặt Tanzu CLI
tanzu plugin install --local cli all

# Xem các cluster
tanzu cluster list --include-management-cluster

# Tạo cluster mới
tanzu cluster create my-cluster --plan dev

# Xem trạng thái cluster
tanzu cluster get my-cluster

# Quản lý packages
tanzu package available list
```

## Các công nghệ liên quan

- [Kubernetes](/glossary/term/kubernetes)
- [Container Orchestration](/glossary/term/container-orchestration)
- [Cloud-Native Applications](/glossary/term/cloud-native-applications)
- [Microservices](/glossary/term/microservices)