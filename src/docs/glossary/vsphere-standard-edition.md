---
term: vSphere Standard Edition
category: Licensing & Editions
---

vSphere Standard Edition is the entry-level licensing tier of VMware vSphere that provides core virtualization features including vMotion, Storage vMotion, and High Availability, suitable for small to medium-sized environments.

## Code Sample

```bash
# ESXi CLI command to check license edition
esxcli system license get | grep -i edition
```

## Configuration

```ini
# vSphere Standard Edition configuration
[license]
edition = standard
cpu_count = 2
features = basic
```