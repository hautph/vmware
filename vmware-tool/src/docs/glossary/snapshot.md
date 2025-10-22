---
term: Snapshot
category: Backup & Disaster Recovery
---

Snapshot is a point-in-time copy of a virtual machine's disk state that captures the VM's data and configuration at a specific moment, enabling quick recovery to that state for backup, testing, or rollback purposes.

## Code Sample

```powershell
# PowerCLI to create a VM snapshot
Get-VM "MyVM" | New-Snapshot -Name "Before-Update" -Description "Snapshot before applying updates" -Memory
```

## Configuration

```ini
# Snapshot configuration
[snapshot]
consolidate = true
quiesce = true
memory = true
```