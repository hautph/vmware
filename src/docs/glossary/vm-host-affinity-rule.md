---
term: VM-Host Affinity Rule
category: Resource_Management
---

A VM-Host Affinity Rule is a specific type of affinity rule in VMware vSphere DRS that dictates on which group of hosts a virtual machine can or must run. This rule type allows administrators to control VM placement by specifying which hosts are eligible or required to run specific VMs, supporting various business, performance, and compliance requirements.

## Overview

VM-Host Affinity Rules provide:
- Control over which hosts specific VMs can run on
- Support for hardware compatibility requirements
- Integration with DRS for automated placement
- Flexible configuration for different scenarios

## Key Features

### Rule Configuration
- **VM Groups**: Definition of groups of virtual machines
- **Host Groups**: Definition of groups of ESXi hosts
- **Affinity Types**: Must-run-on or should-run-on constraints
- **Rule Priority**: Mandatory or advisory rule enforcement

### Business Benefits
- **Hardware Compatibility**: Ensure VMs run on compatible hardware
- **Licensing**: Control VM placement for licensing requirements
- **Maintenance**: Facilitate planned maintenance operations
- **Performance**: Optimize performance through strategic placement

### Management Capabilities
- **Group Management**: Easy creation and management of VM and host groups
- **Rule Creation**: Simple creation of VM-Host affinity rules
- **Rule Modification**: Flexible modification of existing rules
- **Rule Monitoring**: Monitoring of rule compliance and violations

## Architecture

### Rule Components
- **VM Group**: Collection of virtual machines for rule application
- **Host Group**: Collection of ESXi hosts for rule application
- **Affinity Type**: Must-run-on (required) or should-run-on (preferred)
- **Rule Priority**: Mandatory (must be followed) or advisory (should be followed)

### Rule Types
- **Must-Run-On**: VMs must run on hosts in the specified host group
- **Should-Run-On**: VMs should preferably run on hosts in the specified host group
- **Must-Not-Run-On**: VMs must not run on hosts in the specified host group
- **Should-Not-Run-On**: VMs should preferably not run on hosts in the specified host group

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

1. **Group Planning**: Plan VM and host groups based on requirements
2. **Rule Priority**: Set appropriate rule priorities (mandatory vs. advisory)
3. **Monitoring**: Regularly monitor rule compliance and violations
4. **Testing**: Test rules in non-production environments
5. **Documentation**: Document rule purposes and configurations
6. **Review**: Regularly review and update rules as requirements change

## Troubleshooting Commands

```powershell
# View VM-Host affinity rules in PowerCLI
Get-DrsVMHostRule -Cluster "ClusterName"

# Create VM group
New-DrsVMGroup -Name "VMGroupName" -Cluster "ClusterName" -VM "VM1", "VM2"

# Create host group
New-DrsHostGroup -Name "HostGroupName" -Cluster "ClusterName" -VMHost "Host1", "Host2"

# Create VM-Host affinity rule
New-DrsVMHostRule -Name "RuleName" -Cluster "ClusterName" -VMGroup "VMGroupName" -HostGroup "HostGroupName" -Type "Affinity"

# Check rule compliance
Get-DrsVMHostRule -Cluster "ClusterName" | Get-DrsRuleCompliance
```

## Related Technologies

- [Affinity Rules](/glossary/term/affinity-rules)
- [DRS](/glossary/term/drs)
- [VM-VM Affinity Rule](/glossary/term/vm-vm-affinity-rule)
- [VM-VM Anti-Affinity Rule](/glossary/term/vm-vm-anti-affinity-rule)
- [Cluster](/glossary/term/cluster)