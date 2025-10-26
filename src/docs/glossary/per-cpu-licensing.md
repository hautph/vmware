---
term: Per CPU Licensing
category: Licensing_Editions
---

Per CPU Licensing is VMware's licensing model that requires one license for each physical CPU in an ESXi host, regardless of the number of cores per CPU, providing a simple and predictable licensing structure for vSphere deployments. This licensing model offers cost predictability and scalability, making it easier for organizations to plan and budget for their virtualization infrastructure.

## Overview

Per CPU Licensing provides:
- Simple and predictable licensing based on physical CPUs
- Cost-effective scaling with CPU additions
- Support for unlimited cores per CPU
- Compatibility with various vSphere editions
- Integration with VMware's licensing management tools

## Key Features

### Licensing Model
- **Per CPU Basis**: Licensing based on physical CPU count
- **Unlimited Cores**: No limit on cores per CPU
- **Predictable Costs**: Predictable licensing costs
- **Simple Calculation**: Simple license calculation
- **Scalable Pricing**: Scalable pricing structure

### Edition Support
- **Standard Edition**: Basic vSphere features
- **Enterprise Edition**: Advanced vSphere features
- **Enterprise Plus Edition**: Full vSphere feature set
- **Flexible Upgrades**: Flexible edition upgrades
- **Bundle Options**: Bundle options with other products

### Management Benefits
- **Easy Tracking**: Easy license tracking and management
- **Compliance Monitoring**: Automated compliance monitoring
- **Reporting**: Detailed licensing reports
- **Audit Support**: Support for licensing audits
- **Cost Optimization**: Tools for cost optimization

## Architecture

### Licensing Components
- **License Keys**: Unique keys for each license
- **License Server**: Central license management
- **vCenter Integration**: Integration with vCenter Server
- **ESXi Hosts**: Hosts with license assignments
- **Management Interface**: Interface for license management

### License Types
- **Evaluation Licenses**: Temporary evaluation licenses
- **Production Licenses**: Production use licenses
- **Bundle Licenses**: Licenses for product bundles
- **Subscription Licenses**: Subscription-based licenses
- **Perpetual Licenses**: Perpetual use licenses

### Compliance Management
- **License Assignment**: Assignment of licenses to hosts
- **Usage Tracking**: Tracking of license usage
- **Compliance Checking**: Automated compliance checking
- **Violation Detection**: Detection of license violations
- **Remediation**: Remediation of compliance issues

## Configuration Examples

### PowerCLI Configuration
```powershell
# Assign license to vCenter Server
Set-License -Entity (Get-VIServer) -LicenseKey "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"

# Assign license to ESXi host
Set-License -Entity (Get-VMHost "esxi01.domain.com") -LicenseKey "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"

# View license information
Get-License

# Check license usage
Get-LicenseUsage
```

### ESXi CLI Configuration
```bash
# Check CPU information for licensing
esxcli hardware cpu list | wc -l

# View license information
vim-cmd vimsvc/license

# Check license usage
esxcli system license get

# View hardware information
esxcli hardware platform get
```

### vSphere Client Configuration
```xml
<!-- License configuration -->
[licensing]
model = per-cpu
edition = enterprise-plus
cpus = 2
license-key = XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
```

## Requirements

### Hardware
- **Physical CPUs**: Physical CPUs in ESXi hosts
- **Compatible Hardware**: Hardware compatible with vSphere
- **Proper Sizing**: Proper hardware sizing for workloads
- **Redundancy**: Proper redundancy planning
- **Scalability**: Consideration for future growth

### Software
- **vCenter Server**: Required for centralized license management
- **ESXi Hosts**: Hosts requiring license assignments
- **License Keys**: Valid license keys for deployment
- **Management Tools**: Tools for license management
- **Proper Editions**: Appropriate vSphere editions

### Planning Considerations
- **CPU Count**: Accurate count of physical CPUs
- **Edition Selection**: Selection of appropriate editions
- **Future Growth**: Planning for future CPU additions
- **Budget Planning**: Budget planning for licenses
- **Compliance**: Compliance with licensing terms

## Edition Comparison

### Standard Edition
- **Basic Features**: Basic vSphere features
- **Core Functionality**: Core virtualization functionality
- **Limited Advanced**: Limited advanced features
- **Cost Effective**: Most cost-effective option
- **Small Deployments**: Suitable for small deployments

### Enterprise Edition
- **Advanced Features**: Advanced vSphere features
- **DRS Support**: Support for DRS
- **HA Support**: Support for HA
- **FT Support**: Support for Fault Tolerance
- **Medium Deployments**: Suitable for medium deployments

### Enterprise Plus Edition
- **Full Feature Set**: Full vSphere feature set
- **All Capabilities**: All vSphere capabilities
- **Advanced Security**: Advanced security features
- **Comprehensive**: Most comprehensive edition
- **Large Deployments**: Suitable for large deployments

## Best Practices

1. **Planning**: Plan CPU licensing requirements carefully
2. **Tracking**: Track license usage and compliance
3. **Optimization**: Optimize license usage for cost savings
4. **Monitoring**: Monitor license compliance regularly
5. **Documentation**: Document license assignments and usage
6. **Renewal**: Plan for license renewals and upgrades

## vSphere 8 Enhancements

### Improved Management
- **Enhanced Interface**: Better license management interface
- **Advanced Reporting**: More detailed licensing reports
- **Better Integration**: Better integration with other tools
- **Streamlined Operations**: Simplified license operations

### Enhanced Features
- **Flexible Licensing**: More flexible licensing options
- **Better Compliance**: Improved compliance monitoring
- **Advanced Analytics**: Better licensing analytics
- **Cost Optimization**: Enhanced cost optimization tools

### Performance Improvements
- **Faster Operations**: Faster license operations
- **Reduced Overhead**: Lower licensing overhead
- **Better Scalability**: Better handling of large environments
- **Enhanced Reliability**: More reliable licensing operations

## Troubleshooting Commands

```bash
# Check CPU count for licensing
esxcli hardware cpu list | wc -l

# View license information
vim-cmd vimsvc/license

# Check license usage
esxcli system license get

# View licensing logs
tail -f /var/log/vmware/vpxd.log | grep -i license

# Check hardware information
esxcli hardware platform get
```

## Related Technologies

- [vCenter Server](/glossary/term/vcenter.md)
- [ESXi](/glossary/term/esxi.md)
- [vSphere Standard Edition](/glossary/term/vsphere-standard-edition.md)
- [vSphere Enterprise Plus Edition](/glossary/term/vsphere-enterprise-plus-edition.md)
- [Licensing](/glossary/term/licensing-editions)