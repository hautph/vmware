---
term: VM-VM Anti-Affinity Rule
category: Resource_Management
---

A VM-VM Anti-Affinity Rule is a specific type of affinity rule in VMware vSphere DRS that keeps specified virtual machines separated on different hosts. This rule type ensures that selected VMs are placed on different ESXi hosts, which is beneficial for high availability, fault tolerance, and compliance with best practices for critical workloads.

## Overview

VM-VM Anti-Affinity Rules provide:
- Control over separation of specific virtual machines
- High availability through distributed VM placement
- Fault tolerance by preventing single points of failure
- Integration with DRS for automated placement

## Key Features

### Rule Configuration
- **VM Selection**: Selection of VMs that should run separately
- **Anti-Affinity Type**: Must-run-separately or should-run-separately constraints
- **Rule Priority**: Mandatory or advisory rule enforcement
- **Dynamic Updates**: Ability to modify rule membership

### Availability Benefits
- **Fault Isolation**: Prevent single points of failure
- **High Availability**: Improved availability through distribution
- **Disaster Recovery**: Better protection against host-level failures
- **Load Distribution**: Better distribution of workload across hosts

### Business Benefits
- **Compliance**: Meet regulatory and compliance requirements
- **Risk Mitigation**: Reduce risk of simultaneous VM failures
- **Maintenance**: Facilitate independent maintenance operations
- **Performance**: Prevent resource contention between critical VMs

## Architecture

### Rule Components
- **VM Group**: Collection of virtual machines for anti-affinity rule application
- **Anti-Affinity Type**: Must-run-separately (required) or should-run-separately (preferred)
- **Rule Priority**: Mandatory (must be followed) or advisory (should be followed)
- **Rule Status**: Current status of rule compliance

### Rule Types
- **Must-Run-Separately**: Specified VMs must run on different hosts
- **Should-Run-Separately**: Specified VMs should preferably run on different hosts
- **Rule Conflicts**: Handling of conflicts with other rules
- **Rule Violations**: Detection and handling of rule violations

### Integration with DRS
- **DRS Placement**: Integration with DRS initial placement decisions
- **DRS Migration**: Integration with DRS migration recommendations
- **Rule Evaluation**: Evaluation during DRS rule processing
- **Conflict Resolution**: Handling of rule conflicts and violations

## vSphere 8 Enhancements

### Performance Improvements
- **Enhanced Rule Evaluation**: Better algorithms for rule evaluation
- **Reduced Overhead**: Lower overhead for rule processing
- **Improved Scalability**: Better handling of large numbers of rules
- **Better Integration**: Enhanced integration with DRS algorithms

### Management Features
- **Advanced Monitoring**: Better visibility into rule compliance
- **Improved Reporting**: Better reporting on rule effectiveness
- **Streamlined Configuration**: Simplified rule configuration
- **Enhanced Troubleshooting**: Better diagnostic capabilities

### Security Features
- **Enhanced Access Controls**: Better access controls for rule management
- **Audit Trail**: Improved audit trail for rule changes
- **Compliance Monitoring**: Enhanced compliance monitoring
- **Security Integration**: Better integration with security policies

## Best Practices

1. **Critical Workloads**: Apply to critical business applications
2. **Rule Priority**: Set appropriate rule priorities (mandatory vs. advisory)
3. **Monitoring**: Regularly monitor rule compliance and violations
4. **Testing**: Test rules in non-production environments
5. **Documentation**: Document rule purposes and configurations
6. **Review**: Regularly review and update rules as requirements change

## Troubleshooting Commands

```powershell
# View VM-VM anti-affinity rules in PowerCLI
Get-DrsRule -Cluster "ClusterName" | Where-Object {$_.Type -eq "VirtualMachineAntiAffinityRule"}

# Create VM-VM anti-affinity rule
New-DrsRule -Name "RuleName" -Cluster "ClusterName" -VM "VM1", "VM2" -Type "VirtualMachineAntiAffinityRule" -Enabled $true

# Check rule compliance
Get-DrsRule -Cluster "ClusterName" | Get-DrsRuleCompliance

# Modify existing rule
Get-DrsRule -Name "RuleName" -Cluster "ClusterName" | Set-DrsRule -VM (Get-VM "VM1", "VM2", "VM3")

# Remove rule
Get-DrsRule -Name "RuleName" -Cluster "ClusterName" | Remove-DrsRule
```

## Related Technologies

- [Affinity Rules](/glossary/term/affinity-rules.md)
- [DRS](/glossary/term/drs.md)
- [VM-Host Affinity Rule](/glossary/term/vm-host-affinity-rule.md)
- [VM-VM Affinity Rule](/glossary/term/vm-vm-affinity-rule.md)
- [Cluster](/glossary/term/cluster)