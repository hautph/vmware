---
term: VM-VM Affinity Rule
category: Resource_Management
---

A VM-VM Affinity Rule is a specific type of affinity rule in VMware vSphere DRS that keeps specified virtual machines together on the same host. This rule type ensures that selected VMs are placed on the same ESXi host, which can be beneficial for performance optimization, application dependencies, or specific workload requirements.

## Overview

VM-VM Affinity Rules provide:
- Control over co-location of specific virtual machines
- Performance optimization through strategic VM placement
- Support for application dependencies and requirements
- Integration with DRS for automated placement

## Key Features

### Rule Configuration
- **VM Selection**: Selection of VMs that should run together
- **Affinity Type**: Must-run-together or should-run-together constraints
- **Rule Priority**: Mandatory or advisory rule enforcement
- **Dynamic Updates**: Ability to modify rule membership

### Performance Benefits
- **Reduced Latency**: Lower network latency between co-located VMs
- **Improved Throughput**: Better application performance for dependent services
- **Resource Sharing**: Efficient sharing of host resources
- **Cache Locality**: Better utilization of host CPU and memory caches

### Business Benefits
- **Application Dependencies**: Support for tightly coupled applications
- **Licensing**: Compliance with licensing requirements for co-located VMs
- **Maintenance**: Facilitate coordinated maintenance operations
- **Troubleshooting**: Simplified troubleshooting of related VMs

## Architecture

### Rule Components
- **VM Group**: Collection of virtual machines for affinity rule application
- **Affinity Type**: Must-run-together (required) or should-run-together (preferred)
- **Rule Priority**: Mandatory (must be followed) or advisory (should be followed)
- **Rule Status**: Current status of rule compliance

### Rule Types
- **Must-Run-Together**: Specified VMs must run on the same host
- **Should-Run-Together**: Specified VMs should preferably run on the same host
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

1. **Application Analysis**: Understand application dependencies and requirements
2. **Rule Priority**: Set appropriate rule priorities (mandatory vs. advisory)
3. **Monitoring**: Regularly monitor rule compliance and violations
4. **Testing**: Test rules in non-production environments
5. **Documentation**: Document rule purposes and configurations
6. **Review**: Regularly review and update rules as requirements change

## Troubleshooting Commands

```powershell
# View VM-VM affinity rules in PowerCLI
Get-DrsRule -Cluster "ClusterName" | Where-Object {$_.Type -eq "VirtualMachineAffinityRule"}

# Create VM-VM affinity rule
New-DrsRule -Name "RuleName" -Cluster "ClusterName" -VM "VM1", "VM2" -Type "VirtualMachineAffinityRule" -Enabled $true

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
- [VM-VM Anti-Affinity Rule](/glossary/term/vm-vm-anti-affinity-rule.md)
- [Cluster](/glossary/term/cluster)