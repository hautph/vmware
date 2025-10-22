---
term: vGPU (Virtual GPU)
category: Advanced Features
---

vGPU (Virtual GPU) is a technology that enables multiple virtual machines to share a single physical GPU, providing GPU acceleration for graphics-intensive workloads like 3D rendering, machine learning, and scientific computing.

## Code Sample

```bash
# ESXi CLI command to list vGPU profiles
esxcli graphics vgpu profile list
```

## Configuration

```ini
# vGPU configuration
[vgpu]
profile = grid_p100-4q
memory = 4GB
shared = true
```