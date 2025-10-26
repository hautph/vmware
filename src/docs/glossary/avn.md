---
term: Application Virtual Networks (AVNs)
category: VMware_vSphere_Foundation_9
---

Application Virtual Networks (AVNs) are NSX-backed virtual networks in VMware vSphere Foundation 9 that provide seamless connectivity across data centers with a single IP address space. AVNs enable applications to maintain consistent network connectivity and IP addressing regardless of their physical location, facilitating hybrid cloud deployments, disaster recovery scenarios, and multi-site application architectures. They represent VMware's approach to providing unified networking across on-premises and cloud environments.

## Overview

Application Virtual Networks provide:
- NSX-backed virtual networking infrastructure
- Seamless cross-datacenter connectivity
- Single IP address space management
- Hybrid cloud networking capabilities
- Application-centric network design

## Architecture

### Core Components
- **NSX Manager**: Centralized network management
- **Transport Zones**: Network connectivity domains
- **Logical Switches**: Virtual Layer 2 networks
- **Tier-0 Gateways**: North-south connectivity
- **Tier-1 Gateways**: East-west connectivity

### Network Services
- **DHCP**: Dynamic IP address allocation
- **DNS**: Domain Name System services
- **NAT**: Network Address Translation
- **Firewall**: Distributed firewall services
- **Load Balancing**: Application load distribution

### Connectivity Models
- **Stretch Networks**: Extended Layer 2 networks
- **Routed Networks**: Layer 3 routed connectivity
- **Overlay Networks**: VXLAN-based virtual networks
- **Underlay Networks**: Physical network infrastructure

## Key Features

### Multi-Site Connectivity
- **Data Center Interconnect**: Seamless site-to-site connectivity
- **IP Address Mobility**: Consistent IP addressing across sites
- **Network Consistency**: Uniform network policies
- **Application Portability**: Easy application migration

### Hybrid Cloud Integration
- **Cloud Extension**: Extend networks to public clouds
- **Consistent Security**: Uniform security policies
- **Centralized Management**: Single pane of glass
- **Automated Provisioning**: Streamlined deployment

### Advanced Networking
- **Micro-Segmentation**: Fine-grained security policies
- **Service Insertion**: Network service chaining
- **Traffic Engineering**: Advanced routing control
- **Quality of Service**: Traffic prioritization

## Configuration Management

### Basic Setup
- **Transport Zone Creation**: Network domain definition
- **Logical Switch Provisioning**: Virtual network creation
- **Gateway Configuration**: Routing setup
- **Service Profile Definition**: Network service setup

### Advanced Configuration
- **Security Policy**: Distributed firewall rules
- **Traffic Steering**: Service insertion policies
- **QoS Configuration**: Quality of service settings
- **Monitoring Setup**: Network analytics configuration

### Management Operations
- **Centralized Control**: Unified management interface
- **Policy Enforcement**: Automated policy application
- **Health Monitoring**: Real-time network monitoring
- **Troubleshooting**: Advanced diagnostic tools

## Deployment Models

### On-Premises Only
- **Single Data Center**: Local AVN deployment
- **Multi-Site**: Multiple data center connectivity
- **Stretched Networks**: Extended Layer 2 segments
- **Local Services**: On-premises network services

### Hybrid Cloud
- **Cloud Extension**: Public cloud connectivity
- **Consistent Policies**: Uniform security and networking
- **Application Mobility**: Seamless workload migration
- **Disaster Recovery**: Protected application environments

### Multi-Cloud
- **Multiple Providers**: Connectivity across cloud providers
- **Federated Management**: Unified control plane
- **Consistent Experience**: Uniform operations
- **Optimized Routing**: Efficient traffic routing

## vSphere Foundation 9 Enhancements

### Performance Improvements
- **Enhanced Routing**: Better routing algorithms
- **Optimized Forwarding**: Improved packet processing
- **Reduced Latency**: Lower network latency
- **Better Throughput**: Higher network throughput

### Security Enhancements
- **Advanced Firewall**: Enhanced security policies
- **Micro-Segmentation**: Fine-grained security controls
- **Audit Trail**: Comprehensive network activity logging
- **Compliance**: Enhanced regulatory compliance

### Management Improvements
- **Automated Provisioning**: Streamlined network deployment
- **Monitoring**: Enhanced network monitoring capabilities
- **Policy Integration**: Better policy enforcement
- **Troubleshooting**: Improved diagnostic tools

## Best Practices

1. **Design Planning**: Plan network architecture carefully
2. **Security Policies**: Implement appropriate security controls
3. **Performance Tuning**: Optimize network settings for applications
4. **Redundancy**: Implement redundant network paths
5. **Monitoring**: Regular network performance monitoring
6. **Documentation**: Maintain network configuration documentation

## Troubleshooting Commands

```bash
# Check AVN status
nsxcli -c "get logical-switches"

# View transport nodes
nsxcli -c "get transport-nodes"

# Check connectivity
nsxcli -c "ping <destination-ip>"

# View network policies
nsxcli -c "get firewall rules"

# Check network logs
tail -f /var/log/nsx.log
```

## Related Technologies

- [NSX Edge Cluster](/glossary/term/nsx-edge-cluster.md)
- [Network Pool](/glossary/term/network-pool.md)
- [NSX](/glossary/term/nsx.md)
- [NSX-T](/glossary/term/nsx-t.md)
- [VMware Cloud Foundation](/glossary/term/vmware-cloud-foundation.md)