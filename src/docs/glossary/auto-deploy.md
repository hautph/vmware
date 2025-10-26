---
term: Auto Deploy
category: VMware_vSphere_Foundation_9
---

Auto Deploy is a VMware technology that automates ESXi host provisioning over the network for scale, enabling rapid deployment of new hosts without requiring local installation media or manual configuration, particularly useful for large-scale VCF deployments and host lifecycle management.

## Overview

Auto Deploy in VMware vSphere is a powerful provisioning technology that enables the rapid, automated deployment of ESXi hosts over the network. It eliminates the need for physical installation media and manual configuration by delivering ESXi images and host profiles directly to bare-metal servers via PXE boot. In VMware Cloud Foundation environments, Auto Deploy streamlines the host provisioning process, making it ideal for large-scale deployments, host replacements, and automated lifecycle management.

## Key Features

### Automated Provisioning
- **Network-Based Deployment**: Deploy ESXi over network without physical media
- **PXE Boot Support**: Support for PXE boot environments
- **Image Management**: Centralized ESXi image management
- **Profile-Based Configuration**: Apply host profiles during provisioning

### Scalability and Efficiency
- **Mass Deployment**: Deploy hundreds of hosts simultaneously
- **Zero-Touch Provisioning**: Completely automated host provisioning
- **Rapid Deployment**: Fast host deployment and configuration
- **Resource Optimization**: Efficient use of network and storage resources

### Lifecycle Management
- **Host Replacement**: Easy replacement of failed hosts
- **Version Management**: Centralized ESXi version management
- **Configuration Updates**: Push configuration updates to hosts
- **Compliance Enforcement**: Enforce configuration compliance

## Architecture

### Auto Deploy Components
- **Auto Deploy Server**: Central provisioning server
- **Image Profiles**: ESXi image definitions
- **Host Profiles**: Host configuration profiles
- **Rule Engine**: Host assignment rules

### Architecture Diagram
```
Auto Deploy Architecture
├── Auto Deploy Server
│   ├── Image Management
│   │   ├── Base Images
│   │   ├── Image Customizations
│   │   └── Version Control
│   ├── Profile Management
│   │   ├── Host Profiles
│   │   ├── Configuration Policies
│   │   └── Compliance Rules
│   ├── Rule Engine
│   │   ├── Assignment Rules
│   │   ├── Pattern Matching
│   │   └── Decision Logic
│   └── Provisioning Engine
│       ├── PXE Services
│       ├── TFTP Services
│       ├── HTTP Services
│       └── Deployment Orchestration
├── Network Infrastructure
│   ├── DHCP Server
│   │   ├── IP Address Assignment
│   │   ├── Boot File Specification
│   │   └── Option Configuration
│   ├── TFTP Server
│   │   ├── Boot Files
│   │   ├── Kernel Images
│   │   └── Initial Ramdisk
│   └── HTTP Server
│       ├── VIB Packages
│       ├── Configuration Files
│       └── Custom Scripts
├── Target Hosts
│   ├── Bare Metal Servers
│   │   ├── Hardware Platform
│   │   ├── Network Interface
│   │   └── Storage Devices
│   ├── Boot Process
│   │   ├── PXE Boot
│   │   ├── Image Download
│   │   └── Configuration Apply
│   └── Provisioned Hosts
│       ├── Running ESXi
│       ├── Applied Profiles
│       └── Management Integration
└── Management Integration
    ├── vCenter Server
    │   ├── Inventory Management
    │   ├── Profile Distribution
    │   └── Compliance Monitoring
    ├── SDDC Manager
    │   ├── Host Commissioning
    │   ├── Lifecycle Management
    │   └── Policy Enforcement
    └── Lifecycle Manager
        ├── Update Orchestration
        ├── Patch Management
        └── Version Control
```

