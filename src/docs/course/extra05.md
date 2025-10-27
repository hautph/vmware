---
title: VMware vSAN Architecture and Best Practices
day: 5
---

# VMware vSAN Architecture and Best Practices

## Overview

This comprehensive guide explores VMware vSAN (Virtual SAN) architecture, covering both Original Storage Architecture (OSA) and Express Storage Architecture (ESA). It provides detailed insights into design principles, configuration best practices, and operational considerations for deploying and managing vSAN environments.

## Table of Contents

1. [Introduction to vSAN](#introduction-to-vsan)
2. [vSAN Architectures](#vsan-architectures)
3. [Hardware Requirements](#hardware-requirements)
4. [Network Design](#network-design)
5. [Storage Policies](#storage-policies)
6. [Capacity Planning](#capacity-planning)
7. [Performance Optimization](#performance-optimization)
8. [Monitoring and Troubleshooting](#monitoring-and-troubleshooting)
9. [Best Practices](#best-practices)

---

## Introduction to vSAN

VMware vSAN is a software-defined storage solution that transforms direct-attached storage devices in ESXi hosts into a shared storage pool. It eliminates the need for external storage arrays while providing enterprise-grade features such as high availability, data protection, and performance optimization.

### Key Features

* **Hyper-convergence**: Compute and storage resources are collocated on the same hardware
* **Policy-Based Management**: Storage policies define service levels for virtual machines
* **Data Services**: Built-in data services including deduplication, compression, and encryption
* **Scalability**: Linear scaling by adding more hosts to the cluster
* **Resilience**: Automatic data protection and recovery mechanisms

### Use Cases

1. **General Purpose Infrastructure**: Consolidated infrastructure for diverse workloads
2. **VDI Deployments**: Optimized storage for desktop virtualization environments
3. **Disaster Recovery**: Cost-effective DR solutions with vSAN stretched clusters
4. **Remote Office/Branch Office (ROBO)**: Simplified storage for remote locations
5. **Dev/Test Environments**: Agile infrastructure for development and testing

---

## vSAN Architectures

VMware vSAN offers two distinct storage architectures: Original Storage Architecture (OSA) and Express Storage Architecture (ESA). Each architecture is optimized for different use cases and requirements.

### Original Storage Architecture (OSA)

OSA is the traditional vSAN architecture that has been available since the early versions of vSAN.

#### Architecture Components

* **Cache Tier**: High-performance SSD/NVMe devices used for caching
  * **Write Buffer**: 70% of cache capacity for write operations
  * **Read Cache**: 30% of cache capacity for read operations
* **Capacity Tier**: Larger capacity devices (HDD, SSD, NVMe) for data storage
* **Disk Groups**: Logical grouping of cache and capacity devices
  * One cache device per disk group
  * One to seven capacity devices per disk group

#### Data Placement

* **Write Operations**: Data is written to the write buffer first, then destaged to capacity devices
* **Read Operations**: Data is served from read cache if available, otherwise from capacity devices
* **Data Protection**: Data is replicated or erasure coded based on storage policies

#### Advantages

* **Mature Technology**: Well-tested and proven architecture
* **Flexible Hardware**: Supports a wide range of storage devices
* **Cost-Effective**: Can use HDDs for capacity tier to reduce costs
* **Workload Optimization**: Cache tier optimizes performance for mixed workloads

### Express Storage Architecture (ESA)

ESA is the next-generation vSAN architecture introduced in vSAN 8, designed specifically for NVMe devices.

#### Architecture Components

* **Performance Pool**: All NVMe devices form a single performance pool
* **No Cache Tier**: Eliminates the separate cache tier for simplified architecture
* **Log-Structured File System**: Optimized file system for NVMe performance
* **Native Compression**: Compression applied at the file system level

#### Data Placement

* **Unified Storage**: All data resides in the performance pool
* **Log-Structured Writes**: Sequential writes optimize NVMe performance
* **Inline Operations**: Deduplication and compression performed inline
* **Efficient Reclamation**: Space reclamation optimized for NVMe devices

#### Advantages

* **Simplified Architecture**: No separate cache and capacity tiers
* **Optimized Performance**: Designed specifically for NVMe devices
* **Reduced Write Penalty**: Log-structured writes minimize performance impact
* **Lower Latency**: Direct access to NVMe devices reduces latency

---

## Hardware Requirements

Proper hardware selection is critical for vSAN performance and reliability.

### Server Hardware

* **Minimum Hosts**: 3 hosts for standard clusters (4 hosts recommended)
* **CPU Requirements**: Modern processors with sufficient cores for workload demands
* **Memory**: Adequate RAM for ESXi, vSAN, and virtual machine workloads
* **Boot Devices**: Dedicated boot devices (USB, SD, SATADOM, or small SSD)

### Storage Devices

#### For OSA

* **Cache Devices**: High-performance SSD/NVMe devices
  * Minimum 10% of total usable capacity
  * Recommended 600GB or larger for optimal performance
* **Capacity Devices**: HDD or SSD/NVMe devices
  * Can mix different device types within a disk group
  * All devices in a disk group should be same model for best performance

#### For ESA

* **All NVMe Devices**: Only NVMe devices are supported
  * Mix of different NVMe device types is supported
  * All devices contribute to the performance pool
* **Device Sizing**: Larger devices provide better performance scaling

### Network Requirements

* **vSAN Network**: Dedicated 10GbE or higher network for vSAN traffic
* **Redundancy**: Multiple network paths for high availability
* **Jumbo Frames**: Recommended for improved performance (MTU 9000)
* **Quality of Service**: Network QoS to prioritize vSAN traffic

---

## Network Design

Network design is crucial for vSAN performance and reliability.

### vSAN Network Configuration

* **Dedicated Network**: Isolate vSAN traffic from other network traffic
* **Bandwidth**: Minimum 10GbE, 25GbE or higher recommended for production
* **Latency**: Keep network latency below 5ms for optimal performance
* **Redundancy**: Multiple network paths using NIC teaming or link aggregation

### Network Best Practices

* **Jumbo Frames**: Enable jumbo frames (MTU 9000) on all network components
* **Switch Configuration**: Ensure switches support and are configured for jumbo frames
* **Network Isolation**: Use VLANs to isolate vSAN traffic
* **Quality of Service**: Implement QoS to prioritize vSAN traffic

### Multi-NIC Configuration

* **Active-Active**: Configure multiple NICs in active-active mode for load balancing
* **Link Aggregation**: Use LACP for link aggregation when supported
* **Failover**: Configure proper failover settings for network redundancy

---

## Storage Policies

Storage policies in vSAN define the service levels for virtual machine objects.

### Policy Components

* **Failure Tolerance Method (FTM)**: Defines how data is protected
  * **RAID-1 (Mirroring)**: Data is replicated to multiple locations
  * **RAID-5/6 (Erasure Coding)**: Data is striped with parity information
* **Failures to Tolerate (FTT)**: Number of failures the policy can tolerate
  * **FTT=1**: Can tolerate one failure
  * **FTT=2**: Can tolerate two failures
* **Object Space Reservation**: Percentage of object space reserved (thin vs. thick provisioning)
* **IOPS Limit**: Maximum IOPS per GB for the object
* **Checksum**: Enable/disable checksum for data integrity

### Common Policies

#### Performance Policy

```
FTM: RAID-1
FTT: 1
Object Space Reservation: 0% (Thin)
IOPS Limit: 0 (No limit)
Checksum: Disabled
```

#### Capacity Policy

```
FTM: RAID-5
FTT: 1
Object Space Reservation: 0% (Thin)
IOPS Limit: 0 (No limit)
Checksum: Enabled
```

#### Mission Critical Policy

```
FTM: RAID-1
FTT: 2
Object Space Reservation: 100% (Thick)
IOPS Limit: 0 (No limit)
Checksum: Enabled
```

### Policy Management

* **Default Policies**: Configure default policies for different workload types
* **Policy Inheritance**: VMs inherit policies from parent objects when not explicitly assigned
* **Policy Changes**: Policy changes are applied automatically to existing objects
* **Compliance**: Monitor policy compliance to ensure SLA adherence

---

## Capacity Planning

Capacity planning ensures optimal utilization of vSAN resources while maintaining performance and availability.

### Capacity Calculation

#### For OSA

* **Raw Capacity**: Total capacity of all capacity devices
* **Usable Capacity**: Raw capacity minus overhead for data protection
  * RAID-1 (FTT=1): Usable = Raw × 0.5
  * RAID-1 (FTT=2): Usable = Raw × 0.33
  * RAID-5 (FTT=1): Usable = Raw × 0.67
  * RAID-6 (FTT=2): Usable = Raw × 0.5
* **Overhead**: Additional space for metadata, swap objects, and temporary operations

#### For ESA

* **Raw Capacity**: Total capacity of all NVMe devices
* **Usable Capacity**: Raw capacity minus overhead for data protection and metadata
  * RAID-1 (FTT=1): Usable = Raw × 0.5
  * RAID-1 (FTT=2): Usable = Raw × 0.33
  * RAID-5 (FTT=1): Usable = Raw × 0.67
  * RAID-6 (FTT=2): Usable = Raw × 0.5
* **Compression**: Additional space savings from inline compression

### Planning Considerations

* **Growth Rate**: Project capacity growth over 1-3 years
* **Workload Patterns**: Understand read/write ratios and I/O patterns
* **Peak Usage**: Account for peak usage periods
* **Maintenance Operations**: Reserve space for maintenance activities
* **Future Expansion**: Plan for future capacity expansion

---

## Performance Optimization

Performance optimization ensures vSAN delivers the required service levels for applications.

### Performance Factors

* **Hardware Selection**: Choose appropriate hardware for workload requirements
* **Network Design**: Optimize network configuration for low latency and high throughput
* **Storage Policies**: Use appropriate policies for workload characteristics
* **Resource Allocation**: Properly allocate CPU, memory, and storage resources

### Monitoring Performance

* **vSAN Performance Service**: Built-in performance monitoring and analysis
* **Key Metrics**: Monitor IOPS, latency, throughput, and congestion
* **Performance Charts**: Use vSAN performance charts for trend analysis
* **Alerts**: Configure performance alerts for proactive issue detection

### Optimization Techniques

* **Workload Distribution**: Distribute workloads evenly across hosts
* **Resource Balancing**: Use DRS to balance compute resources
* **Network Optimization**: Optimize network configuration and utilization
* **Storage Policy Tuning**: Adjust policies based on performance requirements

---

## Monitoring and Troubleshooting

Effective monitoring and troubleshooting are essential for maintaining vSAN health and performance.

### Health Checks

* **vSAN Health Service**: Comprehensive health checks for all vSAN components
* **Proactive Tests**: Automated tests for hardware, network, and configuration issues
* **Health Alarms**: Configurable alarms for critical issues
* **Remediation Guidance**: Actionable guidance for resolving health issues

### Monitoring Tools

* **vCenter Server**: Centralized monitoring and management
* **vRealize Operations**: Advanced analytics and capacity planning
* **vRealize Log Insight**: Log aggregation and analysis
* **ESXTOP**: Detailed performance analysis for troubleshooting

### Common Issues

* **Network Latency**: High latency affecting vSAN performance
* **Disk Failures**: Drive failures requiring replacement
* **Capacity Issues**: Insufficient capacity for workload demands
* **Policy Compliance**: Non-compliant storage policies

### Troubleshooting Approach

1. **Identify Symptoms**: Determine the specific issue and affected components
2. **Check Health Status**: Review vSAN health status for related issues
3. **Analyze Logs**: Examine relevant logs for error messages and warnings
4. **Review Configuration**: Verify configuration settings are correct
5. **Test Components**: Perform tests to isolate the root cause
6. **Implement Fixes**: Apply appropriate solutions to resolve issues

---

## Best Practices

Following best practices ensures successful vSAN deployment and operation.

### Design Best Practices

* **Cluster Sizing**: Deploy 4 or more hosts for production environments
* **Hardware Homogeneity**: Use similar hardware configurations for predictable performance
* **Network Redundancy**: Implement redundant network paths for high availability
* **Capacity Planning**: Plan for 70-80% utilization to allow for growth and maintenance

### Operational Best Practices

* **Regular Updates**: Keep vSAN and ESXi updated with latest patches
* **Health Monitoring**: Regularly review vSAN health status and address issues promptly
* **Performance Monitoring**: Monitor performance metrics and optimize as needed
* **Backup and Recovery**: Implement comprehensive backup and recovery procedures

### Security Best Practices

* **Encryption**: Enable vSAN encryption for data-at-rest protection
* **Access Control**: Implement proper RBAC for vSAN management
* **Network Security**: Secure vSAN network with VLANs and firewalls
* **Audit Logging**: Enable audit logging for compliance and security monitoring

### Performance Best Practices

* **Workload Profiling**: Understand workload characteristics for optimal configuration
* **Resource Sizing**: Properly size CPU, memory, and storage resources
* **Network Optimization**: Optimize network configuration for low latency
* **Policy Optimization**: Use appropriate storage policies for workload requirements

---

## Conclusion

VMware vSAN provides a powerful software-defined storage solution that simplifies storage management while delivering enterprise-grade features and performance. By understanding the architecture options, following best practices, and implementing proper monitoring and troubleshooting procedures, organizations can successfully deploy and operate vSAN environments that meet their business requirements.

Whether choosing the mature Original Storage Architecture or the next-generation Express Storage Architecture, vSAN offers flexibility and scalability to support diverse workloads and use cases. With proper planning, design, and ongoing management, vSAN can serve as the foundation for modern hyper-converged infrastructure deployments.