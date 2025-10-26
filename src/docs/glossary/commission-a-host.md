---
term: Commission a Host
category: VMware_vSphere_Foundation_9
---

Commission a Host is the process of adding a physical server to the VMware Cloud Foundation inventory as an unassigned host, making it available for allocation to workload domains through hardware validation, software installation, and network configuration.

## Overview

Commissioning a Host in VMware Cloud Foundation is the systematic process of integrating a new physical server into the VCF environment. This process involves validating hardware compatibility, installing VCF-compliant software, configuring network settings, and registering the host in the VCF inventory where it becomes an unassigned host ready for domain allocation.

## Key Features

### Hardware Validation
- **Compatibility Checking**: Validate hardware against VCF Hardware Compatibility List
- **Component Verification**: Verify all hardware components
- **Firmware Validation**: Validate firmware versions
- **Performance Testing**: Test hardware performance

### Software Installation
- **ESXi Installation**: Install VCF-compliant ESXi version
- **Agent Deployment**: Deploy VCF management agents
- **Security Configuration**: Apply security hardening
- **Network Setup**: Configure network interfaces

### Inventory Integration
- **Asset Registration**: Register host in VCF inventory
- **Metadata Recording**: Record hardware and software metadata
- **Status Tracking**: Track commissioning status
- **Health Monitoring**: Enable health monitoring

## Architecture

### Commissioning Process Components
- **Validation Engine**: Hardware and software validation
- **Deployment Manager**: Software deployment management
- **Inventory System**: Asset registration and tracking
- **Monitoring Service**: Health and status monitoring

### Architecture Diagram
```
Commission a Host Process
├── Pre-Commissioning
│   ├── Hardware Procurement
│   ├── Network Preparation
│   └── Inventory Planning
├── Validation Phase
│   ├── Hardware Validation
│   │   ├── HCL Checking
│   │   ├── Component Testing
│   │   ├── Firmware Verification
│   │   └── Performance Baseline
│   └── Environment Validation
│       ├── Network Connectivity
│       ├── Storage Availability
│       └── Power Requirements
├── Deployment Phase
│   ├── ESXi Installation
│   │   ├── Base OS Installation
│   │   ├── VCF Profile Application
│   │   └── Security Hardening
│   └── Agent Deployment
│       ├── Management Agents
│       ├── Monitoring Agents
│       └── Update Agents
├── Integration Phase
│   ├── Inventory Registration
│   │   ├── Asset Tagging
│   │   ├── Metadata Recording
│   │   └── Status Updates
│   └── Network Integration
│       ├── Management Network
│       ├── vMotion Network
│       └── Storage Network
└── Post-Commissioning
    ├── Health Monitoring
    ├── Performance Testing
    └── Availability for Assignment
```

### Commissioning Workflow
1. **Preparation**: Prepare hardware and environment
2. **Validation**: Validate hardware and environment
3. **Deployment**: Deploy software and agents
4. **Integration**: Integrate with VCF systems
5. **Verification**: Verify successful commissioning
6. **Availability**: Make host available for assignment

## Configuration and Management

### Commissioning Management
```bash
# Commission a host via SDDC Manager API
curl -X POST "https://sddc-manager/api/v1/hosts/commission" -H "Authorization: Bearer <token>" -d @commission-request.json

# Check commissioning status
curl -X GET "https://sddc-manager/api/v1/hosts/commission/{commission-id}/status" -H "Authorization: Bearer <token>"

# View commissioning logs
curl -X GET "https://sddc-manager/api/v1/hosts/commission/{commission-id}/logs" -H "Authorization: Bearer <token>"

# Cancel commissioning process
curl -X DELETE "https://sddc-manager/api/v1/hosts/commission/{commission-id}" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "commissionHost": {
    "host": {
      "hostname": "esxi01.new.domain.com",
      "ip": "192.168.10.200",
      "model": "Dell PowerEdge R750",
      "serialNumber": "DEF456UVW",
      "assetTag": "ASSET-002"
    },
    "hardware": {
      "validation": {
        "hclCheck": true,
        "componentTest": true,
        "firmwareVerify": true,
        "performanceTest": true
      },
      "requirements": {
        "cpu": "Intel/AMD x86_64",
        "memory": "128GB+",
        "storage": {
          "boot": "2x SSD 240GB+",
          "cache": "1x NVMe 1TB+",
          "capacity": "2x SSD 3.84TB+"
        },
        "network": {
          "management": "10Gbps+",
          "vmotion": "10Gbps+",
          "storage": "25Gbps+"
        }
      }
    },
    "software": {
      "esxi": {
        "version": "8.0 U2",
        "build": "202310001",
        "profile": "VCF-Standard"
      },
      "agents": {
        "management": true,
        "monitoring": true,
        "update": true,
        "backup": true
      }
    },
    "network": {
      "management": {
        "ip": "192.168.10.200",
        "subnet": "255.255.255.0",
        "gateway": "192.168.10.1",
        "vlan": 100
      },
      "vmotion": {
        "vlan": 101
      },
      "storage": {
        "vlan": 102
      },
      "dns": {
        "servers": ["8.8.8.8", "8.8.4.4"],
        "searchDomains": ["domain.com"]
      }
    },
    "commissioning": {
      "timeout": "2h",
      "retryAttempts": 3,
      "notification": {
        "success": ["admin@domain.com"],
        "failure": ["admin@domain.com", "ops@domain.com"]
      },
      "rollback": {
        "enabled": true,
        "preserveLogs": true
      }
    }
  }
}
```

### Management Operations
- **Commissioning Process**: Execute host commissioning
- **Status Monitoring**: Monitor commissioning progress
- **Error Handling**: Handle commissioning errors
- **Rollback Management**: Manage commissioning rollbacks

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Faster Commissioning**: Improved commissioning speed
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Validation**: Better validation algorithms
- **AI/ML Integration**: AI-driven commissioning optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Remediation**: Automated error resolution

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Pre-Commissioning Planning**: Plan commissioning carefully
2. **Hardware Validation**: Validate hardware thoroughly
3. **Network Preparation**: Prepare networks properly
4. **Software Compatibility**: Ensure software compatibility
5. **Monitoring**: Monitor commissioning progress
6. **Documentation**: Document commissioning procedures

## Troubleshooting Commands

```bash
# Check commissioning status
curl -X GET "https://sddc-manager/api/v1/hosts/commission/status" -H "Authorization: Bearer <token>"

# View commissioning logs
tail -f /var/log/vmware/sddc-manager/host-commission.log

# Validate hardware compatibility
esxcli hardware platform get

# Check network connectivity
ping -c 4 sddc-manager.domain.com

# Verify ESXi installation
esxcli system version get
```

## Related Technologies

- [Unassigned Host](unassigned-host.md) - Host in free pool not belonging to any domain
- [Free Pool](free-pool.md) - Repository of unassigned hosts
- [Decommission a Host](decommission-a-host.md) - Removes unassigned host from VCF inventory
- [Dirty Host](dirty-host.md) - Removed host needing re-imaging