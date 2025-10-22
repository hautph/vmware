---
title: Uplinks
category: Networking
---

Uplinks in VMware vSphere are physical network adapters (vmnics) that connect virtual switches to the physical network infrastructure. They provide the pathway for network traffic to flow between virtual machines and the external network, serving as the bridge between the virtual and physical networking layers.

## Overview

Uplinks are essential components in vSphere networking that:
- Connect virtual switches to physical network infrastructure
- Provide redundancy and load balancing for network traffic
- Enable communication between virtual machines and external networks
- Support various network configurations (VLANs, trunking, etc.)

## Types of Uplinks

### Physical Uplinks (vmnics)
- Physical network adapters installed in ESXi hosts
- Identified as vmnic0, vmnic1, vmnic2, etc.
- Connected to physical switches or network devices

### Virtual Uplinks
- Logical connections between distributed switches and physical uplinks
- Managed through vSphere Distributed Switch (VDS) configuration
- Can be part of LAGs (Link Aggregation Groups) or LACP

## Configuration Example

Managing uplinks on vSphere Standard Switch:

```bash
# View physical network adapters
esxcli network nic list

# Add uplink to vSwitch
esxcli network vswitch standard uplink add --uplink-name=vmnic1 --vswitch-name=vSwitch0

# Remove uplink from vSwitch
esxcli network vswitch standard uplink remove --uplink-name=vmnic2 --vswitch-name=vSwitch0
```

Using PowerCLI to manage uplinks:

```powershell
# Get uplink information
Get-VMHostNetworkAdapter -Physical

# Add physical network adapter to vSphere Distributed Switch
Add-VDSwitchPhysicalNetworkAdapter -DistributedSwitch "VDS-Production" -VMHostNetworkAdapter (Get-VMHostNetworkAdapter -Physical -Name "vmnic1")

# Configure uplink teaming policy
Get-VDPortgroup "VM Network" | Set-VDPortgroup -TeamingPolicy "LoadBalanceIP"
```

## Uplink Teaming Policies

### Load Balancing Algorithms
- Route based on originating virtual port ID
- Route based on source MAC hash
- Route based on IP hash
- Route based on source and destination IP hash
- Use explicit failover order

### Failover Configuration
- Active uplinks: Currently used for traffic
- Standby uplinks: Available for failover
- Unused uplinks: Not participating in teaming

## Best Practices

1. **Redundancy**: Configure multiple uplinks for fault tolerance
2. **Load Balancing**: Select appropriate load balancing algorithm for your environment
3. **Consistent Naming**: Use consistent naming conventions for uplinks
4. **Monitoring**: Regularly monitor uplink utilization and performance
5. **Documentation**: Document uplink configurations for troubleshooting
6. **Bandwidth Planning**: Ensure adequate bandwidth for all network traffic types

## Troubleshooting Commands

```bash
# Check uplink status and utilization
esxcli network nic list

# View uplink statistics
esxcli network nic stats get -n vmnic0

# Check vSwitch configuration
esxcli network vswitch standard list

# Monitor network performance
esxtop
```

## Related Technologies

- [vmnic](/glossary/vmnic)
- [Physical Adapters](/glossary/physical-adapters)
- [vSphere Standard Switch (VSS)](/glossary/vsphere-standard-switch-vss)
- [vSphere Distributed Switch (VDS)](/glossary/vsphere-distributed-switch-vds)
- [Load Balancing](/glossary/load-balancing)
- [LACP](/glossary/lacp)