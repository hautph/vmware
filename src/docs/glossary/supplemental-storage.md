---
term: Supplemental Storage
category: VMware_vSphere_Foundation_9
---

Supplemental Storage is a VMware vSphere Foundation 9 specific storage concept that refers to additional storage capacity used for expansion in workload domains. Unlike Principal Storage which forms the core storage foundation and cannot be changed after deployment, Supplemental Storage provides flexible, expandable storage capacity that can be added to workload domains to accommodate growth and changing storage requirements over time.

## Overview

Supplemental Storage provides:
- Additional storage capacity for workload expansion
- Flexible storage scaling capabilities
- Expandable storage infrastructure
- Complementary capacity to Principal Storage
- Enterprise-grade storage services and features

## Key Characteristics

### Flexible Nature
- **Expandable**: Can be added after initial deployment
- **Scalable**: Supports growth and expansion needs
- **Modifiable**: More flexible than Principal Storage
- **Adaptable**: Can adapt to changing requirements

### Storage Capabilities
- **vSAN Based**: Built on VMware vSAN technology
- **Capacity Expansion**: Additional storage capacity
- **Performance Scaling**: Scaled performance capabilities
- **Redundancy**: Enterprise-grade data protection

### Integration Points
- **Workload Domains**: Expansion storage for VCF workload domains
- **vCenter Integration**: Managed through vCenter Server
- **Policy Support**: Storage policy-based management
- **Monitoring**: Integrated health and performance monitoring

## Architecture

### Storage Components
- **Cache Tier**: High-performance caching layer
- **Capacity Tier**: Additional storage capacity layer
- **Metadata Services**: Distributed metadata management
- **Replication Services**: Data protection mechanisms

### Deployment Model
- **Domain Level**: Configured at workload domain level
- **Host Distribution**: Distributed across domain hosts
- **Policy Enforcement**: Storage policy compliance
- **Health Management**: Automated health monitoring

## Configuration Considerations

### Expansion Planning
- **Growth Analysis**: Analyze storage growth patterns
- **Capacity Requirements**: Determine expansion needs
- **Performance Metrics**: Consider performance scaling
- **Redundancy Planning**: Account for data protection

### Hardware Specifications
- **Drive Types**: SSD and HDD configuration options
- **Capacity Planning**: Additional raw and usable capacity
- **Network Requirements**: Storage network bandwidth
- **Host Configuration**: Expansion host requirements

### Policy Settings
- **Storage Policies**: Define data services requirements
- **Quality of Service**: Performance guarantees
- **Data Protection**: Replication and erasure coding
- **Encryption**: Data-at-rest encryption settings

## vSphere Foundation 9 Enhancements

### Performance Improvements
- **Enhanced Caching**: Better cache utilization algorithms
- **I/O Optimization**: Improved storage I/O processing
- **Scalability**: Better horizontal scaling capabilities
- **Latency Reduction**: Lower storage access latencies

### Security Enhancements
- **Native Encryption**: Built-in data encryption
- **Access Control**: Fine-grained storage permissions
- **Audit Trail**: Comprehensive storage logging
- **Compliance**: Enhanced regulatory compliance

### Management Improvements
- **Automated Provisioning**: Streamlined expansion workflows
- **Monitoring**: Enhanced storage monitoring
- **Policy Integration**: Better policy enforcement
- **Troubleshooting**: Improved diagnostic capabilities

## Best Practices

1. **Capacity Planning**: Plan for storage expansion needs
2. **Performance Sizing**: Size for workload performance requirements
3. **Redundancy Planning**: Implement appropriate data protection
4. **Hardware Selection**: Use VCF certified hardware
5. **Policy Management**: Define appropriate storage policies
6. **Monitoring**: Implement comprehensive storage monitoring
7. **Documentation**: Maintain detailed configuration documentation

## Troubleshooting Commands

```bash
# Check Supplemental Storage status
esxcli vsan cluster get

# View storage capacity
esxcli vsan storage list

# Check storage health
vsan.health.clusterhealthsummary

# View storage policies
esxcli vsan policy list

# Check storage network
esxcli vsan network ip list
```

## Related Technologies

- [Principal Storage](/glossary/term/principal-storage.md)
- [vSAN](/glossary/term/vsan.md)
- [Storage Cluster](/glossary/term/storage-cluster.md)
- [VMware Cloud Foundation](/glossary/term/vmware-cloud-foundation.md)
- [Workload Domain](/glossary/term/workload-domain.md)