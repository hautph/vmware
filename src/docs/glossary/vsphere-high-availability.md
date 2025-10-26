---
term: vSphere High Availability (HA)
category: Availability_Migration
---

vSphere High Availability (HA) is a feature that provides automatic restart of virtual machines on alternate ESXi hosts in the event of host failures, ensuring business continuity and minimizing downtime. HA continuously monitors the health of ESXi hosts and virtual machines, automatically responding to failures to maintain service availability.

## Overview

vSphere HA provides:
- Automatic VM restart after host failures
- Continuous monitoring of host and VM health
- Admission control to ensure resources for failover
- Integration with other vSphere availability features
- Customizable failure response policies

## Key Features

### Host Monitoring
- **Heartbeat Monitoring**: Continuous host health monitoring
- **Agent Monitoring**: VM monitoring through VMware Tools
- **Network Isolation Response**: Handling of network partitioning
- **Datastore Heartbeating**: Storage-level health monitoring

### VM Protection
- **Automatic Restart**: VM restart on alternate hosts
- **Failure Response Policies**: Customizable failure responses
- **VM Component Protection**: Protection of critical VM components
- **VM Health Monitoring**: Continuous VM health assessment

### Admission Control
- **Slot Policy**: Resource reservation based on slot sizing
- **Fixed Slot Size**: Defined slot size for resource calculation
- **Percentage of Cluster Resources**: Percentage-based resource reservation
- **Specify Failover Hosts**: Dedicated hosts for failover

## Architecture

### HA Agents
- **Master Agent**: Cluster-wide coordination and decision making
- **Slave Agents**: Host-level monitoring and execution
- **Witness Node**: Tie-breaking in master election
- **Communication Channels**: Secure agent communication

### Heartbeat Mechanisms
- **Management Network**: Primary heartbeat channel
- **Datastore Heartbeating**: Storage-based heartbeat
- **Network Redundancy**: Multiple network paths
- **Isolation Response**: Network isolation handling

### Failover Process
1. **Failure Detection**: Host or VM failure detection
2. **Master Election**: Selection of new master agent
3. **Resource Assessment**: Evaluation of available resources
4. **VM Restart**: Restart of protected VMs
5. **Post-Restart Monitoring**: Verification of successful restart

## Configuration Examples

### PowerShell/PowerCLI Configuration
```powershell
# Enable HA on a cluster with advanced settings
Get-Cluster "ProductionCluster" | Set-Cluster -HAEnabled $true -HAAdmissionControlEnabled $true -HAAdmissionControlPolicy (New-HAAdmissionControlPolicy -PercentagePolicy -FailoverLevel 1)

# Configure HA advanced settings
Get-Cluster "ProductionCluster" | Get-AdvancedSetting -Name "das.config.heartbeatDetectionTimeout" | Set-AdvancedSetting -Value 120

# Set VM restart priority
Get-VM "CriticalVM" | Set-VM -RestartPriority High
```

### ESXi CLI Configuration
```bash
# Check HA status
esxcli system settings advanced list -o /Das/Enabled

# View HA configuration
vim-cmd dasadmin/config/get

# Check HA agent status
vim-cmd dasadmin/cluster/get
```

## Admission Control Policies

### Slot Policy
- **Dynamic Slot Size**: Automatically calculated slot size
- **Fixed Slot Size**: Administrator-defined slot size
- **Slot Utilization**: Efficient resource utilization
- **Resource Requirements**: Accurate resource assessment

### Percentage of Cluster Resources
- **Resource Reservation**: Percentage-based resource reservation
- **Flexible Allocation**: Dynamic resource allocation
- **Scalable Protection**: Protection that scales with cluster size
- **Resource Efficiency**: Efficient resource utilization

### Specify Failover Hosts
- **Dedicated Hosts**: Dedicated hosts for failover
- **Guaranteed Resources**: Guaranteed resources for failover
- **Simplified Management**: Simplified admission control
- **Predictable Performance**: Predictable failover performance

## vSphere 8 Enhancements

### Enhanced Monitoring
- **Improved Heartbeat Detection**: Faster failure detection
- **Advanced Isolation Response**: Better network isolation handling
- **Enhanced VM Monitoring**: More sophisticated VM health monitoring
- **Reduced False Positives**: Better failure detection accuracy

### Performance Improvements
- **Faster Failover**: Accelerated failover processes
- **Reduced Downtime**: Minimized service interruption
- **Better Resource Utilization**: More efficient resource usage
- **Enhanced Scalability**: Better scalability for large clusters

### Modern Management Integration
- **Lifecycle Management**: Better integration with vSphere Lifecycle Manager
- **Policy Management**: Enhanced policy-driven management
- **Simplified Operations**: Streamlined management operations
- **Improved Troubleshooting**: Better diagnostic capabilities

## Best Practices

1. **Cluster Design**: Design clusters with adequate resources for failover
2. **Admission Control**: Configure appropriate admission control policies
3. **Network Redundancy**: Implement redundant network paths
4. **Datastore Heartbeating**: Configure multiple datastore heartbeats
5. **Monitoring**: Regularly monitor HA status and health
6. **Testing**: Regularly test failover scenarios

## Troubleshooting Commands

```bash
# Check HA status
esxcli system settings advanced list -o /Das/Enabled

# View HA configuration
vim-cmd dasadmin/config/get

# Check HA agent status
vim-cmd dasadmin/cluster/get

# View HA logs
tail -f /var/log/vmware/hostd.log | grep -i ha
```

## Related Technologies

- [Fault Tolerance](/glossary/term/fault-tolerance.md)
- [vMotion](/glossary/term/vmotion.md)
- [DRS](/glossary/term/drs.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [VMware Tools](/glossary/term/vmware-tools.md)