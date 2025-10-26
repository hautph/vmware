---
term: VCF Fleet
category: VMware_vSphere_Foundation_9
---

VCF Fleet is a collection of VMware Cloud Foundation Instances managed by a single Operations and Automation platform, enabling centralized lifecycle management, monitoring, and governance across multiple VCF deployments.

## Overview

A VCF Fleet represents a logical grouping of multiple VMware Cloud Foundation Instances that are centrally managed through unified Operations and Automation services. It provides organizations with the ability to manage geographically distributed VCF deployments as a single entity, enabling consistent policies, centralized monitoring, and streamlined operations across the entire fleet.

## Key Features

### Centralized Management
- **Unified Operations**: Single pane of glass for all VCF instances
- **Policy Consistency**: Consistent policies across all instances
- **Centralized Monitoring**: Unified monitoring and alerting
- **Automated Governance**: Automated compliance and governance

### Multi-Instance Coordination
- **Cross-Instance Operations**: Coordinated operations across instances
- **Resource Pooling**: Shared resource management
- **Workload Mobility**: Workload migration between instances
- **Disaster Recovery**: Coordinated disaster recovery

### Scalability and Flexibility
- **Elastic Scaling**: Scale fleet based on demand
- **Flexible Configuration**: Configure instances for specific needs
- **Mixed Deployments**: Support for different deployment types
- **Resource Optimization**: Efficient resource utilization

## Architecture

### VCF Fleet Components
- **VCF Instances**: Individual VCF deployments
- **Operations Platform**: Centralized operations management
- **Automation Platform**: Centralized automation services
- **Governance Services**: Policy and compliance management

### Architecture Diagram
```
VCF Fleet
├── Operations Platform
│   ├── vRealize Operations
│   ├── vRealize Log Insight
│   ├── vRealize Network Insight
│   └── vRealize Automation
├── Automation Platform
│   ├── vRealize Orchestrator
│   ├── Code Stream
│   ├── SaltStack
│   └── Pipeline Management
├── Governance Services
│   ├── Policy Management
│   ├── Compliance Engine
│   ├── Audit Services
│   └── Reporting
├── VCF Instances
│   ├── VCF Instance 1
│   │   ├── Management Domain
│   │   ├── Workload Domains
│   │   └── Infrastructure
│   ├── VCF Instance 2
│   │   ├── Management Domain
│   │   ├── Workload Domains
│   │   └── Infrastructure
│   └── VCF Instance N
│       ├── Management Domain
│       ├── Workload Domains
│       └── Infrastructure
└── Integration Services
    ├── Single Sign-On
    ├── Certificate Management
    └── Identity Federation
```

### Management Model
1. **Fleet Creation**: Create and configure VCF fleet
2. **Instance Onboarding**: Onboard VCF instances to fleet
3. **Policy Distribution**: Distribute policies to instances
4. **Monitoring Setup**: Configure centralized monitoring
5. **Automation Integration**: Integrate automation services
6. **Governance Implementation**: Implement governance policies

## Configuration and Management

### Fleet Management
```bash
# Register VCF instance with fleet via API
curl -X POST "https://vcf-fleet-manager/api/v1/fleet/instances" -H "Authorization: Bearer <token>" -d @instance-registration.json

# View fleet status
curl -X GET "https://vcf-fleet-manager/api/v1/fleet/status" -H "Authorization: Bearer <token>"

# Apply policy to fleet
curl -X POST "https://vcf-fleet-manager/api/v1/fleet/policies" -H "Authorization: Bearer <token>" -d @fleet-policy.json

# Check fleet health
curl -X GET "https://vcf-fleet-manager/api/v1/fleet/health" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "vcfFleet": {
    "name": "production-fleet",
    "description": "Production VCF fleet",
    "instances": [
      {
        "name": "vcf-instance-01",
        "endpoint": "https://sddc-manager-01.domain.com",
        "location": "datacenter-1",
        "region": "us-west"
      },
      {
        "name": "vcf-instance-02",
        "endpoint": "https://sddc-manager-02.domain.com",
        "location": "datacenter-2",
        "region": "us-east"
      },
      {
        "name": "vcf-instance-03",
        "endpoint": "https://sddc-manager-03.domain.com",
        "location": "datacenter-3",
        "region": "eu-central"
      }
    ],
    "operations": {
      "vroEndpoint": "https://vro.domain.com",
      "vraEndpoint": "https://vra.domain.com",
      "vrliEndpoint": "https://vrli.domain.com"
    },
    "policies": {
      "securityPolicy": "enterprise-security",
      "backupPolicy": "daily-backup",
      "monitoringPolicy": "comprehensive-monitoring"
    }
  }
}
```

### Management Operations
- **Instance Management**: Manage instances within fleet
- **Policy Distribution**: Distribute policies to instances
- **Health Monitoring**: Monitor fleet health status
- **Compliance Management**: Manage compliance across fleet

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Scalability**: Better support for large fleets
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Security**: Better security controls
- **AI/ML Integration**: AI-driven operations and automation
- **Predictive Analytics**: Predictive health monitoring
- **Multi-Cloud**: Better multi-cloud integration

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Fleet Planning**: Plan fleet structure carefully
2. **Policy Design**: Design consistent policies
3. **Security**: Implement proper security controls
4. **Monitoring**: Monitor fleet health continuously
5. **Backup**: Regular backup of fleet configurations
6. **Documentation**: Document fleet configurations

## Troubleshooting Commands

```bash
# Check VCF fleet status
curl -X GET "https://vcf-fleet-manager/api/v1/fleet/status" -H "Authorization: Bearer <token>"

# View fleet instances
curl -X GET "https://vcf-fleet-manager/api/v1/fleet/instances" -H "Authorization: Bearer <token>"

# Check fleet health
curl -X GET "https://vcf-fleet-manager/api/v1/fleet/health" -H "Authorization: Bearer <token>"

# View fleet logs
tail -f /var/log/vmware/vcf-fleet/fleet-manager.log

# Validate fleet configuration
curl -X POST "https://vcf-fleet-manager/api/v1/fleet/validate" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [VCF Instance](/glossary/term/vcf-instance) - Complete VCF deployment
- [Management Domain](/glossary/term/management-domain) - Hosts core management VMs
- [Workload Domain](/glossary/term/workload-domain) - Container for customer workloads
- [VCF Operations](/glossary/term/vcf-operations) - Unified operations for VCF fleets