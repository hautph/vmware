---
term: vSphere Distributed Switch (VDS)
category: Networking
---

vSphere Distributed Switch (VDS) is an enterprise-grade virtual network switch that provides centralized management and advanced networking features across multiple ESXi hosts in a vSphere environment.

## Code Sample

```powershell
# PowerCLI to get distributed switch information
Get-VDSwitch | Select Name, Version, NumHosts, NumPorts
```

## Configuration

```ini
# VDS configuration
[vds]
name = DSwitch-Production
version = 7.0.0
max_mtu = 9000
```