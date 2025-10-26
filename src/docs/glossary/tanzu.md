---
term: Tanzu Kubernetes Grid (TKG)
category: Cloud Native
---

Tanzu Kubernetes Grid (TKG) is a multi-cloud aligned Kubernetes distribution that helps organizations to deploy and manage Kubernetes clusters consistently across various environments. TKG provides a consistent Kubernetes runtime across data centers, public clouds, and edge locations.

## Overview

Tanzu Kubernetes Grid provides:
- Consistent Kubernetes distribution across environments
- Multi-cloud deployment capabilities
- Integrated lifecycle management
- Enterprise-grade security and compliance
- Developer-ready platform for cloud-native applications

## Key Features

### Multi-Cloud Support
- **vSphere Integration**: Native integration with VMware vSphere
- **Public Cloud Support**: AWS, Azure, Google Cloud Platform
- **Edge Deployment**: Support for edge computing environments
- **Consistent Operations**: Same experience across all environments

### Lifecycle Management
- **Cluster Provisioning**: Automated Kubernetes cluster deployment
- **Upgrades and Patches**: Streamlined update processes
- **Scaling Operations**: Easy cluster scaling
- **Backup and Recovery**: Integrated backup solutions

### Security and Compliance
- **Image Security**: Container image scanning and validation
- **Network Policies**: Kubernetes network policy enforcement
- **Role-Based Access**: Granular access control
- **Audit Logging**: Comprehensive audit trails

## Architecture

### Management Cluster
- **Control Plane**: Centralized management of workload clusters
- **Package Management**: Centralized package and extension management
- **Identity Management**: Centralized identity services
- **Monitoring and Logging**: Centralized monitoring and logging

### Workload Clusters
- **Kubernetes Runtime**: Certified Kubernetes distribution
- **Add-On Services**: Integrated services and extensions
- **Resource Management**: Efficient resource allocation
- **High Availability**: Built-in high availability

### Infrastructure Providers
- **vSphere Provider**: VMware vSphere integration
- **AWS Provider**: Amazon Web Services integration
- **Azure Provider**: Microsoft Azure integration
- **Docker Provider**: Local development environment

## vSphere 8 Enhancements

### Tanzu Kubernetes Grid 2.0
In vSphere 8, Tanzu Kubernetes Grid 2.0 consolidates Tanzu Kubernetes into a unified Kubernetes runtime, featuring:

*   **Workload Availability Zones:** Facilitates the deployment of Kubernetes clusters across multiple vSphere clusters, enhancing the resilience of cloud-native applications.
*   **Cluster Classes:** Provides a declarative way to define and manage Kubernetes cluster configurations.
*   **Customizable Base Images:** Allows for greater flexibility in tailoring Kubernetes deployments.
*   **Pinniped Integration:** Enables Supervisor Clusters and Tanzu Kubernetes Clusters to directly access OIDC or LDAP IDP for authentication, bypassing reliance on vCenter Single Sign-On.

### Performance Improvements
- **Enhanced Resource Utilization**: Better CPU and memory utilization
- **Improved Networking**: Enhanced network performance
- **Optimized Storage**: Better storage I/O performance
- **Faster Deployments**: Accelerated cluster provisioning

### Security Enhancements
- **Enhanced Authentication**: Improved identity management
- **Advanced Authorization**: Better role-based access control
- **Compliance Features**: Enhanced compliance reporting
- **Image Security**: Improved container image security

## Deployment Models

### Standalone TKG
- **Independent Deployment**: Separate from vSphere
- **Multi-Cloud Focus**: Designed for hybrid and multi-cloud
- **Flexible Infrastructure**: Supports multiple infrastructure providers
- **Enterprise Features**: Full enterprise capabilities

### vSphere with Tanzu
- **Integrated Deployment**: Native vSphere integration
- **Supervisor Clusters**: vSphere-native Kubernetes control plane
- **Namespace Management**: vCenter-based resource management
- **Developer Experience**: Simplified developer workflows

## Best Practices

1. **Planning**: Plan deployment architecture carefully
2. **Resource Sizing**: Properly size clusters for workloads
3. **Security**: Implement security best practices
4. **Monitoring**: Implement comprehensive monitoring
5. **Backup**: Regular backup of configurations and data

## Troubleshooting Commands

```bash
# Check TKG management cluster status
kubectl get clusters -A

# View cluster configuration
kubectl get cluster <cluster-name> -o yaml

# Check node status
kubectl get nodes

# View logs
kubectl logs -n tkg-system <pod-name>
```

## Related Technologies

- [vSphere with Tanzu](/glossary/term/vsphere-with-tanzu.md)
- [Kubernetes](/glossary/term/kubernetes.md)
- [Supervisor Cluster](/glossary/term/supervisor-cluster.md)
- [Workload Availability Zones](/glossary/term/workload-availability-zones.md)
- [Cluster Classes](/glossary/term/cluster-classes.md)