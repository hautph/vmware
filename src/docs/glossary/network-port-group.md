---
term: Network Port Group
category: Networking
---

A Network Port Group is a logical network segmentation within a virtual switch that defines network policies and configurations for virtual machine network adapters and VMkernel adapters. Port groups provide a way to organize and manage network traffic by applying consistent policies such as VLAN tagging, security settings, traffic shaping, and load balancing algorithms to multiple network interfaces. They serve as the connection point between virtual machines and the virtual switching infrastructure.

## Overview

Network Port Groups provide:
- Logical network segmentation within virtual switches
- Consistent network policy application
- VLAN and security policy enforcement
- Traffic management and control
- Network resource organization

## Architecture

### Core Components
- **Port Group Name**: Unique identifier for the port group
- **VLAN Configuration**: VLAN tagging and segmentation
- **Security Policies**: Network security settings
- **Traffic Shaping**: Bandwidth control policies
- **Teaming Policies**: NIC teaming and load balancing

### Relationship to Switches
- **Standard Switch**: Port groups on VSS
- **Distributed Switch**: Port groups on VDS
- **Uplink Groups**: Special port groups for uplinks
- **VMkernel Groups**: Special port groups for host services

## Key Features

### VLAN Management
- **VLAN ID**: IEEE 802.1Q VLAN tagging
- **VLAN Trunking**: Multiple VLAN support
- **Private VLANs**: Enhanced VLAN isolation
- **VLAN Translation**: VLAN ID translation

### Security Policies
- **Promiscuous Mode**: Monitor all network traffic
- **Forged Transmits**: Source MAC address validation
- **MAC Address Changes**: MAC address modification control
- **Port Security**: MAC address filtering

### Traffic Management
- **Traffic Shaping**: Bandwidth limitation and control
- **Quality of Service**: Traffic prioritization
- **Load Balancing**: Network load distribution
- **Failover Policies**: Network redundancy settings

## Configuration Options

### Basic Settings
- **Port Group Name**: Descriptive name for identification
- **VLAN ID**: VLAN tagging configuration (0-4094)
- **Number of Ports**: Maximum port allocation
- **Active Uplinks**: Currently active uplink adapters

### Security Configuration
- **Promiscuous Mode**: Accept/Reject/Inherit settings
- **Forged Transmits**: Accept/Reject/Inherit settings
- **MAC Changes**: Accept/Reject/Inherit settings
- **Port Security**: Enable/disable port security

### Traffic Shaping
- **Average Bandwidth**: Average throughput limit
- **Peak Bandwidth**: Maximum throughput limit
- **Burst Size**: Traffic burst allowance
- **Enabled Status**: Traffic shaping activation

### Teaming Policies
- **Load Balancing**: Algorithm selection
- **Network Failover**: Failover detection settings
- **Notify Switches**: Notify physical switches
- **Rolling Order**: Failover order configuration

## Types of Port Groups

### Virtual Machine Port Groups
- **VM Connectivity**: Connect VM network adapters
- **Guest OS Traffic**: Guest operating system traffic
- **Application Traffic**: Application network communication
- **Service Traffic**: Specific service communication

### VMkernel Port Groups
- **Management Traffic**: Host management communication
- **vMotion Traffic**: Live migration traffic
- **Fault Tolerance**: FT logging traffic
- **iSCSI Traffic**: Software iSCSI initiator
- **NFS Traffic**: Network File System access
- **vSAN Traffic**: vSAN cluster communication

### Uplink Port Groups
- **Physical Connectivity**: Connect to physical adapters
- **Network Uplinks**: External network connections
- **Redundancy**: Multiple uplink support
- **Load Balancing**: Uplink load distribution

## vSphere 9 Enhancements

### Performance Improvements
- **Enhanced Processing**: Better packet handling
- **Optimized Policies**: Improved policy enforcement
- **Reduced Latency**: Lower network processing latency
- **Better Throughput**: Higher network throughput

### Security Enhancements
- **Enhanced Policies**: Improved security policy enforcement
- **Micro-Segmentation**: Fine-grained security controls
- **Audit Trail**: Comprehensive network activity logging
- **Compliance**: Enhanced regulatory compliance

### Management Improvements
- **Automated Provisioning**: Streamlined port group deployment
- **Monitoring**: Enhanced network monitoring capabilities
- **Policy Integration**: Better policy enforcement
- **Troubleshooting**: Improved diagnostic tools

## Best Practices

1. **Naming Convention**: Use consistent naming conventions
2. **VLAN Planning**: Plan VLAN allocation carefully
3. **Security Policies**: Apply appropriate security settings
4. **Performance Tuning**: Optimize traffic shaping settings
5. **Redundancy**: Implement redundant network paths
6. **Documentation**: Maintain port group documentation

## Troubleshooting Commands

```bash
# List port groups
esxcli network vswitch standard portgroup list

# Check port group details
esxcli network vswitch standard portgroup policy failover get -p <portgroup-name>

# View VLAN configuration
esxcli network vswitch standard portgroup policy security get -p <portgroup-name>

# Check traffic shaping
esxcli network vswitch standard portgroup policy shaping get -p <portgroup-name>

# View port group logs
tail -f /var/log/vmkernel.log | grep portgroup
```

## Related Technologies

- [Virtual Switch](/glossary/term/virtual-switch.md)
- [VSS](/glossary/term/vss.md)
- [VDS](/glossary/term/vds.md)
- [VMnic](/glossary/term/vmnic.md)
- [Network I/O Control](/glossary/term/network-i-o-control.md)