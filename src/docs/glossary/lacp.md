---
title: LACP (Link Aggregation Control Protocol)
category: Networking
---

LACP (Link Aggregation Control Protocol) is an IEEE standard (802.3ad) that enables automatic negotiation and bundling of multiple physical network links into a single logical link. In VMware environments, LACP is used to create link aggregation groups (LAGs) between vSphere Distributed Switches (VDS) and physical switches.

## Overview

LACP provides:
- Automatic configuration of link aggregation
- Redundancy and increased bandwidth
- Dynamic failover capabilities
- Standardized protocol for link aggregation

## How LACP Works

LACP operates by:
1. Exchanging LACP packets between endpoints to negotiate link aggregation
2. Determining which links can be aggregated based on speed, duplex, and other parameters
3. Dynamically adding or removing links from the aggregation group
4. Monitoring link status for failover purposes

## Configuration Example

To configure LACP on a vSphere Distributed Switch:

```powershell
# Create a LACP group
$lacpPolicy = New-Object VMware.Vim.VMwareUplinkLacpPolicy
$lacpPolicy.enable = $true
$lacpPolicy.mode = "active"

# Apply LACP policy to uplink port group
Get-VDUplinkPortgroup "UplinkPG" | Set-VDUplinkPortgroup -LacpPolicy $lacpPolicy

# Configure LAG settings
$lacpGroupSpec = New-Object VMware.Vim.VMwareDvsLacpGroupSpec
$lacpGroupSpec.name = "LAG1"
$lacpGroupSpec.mode = "active"
$lacpGroupSpec.uplinkNum = 2

# Add LAG to VDS
Get-VDSwitch "VDS-Production" | Add-VDSwitchLag -LacpGroupSpec $lacpGroupSpec
```

## LACP Modes

### Active Mode
- Actively sends LACP packets to negotiate link aggregation
- Recommended for most environments

### Passive Mode
- Responds to LACP packets but does not initiate negotiation
- Used when the physical switch is configured as active

## Best Practices

1. Ensure both ends of the connection are configured with compatible LACP settings
2. Use active mode on the vSphere Distributed Switch and passive mode on the physical switch (or vice versa)
3. Monitor LACP status through vSphere Client or CLI commands
4. Configure appropriate load balancing policies to utilize all links effectively

## Verification Commands

```bash
# Check LACP status on ESXi host
esxcli network vswitch dvs vmware lacp status get

# View LACP statistics
esxcli network vswitch dvs vmware lacp stats get

# Check uplink teaming policy
esxcli network vswitch dvs vmware portgroup policy failover get
```

## Related Technologies

- [Load Balancing](/glossary/load-balancing)
- [EtherChannel](/glossary/etherchannel)
- [vSphere Distributed Switch (VDS)](/glossary/vsphere-distributed-switch-vds)
- [NIC Teaming](/glossary/nic-teaming)