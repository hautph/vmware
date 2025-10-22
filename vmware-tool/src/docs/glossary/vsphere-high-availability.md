---
term: vSphere High Availability (HA)
category: Availability & Migration
---

vSphere High Availability (HA) is a feature that provides automatic restart of virtual machines on alternate ESXi hosts in the event of host failures, ensuring business continuity and minimizing downtime.

## Code Sample

```powershell
# PowerCLI to enable HA on a cluster
Get-Cluster "Cluster01" | Set-Cluster -HAEnabled $true -HAAdmissionControlEnabled $true
```

## Configuration

```ini
# HA configuration
[ha]
enabled = true
admission_control = true
host_monitoring = enabled
```