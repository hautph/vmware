---
term: Storage DRS
category: Storage
---

Storage DRS (Distributed Resource Scheduler) is a feature that automatically load balances virtual machine disks across datastores based on space and I/O resource utilization. Storage DRS extends the capabilities of traditional DRS by providing intelligent storage placement and load balancing, optimizing both storage capacity and performance across datastore clusters.

## Overview

Storage DRS provides:
- Automated storage placement for virtual machine disks
- Load balancing across datastore clusters
- Space and I/O performance optimization
- Integration with vSphere DRS for comprehensive resource management
- Support for various storage types and configurations

## Key Features

### Storage Placement
- **Initial Placement**: Intelligent initial placement of VM disks
- **Storage Policies**: Integration with storage policy-based management
- **Affinity Rules**: Support for storage affinity and anti-affinity rules
- **Resource Matching**: Matching VM requirements with storage capabilities

### Load Balancing
- **Space Load Balancing**: Balancing based on datastore space utilization
- **I/O Load Balancing**: Balancing based on datastore I/O performance
- **Automatic Migration**: Automatic migration of VM disks (Storage vMotion)
- **Threshold Management**: Configurable thresholds for load balancing

### Performance Optimization
- **Latency Monitoring**: Continuous monitoring of storage latency
- **Throughput Analysis**: Analysis of storage throughput patterns
- **Resource Forecasting**: Forecasting of storage resource needs
- **Performance Recommendations**: Performance optimization recommendations

## Architecture

### Components
- **Storage DRS Service**: Central service that manages storage placement
- **Datastore Clusters**: Logical grouping of datastores for management
- **Placement Engine**: Engine that determines optimal storage placement
- **Load Balancer**: Component that monitors and balances storage load
- **Recommendation Engine**: Engine that generates placement recommendations

### Decision Making Process
1. **Resource Analysis**: Analysis of datastore space and I/O utilization
2. **Policy Evaluation**: Evaluation of storage policies and requirements
3. **Placement Calculation**: Calculation of optimal placement options
4. **Recommendation Generation**: Generation of placement recommendations
5. **Execution**: Execution of placement or migration operations

### Storage Cluster Types
- **VMFS Datastore Clusters**: Clusters of VMFS datastores
- **NFS Datastore Clusters**: Clusters of NFS datastores
- **vSAN Clusters**: Clusters of vSAN datastores
- **Mixed Storage Clusters**: Clusters with mixed storage types

## Configuration Examples

### PowerCLI Configuration
```powershell
# Enable Storage DRS on a datastore cluster
Get-DatastoreCluster "StorageCluster" | Set-DatastoreCluster -StorageDrsAutomationLevel FullyAutomated

# Configure Storage DRS advanced settings
Get-DatastoreCluster "StorageCluster" | Get-StorageDrsCluster | Set-StorageDrsCluster -SpaceUtilizationThreshold 80 -IoLatencyThreshold 15

# Create datastore cluster
New-DatastoreCluster -Name "StorageCluster" -Location (Get-Datacenter "Datacenter01")

# Add datastore to cluster
Move-Datastore -Datastore (Get-Datastore "Datastore01") -Destination (Get-DatastoreCluster "StorageCluster")
```

### ESXi CLI Configuration
```bash
# Check Storage DRS status
vim-cmd vimsvc/task_list | grep -i storagedrs

# View datastore cluster information
vim-cmd hostsvc/datastore/list

# Check storage performance metrics
esxtop (press 'd' for disk adapter view)

# View storage configuration
esxcli storage core path list
```

### vSphere Client Configuration
```xml
<!-- Storage DRS configuration in datastore cluster settings -->
<storage-drs>
enabled = true
automation_level = fully_automated
space_utilization_threshold = 80
io_latency_threshold = 15
```

## Requirements

### Storage Infrastructure
- **Compatible Storage**: Storage arrays with Storage DRS support
- **Datastore Clusters**: Properly configured datastore clusters
- **Network Connectivity**: Reliable storage network connectivity
- **Storage Redundancy**: Proper storage redundancy for data protection

### Software
- **vCenter Server**: Required for Storage DRS management
- **ESXi 5.0 or later**: Hosts with Storage DRS support
- **Compatible Storage Arrays**: Storage arrays with Storage DRS support
- **Proper Licensing**: vSphere Enterprise or Enterprise Plus license

### Network
- **Storage Network**: Dedicated storage network for performance
- **Low Latency**: Low latency storage network connections
- **High Bandwidth**: Sufficient bandwidth for Storage vMotion
- **Reliability**: Reliable storage network infrastructure

## Automation Levels

### Manual
- **Recommendation Only**: Storage DRS generates recommendations only
- **Manual Approval**: Manual approval of all placement operations
- **Administrator Control**: Full administrator control
- **Minimal Automation**: Minimal automation of storage operations

### Partially Automated
- **Initial Placement**: Automated initial placement of new VMs
- **Manual Load Balancing**: Manual approval of load balancing operations
- **Mixed Control**: Mixed automated and manual operations
- **Selective Automation**: Selective automation of storage operations

### Fully Automated
- **Complete Automation**: Complete automation of all storage operations
- **Automatic Placement**: Automatic placement of new VMs
- **Automatic Load Balancing**: Automatic load balancing operations
- **No Manual Intervention**: No manual intervention required

## Best Practices

1. **Cluster Design**: Design datastore clusters carefully
2. **Policy Configuration**: Configure appropriate storage policies
3. **Monitoring**: Monitor Storage DRS performance and recommendations
4. **Threshold Tuning**: Tune thresholds based on workload characteristics
5. **Testing**: Test Storage DRS behavior in non-production environments
6. **Documentation**: Document Storage DRS configurations and policies

## vSphere 8 Enhancements

### Improved Integration
- **Enhanced DRS Integration**: Better coordination with compute DRS
- **Advanced Storage Types**: Better support for modern storage types
- **Policy Management**: More flexible storage policy management
- **Monitoring**: Enhanced storage performance monitoring

### Performance Improvements
- **Faster Operations**: Faster storage placement and migration
- **Reduced Overhead**: Lower overhead for Storage DRS operations
- **Better Decision Making**: Improved algorithms for placement decisions
- **Enhanced Reliability**: More reliable Storage DRS operations

### Management Features
- **Advanced Monitoring**: Better visibility into storage operations
- **Improved Reporting**: Better reporting on storage utilization
- **Streamlined Configuration**: Simplified Storage DRS configuration
- **Enhanced Troubleshooting**: Better diagnostic capabilities

## Troubleshooting Commands

```bash
# Check Storage DRS status and recommendations
vim-cmd vimsvc/task_list | grep -i storagedrs

# View datastore cluster information
vim-cmd hostsvc/datastore/list

# Check storage performance metrics
esxtop (press 'd' for disk adapter view)

# View Storage DRS logs
tail -f /var/log/vmware/vpxd.log | grep -i storagedrs

# Check storage device status
esxcli storage core path list
```

## Related Technologies

- [DRS](/glossary/term/drs.md)
- [Storage vMotion](/glossary/term/storage-vmotion.md)
- [vSAN](/glossary/term/vsan.md)
- [Datastore](/glossary/term/vmfs-8.md)
- [Storage I/O Control](/glossary/term/storage-io-control.md)