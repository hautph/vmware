---
term: NSX Data Center
category: Networking
language: vi
---

NSX Data Center là nền tảng Network Virtualization và Security toàn diện của VMware dành cho các trung tâm dữ liệu doanh nghiệp. NSX Data Center cung cấp khả năng ảo hóa mạng, micro-segmentation, và bảo mật zero-trust cho các môi trường ảo hóa và cloud, giúp các tổ chức hiện đại hóa hạ tầng mạng của họ.

## Tổng quan

NSX Data Center có các đặc điểm chính sau:
- Nền tảng ảo hóa mạng và bảo mật toàn diện
- Hỗ trợ các môi trường ảo hóa phức tạp
- Cung cấp micro-segmentation và zero-trust security
- Tích hợp chặt chẽ với VMware vSphere và các sản phẩm khác

## Kiến trúc

### Các thành phần chính
NSX Data Center bao gồm các thành phần sau:
- **NSX Manager**: Máy chủ quản lý tập trung
- **NSX Controller**: Bộ điều khiển phân tán
- **NSX Edge**: Thiết bị edge services
- **NSX Host Preparation**: Chuẩn bị host ESXi
- **Logical Switching**: Chuyển mạch logic
- **Logical Routing**: Định tuyến logic

### Kiến trúc phân lớp
- **Management Plane**: Lớp quản lý (NSX Manager)
- **Control Plane**: Lớp điều khiển (NSX Controller)
- **Data Plane**: Lớp dữ liệu (NSX Kernel Modules)

## Các tính năng chính

### Network Virtualization
- **Logical Switches**: Switch ảo với VXLAN
- **Distributed Logical Router**: Router logic phân tán
- **Edge Services Gateway**: Gateway dịch vụ edge
- **Multi-Tenancy**: Hỗ trợ đa tenant với isolation

### Security
- **Distributed Firewall**: Firewall phân tán ở kernel level
- **Micro-Segmentation**: Phân đoạn mạng chi tiết theo workload
- **Security Groups**: Nhóm bảo mật dựa trên tag và criteria
- **Service Composer**: Soạn thảo và kết hợp dịch vụ bảo mật

### Tự động hóa và Orchestration
- **API-Driven Architecture**: Kiến trúc dựa trên API
- **Integration with vCenter**: Tích hợp sâu với vSphere
- **vRealize Orchestration**: Orchestration với vRealize
- **Self-Service Provisioning**: Provisioning tự phục vụ

## NSX Data Center 4.x Cải tiến

### Hiệu suất nâng cao
- **Enhanced Data Path**: Cải thiện đường dẫn dữ liệu
- **Improved Scale**: Khả năng mở rộng được cải thiện
- **Optimized Resource Usage**: Tối ưu sử dụng tài nguyên
- **Reduced Latency**: Giảm độ trễ mạng

### Tích hợp nâng cao
- **Tanzu Integration**: Tích hợp với VMware Tanzu
- **Kubernetes Support**: Hỗ trợ Kubernetes workloads
- **Multi-Cloud Connectivity**: Kết nối đa cloud
- **VMware Cloud on AWS**: Tích hợp với VMware Cloud

### Bảo mật
- **Advanced Threat Prevention**: Phòng chống mối đe dọa nâng cao
- **Network Detection and Response**: Phát hiện và phản ứng mạng
- **Zero-Trust Architecture**: Kiến trúc zero-trust
- **Compliance Automation**: Tự động hóa tuân thủ

## Các dịch vụ Edge

### Edge Services Gateway
- **Firewall Services**: Dịch vụ firewall nâng cao
- **Load Balancing**: Cân bằng tải L4-L7
- **VPN Services**: Dịch vụ VPN (IPsec, SSL)
- **NAT Services**: Dịch vụ NAT

### Advanced Load Balancer
- **Application Load Balancing**: Cân bằng tải ứng dụng
- **SSL Termination**: Kết thúc SSL
- **Content Switching**: Chuyển đổi nội dung
- **Health Monitoring**: Giám sát sức khỏe ứng dụng

## Triển khai

### Các mô hình triển khai
- **Single Site**: Triển khai đơn lẻ trong data center
- **Cross-vCenter**: Triển khai qua nhiều vCenter instances
- **Federated**: Triển khai liên kết giữa các site
- **Hybrid Cloud**: Kết hợp on-premises và cloud

### Yêu cầu hệ thống
- **vSphere Version**: Yêu cầu phiên bản vSphere hỗ trợ
- **Hardware Requirements**: Yêu cầu phần cứng cho NSX components
- **Network Requirements**: Yêu cầu mạng cho overlay và underlay
- **Storage Requirements**: Yêu cầu lưu trữ cho NSX components

## Thực hành tốt nhất

1. **Lập kế hoạch kiến trúc**: Thiết kế mạng logic phù hợp với yêu cầu kinh doanh
2. **Phân đoạn bảo mật**: Áp dụng micro-segmentation để giảm bề mặt tấn công
3. **Giám sát hiệu suất**: Theo dõi hiệu suất mạng và bảo mật thường xuyên
4. **Tài liệu hóa**: Ghi chép chi tiết về thiết kế và cấu hình
5. **Kiểm thử thường xuyên**: Kiểm tra các kịch bản failover và disaster recovery

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

# Xem thông tin logical routers
get logical-routers
```

## Các công nghệ liên quan

- [NSX-T Data Center](/glossary/term/nsx-t.md)
- [vSphere Networking](/glossary/term/vsphere-networking)
- [Network Virtualization](/glossary/term/network-virtualization)
- [Zero-Trust Security](/glossary/term/zero-trust-security)