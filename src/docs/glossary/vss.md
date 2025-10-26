---
term: VSS (vSphere Standard Switch)
category: Networking
---

VSS (vSphere Standard Switch) is VMware's standard virtual switch that provides basic network switching capabilities for ESXi hosts. VSS is configured and managed on a per-host basis, making it suitable for smaller environments or simple network configurations. It offers essential networking features such as VLAN support, traffic shaping, security policies, and basic NIC teaming, but lacks the advanced centralized management capabilities found in vSphere Distributed Switch.

## Overview

VSS provides:
- Basic virtual switching capabilities
- Per-host configuration and management
- Essential networking features
- Simple deployment for small environments
- Cost-effective networking solution

## Architecture

### Core Components
- **Host-Level Switch**: Configured independently on each ESXi host
- **Port Groups**: Logical network segments with policies
- **Uplink Ports**: Connections to physical network adapters
- **VMkernel Ports**: Host service network interfaces
- **Virtual Machine Ports**: VM network interfaces

### Management Model
- **Local Configuration**: Each host managed separately
- **Manual Synchronization**: Configurations synchronized manually
- **Limited Automation**: Basic automation capabilities
- **Simple Interface**: Straightforward management interface

## Key Features

### Basic Switching
- **Layer 2 Switching**: MAC address-based packet forwarding
- **VLAN Support**: IEEE 802.1Q VLAN segmentation
- **Broadcast Domains**: Logical network segmentation
- **Unicast/Multicast**: Efficient traffic handling

### Traffic Management
- **Traffic Shaping**: Bandwidth control and limiting
- **Quality of Service**: Basic traffic prioritization
- **Load Balancing**: Simple network load distribution
- **NIC Teaming**: Basic network adapter aggregation

### Security Features
- **Port Security**: MAC address filtering
- **Promiscuous Mode**: Security policy enforcement
- **Forged Transmits**: Source MAC validation
- **MAC Changes**: MAC address modification control

## Configuration Management

### Basic Setup
- **Switch Creation**: Initial VSS creation
- **Port Group Configuration**: Logical network segments
- **Uplink Assignment**: Physical adapter connections
- **VMkernel Port Setup**: Host service interfaces

### Advanced Configuration
- **NIC Teaming Policies**: Load balancing and failover
- **Security Policies**: Network security enforcement
- **Traffic Shaping**: Bandwidth limitation settings
- **VLAN Configuration**: VLAN tagging and segmentation

### Management Operations
- **Host-Level Management**: Per-host configuration
- **Manual Updates**: Manual configuration synchronization
- **Limited Templates**: Basic configuration templates
- **Simple Monitoring**: Basic performance monitoring

## Limitations

### Scalability Constraints
- **Per-Host Management**: No centralized management
- **Configuration Overhead**: Manual configuration on each host
- **Limited Features**: Fewer advanced features than VDS
- **Management Complexity**: Increased complexity in large environments

### Feature Limitations
- **No Centralized Statistics**: Limited network analytics
- **No Health Check**: Basic health monitoring
- **No Network I/O Control**: No resource allocation control
- **No Private VLANs**: Limited VLAN capabilities
- **No Port Mirroring**: No traffic monitoring capabilities

## vSphere 9 Enhancements

### Performance Improvements
- **Enhanced Forwarding**: Better packet processing
- **Optimized Drivers**: Improved network driver performance
- **Reduced Latency**: Lower network switching latency
- **Better Throughput**: Higher packet forwarding rates

### Security Enhancements
- **Enhanced Policies**: Improved security policy enforcement
- **Audit Trail**: Comprehensive network activity logging
- **Compliance**: Enhanced regulatory compliance
- **Policy Integration**: Better security policy integration

### Management Improvements
- **Streamlined Operations**: Simplified management workflows
- **Monitoring**: Enhanced network monitoring capabilities
- **Troubleshooting**: Improved diagnostic tools
- **Documentation**: Better configuration documentation

## Best Practices

1. **Design Planning**: Plan network architecture carefully
2. **Redundancy**: Implement redundant network paths
3. **Security**: Apply appropriate security policies
4. **Performance**: Optimize switch settings for workloads
5. **Monitoring**: Regular network performance monitoring
6. **Documentation**: Maintain switch configuration documentation

## Troubleshooting Commands

```bash
# List standard switches
esxcli network vswitch standard list

# Check switch details
esxcli network vswitch standard portgroup list

# View port group information
esxcli network vswitch standard portgroup policy failover get -p <portgroup-name>

# Check uplink status
esxcli network vswitch standard uplink list

# View switch configuration
vim-cmd hostsvc/net/vswitch_info
```

## Related Technologies

- [Virtual Switch](/glossary/term/virtual-switch.md)
- [VDS](/glossary/term/vds.md)
- [VMnic](/glossary/term/vmnic.md)
- [Port Group](/glossary/term/port-group.md)
- [NIC Teaming](/glossary/term/nic-teaming.md)