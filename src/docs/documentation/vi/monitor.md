---
title: Triển khai Monitoring vCenter 8 với Prometheus + Grafana
category: Monitoring
excerpt: Hướng dẫn kỹ thuật triển khai giải pháp monitoring mã nguồn mở cho VMware vCenter 8 sử dụng Prometheus và Grafana với thiết lập tài khoản read-only
language: vi
---

# 📋 Tài liệu Kỹ Thuật: Triển khai Monitoring vCenter 8 với Prometheus + Grafana

**Mục đích**: Hướng dẫn cài đặt và cấu hình giải pháp monitoring mã nguồn mở cho VMware vCenter 8 sử dụng Prometheus và Grafana, bao gồm cả việc tạo tài khoản read-only để đảm bảo an ninh.

**Phạm vi áp dụng**: vCenter Server 8.x, ESXi 8.x

## 🔐 1. Tạo User Read-Only trên vCenter Server

Để tuân thủ nguyên tắc đặc quyền tối thiểu, chúng ta sẽ tạo một user chỉ có quyền đọc dữ liệu từ vCenter API.

### 1.1. Tạo User Mới

1. Đăng nhập vào vCenter Web Client với tài khoản administrator
2. Điều hướng đến **Administration** → **Users and Groups**
3. Chọn domain phù hợp, click **Add User**
4. Điền thông tin user:
   - **Username**: `monitoring-user` (hoặc tên theo quy chuẩn của bạn)
   - **Password**: Đặt mật khẩu mạnh
   - Các thông tin khác tùy chọn

### 1.2. Gán Quyền Read-Only

Có 2 cách để gán quyền:

#### Cách 1: Sử dụng Role Read-Only có sẵn

1. Điều hướng đến **Global Permissions** dưới menu **Access Control**
2. Click icon **Add permission**
3. Chọn domain, nhập username vừa tạo
4. Chọn role **Read-only**
5. Click **OK** để lưu

#### Cách 2: Tạo Custom Role (Khuyến khích cho môi trường Production)

1. Điều hướng đến **Administration** → **Roles** → **Create Role**
2. Đặt tên role: `Monitoring-Role`
3. Gán các quyền tối thiểu cần thiết:
   - **System** → **Read**
   - **vCenter** → **Read**
   - **Host** → **Read**
   - **Virtual Machine** → **Read**
   - **Datastore** → **Read**
   - **Network** → **Read**
   - **Distributed Switch** → **Read**
4. Lưu role lại
5. Gán role này cho user vừa tạo ở mục Global Permissions

> 💡 **Lưu ý quan trọng**: Một số tính năng monitoring có thể yêu cầu quyền đặc biệt hơn. Ví dụ, để truy cập vCenter service statuses, bạn có thể cần thêm privilege `VMware vSphere Lifecycle Manager.Lifecycle Manager: Image Privileges.Read`.

## 🚀 2. Triển khai VMware Exporter

Chúng ta sẽ sử dụng `vmware_exporter` của Grafana để thu thập metrics từ vCenter.

### 2.1. Yêu cầu Hệ thống

- Linux server (Ubuntu 20.04+ hoặc CentOS 8+)
- Docker hoặc Podman đã cài đặt
- Kết nối mạng đến vCenter Server (cổng 443)

### 2.2. Cài đặt bằng Docker

```bash
# Tạo thư mục cấu hình
mkdir -p /opt/vmware-exporter
cd /opt/vmware-exporter

# Tạo file cấu hình
cat > config.yml << EOF
vsphere:
  user: "monitoring-user@vsphere.local"  # Thay bằng domain của bạn
  password: "YourPassword"
  host: "vcenter.domain.com"
  ignore_ssl: true
  specs:
    - object_type: Datacenter
    - object_type: Datastore
      metrics:
        - disk.capacity
        - disk.free
    - object_type: HostSystem
      metrics:
        - cpu.usage.average
        - mem.usage.average
    - object_type: VirtualMachine
      metrics:
        - cpu.usage.average
        - mem.usage.average
        - disk.usage.average
EOF

# Chạy exporter với Docker
docker run -d \
  --name vmware-exporter \
  -p 9272:9272 \
  -v $(pwd)/config.yml:/etc/vmware_exporter/config.yml \
  grafana/vmware_exporter \
  --config /etc/vmware_exporter/config.yml
```

### 2.3. Kiểm tra Hoạt động

```bash
curl http://localhost:9272/metrics
```

Bạn nên thấy các metrics từ vCenter được trả về dưới dạng Prometheus format.

## 📊 3. Cấu hình Prometheus để Thu Thập Metrics

1. Mở file cấu hình Prometheus (`prometheus.yml`)
2. Thêm job scrape cho vmware_exporter:

