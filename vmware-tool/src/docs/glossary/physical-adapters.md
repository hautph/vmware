---
title: Physical Adapters
category: Networking
---

Physical Adapters in VMware vSphere refer to the actual hardware network interface cards (NICs) installed in ESXi hosts that provide the physical connection to the network infrastructure. These adapters are the foundation of all network connectivity in a virtualized environment, enabling communication between virtual machines and external networks.

## Overview

Physical adapters are:
- Hardware network interface cards installed in ESXi hosts
- The physical layer of VMware networking
- Required for all network communication in vSphere
- Identified as vmnics in the ESXi environment

## Types of Physical Adapters

### Ethernet Network Adapters
- Standard Gigabit Ethernet adapters (1 GbE)
- 10 Gigabit Ethernet adapters (10 GbE)
- 25/40/100 Gigabit Ethernet adapters
- Used for general network connectivity

### Converged Network Adapters (CNAs)
- Combine Ethernet and Fibre Channel functionality
- Support both network and storage traffic
- Reduce the number of physical adapters required
- Examples: Emulex, QLogic, Broadcom CNAs

### Fibre Channel Adapters
- Dedicated storage networking adapters
- Connect to Fibre Channel storage arrays
- Provide high-performance storage connectivity

## Configuration Example

Managing physical adapters:

```bash
# List all physical adapters
esxcli network nic list

# Get detailed information about physical adapters
esxcli network nic get -n vmnic0

# Check adapter firmware versions
esxcli network nic get -n vmnic0 | grep "Firmware"

# View adapter statistics
esxcli network nic stats get -n vmnic0
```

Using PowerCLI to manage physical adapters:

```powershell
# Get all physical network adapters
Get-VMHostNetworkAdapter -Physical

# Get specific adapter information
Get-VMHostNetworkAdapter -Physical -Name "vmnic0" | Select Name, LinkSpeed, FullDuplex

# Check adapter status
Get-VMHostNetworkAdapter -Physical | Where-Object {$_.BitRatePerSec -eq $null}

# View adapter driver information
Get-VMHostNetworkAdapter -Physical | Select Name, Driver
```

## Adapter Configuration Considerations

### Speed and Duplex
- Ensure consistent speed settings between host and switch
- Use auto-negotiation when possible
- Verify full duplex operation

### Bandwidth Planning
- Plan for adequate bandwidth for all traffic types
- Consider peak usage scenarios
- Account for future growth

### Redundancy
- Install multiple adapters for fault tolerance
- Distribute adapters across different PCIe slots
- Connect to separate physical switches when possible

## Best Practices

1. **Compatibility**: Use adapters from the VMware Hardware Compatibility List (HCL)
2. **Firmware Updates**: Keep adapter firmware updated for optimal performance
3. **Driver Updates**: Ensure latest drivers are installed
4. **Redundancy**: Implement redundant adapters for high availability
5. **Monitoring**: Regularly monitor adapter performance and health
6. **Documentation**: Document adapter types, configurations, and cabling

## Troubleshooting Commands

```bash
# Check physical adapter status
esxcli network nic list

# Verify link status and speed
esxcli network nic get -n vmnic0 | grep -E "(Link|Speed)"

# Check for adapter errors
esxcli network nic stats get -n vmnic0 | grep -E "(error|drop|discard)"

# View adapter driver information
esxcli network nic get -n vmnic0 | grep "Driver"
```

## Related Technologies

- [vmnic](/glossary/vmnic)
- [Uplinks](/glossary/uplinks)
- [vSphere Standard Switch (VSS)](/glossary/vsphere-standard-switch-vss)
- [vSphere Distributed Switch (VDS)](/glossary/vsphere-distributed-switch-vds)
- [NIC Teaming](/glossary/nic-teaming)