### Provisioning Model
1. **Boot Request**: Host requests boot via PXE
2. **DHCP Assignment**: DHCP assigns IP and boot information
3. **Image Selection**: Auto Deploy selects appropriate image
4. **Image Download**: Host downloads ESXi image
5. **Profile Application**: Host profile is applied
6. **Host Registration**: Host registers with vCenter
7. **Ready State**: Host ready for workload assignment

## Configuration and Management

### Auto Deploy Management
```bash
# Configure Auto Deploy server via PowerCLI
Set-DeployServer -Server "auto-deploy.domain.com"

# Create image profile
New-ImageProfile -Name "ESXi-8.0-U2-Standard" -Description "Standard ESXi 8.0 Update 2 profile" -SoftwarePackage (Get-EsxSoftwarePackage -Name "esx-base") -Vendor "VMware"

# Create host profile
New-DeployRule -Name "Production-Hosts" -Item (Get-ImageProfile "ESXi-8.0-U2-Standard"), (Get-HostProfile "Production-Standard") -Pattern "ipv4=192.168.100.100-192.168.100.200"

# Add rule to rule set
Add-DeployRule -DeployRule (Get-DeployRule "Production-Hosts")

# View current rules
Get-DeployRule

# Remove host from Auto Deploy (for reprovisioning)
Set-VMHost -VMHost "esxi01.domain.com" -State "Maintenance"
Remove-VMHost -VMHost "esxi01.domain.com" -Confirm:$false
```

### Configuration Example
```powershell
# PowerShell script for Auto Deploy configuration
# Import required modules
Import-Module VMware.VimAutomation.Core
Import-Module VMware.Deploy

# Connect to vCenter Server
Connect-VIServer -Server "vcenter.domain.com" -User "administrator@vsphere.local" -Password "secure-password"

# Configure Auto Deploy server
Set-DeployServer -Server "auto-deploy.domain.com"

# Create base image profile
$baseImage = New-ImageProfile -Name "ESXi-8.0-U2-Base" -Description "Base ESXi 8.0 Update 2 image" -SoftwarePackage (Get-EsxSoftwarePackage -Name "esx-base", "esx-ui", "vmkapi-common", "vsan", "vsanhealth") -Vendor "VMware" -AcceptanceLevel "PartnerSupported"

# Create customized image profile
$customImage = New-ImageProfile -Name "ESXi-8.0-U2-Custom" -Description "Customized ESXi 8.0 Update 2 image for production" -CloneFrom $baseImage -SoftwarePackage (Get-EsxSoftwarePackage -Name "net-bnxtnet", "scsi-bnxthba") -Vendor "VMware" -AcceptanceLevel "PartnerSupported"

# Export image profile
Export-ImageProfile -ImageProfile $customImage -FilePath "C:\AutoDeploy\ESXi-8.0-U2-Custom.zip"

# Create host profile from reference host
$referenceHost = Get-VMHost "reference-host.domain.com"
$newHostProfile = New-VMHostProfile -Name "Production-Standard" -Description "Standard production host profile" -ReferenceHost $referenceHost

# Configure host profile
Set-VMHostProfile -Profile $newHostProfile -Description "Updated production host profile with security settings"

# Create deployment rules
$productionRule = New-DeployRule -Name "Production-Hosts" -Item $customImage, $newHostProfile -Pattern "ipv4=192.168.100.100-192.168.100.150"

$developmentRule = New-DeployRule -Name "Development-Hosts" -Item $baseImage, (Get-VMHostProfile "Development-Standard") -Pattern "ipv4=192.168.101.100-192.168.101.150"

$replacementRule = New-DeployRule -Name "Replacement-Hosts" -Item $customImage, $newHostProfile -Pattern "mac=00:50:56:*"

# Add rules to active rule set
Add-DeployRule -DeployRule $productionRule
Add-DeployRule -DeployRule $developmentRule
Add-DeployRule -DeployRule $replacementRule

# Verify rule configuration
Get-DeployRule | Format-Table Name, Pattern, Item

# Test rule matching
Test-DeployRule -MacAddress "00:50:56:12:34:56" -IPv4Address "192.168.100.125"

# Disconnect from vCenter
Disconnect-VIServer -Server "vcenter.domain.com" -Confirm:$false
```

