---
term: Retreat Mode
category: High_Availability
---

Retreat Mode is a protective state in VMware vSphere High Availability (HA) that prevents a host from participating in HA activities when it detects potential issues that could affect cluster stability. This mode helps maintain cluster integrity by isolating problematic hosts.

## Code Sample

```bash
# ESXi CLI command to check retreat mode status
esxcli system settings advanced list -o /HA/RetreatMode
```

## Configuration

```ini
# Retreat mode configuration
[retreat-mode]
enabled = true
detection_threshold = medium
isolation_response = poweroff
```