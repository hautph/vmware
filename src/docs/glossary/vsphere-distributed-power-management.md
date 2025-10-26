---
term: vSphere Distributed Power Management (DPM)
category: Core_Architecture
---

vSphere Distributed Power Management (DPM) is a feature that automatically powers on and off ESXi hosts based on resource demand to optimize power consumption in the data center. DPM works in conjunction with Distributed Resource Scheduler (DRS) to provide intelligent power management that reduces operational costs while maintaining performance and availability requirements.

## Overview

vSphere Distributed Power Management provides:
- Automated host power management based on resource demand
- Integration with DRS for intelligent decision making
- Significant power and cost savings in data centers
- Support for various power management policies
- Integration with hardware power management features

## Key Features

### Power Management
- **Automated Power Operations**: Automatic host power on/off based on demand
- **Consolidation Recommendations**: Host consolidation to reduce power consumption
- **Power Policy Controls**: Configurable power management policies
- **Hardware Integration**: Integration with server hardware power management

### Energy Efficiency
- **Power Consumption Reduction**: Significant reduction in data center power usage
- **Cost Savings**: Lower electricity costs through reduced consumption
- **Environmental Benefits**: Reduced carbon footprint and environmental impact
- **Resource Optimization**: Better utilization of active hosts

### Integration Capabilities
- **DRS Integration**: Works with DRS for intelligent placement decisions
- **Hardware Support**: Support for various server hardware platforms
- **Monitoring**: Detailed power consumption and savings reporting
- **Policy Management**: Flexible power management policies

## Architecture

### Components
- **DPM Service**: Central service that manages power operations
- **DRS Integration**: Integration with DRS placement engine
- **Hardware Interface**: Interface with server hardware power management
- **Policy Engine**: Engine that evaluates power management policies
- **Monitoring System**: System that tracks power consumption and savings

### Decision Making Process
1. **Resource Analysis**: DRS analyzes cluster resource utilization
2. **Power Evaluation**: DPM evaluates potential power savings
3. **Recommendation Generation**: DPM generates power management recommendations
4. **Policy Validation**: Recommendations validated against power policies
5. **Execution**: Host power operations executed based on recommendations

### Power States
- **Powered On**: Host actively running workloads
- **Standby**: Host in low-power state, can be quickly powered on
- **Powered Off**: Host completely powered off for maximum savings
- **Maintenance Mode**: Host in maintenance mode for operations

## Configuration Examples

### PowerCLI Configuration
```powershell
# Enable DPM on a cluster
Get-Cluster "ProductionCluster" | Set-Cluster -DpmEnabled $true -DpmAutomationLevel Automated

# Configure DPM advanced settings
Get-Cluster "ProductionCluster" | Get-AdvancedSetting -Name "Dpm.DpmPowerPolicy" | Set-AdvancedSetting -Value 2

# View DPM status
Get-Cluster "ProductionCluster" | Select-Object Name, DpmEnabled, DpmAutomationLevel
```

### ESXi CLI Configuration
```bash
# Check DPM status
esxcli system settings advanced list -o /Power/DPMEnable

# View power management settings
esxcli system settings advanced list -o /Power/

# Check host power state
esxcli hardware platform get
```

### vSphere Client Configuration
```xml
<!-- DPM configuration in cluster settings -->
<dpm>
enabled = true
automationLevel = 2
powerPolicy = 2
</dpm>
```

## Requirements

### Hardware
- **Compatible Servers**: Servers with IPMI or WS-Man power management support
- **Network Connectivity**: Out-of-band management network access
- **Power Management**: Hardware support for remote power operations
- **DRS Compatibility**: Hosts must be part of DRS-enabled cluster

### Software
- **vCenter Server**: Required for DPM management
- **ESXi 4.0 or later**: Hosts with DPM support
- **DRS Enabled**: DRS must be enabled for DPM functionality
- **Proper Licensing**: vSphere Enterprise or Enterprise Plus license

### Network
- **Management Network**: Reliable management network connectivity
- **Out-of-Band Access**: IPMI or iDRAC/iLO access for power operations
- **DNS Resolution**: Proper DNS resolution for management interfaces
- **Firewall Configuration**: Appropriate firewall rules for management traffic

## Automation Levels

### Manual
- DPM generates recommendations but requires manual approval
- Administrators review and approve each power operation
- Provides maximum control with automated analysis

### Automated
- DPM automatically executes power management operations
- No manual intervention required for routine operations
- Optimal for environments with consistent workload patterns

## Power Policies

### Conservative (1)
- **Low Aggressiveness**: Conservative approach to power management
- **Minimal Power Savings**: Lower power savings but higher availability
- **Infrequent Operations**: Less frequent host power operations
- **Higher Resource Headroom**: More resources kept available

### Moderate (2)
- **Balanced Approach**: Balance between power savings and performance
- **Moderate Savings**: Moderate power savings with reasonable availability
- **Regular Operations**: Regular host power operations based on demand
- **Optimized Resources**: Better resource utilization

### Aggressive (3)
- **High Aggressiveness**: Aggressive approach to power management
- **Maximum Savings**: Maximum power savings but lower availability
- **Frequent Operations**: More frequent host power operations
- **Tight Resource Utilization**: Tighter resource utilization

## Best Practices

1. **Workload Analysis**: Understand workload patterns before enabling DPM
2. **Policy Selection**: Choose appropriate power policy based on requirements
3. **Monitoring**: Regularly monitor power consumption and savings
4. **Testing**: Test DPM behavior in non-production environments
5. **Hardware Compatibility**: Verify hardware compatibility before deployment
6. **Network Reliability**: Ensure reliable management network connectivity

## vSphere 8 Enhancements

### Improved Integration
- **Enhanced DRS Integration**: Better coordination with DRS placement
- **Hardware Support**: Improved support for modern server hardware
- **Policy Management**: More flexible power management policies
- **Monitoring**: Enhanced power consumption monitoring

### Performance Improvements
- **Faster Operations**: Faster host power on/off operations
- **Reduced Overhead**: Lower overhead for power management operations
- **Better Decision Making**: Improved algorithms for power decisions
- **Enhanced Reliability**: More reliable power management operations

### Management Features
- **Advanced Monitoring**: Better visibility into power operations
- **Improved Reporting**: Better reporting on power savings
- **Streamlined Configuration**: Simplified DPM configuration
- **Enhanced Troubleshooting**: Better diagnostic capabilities

## Troubleshooting Commands

```bash
# Check DPM status and configuration
esxcli system settings advanced list -o /Power/DPMEnable
esxcli system settings advanced list -o /Power/DpmPowerPolicy

# View power management recommendations
vim-cmd vimsvc/task_list | grep -i dpm

# Check host power state
esxcli hardware platform get

# View DPM logs
tail -f /var/log/vmware/vpxd.log | grep -i dpm
```

## Related Technologies

- [DRS](/glossary/term/drs.md)
- [High Availability](/glossary/term/vsphere-high-availability.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)