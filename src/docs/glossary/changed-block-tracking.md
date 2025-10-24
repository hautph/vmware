---
term: Changed Block Tracking
category: Backup_Disaster_Recovery
---

Changed Block Tracking (CBT) is a VMware feature that tracks and records changes to virtual machine disk blocks, enabling incremental backups and replication by only transferring the blocks that have changed since the last backup or replication cycle.

## Code Sample

```bash
# ESXi CLI command to check CBT status
vmkfstools -q /vmfs/volumes/datastore1/MyVM/MyVM.vmdk
```

## Configuration

```ini
# CBT configuration
[cbt]
enabled = true
snapshot_requirement = true
```