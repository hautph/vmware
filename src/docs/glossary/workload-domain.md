---
term: Workload Domain
category: VMware_vSphere_Foundation_9
---

Workload Domain is a VMware Cloud Foundation container for customer workloads that provides policy-based management of compute, network, and storage resources with integrated vSphere, NSX, and storage technologies.

## Overview

A Workload Domain in VMware Cloud Foundation represents a logical boundary for running customer applications and workloads. It encapsulates a complete SDDC stack including vSphere compute clusters, NSX-T networking, and storage resources, providing isolated environments with consistent policies and management capabilities.

## Key Features

### Policy-Based Management
- **Resource Policies**: Define resource allocation policies
- **Security Policies**: Implement security and compliance policies
- **Network Policies**: Configure network segmentation policies
- **Storage Policies**: Apply storage policy-based management

### Isolation and Multi-Tenancy
- **Workload Isolation**: Isolate different workloads securely
- **Resource Boundaries**: Define resource usage boundaries
- **Access Controls**: Implement tenant-specific access controls
- **Compliance**: Ensure compliance with tenant requirements

### Scalability and Flexibility
- **Elastic Scaling**: Scale resources based on demand
- **Flexible Configuration**: Configure domains for specific needs
- **Mixed Workloads**: Support diverse workload types
- **Resource Pooling**: Efficient resource utilization

## Architecture

### Workload Domain Components
- **Compute Cluster**: vSphere cluster for workload VMs
- **Network Infrastructure**: NSX-T networking components
- **Storage Resources**: vSAN or external storage
- **Management Services**: Domain-specific management

### Architecture Diagram
```
Workload Domain
├── Compute Resources
│   ├── vSphere Cluster
│   │   ├── ESXi Host 1
│   │   ├── ESXi Host 2
│   │   ├── ESXi Host 3
│   │   └── vSAN Datastore
│   └── Resource Pools
│       ├── Production Pool
│       ├── Development Pool
│       └── Test Pool
├── Network Infrastructure
│   ├── NSX-T Manager
│   ├── NSX Edge Cluster
│   ├── Logical Switches
│   └── Distributed Firewall
├── Storage Resources
│   ├── vSAN Datastore
│   ├── External Storage
│   └── Storage Policies
└── Management Services
    ├── Domain vCenter
    ├── Monitoring Agents
    └── Backup Services
```

### Deployment Model
1. **Domain Creation**: Create workload domain through SDDC Manager
2. **Resource Allocation**: Allocate compute, network, and storage
3. **Policy Configuration**: Configure domain policies
4. **Service Deployment**: Deploy management services
5. **Validation**: Validate domain operation
6. **Workload Deployment**: Deploy customer workloads

## Configuration and Management

### Domain Management
```bash
# Create workload domain via SDDC Manager API
curl -X POST "https://sddc-manager/api/v1/domains/workload" -H "Authorization: Bearer <token>" -d @workload-domain-config.json

# View domain details
curl -X GET "https://sddc-manager/api/v1/domains/workload/{domain-id}" -H "Authorization: Bearer <token>"

# Update domain configuration
curl -X PUT "https://sddc-manager/api/v1/domains/workload/{domain-id}" -H "Authorization: Bearer <token>" -d @updated-config.json

# Delete workload domain
curl -X DELETE "https://sddc-manager/api/v1/domains/workload/{domain-id}" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "workloadDomain": {
    "name": "workload-domain-01",
    "description": "Production workload domain",
    "cluster": {
      "name": "workload-cluster-01",
      "hosts": [
        "esxi01.workload.domain.com",
        "esxi02.workload.domain.com",
        "esxi03.workload.domain.com"
      ],
      "resourcePool": {
        "name": "production-pool",
        "cpuReservation": "10000",
        "memoryReservation": "50GB"
      }
    },
    "network": {
      "nsxManager": {
        "name": "nsx-manager-wld",
        "ip": "192.168.2.10"
      },
      "transportZones": [
        {
          "name": "tz-overlay",
          "type": "OVERLAY"
        },
        {
          "name": "tz-vlan",
          "type": "VLAN"
        }
      ]
    },
    "storage": {
      "vsan": {
        "enabled": true,
        "policy": "workload-policy"
      }
    },
    "policies": {
      "backupPolicy": "daily-backup",
      "securityPolicy": "production-security",
      "networkPolicy": "production-network"
    }
  }
}
```

### Management Operations
- **Resource Scaling**: Scale compute resources
- **Policy Management**: Manage domain policies
- **Health Monitoring**: Monitor domain health
- **Backup Operations**: Perform domain backups

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Resource Utilization**: Better CPU and memory usage
- **Scalability**: Support for larger domain deployments
- **Network Performance**: Enhanced networking capabilities
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Security**: Better security controls
- **Automation**: Improved automation capabilities
- **Monitoring**: Enhanced monitoring features
- **Multi-Cloud**: Better multi-cloud integration

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Resource Planning**: Plan resources for expected workloads
2. **Policy Design**: Design policies for specific requirements
3. **Security**: Implement proper security controls
4. **Monitoring**: Monitor domain health continuously
5. **Backup**: Regular backup of domain configurations
6. **Documentation**: Document domain configurations

## Troubleshooting Commands

```bash
# Check workload domain status
curl -X GET "https://sddc-manager/api/v1/domains/workload/{domain-id}/status" -H "Authorization: Bearer <token>"

# View domain resources
curl -X GET "https://sddc-manager/api/v1/domains/workload/{domain-id}/resources" -H "Authorization: Bearer <token>"

# Check domain health
curl -X GET "https://sddc-manager/api/v1/domains/workload/{domain-id}/health" -H "Authorization: Bearer <token>"

# View domain logs
tail -f /var/log/vmware/sddc-manager/workload-domain.log

# Validate domain configuration
curl -X POST "https://sddc-manager/api/v1/domains/workload/{domain-id}/validate" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [Management Domain](/glossary/term/management-domain) - Hosts core management VMs
- [VI Workload Domain](/glossary/term/vi-workload-domain) - vSphere clusters for customer apps
- [SDDC Manager](/glossary/term/sddc-manager) - Central management platform
- [VCF Instance](/glossary/term/vcf-instance) - Complete VCF deployment