---
term: Virtual Switch
category: Networking
---

A Virtual Switch (vSwitch) is a software-based network switch that operates in the ESXi kernel, providing network connectivity for virtual machines and ESXi management services. Virtual switches emulate the functionality of physical network switches and enable communication between VMs, the physical network, and ESXi management interfaces.

## Overview

Virtual switches provide:
- Network connectivity for virtual machines
- Isolation between different network segments
- Traffic shaping and quality of service
- Security policy enforcement
- Integration with physical network infrastructure

## Key Features

### Network Virtualization
- Abstraction of physical network hardware
- Creation of isolated network segments
- Support for VLANs and network segmentation
- Distributed switching capabilities

### Traffic Management
- Bandwidth allocation and control
- Quality of service (QoS) policies
- Traffic filtering and monitoring
- Load balancing across uplinks

### Security Features
- Port-level security policies
- MAC address filtering
- Forged transmit protection
- Promiscuous mode controls

## Types of Virtual Switches

### vSphere Standard Switch (vSS)
- Configured on individual ESXi hosts
- Local management and configuration
- Suitable for smaller environments
- Limited scalability

### vSphere Distributed Switch (vDS)
- Centralized management across multiple hosts
- Consistent configuration enforcement
- Advanced networking features
- Better scalability and manageability

## Architecture

### Virtual Ports
- Logical connection points for VMs
- Port groups define network policies
- Dynamic allocation of ports
- Port-level statistics and monitoring

### Uplink Ports
- Connection to physical network adapters
- Link aggregation and failover
- Load balancing policies
- Network I/O control integration

### Port Groups
- Logical grouping of ports with common policies
- VLAN configuration
- Security settings
- Traffic shaping rules

## Configuration Components

### VMkernel Ports
- Special ports for ESXi services
- Management, vMotion, FT, iSCSI, NFS traffic
- IP address assignment
- Service-specific configurations

### VM Network Ports
- Standard ports for virtual machine traffic
- Connected to guest operating systems
- Support for multiple network adapters per VM
- Customizable network policies

### Network Policies
- Security policies (MAC changes, forged transmits)
- Traffic shaping rules
- VLAN configurations
- Failover and load balancing settings

## vSphere 8 Enhancements

### Enhanced Performance
- Improved packet processing
- Reduced CPU overhead
- Better memory utilization
- Optimized network stack

### Advanced Security
- Enhanced security policies
- Improved isolation between tenants
- Better integration with NSX
- Hardware-assisted security features

### Modern Networking Features
- Support for newer network standards
- Improved integration with cloud services
- Better container networking support
- Enhanced observability and monitoring

## Best Practices

1. **Network Design**: Plan network topology and segmentation carefully
2. **Redundancy**: Implement redundant uplinks and failover policies
3. **Security**: Apply appropriate security policies to port groups
4. **Monitoring**: Regularly monitor network performance and utilization
5. **Documentation**: Maintain clear documentation of network configurations

## Troubleshooting Commands

```bash
# View virtual switch configuration
esxcli network vswitch standard list

# Check port group information
esxcli network vswitch standard portgroup list

# View uplink information
esxcli network vswitch standard uplink list

# Check network connectivity
vmkping -I vmk0 192.168.1.1
```

## Related Technologies

- [vSphere Standard Switch](/glossary/term/vsphere-standard-switch)
- [vSphere Distributed Switch](/glossary/term/vsphere-distributed-switch)
- [Port Group](/glossary/term/port-group)
- [Uplink](/glossary/term/uplink)
- [Network I/O Control](/glossary/term/network-i-o-control)