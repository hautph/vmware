---
term: Availability Zone
category: VMware_vSphere_Foundation_9
---

Availability Zone is an isolated infrastructure set in VMware Cloud Foundation for failure isolation that uses vSAN stretched clusters to provide fault tolerance and disaster recovery capabilities across geographically separated locations.

## Overview

An Availability Zone in VMware Cloud Foundation represents a physically isolated infrastructure boundary designed to provide high availability and disaster recovery capabilities. Each Availability Zone typically consists of a vSAN Stretched Cluster that spans multiple physical locations or data centers, ensuring that workloads can continue operating even in the event of a complete site failure. This architecture provides fault tolerance, data protection, and business continuity for mission-critical applications.

## Key Features

### Fault Isolation
- **Physical Separation**: Geographically separated infrastructure
- **Independent Power**: Independent power sources and cooling
- **Network Isolation**: Separate network infrastructure
- **Storage Redundancy**: Distributed storage across sites

### High Availability
- **Site Failure Protection**: Protection against complete site failures
- **Automatic Failover**: Automatic workload failover capabilities
- **Data Synchronization**: Real-time data synchronization
- **Load Distribution**: Balanced workload distribution

### Disaster Recovery
- **RPO/RTO Optimization**: Optimized recovery point and time objectives
- **Data Protection**: Comprehensive data protection
- **Business Continuity**: Ensured business continuity
- **Recovery Orchestration**: Automated recovery orchestration

## Architecture

### Availability Zone Components
- **Stretched Cluster**: vSAN Stretched Cluster architecture
- **Witness Host**: Third-site witness for quorum
- **Network Infrastructure**: Stretched network infrastructure
- **Storage Infrastructure**: Distributed storage architecture

### Architecture Diagram
```
Availability Zone (vSAN Stretched Cluster)
├── Site A (Primary)
│   ├── ESXi Hosts
│   │   ├── Host A1
│   │   ├── Host A2
│   │   └── Host A3
│   ├── Local Storage
│   │   ├── Cache Tier (NVMe)
│   │   └── Capacity Tier (SSD)
│   ├── Network Infrastructure
│   │   ├── Management Network
│   │   ├── vMotion Network
│   │   └── Storage Network
│   └── Workload VMs
├── Site B (Secondary)
│   ├── ESXi Hosts
│   │   ├── Host B1
│   │   ├── Host B2
│   │   └── Host B3
│   ├── Local Storage
│   │   ├── Cache Tier (NVMe)
│   │   └── Capacity Tier (SSD)
│   ├── Network Infrastructure
│   │   ├── Management Network
│   │   ├── vMotion Network
│   │   └── Storage Network
│   └── Workload VMs
├── Site C (Witness)
│   ├── Witness Host
│   │   ├── Witness Appliance
│   │   └── Quorum Services
│   └── Network Connectivity
│       ├── Site A Connection
│       └── Site B Connection
└── Stretched Services
    ├── vSAN Stretched Cluster
    │   ├── Data Synchronization
    │   ├── Witness Quorum
    │   └── Failover Management
    ├── Network Stretching
    │   ├── L2 Extension
    │   ├── L3 Routing
    │   └── Traffic Optimization
    └── Management Services
        ├── vCenter Server
        ├── NSX Manager
        └── SDDC Manager
```

### Availability Zone Model
1. **Site Configuration**: Configure multiple physical sites
2. **Stretched Cluster**: Deploy vSAN Stretched Cluster
3. **Witness Setup**: Configure witness host for quorum
4. **Network Stretching**: Implement stretched network infrastructure
5. **Workload Deployment**: Deploy workloads across sites
6. **Monitoring**: Monitor availability zone health

## Configuration and Management

