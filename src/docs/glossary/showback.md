---
term: Showback
category: VMware_vSphere_Foundation_9
---

Showback is a cost tracking mechanism in VMware Cloud Foundation Operations that provides visibility into resource consumption and usage patterns without implementing billing, enabling organizations to understand and optimize their infrastructure resource allocation and utilization.

## Overview

Showback in VMware Cloud Foundation Operations is a financial management capability that tracks and reports on resource consumption across the infrastructure without directly charging or billing users. It provides detailed visibility into how compute, storage, and network resources are consumed by different business units, projects, or applications, enabling better capacity planning, resource optimization, and informed decision-making regarding infrastructure investments.

## Key Features

### Resource Consumption Tracking
- **Multi-Dimensional Tracking**: Track consumption by business unit, project, or application
- **Resource Granularity**: Track CPU, memory, storage, and network usage
- **Time-Based Analysis**: Analyze consumption patterns over time
- **Trend Analysis**: Identify usage trends and patterns

### Cost Visibility
- **Cost Allocation**: Allocate infrastructure costs to consuming entities
- **Chargeback Simulation**: Simulate chargeback scenarios without actual billing
- **Budget Planning**: Support budget planning and forecasting
- **ROI Analysis**: Analyze return on investment for resources

### Reporting and Analytics
- **Custom Reports**: Generate custom consumption reports
- **Dashboards**: Interactive consumption dashboards
- **Alerts**: Consumption threshold alerts
- **Export Capabilities**: Export data for external analysis

## Architecture

### Showback Components
- **Data Collection Engine**: Resource usage data collection
- **Cost Calculation Engine**: Cost allocation and calculation
- **Reporting Interface**: Reporting and visualization interface
- **Integration Layer**: Integration with monitoring and management systems

### Architecture Diagram
```
Showback Architecture
├── Data Collection Layer
│   ├── Resource Metrics
│   │   ├── CPU Usage
│   │   ├── Memory Usage
│   │   ├── Storage Usage
│   │   └── Network Usage
│   ├── Infrastructure Metrics
│   │   ├── Host Utilization
│   │   ├── Cluster Performance
│   │   ├── Datastore Capacity
│   │   └── Network Bandwidth
│   ├── Application Metrics
│   │   ├── VM Performance
│   │   ├── Container Usage
│   │   └── Service Consumption
│   └── Business Metrics
│       ├── Business Unit Usage
│       ├── Project Consumption
│       └── Department Allocation
├── Processing Layer
│   ├── Data Aggregation
│   │   ├── Time-Based Aggregation
│   │   ├── Resource-Based Aggregation
│   │   └── Entity-Based Aggregation
│   ├── Cost Calculation
│   │   ├── Resource Pricing
│   │   ├── Infrastructure Costs
│   │   └── Service Costs
│   └── Allocation Engine
│       ├── Cost Allocation
│       ├── Usage Distribution
│       └── Chargeback Modeling
├── Storage Layer
│   ├── Time Series Database
│   │   ├── Raw Metrics
│   │   ├── Aggregated Data
│   │   └── Trending Data
│   ├── Configuration Database
│   │   ├── Cost Models
│   │   ├── Allocation Rules
│   │   └── Business Entities
│   └── Reporting Database
│       ├── Pre-Aggregated Reports
│       ├── Custom Views
│       └── Historical Data
└── Presentation Layer
    ├── Web Interface
    │   ├── Dashboards
    │   ├── Reports
    │   └── Analytics
    ├── API Services
    │   ├── Data Export
    │   ├── Report Generation
    │   └── Integration APIs
    └── Notification System
        ├── Alerts
        ├── Scheduled Reports
        └── Threshold Notifications
```

### Showback Model
1. **Data Collection**: Collect resource usage data
2. **Cost Calculation**: Calculate resource costs
3. **Allocation**: Allocate costs to consuming entities
4. **Reporting**: Generate consumption reports
5. **Analysis**: Analyze consumption patterns
6. **Optimization**: Optimize resource allocation

