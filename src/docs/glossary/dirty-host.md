---
term: Dirty Host
category: VMware_vSphere_Foundation_9
---

Dirty Host is a removed host in VMware Cloud Foundation that requires re-imaging before it can be re-commissioned, typically due to incomplete decommissioning, configuration corruption, or security concerns that necessitate a clean system state.

## Overview

A Dirty Host in VMware Cloud Foundation refers to a physical server that has been removed from the VCF environment but cannot be immediately re-commissioned due to various issues that leave the system in an inconsistent or compromised state. These hosts require complete re-imaging to restore them to a clean, VCF-compliant state before they can be successfully commissioned back into the inventory.

## Key Features

### Problematic State
- **Incomplete Removal**: Partial decommissioning leaving residual configurations
- **Configuration Corruption**: Corrupted system configurations or software
- **Security Compromise**: Potential security vulnerabilities or breaches
- **System Instability**: Unstable system state affecting operations

### Re-imaging Requirement
- **Complete OS Reinstall**: Full reinstallation of ESXi operating system
- **Agent Reinstallation**: Fresh installation of VCF management agents
- **Configuration Reset**: Complete reset of all system configurations
- **Security Hardening**: Reapplication of security policies and hardening

### Recovery Process
- **Diagnostic Analysis**: Analysis to determine root cause
- **Data Preservation**: Preservation of critical asset information
- **Re-imaging Operations**: Complete system re-imaging
- **Re-commissioning**: Process to commission host back into VCF

## Architecture

### Dirty Host Components
- **Problematic System**: Host system in inconsistent state
- **Diagnostic Tools**: Tools for analyzing host issues
- **Re-imaging Engine**: System for complete host re-imaging
- **Recovery Manager**: Management of recovery operations

### Architecture Diagram
```
Dirty Host Recovery Process
├── Problem Identification
│   ├── State Assessment
│   │   ├── Configuration Check
│   │   ├── Software Integrity
│   │   ├── Security Assessment
│   │   └── System Stability
│   ├── Root Cause Analysis
│   │   ├── Log Analysis
│   │   ├── Event Review
│   │   ├── Performance Data
│   │   └── Error Patterns
│   └── Recovery Planning
│       ├── Impact Assessment
│       ├── Resource Planning
│       └── Timeline Estimation
├── Preparation Phase
│   ├── Data Preservation
│   │   ├── Asset Information
│   │   ├── Configuration Backup
│   │   └── Log Collection
│   ├── Network Preparation
│   │   ├── Isolation
│   │   ├── Access Control
│   │   └── Security Measures
│   └── Resource Allocation
│       ├── Imaging Resources
│       ├── Network Bandwidth
│       └── Administrative Access
├── Re-imaging Phase
│   ├── System Cleanup
│   │   ├── Data Erasure
│   │   ├── Configuration Removal
│   │   └── Agent Uninstall
│   ├── OS Installation
│   │   ├── ESXi Installation
│   │   ├── VCF Profile Application
│   │   └── Security Hardening
│   └── Agent Deployment
│       ├── Management Agents
│       ├── Monitoring Agents
│       └── Update Agents
├── Validation Phase
│   ├── System Verification
│   │   ├── Hardware Validation
│   │   ├── Software Validation
│   │   └── Network Validation
│   ├── Security Validation
│   │   ├── Credential Check
│   │   ├── Certificate Validation
│   │   └── Access Control
│   └── Performance Testing
│       ├── Boot Time
│       ├── Network Performance
│       └── Storage Performance
└── Re-commissioning Phase
    ├── Inventory Registration
    │   ├── Asset Tagging
    │   ├── Metadata Recording
    │   └── Status Updates
    ├── Network Integration
    │   ├── Management Network
    │   ├── vMotion Network
    │   └── Storage Network
    └── Availability
        ├── Health Monitoring
        ├── Performance Baseline
        └── Assignment Ready
```

### Recovery Workflow
1. **Problem Detection**: Detect and identify dirty host issues
2. **Analysis**: Analyze root cause and impact
3. **Planning**: Plan recovery and re-imaging operations
4. **Preparation**: Prepare for re-imaging process
5. **Re-imaging**: Completely re-image the host system
6. **Validation**: Validate clean system state
7. **Re-commissioning**: Commission host back into VCF

