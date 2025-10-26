---
term: [VI] NSX-T
category: Networking
language: vi
---

NSX-T là phiên bản hiện đại của nền tảng Network Virtualization và Security từ VMware, được thiết kế để hỗ trợ các môi trường đa hypervisor, container và cloud-native. NSX-T cung cấp kiến trúc dựa trên API, hỗ trợ micro-segmentation và zero-trust security cho các ứng dụng hiện đại.

## Tổng quan

NSX-T có các đặc điểm chính sau:
- Kiến trúc dựa trên API hiện đại
- Hỗ trợ đa hypervisor (vSphere, KVM, Bare Metal)
- Tích hợp với Kubernetes và container platforms
- Cung cấp network và security services cho cloud-native apps

## Kiến trúc

### Các thành phần chính
NSX-T bao gồm các thành phần sau:
- **NSX Manager**: Máy chủ quản lý tập trung
- **NSX Controller**: Bộ điều khiển phân tán
- **NSX Edge**: Thiết bị edge services
- **Transport Nodes**: Các node tham gia vào overlay network
- **Transport Zones**: Vùng vận chuyển mạng logic

### Kiến trúc microservices
- **Policy Engine**: Engine chính sách
- **Services Manager**: Quản lý dịch vụ
- **Data Collector**: Bộ thu thập dữ liệu
- **Analytics Engine**: Engine phân tích

## Các tính năng chính

### Network Virtualization
- **Overlay Networks**: Mạng overlay với VXLAN
- **Underlay Networks**: Mạng underlay với BGP/EVPN
- **Tier-0 Gateways**: Gateway lớp 0 cho north-south routing
- **Tier-1 Gateways**: Gateway lớp 1 cho east-west routing

### Security
- **Distributed Firewall**: Firewall phân tán
- **Identity-Based Firewall**: Firewall dựa trên danh tính
- **Security Policies**: Chính sách bảo mật nâng cao
- **Micro-Segmentation**: Phân đoạn mạng chi tiết

### Tự động hóa
- **Intent-Based Networking**: Mạng dựa trên ý định
- **Declarative API**: API khai báo
- **GitOps Support**: Hỗ trợ GitOps
- **CI/CD Integration**: Tích hợp với CI/CD pipelines

## NSX-T 4.x Cải tiến

### Kiến trúc nâng cao
- **Federation**: Liên kết nhiều site
- **Enhanced Federation**: Liên kết nâng cao với hiệu suất tốt hơn
- **Improved Scalability**: Khả năng mở rộng được cải thiện
- **Unified Management**: Quản lý thống nhất

### Tích hợp container
- **Tanzu Integration**: Tích hợp chặt chẽ với Tanzu
- **Kubernetes CNI**: CNI plugin cho Kubernetes
- **Service Mesh**: Hỗ trợ service mesh
- **Multi-Cluster Networking**: Mạng cho multi-cluster

### Bảo mật nâng cao
- **Advanced Threat Prevention**: Phòng chống mối đe dọa nâng cao
- **Network Detection and Response**: Phát hiện và phản ứng mạng
- **Zero-Trust Security**: Bảo mật zero-trust
- **Compliance Automation**: Tự động hóa tuân thủ

## Các thành phần chi tiết

### NSX Manager
- **Global Manager**: Quản lý toàn cầu cho federation
- **Local Manager**: Quản lý cục bộ
- **Policy Manager**: Quản lý chính sách
- **Services Manager**: Quản lý dịch vụ

### Transport Nodes
- **Hypervisor Transport Nodes**: Node trên hypervisor
- **Edge Transport Nodes**: Node edge
- **Bare Metal Nodes**: Node bare metal
- **Container Hosts**: Host container

### Gateways
- **Tier-0 Gateway**: Gateway cho north-south traffic
- **Tier-1 Gateway**: Gateway cho east-west traffic
- **Service Router**: Router dịch vụ
- **Distributed Router**: Router phân tán

## Triển khai

### Các mô hình triển khai
- **Single Site**: Triển khai đơn lẻ
- **Cross-vCenter**: Triển khai qua nhiều vCenter
- **Federated**: Triển khai liên kết
- **Hybrid**: Kết hợp on-premises và cloud

### Các bước cơ bản
1. Cài đặt NSX Manager
2. Cấu hình transport zones
3. Thêm transport nodes
4. Tạo tier-0 và tier-1 gateways
5. Cấu hình logical switches
6. Triển khai NSX Edge
7. Cấu hình dịch vụ edge

## Thực hành tốt nhất

1. **Lập kế hoạch**: Xác định yêu cầu và thiết kế mạng
2. **Kiểm thử**: Kiểm tra kỹ trước khi triển khai production
3. **Giám sát**: Theo dõi hiệu suất và bảo mật
4. **Tài liệu**: Ghi chép cấu hình và thiết kế
5. **Bảo trì**: Lên kế hoạch cập nhật và bảo trì

## Lệnh quản lý

```bash
# Truy cập NSX Manager CLI
ssh admin@nsx-manager.domain.local

# Kiểm tra trạng thái cluster
get cluster status

# Xem thông tin transport nodes
get transport-node status

# Kiểm tra logical switches
get logical-switches

# Xem thông tin gateway
get logical-routers
```

## Các công nghệ liên quan

- [NSX Data Center](/glossary/term/nsx-data-center.md)
- [Network Virtualization](/glossary/term/network-virtualization)
- [Kubernetes CNI](/glossary/term/kubernetes-cni)
- [Micro-Segmentation](/glossary/term/micro-segmentation)