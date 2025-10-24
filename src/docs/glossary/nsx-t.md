---
term: NSX-T
category: Networking
---

NSX-T (NSX Transform) is the modern architecture of VMware's network virtualization platform designed for multi-hypervisor environments, cloud-native applications, and container-based workloads. NSX-T provides a unified approach to networking and security that spans across data centers, private clouds, and public clouds.

## Overview

NSX-T provides:
- Multi-hypervisor support (vSphere, KVM, bare metal)
- Cloud-native application networking
- Container networking integration
- Unified security policy model
- Multi-cloud connectivity

## Key Features

### Multi-Hypervisor Support
- Support for vSphere, KVM, and bare metal
- Consistent networking and security policies
- Unified management across platforms
- Flexible deployment options

### Cloud-Native Networking
- Kubernetes networking integration
- Service mesh connectivity
- Container network interface (CNI) support
- Microservices networking

### Advanced Security
- Unified security policy model
- Identity-based security
- Distributed firewall at scale
- Advanced threat prevention

## Architecture

### Policy-Based Model
- Intent-based policy definition
- Declarative configuration
- Version control and rollback
- Multi-site policy management

### Distributed Architecture
- Distributed data plane
- Centralized control plane
- Multi-tiered management
- Scalable microservices

### API-First Design
- RESTful APIs for all functions
- Extensive programmability
- Integration with cloud management platforms
- Automation and orchestration support

## Core Components

### NSX Manager
- Central management and policy engine
- Multi-site management
- Analytics and monitoring
- Integration with cloud platforms

### NSX Controller
- Control plane cluster
- Distributed routing calculations
- Logical switching management
- High availability

### NSX Edge
- Gateway services
- Load balancing
- Firewall and security
- VPN and tunneling

### Transport Nodes
- Hypervisor integration points
- Kernel modules for packet forwarding
- Distributed firewall enforcement
- VXLAN tunnel endpoints

## Networking Services

### Logical Switching
- Virtual Layer 2 networks
- VXLAN overlay networks
- Distributed switching
- Multi-tenancy support

### Logical Routing
- Tier-0 and Tier-1 routers
- Distributed and centralized routing
- Dynamic routing protocols
- High availability

### Load Balancing
- Application load balancing
- SSL termination
- Health monitoring
- Advanced persistence

### Security Services
- Distributed firewall
- Identity firewall
- Service insertion
- Intrusion detection

## Container Networking

### Kubernetes Integration
- Native Kubernetes networking
- Network policies enforcement
- Service discovery
- Ingress controller support

### Tanzu Integration
- VMware Tanzu networking
- Pod-to-pod connectivity
- Namespace isolation
- Security policy enforcement

### Service Mesh
- Istio integration
- Microservices connectivity
- Traffic management
- Security policies

## vSphere 8 Enhancements

### Enhanced Performance
- Improved packet processing
- Better resource utilization
- Hardware acceleration support
- Optimized data paths

### Modern Lifecycle Management
- Simplified deployment
- Streamlined upgrades
- Better integration with vSphere lifecycle
- Automated patching

### Advanced Security
- Behavioral analytics
- Machine learning-based threat detection
- Automated incident response
- Compliance reporting

## Deployment Models

### On-Premises
- Data center deployment
- Integration with existing infrastructure
- Full feature set
- Enterprise-grade security

### Cloud Services
- SaaS-based management
- Public cloud connectivity
- Simplified operations
- Rapid deployment

## Best Practices

1. **Architecture Design**: Plan for scalability and performance
2. **Security Policies**: Implement zero-trust security model
3. **Resource Sizing**: Properly size components for workload
4. **Monitoring**: Implement comprehensive monitoring
5. **Backup**: Regular backup of configurations and policies

## Troubleshooting Commands

```bash
# Check NSX-T manager status
GET https://nsx-manager/policy/api/v1/infra/sites/default/enforcement-points/default

# View transport zones
GET https://nsx-manager/policy/api/v1/infra/sites/default/enforcement-points/default/transport-zones

# Check logical switches
GET https://nsx-manager/policy/api/v1/infra/segments

# View firewall policies
GET https://nsx-manager/policy/api/v1/infra/domains/default/security-policies
```

## Related Technologies

- [NSX](/glossary/term/nsx)
- [Kubernetes](/glossary/term/kubernetes)
- [Tanzu](/glossary/term/tanzu)
- [VXLAN](/glossary/term/vxlan)
- [Service Mesh](/glossary/term/service-mesh)