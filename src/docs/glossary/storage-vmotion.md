---
term: Storage vMotion
category: Storage
---

Storage vMotion is a VMware vSphere feature that enables the live migration of virtual machine disk files between different datastores without any downtime. This technology allows administrators to move virtual machine storage from one location to another while the VM remains powered on and fully operational, providing flexibility in storage management and optimization.

## Overview

Storage vMotion provides:
- Live migration of virtual machine storage without downtime
- Flexibility in storage management and optimization
- Support for different storage types and configurations
- Integration with other vSphere availability features

## Key Features

### Storage Migration
- **Live Storage Migration**: Move VM storage while VMs remain powered on
- **Cross-Storage Type**: Migrate between different storage types (VMFS, NFS, vVol)
- **Datastore Migration**: Move between different datastores on the same or different storage arrays
- **Storage Consolidation**: Consolidate VM storage for better resource utilization

### Performance Benefits
- **Zero Downtime**: No interruption to running applications
- **Minimal Performance Impact**: Low impact on VM performance during migration
- **Bandwidth Control**: Control migration bandwidth to minimize network impact
- **Priority Settings**: Set migration priority for resource allocation

### Management Capabilities
- **Bulk Operations**: Migrate multiple VMs simultaneously
- **Scheduled Migrations**: Plan migrations during maintenance windows
- **Migration Monitoring**: Real-time monitoring of migration progress
- **Rollback Support**: Ability to cancel migrations if needed

## Architecture

### Migration Components
- **Source Datastore**: Original location of VM disk files
- **Destination Datastore**: Target location for VM disk files
- **VMkernel Interface**: Network interface for storage migration
- **Migration Engine**: Component that manages the migration process

### Migration Process
1. **Pre-Migration Check**: Verify compatibility and available resources
2. **Disk File Copy**: Copy VM disk files to destination datastore
3. **Delta Synchronization**: Synchronize changes during copy process
4. **Switchover**: Switch VM to use disk files on destination datastore
5. **Cleanup**: Remove original disk files from source datastore

### Storage Types Supported
- **VMFS Datastores**: VMware's cluster file system
- **NFS Datastores**: Network File System-based storage
- **vVol Datastores**: Virtual Volumes-based storage
- **vSAN Datastores**: Software-defined storage

## Configuration Examples

### PowerShell/PowerCLI Configuration
```powershell
# Perform Storage vMotion for a single VM
Get-VM "MyVM" | Move-VM -Datastore "NewDatastore" -RunAsync

# Perform Storage vMotion with specific disk format
Get-VM "MyVM" | Move-VM -Datastore "NewDatastore" -DiskStorageFormat Thin -RunAsync

# Perform simultaneous host and storage migration (Enhanced vMotion)
Get-VM "MyVM" | Move-VM -Destination (Get-VMHost "esxi02.domain.com") -Datastore "NewDatastore" -RunAsync

# Bulk Storage vMotion for multiple VMs
Get-VM "VM01", "VM02", "VM03" | Move-VM -Datastore "NewDatastore" -RunAsync
```

### ESXi CLI Configuration
```bash
# Check Storage vMotion compatibility
vim-cmd vmsvc/get.capability 123 | grep -i storagevmotion

# View Storage vMotion tasks
vim-cmd vimsvc/task_list | grep -i storage

# Monitor Storage vMotion progress
esxtop (press 'd' for disk view)
```

## vSphere 8 Enhancements

### Performance Improvements
- **Enhanced Migration Engine**: Faster storage migration performance
- **Optimized Data Transfer**: More efficient data transfer algorithms
- **Reduced Overhead**: Lower CPU and memory overhead
- **Better Compression**: Enhanced data compression during migration

### Modern Management Integration
- **Lifecycle Management**: Better integration with vSphere Lifecycle Manager
- **Policy Management**: Enhanced policy-driven management
- **Simplified Operations**: Streamlined management operations
- **Improved Monitoring**: Better monitoring capabilities

### Advanced Features
- **Cross-Cluster Migration**: Enhanced support for cross-cluster migrations
- **Storage Policy Integration**: Better integration with storage policies
- **Snapshot Management**: Improved handling of snapshots during migration
- **Error Handling**: Better error handling and recovery

## Requirements

### Licensing
- **vSphere Enterprise**: Basic Storage vMotion capabilities
- **vSphere Enterprise Plus**: Enhanced Storage vMotion features

### Network
- **VMkernel Network**: Dedicated VMkernel interface for storage migration
- **Network Bandwidth**: Sufficient bandwidth for migration traffic
- **Layer 2 Connectivity**: Network connectivity between source and destination
- **Jumbo Frames**: Optional support for improved performance

### Storage
- **Compatible Datastores**: Source and destination datastores must be compatible
- **Sufficient Space**: Destination datastore must have adequate free space
- **Storage Connectivity**: Both datastores must be accessible to the ESXi host
- **Storage Performance**: Adequate storage performance for migration

## Best Practices

1. **Capacity Planning**: Ensure adequate space on destination datastores
2. **Network Design**: Implement dedicated networks for Storage vMotion
3. **Performance Monitoring**: Monitor migration progress and system performance
4. **Scheduling**: Perform large migrations during low-traffic periods
5. **Testing**: Test migration procedures in non-production environments
6. **Backup**: Maintain backups before major migration operations

## Troubleshooting Commands

```bash
# Check Storage vMotion compatibility
vim-cmd vmsvc/get.capability 123 | grep -i storagevmotion

# View Storage vMotion tasks
vim-cmd vimsvc/task_list | grep -i storage

# Monitor Storage vMotion progress
esxtop (press 'd' for disk view)

# Check datastore connectivity
esxcli storage filesystem list

# View migration logs
tail -f /var/log/vmkernel.log | grep -i vmotion
```

## Related Technologies

- [vMotion](/glossary/term/vmotion.md)
- [Enhanced vMotion](/glossary/term/vmotion.md)
- [NFS](/glossary/term/nfs.md)
- [vSAN](/glossary/term/vsan.md)