## Configuration and Management

### Showback Management
```bash
# Configure showback via SDDC Manager API
curl -X POST "https://sddc-manager/api/v1/operations/showback/config" -H "Authorization: Bearer <token>" -d @showback-config.json

# View showback reports
curl -X GET "https://sddc-manager/api/v1/operations/showback/reports" -H "Authorization: Bearer <token>"

# Generate custom report
curl -X POST "https://sddc-manager/api/v1/operations/showback/reports/generate" -H "Authorization: Bearer <token>" -d @report-config.json

# View cost allocation
curl -X GET "https://sddc-manager/api/v1/operations/showback/allocation" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "showback": {
    "name": "enterprise-showback",
    "description": "Enterprise Showback Configuration",
    "dataCollection": {
      "sources": [
        {
          "name": "vrops-metrics",
          "type": "vrealize-operations",
          "endpoint": "https://vrops.domain.com",
          "credentials": {
            "username": "showback-user",
            "password": "secure-password"
          },
          "metrics": {
            "cpu": true,
            "memory": true,
            "storage": true,
            "network": true,
            "vm": true,
            "host": true,
            "cluster": true,
            "datastore": true
          },
          "frequency": "15m",
          "retention": "365d"
        },
        {
          "name": "vcenter-inventory",
          "type": "vcenter",
          "endpoint": "https://vcenter.domain.com",
          "credentials": {
            "username": "showback@vsphere.local",
            "password": "secure-password"
          },
          "data": {
            "inventory": true,
            "configuration": true,
            "performance": true
          },
          "frequency": "1h",
          "retention": "365d"
        }
      ],
      "entities": [
        {
          "name": "business-units",
          "type": "organizational",
          "mapping": {
            "source": "vcenter-folders",
            "target": "business-units",
            "rules": [
              {
                "folder": "Engineering",
                "businessUnit": "R&D"
              },
              {
                "folder": "Marketing",
                "businessUnit": "Sales & Marketing"
              },
              {
                "folder": "Finance",
                "businessUnit": "Corporate"
              }
            ]
          }
        },
        {
          "name": "projects",
          "type": "project-based",
          "mapping": {
            "source": "vm-tags",
            "target": "projects",
            "rules": [
              {
                "tag": "project:web-portal",
                "project": "Web Portal Development"
              },
              {
                "tag": "project:mobile-app",
                "project": "Mobile Application"
              }
            ]
          }
        }
      ]
    },
    "costCalculation": {
      "models": [
        {
          "name": "compute-cost",
          "type": "cpu-memory",
          "pricing": {
            "cpuCoreHour": 0.05,
            "memoryGBHour": 0.01
          },
          "allocation": "usage-based"
        },
        {
          "name": "storage-cost",
          "type": "storage",
          "pricing": {
            "storageGBMonth": 0.10,
            "iops": 0.001
          },
          "allocation": "provisioned"
        },
        {
          "name": "network-cost",
          "type": "network",
          "pricing": {
            "bandwidthGB": 0.02,
            "connections": 0.0001
          },
          "allocation": "usage-based"
        }
      ],
      "infrastructure": {
        "hardware": {
          "servers": 500000,
          "storage": 200000,
          "network": 100000,
          "licensing": 50000
        },
        "operational": {
          "personnel": 200000,
          "facilities": 100000,
          "support": 50000
        },
        "allocation": {
          "method": "resource-based",
          "distribution": "usage-weighted"
        }
      },
      "currency": "USD",
      "timezone": "UTC"
    },
    "allocation": {
      "rules": [
        {
          "name": "business-unit-allocation",
          "type": "business-unit",
          "distribution": "usage-based",
          "chargeback": false,
          "showback": true
        },
        {
          "name": "project-allocation",
          "type": "project",
          "distribution": "reservation-based",
          "chargeback": false,
          "showback": true
        }
      ],
      "hierarchy": {
        "primary": "business-unit",
        "secondary": "project",
        "tertiary": "application"
      }
    },
    "reporting": {
      "schedules": [
        {
          "name": "daily-summary",
          "type": "summary",
          "frequency": "daily",
          "recipients": ["admin@domain.com", "finance@domain.com"],
          "format": ["pdf", "csv"]
        },
        {
          "name": "weekly-detailed",
          "type": "detailed",
          "frequency": "weekly",
          "recipients": ["admin@domain.com", "ops@domain.com"],
          "format": ["pdf", "xlsx"]
        },
        {
          "name": "monthly-executive",
          "type": "executive",
          "frequency": "monthly",
          "recipients": ["executives@domain.com"],
          "format": ["pdf", "pptx"]
        }
      ],
      "dashboards": [
        {
          "name": "executive-dashboard",
          "type": "executive",
          "widgets": ["cost-trend", "top-consumers", "efficiency-metrics"]
        },
        {
          "name": "operational-dashboard",
          "type": "operational",
          "widgets": ["resource-utilization", "cost-breakdown", "trend-analysis"]
        }
      ],
      "alerts": {
        "thresholds": [
          {
            "name": "high-consumption",
            "metric": "total-cost",
            "threshold": "10000",
            "period": "daily",
            "recipients": ["admin@domain.com"]
          },
          {
            "name": "budget-exceeded",
            "metric": "budget-utilization",
            "threshold": "90%",
            "period": "monthly",
            "recipients": ["admin@domain.com", "finance@domain.com"]
          }
        ]
      }
    },
    "integration": {
      "cmdb": {
        "enabled": true,
        "endpoint": "https://cmdb.domain.com",
        "credentials": {
          "username": "showback-cmdb",
          "password": "secure-password"
        }
      },
      "financial": {
        "enabled": true,
        "system": "erp-system",
        "endpoint": "https://erp.domain.com",
        "credentials": {
          "username": "showback-erp",
          "password": "secure-password"
        }
      },
      "notification": {
        "email": true,
        "slack": true,
        "webhook": true
      }
    }
  }
}
```

