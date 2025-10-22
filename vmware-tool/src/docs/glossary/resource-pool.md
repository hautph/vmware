---
term: Resource Pool
category: Advanced Features
---

Resource Pool is a logical abstraction that allows administrators to partition and allocate CPU and memory resources among different groups of virtual machines, enabling hierarchical resource management and priority-based allocation.

## Code Sample

```powershell
# PowerCLI to create a resource pool
New-ResourcePool -Location "Cluster01" -Name "Production-Pool" -CpuSharesLevel High -MemSharesLevel High
```

## Configuration

```ini
# Resource Pool configuration
[resource-pool]
name = Production-Pool
cpu_reservation = 4GHz
memory_reservation = 8GB
```