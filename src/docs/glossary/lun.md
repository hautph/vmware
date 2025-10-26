---
term: Logical Unit Number (LUN)
category: Storage
---

A Logical Unit Number (LUN) is a unique identifier assigned to a logical unit, which is a device or functional unit accessible to a SCSI (Small Computer System Interface) protocol. In storage systems, LUNs are used to identify and manage logical volumes or storage devices that are presented to servers or hosts.

## Overview

LUNs provide:
- Logical organization of physical storage devices
- Unique identification for storage volumes
- Abstraction layer between physical storage and host systems
- Granular access control and management

## Key Concepts

### Storage Virtualization
- LUNs abstract physical storage into logical units
- Multiple physical disks can be combined into a single LUN
- Enables flexible storage allocation and management
- Provides a consistent interface regardless of underlying hardware

### SCSI Architecture
- Part of the SCSI protocol addressing scheme
- Used to identify targets and logical units
- Supports up to 16,384 LUNs per target
- Integral to SAN (Storage Area Network) environments

## Types of LUNs

### Physical LUNs
- Direct mapping to physical storage devices
- One-to-one relationship with physical disks
- Provides raw device access
- Common in traditional storage arrays

### Virtual LUNs
- Abstracted logical volumes
- Can span multiple physical devices
- Support advanced features like thin provisioning
- Common in modern storage systems

### Thin Provisioned LUNs
- Allocated storage on-demand
- Only consumes physical space when data is written
- Improves storage utilization efficiency
- Requires careful monitoring to prevent over-allocation

## LUN Management

### Creation and Configuration
- Define size and RAID level
- Assign appropriate storage policies
- Configure access controls and permissions
- Set performance parameters

### Monitoring and Maintenance
- Track performance metrics (IOPS, latency)
- Monitor capacity utilization
- Perform regular health checks
- Implement backup and recovery procedures

## VMware vSphere Implementation

### VMFS Datastores
- LUNs serve as backing storage for VMFS datastores
- Multiple VMFS volumes can reside on a single LUN
- Supports different block sizes for various workloads
- Requires proper sizing based on expected usage

### RDM (Raw Device Mapping)
- Direct access to LUNs from virtual machines
- Supports physical mode (pass-through) and virtual mode
- Enables SAN-aware applications to access storage directly
- Required for certain clustering and replication scenarios

### Storage Policies
- Define performance and availability requirements
- Automatically place VMs on appropriate LUNs
- Enable dynamic migration between storage tiers
- Support compliance and governance requirements

## Best Practices

1. **LUN Sizing**: Properly size LUNs based on workload requirements and growth projections
2. **Performance Isolation**: Separate high-performance workloads onto dedicated LUNs
3. **Monitoring**: Regularly monitor LUN performance metrics including IOPS, latency, and throughput
4. **Capacity Planning**: Implement proactive capacity management to avoid performance degradation
5. **Access Control**: Apply appropriate access controls to prevent unauthorized access to LUNs

## Troubleshooting Commands

```bash
# List available LUNs on ESXi host
esxcli storage core path list

# View detailed LUN information
esxcli storage vmfs extent list

# Check LUN connectivity status
esxcli storage core device list

# Rescan storage adapters
esxcli storage core adapter rescan
```

## Related Technologies

- [Storage](/glossary/term/storage)
- [iSCSI](/glossary/term/iscsi)
- [VMFS](/glossary/term/vmfs)
- [RDM](/glossary/term/rdm)
- [vSAN](/glossary/term/vsan)
- [Storage DRS](/glossary/term/storage-drs)
- [VASA](/glossary/term/vasa)