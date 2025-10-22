---
title: iSCSI (Internet Small Computer Systems Interface)
category: Storage
---

iSCSI (Internet Small Computer Systems Interface) is a storage networking protocol that allows SCSI commands to be sent over IP networks. In VMware vSphere environments, iSCSI is commonly used to connect ESXi hosts to storage arrays, providing block-level storage access over standard Ethernet networks.

## Overview

iSCSI features:
- Block-level storage protocol over IP networks
- Cost-effective alternative to Fibre Channel
- Standard Ethernet infrastructure utilization
- Support for storage consolidation and virtualization
- Integration with existing network management tools

## iSCSI Components

### iSCSI Initiator
- Client-side component that requests storage services
- Software or hardware component in ESXi hosts
- Handles iSCSI protocol communication
- Manages connections to iSCSI targets

### iSCSI Target
- Server-side component that provides storage services
- Storage array or appliance that offers storage volumes
- Listens for iSCSI connection requests
- Manages storage volume access control

### iSCSI Session
- Logical connection between initiator and target
- Established through TCP/IP transport
- Supports multiple connections for performance
- Maintains state information for data transfers

## Configuration Example

Configuring iSCSI on ESXi host:

```bash
# Enable software iSCSI adapter
esxcli iscsi software set -e true

# Set iSCSI adapter name
esxcli iscsi adapter set -A vmhba64 -n iqn.1998-01.com.vmware:esxi01-123456

# Configure iSCSI target portal
esxcli iscsi networkportal add -A vmhba64 -n vmk1
esxcli iscsi adapter param set -A vmhba64 -k DelayedAck -v false

# Add dynamic discovery target
esxcli iscsi adapter discovery rediscover -A vmhba64

# Add static target (if needed)
esxcli iscsi adapter target add -A vmhba64 -a 192.168.2.100 -p 3260
```

Using PowerCLI for iSCSI configuration:

```powershell
# Get iSCSI HBA information
Get-VMHostStorage -VMHost "esxi01.domain.com" -RescanAllHba

# Enable software iSCSI adapter
Get-VMHost | Get-VMHostHba -Type iScsi

# Configure iSCSI network binding
New-IScsiHbaTarget -IScsiHba vmhba64 -Address 192.168.2.100

# Rescan storage adapters
Get-VMHostStorage -VMHost "esxi01.domain.com" -RescanAllHba -RescanVmfs
```

## iSCSI vs Fibre Channel

| Feature | iSCSI | Fibre Channel |
|---------|-------|---------------|
| Network Infrastructure | Standard Ethernet | Dedicated FC fabric |
| Cost | Lower | Higher |
| Performance | Good | Excellent |
| Distance | Unlimited (IP) | Limited (50km) |
| Management | Standard IP tools | Specialized FC tools |
| Complexity | Moderate | High |

## Best Practices

1. **Network Design**: Use dedicated iSCSI networks for optimal performance
2. **Jumbo Frames**: Enable jumbo frames (MTU 9000) for better throughput
3. **Multipathing**: Implement iSCSI multipathing for redundancy
4. **Security**: Use CHAP authentication for secure connections
5. **Performance**: Optimize network settings for storage traffic
6. **Monitoring**: Monitor iSCSI performance and connection status

## Security Considerations

### Authentication
- CHAP (Challenge Handshake Authentication Protocol)
- Mutual CHAP for bidirectional authentication
- Certificate-based authentication for enhanced security

### Network Security
- VLAN isolation for iSCSI traffic
- Dedicated iSCSI networks
- Firewall rules for iSCSI ports (TCP 3260)
- Encryption (IPsec) for sensitive environments

## Performance Optimization

### Network Settings
- Jumbo frames (MTU 9000)
- Dedicated iSCSI VMkernel interfaces
- Multiple network paths for load balancing
- Proper NIC teaming configuration

### Storage Settings
- Optimal queue depth settings
- Proper LUN alignment
- Storage array optimization
- Regular performance monitoring

## Troubleshooting Commands

```bash
# Check iSCSI adapter status
esxcli iscsi adapter list

# View iSCSI sessions
esxcli iscsi session list

# Check iSCSI targets
esxcli iscsi adapter target list -A vmhba64

# View network portal configuration
esxcli iscsi networkportal list

# Rescan iSCSI storage
esxcli storage core adapter rescan -A vmhba64
```

## Related Technologies

- [Storage vMotion](/glossary/storage-vmotion)
- [VMFS](/glossary/vmfs)
- [vSAN](/glossary/vsan)
- [Fibre Channel](/glossary/fibre-channel)
- [Storage DRS](/glossary/storage-drs)