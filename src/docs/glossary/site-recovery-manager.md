---
term: Site Recovery Manager (SRM)
title: Site Recovery Manager (SRM)
category: Backup_Disaster_Recovery
---

VMware Site Recovery Manager (SRM) is a disaster recovery automation solution that simplifies and automates the recovery of virtual machines and associated applications in the event of outages or disasters. SRM orchestrates the failover process between primary and recovery sites, minimizing downtime and ensuring business continuity.

## Overview

Site Recovery Manager provides:
- Automated disaster recovery orchestration
- Non-disruptive testing of recovery plans
- Centralized recovery plan management
- Integration with vSphere Replication and array-based replication
- Compliance with recovery time objectives (RTO) and recovery point objectives (RPO)

## Key Features

### Recovery Plan Automation
- **Automated Failover**: Orchestrates the recovery of VMs and applications in a predetermined sequence
- **Customizable Recovery Plans**: Allows administrators to define recovery steps and dependencies
- **Non-Disruptive Testing**: Enables regular testing of disaster recovery plans without impacting production

### Replication Integration
- **vSphere Replication Support**: Works with VMware's native replication solution
- **Array-Based Replication**: Integrates with storage array replication technologies
- **Replication Monitoring**: Provides visibility into replication status and health

### Centralized Management
- **vCenter Server Integration**: Managed through the vSphere Client interface
- **Recovery Plan Templates**: Reusable templates for common recovery scenarios
- **Role-Based Access Control**: Granular permissions for recovery operations

## Architecture

### Core Components
- **Site Recovery Manager Server**: Primary management component installed at both sites
- **Recovery Plans**: XML-based definitions of recovery procedures and dependencies
- **Placeholder VMs**: Lightweight representations of protected VMs at the recovery site
- **Mapping Objects**: Defines relationships between protected and recovery site resources

### Site Configuration
- **Protected Site**: Primary data center running production workloads
- **Recovery Site**: Secondary data center for disaster recovery
- **vCenter Server Instances**: Separate instances managing each site
- **Network Configuration**: Defines network mappings between sites

## Configuration Examples

### PowerShell/PowerCLI Configuration
```powershell
# Connect to vCenter Server
Connect-VIServer -Server "vcenter-primary.local"

# Create a new recovery plan
New-SRMRecoveryPlan -Name "Production-DR-Plan" -Description "Main production recovery plan"

# Add VMs to protection group
Get-SRMProtectionGroup -Name "Production-PG" | Add-SRMProtectedVM -VM (Get-VM -Name "WebServer01", "AppServer01", "DBServer01")

# Test recovery plan
Start-SRMRecoveryPlan -RecoveryPlan (Get-SRMRecoveryPlan -Name "Production-DR-Plan") -ValidateOnly

# Execute failover
Start-SRMRecoveryPlan -RecoveryPlan (Get-SRMRecoveryPlan -Name "Production-DR-Plan")
```

### ESXi CLI Configuration
```bash
# Check SRM service status
service-control --status vmware-srm

# View protection group status
/usr/lib/vmware-srm/bin/srmctl protection-group list

# Monitor recovery plan execution
tail -f /var/log/vmware/srm/*.log
```

## vSphere 8 Enhancements

### Enhanced Replication
In vSphere 8, Site Recovery Manager has been enhanced with:
- **Improved RPO Management**: More granular control over recovery point objectives
- **Enhanced RTO Optimization**: Better recovery time objective optimization
- **Streamlined Replication Setup**: Simplified configuration for replication policies
- **Advanced Monitoring**: Enhanced visibility into replication and recovery status

### Modern Management Integration
- **Lifecycle Management**: Better integration with vSphere Lifecycle Manager
- **Policy-Based Management**: Enhanced policy-driven automation
- **Simplified Operations**: Streamlined management operations
- **Improved Troubleshooting**: Better diagnostic capabilities

## Best Practices

1. **Recovery Objectives**: Define appropriate RTO and RPO values for different applications
2. **Regular Testing**: Test recovery plans regularly to ensure they work as expected
3. **Network Planning**: Plan network configurations carefully to ensure proper failover
4. **Resource Sizing**: Ensure adequate resources at recovery site for failover scenarios
5. **Documentation**: Maintain detailed documentation of recovery procedures and dependencies
6. **Training**: Train staff on recovery procedures and tools

## Troubleshooting Commands

```bash
# Check SRM service status
service-control --status vmware-srm

# View SRM logs
tail -f /var/log/vmware/srm/*.log

# Check protection group status
/usr/lib/vmware-srm/bin/srmctl protection-group list

# Monitor replication status
/usr/lib/vmware-srm/bin/srmctl replication-group list
```

## Related Technologies

- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [Recovery Point Objective (RPO)](/glossary/term/recovery-point-objective.md)
- [Recovery Time Objective (RTO)](/glossary/term/recovery-time-objective.md)
