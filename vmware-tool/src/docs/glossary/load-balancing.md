---
title: Load Balancing
category: Networking
---

Load Balancing in VMware vSphere refers to the distribution of network traffic across multiple uplinks to optimize performance, provide redundancy, and ensure high availability. This feature is primarily implemented through NIC teaming policies on vSphere Standard Switches (VSS) and vSphere Distributed Switches (VDS).

## Overview

Load balancing determines how network traffic is distributed across multiple physical network adapters in a team. VMware offers several load balancing algorithms that can be configured based on network requirements and infrastructure design.

## Load Balancing Algorithms

### 1. Route based on originating virtual port ID
- Uses the virtual machine's virtual port ID to determine uplink selection
- Default option for vSphere Standard Switches
- Simple and efficient for most environments

### 2. Route based on source MAC hash
- Uses the source MAC address to determine uplink selection
- Good for environments with varying numbers of virtual machines

### 3. Route based on IP hash
- Uses a hash of source and destination IP addresses
- Requires physical switch configuration (EtherChannel/LACP)
- Provides excellent load distribution

### 4. Route based on source and destination IP hash (VDS only)
- More sophisticated IP hash algorithm available only on VDS
- Considers both source and destination IP addresses

### 5. Use explicit failover order
- Manually specifies active and standby uplinks
- Traffic uses only active uplinks unless failure occurs

## Configuration Example

To configure load balancing on a distributed port group:

```powershell
# Set load balancing policy to IP hash
Get-VDPortgroup "VM Network" | Get-VDUplinkPortgroup | Set-VDUplinkPortgroup -LoadBalancingAlgorithm "LoadBalanceIP"

# Configure failover policy
$failoverPolicy = New-Object VMware.Vim.DVSFailureCriteria
$failoverPolicy.checkSpeed = "minimum"
$failoverPolicy.speed = 1000

Get-VDPortgroup "VM Network" | Set-VDPortgroup -FailbackEnabled $true -FailureCriteria $failoverPolicy
```

## Best Practices

1. Match the load balancing algorithm with physical switch configuration
2. Test different algorithms to determine optimal performance for your environment
3. Consider application requirements when selecting load balancing policies
4. Document load balancing configurations for troubleshooting purposes

## Related Technologies

- [NIC Teaming](/glossary/nic-teaming)
- [LACP](/glossary/lacp)
- [EtherChannel](/glossary/etherchannel)
- [vSphere Distributed Switch (VDS)](/glossary/vsphere-distributed-switch-vds)