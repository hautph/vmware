---
term: Site Recovery Manager (SRM)
category: Backup & Disaster Recovery
---

Site Recovery Manager (SRM) is VMware's disaster recovery orchestration solution that automates the failover and failback of virtual machines between primary and recovery sites, providing non-disruptive testing and recovery workflows.

## Code Sample

```powershell
# PowerCLI to initiate SRM failover
Start-SRMFailover -RecoveryPlan "Production-Recovery-Plan" -Planned
```

## Configuration

```ini
# SRM configuration
[srm]
primary_site = datacenter-a
recovery_site = datacenter-b
rto_minutes = 60
rpo_minutes = 15
```