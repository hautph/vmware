---
term: Site Recovery Manager (SRM)
category: Backup_Disaster_Recovery
---

Site Recovery Manager (SRM) is VMware's disaster recovery orchestration solution that automates the failover and failback of virtual machines between primary and recovery sites, providing non-disruptive testing and recovery workflows. SRM integrates with vSphere Replication and array-based replication to deliver comprehensive disaster recovery capabilities.

## Overview

Site Recovery Manager provides:
- Automated disaster recovery orchestration
- Non-disruptive testing of recovery plans
- Integration with multiple replication technologies
- Centralized recovery plan management
- Comprehensive reporting and auditing

## Key Features

### Recovery Plan Orchestration
- **Automated Failover**: Automated VM failover during disasters
- **Planned Migration**: Coordinated VM migration between sites
- **Test Failover**: Non-disruptive testing of recovery procedures
- **Failback Operations**: Automated return to primary site

### Replication Integration
- **vSphere Replication**: Integration with VMware's hypervisor-based replication
- **Array-Based Replication**: Support for storage array replication
- **Multiple Replication Sources**: Support for multiple replication technologies
- **Replication Monitoring**: Centralized replication status monitoring

### Testing and Validation
- **Non-Disruptive Testing**: Test recovery without affecting production
- **Test Networks**: Isolated test network environments
- **Test Automation**: Automated test execution and validation
- **Test Reporting**: Comprehensive test results and reporting

## Architecture

### Components
- **SRM Server**: Central management component
- **SRM Database**: Configuration and metadata storage
- **Recovery Plans**: Defined recovery procedures
- **Protection Groups**: Collections of protected VMs
- **Inventory Mappings**: Resource mappings between sites

### Site Configuration
- **Primary Site**: Production environment
- **Recovery Site**: Disaster recovery environment
- **Protected VMs**: VMs protected by SRM
- **Replica VMs**: Replicated VMs at recovery site

## Configuration Examples

### PowerShell/PowerCLI Configuration
```powershell
# Create protection group
New-SRMProtectionGroup -Name "Production-PG" -Description "Production VMs protection group"

# Add VMs to protection group
Get-SRMProtectionGroup "Production-PG" | Add-SRMProtectedVM -VM (Get-VM "Critical-VM1", "Critical-VM2")

# Create recovery plan
New-SRMRecoveryPlan -Name "Production-Recovery-Plan" -Description "Production recovery plan" -ProtectionGroup (Get-SRMProtectionGroup "Production-PG")

# Initiate planned migration
Start-SRMFailover -RecoveryPlan "Production-Recovery-Plan" -Planned

# Test recovery plan
Start-SRMTest -RecoveryPlan "Production-Recovery-Plan"
```

### CLI Configuration
```bash
# Check SRM service status
service-control --status vmware-srm

# View protection groups
srmctl protection-group list

# View recovery plans
srmctl recovery-plan list

# Check replication status
srmctl replication status
```

## Recovery Scenarios

### Planned Migration
- **Coordinated Move**: Planned migration of VMs between sites
- **Zero Data Loss**: Ensured data consistency during migration
- **Minimal Downtime**: Reduced application downtime
- **Synchronized Operations**: Coordinated with maintenance windows

### Unplanned Failover
- **Disaster Response**: Automated response to site failures
- **Rapid Recovery**: Quick activation of recovery site
- **Service Restoration**: Rapid restoration of critical services
- **Data Protection**: Ensured data consistency

### Test Failover
- **Non-Disruptive Testing**: Testing without affecting production
- **Isolated Environment**: Dedicated test network environment
- **Validation Testing**: Comprehensive recovery validation
- **Reporting**: Detailed test results and reporting

## vSphere 8 Enhancements

### Enhanced Orchestration
- **Improved Workflows**: More sophisticated recovery workflows
- **Parallel Processing**: Better parallel processing capabilities
- **Enhanced Error Handling**: Better error handling and recovery
- **Streamlined Operations**: Simplified management operations

### Modern Management Integration
- **Lifecycle Management**: Better integration with vSphere Lifecycle Manager
- **Policy Management**: Enhanced policy-driven management
- **Unified Interface**: Better integration with vSphere Client
- **Improved Monitoring**: Better monitoring capabilities

### Security Enhancements
- **Enhanced Authentication**: Better authentication mechanisms
- **Secure Communication**: More secure communication channels
- **Compliance Features**: Better compliance reporting
- **Audit Capabilities**: Enhanced audit trails

## Best Practices

1. **Recovery Plan Design**: Design comprehensive recovery plans
2. **Regular Testing**: Conduct regular test failovers
3. **Network Planning**: Plan network configurations for recovery
4. **Resource Sizing**: Ensure adequate resources at recovery site
5. **Monitoring**: Regularly monitor SRM status and health
6. **Documentation**: Maintain detailed documentation

## Troubleshooting Commands

```bash
# Check SRM service status
service-control --status vmware-srm

# View SRM logs
tail -f /var/log/vmware/srm/*.log

# Check replication status
srmctl replication status

# View recovery plan status
srmctl recovery-plan status
```

## Related Technologies

- [vSphere Replication](/glossary/term/vsphere-replication)
- [Disaster Recovery](/glossary/term/disaster-recovery)
- [Recovery Point Objective (RPO)](/glossary/term/rpo)
- [Recovery Time Objective (RTO)](/glossary/term/rto)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager)