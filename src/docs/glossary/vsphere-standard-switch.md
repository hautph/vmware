---
term: vSphere Standard Switch (VSS)
category: Networking
---

vSphere Standard Switch (VSS) is a virtual network switch that provides basic networking connectivity for virtual machines on a single ESXi host, offering port grouping and basic network policies. VSS is one of two types of virtual switches available in VMware vSphere, the other being the vSphere Distributed Switch (VDS). While VSS is simpler to configure and manage, it operates at the host level, meaning network configurations must be applied individually to each host.

## Overview

vSphere Standard Switch provides:
- Basic virtual network switching capabilities
- Port group management for network segmentation
- Network policy enforcement at the host level
- Uplink configuration for physical network connectivity
- Support for VLAN tagging and security policies

## Key Features

### Port Group Management
- Logical grouping of virtual machine network adapters
- VLAN configuration for network segmentation
- Security policies (Promiscuous Mode, MAC Address Changes, Forged Transmits)
- Traffic shaping for bandwidth control
- Load balancing policies for uplink selection

### Uplink Configuration
- Connection to physical network adapters (vmnics)
- Active and standby uplink configuration
- Network adapter teaming for redundancy
- Failover and load balancing policies

### Network Policies
- Security policies to prevent unauthorized network access
- Traffic shaping to control bandwidth usage
- VLAN tagging for network segmentation
- Customization of network adapter properties

## Architecture

### Components
- **Port Groups**: Logical containers for VM network adapters
- **Uplinks**: Connections to physical network adapters
- **VMkernel Ports**: Special ports for ESXi management and services
- **Virtual Machine Ports**: Ports connected to VM network adapters

### Limitations
- Configuration must be applied per host
- No centralized management across multiple hosts
- Limited advanced features compared to VDS
- No network health monitoring or visualization

## Configuration Examples

### ESXi CLI Configuration
```bash
# Create a standard switch
esxcli network vswitch standard add --vswitch-name=vSwitch1

# Add uplink to standard switch
esxcli network vswitch standard uplink add --uplink-name=vmnic1 --vswitch-name=vSwitch1

# Create port group
esxcli network vswitch standard portgroup add --portgroup-name=VM Network --vswitch-name=vSwitch1

# Configure VLAN on port group
esxcli network vswitch standard portgroup policy failover set --portgroup-name="VM Network" --active-uplinks=vmnic0,vmnic1
```

### PowerCLI Configuration
```powershell
# Create standard switch
New-VirtualSwitch -VMHost "esxi01.domain.com" -Name "vSwitch1" -Nic "vmnic1" -NumPorts 128

# Create port group
New-VirtualPortGroup -VirtualSwitch (Get-VirtualSwitch -Name "vSwitch1" -VMHost "esxi01.domain.com") -Name "VM Network"

# Configure security policy
Get-VirtualPortGroup -Name "VM Network" | Get-SecurityPolicy | Set-SecurityPolicy -AllowPromiscuous $false -ForgedTransmits $false -MacChanges $false
```

## Best Practices

1. **Naming Conventions**: Use consistent naming for switches and port groups across hosts
2. **Uplink Redundancy**: Configure multiple uplinks for network redundancy
3. **Security Policies**: Apply appropriate security policies to prevent unauthorized access
4. **VLAN Segmentation**: Use VLANs to logically separate network traffic
5. **Documentation**: Maintain documentation of network configurations
6. **Performance Monitoring**: Monitor network performance and adjust configurations as needed

## Comparison with vSphere Distributed Switch

| Feature | Standard Switch (VSS) | Distributed Switch (VDS) |
|---------|----------------------|--------------------------|
| Management | Per-host configuration | Centralized management |
| VLAN Support | Basic VLAN tagging | Advanced VLAN features |
| Network Health Monitoring | Limited | Comprehensive |
| Network I/O Control | Not available | Available |
| Centralized Troubleshooting | Limited | Enhanced |
| Port Mirroring | Limited | Advanced |
| NetFlow | Not available | Available |

## Troubleshooting Commands

```bash
# List standard switches
esxcli network vswitch standard list

# List port groups
esxcli network vswitch standard portgroup list

# Check uplink status
esxcli network vswitch standard uplink list

# View network adapter information
esxcli network nic list
```

## Related Technologies

- [Virtual Switch](/glossary/term/virtual-switch.md)
- [vSphere Distributed Switch](/glossary/term/vsphere-distributed-switch.md)
- [Port Group](/glossary/term/port-group.md)
- [Uplinks](/glossary/term/uplinks.md)
- [Physical Adapters](/glossary/term/physical-adapters.md)
- [VMkernel](/glossary/term/vmkernel.md)