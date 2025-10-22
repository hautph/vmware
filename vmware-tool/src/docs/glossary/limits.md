---
term: Limits
category: Advanced Features
---

Limits specify the maximum amount of CPU or memory resources that a virtual machine or resource pool can consume, preventing any single entity from monopolizing resources and ensuring fair distribution among all workloads.

## Code Sample

```powershell
# PowerCLI to set resource limits for a VM
Get-VM "DevVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuLimitMHz 1000 -MemLimitMB 2048
```

## Configuration

```ini
# Limits configuration
[limits]
cpu_limit_mhz = 1000
memory_limit_mb = 2048
unlimited = false
```