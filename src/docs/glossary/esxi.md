---
term: ESXi
category: Hypervisor
---

VMware ESXi (formerly ESX) is an enterprise-class, type-1 hypervisor developed by VMware for deploying and serving virtual computers. ESXi runs directly on physical hardware without requiring an underlying operating system, providing high performance and efficiency for virtualized workloads.

## Overview

ESXi provides:
- Bare-metal hypervisor architecture
- High-performance virtualization
- Minimal system footprint
- Enterprise-grade reliability and security
- Integration with VMware's ecosystem of products

## Key Features

### Hypervisor Architecture
- **Type-1 Hypervisor**: Runs directly on physical hardware
- **Microkernel Design**: Minimal footprint for maximum efficiency
- **Hardware Abstraction**: Abstracts physical hardware for virtual machines
- **Resource Management**: Efficient allocation of CPU, memory, storage, and network resources

### Performance and Efficiency
- Near-native performance for virtual machines
- Hardware-assisted virtualization support (Intel VT-x, AMD-V)
- Memory overcommitment and optimization techniques
- CPU scheduling and load balancing

### Security Features
- VM isolation and sandboxing
- Secure boot support
- Trusted Platform Module (TPM) integration
- Role-based access control

## Architecture

### Core Components
- **VMkernel**: Proprietary operating system providing virtualization services
- **Virtual Machine Monitor (VMM)**: Manages CPU and memory virtualization
- **Device Drivers**: Hardware-specific drivers for physical devices
- **Management Agents**: Services for remote management and monitoring

### Hardware Support
- Comprehensive hardware compatibility list (HCL)
- Support for modern CPUs, memory, storage, and network controllers
- Hardware acceleration features (VT-x, VT-d, AMD-V, SVM)
- Firmware support (UEFI, BIOS)

### Resource Management
- **CPU Scheduling**: Advanced scheduler for optimal CPU allocation
- **Memory Management**: Techniques like TPS, ballooning, compression, and swapping
- **Storage Stack**: Support for VMFS, NFS, vSAN, and vVols
- **Network Virtualization**: Virtual switches and network I/O control

## Management Interfaces

### Direct Console User Interface (DCUI)
- Text-based local management interface
- Basic configuration and troubleshooting
- Emergency recovery operations

### vSphere Client
- Web-based management interface
- Comprehensive management capabilities
- Integration with vCenter Server

### Command-Line Interfaces
- **ESXCLI**: Command-line tool for advanced configuration
- **PowerCLI**: PowerShell-based automation tool
- **SSH Access**: Secure shell access for troubleshooting

## Virtual Machine Support

### Guest Operating Systems
- Support for Windows, Linux, and other operating systems
- 64-bit and 32-bit guest support
- Paravirtualized drivers for enhanced performance
- VMware Tools for guest optimization

### VM Features
- Snapshots for point-in-time recovery
- VM templates for rapid deployment
- Linked clones for storage efficiency
- vMotion for live migration

## vSphere 8 Enhancements

### Security Improvements
- **execInstalledOnly**: This option is now enabled by default to enhance security by preventing the execution of unauthorized binaries.
- **TPM 1.2 Deprecation**: Support for TPM 1.2 is deprecated in favor of TPM 2.0.
- **Enhanced Secure Boot**: Improved secure boot capabilities
- **Hardware Attestation**: Better hardware verification and attestation

### Performance Enhancements
- **CPU Scheduler Improvements**: Enhanced scheduling algorithms for better performance
- **Memory Management**: Improved memory reclamation techniques
- **Storage Stack Optimization**: Better storage performance and efficiency
- **Network Processing**: Enhanced network virtualization performance

### Modern Lifecycle Management
- **Image-based Deployment**: Simplified deployment using image profiles
- **Auto Deploy Integration**: Better integration with Auto Deploy for large-scale deployments
- **Streamlined Updates**: Simplified patching and update processes
- **Reduced Downtime**: Minimized downtime for maintenance operations

## Installation and Deployment

### Installation Options
- **Interactive Installation**: GUI-based installation process
- **Scripted Installation**: Automated installation using scripts
- **Auto Deploy**: Stateless deployment for large environments
- **PXE Boot**: Network-based installation

### Configuration Management
- **Host Profiles**: Template-based configuration management
- **PowerCLI**: Automation and scripting capabilities
- **API Access**: Programmatic management through APIs
- **vCenter Integration**: Centralized management through vCenter Server

## Best Practices

1. **Hardware Selection**: Use hardware from the VMware Compatibility Guide
2. **Resource Allocation**: Properly size CPU, memory, and storage resources
3. **Security Configuration**: Implement secure boot and access controls
4. **Monitoring**: Regularly monitor performance and health status
5. **Backup**: Maintain backups of configuration and critical data

## Troubleshooting Commands

```bash
# Check ESXi host information via CLI
esxcli system hostname get
esxcli hardware cpu list
esxcli hardware memory get

# View VM information
esxcli vm process list

# Check storage information
esxcli storage core path list

# View network information
esxcli network nic list

# Check system logs
tail -f /var/log/vmkernel.log
```

## Related Technologies

- [vSphere](/glossary/term/vsphere.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [VMware Tools](/glossary/term/vmware-tools.md)
- [vMotion](/glossary/term/vmotion.md)
- [DRS](/glossary/term/drs.md)
- [HA](/glossary/term/vsphere-high-availability.md)