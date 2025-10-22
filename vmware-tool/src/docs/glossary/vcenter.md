---
term: vCenter Server
category: Management
---

The centralized management utility for VMware vSphere environments. It manages ESXi hosts and virtual machines.

## Code Sample

```powershell
# Connect to vCenter Server using PowerCLI
Connect-VIServer -Server "vcenter.example.com" -User "administrator@vsphere.local" -Password "password"
```

## Configuration

```ini
# vCenter Server configuration example
[vcenter]
server = vcenter.example.com
username = administrator@vsphere.local
password = password
```

## vSphere 8 Enhancements

*   **Reduced Downtime:** vSphere 8 introduces a reduced downtime patching and updating process for vCenter Server, minimizing service interruptions.