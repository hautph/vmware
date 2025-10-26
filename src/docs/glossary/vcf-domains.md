---
term: VCF Domains
category: VMware_vSphere_Foundation_9
---

VCF Domains is a collective term in VMware Cloud Foundation that encompasses both Management Domains and Workload Domains within a VCF Instance, representing the complete set of logical boundaries for resource management, policy enforcement, and workload isolation.

## Overview

VCF Domains represent the fundamental architectural construct in VMware Cloud Foundation that provides logical separation and organization of resources within a VCF Instance. This collective includes Management Domains for core infrastructure services and Workload Domains for customer applications, each with distinct roles, policies, and management characteristics.

## Key Features

### Logical Separation
- **Management Isolation**: Separate management and workload domains
- **Resource Boundaries**: Define resource usage boundaries
- **Policy Enforcement**: Apply domain-specific policies
- **Workload Isolation**: Isolate different types of workloads

### Unified Management
- **Consistent Policies**: Apply consistent policies across domains
- **Centralized Operations**: Manage domains through single interface
- **Automated Lifecycle**: Automated domain lifecycle management
- **Cross-Domain Operations**: Coordinated operations across domains

### Scalability and Flexibility
- **Elastic Scaling**: Scale domains based on demand
- **Flexible Configuration**: Configure domains for specific needs
- **Mixed Workloads**: Support diverse workload types
- **Resource Optimization**: Efficient resource utilization

## Architecture

### VCF Domains Components
- **Management Domains**: Core management infrastructure
- **Workload Domains**: Customer workload environments
- **Domain Policies**: Domain-specific policies and configurations
- **Resource Management**: Resource allocation and monitoring

### Architecture Diagram
```
VCF Domains
├── Management Domain
│   ├── Core Services
│   │   ├── vCenter Server
│   │   ├── NSX Manager
│   │   ├── SDDC Manager
│   │   └── Supporting Services
│   ├── Infrastructure
│   │   ├── ESXi Hosts
│   │   └── vSAN Storage
│   └── Management Network
├── Workload Domains
│   ├── VI Workload Domains
│   │   ├── Compute Clusters
│   │   ├── Storage Resources
│   │   └── Network Integration
│   ├── Kubernetes Workload Domains
│   │   ├── Supervisor Clusters
│   │   ├── Worker Nodes
│   │   └── Container Services
│   └── Edge Workload Domains
│       ├── Edge Services
│       ├── Network Functions
│       └── Security Services
└── Domain Management
    ├── Policy Engine
    ├── Resource Manager
    ├── Monitoring Services
    └── Automation Engine
```

### Domain Relationship Model
1. **Management Domain**: Provides core management services
2. **Workload Domains**: Host customer applications
3. **Policy Distribution**: Policies distributed from Management Domain
4. **Resource Allocation**: Resources allocated to domains
5. **Monitoring**: Domains monitored centrally
6. **Operations**: Operations performed across domains

## Configuration and Management

### Domain Management
```bash
# List all domains in VCF instance
curl -X GET "https://sddc-manager/api/v1/domains" -H "Authorization: Bearer <token>"

# View domain details
curl -X GET "https://sddc-manager/api/v1/domains/{domain-id}" -H "Authorization: Bearer <token>"

# Create new domain
curl -X POST "https://sddc-manager/api/v1/domains" -H "Authorization: Bearer <token>" -d @domain-config.json

# Update domain configuration
curl -X PUT "https://sddc-manager/api/v1/domains/{domain-id}" -H "Authorization: Bearer <token>" -d @updated-config.json
```

### Configuration Example
```json
{
  "vcfDomains": {
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
      "services": {
        "vcenter": "vcenter-mgmt.domain.com",
        "nsxManager": "nsx-manager.domain.com",
        "sddcManager": "sddc-manager.domain.com"
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
        },
        "policies": {
          "backup": "daily-backup",
          "security": "production-security",
          "network": "production-network"
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
        },
        "policies": {
          "backup": "hourly-backup",
          "security": "container-security",
          "network": "container-network"
        }
      }
    ],
    "domainPolicies": {
      "globalSecurity": "enterprise-security",
      "compliance": "sox-compliance",
      "monitoring": "comprehensive-monitoring",
      "automation": "devops-automation"
    }
  }
}
```

### Management Operations
- **Domain Creation**: Create new domains
- **Policy Management**: Manage domain policies
- **Resource Allocation**: Allocate resources to domains
- **Health Monitoring**: Monitor domain health

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

1. **Domain Planning**: Plan domains for specific workloads
2. **Policy Design**: Design consistent policies across domains
3. **Security**: Implement proper security controls
4. **Monitoring**: Monitor domain health continuously
5. **Backup**: Regular backup of domain configurations
6. **Documentation**: Document domain configurations

## Troubleshooting Commands

```bash
# Check all domains status
curl -X GET "https://sddc-manager/api/v1/domains/status" -H "Authorization: Bearer <token>"

# View domain resources
curl -X GET "https://sddc-manager/api/v1/domains/resources" -H "Authorization: Bearer <token>"

# Check domain health
curl -X GET "https://sddc-manager/api/v1/domains/health" -H "Authorization: Bearer <token>"

# View domain logs
tail -f /var/log/vmware/sddc-manager/domains.log

# Validate domain configuration
curl -X POST "https://sddc-manager/api/v1/domains/validate" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [Management Domain](management-domain.md) - Hosts core management VMs
- [Workload Domain](workload-domain.md) - Container for customer workloads
- [VI Workload Domain](vi-workload-domain.md) - vSphere clusters for customer apps
- [VCF Instance](vcf-instance.md) - Complete VCF deployment