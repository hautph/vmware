---
term: Transparent Page Sharing (TPS)
category: Memory_Management
---

Transparent Page Sharing (TPS) is a memory optimization technique in VMware ESXi that identifies and eliminates duplicate memory pages across multiple virtual machines. TPS allows the hypervisor to share identical memory pages between VMs, reducing overall memory consumption and enabling higher VM density on physical hosts.

## Overview

Transparent Page Sharing provides:
- Memory optimization through page deduplication
- Higher virtual machine density on physical hosts
- Reduced memory footprint for similar workloads
- Automatic operation without guest OS awareness

## Key Features

### Memory Deduplication
- **Page Scanning**: Automatic scanning of memory pages for duplicates
- **Hash Comparison**: Efficient comparison of page contents using hash values
- **Sharing Mechanism**: Sharing of identical pages between VMs
- **Copy-on-Write**: Creating unique copies when pages are modified

### Security Considerations
- **Security Disabling**: Largely disabled in modern versions due to security concerns
- **Side-Channel Attacks**: Protection against memory-based side-channel attacks
- **Granular Controls**: Fine-grained control over page sharing
- **Isolation Enhancement**: Improved VM isolation

### Performance Benefits
- **Memory Savings**: Reduced memory consumption for similar workloads
- **Higher Density**: More VMs per host with same memory resources
- **Cost Reduction**: Lower hardware costs through better utilization
- **Efficiency**: Automatic operation without manual intervention

## Architecture

### TPS Components
- **Page Scanner**: Component that scans memory pages for duplicates
- **Hash Table**: Storage of hash values for efficient page comparison
- **Sharing Manager**: Component that manages shared pages
- **Copy-on-Write Handler**: Handler for page modifications

### Memory Page Management
- **4KB Pages**: Standard memory page size in x86 systems
- **Hash Calculation**: Efficient hash algorithms for page identification
- **Reference Counting**: Tracking of shared page references
- **Memory Monitoring**: Continuous monitoring of page sharing effectiveness

### Security Mechanisms
- **Inter-VM Sharing Controls**: Controls for sharing between different VMs
- **Intra-VM Sharing**: Sharing within the same VM (still enabled)
- **Access Controls**: Security controls for page sharing operations
- **Monitoring**: Detection of potential security issues

## vSphere 8 Enhancements

### Security Improvements
- **Enhanced Isolation**: Better VM isolation in memory sharing
- **Granular Controls**: More precise control over sharing policies
- **Monitoring Enhancements**: Better detection of security-related issues
- **Compliance Features**: Enhanced compliance monitoring

### Performance Optimizations
- **Efficient Scanning**: Better algorithms for page scanning
- **Reduced Overhead**: Lower overhead for page sharing operations
- **Improved Hashing**: Better hash algorithms for page identification
- **Better Memory Management**: Enhanced overall memory management

### Management Features
- **Advanced Monitoring**: Better visibility into page sharing operations
- **Improved Reporting**: Better reporting on memory savings
- **Streamlined Configuration**: Simplified configuration of sharing policies
- **Enhanced Troubleshooting**: Better diagnostic capabilities

## Best Practices

1. **Security Awareness**: Understand security implications of memory sharing
2. **Workload Considerations**: Consider workload similarity for maximum benefits
3. **Monitoring**: Regularly monitor memory sharing effectiveness
4. **Configuration**: Properly configure sharing policies based on security requirements
5. **Performance Testing**: Test memory sharing impact on application performance
6. **Capacity Planning**: Account for memory sharing in capacity planning

## Troubleshooting Commands

```bash
# Check TPS status and statistics
esxcli system settings advanced list -o /Mem/ShareForceSalting
esxcli system settings advanced list -o /Mem/ShareScanTime
esxcli system settings advanced list -o /Mem/ShareScanGHz

# View memory sharing information
esxtop (press 'm' for memory view, then check shared memory columns)

# Check VM memory sharing
vim-cmd vmsvc/get.config <vmid> | grep -i share

# View memory page information
esxcli hardware memory get

# Check memory scheduler information
esxcli system settings advanced list -o /Mem/
```

## Related Technologies

- [Memory Overcommitment](/glossary/term/memory-overcommitment.md)
- [Balloon Driver](/glossary/term/balloon-driver.md)
- [Memory Compression](/glossary/term/memory-compression.md)
- [ESXi](/glossary/term/esxi.md)
- [Memory Management](/glossary/term/memory-management)
- [Performance Tuning](/knowledge/article/performance-tuning-in-vsphere-8)
