---
term: Shares
category: Resource_Management
---

Shares is a resource allocation mechanism that determines the relative priority of virtual machines or resource pools when competing for CPU or memory resources, with options for Low, Normal, High, or Custom share values. Shares are used in conjunction with reservations and limits to provide comprehensive resource management in vSphere environments.

## Overview

Shares provide:
- Relative priority for resource allocation during contention
- Flexible resource management for varying workload requirements
- Integration with reservations and limits for comprehensive control
- Support for both CPU and memory resources
- Granular control through custom share values

## Key Concepts

### Share Levels
- **Low**: 500 shares per vCPU or 125 shares per MB of memory
- **Normal**: 1000 shares per vCPU or 250 shares per MB of memory
- **High**: 2000 shares per vCPU or 500 shares per MB of memory
- **Custom**: User-defined share values for precise control

### Resource Contention
- Shares only take effect when resources are oversubscribed
- Higher share values receive proportionally more resources
- Equal share values receive equal resource distribution
- Share values are relative, not absolute resource guarantees

### Resource Types
- **CPU Shares**: Control CPU allocation priority
- **Memory Shares**: Control memory allocation priority
- **Storage Shares**: Control storage I/O priority (Storage I/O Control)
- **Network Shares**: Control network bandwidth priority (Network I/O Control)

## Configuration Examples

### PowerCLI Configuration
```powershell
# Set CPU shares for a VM
Get-VM "MyVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuSharesLevel High

# Set memory shares for a VM
Get-VM "MyVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -MemSharesLevel High

# Set custom CPU shares
Get-VM "MyVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuSharesLevel Custom -CpuShares 4000

# Set shares for a resource pool
Get-ResourcePool "Production" | Set-ResourcePool -CpuSharesLevel High -MemSharesLevel High
```

### ESXi CLI Configuration
```bash
# View VM resource configuration
vim-cmd vmsvc/get.config <vmid> | grep -A 10 "shares"

# Check resource pool configuration
vim-cmd hostsvc/rp/getall

# View scheduler information
esxcli system settings advanced list -o /Scheduler/
```

### vSphere Client Configuration
```xml
<!-- VMX configuration for shares -->
sched.cpu.shares = "2000"
sched.mem.shares = "high"
```

## Best Practices

1. **Consistent Usage**: Use shares consistently across similar workloads
2. **Combination Approach**: Combine shares with reservations and limits for comprehensive control
3. **Regular Review**: Regularly review share configurations based on workload changes
4. **Documentation**: Document share configurations and rationale
5. **Testing**: Test share configurations under load to verify behavior
6. **Monitoring**: Monitor resource utilization to validate share effectiveness

## Related Technologies

- [Reservations](/glossary/term/reservations.md)
- [Limits](/glossary/term/limits.md)
- [Resource Pools](/glossary/term/resource-pool.md)
- [DRS](/glossary/term/drs.md)
- [Resource Management](/glossary/term/resource-management.md)