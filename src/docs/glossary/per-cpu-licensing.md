---
term: Per CPU Licensing
category: Licensing_Editions
---

Per CPU Licensing is VMware's licensing model that requires one license for each physical CPU in an ESXi host, regardless of the number of cores per CPU, providing a simple and predictable licensing structure for vSphere deployments.

## Code Sample

```bash
# ESXi CLI command to check CPU licensing
esxcli hardware cpu list | wc -l
```

## Configuration

```ini
# Per CPU Licensing configuration
[licensing]
model = per-cpu
cpus = 2
cores_per_cpu = 16
```