## Configuration and Management

### Dirty Host Management
```bash
# Identify dirty hosts via SDDC Manager API
curl -X GET "https://sddc-manager/api/v1/hosts?status=dirty" -H "Authorization: Bearer <token>"

# Initiate re-imaging process
curl -X POST "https://sddc-manager/api/v1/hosts/{host-id}/reimage" -H "Authorization: Bearer <token>" -d @reimage-request.json

# Check re-imaging status
curl -X GET "https://sddc-manager/api/v1/hosts/{host-id}/reimage/status" -H "Authorization: Bearer <token>"

# View recovery logs
curl -X GET "https://sddc-manager/api/v1/hosts/{host-id}/recovery/logs" -H "Authorization: Bearer <token>"
```

### Configuration Example
```json
{
  "dirtyHostRecovery": {
    "host": {
      "id": "host-54321",
      "hostname": "esxi01.dirty.domain.com",
      "ip": "192.168.10.150",
      "currentStatus": "dirty"
    },
    "problemAnalysis": {
      "detectionTime": "2023-10-20T10:30:00Z",
      "symptoms": [
        "failedDecommission",
        "configurationCorruption",
        "agentFailure"
      ],
      "rootCause": "incompleteDecommission",
      "impactAssessment": "low",
      "recoveryComplexity": "medium"
    },
    "reimaging": {
      "preparation": {
        "dataPreservation": {
          "assetInfo": true,
          "configuration": false,
          "logs": true,
          "storageLocation": "/backup/dirty-hosts/host-54321"
        },
        "networkIsolation": true,
        "securityMeasures": {
          "accessRevocation": true,
          "networkSegmentation": true,
          "monitoring": true
        }
      },
      "imagingProcess": {
        "cleanup": {
          "completeErase": true,
          "secureErase": true,
          "verification": true
        },
        "osInstallation": {
          "esxiVersion": "8.0 U2",
          "build": "202310001",
          "profile": "VCF-Standard",
          "securityHardening": true
        },
        "agentDeployment": {
          "management": true,
          "monitoring": true,
          "update": true,
          "backup": true
        }
      },
      "validation": {
        "systemVerification": true,
        "hardwareValidation": true,
        "softwareIntegrity": true,
        "networkConnectivity": true,
        "securityValidation": true,
        "performanceTesting": true
      }
    },
    "recovery": {
      "timeout": "4h",
      "retryAttempts": 1,
      "notification": {
        "progress": ["admin@domain.com"],
        "success": ["admin@domain.com", "ops@domain.com"],
        "failure": ["admin@domain.com", "ops@domain.com", "security@domain.com"]
      },
      "rollback": {
        "enabled": false
      }
    }
  }
}
```

### Management Operations
- **Problem Detection**: Detect and identify dirty hosts
- **Recovery Planning**: Plan recovery operations
- **Re-imaging Management**: Manage re-imaging processes
- **Re-commissioning**: Commission recovered hosts

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Faster Re-imaging**: Improved re-imaging speed
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network operations
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Diagnostics**: Better diagnostic capabilities
- **AI/ML Integration**: AI-driven problem detection
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Recovery**: Automated recovery operations

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Early Detection**: Detect dirty hosts early
2. **Root Cause Analysis**: Analyze root causes thoroughly
3. **Recovery Planning**: Plan recovery operations carefully
4. **Security Measures**: Implement proper security during recovery
5. **Validation**: Validate recovery thoroughly
6. **Documentation**: Document recovery procedures

## Troubleshooting Commands

```bash
# Check dirty host status
curl -X GET "https://sddc-manager/api/v1/hosts?status=dirty" -H "Authorization: Bearer <token>"

# View recovery logs
tail -f /var/log/vmware/sddc-manager/host-recovery.log

# Check re-imaging progress
esxcli system settings advanced list -o /Reimage/

# Verify system state
esxcli system version get

# Check network isolation
esxcli network ip interface list
```

## Related Technologies

- [Commission a Host](commission-a-host.md) - Adds host to VCF inventory as unassigned
- [Decommission a Host](decommission-a-host.md) - Removes unassigned host from VCF inventory
- [Unassigned Host](unassigned-host.md) - Host in free pool not belonging to any domain
- [Free Pool](free-pool.md) - Repository of unassigned hosts