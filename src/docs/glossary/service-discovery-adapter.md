---
term: Service Discovery Adapter
category: VMware_vSphere_Foundation_9
---

Service Discovery Adapter is a component in VMware Cloud Foundation Operations that discovers services and applications in the environment, providing automated identification and inventory of infrastructure components, virtual machines, and application services for comprehensive monitoring and management.

## Overview

The Service Discovery Adapter in VMware Cloud Foundation Operations is a specialized component designed to automatically discover and inventory various services, applications, and infrastructure components within the VCF environment. It continuously scans the infrastructure to identify running services, application dependencies, and resource utilization patterns, enabling proactive monitoring, capacity planning, and automated management of the entire ecosystem.

## Key Features

### Automated Discovery
- **Continuous Scanning**: Continuous infrastructure scanning
- **Service Identification**: Automatic service identification
- **Application Discovery**: Application component discovery
- **Dependency Mapping**: Service dependency mapping

### Comprehensive Inventory
- **Infrastructure Components**: Physical and virtual infrastructure
- **Virtual Machines**: VM discovery and classification
- **Application Services**: Application service identification
- **Network Services**: Network service discovery

### Integration Capabilities
- **Multi-Platform Support**: Support for multiple platforms
- **API Integration**: Integration with various APIs
- **Agent-Based Discovery**: Agent-based discovery mechanisms
- **Agentless Discovery**: Agentless discovery capabilities

## Architecture

### Service Discovery Adapter Components
- **Discovery Engine**: Core discovery processing engine
- **Inventory Manager**: Asset inventory management
- **Integration Layer**: Platform integration components
- **Monitoring Interface**: Monitoring and alerting interface

### Architecture Diagram
```
Service Discovery Adapter
├── Discovery Engine
│   ├── Scanning Modules
│   │   ├── Infrastructure Scanner
│   │   ├── VM Scanner
│   │   ├── Application Scanner
│   │   └── Service Scanner
│   ├── Identification Engine
│   │   ├── Pattern Recognition
│   │   ├── Signature Matching
│   │   └── Heuristic Analysis
│   └── Classification System
│       ├── Service Classification
│       ├── Application Classification
│       └── Resource Classification
├── Inventory Manager
│   ├── Asset Database
│   │   ├── Physical Assets
│   │   ├── Virtual Assets
│   │   ├── Application Assets
│   │   └── Service Assets
│   ├── Relationship Mapping
│   │   ├── Dependency Tracking
│   │   ├── Communication Paths
│   │   └── Resource Allocation
│   └── Change Management
│       ├── Asset Tracking
│       ├── Configuration Management
│       └── Lifecycle Tracking
├── Integration Layer
│   ├── VMware Integration
│   │   ├── vCenter Integration
│   │   ├── NSX Integration
│   │   ├── vSAN Integration
│   │   └── SDDC Manager Integration
│   ├── Cloud Integration
│   │   ├── AWS Integration
│   │   ├── Azure Integration
│   │   └── Google Cloud Integration
│   ├── Application Integration
│   │   ├── Database Integration
│   │   ├── Web Server Integration
│   │   └── Middleware Integration
│   └── Third-Party Integration
│       ├── Monitoring Tools
│       ├── CMDB Integration
│       └── Ticketing Systems
└── Monitoring Interface
    ├── Discovery Monitoring
    │   ├── Scan Progress
    │   ├── Discovery Results
    │   └── Error Tracking
    ├── Alerting System
    │   ├── New Service Alerts
    │   ├── Configuration Change Alerts
    │   └── Dependency Change Alerts
    └── Reporting Engine
        ├── Inventory Reports
        ├── Dependency Reports
        └── Compliance Reports
```

### Discovery Model
1. **Initialization**: Initialize discovery processes
2. **Scanning**: Scan infrastructure components
3. **Identification**: Identify services and applications
4. **Classification**: Classify discovered assets
5. **Inventory Update**: Update asset inventory
6. **Monitoring**: Monitor discovered services

## Configuration and Management

