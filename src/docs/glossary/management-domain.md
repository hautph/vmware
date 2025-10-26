---
term: Management Domain
category: VMware_vSphere_Foundation_9
---

Management Domain is a VMware Cloud Foundation construct that hosts core management virtual machines including vCenter Server, NSX Manager, and SDDC Manager, providing the foundational management infrastructure for the entire VCF environment with integrated vSAN storage.

## Overview

The Management Domain in VMware Cloud Foundation serves as the central management foundation for the entire SDDC environment. It contains all critical management components required to operate and manage the VCF deployment, including vCenter Server, NSX Manager, SDDC Manager, and other essential services, all protected by vSAN storage for high availability.

## Key Features

### Core Management Services
- **vCenter Server**: Centralized vSphere management
- **NSX Manager**: Network virtualization management
- **SDDC Manager**: VCF management and orchestration
- **Additional Services**: Supporting management services

### High Availability
- **vSAN Protection**: Integrated vSAN storage for VM protection
- **Redundancy**: Multiple management VMs for redundancy
- **Failover Capability**: Automatic failover of services
- **Disaster Recovery**: Integrated backup and recovery

### Security and Compliance
- **Isolated Environment**: Secure management environment
- **Access Controls**: Strict access control policies
- **Audit Logging**: Comprehensive audit trail
- **Compliance**: Compliance with security standards

## Architecture

### Management Domain Components
- **Management Cluster**: ESXi hosts running management services
- **vSAN Datastore**: Storage for management VMs
- **Management VMs**: Core management virtual machines
- **Network Infrastructure**: Management network components

### Architecture Diagram
```
Management Domain
├── Management Cluster
│   ├── ESXi Host 1
│   ├── ESXi Host 2
│   ├── ESXi Host 3
│   └── vSAN Datastore
├── Core Management VMs
│   ├── vCenter Server
│   ├── NSX Manager
│   ├── SDDC Manager
│   ├── NSX Edge VMs
│   └── Additional Services
├── Network Infrastructure
│   ├── Management Network
│   ├── vMotion Network
│   └── vSAN Network
└── Storage Infrastructure
    ├── Local Disks
    ├── vSAN Configuration
    └── Storage Policies
```

### Deployment Model
1. **Initial Deployment**: Deploy management domain during bring-up
2. **Service Initialization**: Initialize core management services
3. **Network Configuration**: Configure management networks
4. **Storage Setup**: Configure vSAN storage
5. **Service Integration**: Integrate management services
6. **Validation**: Validate management domain operation

## Configuration and Management

### Domain Management
```bash
# View management domain via SDDC Manager API
curl -X GET "https://sddc-manager/api/v1/domains/management" -H "Authorization: Bearer <token>"

# Check domain health
curl -X GET "https://sddc-manager/api/v1/domains/management/health" -H "Authorization: Bearer <token>"

# View domain resources
curl -X GET "https://sddc-manager/api/v1/domains/management/resources" -H "Authorization: Bearer <token>"

# Update domain configuration
curl -X PUT "https://sddc-manager/api/v1/domains/management" -H "Authorization: Bearer <token>" -d @domain-config.json
```

### Configuration Example
```json
{
  "managementDomain": {
    "name": "management-domain-01",
    "cluster": {
      "name": "management-cluster",
      "hosts": [
        "esxi01.mgmt.domain.com",
        "esxi02.mgmt.domain.com",
        "esxi03.mgmt.domain.com"
      ]
    },
    "vcenter": {
      "name": "vcenter-mgmt",
      "ip": "192.168.1.10",
      "fqdn": "vcenter-mgmt.domain.com"
    },
    "nsx": {
      "manager": {
        "name": "nsx-manager",
        "ip": "192.168.1.11",
        "fqdn": "nsx-manager.domain.com"
      },
      "edge": {
        "cluster": "edge-cluster",
        "nodes": ["edge01.domain.com", "edge02.domain.com"]
      }
    },
    "storage": {
      "vsan": {
        "enabled": true,
        "policy": "management-policy"
      }
    }
  }
}
```

### Management Operations
- **Health Monitoring**: Monitor domain health status
- **Resource Management**: Manage compute and storage resources
- **Service Management**: Manage core services
- **Backup Operations**: Perform domain backups

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved vSAN**: Better vSAN performance and efficiency
- **Resource Optimization**: Better resource utilization
- **Scalability**: Support for larger management domains
- **Network Performance**: Enhanced network performance

### Advanced Features
- **Enhanced Security**: Better security controls
- **Automation**: Improved automation capabilities
- **Monitoring**: Enhanced monitoring features
- **Integration**: Better integration with other VMware products

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Sizing**: Properly size management domain for environment
2. **Redundancy**: Ensure adequate redundancy for services
3. **Network Design**: Plan network configuration carefully
4. **Security**: Implement proper access controls
5. **Backup**: Regular backup of management VMs
6. **Monitoring**: Monitor domain health continuously

## Troubleshooting Commands

```bash
# Check management domain status
curl -X GET "https://sddc-manager/api/v1/domains/management/status" -H "Authorization: Bearer <token>"

# View domain logs
tail -f /var/log/vmware/sddc-manager/domain.log

# Check vSAN health
esxcli vsan cluster get

# View management VMs
govc ls /management-domain/vm

# Check network connectivity
ping -c 4 vcenter-mgmt.domain.com
```

## Related Technologies

- [SDDC Manager](/glossary/term/sddc-manager) - Central management platform
- [Workload Domain](/glossary/term/workload-domain) - Container for customer workloads
- [VI Workload Domain](/glossary/term/vi-workload-domain) - vSphere clusters for customer apps
- [VCF Instance](/glossary/term/vcf-instance) - Complete VCF deployment