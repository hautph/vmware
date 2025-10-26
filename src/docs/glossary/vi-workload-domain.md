---
term: VI Workload Domain
category: VMware_vSphere_Foundation_9
---

VI Workload Domain is a VMware Cloud Foundation vSphere cluster specifically designed for customer applications, providing compute resources managed by vCenter Server and NSX networking services that reside in the Management Domain.

## Overview

A VI (Virtual Infrastructure) Workload Domain in VMware Cloud Foundation represents a dedicated vSphere cluster environment for hosting customer virtual machine workloads. Unlike the Management Domain which hosts core management services, VI Workload Domains focus exclusively on delivering compute, storage, and networking resources for business applications while leveraging centralized management services from the Management Domain.

## Key Features

### Dedicated Compute Resources
- **vSphere Clusters**: Dedicated ESXi host clusters for workloads
- **Resource Isolation**: Isolated compute resources for tenants
- **Performance Optimization**: Optimized for application performance
- **Scalability**: Elastic scaling of compute resources

### Centralized Management Integration
- **Management Domain Services**: Leverage vCenter and NSX from Management Domain
- **Unified Monitoring**: Centralized monitoring and management
- **Policy Consistency**: Consistent policies across domains
- **Automated Operations**: Automated lifecycle management

### Application-Focused Design
- **VM Workload Support**: Optimized for virtual machine workloads
- **Enterprise Applications**: Support for traditional enterprise applications
- **Development Workloads**: Support for development and test environments
- **Disaster Recovery**: Integrated disaster recovery capabilities

## Architecture

### VI Workload Domain Components
- **Compute Cluster**: Dedicated ESXi host cluster
- **Storage Resources**: vSAN or external storage
- **Network Integration**: NSX-T networking from Management Domain
- **Management Services**: Centralized management from Management Domain

### Architecture Diagram
```
VI Workload Domain
├── Compute Resources
│   ├── ESXi Host Cluster
│   │   ├── ESXi Host 1
│   │   ├── ESXi Host 2
│   │   ├── ESXi Host 3
│   │   └── vSAN Datastore
│   └── Resource Management
│       ├── DRS
│       ├── HA
│       └── DPM
├── Storage Integration
│   ├── Local Storage
│   ├── vSAN Datastore
│   └── External Storage
├── Network Integration
│   ├── NSX-T from Management Domain
│   ├── Logical Networks
│   └── Security Policies
└── Management Integration
    ├── vCenter Server (Management Domain)
    ├── NSX Manager (Management Domain)
    └── SDDC Manager (Management Domain)
```

### Integration Model
1. **Cluster Provisioning**: Provision dedicated ESXi cluster
2. **Storage Configuration**: Configure storage resources
3. **Network Integration**: Integrate with NSX-T from Management Domain
4. **Management Connection**: Connect to centralized management services
5. **Policy Application**: Apply workload policies
6. **Workload Deployment**: Deploy customer applications

## Configuration and Management

### Domain Management
```bash
# Create VI workload domain via SDDC Manager API
curl -X POST "https://sddc-manager/api/v1/domains/vi" -H "Authorization: Bearer <token>" -d @vi-workload-domain-config.json

# View domain details
curl -X GET "https://sddc-manager/api/v1/domains/vi/{domain-id}" -H "Authorization: Bearer <token>"

# Scale cluster resources
curl -X PUT "https://sddc-manager/api/v1/domains/vi/{domain-id}/scale" -H "Authorization: Bearer <token>" -d '{"hostCount": 5}'

# Update domain configuration
curl -X PATCH "https://sddc-manager/api/v1/domains/vi/{domain-id}" -H "Authorization: Bearer <token>" -d @updated-config.json
```

### Configuration Example
```json
{
  "viWorkloadDomain": {
    "name": "vi-workload-domain-01",
    "description": "Production VI workload domain",
    "cluster": {
      "name": "vi-cluster-01",
      "hosts": [
        "esxi01.vi.domain.com",
        "esxi02.vi.domain.com",
        "esxi03.vi.domain.com"
      ],
      "drsEnabled": true,
      "haEnabled": true,
      "dpmEnabled": true
    },
    "storage": {
      "vsan": {
        "enabled": true,
        "diskGroup": {
          "capacityTier": "SSD",
          "cacheTier": "NVMe"
        }
      },
      "externalStorage": [
        {
          "name": "external-nfs",
          "type": "NFS",
          "server": "nfs-server.domain.com"
        }
      ]
    },
    "network": {
      "managementDomain": "management-domain-01",
      "transportZones": ["tz-overlay", "tz-vlan"],
      "networkPools": ["production-pool", "development-pool"]
    },
    "management": {
      "vcenter": "vcenter-mgmt.domain.com",
      "nsxManager": "nsx-manager.domain.com",
      "sddcManager": "sddc-manager.domain.com"
    }
  }
}
```

### Management Operations
- **Cluster Scaling**: Add or remove ESXi hosts
- **Resource Management**: Manage CPU, memory, and storage
- **Network Configuration**: Configure logical networks
- **Policy Application**: Apply security and compliance policies

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved vSAN**: Better vSAN performance and efficiency
- **Resource Optimization**: Better resource utilization
- **Scalability**: Support for larger clusters
- **Network Performance**: Enhanced network virtualization

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

1. **Cluster Sizing**: Properly size clusters for workloads
2. **Resource Planning**: Plan resources for expected demand
3. **Network Design**: Design networks for optimal performance
4. **Security**: Implement proper security controls
5. **Monitoring**: Monitor domain health continuously
6. **Documentation**: Document domain configurations

## Troubleshooting Commands

```bash
# Check VI workload domain status
curl -X GET "https://sddc-manager/api/v1/domains/vi/{domain-id}/status" -H "Authorization: Bearer <token>"

# View cluster resources
curl -X GET "https://sddc-manager/api/v1/domains/vi/{domain-id}/cluster" -H "Authorization: Bearer <token>"

# Check domain health
curl -X GET "https://sddc-manager/api/v1/domains/vi/{domain-id}/health" -H "Authorization: Bearer <token>"

# View domain logs
tail -f /var/log/vmware/sddc-manager/vi-workload-domain.log

# Validate domain configuration
curl -X POST "https://sddc-manager/api/v1/domains/vi/{domain-id}/validate" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [Workload Domain](/glossary/term/workload-domain) - Container for customer workloads
- [Management Domain](/glossary/term/management-domain) - Hosts core management VMs
- [SDDC Manager](/glossary/term/sddc-manager) - Central management platform
- [VCF Instance](/glossary/term/vcf-instance) - Complete VCF deploymentF deployment