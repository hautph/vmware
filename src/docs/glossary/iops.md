---
term: IOPS (Input/Output Operations Per Second)
category: Storage
---

IOPS (Input/Output Operations Per Second) is a performance measurement used to characterize computer storage devices and systems. It represents the number of read and write operations that can be completed per second, providing a standardized metric for comparing storage performance across different technologies and configurations.

## Overview

IOPS measures:
- Storage system throughput capacity
- Performance under various workload patterns
- Efficiency of storage subsystems
- Comparative performance between different storage solutions

## Key Factors Affecting IOPS

### Block Size
- Smaller blocks (4KB) typically yield higher IOPS counts
- Larger blocks (64KB+) result in lower IOPS but higher throughput
- Workload characteristics determine optimal block size
- Mixed workloads require balanced approach

### Read/Write Ratio
- Read operations are generally faster than writes
- Write operations may require additional processing (journaling, checksums)
- Cache effectiveness varies with read/write patterns
- Random vs sequential access patterns significantly impact performance

### Access Patterns
- **Sequential Access**: Consecutive data blocks accessed in order
- **Random Access**: Data blocks accessed in non-sequential order
- Sequential operations typically achieve higher throughput
- Random operations better represent typical application workloads

### Storage Media Type
- **HDD**: Mechanical drives with moving parts
- **SSD**: Solid-state drives with no moving parts
- **NVMe**: High-performance flash storage with low latency
- **Hybrid**: Combination of HDD and SSD technologies

## IOPS Calculations

### Theoretical Maximum IOPS
For HDDs:
```
IOPS = 1 / (Average Latency + Average Seek Time)
```

For SSDs:
```
IOPS = 1 / Average Latency
```

### RAID Impact
- RAID configurations affect IOPS due to parity calculations
- RAID 0: No penalty, maximum performance
- RAID 1: Write penalty of 2x (mirror must be updated)
- RAID 5: Write penalty of 4x (read-modify-write operations)
- RAID 6: Write penalty of 6x (dual parity calculations)

## VMware vSphere Considerations

### Storage Policies
- Define IOPS requirements for different workloads
- Implement storage I/O control for resource management
- Monitor and enforce IOPS limits to prevent contention
- Use storage DRS to balance IOPS across datastores

### Performance Monitoring
- Track IOPS metrics using esxtop and vCenter performance charts
- Monitor latency alongside IOPS for complete performance picture
- Identify IOPS bottlenecks at host, storage, and network levels
- Correlate IOPS with application performance metrics

### Capacity Planning
- Baseline current IOPS requirements
- Project future IOPS needs based on growth trends
- Account for peak usage scenarios
- Plan for performance headroom and scalability

## Best Practices

1. **Workload Characterization**: Understand IOPS requirements for different applications
2. **Performance Testing**: Conduct realistic performance testing with representative workloads
3. **Monitoring**: Implement continuous IOPS monitoring with appropriate alerting thresholds
4. **Resource Management**: Use storage I/O control to ensure fair resource allocation
5. **Architecture Design**: Design storage architecture to meet peak IOPS requirements

## Troubleshooting Commands

```bash
# Monitor IOPS using esxtop (press 'i' for disk adapter view)
esxtop

# View storage performance metrics
esxcli storage core device list

# Check storage I/O control settings
esxcli storage vmfs extent list

# View virtual machine storage statistics
vim-cmd vmsvc/getallvms | while read vmid name; do
  if [[ $vmid =~ ^[0-9]+$ ]]; then
    vim-cmd vmsvc/storage/info $vmid
  fi
done
```

## Related Technologies

- [Storage](/glossary/term/storage)
- [Storage I/O Control](/glossary/term/storage-io-control)
- [Storage DRS](/glossary/term/storage-drs)
- [vSAN](/glossary/term/vsan)
- [VMFS](/glossary/term/vmfs)
- [LUN](/glossary/term/lun)
- [Performance Tuning](/knowledge/article/performance-tuning-in-vsphere-8)