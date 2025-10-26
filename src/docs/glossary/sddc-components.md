---
term: SDDC Components
category: VMware_vSphere_Foundation_9
---

SDDC Components are the software-defined elements including compute, storage, and network virtualization technologies that form the foundation of VMware Cloud Foundation, providing the building blocks for software-defined data center infrastructure.

## Overview

SDDC Components in VMware Cloud Foundation represent the core software-defined technologies that enable the transformation of traditional hardware-centric data centers into agile, automated, and policy-driven software-defined environments. These components work together to provide compute virtualization, storage virtualization, and network virtualization capabilities that form the basis of the modern software-defined data center.

## Key Features

### Software-Defined Compute
- **vSphere Virtualization**: VMware vSphere compute virtualization
- **Resource Pooling**: Pooling of physical compute resources
- **Dynamic Allocation**: Dynamic resource allocation and management
- **High Availability**: Built-in high availability and fault tolerance

### Software-Defined Storage
- **vSAN Storage**: VMware vSAN software-defined storage
- **Policy-Based Management**: Storage policy-based management
- **Data Services**: Integrated data services and protection
- **Scalability**: Elastic storage scaling capabilities

### Software-Defined Networking
- **NSX Network Virtualization**: VMware NSX-T network virtualization
- **Micro-Segmentation**: Network security micro-segmentation
- **Load Balancing**: Software load balancing services
- **Network Automation**: Automated network provisioning

## Architecture

### SDDC Components Architecture
- **Compute Layer**: Virtualization and resource management
- **Storage Layer**: Software-defined storage services
- **Network Layer**: Network virtualization and security
- **Management Layer**: Centralized management and orchestration

### Architecture Diagram
```
SDDC Components
├── Compute Virtualization (vSphere)
│   ├── ESXi Hypervisor
│   │   ├── VM Kernel
│   │   ├── Resource Scheduler
│   │   └── Device Drivers
│   ├── vCenter Server
│   │   ├── Inventory Management
│   │   ├── Policy Engine
│   │   └── Automation Services
│   ├── Resource Management
│   │   ├── DRS (Distributed Resource Scheduler)
│   │   ├── HA (High Availability)
│   │   └── DPM (Distributed Power Management)
│   └── VM Management
│       ├── VM Lifecycle
│       ├── Template Management
│       └── Snapshot Management
├── Storage Virtualization (vSAN)
│   ├── Storage Cluster
│   │   ├── Host Storage
│   │   ├── Disk Groups
│   │   └── Storage Policies
│   ├── Data Services
│   │   ├── Replication
│   │   ├── Deduplication
│   │   └── Compression
│   ├── Data Protection
│   │   ├── RAID Protection
│   │   ├── Erasure Coding
│   │   └── Failure Domains
│   └── Storage Management
│       ├── Policy Management
│       ├── Performance Monitoring
│       └── Capacity Management
├── Network Virtualization (NSX)
│   ├── Network Virtualization
│   │   ├── Logical Switching
│   │   ├── Routing
│   │   └── Gateway Services
│   ├── Network Security
│   │   ├── Micro-Segmentation
│   │   ├── Firewall
│   │   └── Intrusion Detection
│   ├── Network Services
│   │   ├── Load Balancing
│   │   ├── NAT
│   │   └── VPN
│   └── Network Automation
│       ├── Provisioning
│       ├── Policy Enforcement
│       └── Monitoring
└── Management & Orchestration
    ├── SDDC Manager
    │   ├── Lifecycle Management
    │   ├── Monitoring
    │   └── Automation
    ├── vRealize Suite
    │   ├── Operations Management
    │   ├── Automation
    │   └── Log Intelligence
    └── API Services
        ├── REST APIs
        ├── SDKs
        └── Integration Services
```

### Component Integration Model
1. **Layer Integration**: Integration between compute, storage, and network layers
2. **Policy Orchestration**: Policy-driven orchestration across components
3. **Unified Management**: Centralized management of all components
4. **Automated Operations**: Automated lifecycle operations
5. **Monitoring & Analytics**: Unified monitoring and analytics
6. **Security Integration**: Integrated security across all layers

## Configuration and Management

