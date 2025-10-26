---
title: VM Migration
category: Availability_Migration
---

VM Migration refers to the process of moving virtual machines from one host, datastore, or environment to another. VMware provides several migration techniques to accommodate different requirements, including cold migration (offline), hot migration (live), and various specialized migration types.

## Overview

VM migration is a fundamental capability in virtualized environments that enables:
- Hardware maintenance without service interruption
- Load balancing across physical resources
- Resource optimization and consolidation
- Disaster recovery and business continuity
- Infrastructure upgrades and refreshes

## Types of VM Migration

### Cold Migration
Cold migration moves powered-off virtual machines between hosts or datastores. This technique:
- Requires the VM to be powered off during the migration
- Does not require special licensing
- Is simpler to configure and execute
- Is suitable for planned maintenance operations

### Hot Migration (Live Migration)
Hot migration moves powered-on virtual machines without any downtime. This technique:
- Maintains continuous availability of applications and services
- Requires vMotion or Enhanced vMotion licensing
- Preserves all network connections and active sessions
- Is essential for high-availability environments

### Enhanced Migration Types
- **vMotion**: Live migration between hosts
- **Storage vMotion**: Live migration between datastores
- **Cross vCenter vMotion**: Migration between different vCenter instances
- **Long Distance vMotion**: Migration across extended network distances

## Configuration Examples

### Cold Migration
```powershell
# Migrate powered-off VM using PowerCLI
Move-VM -VM "MyVM" -Destination (Get-VMHost "esxi02.domain.com")
```

### Hot Migration (vMotion)
```powershell
# Perform live migration using PowerCLI
Move-VM -VM "MyVM" -Destination (Get-VMHost "esxi02.domain.com") -RunAsync
```

### Storage vMotion
```powershell
# Migrate VM storage while powered on
Move-VM -VM "MyVM" -Datastore (Get-Datastore "Datastore2") -RunAsync
```

## Requirements

### Licensing
- **Basic vSphere**: Cold migration only
- **Enterprise License**: vMotion capabilities
- **Enterprise Plus**: Enhanced vMotion (simultaneous host and storage migration)

### Network
- Layer 2 connectivity between source and destination
- Dedicated vMotion network recommended
- Sufficient bandwidth for memory transfer

### Hardware
- Compatible CPU architectures
- Shared storage (for basic vMotion)
- Sufficient resources on destination

## Comparison Matrix

| Migration Type | VM State | Downtime | Licensing | Use Case |
|----------------|----------|----------|-----------|----------|
| Cold Migration | Powered Off | Full power-off period | Basic vSphere | Planned maintenance, storage operations |
| vMotion | Powered On | None | Enterprise | Live host migration, load balancing |
| Storage vMotion | Powered On | Minimal | Enterprise | Storage migration, maintenance |
| Enhanced vMotion | Powered On | None | Enterprise Plus | Simultaneous host and storage migration |

## Best Practices

1. **Pre-Migration Validation**: Verify compatibility and resource availability
2. **Network Optimization**: Use dedicated vMotion networks with adequate bandwidth
3. **Resource Planning**: Ensure sufficient capacity on destination hosts
4. **Performance Monitoring**: Monitor migration progress and system performance
5. **Maintenance Windows**: Schedule large migrations during low-usage periods
6. **Documentation**: Record migration procedures and results

## Related Technologies

- [vMotion](/glossary/term/vmotion.md)
- [Storage vMotion](/glossary/term/storage-vmotion.md)
- [Cross vCenter vMotion](/glossary/term/cross-vcenter-vmotion)
- [Long Distance vMotion](/glossary/term/long-distance-vmotion)