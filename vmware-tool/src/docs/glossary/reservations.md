---
term: Reservations
category: Advanced Features
---

Reservations guarantee a specified amount of CPU or memory resources to a virtual machine or resource pool, ensuring that the reserved resources are always available regardless of contention from other virtual machines.

## Code Sample

```powershell
# PowerCLI to set resource reservations for a VM
Get-VM "CriticalVM" | Get-VMResourceConfiguration | Set-VMResourceConfiguration -CpuReservationMHz 2000 -MemReservationMB 4096
```

## Configuration

```ini
# Reservations configuration
[reservations]
cpu_reservation_mhz = 2000
memory_reservation_mb = 4096
expandable = false
```