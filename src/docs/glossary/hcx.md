---
term: HCX
category: VMware_vSphere_Foundation_9
---

HCX (Hybrid Cloud Extension) is a VMware technology for workload migration across sites that enables seamless migration of virtual machines and applications between on-premises vSphere environments and VMware Cloud on AWS, providing network extension, storage optimization, and migration orchestration capabilities.

## Overview

HCX (Hybrid Cloud Extension) is VMware's comprehensive hybrid cloud mobility and application portability solution that enables organizations to seamlessly migrate workloads between on-premises vSphere environments and VMware Cloud on AWS (VMC on AWS). HCX provides network extension, storage optimization, and migration orchestration capabilities that ensure business continuity during migration while maintaining application performance and security.

## Key Features

### Workload Mobility
- **Seamless Migration**: Seamless migration of virtual machines
- **Application Continuity**: Maintained application performance during migration
- **Minimal Downtime**: Near-zero downtime migration capabilities
- **Bulk Migration**: Support for bulk workload migration

### Network Extension
- **L2 Network Stretching**: Layer 2 network extension across sites
- **L3 Network Interconnect**: Layer 3 network connectivity
- **Security Preservation**: Preservation of network security policies
- **Traffic Optimization**: Optimized network traffic routing

### Storage Optimization
- **WAN Optimization**: WAN optimization for efficient data transfer
- **Compression**: Data compression for reduced transfer times
- **Deduplication**: Data deduplication for bandwidth efficiency
- **Adaptive Transport**: Adaptive transport protocols

## Architecture

### HCX Components
- **HCX Manager**: Central management and orchestration
- **HCX Interconnect**: Network interconnect appliances
- **HCX WAN Optimization**: WAN optimization appliances
- **HCX Migration Appliances**: Migration coordination appliances

### Architecture Diagram
```
HCX Architecture
├── On-Premises Site
│   ├── vCenter Server
│   ├── HCX Manager (On-Prem)
│   ├── HCX Interconnect
│   │   ├── Network Extension
│   │   ├── L2VPN Service
│   │   └── L3VPN Service
│   ├── HCX WAN Optimization
│   │   ├── WAN Optimization
│   │   ├── Compression
│   │   └── Deduplication
│   ├── HCX Migration Appliances
│   │   ├── vMotion Coordinator
│   │   ├── Replication Manager
│   │   └── Migration Scheduler
│   └── Workload VMs
│       ├── VM 1
│       ├── VM 2
│       └── VM N
├── Cloud Site (VMC on AWS)
│   ├── vCenter Server (Cloud)
│   ├── HCX Manager (Cloud)
│   ├── HCX Interconnect
│   │   ├── Network Extension
│   │   ├── L2VPN Service
│   │   └── L3VPN Service
│   ├── HCX WAN Optimization
│   │   ├── WAN Optimization
│   │   ├── Compression
│   │   └── Deduplication
│   └── Target Environment
│       ├── Compute Resources
│       ├── Storage Resources
│       └── Network Resources
└── HCX Services
    ├── Network Extension Service
    │   ├── L2VPN
    │   ├── L3VPN
    │   └── Security Policies
    ├── Mobility Services
    │   ├── vMotion
    │   ├── Bulk Migration
    │   └── Suspend/Resume
    └── Optimization Services
        ├── WAN Optimization
        ├── Compression
        └── Deduplication
```

### Migration Model
1. **Preparation**: Prepare source and target environments
2. **Network Extension**: Extend networks between sites
3. **Optimization Setup**: Configure WAN optimization
4. **Migration Execution**: Execute workload migration
5. **Validation**: Validate successful migration
6. **Cutover**: Complete migration cutover

## Configuration and Management

