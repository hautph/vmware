---
term: Storage DRS
category: Storage
---

Storage DRS (Distributed Resource Scheduler) is a feature that automatically load balances virtual machine disks across datastores based on space and I/O resource utilization.

## Code Sample

```powershell
# PowerCLI to enable Storage DRS
Get-DatastoreCluster "StorageCluster" | Set-DatastoreCluster -StorageDrsAutomationLevel FullyAutomated
```

## Configuration

```ini
# Storage DRS configuration
[storage-drs]
enabled = true
automation_level = fully_automated
space_utilization_threshold = 80
io_latency_threshold = 15
```