---
term: VMware vCenter Converter
category: Migration
language: en
---

VMware vCenter Converter is a software tool that enables the conversion of physical machines and virtual machines from third-party platforms into VMware virtual machines. It provides a streamlined process for migrating workloads to VMware vSphere environments, supporting both hot (live) and cold (offline) migrations with minimal downtime.

## Overview

VMware vCenter Converter provides:
- Physical-to-Virtual (P2V) conversion capabilities
- Virtual-to-Virtual (V2V) conversion between different virtualization platforms
- Live migration support with minimal downtime
- Centralized management through vCenter Server integration

## Key Features

### Conversion Types
- **Physical-to-Virtual (P2V)**: Convert physical machines to VMware VMs
- **Virtual-to-Virtual (V2V)**: Convert VMs from other platforms (Hyper-V, Xen, etc.)
- **Hot Migration**: Convert running systems with minimal downtime
- **Cold Migration**: Convert offline systems for planned migrations

### Platform Support
- **Source Platforms**: Windows, Linux, Hyper-V, Xen, VirtualBox
- **Target Platforms**: VMware vSphere, ESXi, Workstation
- **Hardware Support**: Various CPU architectures and device types
- **File System Support**: NTFS, FAT, ext2, ext3, ext4, XFS

### Migration Options
- **Live Conversion**: Convert running systems without shutdown
- **Offline Conversion**: Convert powered-off systems
- **Synchronized Conversion**: Multiple synchronization passes for minimal downtime
- **Customizable Settings**: Adjust CPU, memory, and disk configurations

## Architecture

### Components
- **Converter Standalone**: Independent application for direct conversions
- **Converter Enterprise**: vCenter Server integrated version for centralized management
- **Converter Agent**: Lightweight software installed on source machines
- **Converter Manager**: Central management component for Enterprise version

### Conversion Process
1. **Preparation**: Install agent and configure conversion settings
2. **Analysis**: Analyze source system for compatibility
3. **Conversion**: Copy data and create virtual machine
4. **Customization**: Adjust VM settings and install VMware Tools
5. **Validation**: Verify successful conversion and functionality

### Data Transfer Methods
- **Hot cloning**: Copy data from running systems
- **Cold cloning**: Copy data from offline systems
- **Incremental updates**: Synchronize changes during multi-pass conversions
- **Network transfer**: Transfer data over network connections
- **Removable media**: Use USB drives or other media for data transfer

## Configuration Examples

### Standalone Converter Usage
```powershell
# Convert physical Windows machine to VM
# 1. Launch VMware vCenter Converter Standalone
# 2. Select "Convert Machine"
# 3. Choose source type: "Powered-on machine"
# 4. Enter source machine details (IP, credentials)
# 5. Select destination: vCenter Server or ESXi host
# 6. Configure VM settings (name, resources, storage)
# 7. Schedule conversion and start process

# Command-line conversion example
vmware-converter-cli --source-type=physical --source-ip=192.168.1.100 --source-user=administrator --source-password=password --dest-type=virtual --dest-host=esxi01.domain.com --vm-name="MigratedVM"
```

### Enterprise Converter Configuration
```powershell
# Configure Converter Enterprise in vCenter
# 1. Install VMware vCenter Converter Enterprise
# 2. Add Converter as extension in vCenter
# 3. Configure Converter settings in vSphere Client
# 4. Deploy Converter agents to source machines
# 5. Create conversion jobs through vSphere Client

# PowerShell script for batch conversions
$Converter = Connect-Converter -Server "vcenter.domain.com" -User "administrator@vsphere.local" -Password "password"
$SourceMachines = @("server01", "server02", "server03")
foreach ($Machine in $SourceMachines) {
    New-ConverterJob -Source $Machine -Destination "esxi01.domain.com" -VMName "$Machine-VM" -StartImmediately
}
```

## Requirements

