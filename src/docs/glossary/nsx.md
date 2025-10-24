---
term: NSX
category: Networking
---

NSX is VMware's network virtualization and security platform that enables the creation of software-defined networks in data centers and cloud environments. NSX transforms traditional network and security operations by providing a fully programmable, software-based approach to networking that is decoupled from physical hardware.

## Overview

NSX provides:
- Network virtualization capabilities
- Micro-segmentation security
- Automated network provisioning
- Multi-cloud connectivity
- Integrated security services

## Key Features

### Network Virtualization
- Software-defined networking (SDN)
- Logical switching and routing
- Network isolation and segmentation
- Distributed firewall capabilities

### Security Services
- Micro-segmentation with distributed firewall
- Identity-based security policies
- Intrusion detection and prevention
- Malware protection and threat containment

### Automation and Orchestration
- API-driven network provisioning
- Integration with cloud management platforms
- Policy-based automation
- Self-service network services

## Architecture

### Control Plane
- Centralized management and control
- Policy distribution to data plane
- Network state synchronization
- Integration with vCenter Server

### Data Plane
- Distributed forwarding in hypervisor
- Kernel-level packet processing
- Hardware acceleration support
- Distributed firewall enforcement

### Management Plane
- Unified management interface
- Policy definition and monitoring
- Analytics and reporting
- Multi-site management

## NSX Components

### NSX Manager
- Central management component
- Policy definition and distribution
- System configuration and monitoring
- Integration with vCenter Server

### NSX Controller
- Control plane component
- Logical routing calculations
- ARP and MAC learning
- BGP and OSPF protocol support

### NSX Host Preparation
- Kernel modules installed on ESXi hosts
- Distributed forwarding engine
- Firewall and security modules
- VXLAN encapsulation support

## Networking Services

### Logical Switching
- Virtual Layer 2 networks
- VXLAN-based overlay networks
- Distributed switching
- Multi-tenancy support

### Logical Routing
- Distributed logical routers
- East-west and north-south routing
- Dynamic routing protocol support
- High availability and load balancing

### Edge Services
- Load balancing
- NAT and firewall services
- SSL VPN and IPsec VPN
- DHCP and DNS services

## Security Features

### Distributed Firewall
- Policy enforcement at virtual machine level
- Context-aware security policies
- Identity-based rules
- Centralized management

### Micro-segmentation
- Zero-trust security model
- Workload-level security policies
- Automated policy enforcement
- Granular access controls

### Advanced Threat Prevention
- Integration with security partners
- Sandbox and malware analysis
- Network traffic inspection
- Real-time threat intelligence

## vSphere 8 Integration

### Enhanced Integration
- Tighter integration with vSphere lifecycle
- Simplified deployment and management
- Improved performance and scalability
- Better resource utilization

### Modern Networking
- Support for modern application architectures
- Container networking integration
- Kubernetes networking policies
- Service mesh integration

### Security Enhancements
- Advanced threat detection
- Behavioral analytics
- Automated incident response
- Compliance and audit reporting

## Deployment Models

### NSX Data Center
- On-premises deployment
- Integration with vSphere environments
- Full-featured network virtualization
- Enterprise-grade security

### NSX-T Data Center
- Modern architecture for multi-hypervisor
- Cloud-native applications support
- Container networking
- Multi-cloud connectivity

## Best Practices

1. **Architecture Planning**: Design network topology and security policies carefully
2. **Resource Sizing**: Properly size NSX components for performance
3. **Security Policies**: Implement least-privilege security policies
4. **Monitoring**: Regularly monitor network performance and security events
5. **Backup and Recovery**: Maintain backups of NSX configurations

## Troubleshooting Commands

```bash
# Check NSX Manager status
GET https://nsx-manager/api/v1/node/status

# View transport nodes
GET https://nsx-manager/api/v1/transport-nodes

# Check logical switches
GET https://nsx-manager/api/v1/logical-switches

# View firewall rules
GET https://nsx-manager/api/v1/firewall/sections
```

## Related Technologies

- [NSX-T](/glossary/term/nsx-t)
- [vSphere Distributed Switch](/glossary/term/vsphere-distributed-switch)
- [Micro-segmentation](/glossary/term/micro-segmentation)
- [Distributed Firewall](/glossary/term/distributed-firewall)
- [VXLAN](/glossary/term/vxlan)