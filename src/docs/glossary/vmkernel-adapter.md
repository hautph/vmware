---
term: VMkernel Adapter
category: Networking
---

A VMkernel Adapter is a special type of virtual network adapter used by the ESXi host itself for critical system services and management functions. Unlike virtual machine network adapters that provide connectivity for guest VMs, VMkernel adapters enable the ESXi host to communicate with external networks for services such as management, vMotion, Fault Tolerance logging, iSCSI, NFS, and other core VMware infrastructure functions.

## Overview

VMkernel Adapters provide:
- Network connectivity for ESXi host services
- Support for critical VMware infrastructure functions
- Isolation of host services from VM traffic
- Dedicated network paths for system operations
- Advanced networking capabilities for host functions

## Adapter Types

### Service Console Adapters (Legacy)
- **COS (Classic ESX)**: Service console adapters in legacy ESX
- **Deprecated**: No longer used in modern ESXi versions
- **Migration Path**: Migrated to VMkernel adapters

### VMkernel Adapters (Modern)
- **Management**: Host management and monitoring
- **vMotion**: Live migration of virtual machines
- **Fault Tolerance**: Logging for fault tolerance
- **iSCSI**: Software iSCSI initiator connectivity
- **NFS**: Network File System access
- **vSAN**: vSAN cluster communication
- **vSphere Replication**: Replication traffic
- **Provisioning**: Image and file provisioning

## Key Services

### Management Services
- **Host Management**: Direct host management access
- **vCenter Communication**: Communication with vCenter Server
- **SNMP**: Simple Network Management Protocol
- **SSH**: Secure Shell access
- **Console Access**: Direct console UI access

### Migration Services
- **vMotion**: Live migration of running VMs
- **Storage vMotion**: Live storage migration
- **Cross vCenter vMotion**: Migration between vCenter instances
- **Suspended VM Migration**: Migration of suspended VMs

### Availability Services
- **Fault Tolerance**: FT logging traffic
- **High Availability**: HA communication
- **Heartbeat**: Cluster membership verification
- **Witness Traffic**: Stretched cluster witness communication

### Storage Services
- **iSCSI**: Software iSCSI initiator
- **NFS**: Network File System mounts
- **vSAN**: vSAN cluster communication
- **VMware vVols**: Virtual Volumes protocol

## Configuration Options

### Basic Settings
- **Port Group**: Virtual switch port group assignment
- **IP Configuration**: Static or DHCP IP assignment
- **MAC Address**: Auto-generated or custom MAC
- **MTU**: Maximum transmission unit size

### Advanced Settings
- **TCP/IP Stack**: Selection of TCP/IP stack
- **NetStack**: Custom network stack assignment
- **Security Policies**: Adapter-level security
- **Traffic Shaping**: Bandwidth limitations
- **Failover Policy**: NIC teaming configuration

### Service Enablement
- **Management Traffic**: Enable management services
- **vMotion Traffic**: Enable vMotion services
- **FT Logging**: Enable Fault Tolerance logging
- **iSCSI Traffic**: Enable iSCSI services
- **NFS Traffic**: Enable NFS services
- **vSAN Traffic**: Enable vSAN services

## Network Stacks

### Default Stack
- **Management Stack**: Default TCP/IP stack
- **Standard Services**: Basic networking services
- **Default Routing**: Standard routing table
- **Common Configuration**: Shared configuration

### Custom Stacks
- **Provisioning Stack**: Image provisioning services
- **vMotion Stack**: Dedicated vMotion stack
- **Custom Routing**: Separate routing tables
- **Isolated Services**: Service isolation

## vSphere 9 Enhancements

### Performance Improvements
- **Enhanced Networking**: Better network performance
- **Optimized Stacks**: Improved TCP/IP stack performance
- **Reduced Latency**: Lower network latency
- **Better Throughput**: Higher network throughput

### Security Enhancements
- **Enhanced Isolation**: Better service isolation
- **Policy Enforcement**: Improved security policies
- **Audit Trail**: Comprehensive activity logging
- **Compliance**: Enhanced regulatory compliance

### Management Improvements
- **Automated Provisioning**: Streamlined adapter deployment
- **Monitoring**: Enhanced network monitoring
- **Policy Integration**: Better policy enforcement
- **Troubleshooting**: Improved diagnostic tools

## Best Practices

1. **Service Isolation**: Separate services on different adapters
2. **Redundancy**: Implement redundant network paths
3. **Security**: Apply appropriate security policies
4. **Performance**: Optimize adapter settings for services
5. **Monitoring**: Regular network performance monitoring
6. **Documentation**: Maintain adapter configuration documentation

## Troubleshooting Commands

```bash
# List VMkernel adapters
esxcli network ip interface list

# Check adapter details
esxcli network ip interface get -i <interface-name>

# View IP configuration
esxcli network ip interface ipv4 get -i <interface-name>

# Check network connectivity
vmkping -I <interface-name> <destination-ip>

# View routing table
esxcli network ip route ipv4 list
```

## Related Technologies

- [VMnic](/glossary/term/vmnic.md)
- [Virtual Machine Network Adapter](/glossary/term/virtual-machine-network-adapter.md)
- [Virtual Switch](/glossary/term/virtual-switch.md)
- [VSS](/glossary/term/vss.md)
- [VDS](/glossary/term/vds.md)