### DHCP Configuration Example
```bash
# DHCP configuration for Auto Deploy
# /etc/dhcp/dhcpd.conf
authoritative;
default-lease-time 600;
max-lease-time 7200;

subnet 192.168.100.0 netmask 255.255.255.0 {
  option routers 192.168.100.1;
  option domain-name-servers 8.8.8.8, 8.8.4.4;
  option domain-name "domain.com";
  
  # Auto Deploy configuration
  option tftp-server-name "auto-deploy.domain.com";
  option bootfile-name "bootx64.efi";
  
  # IP range for Auto Deploy hosts
  range 192.168.100.100 192.168.100.200;
  
  # Host reservations (optional)
  host esxi01 {
    hardware ethernet 00:50:56:12:34:56;
    fixed-address 192.168.100.101;
  }
  
  host esxi02 {
    hardware ethernet 00:50:56:12:34:57;
    fixed-address 192.168.100.102;
  }
}

# DHCP options for Auto Deploy
option space VMware;
option VMware.vendor-class-identifier code 1 = text;
option VMware.protocol-version code 2 = unsigned integer 32;
option VMware.deployment-type code 3 = unsigned integer 32;

option vendor.VMware code 197 = encapsulate VMware;
option VMware.vendor-class-identifier "VMware-cb-03";
option VMware.protocol-version 3;
option VMware.deployment-type 1;
```

### Management Operations
- **Image Management**: Manage ESXi images and versions
- **Profile Management**: Manage host profiles and configurations
- **Rule Management**: Manage deployment rules and patterns
- **Host Provisioning**: Provision and manage hosts

## vSphere Foundation 9 Enhancements

### Enhanced Performance
- **Faster Provisioning**: Improved provisioning speed
- **Resource Optimization**: Better resource utilization
- **Network Performance**: Enhanced network performance
- **Storage Performance**: Improved storage I/O performance

### Advanced Features
- **Enhanced Profiles**: Better profile capabilities
- **AI/ML Integration**: AI-driven provisioning optimization
- **Predictive Analytics**: Enhanced predictive capabilities
- **Automated Operations**: Automated provisioning operations

### Management Improvements
- **Simplified UI**: Enhanced management interface
- **Streamlined Workflows**: Simplified management workflows
- **Better Reporting**: Enhanced reporting capabilities
- **API Enhancements**: Improved API functionality

## Best Practices

1. **Network Design**: Design network for Auto Deploy
2. **Image Management**: Manage images properly
3. **Profile Design**: Design appropriate host profiles
4. **Rule Configuration**: Configure rules correctly
5. **Security**: Implement proper security controls
6. **Documentation**: Document Auto Deploy configurations

## Troubleshooting Commands

```bash
# Check Auto Deploy service status
Get-Service vmware-deploy

# View current image profiles
Get-ImageProfile

# View current deployment rules
Get-DeployRule

# Check host profile compliance
Get-VMHostProfileCompliance

# View Auto Deploy logs
Get-Log -Key "vmkernel" | Select-String "deploy"

# Test PXE boot configuration
Test-NetConnection -ComputerName "auto-deploy.domain.com" -Port 67

# Verify TFTP service
Test-NetConnection -ComputerName "auto-deploy.domain.com" -Port 69

# Check HTTP service for image delivery
Test-NetConnection -ComputerName "auto-deploy.domain.com" -Port 80
```

## Related Technologies

- [Host Profile](host-profile.md) - Standardized host configurations
- [ESXi](esxi.md) - VMware hypervisor
- [SDDC Manager](sddc-manager.md) - Central management platform
- [Commission a Host](commission-a-host.md) - Adds host to VCF inventory