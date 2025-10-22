---
term: vVols (Virtual Volumes)
category: Storage
---

vVols (Virtual Volumes) is a storage integration and management solution that provides array-based data services at the virtual disk level, enabling fine-grained storage policy-based management.

## Code Sample

```powershell
# PowerCLI to get vVol information
Get-VVolDatastore | Select Name, FileSystemVersion, CapacityGB
```

## Configuration

```ini
# vVols configuration
[vvols]
enabled = true
storage_policy = performance-optimized
replication_group = rg01
```