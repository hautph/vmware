---
term: VDS (vSphere Distributed Switch)
category: Networking
---

VDS (vSphere Distributed Switch) is VMware's advanced virtual switch that provides enterprise-grade networking capabilities across multiple ESXi hosts in a vCenter Server environment. Unlike the vSphere Standard Switch which is configured per-host, VDS offers centralized management, advanced features, and consistent network policies across an entire datacenter or cluster. VDS enables sophisticated networking capabilities such as Network I/O Control, Private VLANs, Port Mirroring, and enhanced monitoring and troubleshooting tools.

## Overview

VDS provides:
- Enterprise-grade virtual switching capabilities
- Centralized management across multiple hosts
- Advanced networking features
- Consistent network policies
- Enhanced monitoring and troubleshooting

## Architecture

### Core Components
- **Distributed Switch**: Centralized switch managed by vCenter
- **Distributed Port Groups**: Logical network segments
- **Uplink Port Groups**: Physical adapter connections
- **VMkernel Adapters**: Host service network interfaces
- **Virtual Machine Ports**: VM network interfaces

### Management Model
- **Centralized Management**: Single point of configuration
- **Consistent Policies**: Uniform policies across all hosts
- **Automated Deployment**: Automatic configuration distribution
- **Enterprise Scalability**: Designed for large environments

## Key Features

### Advanced Switching
- **Layer 2 Switching**: MAC address-based packet forwarding
- **VLAN Support**: IEEE 802.1Q VLAN segmentation
- **Private VLANs**: Enhanced VLAN isolation
- **Link Aggregation**: LACP-based port channel support

### Traffic Management
- **Network I/O Control**: Resource allocation and prioritization
- **Traffic Shaping**: Advanced bandwidth control
- **Quality of Service**: Sophisticated traffic prioritization
- **Load Balancing**: Enhanced network load distribution

### Security Features
- **Port Security**: Advanced MAC address filtering
- **Promiscuous Mode**: Enhanced security policy enforcement
- **Forged Transmits**: Advanced source MAC validation
- **MAC Changes**: Enhanced MAC address modification control

### Monitoring Capabilities
- **Port Mirroring**: Traffic monitoring and analysis
- **NetFlow**: Network flow data collection
- **LACP Support**: Link Aggregation Control Protocol
- **Health Check**: Comprehensive switch health monitoring

## Configuration Management

### Basic Setup
- **Switch Creation**: Initial VDS creation through vCenter
- **Host Addition**: Adding ESXi hosts to the switch
- **Port Group Configuration**: Logical network segments
- **Uplink Assignment**: Physical adapter connections

### Advanced Configuration
- **Network I/O Control**: Resource allocation policies
- **Private VLANs**: Advanced VLAN segmentation
- **Port Mirroring**: Traffic analysis configuration
- **LACP Configuration**: Link aggregation setup

### Management Operations
- **Centralized Management**: Single point of configuration
- **Automatic Updates**: Automatic configuration distribution
- **Template Support**: Configuration templates
- **Advanced Monitoring**: Comprehensive performance monitoring

## Enterprise Features

### Resource Management
- **Network I/O Control**: Bandwidth allocation and prioritization
- **Resource Pools**: Network resource pooling
- **Reservation System**: Guaranteed bandwidth allocation
- **Limit Enforcement**: Maximum bandwidth enforcement

### Monitoring and Troubleshooting
- **Health Check**: Automated health assessment
- **Network Monitoring**: Real-time performance monitoring
- **Statistics Collection**: Comprehensive metrics collection
- **Diagnostic Tools**: Advanced troubleshooting capabilities

### Policy Management
- **Distributed Policies**: Consistent policies across hosts
- **Profile Management**: Configuration profiles
- **Compliance Checking**: Policy compliance verification
- **Audit Trail**: Configuration change logging

## vSphere 9 Enhancements

### Performance Improvements
- **Enhanced Forwarding**: Better packet processing
- **Optimized Drivers**: Improved network driver performance
- **Reduced Latency**: Lower network switching latency
- **Better Throughput**: Higher packet forwarding rates

### Security Enhancements
- **Enhanced Policies**: Improved security policy enforcement
- **Micro-Segmentation**: Fine-grained security controls
- **Audit Trail**: Comprehensive network activity logging
- **Compliance**: Enhanced regulatory compliance

### Management Improvements
- **Automated Provisioning**: Streamlined switch deployment
- **Monitoring**: Enhanced network monitoring capabilities
- **Policy Integration**: Better policy enforcement
- **Troubleshooting**: Improved diagnostic tools

## Best Practices

1. **Design Planning**: Plan network architecture carefully
2. **Redundancy**: Implement redundant network paths
3. **Security**: Apply appropriate security policies
4. **Performance**: Optimize switch settings for workloads
5. **Monitoring**: Regular network performance monitoring
6. **Documentation**: Maintain switch configuration documentation

## Troubleshooting Commands

```bash
# List distributed switches
esxcli network vswitch dvs vmware list

# Check switch details
vim-cmd vimsvc/dvs/dvs_info

# View port group information
vim-cmd vimsvc/dvs/portgroup_info

# Check uplink status
esxcli network vswitch dvs uplink list

# View switch logs
tail -f /var/log/vpxa.log | grep "DVS"
```

## Related Technologies

- [Virtual Switch](/glossary/term/virtual-switch.md)
- [VSS](/glossary/term/vss.md)
- [VMnic](/glossary/term/vmnic.md)
- [Port Group](/glossary/term/port-group.md)
- [Network I/O Control](/glossary/term/network-i-o-control.md)