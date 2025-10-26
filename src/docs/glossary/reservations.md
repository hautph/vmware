---
term: Reservations
category: Resource_Management
---

Reservations guarantee a specified amount of CPU or memory resources to a virtual machine or resource pool, ensuring that the reserved resources are always available regardless of contention from other virtual machines. Reservations are one of three key resource management mechanisms in vSphere, along with shares and limits, providing administrators with comprehensive control over resource allocation.

## Overview

Reservations provide:
- Guaranteed minimum resource allocation for critical workloads
- Protection against resource contention and performance degradation
- Integration with shares and limits for comprehensive resource control
- Support for both CPU and memory resources
- Flexible configuration for different workload requirements

## Key Concepts

### Resource Guarantees
- **CPU Reservations**: Guaranteed minimum CPU cycles in MHz
- **Memory Reservations**: Guaranteed minimum memory in MB
- **Storage Reservations**: Guaranteed minimum storage I/O (Storage I/O Control)
- **Network Reservations**: Guaranteed minimum network bandwidth (Network I/O Control)

### Reservation Behavior
- Reserved resources are always available to the VM or resource pool
- Reservations are not overcommitable (100% reservation = 100% physical resource)
- Reservations impact cluster resource availability and DRS placement
- Reservations can be expandable (resource pools only)

### Planning Considerations
- **Resource Availability**: Ensure sufficient physical resources for all reservations
- **Cluster Impact**: Reservations reduce available resources for DRS placement
- **Performance**: Proper reservations prevent resource starvation
- **Cost**: Reservations reduce hardware utilization efficiency

## Configuration Examples

### PowerCLI Configuration
```powershell
# Set CPU and memory reservations for a VM
Get-VM "CriticalVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuReservationMHz 2000 -MemReservationMB 4096

# Set reservations for a resource pool
Get-ResourcePool "Production" | Set-ResourcePool -CpuReservationMHz 8000 -MemReservationMB 16384

# Remove reservations
Get-VM "FlexibleVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuReservationMHz 0 -MemReservationMB 0
```

### ESXi CLI Configuration
```bash
# View VM resource configuration
vim-cmd vmsvc/get.config <vmid> | grep -A 10 "reservation"

# Check resource pool configuration
vim-cmd hostsvc/rp/getall

# View system resource information
esxcli system settings advanced list -o /Mem/
```

### vSphere Client Configuration
```xml
<!-- VMX configuration for reservations -->
sched.cpu.min = "2000"
sched.mem.min = "4096"
```

## Best Practices

1. **Conservative Planning**: Avoid over-reserving resources to maintain efficiency
2. **Workload Analysis**: Base reservations on actual workload requirements
3. **Regular Review**: Review reservations periodically based on usage patterns
4. **Documentation**: Document reservation configurations and business justification
5. **Monitoring**: Monitor resource utilization to validate reservation effectiveness
6. **Capacity Planning**: Include reservations in capacity planning calculations

## Related Technologies

- [Shares](/glossary/term/shares.md)
- [Limits](/glossary/term/limits.md)
- [Resource Pools](/glossary/term/resource-pool.md)
- [DRS](/glossary/term/drs.md)
- [Resource Management](/glossary/term/resource-management.md)