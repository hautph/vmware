---
term: VMFS 8
category: Storage
---

VMFS 8 (Virtual Machine File System 8) is the latest version of VMware's clustered file system designed for virtualized environments, providing enhanced performance, scalability, and support for larger volumes and files.

## Code Sample

```bash
# ESXi CLI command to check VMFS version
esxcli storage vmfs extent list | grep -i vmfs8
```

## Configuration

```ini
# VMFS 8 configuration
[vmfs]
version = 8
block_size = 4MB
max_file_size = 62TB
max_volume_size = 128TB
```