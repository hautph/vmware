---
term: Resource Pool
category: Resource_Management
---

Resource Pool is a logical abstraction that allows administrators to partition and allocate CPU and memory resources among different groups of virtual machines, enabling hierarchical resource management and priority-based allocation. Resource pools provide a flexible framework for organizing and managing resources in complex virtualized environments.

## Overview

Resource pools provide:
- Hierarchical organization of CPU and memory resources
- Flexible resource allocation for different business units or applications
- Integration with shares, reservations, and limits for comprehensive control
- Support for nested resource pool structures
- Centralized management of resource policies

## Key Concepts

### Resource Pool Hierarchy
- **Root Resource Pool**: Automatically created for each host or cluster
- **Child Resource Pools**: User-created pools within parent pools
- **Nested Structure**: Support for multiple levels of resource pools
- **Resource Inheritance**: Child pools inherit properties from parent pools
- **Resource Isolation**: Separate resource management for different groups

### Resource Management
- **Shares**: Relative priority for resource allocation
- **Reservations**: Guaranteed minimum resource allocation
- **Limits**: Maximum resource consumption constraints
- **Expandable Reservations**: Ability to borrow resources from parent pools
- **Resource Pool Rightsizing**: Proper sizing based on workload requirements

### Pool Types
- **Host-Level Pools**: Resource pools on individual ESXi hosts
- **Cluster-Level Pools**: Resource pools across multiple hosts
- **vApp Containers**: Specialized resource pools for vApps
- **VM Groups**: Logical grouping of virtual machines

## Configuration Examples

### PowerCLI Configuration
```powershell
# Create a resource pool
New-ResourcePool -Location "Cluster01" -Name "Production-Pool" -CpuSharesLevel High -MemSharesLevel High

# Configure resource pool settings
Get-ResourcePool "Production-Pool" | Set-ResourcePool -CpuReservationMHz 8000 -MemReservationMB 16384 -CpuLimitMHz 16000 -MemLimitMB 32768

# Create nested resource pools
New-ResourcePool -Location (Get-ResourcePool "Production-Pool") -Name "Web-Tier" -CpuSharesLevel Normal -MemSharesLevel Normal

# Remove a resource pool
Remove-ResourcePool -ResourcePool "Development-Pool" -Confirm:$false
```

### ESXi CLI Configuration
```bash
# View resource pool hierarchy
vim-cmd hostsvc/rp/getall

# Check resource pool configuration
vim-cmd hostsvc/rp/get <pool_id>

# View resource allocation information
esxcli system settings advanced list -o /Mem/
```

### vSphere Client Configuration
```xml
<!-- Resource pool configuration in host configuration -->
<obj type="ResourcePool">ha-root-pool</obj>
```

## Best Practices

1. **Hierarchical Design**: Design resource pool hierarchy to match organizational structure
2. **Resource Planning**: Properly size resource pools based on workload requirements
3. **Regular Review**: Review resource pool configurations periodically
4. **Documentation**: Document resource pool structure and resource allocations
5. **Monitoring**: Monitor resource utilization to validate pool effectiveness
6. **Capacity Planning**: Include resource pools in capacity planning processes

## Related Technologies

- [Shares](/glossary/term/shares.md)
- [Reservations](/glossary/term/reservations.md)
- [Limits](/glossary/term/limits.md)
- [DRS](/glossary/term/drs.md)
- [Resource Management](/glossary/term/resource-management.md)