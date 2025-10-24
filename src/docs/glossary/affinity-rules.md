---
term: Affinity Rules
category: Resource_Management
---

Affinity Rules are constraints in VMware vSphere Distributed Resource Scheduler (DRS) that control the placement of virtual machines on hosts within a cluster. These rules allow administrators to specify whether VMs should run together (affinity) or separately (anti-affinity) to meet business, performance, or compliance requirements.

## Overview

Affinity Rules provide:
- Control over VM placement within clusters
- Support for business and technical requirements
- Integration with DRS for automated placement
- Flexible rule configuration for different scenarios

## Key Features

### Rule Types
- **VM-Host Affinity Rules**: Control which hosts VMs can run on
- **VM-VM Affinity Rules**: Keep VMs together on the same host
- **VM-VM Anti-Affinity Rules**: Keep VMs separated on different hosts
- **Rule Priorities**: Different priority levels for rule enforcement

### Business Benefits
- **Compliance**: Meet regulatory and compliance requirements
- **Performance**: Optimize performance through strategic placement
- **Availability**: Improve availability through proper distribution
- **Resource Management**: Better resource utilization and management

### Management Capabilities
- **Rule Creation**: Easy creation of affinity and anti-affinity rules
- **Rule Modification**: Flexible modification of existing rules
- **Rule Monitoring**: Monitoring of rule compliance and violations
- **Rule Reporting**: Reporting on rule effectiveness and impact

## Architecture

### Rule Components
- **Rule Definition**: Specification of VMs, hosts, and placement constraints
- **Rule Scope**: Definition of rule application scope (cluster level)
- **Rule Priority**: Priority level for rule enforcement (mandatory or advisory)
- **Rule Status**: Current status of rule compliance

### Rule Types in Detail
- **VM-Host Affinity**: Specifies which hosts a VM must or should run on
- **VM-Host Anti-Affinity**: Specifies which hosts a VM must not run on
- **VM-VM Affinity**: Specifies that VMs should run on the same host
- **VM-VM Anti-Affinity**: Specifies that VMs should run on different hosts

### Integration with DRS
- **DRS Decision Making**: Integration with DRS placement decisions
- **Rule Evaluation**: Evaluation of rules during DRS operations
- **Recommendation Generation**: Generation of rule-compliant recommendations
- **Automation**: Automated enforcement of rule constraints

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

1. **Rule Planning**: Plan rules based on business and technical requirements
2. **Priority Setting**: Set appropriate rule priorities (mandatory vs. advisory)
3. **Monitoring**: Regularly monitor rule compliance and violations
4. **Testing**: Test rules in non-production environments
5. **Documentation**: Document rule purposes and configurations
6. **Review**: Regularly review and update rules as requirements change

## Troubleshooting Commands

```powershell
# View affinity rules in PowerCLI
Get-DrsRule -Cluster "ClusterName"

# Check rule compliance
Get-DrsRule -Cluster "ClusterName" | Get-DrsRuleCompliance

# Create VM-Host affinity rule
New-DrsVMHostRule -Name "RuleName" -Cluster "ClusterName" -VMGroup "VMGroupName" -HostGroup "HostGroupName" -Type "Affinity"

# View rule recommendations
Get-DrsRecommendation -Cluster "ClusterName"

# Check rule impact on DRS
Get-DrsRule -Cluster "ClusterName" | Select Name, Enabled, Mandatory
```

## Related Technologies

- [DRS](/glossary/term/drs)
- [VM-Host Affinity Rule](/glossary/term/vm-host-affinity-rule)
- [VM-VM Affinity Rule](/glossary/term/vm-vm-affinity-rule)
- [VM-VM Anti-Affinity Rule](/glossary/term/vm-vm-anti-affinity-rule)
- [Cluster](/glossary/term/cluster)