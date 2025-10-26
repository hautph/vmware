---
term: Maintenance Mode
category: Management
---

Maintenance Mode is a host state in VMware vSphere that allows administrators to perform maintenance tasks on an ESXi host without affecting running virtual machines. When a host enters maintenance mode, vSphere automatically migrates all running VMs to other hosts in the cluster using vMotion, ensuring continuous availability of workloads while enabling hardware and software maintenance operations.

## Overview

Maintenance Mode provides:
- Safe execution of maintenance tasks on ESXi hosts
- Automatic migration of running virtual machines
- Zero-downtime maintenance operations
- Integration with vSphere migration technologies
- Support for various maintenance scenarios

## Key Features

### Automated Migration
- **vMotion Integration**: Seamless integration with vMotion technology
- **DRS Coordination**: Coordination with DRS for optimal placement
- **Live Migration**: Live migration of powered-on VMs
- **Storage vMotion**: Support for Storage vMotion during maintenance
- **Cross-Cluster Migration**: Migration across different clusters

### Maintenance Scenarios
- **Hardware Maintenance**: Hardware replacement and upgrades
- **Software Updates**: Patching and updating ESXi
- **Firmware Updates**: Firmware updates for hardware components
- **Configuration Changes**: Network and storage configuration changes
- **Physical Maintenance**: Physical infrastructure maintenance

### Safety Mechanisms
- **Pre-Check Validation**: Validation before entering maintenance mode
- **Resource Availability**: Checking for available resources
- **Compatibility Verification**: Verification of compatibility
- **Rollback Capability**: Capability to cancel maintenance mode
- **Status Monitoring**: Continuous status monitoring

## Architecture

### State Management
- **Host State Tracking**: Tracking of host operational states
- **VM Migration Orchestration**: Orchestration of VM migrations
- **Resource Coordination**: Coordination of cluster resources
- **Status Reporting**: Reporting of maintenance status
- **Recovery Management**: Management of recovery procedures

### Migration Process
1. **Pre-Check**: Validation of migration prerequisites
2. **Resource Allocation**: Allocation of resources on destination hosts
3. **VM Migration**: Migration of VMs using vMotion
4. **Storage Migration**: Migration of storage if required
5. **Host Isolation**: Isolation of host for maintenance
6. **Status Update**: Update of maintenance status

### Integration Points
- **vCenter Server**: Integration with vCenter Server management
- **DRS**: Integration with Distributed Resource Scheduler
- **HA**: Integration with High Availability features
- **vMotion**: Integration with vMotion technology
- **Storage Systems**: Integration with storage systems

## Configuration Examples

### PowerCLI Operations
```powershell
# Put host into maintenance mode
Get-VMHost "esxi01.example.com" | Set-VMHost -State Maintenance

# Put host into maintenance mode with timeout
Set-VMHost -VMHost "esxi01.example.com" -State Maintenance -MaintenanceModeTimeout 600

# Evacuate powered-off VMs during maintenance
Set-VMHost -VMHost "esxi01.example.com" -State Maintenance -EvacuatePoweredOffVms $true

# Exit maintenance mode
Set-VMHost -VMHost "esxi01.example.com" -State Connected

# Check maintenance mode status
Get-VMHost "esxi01.example.com" | Select-Object Name, ConnectionState, MaintenanceMode
```

### ESXi CLI Operations
```bash
# Check host maintenance mode status
esxcli system maintenanceMode get

# Enable maintenance mode
esxcli system maintenanceMode set -e true

# Disable maintenance mode
esxcli system maintenanceMode set -e false

# View host connection state
vim-cmd hostsvc/hostsummary | grep -i connectionstate

# Check VM migration status
vim-cmd vmsvc/getallvms
```

### vSphere Client Configuration
```ini
# Maintenance mode configuration
[maintenance-mode]
enabled = true
timeout = 300
evacuate_powered_off_vms = true
maintenance_mode_timeout = 600
```

## Requirements

### Cluster Configuration
- **DRS Enabled**: DRS must be enabled for automatic migration
- **Sufficient Resources**: Sufficient resources on other hosts
- **Network Connectivity**: Proper network connectivity for vMotion
- **Storage Accessibility**: Accessible storage from other hosts
- **Compatible Hardware**: Compatible hardware across hosts

### Software
- **vCenter Server**: Required for centralized management
- **ESXi Hosts**: Hosts with maintenance mode support
- **vMotion Enabled**: vMotion must be enabled and configured
- **Proper Licensing**: vSphere Enterprise or Enterprise Plus license
- **Management Tools**: Compatible management tools

### Network
- **vMotion Network**: Dedicated vMotion network recommended
- **Low Latency**: Low latency network connections
- **Adequate Bandwidth**: Sufficient bandwidth for migrations
- **Network Redundancy**: Network redundancy for reliability
- **Security**: Network security measures

## Maintenance Scenarios

### Hardware Maintenance
- **Component Replacement**: Replacement of hardware components
- **Hardware Upgrades**: Upgrades to hardware specifications
- **Firmware Updates**: Updates to hardware firmware
- **Physical Repairs**: Physical repairs to hardware
- **Capacity Expansion**: Expansion of hardware capacity

### Software Maintenance
- **ESXi Updates**: Updates to ESXi software
- **Driver Updates**: Updates to device drivers
- **Security Patches**: Application of security patches
- **Configuration Changes**: Changes to system configuration
- **Performance Tuning**: Tuning of system performance

### Infrastructure Maintenance
- **Network Changes**: Changes to network infrastructure
- **Storage Changes**: Changes to storage infrastructure
- **Power Maintenance**: Maintenance of power infrastructure
- **Cooling Maintenance**: Maintenance of cooling systems
- **Facility Work**: Facility maintenance work

## Best Practices

1. **Planning**: Plan maintenance operations carefully
2. **Resource Check**: Verify sufficient resources before maintenance
3. **Backup**: Backup critical data before maintenance
4. **Monitoring**: Monitor migration progress during maintenance
5. **Documentation**: Document maintenance procedures
6. **Testing**: Test maintenance procedures in non-production

## vSphere 8 Enhancements

### Enhanced Features
- **Improved Migration**: Better VM migration capabilities
- **Advanced Scheduling**: More advanced scheduling options
- **Better Integration**: Better integration with other features
- **Enhanced Monitoring**: Improved monitoring during maintenance

### Performance Improvements
- **Faster Migrations**: Faster VM migration operations
- **Reduced Overhead**: Lower migration overhead
- **Better Scalability**: Better handling of large environments
- **Enhanced Reliability**: More reliable maintenance operations

### Advanced Capabilities
- **Enhanced Pre-Check**: Better pre-check validation
- **Advanced Recovery**: More advanced recovery options
- **Better Reporting**: Improved reporting capabilities
- **Streamlined Operations**: Simplified maintenance operations

## Troubleshooting Commands

```bash
# Check maintenance mode status
esxcli system maintenanceMode get

# View host connection state
vim-cmd hostsvc/hostsummary | grep -i connectionstate

# Check VM migration status
vim-cmd vmsvc/getallvms

# View maintenance mode logs
tail -f /var/log/vmware/hostd.log | grep -i maintenance

# Check cluster resources
esxcli system settings advanced list -o /Misc/ResourceChecker
```

## Related Technologies

- [vMotion](/glossary/term/vmotion.md)
- [DRS](/glossary/term/drs.md)
- [High Availability](/glossary/term/vsphere-high-availability.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [ESXi](/glossary/term/esxi.md)