```yaml
scrape_configs:
  - job_name: 'vmware'
    static_configs:
      - targets: ['localhost:9272']
    scrape_interval: 30s
    scrape_timeout: 10s
```

3. Khởi động lại Prometheus:
```bash
systemctl restart prometheus
```

## 📈 4. Cấu hình Grafana Dashboard

### 4.1. Thêm Prometheus Data Source

1. Đăng nhập Grafana
2. Điều hướng đến **Configuration** → **Data Sources**
3. Chọn **Prometheus**
4. Cấu hình:
   - **Name**: `vCenter-Prometheus`
   - **URL**: `http://prometheus-server:9090`
   - Các tùy chọn khác giữ mặc định
5. Click **Save & Test**

### 4.2. Import Dashboard

Có 2 cách:

#### Cách 1: Import Dashboard có sẵn

1. Điều hướng đến **Create** → **Import**
2. Nhập ID dashboard từ Grafana.com:
   - **VMware vSphere Overview**: ID 8159
   - **VMware vSphere VMs**: ID 8168
3. Chọn Prometheus data source vừa tạo
4. Click **Import**

#### Cách 2: Tạo Dashboard Tùy chỉnh

1. Điều hướng đến **Create** → **Dashboard**
2. Thêm các panel với các query Prometheus hữu ích:

| Panel | Query Prometheus | Mục đích |
|-------|------------------|----------|
| CPU Usage Host | `avg(vsphere_host_cpu_usage_average)` | Mức sử dụng CPU trung bình của ESXi hosts |
| Memory Usage Host | `avg(vsphere_host_mem_usage_average)` | Mức sử dụng memory trung bình |
| VMs per Host | `count(vsphere_vm_power_state) by (vsphere_host)` | Số VM per host |
| Datastore Usage | `vsphere_datastore_disk_used / vsphere_datastore_disk_capacity` | Tỷ lệ sử dụng datastore |

## 🔧 5. Cấu hình Alert (Tùy chọn)

### 5.1. Tạo Rule trong Prometheus

```yaml
groups:
  - name: vmware_alerts
    rules:
      - alert: vCenterDown
        expr: up{job="vmware"} == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "vCenter is down"
          
      - alert: HighCPUUsage
        expr: vsphere_host_cpu_usage_average > 80
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.host_name }}"
```

### 5.2. Cấu hình Alertmanager

Cấu hình Alertmanager để gửi email, Slack, hoặc các kênh thông báo khác khi có alert.

## 📋 6. Checklist Triển khai

| ✅ | Công việc | Trạng thái | Ghi chú |
|----|----------|------------|---------|
| 1 | Tạo monitoring user trên vCenter | | |
| 2 | Gán quyền read-only cho user | | |
| 3 | Cài đặt vmware_exporter | | |
| 4 | Cấu hình Prometheus scrape target | | |
| 5 | Thêm Prometheus data source vào Grafana | | |
| 6 | Import dashboard | | |
| 7 | Kiểm tra metrics hiển thị | | |
| 8 | Cấu hình alert (nếu cần) | | |

## 🚨 7. Các Vấn đề Thường Gặp & Giải Pháp

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-------------|-----------|
| Không thấy metrics | User không đủ quyền | Kiểm tra lại permissions, thêm các quyền cần thiết |
| Lỗi SSL certificate | vCenter dùng self-signed cert | Thêm flag `ignore_ssl: true` trong config |
| Exporter crash | Cấu hình sai syntax | Kiểm tra lại file config.yml |
| Metrics không hiển thị | Grafana query sai | Kiểm tra tên metrics trong Prometheus |

## 📚 8. Tài Liệu Tham Khảo

1. [VMware Exporter GitHub](https://github.com/grafana/vmware_exporter)
2. [Grafana VMware Dashboards](https://grafana.com/grafana/dashboards/?search=vmware)
3. [vCenter Permissions Documentation](https://docs.vmware.com/en/VMware-vSphere/8.0/vsphere-security/GUID-21081F40-B4E6-46F5-A5C0-39D648590A5A.html)

## 📝 9. Maintenance & Operations

1. **Định kỳ**:
   - Kiểm tra trạng thái của vmware_exporter
   - Xem xét và điều chỉnh các ngưỡng alert
   - Cập nhật dashboard khi cần

2. **Khi có sự cố**:
   - Kiểm tra log của vmware_exporter: `docker logs vmware-exporter`
   - Kiểm tra log Prometheus
   - Xác minh kết nối từ exporter đến vCenter

---

**Người tạo**: Tran Phuc Hau
**Ngày cập nhật**: 2025-11-04
**Phiên bản**: 1.0

> 💡 **Lưu ý**: Tài liệu này dựa trên phiên bản vCenter 8.0 và có thể cần điều chỉnh cho các phiên bản khác. Luôn kiểm tra tính tương thích khi triển khai trong môi trường production.