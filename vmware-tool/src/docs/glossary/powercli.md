---
term: PowerCLI
category: Cloud & Integration
---

PowerCLI is VMware's command-line interface tool built on PowerShell that provides cmdlets for managing and automating VMware vSphere, vCloud, and other VMware products through scripts and command-line operations.

## Code Sample

```powershell
# PowerCLI to connect to vCenter and get VM information
Connect-VIServer -Server "vcenter.example.com"
Get-VM | Select Name, PowerState, NumCpu, MemoryGB
```

## Configuration

```ini
# PowerCLI configuration
[powercli]
server = vcenter.example.com
user = administrator@vsphere.local
```