### Component Management
```bash
# View SDDC components via SDDC Manager API
curl -X GET "https://sddc-manager/api/v1/components" -H "Authorization: Bearer <token>"

# Get component health status
curl -X GET "https://sddc-manager/api/v1/components/health" -H "Authorization: Bearer <token>"

# Update component configuration
curl -X PUT "https://sddc-manager/api/v1/components/{component-id}" -H "Authorization: Bearer <token>" -d @component-config.json

# Trigger component upgrade
curl -X POST "https://sddc-manager/api/v1/components/{component-id}/upgrade" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "sddcComponents": {
    "compute": {
      "vSphere": {
        "version": "8.0 U2",
        "build": "202310001",
        "components": [
          {
            "name": "ESXi",
            "version": "8.0 U2",
            "hosts": 50,
            "features": {
              "drs": true,
              "ha": true,
              "dpm": true,
              "ft": true,
              "vmEncryption": true
            }
          },
          {
            "name": "vCenter Server",
            "version": "8.0 U2",
            "instances": 3,
            "features": {
              "inventoryManagement": true,
              "policyEngine": true,
              "automation": true,
              "monitoring": true
            }
          }
        ],
        "policies": {
          "resourceAllocation": "fair-share",
          "vmPlacement": "automated",
          "powerManagement": "optimized"
        }
      }
    },
    "storage": {
      "vSAN": {
        "version": "8.0 U2",
        "build": "202310001",
        "clusters": 5,
        "capacity": "500TB",
        "features": {
          "policyBasedManagement": true,
          "dataDeduplication": true,
          "dataCompression": true,
          "erasureCoding": true,
          "fileServices": true,
          "iscsiTarget": true
        },
        "policies": {
          "dataProtection": "raid1",
          "performance": "high",
          "capacity": "deduplicated"
        }
      }
    },
    "network": {
      "NSX": {
        "version": "4.1.0",
        "build": "202310001",
        "managers": 2,
        "features": {
          "logicalSwitching": true,
          "distributedFirewall": true,
          "loadBalancing": true,
          "microSegmentation": true,
          "vpn": true,
          "ids": true
        },
        "policies": {
          "security": "micro-segmented",
          "routing": "dynamic",
          "services": "automated"
        }
      }
    },
    "management": {
      "SDDCManager": {
        "version": "4.5.0",
        "build": "202310001",
        "features": {
          "lifecycleManagement": true,
          "monitoring": true,
          "automation": true,
          "compliance": true
        }
      },
      "vRealize": {
        "version": "8.10",
        "components": [
          {
            "name": "vRealize Operations",
            "features": {
              "performanceMonitoring": true,
              "capacityPlanning": true,
              "analytics": true
            }
          },
          {
            "name": "vRealize Automation",
            "features": {
              "selfService": true,
              "workflowAutomation": true,
              "policyEnforcement": true
            }
          }
        ]
      }
    },
    "integration": {
      "apiConnectivity": true,
      "sdkAvailability": true,
      "thirdPartyIntegration": true,
      "monitoringIntegration": true
    }
  }
}
```

### Management Operations
- **Component Monitoring**: Monitor component health and performance
- **Lifecycle Management**: Manage component lifecycle operations
- **Policy Management**: Manage policies across components
- **Integration Management**: Manage component integrations

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Virtualization**: Better compute virtualization
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Integration**: Better component integration
- **AI/ML Integration**: AI-driven component optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Operations**: Automated component operations

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Component Sizing**: Size components appropriately
2. **Policy Design**: Design consistent policies
3. **Monitoring**: Monitor component health continuously
4. **Security**: Implement proper security controls
5. **Backup**: Regular backup of component configurations
6. **Documentation**: Document component configurations

## Troubleshooting Commands

```bash
# Check SDDC components status
curl -X GET "https://sddc-manager/api/v1/components/status" -H "Authorization: Bearer <token>"

# View component health
curl -X GET "https://sddc-manager/api/v1/components/health" -H "Authorization: Bearer <token>"

# Check vSphere health
esxcli system health status get

# Verify vSAN status
esxcli vsan cluster get

# Check NSX connectivity
ping -c 4 nsx-manager.domain.com
```

## Related Technologies

- [vSphere](vsphere.md) - VMware virtualization platform
- [vSAN](vsan.md) - VMware software-defined storage
- [NSX](nsx.md) - VMware network virtualization
- [SDDC Manager](sddc-manager.md) - Central management platform