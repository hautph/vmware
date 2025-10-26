---
term: DPM (Distributed Power Management)
category: Management_and_Clusters
---

DPM (Distributed Power Management) is a VMware vSphere feature that automatically powers down unused ESXi hosts during low workload periods and powers them back on when demand increases, optimizing energy consumption in virtualized environments.

## Overview

DPM works in conjunction with DRS (Distributed Resource Scheduler) to monitor cluster resource utilization and make intelligent decisions about host power states. When cluster demand is low, DPM identifies hosts that can be safely powered off without affecting VM performance or availability.

## Key Features

### Automated Power Management
- **Host Power Off**: Automatically powers down underutilized hosts
- **Host Power On**: Powers on hosts when resources are needed
- **Workload Consolidation**: Consolidates VMs to fewer hosts
- **Energy Savings**: Reduces power consumption and cooling costs

### Intelligent Decision Making
- **Utilization Analysis**: Analyzes CPU and memory utilization trends
- **Prediction Algorithms**: Predicts future resource requirements
- **DRS Integration**: Works with DRS for optimal placement
- **Maintenance Mode**: Places hosts in maintenance mode before shutdown

### Policy-Based Control
- **Automation Levels**: Manual, partially automated, fully automated
- **Time-Based Policies**: Different policies for different times
- **Aggression Levels**: Conservative to aggressive power management
- **Exclusion Lists**: Specify hosts that should never be powered off

## Architecture

### DPM Components
- **DRS Dependency**: Requires DRS to be enabled
- **vCenter Server**: Central coordination point
- **Host Agents**: Local agents on each ESXi host
- **Power Management Interface**: Interfaces with hardware power controls

### Decision Process
1. **Resource Assessment**: Evaluates current resource usage
2. **Demand Prediction**: Predicts future resource requirements
3. **Candidate Selection**: Identifies suitable hosts for power off
4. **VM Motion**: Migrates VMs using vMotion to other hosts
5. **Power Action**: Executes power on/off commands
6. **Monitoring**: Continues monitoring for changing conditions

### Power States
- **Powered On**: Normal operational state
- **Standby**: Low power state with quick resume capability
- **Powered Off**: Complete power down for maximum savings
- **Maintenance Mode**: Preparation state before power off

## Configuration and Management

### Enabling DPM
```bash
# Enable DPM via esxcli
esxcli system settings advanced set -o /DPM/Enabled -i 1

# Configure DPM settings via PowerCLI
Get-Cluster "Cluster01" | Set-Cluster -DrsEnabled $true -DpmEnabled $true
```

### DPM Configuration Options
```xml
<!-- DPM configuration parameters -->
<config>
  <dpmConfig>
    <enabled>true</enabled>
    <defaultDpmBehavior>dpmAutomated</defaultDpmBehavior>
    <hostPowerActionRate>3</hostPowerActionRate>
    <dpmThreshold>4</dpmThreshold>
  </dpmConfig>
</config>
```

### Automation Levels
- **Manual**: Recommendations only, no automatic actions
- **Partially Automated**: Power on automated, power off manual
- **Fully Automated**: Both power on and off automated

## vSphere 9 Enhancements

### Improved Intelligence
- **Machine Learning**: Enhanced prediction algorithms using ML
- **Pattern Recognition**: Better recognition of usage patterns
- **Dynamic Adjustment**: Real-time adjustment of policies
- **Integration with Monitoring**: Better integration with vRealize Operations

### Performance Optimizations
- **Faster Response**: Quicker response to changing conditions
- **Reduced Overhead**: Lower computational overhead
- **Enhanced Coordination**: Better coordination with DRS
- **Improved Accuracy**: More accurate predictions

### Energy Efficiency
- **Granular Control**: More granular power state control
- **Hardware Integration**: Better integration with modern hardware
- **Green Computing**: Enhanced green computing capabilities
- **Reporting**: Detailed energy consumption reporting

## Best Practices

1. **Cluster Sizing**: Ensure adequate resources on remaining hosts
2. **Workload Analysis**: Understand workload patterns before enabling
3. **Testing**: Test DPM behavior in non-production environments
4. **Monitoring**: Monitor power state changes and their impact
5. **Hardware Compatibility**: Ensure hardware supports power management
6. **Network Design**: Maintain network connectivity during power cycles

## Troubleshooting Commands

```bash
# Check DPM status
esxcli system settings advanced list -o /DPM/

# View DPM recommendations
vim-cmd dasadmin dpmrecommendations

# Check host power state
esxcli hardware platform get | grep -i power

# View DRS/DPM logs
tail -f /var/log/vpxa.log | grep -i "dpm\|drs"

# Check power management configuration
vim-cmd hostsvc/power/info
```

## Related Technologies

- [DRS](drs.md) - Balances VM loads across hosts
- [HA](ha.md) - Provides high availability for VMs
- [vMotion](vmotion.md) - Enables live migration of VMs
- [Cluster](cluster.md) - Grouped hosts with DPM features