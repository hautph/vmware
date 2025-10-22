---
term: VMware Cloud on AWS
category: Cloud & Integration
---

VMware Cloud on AWS is a jointly developed cloud service that delivers VMware's enterprise infrastructure as a service on AWS infrastructure, providing consistent infrastructure and operations across data centers and cloud.

## Code Sample

```powershell
# PowerCLI to connect to VMware Cloud on AWS
Connect-VIServer -Server "vcenter.cloud.vmware.com" -User "clouduser@vmc.local" -Password "password"
```

## Configuration

```ini
# VMware Cloud on AWS configuration
[vmc]
region = us-west-2
sddc = production-sddc
deployment_type = single-host
```