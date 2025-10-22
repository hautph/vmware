---
term: VMware Cloud Foundation (VCF)
category: Core Architecture
---

VMware Cloud Foundation (VCF) is VMware's integrated hybrid cloud platform that combines compute, storage, networking, and security into a unified software-defined data center (SDDC) stack.

## Code Sample

```powershell
# PowerCLI to get VCF management domain information
Connect-VIServer -Server "vcf-manager.example.com" -User "admin@local" -Password "password"
Get-VCFManagementDomain
```

## Configuration

```ini
# VCF deployment configuration
[vcf]
management_domain = primary
workload_domain = production
network_pool = vxlan-pool-01
storage_policy = vSAN-default
```