---
term: Changed Block Tracking
category: Backup_Disaster_Recovery
---

Changed Block Tracking (CBT) is a VMware feature that tracks and records changes to virtual machine disk blocks, enabling incremental backups and replication by only transferring the blocks that have changed since the last backup or replication cycle. CBT significantly reduces the time and bandwidth required for backup and replication operations by eliminating the need to transfer unchanged data.

## Overview

Changed Block Tracking provides:
- Efficient incremental backup and replication
- Reduced backup window requirements
- Lower network bandwidth utilization
- Decreased storage requirements for backup repositories
- Integration with third-party backup solutions

## Key Features

### Incremental Operations
- Block-level change tracking for virtual disks
- Elimination of full backup requirements
- Reduced backup and replication time
- Efficient use of network bandwidth
- Lower storage consumption for backup data

### Performance Benefits
- Faster backup and restore operations
- Reduced impact on production workloads
- Lower resource utilization during backup windows
- Improved scalability for large environments
- Better backup frequency options

### Integration Capabilities
- Support for multiple backup vendors
- API-based access for backup applications
- Integration with vSphere APIs
- Compatibility with replication solutions
- Support for various storage types

## Architecture

### Components
- **CBT Filter Driver**: Kernel module that tracks disk changes
- **Change Map**: Data structure that records changed blocks
- **Snapshot Integration**: Integration with VMware snapshots
- **API Interface**: Programmatic access for backup applications
- **Management Layer**: vCenter Server integration for administration

### Tracking Mechanism
- **Block Identification**: Unique identification of disk blocks
- **Change Recording**: Recording of modified blocks in change map
- **Snapshot Association**: Linking changes to specific snapshots
- **Metadata Management**: Storage of tracking metadata
- **Cleanup Process**: Removal of obsolete change tracking data

### Data Flow
1. **Change Detection**: CBT filter detects disk block modifications
2. **Map Update**: Change map is updated with modified block information
3. **Backup Request**: Backup application requests changed blocks
4. **Data Transfer**: Only changed blocks are transferred to backup target
5. **Map Reset**: Change map is reset after successful backup

## Configuration Examples

### ESXi CLI Configuration
```bash
# Check CBT status for a virtual disk
vmkfstools -q /vmfs/volumes/datastore1/MyVM/MyVM.vmdk

# Enable CBT on a VM (requires VM power-off)
vim-cmd vmsvc/snapshot.create <vmid> "CBT_Enable" "Enable CBT" 0 1

# Disable CBT on a VM
vim-cmd vmsvc/snapshot.remove <vmid> <snapshot_id>
```

### PowerCLI Configuration
```powershell
# Check CBT status for VM
$vm = Get-VM "MyVM"
$vm.ExtensionData.Config.ChangeTrackingEnabled

# Enable CBT on VM (requires snapshot creation)
New-Snapshot -VM "MyVM" -Name "EnableCBT" -Description "Enable CBT" -Memory:$false -Quiesce:$true
Get-Snapshot -VM "MyVM" -Name "EnableCBT" | Remove-Snapshot -Confirm:$false

# Disable CBT on VM
$spec = New-Object VMware.Vim.VirtualMachineConfigSpec
$spec.ChangeTrackingEnabled = $false
$vm.ExtensionData.ReconfigVM_Task($spec)
```

### vSphere Client Configuration
```xml
<!-- VMX configuration for CBT -->
changeTrackingEnabled = "true"
```

## Requirements

### Software
- ESXi 4.0 or later with CBT support
- vCenter Server 4.0 or later
- Compatible backup or replication software
- Proper licensing for CBT features
- Updated management tools

### Configuration
- **VM Hardware Version**: VM hardware version 7 or later
- **Snapshot Support**: Snapshots required for CBT enablement
- **Disk Type**: Support for various virtual disk types
- **Storage Compatibility**: Support for different storage platforms
- **API Access**: Access to vSphere APIs for backup applications

### Limitations
- **Snapshot Dependency**: Requires snapshots for CBT enablement
- **Disk Type Restrictions**: Limited support for certain disk configurations
- **Backup Software**: Requires CBT-aware backup applications
- **Performance Impact**: Minimal overhead for change tracking
- **Datastore Support**: Limited support for some datastore types

## Use Cases

### Backup Optimization
- Reducing backup window duration
- Decreasing network bandwidth requirements
- Lowering storage capacity needs
- Improving backup frequency
- Enhancing backup reliability

### Disaster Recovery
- Efficient replication of changed data
- Reduced RPO (Recovery Point Objective)
- Faster replication cycles
- Lower bandwidth for remote sites
- Improved DR testing capabilities

### Archival and Compliance
- Incremental archiving of VM data
- Compliance with retention policies
- Reduced storage costs for archives
- Faster data retrieval for audits
- Efficient eDiscovery operations

## Best Practices

1. **Regular Validation**: Regularly validate CBT integrity and consistency
2. **Monitoring**: Monitor CBT performance impact on production workloads
3. **Backup Software**: Use CBT-aware backup applications for optimal results
4. **Snapshot Management**: Properly manage snapshots to avoid issues
5. **Error Handling**: Implement proper error handling for CBT failures
6. **Documentation**: Maintain documentation of CBT configurations and procedures

## vSphere 8 Enhancements

### Improved Reliability
- Enhanced change tracking accuracy
- Better error handling and recovery
- Improved snapshot integration
- Enhanced metadata management
- Better performance optimization

### Enhanced Performance
- Reduced overhead for change tracking operations
- Better memory management for tracking data
- Improved I/O performance during backup operations
- Enhanced scalability for large environments
- Better integration with modern storage systems

### Management Improvements
- Better vSphere Client integration
- Enhanced monitoring and reporting capabilities
- Simplified configuration workflows
- Improved troubleshooting tools
- Better support for containerized workloads

## Troubleshooting Commands

```bash
# Check CBT status for virtual disk
vmkfstools -q /vmfs/volumes/datastore1/MyVM/MyVM.vmdk

# View CBT change map information
vmkfstools -q -m /vmfs/volumes/datastore1/MyVM/MyVM.vmdk

# Check VM configuration for CBT
vim-cmd vmsvc/get.config <vmid> | grep -i changetracking

# Verify CBT logs
tail -f /var/log/vmware/vmkernel.log | grep -i cbt

# Reset CBT if needed (requires snapshot)
vim-cmd vmsvc/snapshot.create <vmid> "ResetCBT" "Reset CBT" 0 1
vim-cmd vmsvc/snapshot.remove <vmid> <snapshot_id>
```

## Related Technologies

- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [Snapshot](/glossary/term/snapshot.md)
- [Backup Disaster Recovery](/glossary/term/backup-disaster-recovery.md)
- [Site Recovery Manager](/glossary/term/site-recovery-manager.md)
- [Storage vMotion](/glossary/term/storage-vmotion.md)