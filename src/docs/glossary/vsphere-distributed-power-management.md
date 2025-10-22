---
term: vSphere Distributed Power Management (DPM)
category: Core Architecture
---

vSphere Distributed Power Management (DPM) is a feature that automatically powers on and off ESXi hosts based on resource demand to optimize power consumption in the data center.

## Code Sample

```bash
# ESXi CLI command to check DPM status
esxcli system settings advanced list -o /Power/DPMEnable
```

## Configuration

```ini
# DPM configuration
[dpm]
enabled = true
automation_level = automated
threshold = medium
```