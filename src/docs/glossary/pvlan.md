---
title: PVLAN (Private VLAN)
category: Networking
---

PVLAN (Private VLAN) is a network segmentation technology that provides Layer 2 isolation between ports within the same VLAN. In VMware vSphere environments, PVLANs are used to enhance security by controlling which virtual machines can communicate with each other while still sharing the same IP subnet.

## Overview

PVLAN features:
- Layer 2 traffic isolation within a single VLAN
- Enhanced security for multi-tenant environments
- Reduced broadcast domains while maintaining IP subnet efficiency
- Flexible communication control between virtual machines
- Support for various isolation policies

## PVLAN Port Types

### Primary VLAN (PVLAN)
- Contains all secondary VLANs
- Acts as the main VLAN for routing purposes
- Connects to upstream routers and external networks
- Provides default gateway connectivity

### Isolated VLAN (Secondary)
- Ports can only communicate with promiscuous ports
- No communication between isolated ports
- Typically used for tenant isolation
- Each isolated port is completely separated from others

### Community VLAN (Secondary)
- Ports can communicate with each other and promiscuous ports
- Provides controlled communication within a group
- Used for departmental or application-level grouping
- Offers more flexible communication than isolated ports

### Promiscuous VLAN (Secondary)
- Can communicate with all port types
- Typically used for gateways, servers, and management interfaces
- Acts as the communication hub for all other port types
- Usually connects to routers, firewalls, and load balancers

## Configuration Example

Configuring PVLAN on vSphere Distributed Switch:

```powershell
# Create PVLAN configuration
$vds = Get-VDSwitch "VDS-Production"

# Create primary PVLAN
New-VDSwitchPrivateVlan -VDSwitch $vds -PrimaryVlanId 100

# Create isolated secondary PVLAN
New-VDSwitchPrivateVlan -VDSwitch $vds -PrimaryVlanId 100 -SecondaryVlanId 101 -PrivateVlanType Isolated

# Create community secondary PVLAN
New-VDSwitchPrivateVlan -VDSwitch $vds -PrimaryVlanId 100 -SecondaryVlanId 102 -PrivateVlanType Community

# Configure port group with PVLAN settings
Get-VDPortgroup "Tenant-App-PG" | Set-VDPortgroup -VlanConfiguration (New-VDVlanConfiguration -PvlanId 101)
```

ESXi CLI configuration:

```bash
# View PVLAN configuration
esxcli network vswitch dvs vmware pvlan list

# Configure PVLAN on distributed switch (requires vCenter configuration)
# This is typically done through vSphere Web Client

# Check port group VLAN configuration
esxcli network vswitch dvs portgroup policy failover get -p "Tenant-App-PG"
```

## Use Cases

### Multi-Tenant Environments
- Isolate customer workloads in cloud environments
- Prevent lateral movement between tenants
- Maintain shared infrastructure efficiency
- Comply with regulatory requirements

### Security-Sensitive Applications
- Isolate critical applications from other systems
- Control communication between application tiers
- Implement zero-trust network architecture
- Protect against insider threats

### Development and Testing
- Isolate development environments
- Control access between test systems
- Prevent accidental data leakage
- Maintain environment integrity

## Best Practices

1. **Planning**: Carefully plan PVLAN topology before implementation
2. **Documentation**: Maintain detailed documentation of PVLAN configurations
3. **Testing**: Test PVLAN configurations in non-production environments
4. **Monitoring**: Monitor PVLAN communication patterns for anomalies
5. **Security**: Regularly review PVLAN access controls
6. **Scalability**: Consider scalability implications of PVLAN designs

## Limitations

1. **Complexity**: Increased configuration complexity compared to standard VLANs
2. **Troubleshooting**: More difficult to troubleshoot network issues
3. **Compatibility**: Limited support on some network devices
4. **Management**: Requires specialized knowledge for management
5. **Performance**: Potential impact on network performance

## PVLAN vs VLAN

| Feature | VLAN | PVLAN |
|---------|------|-------|
| Isolation Level | Layer 3 | Layer 2 |
| Communication Control | Between VLANs | Within VLAN |
| IP Subnet | Separate subnets | Shared subnet |
| Complexity | Simple | Complex |
| Use Cases | Basic segmentation | Advanced security |

## Troubleshooting Commands

```bash
# Check PVLAN configuration
esxcli network vswitch dvs vmware pvlan list

# View port group VLAN settings
esxcli network vswitch dvs portgroup policy security get -p "Tenant-App-PG"

# Monitor network connectivity
esxcli network diag ping -H 192.168.1.1

# Check MAC address table
esxcli network vswitch dvs maclearning table get
```

## Related Technologies

- [VLAN (Virtual LAN)](/glossary/vlan)
- [vSphere Distributed Switch (VDS)](/glossary/vsphere-distributed-switch-vds)
- [Port Group](/glossary/port-group)
- [Network Security](/glossary/network-security)
- [Zero Trust Network](/glossary/zero-trust-network)