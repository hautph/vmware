---
term: vSAN Data Persistence Platform
category: Storage
---

The vSAN Data Persistence Platform (DPp) is a framework within vSAN that allows third-party stateful service providers (e.g., object storage, databases) to integrate directly with vSAN. This enables these services to leverage vSAN's underlying storage capabilities while offering their own data persistence and management features. The Data Persistence Platform represents VMware's strategy to extend vSAN beyond traditional virtualized workloads to support modern, cloud-native applications and services.

## Overview

vSAN Data Persistence Platform provides:
- Framework for third-party stateful service integration
- Direct access to vSAN storage capabilities
- Support for modern application architectures
- Integration with cloud-native services
- Unified management through vCenter Server

## Key Features

### Service Integration
- **Third-Party Integration**: Integration with third-party services
- **Native Deployment**: Native deployment on vSAN infrastructure
- **API Framework**: Comprehensive API framework for integration
- **Service Catalog**: Catalog of integrated services
- **Lifecycle Management**: Complete service lifecycle management

### Storage Optimization
- **vSAN Integration**: Direct integration with vSAN storage
- **Performance Optimization**: Performance optimization for services
- **Scalability**: Scalable storage for stateful services
- **Data Protection**: Data protection for persistent services
- **Resource Efficiency**: Efficient resource utilization

### Management Capabilities
- **vCenter Integration**: Management through vCenter Server
- **Unified Interface**: Unified management interface
- **Monitoring**: Integrated monitoring and reporting
- **Automation**: Automated provisioning and scaling
- **Compliance**: Compliance reporting and auditing

### Developer Support
- **API Access**: Comprehensive API access for developers
- **SDK Support**: Software development kit support
- **Documentation**: Comprehensive developer documentation
- **Sample Code**: Sample code and examples
- **Community Support**: Developer community support

## Architecture

### Components
- **Service Manager**: Central service management component
- **Storage Interface**: Interface to vSAN storage
- **API Gateway**: Gateway for service APIs
- **Management Interface**: Interface for administration
- **Monitoring Services**: Services for monitoring and reporting

### Integration Framework
1. **Service Registration**: Registration of third-party services
2. **Resource Allocation**: Allocation of vSAN resources
3. **Deployment**: Deployment of service instances
4. **Configuration**: Configuration of service parameters
5. **Monitoring**: Continuous monitoring of services
6. **Scaling**: Automatic scaling of services

### Service Lifecycle
- **Provisioning**: Service provisioning and deployment
- **Configuration**: Service configuration and customization
- **Operation**: Service operation and management
- **Monitoring**: Service monitoring and reporting
- **Scaling**: Service scaling and optimization
- **Decommissioning**: Service decommissioning and cleanup

## Configuration Examples

### PowerCLI Configuration
```powershell
# List available data persistence services
Get-VsanDataPersistenceService

# Deploy data persistence service
New-VsanDataPersistenceServiceInstance -Cluster "ProductionCluster" -ServiceName "MongoDB" -CapacityGB 1000

# Configure service parameters
Set-VsanDataPersistenceServiceInstance -Instance "MongoDB-Instance" -Parameter "replicaCount" -Value 3

# View service instances
Get-VsanDataPersistenceServiceInstance | Select-Object Name, ServiceType, Status, CapacityGB

# Scale service instance
Set-VsanDataPersistenceServiceInstance -Instance "MongoDB-Instance" -CapacityGB 2000

# Remove service instance
Remove-VsanDataPersistenceServiceInstance -Instance "MongoDB-Instance" -Confirm:$false
```

### ESXi CLI Configuration
```bash
# Check data persistence platform status
esxcli vsan datapersistence list

# View service instances
esxcli vsan datapersistence instance list

# Check service health
esxcli vsan datapersistence health get

# View platform logs
tail -f /var/log/vmware/vsan/datapersistence.log

# Check resource allocation
esxcli vsan datapersistence resource list
```

### vSphere Client Configuration
```xml
# vSAN Data Persistence Platform configuration
[vsan-datapersistence]
enabled = true
default_policy = vsan-default
max_services = 100
resource_quota = 80
```

## Requirements

### Software
- **vSAN 7.0 or later**: Required for data persistence platform
- **vCenter Server**: Required for management
- **ESXi 7.0 or later**: Hosts with platform support
- **Compatible Licenses**: vSAN Enterprise license
- **Management Tools**: Compatible management tools

### Hardware
- **vSAN Ready Hardware**: vSAN certified hardware
- **Network Infrastructure**: High-performance network infrastructure
- **Storage Devices**: Compatible storage devices
- **Redundancy**: Proper redundancy planning
- **Capacity Planning**: Adequate capacity planning

### Service Provider Requirements
- **Platform SDK**: Data Persistence Platform SDK
- **API Compliance**: Compliance with platform APIs
- **Security Standards**: Compliance with security standards
- **Performance Requirements**: Meeting performance requirements
- **Documentation**: Comprehensive service documentation

### Developer Tools
- **SDK Access**: Access to platform SDK
- **API Documentation**: Comprehensive API documentation
- **Development Environment**: Proper development environment
- **Testing Framework**: Testing framework for services
- **Deployment Tools**: Tools for service deployment

## Supported Services

### Database Services
- **MongoDB**: MongoDB integration with vSAN
- **Redis**: Redis integration with vSAN
- **PostgreSQL**: PostgreSQL integration with vSAN
- **MySQL**: MySQL integration with vSAN
- **Cassandra**: Cassandra integration with vSAN

### Object Storage
- **MinIO**: MinIO object storage integration
- **Ceph**: Ceph storage integration
- **Swift**: OpenStack Swift integration
- **S3-Compatible**: S3-compatible services
- **Custom Object Storage**: Custom object storage solutions

### Analytics Services
- **Elasticsearch**: Elasticsearch integration
- **Kafka**: Apache Kafka integration
- **Spark**: Apache Spark integration
- **Hadoop**: Hadoop integration
- **Custom Analytics**: Custom analytics services

## Best Practices

1. **Planning**: Plan data persistence service deployment
2. **Sizing**: Properly size service instances and capacity
3. **Security**: Implement proper security measures
4. **Monitoring**: Monitor performance and usage
5. **Backup**: Implement backup strategies
6. **Documentation**: Document configurations and procedures

## vSphere 8 Enhancements

### Enhanced Features
- **Improved Performance**: Better service performance
- **Advanced Security**: Enhanced security features
- **Better Integration**: Better integration with vSphere 8
- **Enhanced Monitoring**: Improved monitoring capabilities

### New Capabilities
- **Enhanced APIs**: Improved API capabilities
- **Better Policies**: More advanced storage policies
- **Advanced Automation**: More advanced automation
- **Streamlined Operations**: Simplified management operations

### Performance Improvements
- **Faster Operations**: Faster service operations
- **Reduced Overhead**: Lower platform overhead
- **Better Scalability**: Better handling of large environments
- **Enhanced Reliability**: More reliable platform operations

## Troubleshooting Commands

```bash
# Check data persistence platform status
esxcli vsan datapersistence list

# View service instances
esxcli vsan datapersistence instance list

# Check service health
esxcli vsan datapersistence health get

# View platform logs
tail -f /var/log/vmware/vsan/datapersistence.log

# Check resource allocation
esxcli vsan datapersistence resource list
```

## Related Technologies

- [vSAN](/glossary/term/vsan.md)
- [vSphere with Tanzu](/glossary/term/vsphere-with-tanzu.md)
- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [Storage DRS](/glossary/term/storage-drs.md)
- [Kubernetes](/glossary/term/kubernetes.md)