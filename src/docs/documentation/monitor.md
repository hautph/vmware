---
title: Deploying Prometheus + Grafana Monitoring for vCenter 8
category: Monitoring
excerpt: Technical guide for deploying open-source monitoring solution for VMware vCenter 8 using Prometheus and Grafana with read-only account setup
---

# 📋 Technical Documentation: Deploying vCenter 8 Monitoring with Prometheus + Grafana

**Purpose**: Guide for installing and configuring an open-source monitoring solution for VMware vCenter 8 using Prometheus and Grafana, including creating a read-only account for secure data access.

**Scope**: vCenter Server 8.x, ESXi 8.x

## 🔐 1. Creating a Read-Only User on vCenter Server

To comply with the principle of least privilege, we will create a user with read-only permissions to access vCenter API data.

### 1.1. Creating a New User

1. Log into the vCenter Web Client with administrator credentials
2. Navigate to **Administration** → **Users and Groups** 
3. Select the appropriate domain, click **Add User**
4. Enter user information:
   - **Username**: `monitoring-user` (or a name according to your standards)
   - **Password**: Set a strong password
   - Other information is optional

### 1.2. Assigning Read-Only Permissions

There are two ways to assign permissions:

#### Method 1: Using the Built-in Read-Only Role

1. Navigate to **Global Permissions** under the **Access Control** menu
2. Click the **Add permission** icon
3. Select the domain, enter the username you just created
4. Select the **Read-only** role
5. Click **OK** to save

#### Method 2: Creating a Custom Role (Recommended for Production)

1. Navigate to **Administration** → **Roles** → **Create Role**
2. Name the role: `Monitoring-Role`
3. Assign the minimum required permissions:
   - **System** → **Read**
   - **vCenter** → **Read**
   - **Host** → **Read**
   - **Virtual Machine** → **Read**
   - **Datastore** → **Read**
   - **Network** → **Read**
   - **Distributed Switch** → **Read**
4. Save the role
5. Assign this role to the user you just created in Global Permissions

> 💡 **Important Note**: Some monitoring features may require special privileges. For example, to access vCenter service statuses, you may need the additional privilege `VMware vSphere Lifecycle Manager.Lifecycle Manager: Image Privileges.Read`.

## 🚀 2. Deploying VMware Exporter

We will use Grafana's `vmware_exporter` to collect metrics from vCenter.

### 2.1. System Requirements

- Linux server (Ubuntu 20.04+ or CentOS 8+)
- Docker or Podman installed
- Network connectivity to vCenter Server (port 443)

### 2.2. Installation Using Docker

```bash
# Create configuration directory
mkdir -p /opt/vmware-exporter
cd /opt/vmware-exporter

# Create configuration file
cat > config.yml << EOF
vsphere:
  user: "monitoring-user@vsphere.local"  # Replace with your domain
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

# Run exporter with Docker
docker run -d \
  --name vmware-exporter \
  -p 9272:9272 \
  -v $(pwd)/config.yml:/etc/vmware_exporter/config.yml \
  grafana/vmware_exporter \
  --config /etc/vmware_exporter/config.yml
```

### 2.3. Verifying Operation

```bash
curl http://localhost:9272/metrics
```

You should see metrics from vCenter returned in Prometheus format.

## 📊 3. Configuring Prometheus to Collect Metrics

1. Open the Prometheus configuration file (`prometheus.yml`)
2. Add a scrape job for vmware_exporter:

```yaml
scrape_configs:
  - job_name: 'vmware'
    static_configs:
      - targets: ['localhost:9272']
    scrape_interval: 30s
    scrape_timeout: 10s
```

3. Restart Prometheus:
```bash
systemctl restart prometheus
```

## 📈 4. Configuring Grafana Dashboard

### 4.1. Adding Prometheus Data Source

1. Log into Grafana
2. Navigate to **Configuration** → **Data Sources**
3. Select **Prometheus**
4. Configure:
   - **Name**: `vCenter-Prometheus`
   - **URL**: `http://prometheus-server:9090`
   - Keep other options as default
5. Click **Save & Test**

### 4.2. Importing Dashboard

There are two ways:

#### Method 1: Import Pre-built Dashboard

1. Navigate to **Create** → **Import**
2. Enter dashboard ID from Grafana.com:
   - **VMware vSphere Overview**: ID 8159
   - **VMware vSphere VMs**: ID 8168
3. Select the Prometheus data source you just created
4. Click **Import**

#### Method 2: Creating Custom Dashboard

1. Navigate to **Create** → **Dashboard**
2. Add panels with useful Prometheus queries:

| Panel | Prometheus Query | Purpose |
|-------|------------------|---------|
| CPU Usage Host | `avg(vsphere_host_cpu_usage_average)` | Average CPU usage of ESXi hosts |
| Memory Usage Host | `avg(vsphere_host_mem_usage_average)` | Average memory usage |
| VMs per Host | `count(vsphere_vm_power_state) by (vsphere_host)` | Number of VMs per host |
| Datastore Usage | `vsphere_datastore_disk_used / vsphere_datastore_disk_capacity` | Datastore usage ratio |

## 🔧 5. Configuring Alerts (Optional)

### 5.1. Creating Rules in Prometheus

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

### 5.2. Configuring Alertmanager

Configure Alertmanager to send emails, Slack, or other notification channels when alerts occur.

## 📋 6. Deployment Checklist

| ✅ | Task | Status | Notes |
|----|------|--------|-------|
| 1 | Create monitoring user on vCenter | | |
| 2 | Assign read-only permissions to user | | |
| 3 | Install vmware_exporter | | |
| 4 | Configure Prometheus scrape target | | |
| 5 | Add Prometheus data source to Grafana | | |
| 6 | Import dashboard | | |
| 7 | Verify metrics display | | |
| 8 | Configure alerts (if needed) | | |

## 🚨 7. Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| No metrics visible | User lacks sufficient permissions | Recheck permissions, add required privileges |
| SSL certificate error | vCenter uses self-signed certificate | Add `ignore_ssl: true` flag in config |
| Exporter crashes | Configuration syntax error | Check config.yml file |
| Metrics not displaying | Grafana query error | Check metric names in Prometheus |

## 📚 8. References

1. [VMware Exporter GitHub](https://github.com/grafana/vmware_exporter)
2. [Grafana VMware Dashboards](https://grafana.com/grafana/dashboards/?search=vmware)
3. [vCenter Permissions Documentation](https://docs.vmware.com/en/VMware-vSphere/8.0/vsphere-security/GUID-21081F40-B4E6-46F5-A5C0-39D648590A5A.html)

## 📝 9. Maintenance & Operations

1. **Periodic Tasks**:
   - Check vmware_exporter status
   - Review and adjust alert thresholds
   - Update dashboards as needed

2. **When Issues Occur**:
   - Check vmware_exporter logs: `docker logs vmware-exporter`
   - Check Prometheus logs
   - Verify connection from exporter to vCenter

---

**Created by**: Tran Phuc Hau
**Last Updated**: 2025-11-04
**Version**: 1.0

> 💡 **Note**: This document is based on vCenter 8.0 and may require adjustments for other versions. Always check compatibility when deploying in production environments.