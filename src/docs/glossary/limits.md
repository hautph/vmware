---
term: Limits
category: Resource_Management
---

Limits specify the maximum amount of CPU or memory resources that a virtual machine or resource pool can consume, preventing any single entity from monopolizing resources and ensuring fair distribution among all workloads. Limits work in conjunction with shares and reservations to provide comprehensive resource management in vSphere environments.

## Overview

Limits provide:
- Maximum resource consumption constraints for VMs and resource pools
- Protection against resource monopolization by individual workloads
- Integration with shares and reservations for comprehensive control
- Support for both CPU and memory resources
- Flexible configuration for different workload requirements

## Key Concepts

### Resource Constraints
- **CPU Limits**: Maximum CPU cycles in MHz that can be consumed
- **Memory Limits**: Maximum memory in MB that can be consumed
- **Storage Limits**: Maximum storage I/O (Storage I/O Control)
- **Network Limits**: Maximum network bandwidth (Network I/O Control)
- **Unlimited**: Option to remove resource limits entirely

### Limit Behavior
- Limits are enforced only when resources are available
- Limits do not guarantee resource availability
- Limits can be set higher than actual resource consumption
- Limits impact resource distribution during contention
- Limits can be dynamically adjusted without VM downtime

### Planning Considerations
- **Workload Requirements**: Base limits on actual workload needs
- **Resource Contention**: Consider impact on other workloads
- **Performance**: Proper limits prevent resource monopolization
- **Flexibility**: Balance between control and flexibility
- **Monitoring**: Regular monitoring to validate limit effectiveness

## Configuration Examples

### PowerCLI Configuration
```powershell
# Set CPU and memory limits for a VM
Get-VM "DevVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuLimitMHz 1000 -MemLimitMB 2048

# Set limits for a resource pool
Get-ResourcePool "Development" | Set-ResourcePool -CpuLimitMHz 4000 -MemLimitMB 8192

# Remove limits (set to unlimited)
Get-VM "FlexibleVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuLimitMHz $null -MemLimitMB $null
```

### ESXi CLI Configuration
```bash
# View VM resource configuration
vim-cmd vmsvc/get.config <vmid> | grep -A 10 "limit"

# Check resource pool configuration
vim-cmd hostsvc/rp/getall

# View system resource information
esxcli system settings advanced list -o /Mem/
```

### vSphere Client Configuration
```xml
<!-- VMX configuration for limits -->
sched.cpu.max = "1000"
sched.mem.max = "2048"
```

## Best Practices

1. **Workload Analysis**: Base limits on actual workload requirements
2. **Regular Review**: Review limits periodically based on usage patterns
3. **Documentation**: Document limit configurations and business justification
4. **Monitoring**: Monitor resource utilization to validate limit effectiveness
5. **Flexibility**: Avoid overly restrictive limits that impact performance
6. **Testing**: Test limit configurations under load to verify behavior

## Related Technologies

- [Shares](/glossary/term/shares.md)
- [Reservations](/glossary/term/reservations.md)
- [Resource Pools](/glossary/term/resource-pool.md)
- [DRS](/glossary/term/drs.md)
- [Resource Management](/glossary/term/resource-management.md)