---
term: Server
category: Core_Architecture
---

A Server in VMware contexts refers to the bare-metal physical hardware that serves as the foundation for virtualization. Before installing the ESXi hypervisor, the physical machine is simply referred to as a server. Once ESXi is installed and the server becomes part of a virtualized environment, it is typically called a host. Servers provide the essential computing resources including CPU, memory, storage, and network connectivity required for running virtual machines.

## Overview

Servers provide:
- Physical computing resources for virtualization
- Hardware platform for ESXi hypervisor
- Foundation for virtual machine deployment
- Resource capacity for enterprise workloads
- Scalability for growing infrastructure needs

## Server Hardware Components

### Compute Resources
- **Processors (CPU)**: Multi-core processors providing compute power
- **Memory (RAM)**: High-capacity memory modules for VM operations
- **Cache**: CPU cache for improved performance
- **NUMA Nodes**: Non-Uniform Memory Access architecture

### Storage Components
- **Local Storage**: Internal hard drives or SSDs
- **RAID Controllers**: Hardware RAID for data protection
- **HBA Cards**: Host Bus Adapters for external storage
- **NVMe Support**: High-performance NVMe storage interfaces

### Network Infrastructure
- **Network Interface Cards (NICs)**: Physical network adapters
- **Converged Network Adapters**: Combined storage and network
- **Network Switches**: Physical switching infrastructure
- **Bonding/Teaming**: NIC aggregation for redundancy

### Management Features
- **iDRAC/iLO**: Out-of-band management interfaces
- **IPMI**: Intelligent Platform Management Interface
- **Remote Access**: Remote power and console access
- **Monitoring Sensors**: Temperature, voltage, and health sensors

## Server Form Factors

### Rack Servers
- **1U Form Factor**: Compact 1.75-inch height servers
- **2U Form Factor**: Standard 3.5-inch height servers
- **4U Form Factor**: High-capacity 7-inch height servers
- **Blade Servers**: Modular blade chassis systems

### Tower Servers
- **Entry-Level**: Small office and branch office deployments
- **Workgroup**: Departmental and small business use
- **Enterprise**: High-performance tower solutions

### Hyper-Converged
- **Integrated Systems**: Compute, storage, and networking combined
- **Appliance Form**: Pre-configured and optimized systems
- **Scale-Out Architecture**: Distributed infrastructure approach

## Hardware Requirements

### VMware Compatibility
- **Hardware Compatibility List (HCL)**: VMware-certified hardware
- **Driver Support**: ESXi-supported device drivers
- **Firmware Versions**: Required BIOS/UEFI firmware levels
- **Hardware Features**: Virtualization-enabled processors

### Resource Sizing
- **CPU Cores**: Adequate cores for expected workloads
- **Memory Capacity**: Sufficient RAM for VMs and hypervisor
- **Storage Performance**: Appropriate IOPS and throughput
- **Network Bandwidth**: Adequate network connectivity

## Server Lifecycle

### Pre-Deployment
- **Hardware Selection**: Choose appropriate server models
- **Configuration Planning**: Plan resource allocations
- **Compatibility Verification**: Check HCL compatibility
- **Firmware Updates**: Update to recommended firmware versions

### Deployment Process
- **ESXi Installation**: Install VMware ESXi hypervisor
- **Initial Configuration**: Basic network and management setup
- **Integration**: Add to vCenter Server management
- **Validation**: Verify proper operation

### Ongoing Management
- **Performance Monitoring**: Track resource utilization
- **Health Checks**: Regular hardware health monitoring
- **Firmware Updates**: Apply firmware updates as needed
- **Capacity Planning**: Plan for growth and expansion

## vSphere 9 Enhancements

### Hardware Support
- **Latest Processors**: Support for newest CPU architectures
- **Advanced Memory**: Support for high-capacity memory modules
- **NVMe Integration**: Better NVMe storage support
- **Network Advances**: Enhanced network adapter support

### Performance Improvements
- **NUMA Optimization**: Better NUMA-aware scheduling
- **Memory Management**: Advanced memory reclamation techniques
- **Storage Performance**: Improved storage stack performance
- **Network Processing**: Enhanced virtual network performance

### Security Enhancements
- **Hardware Attestation**: Better hardware verification
- **Secure Boot**: Enhanced secure boot capabilities
- **Trusted Platform**: Hardware root of trust integration
- **Encryption**: Improved data encryption support

## Best Practices

1. **Hardware Selection**: Use servers from VMware HCL
2. **Resource Planning**: Properly size CPU, memory, and storage
3. **Redundancy**: Implement redundant components where possible
4. **Firmware Management**: Keep firmware updated
5. **Monitoring**: Implement comprehensive hardware monitoring
6. **Documentation**: Maintain detailed hardware documentation

## Troubleshooting Commands

```bash
# Check server hardware information
esxcli hardware platform get

# View CPU information
esxcli hardware cpu list

# Check memory information
esxcli hardware memory get

# View system health
esxcli system health status get

# Check hardware sensors
esxcli hardware platform get
```

## Related Technologies

- [Host](/glossary/term/host.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [Hardware Compatibility List](/glossary/term/hardware-compatibility-list.md)