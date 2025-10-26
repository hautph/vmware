---
term: vSphere Distributed Switch (VDS)
category: Networking
---

vSphere Distributed Switch (VDS) is an enterprise-grade virtual network switch that provides centralized management and advanced networking features across multiple ESXi hosts in a vSphere environment. VDS offers enhanced network visibility, security, and performance compared to standard switches, making it the preferred choice for enterprise deployments requiring advanced networking capabilities.

## Overview

vSphere Distributed Switch provides:
- Centralized network management across multiple hosts
- Advanced networking features and capabilities
- Enhanced network visibility and monitoring
- Improved security and policy enforcement
- Integration with VMware's networking ecosystem

## Key Features

### Centralized Management
- **Unified Configuration**: Single point of configuration for all hosts
- **Consistent Policies**: Consistent network policies across hosts
- **Simplified Operations**: Simplified network operations and management
- **Bulk Changes**: Ability to make changes across multiple hosts simultaneously
- **Template Support**: Support for network configuration templates

### Advanced Networking
- **Network I/O Control**: Bandwidth allocation and prioritization
- **Port Mirroring**: Network traffic monitoring and analysis
- **NetFlow**: Network traffic flow monitoring
- **LACP Support**: Link aggregation control protocol support
- **Private VLANs**: Enhanced network segmentation

### Security Features
- **DHCP Snooping**: Protection against rogue DHCP servers
- **Dynamic ARP Inspection**: Protection against ARP spoofing
- **IP Source Guard**: Protection against IP spoofing
- **Port Security**: MAC address filtering and security
- **Role-Based Access**: Role-based network access control

### Monitoring and Analytics
- **Network Health**: Comprehensive network health monitoring
- **Performance Metrics**: Detailed performance metrics and statistics
- **Troubleshooting**: Advanced troubleshooting capabilities
- **Reporting**: Detailed network reporting and analytics
- **Alerting**: Network alerting and notification systems

## Architecture

### Components
- **Distributed Switch**: Central virtual switch component
- **Host Proxies**: Host-side proxies for switch operations
- **Management Interface**: Centralized management interface
- **Control Plane**: Control plane for network operations
- **Data Plane**: Data plane for packet forwarding

### Network Services
- **VMkernel Services**: VMkernel networking services
- **Virtual Machine Networking**: Virtual machine network connectivity
- **Physical Uplinks**: Physical network uplink connectivity
- **Network Policies**: Centralized network policy enforcement
- **Quality of Service**: Quality of service management

### Integration Points
- **vCenter Server**: Integration with vCenter Server management
- **NSX Integration**: Integration with VMware NSX
- **Monitoring Tools**: Integration with network monitoring tools
- **Security Tools**: Integration with network security tools
- **Third-Party Tools**: Integration with third-party tools

## Configuration Examples

### PowerCLI Configuration
```powershell
# Create distributed switch
New-VDSwitch -Name "DSwitch-Production" -Location (Get-Datacenter "Datacenter01") -NumUplinkPorts 4

# Add hosts to distributed switch
Get-VMHost "esxi01.domain.com", "esxi02.domain.com" | Add-VDSwitchVMHost -VDSwitch "DSwitch-Production"

# Create distributed port group
New-VDPortgroup -Name "VM-Network" -VDSwitch "DSwitch-Production" -NumPorts 128

# Configure advanced settings
Get-VDSwitch "DSwitch-Production" | Set-VDSwitch -MaxMtu 9000
```

### ESXi CLI Configuration
```bash
# List distributed switches
esxcli network vswitch dvs list

# View distributed switch details
esxcli network vswitch dvs host list

# Check uplink status
esxcli network vswitch dvs uplink list

# View port group information
esxcli network vswitch dvs portgroup list
```

### vSphere Client Configuration
```xml
<!-- VDS configuration -->
[vds]
name = DSwitch-Production
version = 8.0.0
max_mtu = 9000
uplink_ports = 4
```

## Requirements

### Software
- **vCenter Server**: Required for VDS management
- **ESXi 5.0 or later**: Hosts with VDS support
- **Compatible Versions**: Compatible vSphere versions
- **Proper Licensing**: vSphere Enterprise or Enterprise Plus license
- **Network Management**: Proper network management tools

### Hardware
- **Physical Switches**: Compatible physical network switches
- **Network Adapters**: Compatible network adapters
- **Cabling**: Proper network cabling
- **Redundancy**: Proper network redundancy
- **Performance**: Adequate network performance

### Network Design
- **Proper Planning**: Careful network design and planning
- **Redundancy**: Proper redundancy planning
- **Scalability**: Scalability considerations
- **Security**: Security design considerations
- **Performance**: Performance requirements analysis

## Advanced Features

### Network I/O Control
- **Bandwidth Allocation**: Bandwidth allocation for different traffic types
- **Priority Management**: Traffic priority management
- **Resource Pools**: Network resource pools
- **Monitoring**: Network I/O monitoring
- **Policy Enforcement**: Policy enforcement for network traffic

### Port Mirroring
- **Traffic Monitoring**: Network traffic monitoring
- **Security Analysis**: Security traffic analysis
- **Performance Analysis**: Performance traffic analysis
- **Troubleshooting**: Network troubleshooting
- **Compliance**: Compliance monitoring

### NetFlow
- **Traffic Analysis**: Network traffic flow analysis
- **Performance Monitoring**: Performance monitoring
- **Security Monitoring**: Security monitoring
- **Capacity Planning**: Capacity planning
- **Reporting**: Detailed reporting

## Best Practices

1. **Planning**: Plan VDS deployment carefully
2. **Redundancy**: Ensure proper network redundancy
3. **Monitoring**: Monitor network performance and health
4. **Security**: Implement proper network security
5. **Documentation**: Document network configurations
6. **Change Management**: Implement proper change management

## vSphere 8 Enhancements

### Enhanced Features
- **Improved Performance**: Better network performance
- **Advanced Security**: Enhanced security features
- **Better Integration**: Better integration with other features
- **Enhanced Monitoring**: Improved monitoring capabilities

### New Capabilities
- **DPU Support**: Support for Data Processing Units
- **Enhanced Policies**: More advanced network policies
- **Better Analytics**: Improved network analytics
- **Streamlined Operations**: Simplified network operations

### Performance Improvements
- **Faster Operations**: Faster network operations
- **Reduced Overhead**: Lower network processing overhead
- **Better Scalability**: Better handling of large environments
- **Enhanced Reliability**: More reliable network operations

## Troubleshooting Commands

```bash
# Check distributed switch status
esxcli network vswitch dvs list

# View network health
esxcli network diag network-health check

# Check uplink status
esxcli network vswitch dvs uplink list

# View port group information
esxcli network vswitch dvs portgroup list

# Check network logs
tail -f /var/log/vmware/vmkernel.log | grep -i dvs
```

## Related Technologies

- [Virtual Switch](/glossary/term/virtual-switch.md)
- [vSphere Standard Switch](/glossary/term/vsphere-standard-switch.md)
- [Port Group](/glossary/term/port-group.md)
- [Network I/O Control](/glossary/term/network-i-o-control-nioc.md)
- [LACP](/glossary/term/lacp.md)