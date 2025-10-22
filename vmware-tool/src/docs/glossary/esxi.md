---
term: ESXi
category: Hypervisor
---

VMware ESXi (formerly ESX) is an enterprise-class, type-1 hypervisor developed by VMware for deploying and serving virtual computers.

## Code Sample

```bash
# Check ESXi host information via CLI
esxcli system hostname get
esxcli hardware cpu list
```

## Configuration

```ini
# ESXi host configuration
hostname = esxi01.example.com
datastore = datastore1
network = VM Network
```

## vSphere 8 Security Enhancements

*   **execInstalledOnly:** This option is now enabled by default to enhance security by preventing the execution of unauthorized binaries.
*   **TPM 1.2 Deprecation:** Support for TPM 1.2 is deprecated in favor of TPM 2.0.