### Management Operations
- **Cost Model Management**: Manage cost calculation models
- **Allocation Management**: Manage cost allocation rules
- **Report Management**: Manage showback reports
- **Alert Management**: Manage consumption alerts

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Faster Calculation**: Improved cost calculation speed
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Analytics**: Better analytics capabilities
- **AI/ML Integration**: AI-driven cost optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Reporting**: Automated report generation

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Cost Model Design**: Design appropriate cost models
2. **Entity Mapping**: Map entities correctly
3. **Reporting Configuration**: Configure reports properly
4. **Alert Thresholds**: Set appropriate alert thresholds
5. **Data Validation**: Validate data accuracy
6. **Documentation**: Document showback configurations

## Troubleshooting Commands

```bash
# Check showback status
curl -X GET "https://sddc-manager/api/v1/operations/showback/status" -H "Authorization: Bearer <token>"

# View showback logs
tail -f /var/log/vmware/sddc-manager/showback.log

# Check data collection status
curl -X GET "https://sddc-manager/api/v1/operations/showback/collection/status" -H "Authorization: Bearer <token>"

# Verify cost calculation
curl -X GET "https://sddc-manager/api/v1/operations/showback/costs" -H "Authorization: Bearer <token>"

# View allocation results
curl -X GET "https://sddc-manager/api/v1/operations/showback/allocation/results" -H "Authorization: Bearer <token>"
```

## Related Technologies

- [Chargeback](chargeback.md) - Bills resources used by projects/namespaces
- [vRealize Operations Manager](vrealize-operations-manager.md) - VMware monitoring and analytics
- [SDDC Manager](sddc-manager.md) - Central management platform
- [Inventory](inventory.md) - All logical/physical entities managed by VCF