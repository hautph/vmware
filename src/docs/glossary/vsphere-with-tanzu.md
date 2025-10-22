---
term: vSphere with Tanzu
category: Cloud & Integration
---

vSphere with Tanzu is VMware's Kubernetes platform that integrates Kubernetes directly into vSphere, enabling developers to run containerized workloads alongside traditional VMs with unified management and security.

## Code Sample

```bash
# kubectl command to get Tanzu Kubernetes clusters
kubectl get tanzukubernetesclusters
```

## Configuration

```ini
# Tanzu configuration
[tanzu]
enabled = true
supervisor_cluster = enabled
workload_network = nsx-alb
```