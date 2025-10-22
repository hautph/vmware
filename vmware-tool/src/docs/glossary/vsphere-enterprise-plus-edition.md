---
term: vSphere Enterprise Plus Edition
category: Licensing & Editions
---

vSphere Enterprise Plus Edition is the highest licensing tier of VMware vSphere that includes all available features such as Distributed Resource Scheduler (DRS), Fault Tolerance, vSAN, and vSphere with Tanzu, providing comprehensive virtualization capabilities for enterprise environments.

## Code Sample

```powershell
# PowerCLI to get license information
Get-LicenseManager | Select-Object -ExpandProperty Licenses
```

## Configuration

```ini
# vSphere Enterprise Plus Edition configuration
[license]
edition = enterprise-plus
cpu_count = unlimited
features = all
```