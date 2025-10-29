---
term: Site Recovery Manager (SRM)
title: Site Recovery Manager (SRM)
category: Backup_Disaster_Recovery
language: en
---

VMware Site Recovery Manager (SRM) is an enterprise-grade disaster recovery automation solution that orchestrates the automated failover and failback of virtual machines and associated applications between primary and recovery sites. SRM provides a comprehensive framework for implementing, testing, and executing disaster recovery plans while minimizing downtime and ensuring business continuity.

## Overview

Site Recovery Manager addresses the critical need for organizations to maintain business continuity in the face of disasters, hardware failures, or planned maintenance events. It transforms complex, manual disaster recovery processes into automated, repeatable procedures that can be tested and validated without impacting production environments.

### Core Value Proposition

- **Automated Recovery Orchestration**: Eliminates manual intervention in disaster recovery processes
- **Non-Disruptive Testing**: Enables regular testing of recovery plans without affecting production workloads
- **Compliance Assurance**: Helps organizations meet regulatory requirements for disaster recovery
- **Risk Mitigation**: Reduces the risk of extended downtime during disaster scenarios

## Key Features

### Recovery Plan Automation
- **Automated Failover**: Orchestrates the recovery of VMs and applications in a predetermined sequence
- **Customizable Recovery Plans**: Allows administrators to define recovery steps and dependencies
- **Non-Disruptive Testing**: Enables regular testing of disaster recovery plans without impacting production
- **Failback Automation**: Automates the process of returning services to the primary site after recovery

### Replication Integration
- **vSphere Replication Support**: Works with VMware's native replication solution
- **Array-Based Replication**: Integrates with storage array replication technologies
- **Replication Monitoring**: Provides visibility into replication status and health
- **Bandwidth Optimization**: Optimizes replication traffic to minimize network impact

### Centralized Management
- **vCenter Server Integration**: Managed through the vSphere Client interface
- **Recovery Plan Templates**: Reusable templates for common recovery scenarios
- **Role-Based Access Control**: Granular permissions for recovery operations
- **Multi-Site Management**: Centralized management of multiple recovery sites

### Advanced Capabilities
- **Network Isolation**: Ensures network security during failover operations
- **Application Consistency**: Maintains application-level consistency during recovery
- **Storage Mapping**: Intelligently maps storage resources between sites
- **Custom Scripting**: Extends recovery capabilities through custom scripts

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

### Replication Technologies
- **vSphere Replication**: VMware's hypervisor-based replication solution
- **Array-Based Replication**: Storage vendor-specific replication technologies
- **Third-Party Integration**: Support for various storage array vendors
- **Replication Policies**: Granular control over replication parameters

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

### Cloud Integration
- **VMware Cloud on AWS**: Enhanced support for hybrid cloud disaster recovery
- **Multi-Cloud Orchestration**: Orchestration across multiple cloud environments
- **Cloud-Native Workloads**: Support for modern application architectures
- **SDDC Integration**: Seamless integration with Software-Defined Data Centers

## Best Practices

1. **Recovery Objectives**: Define appropriate RTO and RPO values for different applications
2. **Regular Testing**: Test recovery plans regularly to ensure they work as expected
3. **Network Planning**: Plan network configurations carefully to ensure proper failover
4. **Resource Sizing**: Ensure adequate resources at recovery site for failover scenarios
5. **Documentation**: Maintain detailed documentation of recovery procedures and dependencies
6. **Training**: Train staff on recovery procedures and tools
7. **Monitoring**: Implement continuous monitoring of replication and recovery status
8. **Compliance**: Ensure recovery plans meet regulatory and compliance requirements

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

# Check SRM database connectivity
/usr/lib/vmware-srm/bin/srmctl database status
```

## Related Technologies

- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [Recovery Point Objective (RPO)](/glossary/term/recovery-point-objective.md)
- [Recovery Time Objective (RTO)](/glossary/term/recovery-time-objective.md)
- [VMware Cloud on AWS](/glossary/term/vmware-cloud-on-aws.md)
- [vCenter Server](/glossary/term/vcenter.md)