---
term: HA (vSphere HA)
category: Management_and_Clusters
---

HA (vSphere High Availability) is a VMware vSphere feature that provides automatic restart of virtual machines on alternate hosts in the event of host failures, ensuring continuous availability of applications and services.

## Overview

vSphere HA continuously monitors the health of ESXi hosts and virtual machines within a cluster. When a host failure is detected, HA automatically restarts affected virtual machines on other available hosts in the cluster without manual intervention.

## Key Features

### Automatic Failure Detection
- **Host Monitoring**: Monitors ESXi host health through heartbeats
- **VM Monitoring**: Monitors individual VM heartbeat status
- **Network Isolation Response**: Handles network partition scenarios
- **Datastore Heartbeating**: Uses datastore-based heartbeats for reliability

### Fast Recovery
- **Rapid VM Restart**: Restarts VMs within minutes of failure detection
- **Resource Allocation**: Reserves cluster resources for failover
- **Priority-Based Restart**: Configurable restart priority for VMs
- **Admission Control**: Ensures adequate resources for failover

### Protection Mechanisms
- **Host Isolation Response**: Handles isolated hosts gracefully
- **VM Component Protection**: Protects VM components during failures
- **Datastore Access Protection**: Prevents split-brain scenarios
- **Network Redundancy**: Supports redundant network paths

## Architecture

### HA Agents
- **Master Agent**: Coordinates HA activities within cluster
- **Slave Agents**: Run on each host to report status
- **Agent Communication**: Uses secure communication channels
- **Failover Election**: Automatic election of new master agent

### Heartbeat Mechanisms
- **Network Heartbeats**: Primary heartbeat mechanism
- **Datastore Heartbeats**: Secondary heartbeat mechanism
- **Timeout Settings**: Configurable timeout values
- **Failure Thresholds**: Adjustable failure detection thresholds

### Admission Control
- **Slot-Based Policy**: Reserves resources based on slot sizes
- **Reservation-Based Policy**: Considers actual VM reservations
- **Percentage-Based Policy**: Reserves percentage of cluster resources
- **Custom Policy**: Flexible admission control policies

## Configuration and Management

### Cluster Requirements
```bash
# Enable HA on cluster
esxcli system settings advanced set -o /HA/Enabled -i 1

# Configure HA settings via PowerCLI
Get-Cluster "Cluster01" | Set-Cluster -HAEnabled $true -HAAdmissionControlEnabled $true
```

### Host Monitoring Configuration
```xml
<!-- HA host monitoring configuration -->
<config>
  <dasConfig>
    <enabled>true</enabled>
    <hostMonitoring>true</hostMonitoring>
    <vmMonitoring>vmMonitoringOnly</vmMonitoring>
    <failoverLevel>1</failoverLevel>
  </dasConfig>
</config>
```

### VM Monitoring Settings
- **VM Monitoring Sensitivity**: Adjust sensitivity levels
- **Failure Interval**: Time before declaring VM failure
- **Minimum Uptime**: Minimum uptime before monitoring
- **Maximum Failures**: Maximum failures before disabling

## vSphere 9 Enhancements

### Improved Monitoring
- **Enhanced VM Monitoring**: Better detection of application-level failures
- **Predictive Analytics**: Proactive identification of potential issues
- **Machine Learning**: ML-based failure prediction algorithms
- **Integrated Logging**: Comprehensive logging for troubleshooting

### Performance Optimizations
- **Faster Failover**: Reduced failover times
- **Resource Efficiency**: Better resource utilization
- **Parallel Processing**: Concurrent restart of multiple VMs
- **Load Distribution**: Intelligent load distribution post-failover

### Security Features
- **Encrypted Communication**: Secure agent communications
- **Authentication**: Strong authentication mechanisms
- **Authorization**: Granular permission controls
- **Audit Trail**: Comprehensive audit logging

## Best Practices

1. **Resource Planning**: Ensure adequate cluster resources for failover
2. **Heartbeat Configuration**: Configure redundant heartbeat datastores
3. **Monitoring Settings**: Adjust monitoring sensitivity based on workload
4. **Test Regularly**: Regularly test failover scenarios
5. **Network Design**: Implement redundant network paths
6. **Storage Redundancy**: Use redundant storage configurations

## Troubleshooting Commands

```bash
# Check HA status
esxcli system settings advanced list -o /HA/

# View HA cluster information
vim-cmd dasadmin clusterinfo

# Check HA agent status
vim-cmd dasadmin hostinfo

# View HA events
tail -f /var/log/hostd.log | grep -i "das\|ha"

# Check HA configuration
vim-cmd dasadmin getconfig
```

## Related Technologies

- [Cluster](cluster.md) - Grouped hosts with HA features
- [DRS](drs.md) - Distributes VM loads across hosts
- [Proactive HA](proactive-ha.md) - Evacuates VMs from degrading hosts
- [Fault Tolerance](fault-tolerance.md) - Zero-downtime failover solution