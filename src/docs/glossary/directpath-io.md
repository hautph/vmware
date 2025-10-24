---
term: DirectPath I/O
category: Advanced_Features
---

DirectPath I/O is a feature that allows virtual machines to directly access physical PCIe devices, bypassing the hypervisor for improved performance in latency-sensitive applications like network and storage adapters.

## Code Sample

```bash
# ESXi CLI command to check DirectPath I/O compatibility
esxcli hardware pci list | grep -i directpath
```

## Configuration

```ini
# DirectPath I/O configuration
[directpath]
enabled = true
device = 0000:03:00.0
passthrough = enabled
```