### Availability Zone Management
```bash
# Create availability zone via SDDC Manager API
curl -X POST "https://sddc-manager/api/v1/availability-zones" -H "Authorization: Bearer <token>" -d @availability-zone-config.json

# View availability zone details
curl -X GET "https://sddc-manager/api/v1/availability-zones/{az-id}" -H "Authorization: Bearer <token>"

# Check availability zone health
curl -X GET "https://sddc-manager/api/v1/availability-zones/{az-id}/health" -H "Authorization: Bearer <token>"

# Trigger failover test
curl -X POST "https://sddc-manager/api/v1/availability-zones/{az-id}/failover/test" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "availabilityZone": {
    "name": "az-production-01",
    "description": "Production Availability Zone",
    "sites": [
      {
        "name": "site-a-primary",
        "location": "Datacenter A",
        "role": "primary",
        "hosts": [
          {
            "hostname": "esxi01.sitea.domain.com",
            "ip": "192.168.10.11",
            "site": "site-a"
          },
          {
            "hostname": "esxi02.sitea.domain.com",
            "ip": "192.168.10.12",
            "site": "site-a"
          },
          {
            "hostname": "esxi03.sitea.domain.com",
            "ip": "192.168.10.13",
            "site": "site-a"
          }
        ],
        "storage": {
          "vsan": {
            "enabled": true,
            "diskGroup": {
              "cacheTier": [
                {
                  "type": "NVMe",
                  "size": "1.92TB"
                }
              ],
              "capacityTier": [
                {
                  "type": "SSD",
                  "size": "7.68TB"
                },
                {
                  "type": "SSD",
                  "size": "7.68TB"
                }
              ]
            }
          }
        },
        "network": {
          "management": {
            "gateway": "192.168.10.1",
            "subnetMask": "255.255.255.0",
            "vlanId": 100
          },
          "vmotion": {
            "gateway": "192.168.11.1",
            "subnetMask": "255.255.255.0",
            "vlanId": 101
          },
          "storage": {
            "gateway": "192.168.12.1",
            "subnetMask": "255.255.255.0",
            "vlanId": 102
          }
        }
      },
      {
        "name": "site-b-secondary",
        "location": "Datacenter B",
        "role": "secondary",
        "hosts": [
          {
            "hostname": "esxi01.siteb.domain.com",
            "ip": "192.168.20.11",
            "site": "site-b"
          },
          {
            "hostname": "esxi02.siteb.domain.com",
            "ip": "192.168.20.12",
            "site": "site-b"
          },
          {
            "hostname": "esxi03.siteb.domain.com",
            "ip": "192.168.20.13",
            "site": "site-b"
          }
        ],
        "storage": {
          "vsan": {
            "enabled": true,
            "diskGroup": {
              "cacheTier": [
                {
                  "type": "NVMe",
                  "size": "1.92TB"
                }
              ],
              "capacityTier": [
                {
                  "type": "SSD",
                  "size": "7.68TB"
                },
                {
                  "type": "SSD",
                  "size": "7.68TB"
                }
              ]
            }
          }
        },
        "network": {
          "management": {
            "gateway": "192.168.20.1",
            "subnetMask": "255.255.255.0",
            "vlanId": 200
          },
          "vmotion": {
            "gateway": "192.168.21.1",
            "subnetMask": "255.255.255.0",
            "vlanId": 201
          },
          "storage": {
            "gateway": "192.168.22.1",
            "subnetMask": "255.255.255.0",
            "vlanId": 202
          }
        }
      },
      {
        "name": "site-c-witness",
        "location": "Datacenter C",
        "role": "witness",
        "hosts": [
          {
            "hostname": "witness01.sitec.domain.com",
            "ip": "192.168.30.10",
            "site": "site-c"
          }
        ],
        "network": {
          "management": {
            "gateway": "192.168.30.1",
            "subnetMask": "255.255.255.0",
            "vlanId": 300
          }
        }
      }
    ],
    "stretchedCluster": {
      "name": "stretched-cluster-01",
      "primarySite": "site-a-primary",
      "secondarySite": "site-b-secondary",
      "witnessSite": "site-c-witness",
      "failoverPolicy": "automated",
      "rpo": "30s",
      "rto": "5m"
    },
    "networking": {
      "stretchedNetworks": [
        {
          "name": "production-network",
          "type": "L2-extended",
          "vlanId": 400,
          "sites": ["site-a", "site-b"]
        }
      ],
      "routing": {
        "bgp": {
          "enabled": true,
          "asNumber": 65001,
          "neighbors": [
            {
              "ip": "10.0.0.1",
              "asNumber": 65000
            }
          ]
        }
      }
    },
    "monitoring": {
      "healthCheck": true,
      "performanceMonitoring": true,
      "failoverTesting": {
        "schedule": "monthly",
        "notification": ["admin@domain.com"]
      }
    }
  }
}
```

### Management Operations
- **Zone Management**: Create and manage availability zones
- **Health Monitoring**: Monitor zone health and performance
- **Failover Testing**: Test failover capabilities
- **Capacity Planning**: Plan for zone capacity needs

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Synchronization**: Faster data synchronization
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Protection**: Better data protection
- **AI/ML Integration**: AI-driven availability optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Remediation**: Automated issue resolution

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Site Design**: Design sites for optimal isolation
2. **Network Planning**: Plan network stretching carefully
3. **Storage Configuration**: Configure storage properly
4. **Monitoring**: Monitor zone health continuously
5. **Testing**: Regular failover testing
6. **Documentation**: Document zone configurations

## Troubleshooting Commands

```bash
# Check availability zone status
curl -X GET "https://sddc-manager/api/v1/availability-zones/status" -H "Authorization: Bearer <token>"

# View zone health
curl -X GET "https://sddc-manager/api/v1/availability-zones/{az-id}/health" -H "Authorization: Bearer <token>"

# Check stretched cluster status
esxcli vsan cluster get

# Verify witness connectivity
ping -c 4 witness01.sitec.domain.com

# View failover logs
tail -f /var/log/vmware/sddc-manager/availability-zone.log
```

## Related Technologies

- [vSAN Stretched Cluster](vsan-stretched-cluster.md) - Stretched cluster technology
- [Management Domain](management-domain.md) - Hosts core management VMs
- [Workload Domain](workload-domain.md) - Container for customer workloads
- [SDDC Manager](sddc-manager.md) - Central management platform