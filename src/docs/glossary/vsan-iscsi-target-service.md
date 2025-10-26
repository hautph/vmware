---
term: vSAN iSCSI Target Service
category: Storage
---

The vSAN iSCSI Target Service allows applications and physical servers that are external to the vSAN cluster to access storage provided by vSAN. This service presents vSAN storage as iSCSI targets, enabling a broader range of workloads to leverage the benefits of vSAN. The iSCSI Target Service extends vSAN's capabilities beyond traditional virtualized environments to support hybrid and multi-cloud architectures where external systems require direct block storage access.

## Overview

vSAN iSCSI Target Service provides:
- iSCSI target functionality for vSAN storage
- Block storage access for external systems
- Integration with vSAN's distributed architecture
- Unified management through vCenter Server
- Policy-based storage management for iSCSI LUNs

## Key Features

### External Access
- **iSCSI Protocol**: Standard iSCSI protocol support
- **External Workloads**: Access for non-vSphere workloads
- **Physical Servers**: Support for physical server access
- **Hybrid Environments**: Support for hybrid cloud environments
- **Multi-Platform**: Access from various operating systems

### Storage Integration
- **vSAN Integration**: Seamless integration with vSAN storage
- **Data Protection**: Leverages vSAN's data protection
- **Performance**: Utilizes vSAN's performance features
- **Scalability**: Inherits vSAN's scalable architecture
- **Management**: Unified management with vSAN

### Management Capabilities
- **vCenter Integration**: Management through vCenter Server
- **Policy-Based**: Storage policy management for LUNs
- **Monitoring**: Integrated monitoring and reporting
- **Automation**: Automated provisioning and configuration
- **Compliance**: Compliance reporting and auditing

### Security Features
- **Authentication**: CHAP authentication support
- **Authorization**: Access control mechanisms
- **Encryption**: Data encryption capabilities
- **Auditing**: Comprehensive audit logging
- **Network Security**: Network-level security measures

## Architecture

### Components
- **iSCSI Target Nodes**: Dedicated nodes for iSCSI services
- **Storage Backend**: vSAN storage backend for data
- **Target Service**: iSCSI target service components
- **Management Interface**: Interface for administration
- **Security Services**: Security and authentication services

### Data Flow
1. **Client Access**: Client access through iSCSI protocol
2. **Target Processing**: iSCSI target processing
3. **Request Handling**: Request handling by target nodes
4. **Storage Operations**: Storage operations on vSAN backend
5. **Response Generation**: Response generation and delivery
6. **Monitoring**: Continuous monitoring and logging

### Integration Points
- **vCenter Server**: Centralized management integration
- **vSAN Cluster**: Integration with vSAN storage cluster
- **Network Infrastructure**: Integration with network systems
- **Monitoring Tools**: Integration with monitoring solutions
- **Security Systems**: Integration with security tools

## Configuration Examples

### PowerCLI Configuration
```powershell
# Enable iSCSI target service
Set-VsanClusterConfiguration -Cluster "ProductionCluster" -IscsiTargetServiceEnabled $true

# Create iSCSI target
New-VsanIscsiTarget -Cluster "ProductionCluster" -Name "iSCSITarget01" -Iqn "iqn.1998-01.com.vmware:target01"

# Create iSCSI LUN
New-VsanIscsiLun -Target "iSCSITarget01" -Name "LUN01" -CapacityGB 500

# Set storage policy for iSCSI LUN
Set-VsanIscsiLun -Lun "LUN01" -StoragePolicy "Performance-Policy"

# View iSCSI targets
Get-VsanIscsiTarget -Cluster "ProductionCluster" | Select-Object Name, Iqn, Status

# Remove iSCSI target
Remove-VsanIscsiTarget -Target "iSCSITarget01" -Confirm:$false
```

### ESXi CLI Configuration
```bash
# Check iSCSI target service status
esxcli vsan iscsi service list

# View iSCSI targets
esxcli vsan iscsi target list

# Check LUN configuration
esxcli vsan iscsi lun list

# View target service nodes
esxcli vsan iscsi node list

# Check iSCSI logs
tail -f /var/log/vmware/vsan/iscsi.log
```

