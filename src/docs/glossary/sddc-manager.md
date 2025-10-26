---
term: SDDC Manager
category: VMware_vSphere_Foundation_9
---

SDDC Manager is the central management platform in VMware Cloud Foundation that provisions, manages, and monitors all VCF resources through a unified UI, CLI, and API interface, serving as the single point of control for the entire SDDC stack.

## Overview

SDDC Manager provides a comprehensive management solution for VMware Cloud Foundation deployments, offering centralized control over all aspects of the SDDC environment including compute, storage, networking, and management components. It simplifies the deployment, configuration, and ongoing management of VCF environments.

## Key Features

### Unified Management
- **Single Pane of Glass**: Centralized management interface
- **Cross-Component Control**: Manage vSphere, NSX, vSAN, and more
- **Policy-Based Management**: Policy-driven operations
- **Role-Based Access**: Granular permission controls

### Provisioning and Deployment
- **Automated Deployment**: Automated VCF deployment
- **Workload Domain Creation**: Create and manage workload domains
- **Resource Pooling**: Pool and allocate resources
- **Template Management**: Manage deployment templates

### Monitoring and Operations
- **Health Monitoring**: Continuous health status monitoring
- **Performance Analytics**: Performance analysis and reporting
- **Alert Management**: Automated alerting and notifications
- **Audit Trail**: Comprehensive audit logging

## Architecture

### SDDC Manager Components
- **Management Interface**: Web UI, CLI, and API access
- **Orchestration Engine**: Automated workflow engine
- **Repository Manager**: Software repository management
- **Validation Engine**: Pre and post-operation validation

### Architecture Diagram
```
VMware Cloud Foundation
├── SDDC Manager
│   ├── Web UI
│   ├── CLI/API
│   ├── Orchestration Engine
│   ├── Repository Manager
│   └── Validation Engine
├── Management Domain
│   ├── vCenter Server
│   ├── NSX Manager
│   ├── SDDC Manager VM
│   └── vSAN Datastore
├── Workload Domains
│   ├── VI Workload Domains
│   ├── vSphere Clusters
│   ├── NSX-T Instances
│   └── vSAN Datastores
└── Infrastructure
    ├── ESXi Hosts
    ├── Network Fabric
    └── Storage Arrays
```

### Management Model
1. **System Initialization**: Initialize SDDC Manager
2. **Domain Provisioning**: Provision management and workload domains
3. **Resource Management**: Manage compute, storage, and network resources
4. **Lifecycle Operations**: Perform updates and upgrades
5. **Monitoring**: Continuous monitoring and alerting
6. **Reporting**: Generate operational reports

## Configuration and Management

### Access Methods
```bash
# Access SDDC Manager Web UI
https://<sddc-manager-ip-or-hostname>

# CLI access
ssh admin@<sddc-manager-ip-or-hostname>

# API access example
curl -X GET "https://<sddc-manager-ip>/v1/system/info" -H "Authorization: Bearer <token>"

# PowerCLI access
Connect-VIServer -Server <sddc-manager-ip> -User administrator@vsphere.local -Password <password>
```

### System Configuration
```json
{
  "sddcManager": {
    "name": "sddc-manager-01",
    "ipAddress": "192.168.1.100",
    "fqdn": "sddc-manager.domain.com",
    "credentials": {
      "adminUser": "admin",
      "adminPassword": "secure-password"
    },
    "network": {
      "managementNetwork": "192.168.1.0/24",
      "gateway": "192.168.1.1",
      "dnsServers": ["8.8.8.8", "8.8.4.4"]
    }
  }
}
```

### Management Operations
- **Domain Management**: Create and manage domains
- **Resource Allocation**: Allocate compute, storage, and network resources
- **User Management**: Manage users and permissions
- **System Monitoring**: Monitor system health and performance

## vSphere Foundation 9 Enhancements

### Enhanced Interface
- **Modern UI**: Updated user interface with improved usability
- **Responsive Design**: Better mobile and tablet support
- **Accessibility**: Enhanced accessibility features
- **Customization**: Customizable dashboard views

### Advanced Monitoring
- **Predictive Analytics**: Predictive health monitoring
- **Performance Insights**: Enhanced performance analysis
- **Capacity Planning**: Better capacity planning tools
- **Integration**: Better integration with vRealize Operations

### Security Improvements
- **Enhanced Authentication**: Multi-factor authentication support
- **Certificate Management**: Simplified certificate operations
- **Compliance Reporting**: Enhanced compliance features
- **Audit Enhancement**: More detailed audit logging

## Best Practices

1. **System Sizing**: Properly size SDDC Manager for environment
2. **Network Design**: Plan network configuration carefully
3. **Security**: Implement proper access controls
4. **Backup**: Regular backup of SDDC Manager
5. **Monitoring**: Monitor system health continuously
6. **Updates**: Keep system updated with latest patches

## Troubleshooting Commands

```bash
# Check SDDC Manager service status
systemctl status sddc-manager

# View system logs
tail -f /var/log/vmware/sddc-manager/sddc-manager.log

# Check system health
curl -X GET "https://<sddc-manager-ip>/v1/system/health" -H "Authorization: Bearer <token>"

# View domain status
curl -X GET "https://<sddc-manager-ip>/v1/domains" -H "Authorization: Bearer <token>"

# Check repository status
curl -X GET "https://<sddc-manager-ip>/v1/repository/status" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [Management Domain](/glossary/term/management-domain) - Hosts core management VMs
- [Workload Domain](/glossary/term/workload-domain) - Container for customer workloads
- [VCF Instance](/glossary/term/vcf-instance) - Complete VCF deployment
- [Lifecycle Manager](/glossary/term/lcm) - Automated lifecycle management