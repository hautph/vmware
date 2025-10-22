---
title: Virtual Machine
category: Core Architecture
---

A Virtual Machine (VM) is a software-based emulation of a physical computer that runs an operating system and applications just like a physical computer. In VMware vSphere environments, virtual machines are the fundamental building blocks that enable server consolidation, resource optimization, and flexible infrastructure management.

## Overview

Virtual Machine characteristics:
- Complete software emulation of physical hardware
- Runs guest operating systems and applications
- Isolated from other virtual machines on the same host
- Shares physical resources through the hypervisor
- Provides flexibility in resource allocation and management

## Virtual Machine Components

### Virtual Hardware
- **Virtual CPU (vCPU)**: Emulated processor cores allocated to the VM
- **Virtual Memory (vRAM)**: Memory allocated from host physical RAM
- **Virtual Disk (VMDK)**: Virtual hard disk files stored on datastore
- **Virtual Network Adapter**: Emulated network interface for connectivity
- **Virtual SCSI Controller**: Interface for virtual disk connectivity
- **Virtual CD/DVD Drive**: Optical drive for installation media

### Configuration Files
- **.vmx file**: Primary configuration file containing VM settings
- **.vmdk files**: Virtual disk descriptor and data files
- **.nvram file**: BIOS/UEFI settings and boot information
- **.vmxf file**: Additional configuration for teaming
- **.vmsd file**: Snapshot descriptor file

## Virtual Machine Lifecycle

### Creation
1. Define VM hardware specifications
2. Select guest operating system type
3. Allocate CPU, memory, and storage resources
4. Configure network and other virtual devices
5. Install guest operating system

### Operation
1. Power on VM through vSphere Client
2. Guest OS boots and runs applications
3. Resources dynamically allocated by hypervisor
4. Monitoring and management through vCenter
5. Performance optimization and tuning

### Management
1. Snapshots for backup and testing
2. Cloning for rapid deployment
3. Migration between hosts (vMotion)
4. Resource adjustments based on demand
5. Updates and patching

## Configuration Example

Creating and managing virtual machines:

```powershell
# Create new virtual machine
New-VM -Name "WebServer01" -VMHost "esxi01.domain.com" -Datastore "Datastore1" -DiskGB 50 -MemoryGB 4 -NumCpu 2 -GuestId "windows9Server64Guest"

# Configure VM hardware
Get-VM "WebServer01" | New-HardDisk -CapacityGB 100 -StorageFormat Thin
Get-VM "WebServer01" | New-NetworkAdapter -NetworkName "VM Network" -StartConnected

# Manage VM power state
Start-VM -VM "WebServer01"
Stop-VM -VM "WebServer01" -Confirm:$false
Restart-VM -VM "WebServer01"

# Modify VM resources
Get-VM "WebServer01" | Set-VM -MemoryGB 8 -NumCpu 4
```

ESXi CLI management:

```bash
# List all virtual machines
vim-cmd vmsvc/getallvms

# Get VM information
vim-cmd vmsvc/get.config 123

# Power operations
vim-cmd vmsvc/power.on 123
vim-cmd vmsvc/power.off 123
vim-cmd vmsvc/power.shutdown 123

# View VM resource usage
esxtop
```

## Virtual Machine States

### Powered On
- VM is running and consuming resources
- Guest OS is active and processing workloads
- Network and storage connectivity available

### Powered Off
- VM is not consuming CPU or memory resources
- Virtual disks remain stored on datastore
- Configuration preserved for next power-on

### Suspended
- VM state is saved to disk
- Quick resume capability
- Memory contents preserved in snapshot

### Snapshot
- Point-in-time copy of VM state
- Used for backup, testing, and rollback
- Multiple snapshots can be created

## Best Practices

1. **Resource Allocation**: Right-size VM resources based on workload requirements
2. **Performance Monitoring**: Regularly monitor VM performance and resource usage
3. **Security**: Keep guest OS and applications updated with latest patches
4. **Backup**: Implement regular backup and snapshot strategies
5. **Documentation**: Maintain detailed documentation of VM configurations
6. **Lifecycle Management**: Implement proper VM provisioning and decommissioning procedures

## Performance Optimization

### CPU Optimization
- Assign appropriate number of vCPUs
- Use CPU reservations and limits when needed
- Monitor CPU ready time and contention
- Consider CPU affinity settings

### Memory Optimization
- Allocate sufficient memory for guest OS
- Enable memory ballooning and compression
- Monitor memory usage and swapping
- Use memory reservations for critical VMs

### Storage Optimization
- Use appropriate disk formats (thin, thick, eager zeroed)
- Enable storage I/O control for performance
- Implement storage policies for tiered storage
- Monitor storage latency and throughput

## Troubleshooting Commands

```bash
# Check VM status
vim-cmd vmsvc/getallvms | grep "WebServer01"

# View VM configuration
vim-cmd vmsvc/get.config 123

# Check VM resource usage
esxtop -s /path/to/vm/stats.csv

# View VM logs
tail -f /vmfs/volumes/datastore1/WebServer01/WebServer01.log

# Monitor network connectivity
vmkping -I vmk0 8.8.8.8
```

## Related Technologies

- [vSphere](/glossary/vsphere)
- [ESXi](/glossary/esxi)
- [vCenter Server](/glossary/vcenter-server)
- [Snapshot](/glossary/snapshot)
- [vMotion](/glossary/vmotion)
- [Resource Pool](/glossary/resource-pool)