### Adapter Management
```bash
# Configure Service Discovery Adapter via API
curl -X POST "https://vcf-operations/api/v1/discovery/adapter" -H "Authorization: Bearer <token>" -d @adapter-config.json

# View discovery status
curl -X GET "https://vcf-operations/api/v1/discovery/status" -H "Authorization: Bearer <token>"

# Trigger discovery scan
curl -X POST "https://vcf-operations/api/v1/discovery/scan" -H "Authorization: Bearer <token>"

# View discovered services
curl -X GET "https://vcf-operations/api/v1/discovery/services" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "serviceDiscoveryAdapter": {
    "name": "vcf-service-discovery",
    "description": "VCF Service Discovery Adapter",
    "scanning": {
      "schedules": [
        {
          "name": "full-scan",
          "type": "full",
          "frequency": "daily",
          "time": "02:00:00",
          "enabled": true
        },
        {
          "name": "incremental-scan",
          "type": "incremental",
          "frequency": "hourly",
          "enabled": true
        }
      ],
      "scope": {
        "infrastructure": true,
        "virtualMachines": true,
        "applications": true,
        "services": true,
        "network": true,
        "storage": true
      },
      "exclusions": [
        "192.168.100.0/24",
        "test-environment.domain.com"
      ]
    },
    "identification": {
      "methods": [
        {
          "name": "vmware-api",
          "type": "api",
          "platform": "vmware",
          "enabled": true,
          "credentials": {
            "endpoint": "https://vcenter.domain.com",
            "username": "discovery@vsphere.local",
            "password": "secure-password"
          }
        },
        {
          "name": "nsx-api",
          "type": "api",
          "platform": "nsx",
          "enabled": true,
          "credentials": {
            "endpoint": "https://nsx-manager.domain.com",
            "username": "admin",
            "password": "secure-password"
          }
        },
        {
          "name": "agent-based",
          "type": "agent",
          "platform": "linux-windows",
          "enabled": true,
          "deployment": {
            "autoDeploy": true,
            "upgradePolicy": "automatic"
          }
        },
        {
          "name": "snmp-discovery",
          "type": "snmp",
          "platform": "network-storage",
          "enabled": true,
          "credentials": {
            "community": "public",
            "version": "v2c"
          }
        }
      ],
      "classification": {
        "patterns": [
          {
            "name": "web-server",
            "type": "application",
            "criteria": {
              "processes": ["apache", "nginx", "iis"],
              "ports": [80, 443, 8080, 8443]
            }
          },
          {
            "name": "database-server",
            "type": "application",
            "criteria": {
              "processes": ["mysqld", "postgres", "sqlservr"],
              "ports": [3306, 5432, 1433, 1521]
            }
          },
          {
            "name": "application-server",
            "type": "application",
            "criteria": {
              "processes": ["java", "tomcat", "jboss", "weblogic"],
              "ports": [8009, 8080, 8443]
            }
          }
        ],
        "machineLearning": {
          "enabled": true,
          "modelUpdate": "weekly",
          "anomalyDetection": true
        }
      }
    },
    "inventory": {
      "database": {
        "type": "embedded",
        "retention": "90d",
        "backup": {
          "enabled": true,
          "schedule": "daily",
          "location": "/backup/discovery"
        }
      },
      "relationshipMapping": {
        "enabled": true,
        "depth": 3,
        "updateFrequency": "hourly"
      },
      "changeManagement": {
        "tracking": true,
        "alerting": true,
        "notification": ["admin@domain.com", "ops@domain.com"]
      }
    },
    "integration": {
      "monitoring": {
        "vrops": {
          "enabled": true,
          "endpoint": "https://vrops.domain.com",
          "credentials": {
            "username": "admin",
            "password": "secure-password"
          }
        },
        "thirdParty": [
          {
            "name": "splunk",
            "enabled": true,
            "endpoint": "https://splunk.domain.com",
            "token": "splunk-token"
          }
        ]
      },
      "cmdb": {
        "enabled": true,
        "endpoint": "https://cmdb.domain.com",
        "credentials": {
          "username": "cmdb-user",
          "password": "secure-password"
        }
      },
      "ticketing": {
        "enabled": true,
        "system": "servicenow",
        "endpoint": "https://servicenow.domain.com",
        "credentials": {
          "username": "ticketing-user",
          "password": "secure-password"
        }
      }
    },
    "monitoring": {
      "healthCheck": true,
      "performanceMonitoring": true,
      "alerting": {
        "newServices": true,
        "configurationChanges": true,
        "dependencyChanges": true,
        "thresholds": {
          "scanDuration": "2h",
          "discoveryErrors": 5,
          "classificationAccuracy": "95%"
        }
      }
    }
  }
}
```

### Management Operations
- **Discovery Management**: Manage discovery processes
- **Inventory Management**: Manage asset inventory
- **Integration Management**: Manage platform integrations
- **Monitoring Management**: Manage monitoring and alerting

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Faster Discovery**: Improved discovery speed
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Identification**: Better service identification
- **AI/ML Integration**: AI-driven discovery optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Operations**: Automated discovery operations

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Discovery Planning**: Plan discovery scope carefully
2. **Integration Configuration**: Configure integrations properly
3. **Performance Monitoring**: Monitor discovery performance
4. **Security Configuration**: Configure security properly
5. **Change Management**: Implement change management
6. **Documentation**: Document adapter configurations

## Troubleshooting Commands

```bash
# Check adapter status
curl -X GET "https://vcf-operations/api/v1/discovery/adapter/status" -H "Authorization: Bearer <token>"

# View discovery logs
tail -f /var/log/vmware/vcf-operations/discovery.log

# Check scan progress
curl -X GET "https://vcf-operations/api/v1/discovery/scan/progress" -H "Authorization: Bearer <token>"

# Verify API connectivity
curl -X GET "https://vcenter.domain.com/sdk" -u discovery@vsphere.local:password

# View discovered assets
curl -X GET "https://vcf-operations/api/v1/discovery/assets" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [Inventory](inventory.md) - All logical/physical entities managed by VCF
- [vRealize Operations Manager](vrealize-operations-manager.md) - VMware monitoring and analytics
- [SDDC Manager](sddc-manager.md) - Central management platform
- [Telegraf](telegraf.md) - Open-source monitoring agent