---
term: vSphere Supervisor
category: Kubernetes_and_Workloads
---

vSphere Supervisor is VMware's native Kubernetes platform that runs directly on vSphere infrastructure, providing a unified platform for managing both traditional virtual machines and modern containerized applications.

## Overview

vSphere Supervisor is the control plane for running Kubernetes workloads on vSphere. It transforms vSphere clusters into Kubernetes clusters by adding a Kubernetes control plane directly on the ESXi hosts, enabling organizations to run containerized applications alongside traditional VMs with unified management.

## Key Features

### Native Integration
- **Direct Integration**: Kubernetes runs natively on vSphere
- **Unified Management**: Single pane of glass for VMs and containers
- **Resource Sharing**: Shared resources between VMs and containers
- **Consistent Operations**: Consistent operational model

### Enterprise Capabilities
- **High Availability**: Built-in high availability
- **Security**: Enterprise-grade security controls
- **Networking**: Integrated software-defined networking
- **Storage**: Native storage integration with vSAN

### Simplified Operations
- **Easy Deployment**: Simplified Kubernetes deployment
- **Automated Updates**: Automated cluster updates
- **Self-Service**: Developer self-service capabilities
- **Multi-Tenancy**: Secure multi-tenant environments

## Architecture

### Supervisor Components
- **Supervisor Control Plane**: Kubernetes API server and control plane
- **Worker Nodes**: ESXi hosts running container workloads
- **Namespace Management**: Logical partitioning of resources
- **Content Library**: Repository for container images

### Architecture Diagram
```
vSphere Supervisor
├── Supervisor Control Plane
│   ├── API Server
│   ├── etcd
│   ├── Controller Manager
│   └── Scheduler
├── ESXi Worker Nodes
│   ├── Container Runtime
│   ├── kubelet
│   └── Container VMs
├── Namespace Management
│   ├── Resource Quotas
│   ├── Access Controls
│   └── Network Policies
└── Infrastructure Services
    ├── vSAN Storage
    ├── NSX Networking
    └── vCenter Management
```

### Deployment Model
1. **Enable Supervisor**: Configure vSphere cluster for Supervisor
2. **Control Plane Deployment**: Deploy Supervisor control plane
3. **Namespace Creation**: Create namespaces for workloads
4. **Workload Deployment**: Deploy containerized applications
5. **Ongoing Management**: Manage cluster operations

## Configuration and Management

### Enabling Supervisor
```bash
# Enable Supervisor via PowerCLI
Set-Cluster -Name "Supervisor-Cluster" -SupervisorEnabled $true

# Create namespace
New-Namespace -Name "production" -Cluster "Supervisor-Cluster" -ResourceSpec @{
    "cpu.limit" = "20000m"
    "memory.limit" = "40Gi"
}

# Deploy Kubernetes workload
kubectl apply -f deployment.yaml
```

### Configuration Example
```yaml
# Supervisor namespace configuration
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    name: production
spec:
  resourceQuotas:
  - name: quota
    spec:
      hard:
        cpu.limit: "20000m"
        memory.limit: "40Gi"
        pods: "200"
```

### Management Operations
- **Namespace Management**: Create and manage namespaces
- **Resource Allocation**: Allocate resources to workloads
- **Access Control**: Manage user and group access
- **Monitoring**: Monitor workload performance

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Improved Resource Utilization**: Better CPU and memory usage
- **Scalability**: Support for larger deployments
- **Networking**: Enhanced networking capabilities
- **Storage**: Improved storage performance

### Advanced Features
- **GPU Support**: Better GPU workload support
- **AI/ML Optimization**: Optimized for AI/ML applications
- **Edge Computing**: Support for edge deployments
- **Multi-Cloud**: Enhanced multi-cloud capabilities

### Security Improvements
- **Enhanced Isolation**: Better workload isolation
- **Compliance**: Improved compliance features
- **Audit Logging**: Enhanced audit capabilities
- **Encryption**: Better data encryption

## Best Practices

1. **Resource Planning**: Plan resources for mixed workloads
2. **Network Design**: Design networks for both VMs and containers
3. **Security**: Implement proper security controls
4. **Monitoring**: Set up comprehensive monitoring
5. **Backup**: Implement backup and disaster recovery
6. **Updates**: Keep infrastructure updated

## Troubleshooting Commands

```bash
# Check Supervisor status
kubectl get pods -n vmware-system-supervisor

# View namespace status
kubectl get namespaces

# Check resource usage
kubectl top nodes
kubectl top pods -A

# View events
kubectl get events -A

# Check logs
kubectl logs -n vmware-system-supervisor <pod-name>
```

## Related Technologies

- [Workload Management](workload-management.md) - Enabling Kubernetes on vSphere
- [vSphere Kubernetes Service](vks.md) - Integrated Kubernetes runtime
- [Tanzu Kubernetes Grid](tanzu-kubernetes-grid.md) - Enterprise Kubernetes distribution
- [Namespaces](namespaces.md) - Logical partitioning in Kubernetes