### HCX Management
```bash
# Access HCX Manager
https://hcx-manager-onprem.domain.com
https://hcx-manager-cloud.vmware.com

# Register HCX sites via API
curl -X POST "https://hcx-manager-onprem/api/admin/sites" -H "Authorization: Bearer <token>" -d @site-registration.json

# Create network extension
curl -X POST "https://hcx-manager-onprem/api/networking/l2vpn" -H "Authorization: Bearer <token>" -d @l2vpn-config.json

# Initiate workload migration
curl -X POST "https://hcx-manager-onprem/api/migration/vms" -H "Authorization: Bearer <token>" -d @migration-request.json

# Check migration status
curl -X GET "https://hcx-manager-onprem/api/migration/vms/{vm-id}/status" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "hcxConfiguration": {
    "sites": {
      "onPremises": {
        "name": "onprem-site-01",
        "endpoint": "https://hcx-manager-onprem.domain.com",
        "credentials": {
          "username": "hcx-admin",
          "password": "secure-password"
        },
        "network": {
          "management": "192.168.10.0/24",
          "interconnect": "192.168.11.0/24",
          "wanOptimization": "192.168.12.0/24"
        },
        "appliances": {
          "interconnect": 2,
          "wanOptimization": 2,
          "migration": 2
        }
      },
      "cloud": {
        "name": "vmc-aws-site-01",
        "endpoint": "https://hcx-manager-cloud.vmware.com",
        "credentials": {
          "username": "cloud-admin",
          "password": "secure-password"
        },
        "network": {
          "management": "172.16.10.0/24",
          "interconnect": "172.16.11.0/24",
          "wanOptimization": "172.16.12.0/24"
        }
      }
    },
    "networkExtension": {
      "l2vpn": [
        {
          "name": "production-network-extension",
          "sourceNetwork": "vlan-100",
          "targetNetwork": "vlan-100",
          "optimization": {
            "wanOptimization": true,
            "compression": true,
            "deduplication": true
          },
          "security": {
            "firewallRules": "preserve",
            "accessControl": "preserve"
          }
        }
      ],
      "l3vpn": [
        {
          "name": "management-network-interconnect",
          "sourceSubnet": "192.168.1.0/24",
          "targetSubnet": "172.16.1.0/24",
          "routing": {
            "bgp": true,
            "staticRoutes": true
          }
        }
      ]
    },
    "migration": {
      "profiles": [
        {
          "name": "bulk-migration-profile",
          "type": "bulk",
          "vms": ["vm-001", "vm-002", "vm-003"],
          "schedule": "2023-11-01T22:00:00Z",
          "optimization": {
            "wanOptimization": true,
            "compression": true,
            "deduplication": true,
            "adaptiveTransport": true
          },
          "network": {
            "preserveMac": true,
            "preserveIp": true,
            "networkMapping": {
              "source": "Production-Network",
              "target": "Production-Network"
            }
          },
          "storage": {
            "targetDatastore": "vsanDatastore",
            "thinProvisioning": true
          }
        }
      ],
      "policies": {
        "rpo": "24h",
        "rto": "4h",
        "bandwidthLimit": "100Mbps",
        "priority": "medium"
      }
    },
    "monitoring": {
      "healthCheck": true,
      "performanceMonitoring": true,
      "migrationTracking": true,
      "alerting": {
        "thresholds": {
          "bandwidth": "80%",
          "latency": "50ms",
          "packetLoss": "1%"
        },
        "notifications": ["admin@domain.com", "ops@domain.com"]
      }
    }
  }
}
```

### Management Operations
- **Site Management**: Manage HCX site registrations
- **Network Extension**: Configure network extensions
- **Migration Management**: Manage workload migrations
- **Performance Monitoring**: Monitor HCX performance

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Migration**: Faster workload migration
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Network Extension**: Better network extension capabilities
- **AI/ML Integration**: AI-driven migration optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Operations**: Automated migration operations

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Network Planning**: Plan network extension carefully
2. **Bandwidth Management**: Manage bandwidth properly
3. **Security Configuration**: Configure security properly
4. **Monitoring**: Monitor migration progress
5. **Testing**: Test migrations thoroughly
6. **Documentation**: Document migration procedures

## Troubleshooting Commands

```bash
# Check HCX service status
systemctl status hcx-service

# View HCX logs
tail -f /var/log/vmware/hcx/hcx.log

# Check network extension status
curl -X GET "https://hcx-manager-onprem/api/networking/status" -H "Authorization: Bearer <token>"

# Verify appliance connectivity
ping -c 4 hcx-interconnect.domain.com

# Check migration progress
curl -X GET "https://hcx-manager-onprem/api/migration/progress" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [VMware Cloud on AWS](vmware-cloud-on-aws.md) - VMware cloud service on AWS
- [vSphere](vsphere.md) - VMware virtualization platform
- [NSX](nsx.md) - VMware network virtualization
- [vMotion](vmotion.md) - VMware live migration technology