---
term: NSX
category: Networking
language: vi
---

NSX là nền tảng Network Virtualization và Security của VMware cung cấp khả năng ảo hóa mạng và bảo mật toàn diện cho các môi trường data center và cloud. NSX cho phép tạo và quản lý mạng ảo độc lập với hạ tầng vật lý, cung cấp tính linh hoạt, bảo mật và tự động hóa nâng cao.

## Tổng quan

NSX có các đặc điểm chính sau:
- Nền tảng ảo hóa mạng và bảo mật toàn diện
- Hỗ trợ đa hypervisor và môi trường cloud
- Cung cấp micro-segmentation và zero-trust security
- Tích hợp chặt chẽ với hệ sinh thái VMware

## Kiến trúc

### Các thành phần chính
NSX bao gồm các thành phần sau:
- **NSX Manager**: Máy chủ quản lý tập trung
- **NSX Controller**: Bộ điều khiển phân tán
- **NSX Edge**: Thiết bị edge services
- **NSX Host Preparation**: Chuẩn bị host ESXi
- **Logical Switching**: Chuyển mạch logic
- **Logical Routing**: Định tuyến logic

### Các lớp kiến trúc
- **Management Plane**: Lớp quản lý (NSX Manager)
- **Control Plane**: Lớp điều khiển (NSX Controller)
- **Data Plane**: Lớp dữ liệu (NSX Kernel Modules)

## Các tính năng chính

### Network Virtualization
- **Logical Switches**: Switch ảo với VXLAN
- **Logical Routers**: Router ảo phân tán
- **Edge Services**: Dịch vụ edge (firewall, load balancer, VPN)
- **Multi-Tenancy**: Hỗ trợ đa tenant

### Security
- **Micro-Segmentation**: Phân đoạn mạng chi tiết
- **Distributed Firewall**: Firewall phân tán
- **Security Policies**: Chính sách bảo mật
- **Service Insertion**: Chèn dịch vụ bảo mật

### Tự động hóa
- **API-Driven**: Điều khiển thông qua API
- **Integration with vCenter**: Tích hợp với vSphere
- **Orchestration**: Orchestration với vRealize
- **Self-Service**: Tự phục vụ cho người dùng

## NSX 4.x Cải tiến

### Kiến trúc nâng cao
- **Federation**: Liên kết nhiều site
- **Enhanced Federation**: Liên kết nâng cao
- **Improved Performance**: Hiệu suất được cải thiện
- **Scalability**: Khả năng mở rộng tốt hơn

### Tích hợp
- Tích hợp tốt hơn với Tanzu và Kubernetes
- Hỗ trợ các workload cloud-native
- Cải thiện khả năng làm việc với vSphere
- Hỗ trợ VMware Cloud on AWS

### Bảo mật
- **Advanced Threat Prevention**: Phòng chống mối đe dọa nâng cao
- **Network Detection and Response**: Phát hiện và phản ứng mạng
- **Zero-Trust Security**: Bảo mật zero-trust
- **Compliance Automation**: Tự động hóa tuân thủ

## Các phiên bản NSX

### NSX Data Center
- Phiên bản cho môi trường on-premises
- Hỗ trợ vSphere và các hypervisor khác
- Tính năng enterprise đầy đủ
- Quản lý tập trung

### NSX-T Data Center
- Phiên bản mới với kiến trúc hiện đại
- Hỗ trợ đa hypervisor và cloud
- API-driven architecture
- Cải thiện hiệu suất và khả năng mở rộng

### NSX Advanced Load Balancer
- Load balancer nâng cao
- Hỗ trợ application delivery
- Có thể sử dụng độc lập hoặc tích hợp
- Application-centric approach

## Triển khai

### Các mô hình triển khai
- **Single Site**: Triển khai đơn lẻ
- **Cross-vCenter**: Triển khai qua nhiều vCenter
- **Federated**: Triển khai liên kết
- **Hybrid**: Kết hợp on-premises và cloud

### Các bước cơ bản
1. Cài đặt NSX Manager
2. Chuẩn bị host ESXi
3. Cấu hình transport zone
4. Tạo logical switches
5. Cấu hình logical routers
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
```

## Các công nghệ liên quan

- [Network Virtualization](/glossary/term/network-virtualization)
- [Software-Defined Networking](/glossary/term/software-defined-networking)
- [Micro-Segmentation](/glossary/term/micro-segmentation)
- [Zero-Trust Security](/glossary/term/zero-trust-security)