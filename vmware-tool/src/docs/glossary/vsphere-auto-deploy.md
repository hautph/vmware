---
term: vSphere Auto Deploy
category: Monitoring & Management
---

vSphere Auto Deploy is a feature that enables stateless deployment of ESXi hosts by automatically provisioning and configuring hosts from a central image repository, simplifying host management and reducing provisioning time.

## Code Sample

```powershell
# PowerCLI to deploy an ESXi host with Auto Deploy
Add-DeployRule -Name "ProductionRule" -Item "HostProfile-Prod", "Cluster-Prod" -Pattern "ipv4=192.168.1.100"
```

## Configuration

```ini
# Auto Deploy configuration
[auto-deploy]
enabled = true
image_profile = ESXi-8.0-latest
host_profile = Production-Standard
```