---
term: VMware Cloud on AWS
category: Cloud_Integration
---

VMware Cloud on AWS is a jointly developed cloud service that delivers VMware's enterprise infrastructure as a service on AWS infrastructure, providing consistent infrastructure and operations across data centers and cloud. This service enables organizations to extend their on-premises VMware environments to the cloud with minimal changes to operations, tools, and skill sets.

## Overview

VMware Cloud on AWS provides:
- Consistent VMware infrastructure across on-premises and cloud
- Seamless extension of data centers to AWS cloud
- Native integration with AWS services and infrastructure
- Simplified cloud migration and hybrid cloud operations
- Enterprise-grade performance and security

## Key Features

### Hybrid Cloud Consistency
- **Unified Infrastructure**: Consistent infrastructure across environments
- **Same Tools**: Same management tools and interfaces
- **Common Skills**: No new skills required for cloud operations
- **Consistent Policies**: Consistent security and compliance policies
- **Seamless Mobility**: Seamless workload mobility between environments

### AWS Integration
- **Native Services**: Native integration with AWS services
- **High Performance**: High-performance AWS infrastructure
- **Global Reach**: Global AWS infrastructure availability
- **Elastic Scaling**: Elastic scaling with AWS resources
- **Cost Optimization**: Cost optimization with AWS pricing

### Management Benefits
- **Simplified Operations**: Simplified cloud operations
- **Automated Provisioning**: Automated infrastructure provisioning
- **Centralized Management**: Centralized management through vCenter
- **Monitoring**: Comprehensive monitoring and analytics
- **Support**: Enterprise-grade support from VMware and AWS

## Architecture

### Components
- **Software-Defined Data Center (SDDC)**: VMware SDDC deployed on AWS
- **vCenter Server**: Centralized management through vCenter Server
- **ESXi Hosts**: VMware ESXi hosts on AWS bare metal infrastructure
- **NSX Networking**: VMware NSX networking and security
- **vSAN Storage**: VMware vSAN software-defined storage

### Infrastructure Layers
- **AWS Bare Metal**: AWS bare metal infrastructure foundation
- **VMware Stack**: VMware software stack deployment
- **Management Plane**: Management and control plane
- **Data Plane**: Data and workload plane
- **Service Integration**: Integration with AWS services

### Network Architecture
- **Software-Defined Networking**: VMware NSX software-defined networking
- **Hybrid Connectivity**: Hybrid connectivity with on-premises networks
- **AWS Direct Connect**: Direct Connect for private connectivity
- **VPN Connectivity**: VPN connectivity options
- **Network Security**: Advanced network security features

## Configuration Examples

### PowerCLI Configuration
```powershell
# Connect to VMware Cloud on AWS
Connect-VIServer -Server "vcenter.cloud.vmware.com" -User "clouduser@vmc.local" -Password "password"

# Create VM in VMware Cloud on AWS
New-VM -Name "CloudVM" -VMHost "esxi-cloud-host" -Datastore "vsanDatastore" -DiskGB 100 -MemoryGB 8

# View SDDC information
Get-VmcSddc | Select-Object Name, Region, DeploymentType, HostCount

# Configure network settings
Get-VDSwitch "SDDC-Dswitch" | New-VDPortgroup -Name "Cloud-Network" -NumPorts 128
```

### AWS CLI Configuration
```bash
# List VMware Cloud on AWS SDDCs
aws vmc list-sddcs

# View SDDC details
aws vmc get-sddc --sddc-id <sddc-id>

# Create SDDC
aws vmc create-sddc --name "ProductionSDDC" --region "us-west-2" --host-count 3

# View AWS integration
aws vmc list-routable-networks --sddc-id <sddc-id>
```

### vSphere Client Configuration
```ini
# VMware Cloud on AWS configuration
[vmc]
region = us-west-2
sddc = production-sddc
deployment_type = single-host
availability_zone = us-west-2a
host_instance_type = i3.metal
```

## Requirements

### AWS Infrastructure
- **Supported Regions**: AWS regions with VMware Cloud support
- **Network Connectivity**: Proper network connectivity to AWS
- **AWS Account**: Active AWS account with proper permissions
- **Direct Connect**: AWS Direct Connect for optimal connectivity
- **VPN**: VPN connectivity as alternative to Direct Connect

