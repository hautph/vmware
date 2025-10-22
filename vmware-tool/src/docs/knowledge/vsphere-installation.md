---
title: VMware vSphere Installation Guide
category: Installation
excerpt: Step-by-step guide to installing VMware vSphere 8.0
---

# VMware vSphere 8.0 Installation Guide

## Prerequisites

Before installing VMware vSphere 8.0, ensure you meet the following requirements:

- Hardware that meets the minimum specifications
- Valid licenses for vSphere
- Network connectivity for management

## Installation Steps

1. Download the vSphere ISO from VMware Customer Connect
2. Boot from the ISO on your physical server
3. Follow the installation wizard prompts
4. Configure network settings during installation
5. Set the root password

```bash
# Example ESXi installation command
esxcli system settings advanced set -o /UserVars/HostClientCEIPOptIn -i 0
```

## Post-Installation Configuration

After installation, configure:
- NTP settings for time synchronization
- DNS and routing
- License assignment
- User accounts and permissions

For more information, refer to the [official documentation](https://docs.vmware.com/en/VMware-vSphere/8.0/vsphere-installation-guide/GUID-0A2B8D0E-B0F2-4D0C-8F0B-0A0B0B0B0B0B.html)