### vSphere Client Configuration
```xml
# vSAN iSCSI Target Service configuration
[vsan-iscsi-target]
enabled = true
default_policy = vsan-default
max_targets = 50
max_luns_per_target = 256
```

## Requirements

### Software
- **vSAN 6.5 or later**: Required for iSCSI target service
- **vCenter Server**: Required for management
- **ESXi 6.5 or later**: Hosts with iSCSI support
- **Compatible Licenses**: vSAN Enterprise license
- **Management Tools**: Compatible management tools

### Hardware
- **vSAN Ready Hardware**: vSAN certified hardware
- **Network Infrastructure**: High-performance network infrastructure
- **Storage Devices**: Compatible storage devices
- **Redundancy**: Proper redundancy planning
- **Capacity Planning**: Adequate capacity planning

### Network
- **Dedicated Networks**: Dedicated networks for iSCSI traffic
- **High Bandwidth**: High-bandwidth network connections
- **Low Latency**: Low-latency network infrastructure
- **Security**: Network security measures
- **Redundancy**: Network redundancy

### Client Requirements
- **iSCSI Initiator**: iSCSI initiator software
- **Network Access**: Network access to iSCSI targets
- **Authentication**: Proper authentication credentials
- **Compatible OS**: Compatible operating systems
- **Storage Drivers**: Appropriate storage drivers

## Security Features

### Authentication
- **CHAP Support**: Challenge Handshake Authentication Protocol
- **Mutual CHAP**: Mutual CHAP authentication
- **Initiator Authentication**: Initiator-based authentication
- **Target Authentication**: Target-based authentication
- **Certificate Support**: Certificate-based authentication

### Access Control
- **LUN Masking**: LUN masking for access control
- **Target Groups**: Target grouping for management
- **Initiator Groups**: Initiator grouping for access
- **Access Policies**: Policy-based access control
- **Role-Based Access**: Role-based access control

### Data Protection
- **Encryption**: Data encryption in transit
- **Integrity**: Data integrity protection
- **Privacy**: Data privacy protection
- **Auditing**: Comprehensive audit trails
- **Compliance**: Compliance with security standards

## Best Practices

1. **Planning**: Plan iSCSI target deployment carefully
2. **Sizing**: Properly size LUNs and capacity
3. **Security**: Implement proper security measures
4. **Monitoring**: Monitor performance and usage
5. **Backup**: Implement backup strategies
6. **Documentation**: Document configurations and procedures

## vSphere 8 Enhancements

### Enhanced Features
- **Improved Performance**: Better iSCSI target performance
- **Advanced Security**: Enhanced security features
- **Better Integration**: Better integration with vSphere 8
- **Enhanced Monitoring**: Improved monitoring capabilities

### New Capabilities
- **Enhanced Protocols**: Improved protocol support
- **Better Policies**: More advanced storage policies
- **Advanced Automation**: More advanced automation
- **Streamlined Operations**: Simplified management operations

### Performance Improvements
- **Faster Operations**: Faster iSCSI operations
- **Reduced Overhead**: Lower iSCSI overhead
- **Better Scalability**: Better handling of large environments
- **Enhanced Reliability**: More reliable iSCSI services

## Troubleshooting Commands

```bash
# Check iSCSI target service status
esxcli vsan iscsi service list

# View iSCSI targets
esxcli vsan iscsi target list

# Check LUN configuration
esxcli vsan iscsi lun list

# View iSCSI logs
tail -f /var/log/vmware/vsan/iscsi.log

# Check cluster health
esxcli vsan cluster get
```

## Related Technologies

- [vSAN](/glossary/term/vsan.md)
- [iSCSI](/glossary/term/iscsi.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [Storage DRS](/glossary/term/storage-drs.md)
- [NFS](/glossary/term/nfs.md)