---
term: Maintenance Mode
category: Management
---

Maintenance Mode is a host state in VMware vSphere that allows administrators to perform maintenance tasks on an ESXi host without affecting running virtual machines. When a host enters maintenance mode, vSphere automatically migrates all running VMs to other hosts in the cluster using vMotion.

## Code Sample

```powershell
# PowerCLI to put a host into maintenance mode
Get-VMHost "esxi01.example.com" | Set-VMHost -State Maintenance
```

## Configuration

```ini
# Maintenance mode configuration
[maintenance-mode]
enabled = true
timeout = 300
evacuate_powered_off_vms = true
```