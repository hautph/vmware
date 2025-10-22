---
title: Standalone
category: Core Architecture
---

In VMware vSphere, "Standalone" refers to hosts or components that operate independently without being part of a larger clustered or managed environment. This term is commonly used to describe standalone ESXi hosts that are not managed by vCenter Server or standalone virtual machines that operate without high availability or clustering features.

## Overview

Standalone configurations are typically used for:
- Small environments or proof-of-concept deployments
- Testing and development scenarios
- Remote office locations with minimal infrastructure
- Backup or disaster recovery sites
- Learning and training environments

## Standalone ESXi Host

A standalone ESXi host:
- Is not managed by vCenter Server
- Cannot participate in vSphere clusters
- Has limited high availability and fault tolerance features
- Cannot use advanced features like vMotion, DRS, or HA
- Is managed locally through the Direct Console User Interface (DCUI) or vSphere Client

## Configuration Example

Managing a standalone ESXi host:

```bash
# Connect directly to ESXi host
ssh root@standalone-esxi-host

# View host information
esxcli system hostname get

# Manage virtual machines
vim-cmd vmsvc/getallvms

# Configure networking
esxcli network vswitch standard list
```

Using PowerCLI for standalone host management:

```powershell
# Connect directly to standalone ESXi host
Connect-VIServer -Server "standalone-esxi-host" -User "root" -Password "password"

# Get host information
Get-VMHost

# Manage VMs on standalone host
Get-VM | Where-Object {$_.PowerState -eq "PoweredOn"}

# Configure host settings
Get-VMHostNetwork | Set-VMHostNetwork -DomainName "local.domain"
```

## Limitations

1. **No Centralized Management**: Cannot be managed through vCenter Server
2. **Limited Features**: Advanced vSphere features are unavailable
3. **No Clustering**: Cannot participate in vSphere clusters for HA or DRS
4. **Manual Operations**: All management tasks must be performed manually
5. **No vMotion**: Cannot migrate VMs between hosts
6. **Limited Scalability**: Difficult to scale beyond a single host

## Use Cases

1. **Small Business Environments**: Organizations with minimal virtualization needs
2. **Edge Computing**: Remote locations with limited connectivity
3. **Development and Testing**: Isolated environments for testing
4. **Training and Education**: Learning VMware technologies without complex setups
5. **Backup Infrastructure**: Simple backup environments

## Transitioning from Standalone

To move from a standalone configuration to a managed environment:

1. Install and configure vCenter Server
2. Add the standalone host to vCenter inventory
3. Create datacenter and cluster objects
4. Migrate VMs to shared storage if needed
5. Enable advanced vSphere features

## Related Technologies

- [vCenter Server](/glossary/vcenter-server)
- [ESXi](/glossary/esxi)
- [vSphere Cluster](/glossary/vsphere-cluster)
- [Direct Console User Interface (DCUI)](/glossary/dcui)