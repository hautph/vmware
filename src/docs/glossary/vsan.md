---
title: vSAN (Virtual SAN)
category: Storage
---

VMware vSAN (Virtual SAN) is VMware's enterprise-grade hyper-converged storage solution that transforms local or direct-attach storage devices across ESXi hosts into a shared storage pool. vSAN eliminates the need for external storage arrays by creating a distributed, software-defined storage platform that is deeply integrated with the vSphere hypervisor.

## Overview

vSAN provides a unified storage platform with features including:
- Software-defined storage architecture
- Distributed storage across cluster hosts
- Policy-driven storage management
- Native data services and protection
- Seamless integration with vSphere operations

## Architecture

### Storage Components
vSAN leverages various storage components within each host:
- **Cache Tier**: High-performance SSDs for read caching and write buffering
- **Capacity Tier**: HDDs or SSDs for persistent data storage
- **Witness Host**: In stretched cluster configurations, provides quorum for data availability

### Data Placement
vSAN uses a distributed object-based approach:
- Data is organized into objects (VMDKs, VM swap files, snapshot files)
- Objects are divided into components (replicas, witnesses)
- Components are distributed across multiple hosts for availability
- Metadata tracks component locations and health status

## Configuration Examples

### PowerShell/PowerCLI Configuration
```powershell
# Enable vSAN on a cluster
Get-Cluster "ProductionCluster" | Set-VsanClusterConfiguration -Enabled $true

# Configure vSAN storage policies
New-SpbmStoragePolicy -Name "ProductionPolicy" -Description "High performance policy" -AnyOfRuleSets (
    New-SpbmRuleSet -Name "Performance" -AllOfRules (
        New-SpbmRule -Capability (Get-SpbmStorageProfile -Name "VSAN.default") -Value "Performance"
    )
)

# Add disks to vSAN
Get-VMHost "esxi01.domain.com" | Get-VMHostDisk | Set-VMHostDisk -State InUse
```

### ESXi CLI Configuration
```bash
# Check vSAN cluster status
esxcli vsan cluster get

# View vSAN storage configuration
esxcli storage vSAN disk list

# Monitor vSAN performance
esxtop -s /path/to/vsan/stats.csv

# Check vSAN network configuration
esxcli network vSAN network list
```

## Storage Policies

vSAN uses policy-based management to define storage requirements:
- **Failures to Tolerate (FTT)**: Number of host/component failures to protect against
- **Failure Tolerance Method**: RAID-1 (mirroring) or RAID-5/6 (erasure coding)
- **Number of Disk Stripes**: Distributes data across multiple capacity devices
- **Object Space Reservation**: Percentage of object size to reserve as capacity
- **Flash Read Cache Reservation**: Percentage of object size to reserve for read cache
- **IOPS Limit**: Maximum IOPS for the object
- **Access Latency**: Acceptable storage latency
- **Force Provisioning**: Continue provisioning even when policy cannot be satisfied

## vSphere 8 Enhancements

### Express Storage Architecture (ESA)
vSAN ESA is a new architecture introduced in vSphere 8:
- **Single-tier architecture**: Using high-performance NVMe devices
- **No disk groups required**: Simplifying management
- **New log-structured file system**: Optimized for write performance
- **RAID-6 at RAID-1 performance**: With improved compression
- **Up to 4x better data compression**: Compared to OSA
- **Enhanced performance**: Significantly better I/O performance
- **Simplified operations**: Easier management and monitoring

### Original Storage Architecture (OSA)
The traditional vSAN architecture remains available:
- **Two-tier design**: With cache and capacity tiers
- **Disk groups**: For organizing storage devices
- **Mature feature set**: With proven reliability
- **Compatible with existing hardware**: Configurations
- **Continued support**: For existing deployments

### Performance Improvements
- **Enhanced I/O processing**: Better I/O handling and processing
- **Optimized data placement**: Improved data distribution algorithms
- **Advanced caching**: Better cache utilization and management
- **Reduced latency**: Lower storage access latency
- **Higher throughput**: Better I/O throughput performance

### Management Enhancements
- **Simplified configuration**: Easier setup and configuration
- **Enhanced monitoring**: Better performance and health monitoring
- **Improved troubleshooting**: Better diagnostic capabilities
- **Streamlined operations**: Simplified day-to-day operations
- **Better integration**: With vSphere lifecycle management

## Deployment Models

### All-Flash Configuration
- Both cache and capacity tiers use SSDs
- Highest performance for latency-sensitive workloads
- Ideal for mission-critical applications
- Better IOPS and throughput compared to hybrid

### Hybrid Configuration
- Cache tier uses SSDs, capacity tier uses HDDs
- Cost-effective for capacity-intensive workloads
- Suitable for archival and backup workloads
- Balance of performance and capacity economics

### Stretched Cluster
- Extends vSAN across multiple sites for disaster recovery
- Requires minimum of 3 sites (2 data sites + 1 witness site)
- Provides active-active data center configuration
- Zero RPO and near-zero RTO for protected workloads

## Best Practices

1. **Hardware Selection**: Choose certified vSAN ReadyNodes for optimal compatibility
2. **Network Design**: Implement dedicated vSAN networks with 10 Gbps or higher
3. **Storage Policies**: Define appropriate policies based on application requirements
4. **Capacity Planning**: Monitor storage utilization and plan for growth
5. **Performance Monitoring**: Regularly review performance metrics and adjust configurations
6. **Maintenance**: Schedule maintenance windows for firmware updates and hardware replacements

## Troubleshooting Commands

```bash
# Check vSAN health status
esxcli vsan health get

# View vSAN storage utilization
esxcli storage vSAN cluster capacity

# Monitor vSAN network connectivity
esxcli network vSAN network health

# Check vSAN disk balance
esxcli storage vSAN disk balance get

# View vSAN performance service data
esxcli vsan perf query -i vsan-perf-service-instance
```

## Related Technologies

- [vSAN ESA](/glossary/term/vsan-express-storage-architecture.md)
- [vSAN OSA](/glossary/term/vsan-original-storage-architecture.md)
- [vSAN Stretched Cluster](/glossary/term/vsan-stretched-cluster.md)
- [Storage DRS](/glossary/term/storage-drs.md)
- [Storage I/O Control](/glossary/term/storage-io-control.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)