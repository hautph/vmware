---
term: Decommission a Host
category: VMware_vSphere_Foundation_9
---

Decommission a Host is the process of removing an unassigned host from the VMware Cloud Foundation inventory, which involves cleaning up management agents, network configurations, and unregistering the host from VCF systems while preserving hardware for potential re-commissioning.

## Overview

Decommissioning a Host in VMware Cloud Foundation is the systematic process of removing a physical server from the VCF environment. This process applies only to unassigned hosts that are not currently part of any management or workload domain. The decommissioning process ensures clean removal of VCF software, management agents, and inventory registration while preserving the underlying hardware for potential future re-commissioning.

## Key Features

### Clean Removal
- **Agent Cleanup**: Remove all VCF management agents
- **Configuration Reset**: Reset network and system configurations
- **Inventory Removal**: Remove host from VCF inventory
- **Data Erasure**: Erase VCF-specific data and configurations

### Preservation Options
- **Hardware Preservation**: Preserve hardware for re-commissioning
- **Data Retention**: Retain or erase specific data as needed
- **Configuration Backup**: Backup configurations before removal
- **Asset Tracking**: Track decommissioned assets

### Security Management
- **Credential Removal**: Remove all stored credentials
- **Certificate Cleanup**: Clean up SSL certificates
- **Access Revocation**: Revoke all access permissions
- **Audit Logging**: Log decommissioning activities

## Architecture

### Decommissioning Process Components
- **Cleanup Engine**: System cleanup and removal
- **Inventory Manager**: Asset removal from inventory
- **Security Module**: Credential and certificate management
- **Tracking System**: Asset tracking and logging

### Architecture Diagram
```
Decommission a Host Process
├── Pre-Decommissioning
│   ├── Host Validation
│   │   ├── Unassigned Status Check
│   │   ├── Domain Association Check
│   │   └── Workload Check
│   ├── Backup Operations
│   │   ├── Configuration Backup
│   │   ├── Log Collection
│   │   └── Asset Information Backup
│   └── Approval Process
│       ├── Authorization Check
│       ├── Notification
│       └── Approval Tracking
├── Cleanup Phase
│   ├── Software Removal
│   │   ├── Agent Uninstallation
│   │   ├── Profile Cleanup
│   │   └── Data Erasure
│   ├── Network Cleanup
│   │   ├── Interface Reset
│   │   ├── VLAN Removal
│   │   └── DNS Cleanup
│   └── Security Cleanup
│       ├── Credential Removal
│       ├── Certificate Cleanup
│       └── Access Revocation
├── Inventory Phase
│   ├── Asset Removal
│   │   ├── Inventory Unregistration
│   │   ├── Tag Removal
│   │   └── Metadata Cleanup
│   └── Tracking Update
│       ├── Status Update
│       ├── History Recording
│       └── Reporting
└── Post-Decommissioning
    ├── Hardware Preservation
    │   ├── Power Down
    │   ├── Physical Security
    │   └── Storage
    ├── Documentation
    │   ├── Decommission Report
    │   ├── Asset Tracking
    │   └── Audit Log
    └── Re-commissioning Readiness
        ├── Hardware Validation
        ├── Documentation
        └── Storage Planning
```

### Decommissioning Workflow
1. **Validation**: Validate host is unassigned and eligible
2. **Backup**: Backup configurations and logs
3. **Approval**: Obtain necessary approvals
4. **Cleanup**: Remove software and configurations
5. **Inventory**: Remove from VCF inventory
6. **Preservation**: Preserve hardware for future use

## Configuration and Management

### Decommissioning Management
```bash
# Decommission a host via SDDC Manager API
curl -X POST "https://sddc-manager/api/v1/hosts/decommission" -H "Authorization: Bearer <token>" -d @decommission-request.json

# Check decommissioning status
curl -X GET "https://sddc-manager/api/v1/hosts/decommission/{decommission-id}/status" -H "Authorization: Bearer <token>"

# View decommissioning logs
curl -X GET "https://sddc-manager/api/v1/hosts/decommission/{decommission-id}/logs" -H "Authorization: Bearer <token>"

# Cancel decommissioning process
curl -X DELETE "https://sddc-manager/api/v1/hosts/decommission/{decommission-id}" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "decommissionHost": {
    "host": {
      "id": "host-67890",
      "hostname": "esxi01.unassigned.domain.com",
      "ip": "192.168.10.100"
    },
    "validation": {
      "unassignedCheck": true,
      "domainAssociationCheck": true,
      "workloadCheck": true,
      "maintenanceMode": true
    },
    "backup": {
      "configuration": true,
      "logs": true,
      "assetInfo": true,
      "storageLocation": "/backup/decommission/host-67890"
    },
    "cleanup": {
      "agents": {
        "management": true,
        "monitoring": true,
        "update": true,
        "backup": true
      },
      "software": {
        "vcfProfile": true,
        "customSettings": true,
        "userAccounts": true
      },
      "network": {
        "interfaces": true,
        "vlans": true,
        "dnsEntries": true,
        "staticRoutes": true
      }
    },
    "security": {
      "credentials": true,
      "certificates": true,
      "accessControls": true,
      "auditLogs": true
    },
    "inventory": {
      "unregister": true,
      "tagRemoval": true,
      "metadataCleanup": true,
      "historyPreservation": true
    },
    "preservation": {
      "hardware": true,
      "powerState": "off",
      "physicalSecurity": true,
      "storageLocation": "rack-01-u20",
      "readyForRecommission": true
    },
    "decommissioning": {
      "timeout": "1h",
      "retryAttempts": 2,
      "notification": {
        "success": ["admin@domain.com"],
        "failure": ["admin@domain.com", "ops@domain.com"]
      },
      "rollback": {
        "enabled": false
      }
    }
  }
}
```

### Management Operations
- **Decommissioning Process**: Execute host decommissioning
- **Status Monitoring**: Monitor decommissioning progress
- **Error Handling**: Handle decommissioning errors
- **Asset Tracking**: Track decommissioned assets

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Faster Decommissioning**: Improved decommissioning speed
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network cleanup
- **Storage Performance**: Improved storage cleanup

### Advanced Features
- **Enhanced Validation**: Better validation algorithms
- **AI/ML Integration**: AI-driven decommissioning optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Remediation**: Automated error resolution

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Pre-Decommissioning Validation**: Validate host eligibility
2. **Backup Operations**: Backup configurations and logs
3. **Approval Process**: Implement proper approval workflows
4. **Security Cleanup**: Ensure complete security cleanup
5. **Asset Tracking**: Track decommissioned assets
6. **Documentation**: Document decommissioning procedures

## Troubleshooting Commands

```bash
# Check decommissioning status
curl -X GET "https://sddc-manager/api/v1/hosts/decommission/status" -H "Authorization: Bearer <token>"

# View decommissioning logs
tail -f /var/log/vmware/sddc-manager/host-decommission.log

# Verify host removal from inventory
curl -X GET "https://sddc-manager/api/v1/hosts/{host-id}" -H "Authorization: Bearer <token>"

# Check network cleanup
esxcli network ip interface list

# Verify agent removal
esxcli system settings advanced list -o /VCF/
```

## Related Technologies

- [Commission a Host](commission-a-host.md) - Adds host to VCF inventory as unassigned
- [Unassigned Host](unassigned-host.md) - Host in free pool not belonging to any domain
- [Free Pool](free-pool.md) - Repository of unassigned hosts
- [Dirty Host](dirty-host.md) - Removed host needing re-imaging