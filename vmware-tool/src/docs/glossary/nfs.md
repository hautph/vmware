---
title: NFS (Network File System)
category: Storage
---

NFS (Network File System) is a distributed file system protocol that allows remote hosts to mount file systems over a network and interact with them as if they were mounted locally. In VMware vSphere environments, NFS is commonly used as a storage protocol to provide shared storage for virtual machines, offering simplified storage management and cost-effective storage solutions.

## Overview

NFS features:
- File-level storage protocol over IP networks
- Simplified storage management compared to block storage
- Native support in ESXi without additional licensing
- Support for thin provisioning and storage optimization
- Integration with existing network infrastructure

## NFS Versions in vSphere

### NFS v3
- Traditional NFS implementation
- Asynchronous writes for performance
- Widely supported by storage arrays
- Basic file locking mechanisms

### NFS v4.1
- Enhanced performance with pNFS (Parallel NFS)
- Session-based connections for better state management
- Improved security with Kerberos authentication
- Better support for multipathing and load balancing

## Configuration Example

Mounting NFS datastore on ESXi host:

```bash
# Create NFS datastore
esxcli storage nfs add -H 192.168.2.100 -s /nfs/volumes/vmdata -v NFS-Datastore

# List NFS datastores
esxcli storage nfs list

# Update NFS datastore
esxcli storage nfs change -H 192.168.2.101 -s /nfs/volumes/vmdata -v NFS-Datastore

# Remove NFS datastore
esxcli storage nfs remove -v NFS-Datastore
```

Using PowerCLI for NFS configuration:

```powershell
# Create NFS datastore
New-Datastore -Nfs -VMHost "esxi01.domain.com" -Name "NFS-Datastore" -Path "/nfs/volumes/vmdata" -NfsHost "192.168.2.100"

# Get NFS datastore information
Get-Datastore -Name "NFS-Datastore"

# Set NFS advanced settings
Get-AdvancedSetting -Entity (Get-VMHost "esxi01.domain.com") -Name "NFS.MaxVolumes" | Set-AdvancedSetting -Value 64

# Rescan NFS storage
Get-VMHostStorage -VMHost "esxi01.domain.com" -RescanAllHba -RescanVmfs
```

## NFS vs VMFS

| Feature | NFS | VMFS |
|---------|-----|------|
| Storage Type | File-based | Block-based |
| Protocol | Network File System | SAN protocols (iSCSI, FC) |
| Locking | File-level locking | Cluster-level locking |
| Snapshots | Array-based | VMFS-based |
| Thin Provisioning | Native support | Native support |
| Performance | Good for mixed workloads | Excellent for sequential I/O |

## Best Practices

1. **Network Design**: Use dedicated storage networks for NFS traffic
2. **Performance**: Enable jumbo frames (MTU 9000) for better throughput
3. **Security**: Implement proper firewall rules and access controls
4. **Mount Points**: Use descriptive mount point names for organization
5. **Monitoring**: Monitor NFS performance and latency metrics
6. **Backup**: Implement NFS-aware backup solutions

## Security Considerations

### Authentication
- IP-based access control (export policies)
- Kerberos authentication for NFS v4.1
- Secure RPC (Remote Procedure Call) encryption
- Proper user and group mapping

### Network Security
- VLAN isolation for NFS traffic
- Dedicated NFS networks
- Firewall rules for NFS ports (TCP 2049)
- Network encryption for sensitive environments

## Performance Optimization

### Network Settings
- Jumbo frames (MTU 9000)
- Multiple network paths for load balancing
- Proper NIC teaming configuration
- Network bandwidth planning

### Storage Settings
- NFS server tuning (read/write cache)
- Proper export configuration
- Storage array optimization
- Regular performance monitoring

## Troubleshooting Commands

```bash
# Check NFS mounts
esxcli storage nfs list

# View NFS client statistics
esxcli storage nfs stats get

# Check NFS server connectivity
vmkping -I vmk1 192.168.2.100

# Rescan NFS storage
esxcli storage filesystem rescan

# View NFS advanced settings
esxcli system settings advanced list -o /NFS
```

## Use Cases

1. **Virtual Desktop Infrastructure (VDI)**: Efficient storage for linked clones
2. **Development and Test**: Simplified storage management
3. **File Server Consolidation**: Centralized file storage
4. **Backup and Archival**: Cost-effective long-term storage
5. **Disaster Recovery**: Replicated storage for DR scenarios

## Related Technologies

- [VMFS (Virtual Machine File System)](/glossary/vmfs)
- [vSAN (Virtual SAN)](/glossary/vsan)
- [iSCSI](/glossary/iscsi)
- [Storage vMotion](/glossary/storage-vmotion)
- [Storage DRS](/glossary/storage-drs)