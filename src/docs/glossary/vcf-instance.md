---
term: VCF Instance
category: VMware_vSphere_Foundation_9
---

VCF Instance is a complete VMware Cloud Foundation stack that includes one Management Domain and multiple Workload Domains, providing a full software-defined data center solution for compute, storage, and network virtualization.

## Overview

A VCF Instance represents a fully deployed VMware Cloud Foundation environment consisting of a Management Domain for core services and one or more Workload Domains for customer applications. It provides a complete SDDC solution that delivers software-defined compute, storage, and networking capabilities with unified management and operations.

## Key Features

### Complete SDDC Stack
- **Management Domain**: Central management infrastructure
- **Workload Domains**: Customer workload environments
- **Unified Management**: Single management interface
- **Integrated Services**: Compute, storage, and networking

### Scalability and Flexibility
- **Elastic Scaling**: Scale domains based on demand
- **Flexible Configuration**: Configure for specific requirements
- **Mixed Workloads**: Support diverse workload types
- **Resource Pooling**: Efficient resource utilization

### Enterprise Capabilities
- **High Availability**: Built-in high availability
- **Disaster Recovery**: Integrated backup and recovery
- **Security**: Enterprise-grade security controls
- **Compliance**: Compliance with industry standards

## Architecture

### VCF Instance Components
- **Management Domain**: Core management services
- **Workload Domains**: Customer workload environments
- **Infrastructure**: Physical compute, storage, and network
- **Management Services**: Centralized management and monitoring

### Architecture Diagram
```
VCF Instance
├── Management Domain
│   ├── vCenter Server
│   ├── NSX Manager
│   ├── SDDC Manager
│   ├── ESXi Hosts (3+)
│   └── vSAN Datastore
├── Workload Domains
│   ├── VI Workload Domain 1
│   │   ├── ESXi Cluster
│   │   ├── vSAN Storage
│   │   └── NSX Networking
│   ├── VI Workload Domain 2
│   │   ├── ESXi Cluster
│   │   ├── External Storage
│   │   └── NSX Networking
│   └── Kubernetes Workload Domain
│       ├── Supervisor Cluster
│       ├── Worker Nodes
│       └── Tanzu Services
├── Infrastructure
│   ├── Physical Servers
│   ├── Network Fabric
│   └── Storage Arrays
└── Management Services
    ├── Lifecycle Manager
    ├── Monitoring
    └── Automation
```

### Deployment Model
1. **Instance Initialization**: Initialize VCF instance
2. **Management Domain**: Deploy and configure Management Domain
3. **Workload Domains**: Create and configure Workload Domains
4. **Service Integration**: Integrate all services
5. **Validation**: Validate instance operation
6. **Workload Deployment**: Deploy customer workloads

## Configuration and Management

### Instance Management
```bash
# View VCF instance via SDDC Manager API
curl -X GET "https://sddc-manager/api/v1/system/instance" -H "Authorization: Bearer <token>"

# Check instance health
curl -X GET "https://sddc-manager/api/v1/system/health" -H "Authorization: Bearer <token>"

# View instance resources
curl -X GET "https://sddc-manager/api/v1/system/resources" -H "Authorization: Bearer <token>"

# Update instance configuration
curl -X PUT "https://sddc-manager/api/v1/system/instance" -H "Authorization: Bearer <token>" -d @instance-config.json
```

### Configuration Example
```json
{
  "vcfInstance": {
    "name": "vcf-instance-01",
    "version": "4.5.0",
    "deploymentType": "consolidated",
    "managementDomain": {
      "name": "management-domain-01",
      "cluster": {
        "name": "management-cluster",
        "hosts": [
          "esxi01.mgmt.domain.com",
          "esxi02.mgmt.domain.com",
          "esxi03.mgmt.domain.com"
        ]
      }
    },
    "workloadDomains": [
      {
        "name": "vi-workload-domain-01",
        "type": "VI",
        "cluster": {
          "name": "vi-cluster-01",
          "hosts": [
            "esxi01.vi.domain.com",
            "esxi02.vi.domain.com",
            "esxi03.vi.domain.com"
          ]
        }
      },
      {
        "name": "k8s-workload-domain-01",
        "type": "KUBERNETES",
        "cluster": {
          "name": "k8s-cluster-01",
          "hosts": [
            "esxi01.k8s.domain.com",
            "esxi02.k8s.domain.com",
            "esxi03.k8s.domain.com"
          ]
        }
      }
    ],
    "network": {
      "managementNetwork": "192.168.1.0/24",
      "workloadNetwork": "192.168.2.0/24",
      "transportZones": ["tz-overlay", "tz-vlan"]
    }
  }
}
```

### Management Operations
- **Instance Monitoring**: Monitor overall instance health
- **Domain Management**: Manage domains within instance
- **Resource Allocation**: Allocate resources across domains
- **Lifecycle Operations**: Perform updates and upgrades

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Resource Utilization**: Better CPU and memory usage
- **Scalability**: Support for larger instance deployments
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

1. **Instance Sizing**: Properly size instance for environment
2. **Domain Planning**: Plan domains for specific workloads
3. **Network Design**: Design networks for optimal performance
4. **Security**: Implement proper security controls
5. **Monitoring**: Monitor instance health continuously
6. **Backup**: Regular backup of instance configurations

## Troubleshooting Commands

```bash
# Check VCF instance status
curl -X GET "https://sddc-manager/api/v1/system/instance/status" -H "Authorization: Bearer <token>"

# View instance components
curl -X GET "https://sddc-manager/api/v1/system/instance/components" -H "Authorization: Bearer <token>"

# Check instance health
curl -X GET "https://sddc-manager/api/v1/system/health" -H "Authorization: Bearer <token>"

# View instance logs
tail -f /var/log/vmware/sddc-manager/vcf-instance.log

# Validate instance configuration
curl -X POST "https://sddc-manager/api/v1/system/instance/validate" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [Management Domain](/glossary/term/management-domain) - Hosts core management VMs
- [Workload Domain](/glossary/term/workload-domain) - Container for customer workloads
- [SDDC Manager](/glossary/term/sddc-manager) - Central management platform
- [VCF Fleet](/glossary/term/vcf-fleet) - Collection of VCF Instances