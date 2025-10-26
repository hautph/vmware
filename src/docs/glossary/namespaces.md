---
term: Namespaces
category: Kubernetes_and_Workloads
---

Namespaces are logical partitions in vSphere Kubernetes environments that provide isolation, resource management, and access control for teams and projects, enabling multi-tenancy within a single Kubernetes cluster.

## Overview

Namespaces in vSphere Kubernetes Service provide a way to divide cluster resources between multiple users, teams, or projects. They offer resource quotas, access controls, and network policies to ensure secure and efficient resource sharing while maintaining isolation between different workloads.

## Key Features

### Resource Isolation
- **Resource Quotas**: Limit resource consumption per namespace
- **Access Controls**: Role-based access control for namespaces
- **Network Policies**: Network isolation between namespaces
- **Storage Quotas**: Storage resource limitations

### Multi-Tenancy
- **Team Isolation**: Separate environments for different teams
- **Project Separation**: Isolate different projects or applications
- **Resource Allocation**: Dedicated resources per namespace
- **Security Boundaries**: Security isolation between tenants

### Management Benefits
- **Organizational Structure**: Logical organization of resources
- **Billing and Chargeback**: Resource usage tracking
- **Policy Enforcement**: Consistent policy application
- **Simplified Operations**: Easier management of large environments

## Architecture

### Namespace Components
- **Metadata**: Namespace identification and labels
- **Resource Quotas**: Resource consumption limits
- **Limit Ranges**: Default resource limits for objects
- **Network Policies**: Network traffic controls
- **Role Bindings**: Access control assignments

### Namespace Structure
```
Kubernetes Cluster
├── Namespace: development
│   ├── ResourceQuota: dev-quota
│   ├── LimitRange: dev-limits
│   ├── NetworkPolicy: dev-network-policy
│   ├── RoleBinding: dev-admins
│   └── Applications
├── Namespace: production
│   ├── ResourceQuota: prod-quota
│   ├── LimitRange: prod-limits
│   ├── NetworkPolicy: prod-network-policy
│   ├── RoleBinding: prod-admins
│   └── Applications
└── Namespace: staging
    ├── ResourceQuota: staging-quota
    ├── LimitRange: staging-limits
    ├── NetworkPolicy: staging-network-policy
    ├── RoleBinding: staging-admins
    └── Applications
```

### Isolation Model
1. **Resource Isolation**: CPU, memory, and storage limits
2. **Network Isolation**: Network policy enforcement
3. **Security Isolation**: RBAC and access controls
4. **Storage Isolation**: Separate storage namespaces

## Configuration and Management

### Namespace Creation
```bash
# Create namespace via kubectl
kubectl create namespace development

# Create namespace with YAML
kubectl apply -f namespace.yaml

# Delete namespace
kubectl delete namespace development

# List namespaces
kubectl get namespaces
```

### Configuration Example
```yaml
# Namespace with resource quotas and limits
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    name: development
    environment: dev
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: development
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "50"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: dev-limits
  namespace: development
spec:
  limits:
  - default:
      cpu: 500m
      memory: 1Gi
    defaultRequest:
      cpu: 250m
      memory: 512Mi
    type: Container
```

### Management Operations
- **Quota Management**: Set and manage resource quotas
- **Access Control**: Configure RBAC for namespaces
- **Network Policies**: Define network isolation rules
- **Monitoring**: Monitor namespace resource usage

## vSphere Foundation 9 Enhancements

### Enhanced Resource Management
- **Improved Quotas**: Better resource quota management
- **Dynamic Allocation**: Dynamic resource allocation
- **Performance Optimization**: Better resource utilization
- **Scalability**: Support for larger namespace deployments

### Advanced Features
- **Enhanced Isolation**: Better workload isolation
- **Policy Management**: Advanced policy enforcement
- **Multi-Cloud Support**: Enhanced multi-cloud capabilities
- **Edge Computing**: Support for edge deployment scenarios

### Security Improvements
- **Enhanced RBAC**: Improved role-based access control
- **Network Security**: Advanced network security features
- **Compliance**: Better compliance reporting
- **Audit Logging**: Enhanced audit capabilities

## Best Practices

1. **Resource Planning**: Plan resource quotas carefully
2. **Access Control**: Implement proper RBAC policies
3. **Network Policies**: Define appropriate network policies
4. **Monitoring**: Monitor resource usage and performance
5. **Labels and Annotations**: Use labels for organization
6. **Documentation**: Document namespace purposes and policies

## Troubleshooting Commands

```bash
# Check namespace status
kubectl get namespaces

# View namespace details
kubectl describe namespace <namespace-name>

# Check resource quotas
kubectl get resourcequota -n <namespace-name>

# View resource usage
kubectl top pods -n <namespace-name>

# Check network policies
kubectl get networkpolicy -n <namespace-name>
```

## Related Technologies

- [vSphere Kubernetes Service](vsphere-kubernetes-service.md) - Integrated Kubernetes runtime
- [vSphere Supervisor](vsphere-supervisor.md) - Native Kubernetes platform in vSphere
- [Workload Management](workload-management.md) - Enabling Kubernetes on vSphere
- [Tanzu Kubernetes Grid](tanzu-kubernetes-grid.md) - Enterprise Kubernetes distribution