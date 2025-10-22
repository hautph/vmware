---
term: VM Hardware Version 21
category: Core Architecture
---

VM Hardware Version 21 is the latest virtual machine hardware version that provides support for the newest features and capabilities in VMware vSphere, including enhanced security and performance optimizations.

## Code Sample

```powershell
# PowerCLI to upgrade VM hardware version
Get-VM "MyVM" | Set-VM -HardwareVersion v21 -Confirm:$false
```

## Configuration

```ini
# VM hardware version configuration
[vm]
hardware_version = 21
compatibility = ESXi_8.0
features = latest
```