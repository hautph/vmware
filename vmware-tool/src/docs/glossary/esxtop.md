---
term: esxtop
category: Monitoring & Management
---

esxtop is a command-line performance monitoring tool for VMware ESXi that provides real-time statistics on CPU, memory, disk, and network usage, helping administrators troubleshoot performance issues.

## Code Sample

```bash
# ESXi command to run esxtop in batch mode
esxtop -b -n 10 -d 5 > performance.log
```

## Configuration

```ini
# esxtop configuration
[esxtop]
mode = interactive
delay = 5
iterations = 0
```