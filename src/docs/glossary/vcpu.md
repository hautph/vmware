---
term: Virtual CPU (vCPU)
category: Compute
---

A Virtual CPU (vCPU) is a virtualized processor core that is allocated to a virtual machine by the hypervisor. vCPUs provide computational resources to VMs, allowing guest operating systems and applications to execute instructions just as they would on physical CPU cores. The hypervisor manages the mapping of vCPUs to physical CPU cores and schedules their execution.

## Overview

Virtual CPUs provide:
- Computational resources for virtual machines
- Abstraction from physical processor architecture
- Dynamic allocation and deallocation
- Performance optimization through scheduling

## Key Features

### Resource Allocation
- **CPU Reservation**: Guaranteed minimum CPU resources
- **CPU Limit**: Maximum CPU resources that can be consumed
- **CPU Shares**: Priority-based CPU allocation during contention
- **Hot Add/Remove**: Dynamic addition/removal of vCPUs (when supported)

### Scheduling and Performance
- **CPU Scheduling**: Time-slicing of vCPUs on physical cores
- **CPU Affinity**: Binding vCPUs to specific physical cores
- **NUMA Awareness**: Optimizing vCPU placement for NUMA architectures
- **CPU Hotplug**: Dynamic CPU resource adjustment

### Monitoring and Management
- **CPU Utilization**: Real-time monitoring of CPU usage
- **Performance Metrics**: Detailed CPU performance statistics
- **Resource Pools**: Grouping and managing CPU resources
- **Quality of Service**: Ensuring consistent CPU performance

## Architecture

### vCPU Types
- **Single vCPU**: VM with one virtual processor core
- **Multi-vCPU**: VM with multiple virtual processor cores (SMP)
- **Multi-Core**: Multiple cores per vCPU (less common in modern versions)
- **CPU Hotplug**: Dynamically adjustable vCPU count

### CPU Scheduling
- **VMkernel Scheduler**: ESXi's CPU scheduling component
- **Time Slicing**: Allocation of physical CPU time to vCPUs
- **Priority Management**: Scheduling based on resource settings
- **Load Balancing**: Distribution of vCPUs across physical cores

### NUMA Considerations
- **NUMA Node Awareness**: Understanding NUMA topology
- **NUMA Scheduling**: Optimizing vCPU placement within NUMA nodes
- **NUMA Migration**: Moving vCPUs between NUMA nodes when needed
- **NUMA Affinity**: Binding vCPUs to specific NUMA nodes

## vSphere 8 Enhancements

### Performance Improvements
- **Enhanced Scheduler**: Improved CPU scheduling algorithms
- **Better NUMA Handling**: More efficient NUMA-aware scheduling
- **Reduced Overhead**: Lower CPU virtualization overhead
- **Improved Scalability**: Better handling of large numbers of vCPUs

### Management Features
- **Enhanced Monitoring**: Better CPU performance visibility
- **Improved Affinity**: Better CPU affinity controls
- **Streamlined Hotplug**: More reliable CPU hotplug operations
- **Advanced Scheduling**: Better scheduling for modern workloads

### Security Features
- **CPU Isolation**: Enhanced isolation between VMs
- **Resource Protection**: Better protection against CPU resource exhaustion
- **Monitoring Improvements**: Better detection of CPU-related security issues
- **Compliance Features**: Enhanced compliance monitoring

## Best Practices

1. **Right-Sizing**: Allocate appropriate number of vCPUs based on workload requirements
2. **Avoid Overcommitment**: Don't overallocate vCPUs compared to physical cores
3. **NUMA Awareness**: Consider NUMA topology when configuring vCPUs
4. **Monitoring**: Regularly monitor CPU utilization and performance
5. **Resource Settings**: Properly configure CPU reservations, limits, and shares
6. **Hotplug Usage**: Use CPU hotplug for dynamic resource adjustment when supported

## Troubleshooting Commands

```bash
# Check CPU information on ESXi host
esxcli hardware cpu list

# View CPU utilization
esxtop (press '1' for CPU view)

# Check VM CPU configuration
vim-cmd vmsvc/get.config <vmid> | grep -A 10 "cpu"

# View CPU scheduler information
esxcli system settings advanced list -o /Scheduler/

# Check NUMA topology
esxcli hardware numa node list
```

## Related Technologies

- [Physical CPU (pCPU)](/glossary/term/pcpu)
- [Virtual SMP](/glossary/term/virtual-smp)
- [ESXi](/glossary/term/esxi)
- [Resource Pools](/glossary/term/resource-pool)
- [DRS](/glossary/term/drs)