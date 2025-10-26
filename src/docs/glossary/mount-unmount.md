---
term: Mount and Unmount
category: Storage
---

Mount and Unmount are datastore management operations in VMware environments that control the accessible/inaccessible state of datastores on ESXi hosts. Mounting a datastore makes its file system available for VM operations, while unmounting makes the datastore inaccessible. These operations are crucial for datastore maintenance, troubleshooting, and resource optimization in virtualized environments.

## Overview

Mount and Unmount operations provide:
- Dynamic datastore accessibility management
- Online/offline datastore control
- Maintenance mode support
- Resource optimization
- Troubleshooting capabilities

## Mount Operation

### Process Steps
1. **File System Recognition**: Host identifies datastore file system
2. **Path Establishment**: Storage paths are validated
3. **Metadata Loading**: Datastore metadata is loaded
4. **Access Enablement**: Datastore becomes accessible
5. **VM Availability**: VMs can access the datastore

### Use Cases
- **New Datastores**: Making newly created datastores available
- **Maintenance Recovery**: Bringing datastores back online
- **Path Restoration**: Recovering from path failures
- **Reconfiguration**: After storage reconfiguration

## Unmount Operation

### Process Steps
1. **Usage Check**: Verify no active VMs using the datastore
2. **Access Revocation**: Datastore access is disabled
3. **Metadata Unloading**: Datastore metadata is unloaded
4. **Path Removal**: Storage paths are invalidated
5. **Inaccessibility**: Datastore becomes inaccessible

### Use Cases
- **Maintenance**: Preparing datastores for maintenance
- **Troubleshooting**: Isolating datastore issues
- **Decommissioning**: Removing datastores from service
- **Reconfiguration**: Before storage reconfiguration

## Operational Considerations

### Prerequisites
- **No Active VMs**: Ensure no VMs are using the datastore
- **Maintenance Mode**: Host in maintenance mode for safety
- **Backup**: Ensure data is backed up before operations
- **Permissions**: Appropriate administrative privileges

### Safety Measures
- **Impact Assessment**: Evaluate impact on VMs and services
- **Downtime Planning**: Schedule operations during maintenance windows
- **Rollback Plan**: Prepare recovery procedures
- **Monitoring**: Monitor system during operations

## Management Interfaces

### vSphere Client
- **GUI Operations**: Point-and-click mount/unmount
- **Wizard Support**: Step-by-step guidance
- **Validation**: Built-in validation checks
- **Logging**: Operation logging and auditing

### Command-Line Tools
- **ESXCLI**: Command-line mount/unmount operations
- **PowerCLI**: Scripted automation capabilities
- **API Access**: Programmatic management
- **Diagnostic Tools**: Advanced troubleshooting

## vSphere 9 Enhancements

### Performance Improvements
- **Faster Operations**: Accelerated mount/unmount processes
- **Parallel Processing**: Better concurrent operations
- **Resource Optimization**: Improved resource management
- **Efficiency**: More efficient operation execution

### Security Enhancements
- **Access Control**: Fine-grained permission controls
- **Audit Trail**: Comprehensive operation logging
- **Validation**: Enhanced validation mechanisms
- **Compliance**: Better compliance reporting

### Management Improvements
- **Automation**: Streamlined management workflows
- **Monitoring**: Enhanced monitoring capabilities
- **Error Handling**: Better error recovery
- **Integration**: Improved platform integration

## Best Practices

1. **Planning**: Plan mount/unmount operations carefully
2. **Validation**: Always validate prerequisites
3. **Safety**: Use maintenance mode when appropriate
4. **Monitoring**: Monitor operations closely
5. **Documentation**: Document all operations
6. **Testing**: Test procedures in non-production

## Troubleshooting Commands

```bash
# List mounted datastores
esxcli storage vmfs extent list

# Check datastore information
vim-cmd hostsvc/datastore/info

# View datastore access mode
esxcli storage filesystem list

# Mount datastore
esxcli storage filesystem mount -l <datastore-name>

# Unmount datastore
esxcli storage filesystem unmount -l <datastore-name>
```

## Related Technologies

- [Datastore](/glossary/term/datastore.md)
- [VMFS Datastore](/glossary/term/vmfs-datastore.md)
- [Attach and Detach](/glossary/term/attach-detach.md)
- [Storage Device](/glossary/term/storage-device.md)
- [LUN](/glossary/term/lun.md)