---
title: Optimizing VM Performance
category: Performance
excerpt: Best practices for optimizing virtual machine performance
---

# Optimizing Virtual Machine Performance

## CPU Optimization

To optimize CPU performance:

- Assign appropriate CPU reservations and limits
- Enable CPU hot-add for dynamic scaling
- Monitor CPU ready time and %RDY values

```powershell
# PowerCLI script to check CPU ready time
Get-VM | Select Name, @{N="CPUReady";E={[Math]::Round((($_ | Get-Stat -Stat cpu.ready.summation -Realtime -MaxSamples 1).Value/20000)*100,2)}}
```

## Memory Optimization

Memory optimization techniques include:

- Configure memory reservations for critical VMs
- Enable memory ballooning only when necessary
- Use transparent page sharing

## Storage Optimization

Storage performance tips:

- Use SSD storage for critical workloads
- Enable storage I/O control
- Implement proper storage policies

```bash
# ESXi command to check storage latency
esxtop
# Press 'd' to switch to disk adapter view
```