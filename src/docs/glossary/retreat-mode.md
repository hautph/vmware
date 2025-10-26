---
term: Retreat Mode
category: High_Availability
---

Retreat Mode is a protective state in VMware vSphere High Availability (HA) that prevents a host from participating in HA activities when it detects potential issues that could affect cluster stability. This mode helps maintain cluster integrity by isolating problematic hosts and preventing them from causing cascading failures or compromising the availability of other hosts in the cluster.

## Overview

Retreat Mode provides:
- Automatic protection against host instability
- Cluster integrity maintenance during issues
- Isolation of problematic hosts from HA operations
- Prevention of cascading failures in HA clusters
- Enhanced overall cluster reliability and stability

## Key Features

### Protective Mechanisms
- **Automatic Detection**: Automatic detection of host instability
- **Isolation Protection**: Isolation of problematic hosts
- **Cluster Stability**: Maintenance of cluster stability
- **Failure Prevention**: Prevention of cascading failures
- **Self-Protection**: Self-protecting cluster mechanisms

### Stability Monitoring
- **Health Checks**: Continuous health monitoring
- **Performance Metrics**: Performance metric analysis
- **Resource Monitoring**: Resource utilization monitoring
- **Network Connectivity**: Network connectivity monitoring
- **Component Health**: Individual component health checks

### Isolation Capabilities
- **HA Activity Suspension**: Suspension of HA activities
- **Cluster Communication**: Controlled cluster communication
- **Workload Protection**: Protection of running workloads
- **Resource Reservation**: Reservation of critical resources
- **Graceful Degradation**: Graceful degradation of services

## Architecture

### Detection Components
- **Health Monitoring Service**: Service for continuous health monitoring
- **Performance Analyzer**: Analyzer for performance metrics
- **Resource Manager**: Manager for resource monitoring
- **Network Monitor**: Monitor for network connectivity
- **Component Checker**: Checker for individual components

### Decision Making
- **Threshold Evaluation**: Evaluation against configured thresholds
- **Pattern Recognition**: Recognition of instability patterns
- **Risk Assessment**: Assessment of potential risks
- **Trigger Conditions**: Conditions that trigger retreat mode
- **Recovery Monitoring**: Monitoring for recovery conditions

### Response Mechanisms
- **Activity Suspension**: Suspension of HA activities
- **Communication Control**: Control of cluster communication
- **Resource Management**: Management of critical resources
- **Status Reporting**: Reporting of retreat mode status
- **Recovery Initiation**: Initiation of recovery procedures

## Configuration Examples

### PowerCLI Configuration
```powershell
# Check retreat mode status
Get-Cluster "ProductionCluster" | Get-AdvancedSetting -Name "das.retreatMode"

# Configure retreat mode settings
Get-Cluster "ProductionCluster" | New-AdvancedSetting -Name "das.retreatMode" -Value $true -Confirm:$false

# Set detection thresholds
Get-Cluster "ProductionCluster" | New-AdvancedSetting -Name "das.retreatMode.threshold" -Value "medium" -Confirm:$false

# View HA configuration
Get-Cluster "ProductionCluster" | Select-Object Name, HAEnabled, HAAdmissionControlEnabled
```

### ESXi CLI Configuration
```bash
# Check retreat mode status
esxcli system settings advanced list -o /HA/RetreatMode

# View HA configuration
esxcli system settings advanced list -o /HA/

# Check host health status
esxcli system health status get

# View retreat mode logs
tail -f /var/log/vmware/hostd.log | grep -i "retreat"
```

### vSphere Client Configuration
```ini
# Retreat mode configuration
[retreat-mode]
enabled = true
detection_threshold = medium
isolation_response = poweroff
timeout = 300
```

## Requirements

### Software
- **vCenter Server**: Required for centralized HA management
- **ESXi 6.0 or later**: Hosts with retreat mode support
- **HA Enabled**: HA must be enabled on clusters
- **Proper Licensing**: vSphere Enterprise or Enterprise Plus license
- **Management Tools**: Compatible management tools

### Hardware
- **Compatible Hardware**: Hardware compatible with ESXi
- **Network Infrastructure**: Reliable network infrastructure
- **Storage Systems**: Compatible storage systems
- **Redundancy**: Proper redundancy planning
- **Monitoring**: Adequate monitoring capabilities

### Network
- **Reliable Connectivity**: Reliable network connectivity
- **Low Latency**: Low latency network connections
- **Bandwidth**: Adequate network bandwidth
- **Redundancy**: Network redundancy
- **Security**: Network security measures

## Detection Thresholds

### Low Sensitivity
- **Conservative Detection**: Conservative failure detection
- **Fewer Triggers**: Fewer conditions trigger retreat mode
- **Higher Tolerance**: Higher tolerance for issues
- **Less Frequent**: Less frequent retreat mode activation
- **Stable Operations**: More stable normal operations

### Medium Sensitivity
- **Balanced Detection**: Balanced failure detection
- **Moderate Triggers**: Moderate conditions trigger retreat mode
- **Reasonable Tolerance**: Reasonable tolerance for issues
- **Regular Activation**: Regular retreat mode activation
- **Good Balance**: Good balance of stability and responsiveness

### High Sensitivity
- **Aggressive Detection**: Aggressive failure detection
- **Many Triggers**: Many conditions trigger retreat mode
- **Low Tolerance**: Low tolerance for issues
- **Frequent Activation**: Frequent retreat mode activation
- **High Responsiveness**: High responsiveness to issues

## Best Practices

1. **Threshold Tuning**: Tune detection thresholds appropriately
2. **Monitoring**: Monitor retreat mode events
3. **Testing**: Test retreat mode behavior
4. **Documentation**: Document configurations and procedures
5. **Alerting**: Set up alerts for retreat mode activation
6. **Recovery**: Plan for recovery procedures

## vSphere 8 Enhancements

### Improved Detection
- **Enhanced Monitoring**: Better health monitoring capabilities
- **Advanced Analytics**: More advanced analytics for detection
- **Better Thresholds**: Improved threshold management
- **Enhanced Reporting**: Better reporting of detection events

### Enhanced Features
- **Advanced Isolation**: More advanced isolation capabilities
- **Better Integration**: Better integration with other HA features
- **Enhanced Security**: Enhanced security features
- **Streamlined Operations**: Simplified management operations

### Performance Improvements
- **Faster Detection**: Faster detection of issues
- **Reduced Overhead**: Lower monitoring overhead
- **Better Scalability**: Better handling of large clusters
- **Enhanced Reliability**: More reliable detection mechanisms

## Troubleshooting Commands

```bash
# Check retreat mode status
esxcli system settings advanced list -o /HA/RetreatMode

# View HA configuration
esxcli system settings advanced list -o /HA/

# Check host health
esxcli system health status get

# View retreat mode logs
tail -f /var/log/vmware/hostd.log | grep -i "retreat"

# Check cluster status
vim-cmd vimsvc/cluster/config_get <cluster_id>
```

## Related Technologies

- [High Availability](/glossary/term/vsphere-high-availability.md)
- [DRS](/glossary/term/drs.md)
- [Fault Tolerance](/glossary/term/fault-tolerance.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [ESXi](/glossary/term/esxi.md)