### VMware Components
- **vCenter Server**: vCenter Server for management
- **ESXi Hosts**: ESXi hosts on AWS infrastructure
- **NSX Networking**: NSX networking and security
- **vSAN Storage**: vSAN software-defined storage
- **VMware Tools**: VMware Tools for VMs

### Skills and Expertise
- **VMware Skills**: Existing VMware administration skills
- **AWS Knowledge**: Basic AWS cloud knowledge
- **Networking**: Networking expertise for hybrid connectivity
- **Security**: Security expertise for cloud environments
- **Operations**: Operations expertise for hybrid environments

## Deployment Options

### Single-Host SDDC
- **Entry Point**: Entry point for VMware Cloud on AWS
- **Development**: Suitable for development and testing
- **Small Workloads**: Small production workloads
- **Cost Effective**: Most cost-effective option
- **Limited Scale**: Limited scalability

### Multi-Host SDDC
- **Production Ready**: Production-ready deployment
- **High Availability**: High availability with multiple hosts
- **Better Performance**: Better performance with scale
- **Scalable**: Scalable to meet growing needs
- **Enterprise Ready**: Enterprise-ready capabilities

### Stretched SDDC
- **Disaster Recovery**: Disaster recovery deployment
- **Geographic Distribution**: Geographic distribution of workloads
- **Enhanced Availability**: Enhanced availability across regions
- **Business Continuity**: Business continuity capabilities
- **Advanced Networking**: Advanced networking requirements

## Use Cases

### Cloud Migration
- **Lift and Shift**: Lift and shift migration to cloud
- **Hybrid Applications**: Hybrid application deployment
- **Disaster Recovery**: Disaster recovery in cloud
- **Development Testing**: Development and testing in cloud
- **Burst Capacity**: Burst capacity for peak workloads

### Disaster Recovery
- **Cloud DR**: Cloud-based disaster recovery
- **Business Continuity**: Business continuity solutions
- **Backup**: Backup to cloud environments
- **Recovery Testing**: Recovery testing in isolated environments
- **Compliance**: Compliance with DR requirements

### Development and Testing
- **Dev/Test Environments**: Development and testing environments
- **Lab Scenarios**: Lab and training scenarios
- **Proof of Concepts**: Proof of concept deployments
- **Temporary Workloads**: Temporary workload deployment
- **Cost Optimization**: Cost optimization for non-production

## Best Practices

1. **Planning**: Plan deployment architecture carefully
2. **Networking**: Design hybrid networking properly
3. **Security**: Implement proper security policies
4. **Monitoring**: Monitor performance and costs
5. **Optimization**: Optimize resource utilization
6. **Governance**: Implement proper governance

## vSphere 8 Enhancements

### Enhanced Features
- **Improved Performance**: Better performance optimizations
- **Advanced Security**: Enhanced security features
- **Better Integration**: Better AWS service integration
- **Enhanced Monitoring**: Improved monitoring capabilities

### New Capabilities
- **Enhanced Networking**: Advanced networking capabilities
- **Better Storage**: Improved storage capabilities
- **Advanced Automation**: More advanced automation
- **Streamlined Operations**: Simplified management operations

### Performance Improvements
- **Faster Operations**: Faster management operations
- **Reduced Overhead**: Lower infrastructure overhead
- **Better Scalability**: Better handling of large environments
- **Enhanced Reliability**: More reliable cloud operations

## Troubleshooting Commands

```bash
# Check VMware Cloud on AWS connectivity
Connect-VIServer -Server "vcenter.cloud.vmware.com" -User "clouduser@vmc.local" -Password "password"

# View SDDC status
Get-VmcSddc | Select-Object Name, State, Health

# Check network connectivity
Test-NetConnection -ComputerName "vcenter.cloud.vmware.com" -Port 443

# View AWS integration status
aws vmc get-sddc --sddc-id <sddc-id>

# Check cloud health
Get-VmcTask | Where-Object {$_.Status -eq "FAILED"}
```

## Related Technologies

- [vCenter Server](/glossary/term/vcenter.md)
- [ESXi](/glossary/term/esxi.md)
- [NSX](/glossary/term/nsx.md)
- [vSAN](/glossary/term/vsan.md)
- [AWS](/glossary/term/aws.md)