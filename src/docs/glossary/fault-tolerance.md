---
title: Fault Tolerance (FT)
category: Availability_Migration
---

Fault Tolerance (FT) is VMware's advanced availability solution that provides continuous protection for mission-critical virtual machines by creating and maintaining a secondary copy that executes in perfect lockstep with the primary VM. This technology ensures zero downtime and zero data loss by eliminating single points of failure at the virtual machine level.

## Overview

Fault Tolerance delivers enterprise-grade availability through:
- Continuous availability with zero downtime
- Zero data loss protection during hardware failures
- Transparent failover without application interruption
- Automatic recovery and restart capabilities

## How Fault Tolerance Works

### Lockstep Execution
FT maintains two identical virtual machines running simultaneously:
- **Primary VM**: Executes workloads and processes user requests
- **Secondary VM**: Runs on a different host with identical state
- **Logging Channel**: Transfers execution state between primary and secondary in real-time
- **Deterministic Replay**: Ensures identical execution environment on both VMs

### vLockstep Protocol
The core technology behind FT's continuous availability:
- Captures all non-deterministic inputs at the primary VM
- Transmits inputs to secondary VM through dedicated network
- Secondary VM replays inputs in exact same sequence
- Output from secondary VM is discarded to prevent conflicts

### Failure Detection and Recovery
FT provides automated protection mechanisms:
- **Heartbeat Monitoring**: Continuous health checks between primary and secondary
- **Network Redundancy**: Multiple network paths for logging channel
- **Automatic Failover**: Instantaneous switch to secondary VM on primary failure
- **Restart Protection**: Automatic restart of failed VM component on different host

## Configuration Examples

### PowerShell/PowerCLI Configuration
```powershell
# Enable Fault Tolerance on a virtual machine
Get-VM "CriticalApplication" | New-VMFaultToleranceConfiguration -FTEnabled $true

# Configure FT logging network
Get-VM "CriticalApplication" | Get-VMNetworkAdapter | Set-VMNetworkAdapter -FaultToleranceLoggingEnabled $true

# Test FT failover
Get-VM "CriticalApplication" | Test-VMFaultTolerance

# Disable FT
Get-VM "CriticalApplication" | Set-VMFaultToleranceConfiguration -FTEnabled $false
```

### ESXi CLI Configuration
```bash
# Check FT status for a VM
vim-cmd vmsvc/get.ft.info 123

# View FT configuration details
esxcli vm process list | grep -A 5 -B 5 "faultTolerance"

# Monitor FT logging network
esxcli network vm port list | grep -A 10 -B 10 "FT"

# Check FT performance metrics
esxtop -n VM -s /path/to/ft/metrics.csv
```

## FT Modes

### Legacy Fault Tolerance (vSphere 6.0 and earlier)
- Based on replay technology with single vCPU support
- Limited to specific hardware and software configurations
- Requires compatible CPU generations between hosts
- Restricted guest operating system support

### Secondary Fault Tolerance (vSphere 6.5 and later)
- Supports up to 4 vCPUs per virtual machine
- Enhanced compatibility with modern hardware
- Improved performance and reduced overhead
- Expanded guest operating system support

### Application-Level Fault Tolerance (vSphere 7.0+)
- Integrates with application-aware technologies
- Provides protection beyond hardware failures
- Supports microservices and containerized workloads
- Enhanced monitoring and recovery capabilities

## vSphere 8 Enhancements

### Enhanced Performance
- **Reduced Overhead**: Lower CPU and memory overhead
- **Improved Efficiency**: Better resource utilization
- **Faster Synchronization**: Accelerated state synchronization
- **Optimized Logging**: More efficient logging channel

### Modern Hardware Support
- **Latest CPU Support**: Support for newest CPU architectures
- **Enhanced Compatibility**: Better hardware compatibility
- **Improved Performance**: Better performance on modern hardware
- **Advanced Features**: Support for advanced CPU features

### Security Enhancements
- **Enhanced Encryption**: Better encryption for FT communication
- **Secure Communication**: More secure logging channel
- **Attestation Support**: Hardware attestation support
- **Compliance Features**: Better compliance reporting

### Management Improvements
- **Simplified Configuration**: Easier FT configuration
- **Enhanced Monitoring**: Better monitoring capabilities
- **Improved Troubleshooting**: Better diagnostic tools
- **Streamlined Operations**: Simplified day-to-day operations

## Requirements

### Licensing
- **vSphere Enterprise Plus**: Required for Fault Tolerance features
- **vCenter Server**: Required for FT management and monitoring

### Hardware
- Compatible CPU architectures on primary and secondary hosts
- Dedicated FT logging network with low latency
- Sufficient resources on both primary and secondary hosts
- Shared storage accessible to both hosts

### Network
- Minimum of two dedicated 1 Gbps network interfaces
- Low latency network (< 10ms round-trip) for logging channel
- Redundant network paths for high availability
- Proper firewall configuration for FT ports

## Best Practices

1. **Resource Planning**: Ensure adequate CPU and memory resources on all FT hosts
2. **Network Design**: Implement dedicated, low-latency networks for FT logging
3. **Storage Configuration**: Use high-performance shared storage for FT VMs
4. **Monitoring**: Regularly monitor FT status and performance metrics
5. **Testing**: Periodically test failover procedures to validate protection
6. **Limitations Awareness**: Understand FT compatibility restrictions and limitations

## Performance Considerations

### Overhead Management
- FT introduces CPU overhead due to lockstep execution
- Memory requirements double for FT-protected VMs
- Network bandwidth consumption for logging channel
- Storage I/O impact from dual VM operations

### Optimization Techniques
- Use SSD storage for FT logging and metadata
- Implement network quality of service (QoS) for FT traffic
- Monitor and tune CPU reservations for FT workloads
- Consider workload characteristics when enabling FT

## Limitations

1. **CPU Support**: Limited to specific CPU architectures and generations
2. **vCPU Count**: Restrictions on number of vCPUs per FT VM
3. **Device Support**: Limited support for certain virtual hardware devices
4. **Guest OS**: Restricted guest operating system compatibility
5. **Storage**: Requires shared storage accessible to both hosts
6. **Network**: Demands dedicated, low-latency network infrastructure

## Troubleshooting Commands

```bash
# Check FT configuration status
vim-cmd vmsvc/get.ft.config 123

# View FT logging channel statistics
esxcli network vm port list | grep -A 20 "FT"

# Monitor FT heartbeat status
esxcli system stats get -s ft.heartbeat

# Check FT compatibility issues
vim-cmd vmsvc/check.ft.compatibility 123

# View FT logs
tail -f /var/log/vmware/ft-*.log
```

## Related Technologies

- [High Availability (HA)](/glossary/term/vsphere-high-availability.md)
- [vMotion](/glossary/term/vmotion.md)
- [VM Migration](/glossary/term/vm-migration.md)
- [DRS](/glossary/term/drs.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)