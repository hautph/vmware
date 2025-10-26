---
term: FT (Fault Tolerance)
category: Management_and_Clusters
---

FT (Fault Tolerance) is a VMware vSphere feature that provides continuous availability for virtual machines by creating and maintaining a live secondary copy of the VM that can take over instantly in case of host or hardware failures, ensuring zero downtime and zero data loss.

## Overview

vSphere Fault Tolerance eliminates unplanned downtime by running two identical copies of a virtual machine on separate ESXi hosts. These VMs are kept in perfect synchronization, with all inputs replicated in real-time to ensure seamless failover without any data loss or service interruption.

## Key Features

### Continuous Protection
- **Zero Downtime**: Instantaneous failover with no service interruption
- **Zero Data Loss**: Complete data protection during failover
- **No Performance Impact**: Minimal impact on primary VM performance
- **Automatic Failover**: Transparent failover without manual intervention

### Real-Time Synchronization
- **Input Replication**: All inputs replicated in real-time to secondary VM
- **Deterministic Execution**: Ensures identical execution on both VMs
- **Lockstep Processing**: Primary and secondary execute in lockstep
- **Network Redundancy**: Separate network paths for replication

### Supported Configurations
- **Single vCPU VMs**: Support for VMs with single virtual CPU
- **Limited Memory**: Memory limitations based on vSphere version
- **Specific Storage**: Requirements for shared storage
- **Network Requirements**: Dedicated FT logging network

## Architecture

### FT Components
- **Primary VM**: Original VM running on primary host
- **Secondary VM**: Exact copy running on secondary host
- **FT Logging Network**: Dedicated network for synchronization
- **vCenter Server**: Centralized management and coordination

### Synchronization Process
1. **Input Capture**: All inputs captured on primary VM
2. **Network Transmission**: Inputs sent over FT logging network
3. **Input Application**: Secondary VM applies identical inputs
4. **Output Comparison**: Outputs compared for consistency
5. **Continuous Monitoring**: Ongoing health and synchronization checks

### Failover Mechanism
- **Failure Detection**: Immediate detection of primary VM failure
- **Secondary Promotion**: Instant promotion of secondary to primary
- **Network Reconfiguration**: Network identity transfer to secondary
- **Continued Operation**: Normal operation continues on secondary

## Configuration and Management

### Enabling FT
```bash
# Enable FT on VM via PowerCLI
Get-VM "VM01" | Set-VM -FaultToleranceEnabled $true

# Check FT status
vim-cmd vmsvc/get.ftinfo <vmid>

# Configure FT logging network
esxcli network vswitch standard portgroup add -p "FT-Logging" -v "vSwitch0"
```

### FT Configuration Requirements
```xml
<!-- FT VM configuration parameters -->
<config>
  <ftConfig>
    <enabled>true</enabled>
    <secondaryVmEnabled>true</secondaryVmEnabled>
    <loggingNic>vmk1</loggingNic>
    <instanceUuid>564d1234-1234-1234-1234-123456789012</instanceUuid>
  </ftConfig>
</config>
```

### Hardware Requirements
- **CPU Compatibility**: EVC-enabled cluster with compatible CPUs
- **Memory**: Sufficient memory on both hosts
- **Network**: Dedicated FT logging network with low latency
- **Storage**: Shared storage accessible to both hosts

## vSphere 9 Enhancements

### Enhanced Performance
- **Multi-Socket FT**: Support for VMs with multiple vCPUs
- **Improved Efficiency**: Better resource utilization
- **Reduced Overhead**: Lower synchronization overhead
- **Scalability**: Support for larger VM configurations

### Advanced Features
- **Tanzu Integration**: Better integration with Kubernetes workloads
- **NSX Integration**: Enhanced networking integration
- **Storage Integration**: Better storage protocol support
- **Monitoring**: Enhanced monitoring and alerting capabilities

### Security Improvements
- **Encrypted FT**: Encrypted FT logging communication
- **Authentication**: Stronger authentication mechanisms
- **Isolation**: Enhanced VM isolation
- **Compliance**: Better compliance reporting

## Best Practices

1. **Resource Planning**: Ensure adequate resources on both hosts
2. **Network Design**: Implement low-latency FT logging network
3. **Workload Selection**: Choose appropriate workloads for FT
4. **Monitoring**: Monitor FT status and performance regularly
5. **Testing**: Regularly test failover scenarios
6. **Backup Strategy**: Maintain backups despite FT protection

## Troubleshooting Commands

```bash
# Check FT status
vim-cmd vmsvc/get.ftinfo <vmid>

# View FT configuration
vim-cmd vmsvc/get.config <vmid> | grep -i ft

# Check FT logging network
esxcli network vm list | grep -i ft

# View FT logs
tail -f /var/log/vmkernel.log | grep -i "FT\|faultTolerance"

# Check host FT compatibility
vim-cmd hostsvc/ftcompatibility
```

## Related Technologies

- [HA](ha.md) - Provides high availability with restart capability
- [DRS](drs.md) - Balances VM loads across hosts
- [vMotion](vmotion.md) - Enables live migration of VMs
- [Cluster](cluster.md) - Grouped hosts with FT features