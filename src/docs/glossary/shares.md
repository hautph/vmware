---
term: Shares
category: Advanced Features
---

Shares is a resource allocation mechanism that determines the relative priority of virtual machines or resource pools when competing for CPU or memory resources, with options for Low, Normal, High, or Custom share values.

## Code Sample

```powershell
# PowerCLI to set CPU shares for a VM
Get-VM "MyVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuSharesLevel High
```

## Configuration

```ini
# Shares configuration
[shares]
cpu_shares = high
memory_shares = normal
custom_value = 2000
```