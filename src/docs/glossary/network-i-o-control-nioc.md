---
title: Network I/O Control (NIOC)
category: Networking
---

Network I/O Control (NIOC) is a feature in VMware vSphere that provides traffic shaping and resource allocation for network I/O resources. It allows administrators to prioritize and allocate bandwidth to different types of network traffic, ensuring critical applications receive the necessary network resources.

## Overview

NIOC enables organizations to:
- Allocate bandwidth to different network resource pools
- Prioritize traffic based on business requirements
- Monitor network utilization and performance
- Ensure quality of service for mission-critical applications

## Key Features

1. **Traffic Shaping**: Controls the amount of bandwidth allocated to different types of network traffic
2. **Resource Pools**: Creates pools for different traffic types (VM traffic, vSphere replication, IP storage, etc.)
3. **Priority Assignment**: Assigns priority levels (High, Normal, Low) to different traffic types
4. **Monitoring**: Provides real-time statistics on network utilization

## Configuration Example

To configure NIOC on a distributed switch:

```powershell
# Enable NIOC on vSphere Distributed Switch
Get-VDSwitch "VDS-Production" | Set-VDSwitch -NetworkResourceControlVersion "version3"

# Configure resource allocation for VM traffic
Get-NetworkResourcePool "Management" | Set-NetworkResourcePool -SharesLevel "High" -Limit 1000

# Set reservation for vSphere Replication traffic
Get-NetworkResourcePool "VDP" | Set-NetworkResourcePool -Reservation 100
```

## Best Practices

1. Enable NIOC only when necessary, as it adds overhead
2. Monitor network utilization before configuring resource pools
3. Set appropriate limits and reservations based on actual traffic patterns
4. Regularly review and adjust resource allocations based on changing requirements

## Related Commands

```bash
# Check NIOC status
esxcli network nic list

# View network resource pool information
esxcli network vswitch dvs vmware list

# Monitor network utilization
esxtop
```