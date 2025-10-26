---
term: vSphere Kubernetes Service (VKS)
category: Kubernetes_and_Workloads
---

vSphere Kubernetes Service (VKS) is an integrated runtime for containerized applications on vSphere that provides a simplified, secure, and enterprise-ready Kubernetes experience with native integration to vSphere infrastructure services.

## Overview

vSphere Kubernetes Service delivers a fully managed Kubernetes experience that is deeply integrated with vSphere infrastructure, providing developers with a simple way to deploy and manage containerized applications while giving IT administrators enterprise-grade security, networking, and storage capabilities.

## Key Features

### Integrated Runtime
- **Native vSphere Integration**: Deep integration with vSphere infrastructure
- **Unified Management**: Single management interface for VMs and containers
- **Resource Efficiency**: Shared resources between VMs and containers
- **Consistent Operations**: Consistent operational model across workloads

### Enterprise Capabilities
- **High Availability**: Built-in high availability and fault tolerance
- **Security**: Enterprise-grade security with RBAC and network policies
- **Networking**: Integrated software-defined networking with NSX
- **Storage**: Native storage integration with vSAN and other storage providers

### Developer Experience
- **Simple Provisioning**: Easy Kubernetes cluster provisioning
- **Self-Service**: Developer self-service capabilities
- **CI/CD Integration**: Integration with CI/CD pipelines
- **Multi-Cloud Portability**: Application portability across environments

## Architecture

### VKS Components
- **Control Plane**: Managed Kubernetes control plane
- **Worker Nodes**: ESXi hosts running container workloads
- **Namespace Management**: Logical partitioning of resources
- **Content Library**: Repository for container images and templates

### Architecture Diagram
```
vSphere Kubernetes Service
├── Control Plane
│   ├── API Server
│   ├── etcd
│   ├── Controller Manager
│   └── Scheduler
├── Worker Nodes
│   ├── Container Runtime
│   ├── kubelet
│   └── Container VMs
├── Namespace Management
│   ├── Resource Quotas
│   ├── Access Controls
│   └── Network Policies
└── Infrastructure Integration
    ├── vSAN Storage
    ├── NSX Networking
    └── vCenter Management
```

### Service Model
1. **Cluster Provisioning**: Provision Kubernetes clusters
2. **Namespace Creation**: Create isolated environments
3. **Workload Deployment**: Deploy containerized applications
4. **Resource Management**: Manage compute, storage, and network resources
5. **Monitoring and Operations**: Monitor and manage cluster operations

## Configuration and Management

### Cluster Management
```bash
# Create Kubernetes cluster via PowerCLI
New-KubernetesCluster -Name "dev-cluster" -Version "1.25" -WorkerNodeCount 3

# Scale cluster
Set-KubernetesCluster -Name "dev-cluster" -WorkerNodeCount 5

# Delete cluster
Remove-KubernetesCluster -Name "dev-cluster"

# List clusters
Get-KubernetesCluster
```

### Configuration Example
```yaml
# VKS cluster configuration
apiVersion: run.tanzu.vmware.com/v1alpha1
kind: TanzuKubernetesCluster
metadata:
  name: dev-cluster
  namespace: development
spec:
  distribution:
    version: v1.25
  topology:
    controlPlane:
      count: 1
      class: best-effort-small
      storageClass: vsan-default-storage-policy
    workers:
      count: 3
      class: best-effort-medium
      storageClass: vsan-default-storage-policy
```

### Management Operations
- **Cluster Lifecycle**: Provision, scale, and delete clusters
- **Resource Allocation**: Allocate resources to workloads
- **Access Control**: Manage user and group access
- **Monitoring**: Monitor cluster and workload performance

## vSphere Foundation 9 Enhancements

### Performance Improvements
- **Resource Optimization**: Better CPU and memory utilization
- **Scalability**: Support for larger cluster deployments
- **Networking**: Enhanced networking performance
- **Storage**: Improved storage I/O performance

### Advanced Features
- **GPU Support**: Enhanced GPU workload support
- **AI/ML Workloads**: Optimized for artificial intelligence and machine learning
- **Edge Computing**: Support for edge deployment scenarios
- **Multi-Cloud**: Enhanced multi-cloud deployment capabilities

### Security Enhancements
- **Enhanced Isolation**: Better workload isolation mechanisms
- **Compliance**: Improved compliance reporting and monitoring
- **Audit Logging**: Enhanced audit trail capabilities
- **Encryption**: Better data-at-rest and data-in-transit encryption

## Best Practices

1. **Cluster Sizing**: Properly size clusters for expected workloads
2. **Network Design**: Design networks for optimal performance
3. **Security**: Implement proper security controls and policies
4. **Monitoring**: Set up comprehensive monitoring and alerting
5. **Backup**: Implement backup and disaster recovery strategies
6. **Updates**: Keep clusters updated with latest security patches

## Troubleshooting Commands

```bash
# Check VKS cluster status
kubectl get tanzukubernetesclusters

# View cluster details
kubectl get tanzukubernetescluster <cluster-name> -o yaml

# Check node status
kubectl get nodes

# View pod status
kubectl get pods -A

# Check events
kubectl get events -A
```

## Related Technologies

- [vSphere Supervisor](vsphere-supervisor.md) - Native Kubernetes platform in vSphere
- [Workload Management](workload-management.md) - Enabling Kubernetes on vSphere
- [Tanzu Kubernetes Grid](tanzu-kubernetes-grid.md) - Enterprise Kubernetes distribution
- [Namespaces](namespaces.md) - Logical partitioning in Kubernetes