### System Requirements
- **Converter Server**: Windows Server 2008 R2 or later
- **Source Machines**: Supported Windows or Linux operating systems
- **Destination Hosts**: ESXi 4.0 or later, vCenter Server 4.0 or later
- **Network**: Connectivity between source, converter, and destination systems

### Hardware Requirements
- **CPU**: Minimum 2 GHz processor (recommended: 4 cores)
- **Memory**: Minimum 4 GB RAM (recommended: 8 GB or more)
- **Disk Space**: Sufficient space for temporary files and logs
- **Network**: 1 Gbps network connection (recommended: 10 Gbps for large migrations)

### Software Requirements
- **vCenter Server**: For Enterprise version integration
- **VMware Tools**: For optimal VM performance after conversion
- **Supported Browsers**: For web-based management interface
- **Antivirus Exclusions**: Exclude Converter directories from antivirus scanning

## Migration Planning

### Pre-Migration Assessment
- **System Inventory**: Catalog source systems and applications
- **Compatibility Check**: Verify hardware and software compatibility
- **Resource Planning**: Assess destination resource requirements
- **Network Planning**: Plan network bandwidth and connectivity
- **Backup Strategy**: Ensure backups before migration

### Conversion Best Practices
- **Test Migrations**: Perform test conversions before production migrations
- **Schedule Downtime**: Plan for brief downtime during final synchronization
- **Monitor Progress**: Track conversion progress and performance
- **Validate Results**: Verify functionality after conversion
- **Update Documentation**: Document converted systems and configurations

### Post-Migration Tasks
- **VMware Tools Installation**: Install or update VMware Tools
- **System Optimization**: Optimize VM settings for virtual environment
- **Network Configuration**: Update IP addresses and network settings
- **Application Testing**: Verify application functionality
- **Decommission Source**: Remove or repurpose source systems

## Troubleshooting

### Common Issues
- **Agent Installation Failures**: Check firewall and antivirus settings
- **Network Connectivity**: Verify network connectivity and permissions
- **Disk Conversion Errors**: Check disk space and file system compatibility
- **Performance Issues**: Monitor resource usage during conversion
- **Boot Issues**: Verify boot configuration and VMware Tools installation

### Diagnostic Commands
```bash
# Check Converter service status
sc query vmware-converter

# View Converter logs
Get-Content "C:\ProgramData\VMware\VMware vCenter Converter Standalone\Logs\*.log" -Tail 100

# Monitor network performance during conversion
netstat -an | findstr :443

# Check disk space on destination
Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'" | Select-Object Size,FreeSpace

# Verify source system connectivity
Test-NetConnection -ComputerName "source-machine" -Port 443
```

## vSphere Integration

### vCenter Server Integration
- **Centralized Management**: Manage conversions through vSphere Client
- **Role-Based Access**: Control access through vCenter permissions
- **Task Monitoring**: Monitor conversion tasks through vCenter tasks
- **Resource Management**: Integrate with vCenter resource pools and folders

### Automation Capabilities
- **PowerCLI Support**: Automate conversions with PowerShell scripts
- **Scheduled Conversions**: Plan and schedule conversion jobs
- **Bulk Operations**: Convert multiple systems simultaneously
- **Reporting**: Generate reports on conversion status and results

## Security Considerations

### Authentication and Authorization
- **Credential Management**: Secure storage and handling of source credentials
- **Role-Based Access**: Control access to conversion functions
- **Audit Logging**: Track conversion activities and changes
- **Encryption**: Secure communication between components

### Data Protection
- **Network Encryption**: Secure data transfer over network
- **File System Permissions**: Maintain file permissions during conversion
- **Data Integrity**: Verify data integrity during and after conversion
- **Compliance**: Ensure compliance with data protection regulations

## Related Technologies

- [vSphere](/glossary/term/vsphere.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [VMware Tools](/glossary/term/vmware-tools.md)
- [vMotion](/glossary/term/vmotion.md)
- [Storage vMotion](/glossary/term/storage-vmotion.md)
- [VMware HCX](/glossary/term/hcx.md)