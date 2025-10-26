---
term: Free Pool
category: VMware_vSphere_Foundation_9
---

Free Pool is a repository of unassigned hosts in VMware Cloud Foundation that are available for allocation to workload domains, providing a flexible resource pool for dynamic infrastructure scaling and deployment.

## Overview

The Free Pool in VMware Cloud Foundation represents a collection of physical ESXi hosts that have been commissioned into the VCF inventory but are not yet assigned to any specific domain or workload. These hosts serve as a readily available resource pool that can be dynamically allocated to workload domains as needed, enabling flexible infrastructure scaling and efficient resource utilization.

## Key Features

### Resource Flexibility
- **Dynamic Allocation**: Dynamic allocation of hosts to domains
- **Resource Pooling**: Centralized resource pooling
- **Elastic Scaling**: Elastic infrastructure scaling
- **Efficient Utilization**: Efficient resource utilization

### Management Capabilities
- **Host Commissioning**: Commissioning of new hosts
- **Availability Tracking**: Tracking of available hosts
- **Resource Reservation**: Resource reservation capabilities
- **Capacity Planning**: Capacity planning support

### Operational Benefits
- **Rapid Deployment**: Rapid deployment of new workloads
- **Reduced Provisioning Time**: Reduced infrastructure provisioning time
- **Cost Optimization**: Cost optimization through resource sharing
- **Simplified Management**: Simplified host management

## Architecture

### Free Pool Components
- **Host Repository**: Repository of unassigned hosts
- **Commissioning Engine**: Host commissioning mechanisms
- **Allocation Manager**: Host allocation management
- **Tracking System**: Host availability tracking

### Architecture Diagram
```
Free Pool
├── Host Repository
│   ├── Available Hosts
│   │   ├── Host 1 (ESXi 8.0)
│   │   ├── Host 2 (ESXi 8.0)
│   │   ├── Host 3 (ESXi 8.0)
│   │   └── Host N (ESXi 8.0)
│   ├── Reserved Hosts
│   │   ├── Host A (Reserved for Domain X)
│   │   └── Host B (Reserved for Domain Y)
│   └── Maintenance Hosts
│       ├── Host M1 (Under Maintenance)
│       └── Host M2 (Hardware Issue)
├── Commissioning Engine
│   ├── Host Discovery
│   ├── Hardware Validation
│   ├── Software Installation
│   └── Inventory Integration
├── Allocation Manager
│   ├── Domain Assignment
│   ├── Resource Reservation
│   ├── Scaling Operations
│   └── Load Balancing
├── Tracking System
│   ├── Availability Tracking
│   ├── Status Monitoring
│   ├── Health Checking
│   └── Performance Monitoring
└── Integration Layer
    ├── VCF Integration
    ├── vCenter Integration
    └── Lifecycle Manager Integration
```

### Pool Management Model
1. **Host Commissioning**: Commission new hosts into free pool
2. **Availability Tracking**: Track host availability and status
3. **Resource Reservation**: Reserve hosts for specific domains
4. **Domain Assignment**: Assign hosts to workload domains
5. **Maintenance Management**: Manage host maintenance
6. **Capacity Planning**: Plan for future capacity needs

## Configuration and Management

### Free Pool Management
```bash
# View free pool status via SDDC Manager API
curl -X GET "https://sddc-manager/api/v1/free-pool" -H "Authorization: Bearer <token>"

# Get available hosts
curl -X GET "https://sddc-manager/api/v1/free-pool/hosts?status=available" -H "Authorization: Bearer <token>"

# Reserve hosts for domain
curl -X POST "https://sddc-manager/api/v1/free-pool/reserve" -H "Authorization: Bearer <token>" -d @reservation-request.json

# Assign hosts to domain
curl -X POST "https://sddc-manager/api/v1/free-pool/assign" -H "Authorization: Bearer <token>" -d @assignment-request.json
```

### Configuration Example
```json
{
  "freePool": {
    "name": "enterprise-free-pool",
    "description": "Enterprise VCF Free Pool",
    "hosts": [
      {
        "id": "host-001",
        "hostname": "esxi01.free.domain.com",
        "ip": "192.168.10.11",
        "model": "Dell R750",
        "cpu": "2x Intel Xeon Silver 4314",
        "memory": "256GB",
        "storage": "2x 1.92TB SSD + 4x 3.84TB NVMe",
        "status": "available",
        "commissioned": "2023-10-01T10:00:00Z"
      },
      {
        "id": "host-002",
        "hostname": "esxi02.free.domain.com",
        "ip": "192.168.10.12",
        "model": "HPE ProLiant DL385",
        "cpu": "2x AMD EPYC 7313",
        "memory": "256GB",
        "storage": "2x 1.92TB SSD + 4x 3.84TB NVMe",
        "status": "available",
        "commissioned": "2023-10-01T10:00:00Z"
      }
    ],
    "reservation": {
      "enabled": true,
      "autoReservation": true,
      "reservationTimeout": "24h",
      "notification": {
        "threshold": "10%",
        "recipients": ["admin@domain.com", "ops@domain.com"]
      }
    },
    "allocation": {
      "autoAllocation": true,
      "loadBalancing": "round-robin",
      "scalingPolicy": "elastic",
      "approvalRequired": false
    },
    "tracking": {
      "healthMonitoring": true,
      "performanceTracking": true,
      "maintenanceScheduling": true,
      "capacityPlanning": true
    }
  }
}
```

### Management Operations
- **Host Commissioning**: Commission new hosts to free pool
- **Availability Management**: Manage host availability
- **Reservation Management**: Manage host reservations
- **Allocation Management**: Manage host allocations

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Commissioning**: Faster host commissioning
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Allocation**: Better allocation algorithms
- **AI/ML Integration**: AI-driven resource optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Scaling**: Automated scaling operations

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Pool Sizing**: Maintain appropriate free pool size
2. **Commissioning Process**: Standardize host commissioning
3. **Reservation Management**: Manage reservations properly
4. **Capacity Planning**: Plan for future capacity needs
5. **Health Monitoring**: Monitor host health continuously
6. **Documentation**: Document pool configurations

## Troubleshooting Commands

```bash
# Check free pool status
curl -X GET "https://sddc-manager/api/v1/free-pool/status" -H "Authorization: Bearer <token>"

# View available hosts
curl -X GET "https://sddc-manager/api/v1/free-pool/hosts?status=available" -H "Authorization: Bearer <token>"

# Check commissioning logs
tail -f /var/log/vmware/sddc-manager/commissioning.log

# Validate free pool configuration
curl -X POST "https://sddc-manager/api/v1/free-pool/validate" -H "Authorization: Bearer <token>"

# View pool statistics
curl -X GET "https://sddc-manager/api/v1/free-pool/statistics" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [Unassigned Host](unassigned-host.md) - Host in free pool not belonging to any domain
- [Commission a Host](commission-a-host.md) - Adds host to VCF inventory as unassigned
- [Decommission a Host](decommission-a-host.md) - Removes unassigned host from VCF inventory
- [Inventory](inventory.md) - All logical/physical entities managed by VCF