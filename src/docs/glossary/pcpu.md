---
term: Physical CPU (pCPU)
category: Resource_Management
---

A Physical CPU (pCPU) is an actual processor core or thread on a physical server's CPU package. In virtualized environments, pCPUs are the real computing resources that the hypervisor uses to execute the instructions of virtual machines. The hypervisor schedules and allocates vCPUs (virtual CPUs) from the available pool of pCPUs.

## Overview

Physical CPUs provide:
- Actual computational processing power
- Hardware execution of instructions
- Foundation for virtual CPU allocation
- Performance baseline for virtualized workloads

## Key Features

### Hardware Characteristics
- **Core Count**: Number of physical processor cores
- **Thread Count**: Number of threads per core (Hyper-Threading/SMT)
- **Clock Speed**: Processing frequency of the CPU
- **Architecture**: CPU instruction set architecture (x86, ARM, etc.)

### Resource Management
- **CPU Pool**: Total available pCPUs in a host or cluster
- **Allocation**: Assignment of pCPUs to vCPUs
- **Scheduling**: Time-slicing of vCPUs on pCPUs
- **Overcommitment**: Ratio of vCPUs to pCPUs

### Performance Metrics
- **Utilization**: Percentage of pCPU usage
- **Ready Time**: Time vCPUs wait for pCPU availability
- **Co-stop**: Time lost due to co-scheduling requirements
- **Load Balancing**: Distribution of workload across pCPUs

## Architecture

### CPU Topology
- **Socket**: Physical CPU package installed in the server
- **Core**: Individual processing unit within a CPU package
- **Thread**: Logical processing unit (Hyper-Threading/SMT)
- **NUMA Node**: Memory and CPU locality domains

### Virtualization Layer
- **Hypervisor**: Software layer that manages pCPU allocation
- **VMkernel**: ESXi's kernel that handles CPU scheduling
- **CPU Scheduler**: Component that assigns vCPUs to pCPUs
- **Resource Pools**: Logical groupings for CPU resource management

### Monitoring and Optimization
- **Performance Counters**: Hardware-level performance metrics
- **Thermal Management**: CPU temperature and power management
- **Frequency Scaling**: Dynamic adjustment of CPU clock speeds
- **Power States**: Various power consumption levels

## vSphere 8 Enhancements

### Performance Improvements
- **Enhanced Scheduler**: Better pCPU allocation algorithms
- **NUMA Optimization**: Improved NUMA-aware scheduling
- **Cache Awareness**: Better utilization of CPU cache hierarchies
- **Instruction Set Support**: Enhanced support for modern CPU features

### Management Features
- **Advanced Monitoring**: Better visibility into pCPU utilization
- **Improved Load Balancing**: More efficient workload distribution
- **Enhanced Affinity**: Better CPU affinity controls
- **Streamlined Reporting**: Better pCPU resource reporting

### Security Features
- **Hardware Security**: Better integration with CPU security features
- **Isolation Improvements**: Enhanced VM isolation at the pCPU level
- **Monitoring Enhancements**: Better detection of CPU-level security issues
- **Compliance Features**: Enhanced compliance monitoring

## Best Practices

1. **Capacity Planning**: Properly size pCPU resources based on workload requirements
2. **Avoid Overcommitment**: Monitor and control vCPU to pCPU ratios
3. **NUMA Awareness**: Consider NUMA topology when planning CPU resources
4. **Monitoring**: Regularly monitor pCPU utilization and performance metrics
5. **Load Balancing**: Ensure proper distribution of workloads across pCPUs
6. **Thermal Management**: Monitor CPU temperatures and cooling

## Troubleshooting Commands

```bash
# Check physical CPU information
esxcli hardware cpu list

# View CPU topology
esxcli hardware cpu global get

# Check CPU utilization
esxtop (press '1' for CPU view)

# View NUMA topology
esxcli hardware numa node list

# Check CPU scheduler information
esxcli system settings advanced list -o /Scheduler/
```

## Related Technologies

- [Virtual CPU (vCPU)](/glossary/term/vcpu.md)
- [Virtual SMP](/glossary/term/virtual-smp.md)
- [ESXi](/glossary/term/esxi.md)
- [NUMA](/glossary/term/numa)
- [CPU Scheduling](/glossary/term/cpu-scheduling)