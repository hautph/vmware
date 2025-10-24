---
title: vMotion Technologies
category: Availability & Migration
term: vMotion
category: Availability_Migration
---

vMotion is VMware's flagship live migration technology that enables the movement of powered-on virtual machines between different ESXi hosts, datastores, or vCenter Server instances without any downtime. This comprehensive technology suite includes several specialized variants to address different migration scenarios.

## Overview

vMotion technologies provide seamless workload mobility across VMware environments, enabling:
- Hardware maintenance without service interruption
- Dynamic load balancing across physical resources
- Resource optimization and consolidation
- Disaster avoidance and business continuity
- Infrastructure upgrades and refreshes

## Types of vMotion Technologies

### Standard vMotion
Moves powered-on virtual machines between ESXi hosts within the same vCenter Server instance.
- Zero downtime for applications and users
- Maintains all network connections and active sessions
- Requires compatible CPU architectures between hosts
- Essential for high-availability environments

### Storage vMotion
Moves virtual machine disks from one datastore to another while the VM remains powered on.
- Enables storage maintenance and optimization
- Facilitates storage tiering and performance improvements
- Supports different storage types and configurations
- Can be combined with standard vMotion for enhanced flexibility

### Cross vCenter vMotion
Enables live migration of virtual machines between ESXi hosts managed by different vCenter Server instances.
- Provides flexibility for workload mobility across management domains
- Supports data center consolidation and migration projects
- Enables proactive disaster avoidance between sites
- Simplifies management of previously isolated vCenter environments

### Long Distance vMotion
Extends vMotion capabilities to geographically dispersed data centers.
- Enables workload mobility between distant locations
- Supports disaster avoidance and data center relocation
- Requires specific network configurations for latency management
- Facilitates business continuity across multiple sites

### Enhanced vMotion Compatibility (EVC)
Ensures vMotion compatibility between hosts with different CPU generations.
- Masks newer CPU features to maintain compatibility
- Enables vMotion between heterogeneous CPU architectures
- Supports cluster flexibility and hardware refresh cycles
- Maintains performance while ensuring compatibility

## Configuration Examples

### Enabling Standard vMotion
```powershell
# Enable vMotion on a VM
Get-VM "MyVM" | Move-VM -Destination "Host02"

# Configure vMotion network interface
Get-VMHostNetworkAdapter -VMHost "esxi01.domain.com" -Name "vmk0" | Set-VMHostNetworkAdapter -VMotionEnabled $true
```

### Storage vMotion Operations
```powershell
# Perform Storage vMotion
Get-VM "MyVM" | Move-VM -Datastore "NewDatastore" -DiskStorageFormat Thin

# Migrate both host and storage simultaneously
Get-VM "MyVM" | Move-VM -Destination "Host03" -Datastore "Datastore02" -RunAsync
```

### Cross vCenter vMotion
```powershell
# Cross vCenter vMotion (requires linked mode)
Move-VM -VM "MyVM" -Destination (Get-VMHost "esxi-remote.domain.com" -Server "vcenter-remote.domain.com")
```

## vSphere 8 Enhancements

### vMotion-aware DRS
In vSphere 8, Distributed Resource Scheduler (DRS) has become "vMotion-aware":
- Considers the performance impact of vMotion operations
- Makes more intelligent placement decisions
- Prevents resource contention during migrations
- Improves overall cluster performance

### Enhanced Performance
- Reduced stun time during migrations
- Increased concurrency for simultaneous operations
- Improved memory transfer efficiency
- Better handling of large memory footprints

## Requirements

### Licensing
- **vSphere Enterprise**: Standard vMotion capabilities
- **vSphere Enterprise Plus**: Enhanced vMotion (Storage vMotion, Cross vCenter vMotion)

### Network
- Layer 2 connectivity between source and destination hosts
- Dedicated vMotion network recommended for performance
- Sufficient bandwidth for memory transfer (typically 1 Gbps or higher)
- Proper firewall configuration for vMotion ports

### Hardware
- Compatible CPU architectures (or EVC enabled)
- Shared storage for standard vMotion (unless using enhanced capabilities)
- Sufficient resources on destination hosts

## Best Practices

1. **Network Design**: Implement dedicated vMotion networks with adequate bandwidth
2. **Resource Management**: Ensure sufficient capacity on destination hosts
3. **Performance Monitoring**: Monitor migration progress and system performance
4. **Security**: Secure vMotion networks with proper firewall rules
5. **Scheduling**: Perform large migrations during low-traffic periods
6. **Testing**: Regularly test migration procedures in non-production environments

## Related Technologies

- [VM Migration](/glossary/term/vm-migration)
- [DRS](/glossary/term/drs)
- [High Availability](/glossary/term/vsphere-high-availability)
- [Fault Tolerance](/glossary/term/fault-tolerance)