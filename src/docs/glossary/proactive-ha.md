---
term: Proactive HA
category: Availability & Migration
---

Proactive HA is a vSphere feature that works with hardware vendors to monitor the health of ESXi hosts and proactively evacuate virtual machines before a hardware failure occurs, reducing unplanned downtime.

## Code Sample

```bash
# ESXi CLI command to check Proactive HA status
esxcli system settings advanced list -o /Misc/ProactiveHAEnabled
```

## Configuration

```ini
# Proactive HA configuration
[proactive-ha]
enabled = true
providers = dell-openmanage, hp-ilo
remediation = automated
```