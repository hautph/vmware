---
term: Proactive HA
category: Availability_Migration
---

Proactive HA is a vSphere feature that works with hardware vendors to monitor the health of ESXi hosts and proactively evacuate virtual machines before a hardware failure occurs, reducing unplanned downtime. Proactive HA extends traditional High Availability by providing predictive failure detection and automated remediation, ensuring continuous availability of virtualized workloads through intelligent hardware health monitoring.

## Overview

Proactive HA provides:
- Predictive hardware failure detection
- Automated VM evacuation before failures
- Integration with hardware vendor monitoring tools
- Reduced unplanned downtime through proactive measures
- Enhanced availability for mission-critical workloads

## Key Features

### Predictive Monitoring
- **Hardware Health Monitoring**: Continuous monitoring of hardware components
- **Vendor Integration**: Integration with vendor-specific monitoring tools
- **Predictive Analytics**: Predictive analysis of hardware health trends
- **Early Warning Systems**: Early warning of potential hardware failures
- **Real-Time Alerts**: Real-time alerts for hardware issues

### Automated Remediation
- **Proactive VM Evacuation**: Automatic evacuation of VMs before failures
- **Graceful Shutdown**: Graceful shutdown of affected hosts
- **Workload Redistribution**: Redistribution of workloads to healthy hosts
- **Minimal Downtime**: Minimal downtime during remediation
- **Automated Recovery**: Automated recovery procedures

### Vendor Integration
- **Dell OpenManage**: Integration with Dell OpenManage
- **HPE iLO**: Integration with HPE Integrated Lights-Out
- **Lenovo XClarity**: Integration with Lenovo XClarity
- **Cisco Intersight**: Integration with Cisco Intersight
- **Custom Providers**: Support for custom monitoring providers

### Management Capabilities
- **Centralized Management**: Centralized management through vCenter Server
- **Policy Configuration**: Configurable remediation policies
- **Compliance Reporting**: Compliance and health reporting
- **Audit Trails**: Detailed audit trails of remediation actions
- **Integration Workflows**: Integration with existing workflows

## Architecture

### Components
- **Proactive HA Service**: Central service for proactive monitoring
- **Provider Framework**: Framework for vendor integration
- **Health Monitoring**: Continuous health monitoring system
- **Remediation Engine**: Automated remediation engine
- **Policy Manager**: Policy management system

### Monitoring Providers
- **Hardware Sensors**: Hardware sensor data collection
- **Firmware Monitoring**: Firmware health monitoring
- **Component Health**: Individual component health monitoring
- **Performance Metrics**: Hardware performance metrics
- **Diagnostic Data**: Hardware diagnostic information

### Remediation Workflow
1. **Health Monitoring**: Continuous monitoring of hardware health
2. **Failure Prediction**: Prediction of potential hardware failures
3. **Alert Generation**: Generation of proactive alerts
4. **Remediation Trigger**: Triggering of remediation actions
5. **VM Evacuation**: Evacuation of VMs from affected hosts
6. **Host Isolation**: Isolation of affected hosts
7. **Recovery Monitoring**: Monitoring of recovery processes

## Configuration Examples

### PowerCLI Configuration
```powershell
# Enable Proactive HA
Set-Cluster -Cluster "ProductionCluster" -ProactiveHAEnabled $true

# Configure Proactive HA providers
New-ProactiveHAClusterProvider -Cluster "ProductionCluster" -ProviderName "DellOpenManage" -Enabled $true

# Set remediation level
Set-Cluster -Cluster "ProductionCluster" -ProactiveHARemediationLevel Automated

# View Proactive HA status
Get-Cluster "ProductionCluster" | Select-Object Name, ProactiveHAEnabled, ProactiveHARemediationLevel
```

### ESXi CLI Configuration
```bash
# Check Proactive HA status
esxcli system settings advanced list -o /Misc/ProactiveHAEnabled

# View provider configuration
esxcli system settings advanced list -o /Misc/ProactiveHAProviders

# Check health status
esxcli system health status get

# View remediation logs
tail -f /var/log/vmware/proactiveha.log
```

### vSphere Client Configuration
```xml
# Proactive HA configuration
[proactive-ha]
enabled = true
providers = dell-openmanage, hp-ilo, lenovo-xclarity
remediation = automated
isolation_response = poweroff
```

## Requirements

### Hardware
- **Supported Hardware**: Hardware with vendor monitoring support
- **Compatible Sensors**: Compatible hardware health sensors
- **Firmware Support**: Firmware with health monitoring support
- **Network Connectivity**: Reliable network connectivity for monitoring
- **Redundancy**: Proper hardware redundancy

### Software
- **vCenter Server 6.5 or later**: Required for Proactive HA
- **ESXi 6.5 or later**: Hosts with Proactive HA support
- **Vendor Tools**: Compatible vendor monitoring tools
- **Proper Licensing**: vSphere Enterprise or Enterprise Plus license
- **Management Tools**: Compatible management tools

### Vendor Integration
- **Dell OpenManage**: Dell OpenManage integration
- **HPE iLO**: HPE Integrated Lights-Out integration
- **Lenovo XClarity**: Lenovo XClarity integration
- **Cisco Intersight**: Cisco Intersight integration
- **Custom Providers**: Support for custom providers

## Remediation Levels

### Manual
- **Alert Generation**: Generation of alerts only
- **Manual Response**: Manual response to alerts
- **Administrator Control**: Full administrator control
- **No Automation**: No automated remediation
- **Review Process**: Review process for actions

### Automated
- **Automatic Response**: Automatic response to alerts
- **VM Evacuation**: Automatic VM evacuation
- **Host Isolation**: Automatic host isolation
- **Workload Redistribution**: Automatic workload redistribution
- **Recovery Monitoring**: Automatic recovery monitoring

## Best Practices

1. **Planning**: Plan Proactive HA deployment carefully
2. **Vendor Integration**: Ensure proper vendor tool integration
3. **Monitoring**: Monitor Proactive HA operations
4. **Testing**: Test remediation procedures
5. **Documentation**: Document configurations and procedures
6. **Compliance**: Ensure compliance with policies

## vSphere 8 Enhancements

### Improved Integration
- **Enhanced Vendor Support**: Better vendor integration
- **Advanced Monitoring**: More advanced monitoring capabilities
- **Better Policies**: More flexible policy management
- **Enhanced Reporting**: Better reporting capabilities

### Performance Improvements
- **Faster Detection**: Faster failure detection
- **Reduced Overhead**: Lower monitoring overhead
- **Better Scalability**: Better handling of large environments
- **Enhanced Reliability**: More reliable monitoring

### Advanced Features
- **Enhanced Analytics**: Better predictive analytics
- **Improved Remediation**: More intelligent remediation
- **Advanced Integration**: Better third-party integration
- **Streamlined Operations**: Simplified management operations

## Troubleshooting Commands

```bash
# Check Proactive HA status
esxcli system settings advanced list -o /Misc/ProactiveHAEnabled

# View provider status
esxcli system settings advanced list -o /Misc/ProactiveHAProviders

# Check health status
esxcli system health status get

# View Proactive HA logs
tail -f /var/log/vmware/proactiveha.log

# Check cluster configuration
vim-cmd vimsvc/cluster/config_get <cluster_id>
```

## Related Technologies

- [High Availability](/glossary/term/vsphere-high-availability.md)
- [Fault Tolerance](/glossary/term/fault-tolerance.md)
- [DRS](/glossary/term/drs.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [ESXi](/glossary/term/esxi.md)