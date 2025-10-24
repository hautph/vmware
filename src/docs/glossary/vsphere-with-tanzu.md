---
term: vSphere with Tanzu
category: Cloud Native
---

vSphere with Tanzu is VMware's integrated Kubernetes platform that brings Kubernetes directly into vSphere as a native service. It transforms vSphere into a Kubernetes-native platform, enabling developers to run containerized workloads alongside traditional VMs on a unified infrastructure.

## Overview

vSphere with Tanzu provides:
- Native Kubernetes integration with vSphere
- Unified management of containers and VMs
- Developer self-service capabilities
- Enterprise-grade security and compliance
- Integrated lifecycle management

## Key Features

### Native Kubernetes Integration
- **Supervisor Clusters**: vSphere-native Kubernetes control plane
- **Tanzu Kubernetes Clusters**: Full lifecycle-managed Kubernetes clusters
- **Namespaces**: Resource quotas and access control boundaries
- **VM Operators**: Kubernetes operators for VM management

### Developer Experience
- **Self-Service Provisioning**: Developers can provision Kubernetes clusters
- **Integrated Registry**: Harbor container registry integration
- **Developer Portal**: Tanzu Application Catalog and Marketplace
- **CI/CD Integration**: Integration with popular CI/CD tools

### Unified Operations
- **Single Pane of Glass**: Unified management through vCenter Server
- **Resource Management**: Integrated resource quotas and limits
- **Monitoring and Logging**: Centralized monitoring and logging
- **Backup and Recovery**: Integrated backup solutions

## Architecture

### Supervisor Cluster
- **Control Plane**: Embedded Kubernetes control plane in ESXi
- **API Server**: Kubernetes API endpoint
- **etcd**: Distributed key-value store
- **Scheduler**: Kubernetes scheduler

### Namespaces
- **Resource Quotas**: CPU, memory, and storage limits
- **Access Control**: Role-based access control
- **Network Policies**: Kubernetes network policies
- **Storage Policies**: vSphere storage policies

### Tanzu Kubernetes Clusters
- **Worker Nodes**: VM-based Kubernetes worker nodes
- **Cluster API**: Cluster lifecycle management
- **Add-On Management**: Integrated add-on services
- **Version Management**: Kubernetes version management

## vSphere 8 Enhancements

### Workload Availability Zones
- **Multi-Cluster Deployment**: Deploy Kubernetes clusters across multiple vSphere clusters
- **Enhanced Resilience**: Improved application availability and fault tolerance
- **Geographic Distribution**: Support for geographically distributed deployments
- **Resource Optimization**: Better resource utilization across clusters

### Cluster Classes
- **Declarative Configuration**: Define Kubernetes cluster configurations declaratively
- **Template Management**: Cluster template management
- **Customization**: Flexible cluster customization options
- **Version Control**: Configuration version control

### Pinniped Integration
- **OIDC Integration**: Direct integration with OIDC identity providers
- **LDAP Integration**: Direct integration with LDAP identity providers
- **Authentication Bypass**: Bypass vCenter Single Sign-On for authentication
- **Enhanced Security**: Improved authentication security

## Deployment Models

### vSphere Namespaces
- **Namespace Creation**: Create Kubernetes namespaces in vCenter
- **Resource Allocation**: Allocate resources to namespaces
- **Access Control**: Define access controls for namespaces
- **Workload Deployment**: Deploy workloads to namespaces

### Tanzu Kubernetes Clusters
- **Cluster Provisioning**: Provision full Kubernetes clusters
- **Version Management**: Manage Kubernetes versions
- **Scaling Operations**: Scale clusters up and down
- **Lifecycle Management**: Full cluster lifecycle management

## Best Practices

1. **Planning**: Plan deployment architecture carefully
2. **Resource Sizing**: Properly size namespaces and clusters
3. **Security**: Implement security best practices
4. **Monitoring**: Implement comprehensive monitoring
5. **Backup**: Regular backup of configurations and data

## Troubleshooting Commands

```bash
# Check Supervisor Cluster status
kubectl get nodes

# View namespace information
kubectl get namespaces

# Check Tanzu Kubernetes Cluster status
kubectl get tanzukubernetesclusters -A

# View logs
kubectl logs -n <namespace> <pod-name>
```

## Related Technologies

- [Tanzu Kubernetes Grid](/glossary/term/tanzu-kubernetes-grid)
- [Kubernetes](/glossary/term/kubernetes)
- [Supervisor Cluster](/glossary/term/supervisor-cluster)
- [Workload Availability Zones](/glossary/term/workload-availability-zones)
- [Cluster Classes](/glossary/term/cluster-classes)