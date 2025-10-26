---
term: Live Patch
category: Lifecycle_Management
---

Live Patch is a feature introduced in vSphere 8 that enables the resolution of critical bugs in the virtual machine execution environment (vmx) without requiring a host reboot or virtual machine evacuation. This is achieved using non-disruptive fast-suspend-resume (FSR) operations for VMs. Live Patch represents a significant advancement in vSphere lifecycle management, allowing administrators to maintain system stability and security with minimal impact to running workloads.

## Overview

Live Patch provides:
- Non-disruptive patching of critical VM execution environment bugs
- Elimination of host reboot requirements for certain patches
- Zero-downtime maintenance for virtual machines
- Integration with vSphere Lifecycle Manager
- Support for critical security and stability updates

## Key Features

### Non-Disruptive Operations
- **Fast Suspend-Resume**: Fast suspend-resume operations for VMs
- **Zero Downtime**: Zero downtime for virtual machine workloads
- **No Host Reboot**: No requirement for host reboot operations
- **No VM Evacuation**: No need to evacuate virtual machines
- **Seamless Updates**: Seamless application of critical patches

### Patch Management
- **Critical Bug Fixes**: Resolution of critical vmx bugs
- **Security Updates**: Application of security patches
- **Stability Improvements**: Implementation of stability fixes
- **Automated Deployment**: Automated patch deployment
- **Selective Application**: Selective patch application

### Integration Capabilities
- **vLCM Integration**: Integration with vSphere Lifecycle Manager
- **Update Manager**: Integration with Update Manager workflows
- **Content Library**: Integration with content library distribution
- **Monitoring**: Integration with monitoring and alerting
- **Reporting**: Integration with compliance reporting

## Architecture

### Components
- **Live Patch Service**: Central service for patch management
- **FSR Mechanism**: Fast suspend-resume mechanism
- **Patch Repository**: Repository for live patches
- **Validation Engine**: Engine for patch validation
- **Deployment Manager**: Manager for patch deployment

### Patch Lifecycle
1. **Patch Creation**: Creation of live patches by VMware
2. **Validation**: Validation of patches in test environments
3. **Distribution**: Distribution through content libraries
4. **Deployment**: Deployment to target hosts
5. **Application**: Application to running VMs
6. **Verification**: Verification of patch application

### FSR Process
1. **Pre-Suspend**: Preparation for VM suspension
2. **Suspend**: Rapid suspension of VM execution
3. **Patch Application**: Application of live patch
4. **Resume**: Resumption of VM execution
5. **Post-Resume**: Post-resume validation
6. **Monitoring**: Continuous monitoring

## Configuration Examples

### PowerCLI Operations
```powershell
# Check live patch status
Get-VMHost "esxi01.domain.com" | Get-VMHostPatch

# View available live patches
Get-ContentLibraryItem -Name "LivePatches" | Get-ContentLibraryItemVersion

# Apply live patch
Install-VMHostPatch -VMHost "esxi01.domain.com" -PatchName "VMX-LivePatch-2023-001"

# View patch history
Get-VMHost "esxi01.domain.com" | Get-VMHostPatchHistory

# Check VM compatibility
Get-VM | Where-Object {$_.ExtensionData.Config.LivePatchSupported -eq $true}
```

### ESXi CLI Operations
```bash
# Check live patch status
esxcli system livepatch list

# View patch details
esxcli system livepatch get -p <patch-id>

# Apply live patch
esxcli system livepatch install -p <patch-name>

# Check VM support
esxcli vm process list | grep -i livepatch

# View patch logs
tail -f /var/log/vmware/livepatch.log
```

### vSphere Client Configuration
```xml
# Live patch configuration
[live-patch]
enabled = true
auto_apply = true
validation = strict
schedule = immediate
```

## Requirements

### Software
- **vSphere 8.0 or later**: Required for live patch support
- **ESXi 8.0 or later**: Hosts with live patch support
- **vCenter Server 8.0**: Management with vCenter Server
- **vLCM Enabled**: vSphere Lifecycle Manager enabled
- **Compatible VM Hardware**: VMs with live patch support

### Hardware
- **Modern CPUs**: CPUs with virtualization support
- **Adequate Memory**: Sufficient memory for FSR operations
- **Compatible Storage**: Compatible storage subsystems
- **Network Infrastructure**: Reliable network infrastructure
- **Redundancy**: Proper redundancy planning

### VM Requirements
- **Supported Hardware**: VMs with supported hardware versions
- **VMware Tools**: Current VMware Tools installation
- **Guest OS**: Compatible guest operating systems
- **Running State**: VMs in running state
- **No Snapshots**: VMs without active snapshots

## Patch Types

### Critical Security Patches
- **Zero-Day Vulnerabilities**: Patches for zero-day vulnerabilities
- **Critical Exploits**: Fixes for critical security exploits
- **Privilege Escalation**: Fixes for privilege escalation issues
- **Remote Code Execution**: Fixes for remote code execution
- **Data Protection**: Enhancements for data protection

### Stability Patches
- **Crash Fixes**: Fixes for system crashes
- **Hang Resolutions**: Resolutions for system hangs
- **Performance Issues**: Fixes for performance problems
- **Resource Leaks**: Fixes for resource leaks
- **Compatibility Issues**: Resolutions for compatibility problems

### Functional Patches
- **Bug Fixes**: Fixes for identified bugs
- **Feature Enhancements**: Enhancements to existing features
- **API Improvements**: Improvements to APIs
- **Interface Updates**: Updates to interfaces
- **Workflow Optimizations**: Optimizations to workflows

## Best Practices

1. **Testing**: Test live patches in non-production environments
2. **Monitoring**: Monitor patch application and VM behavior
3. **Validation**: Validate patch effectiveness
4. **Documentation**: Document patch application procedures
5. **Rollback Planning**: Plan for patch rollback if needed
6. **Scheduling**: Schedule patch application during low-impact periods

## vSphere 8 Enhancements

### Enhanced Capabilities
- **Improved FSR**: Enhanced fast suspend-resume operations
- **Advanced Patching**: More advanced patching capabilities
- **Better Integration**: Better integration with lifecycle management
- **Enhanced Monitoring**: Improved monitoring of patch operations

### Performance Improvements
- **Faster Operations**: Faster patch application operations
- **Reduced Overhead**: Lower overhead for patch operations
- **Better Scalability**: Better handling of large environments
- **Enhanced Reliability**: More reliable patch operations

### Advanced Features
- **Enhanced Validation**: Better patch validation mechanisms
- **Advanced Scheduling**: More advanced scheduling options
- **Better Reporting**: Improved reporting capabilities
- **Streamlined Operations**: Simplified patch management

## Troubleshooting Commands

```bash
# Check live patch status
esxcli system livepatch list

# View patch details
esxcli system livepatch get -p <patch-id>

# Check VM support
esxcli vm process list | grep -i livepatch

# View patch logs
tail -f /var/log/vmware/livepatch.log

# Check system health
esxcli system health status get
```

## Related Technologies

- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [Update Manager](/glossary/term/update-manager.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [Virtual Machine](/glossary/term/virtual-machine.md)