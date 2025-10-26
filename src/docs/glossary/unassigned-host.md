---
term: Unassigned Host
category: VMware_vSphere_Foundation_9
---

Unassigned Host is a host in the VMware Cloud Foundation free pool that is not currently belonging to any domain, representing a commissioned physical server that is available for allocation to workload domains.

## Overview

An Unassigned Host in VMware Cloud Foundation refers to a physical ESXi server that has been successfully commissioned into the VCF inventory but has not yet been allocated to any specific management or workload domain. These hosts exist in the free pool and are ready for deployment to expand existing domains or create new ones, providing organizations with flexible infrastructure scaling capabilities.

## Key Features

### Commissioned Status
- **Inventory Integration**: Fully integrated into VCF inventory
- **Hardware Validation**: Hardware has been validated and certified
- **Software Installation**: Required VCF software has been installed
- **Network Configuration**: Network connectivity has been established

### Ready for Deployment
- **Immediate Availability**: Available for immediate domain assignment
- **Pre-Configured**: Pre-configured with VCF-standard settings
- **Health Monitoring**: Continuously monitored for health status
- **Maintenance Ready**: Ready for maintenance operations

### Resource Management
- **Capacity Expansion**: Available for capacity expansion
- **Domain Creation**: Can be used for new domain creation
- **Scaling Operations**: Supports scaling operations
- **Resource Optimization**: Enables resource optimization

## Architecture

### Unassigned Host Components
- **Hardware Platform**: Physical server hardware
- **ESXi Installation**: VCF-compliant ESXi installation
- **Network Connectivity**: Management and data network connectivity
- **Storage Configuration**: Local storage configuration

### Architecture Diagram
```
Unassigned Host
├── Hardware Layer
│   ├── Server Hardware
│   │   ├── CPU (2x Intel/AMD)
│   │   ├── Memory (256GB+)
│   │   ├── Local Storage
│   │   │   ├── Boot Devices (2x SSD)
│   │   │   ├── Cache Tier (NVMe)
│   │   │   └── Capacity Tier (SSD/HDD)
│   │   └── Network Adapters
│   │       ├── Management NICs
│   │       ├── vMotion NICs
│   │       └── Storage NICs
├── Software Layer
│   ├── ESXi OS
│   │   ├── VCF-Compliant Version
│   │   ├── Pre-Configured Settings
│   │   └── Security Hardening
│   ├── VCF Agents
│   │   ├── Management Agents
│   │   ├── Monitoring Agents
│   │   └── Update Agents
│   └── Configuration
│       ├── Network Configuration
│       ├── Storage Configuration
│       └── Security Configuration
├── Network Layer
│   ├── Management Network
│   ├── vMotion Network
│   ├── Storage Network
│   └── Data Networks
└── Integration Layer
    ├── SDDC Manager Integration
    ├── vCenter Integration
    └── Lifecycle Manager Integration
```

### Host Lifecycle Model
1. **Hardware Procurement**: Physical server procurement
2. **Commissioning**: Commission host into VCF inventory
3. **Validation**: Validate hardware and software
4. **Integration**: Integrate with VCF management
5. **Unassigned State**: Enter unassigned host state
6. **Domain Assignment**: Assign to domain when needed

## Configuration and Management

### Host Management
```bash
# View unassigned hosts via SDDC Manager API
curl -X GET "https://sddc-manager/api/v1/hosts?status=unassigned" -H "Authorization: Bearer <token>"

# Get specific unassigned host details
curl -X GET "https://sddc-manager/api/v1/hosts/{host-id}?status=unassigned" -H "Authorization: Bearer <token>"

# Assign host to domain
curl -X POST "https://sddc-manager/api/v1/hosts/{host-id}/assign" -H "Authorization: Bearer <token>" -d @assignment-config.json

# Check host health
curl -X GET "https://sddc-manager/api/v1/hosts/{host-id}/health" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "unassignedHost": {
    "id": "host-12345",
    "hostname": "esxi01.unassigned.domain.com",
    "ip": "192.168.10.100",
    "model": "Dell PowerEdge R750",
    "serialNumber": "ABC123XYZ",
    "assetTag": "ASSET-001",
    "commissioned": "2023-10-15T14:30:00Z",
    "status": "unassigned",
    "hardware": {
      "cpu": {
        "count": 2,
        "model": "Intel Xeon Silver 4314",
        "cores": 16,
        "threads": 32
      },
      "memory": {
        "size": "256GB",
        "speed": "3200MHz",
        "type": "DDR4"
      },
      "storage": {
        "boot": [
          {
            "type": "SSD",
            "size": "240GB",
            "model": "Dell BOSS-S1"
          }
        ],
        "cache": [
          {
            "type": "NVMe",
            "size": "1.92TB",
            "model": "Dell DC NVMe"
          }
        ],
        "capacity": [
          {
            "type": "SSD",
            "size": "7.68TB",
            "model": "Dell DC SSD"
          },
          {
            "type": "SSD",
            "size": "7.68TB",
            "model": "Dell DC SSD"
          }
        ]
      },
      "network": {
        "management": [
          {
            "interface": "vmnic0",
            "speed": "10Gbps",
            "model": "Intel X710"
          }
        ],
        "vmotion": [
          {
            "interface": "vmnic1",
            "speed": "10Gbps",
            "model": "Intel X710"
          }
        ],
        "storage": [
          {
            "interface": "vmnic2",
            "speed": "25Gbps",
            "model": "Mellanox ConnectX-6"
          }
        ]
      }
    },
    "software": {
      "esxiVersion": "8.0 U2",
      "build": "202310001",
      "vcfCompliant": true,
      "securityProfile": "locked-down"
    },
    "network": {
      "managementIp": "192.168.10.100",
      "managementGateway": "192.168.10.1",
      "managementSubnet": "255.255.255.0",
      "dnsServers": ["8.8.8.8", "8.8.4.4"]
    }
  }
}
```

### Management Operations
- **Health Monitoring**: Monitor host health status
- **Maintenance Operations**: Perform maintenance tasks
- **Assignment Management**: Manage domain assignments
- **Decommissioning**: Decommission hosts when needed

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Commissioning**: Faster host commissioning
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Validation**: Better hardware validation
- **AI/ML Integration**: AI-driven health monitoring
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Maintenance**: Automated maintenance operations

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Host Sizing**: Maintain appropriate unassigned host inventory
2. **Health Monitoring**: Monitor host health continuously
3. **Maintenance Scheduling**: Schedule maintenance proactively
4. **Security Management**: Maintain security compliance
5. **Documentation**: Document host configurations
6. **Capacity Planning**: Plan for future capacity needs

## Troubleshooting Commands

```bash
# Check unassigned host status
curl -X GET "https://sddc-manager/api/v1/hosts?status=unassigned" -H "Authorization: Bearer <token>"

# View host health
curl -X GET "https://sddc-manager/api/v1/hosts/{host-id}/health" -H "Authorization: Bearer <token>"

# Check commissioning logs
tail -f /var/log/vmware/sddc-manager/host-commissioning.log

# Validate host configuration
curl -X POST "https://sddc-manager/api/v1/hosts/{host-id}/validate" -H "Authorization: Bearer <token>"

# View host network connectivity
esxcli network ip interface list
```

## Related Technologies

- [Free Pool](free-pool.md) - Repository of unassigned hosts
- [Commission a Host](commission-a-host.md) - Adds host to VCF inventory as unassigned
- [Decommission a Host](decommission-a-host.md) - Removes unassigned host from VCF inventory
- [Dirty Host](dirty-host.md) - Removed host needing re-imaging