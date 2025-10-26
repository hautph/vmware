---
title: VMware Update Manager (VUM) - Detailed Guide
description: A comprehensive guide to VMware Update Manager, its features, architecture, and usage for managing ESXi hosts and virtual machines.
category: Management Tools
tags: [vmware, vum, update manager, esxi, vcenter]
---

# VMware Update Manager (VUM) - Detailed Guide

VMware Update Manager (VUM), now known as vSphere Update Manager, was a critical component of VMware vSphere that provided patching, updating, and upgrading capabilities for ESXi hosts, virtual machines, and VMware Tools. While it has largely been superseded by vSphere Lifecycle Manager (vLCM) in newer vSphere versions, understanding VUM is still important for managing legacy environments and understanding the evolution of VMware's lifecycle management approach.

## Overview

VMware Update Manager was introduced as part of the VMware Infrastructure suite and became an integral part of vCenter Server. It served as the primary tool for managing the software lifecycle of VMware environments, ensuring that systems remained up-to-date with the latest patches, updates, and security fixes.

### Key Functions

1. **Host Patching and Upgrades**: Scan ESXi hosts for compliance against baselines and apply patches or perform upgrades.
2. **VMware Tools and VM Hardware Upgrades**: Facilitate the upgrade of VMware Tools and virtual machine hardware versions across virtual machines.
3. **Baseline Management**: Define baselines (collections of patches, extensions, or upgrades) to ensure compliance.
4. **Compliance Checking**: Verify that hosts and virtual machines meet defined baseline requirements.
5. **Remediation**: Automatically fix compliance issues by applying required updates.

## Architecture

### Components

VMware Update Manager consisted of several key components that worked together to provide comprehensive lifecycle management:

#### VUM Server
The VUM server was installed as part of vCenter Server and provided the core functionality for managing updates and patches. It maintained a database of patch metadata and orchestrated the patching process.

#### VUM Database
Stored information about patches, updates, baselines, and compliance status. This database was typically integrated with the vCenter Server database.

#### VUM Client
The client interface was integrated into the vSphere Client, allowing administrators to manage updates through a familiar GUI.

#### Update Repository
A storage location for patch binaries and update packages. This could be local to the VUM server or located on a network share.

### Workflow

The typical VUM workflow involved several steps:

1. **Download Updates**: Obtain patches and updates from VMware or third-party sources.
2. **Create Baselines**: Define collections of patches that represent desired system states.
3. **Scan Systems**: Check hosts and virtual machines against baselines to identify compliance gaps.
4. **Stage Updates**: Prepare updates for installation without immediately applying them.
5. **Remediate**: Apply required updates to bring systems into compliance.
6. **Verify**: Confirm that updates were successfully applied and systems are compliant.

## Features and Capabilities

### Patch Management

VUM provided comprehensive patch management capabilities for ESXi hosts:

- **Automated Patch Download**: Automatically download patches from VMware's online repository.
- **Offline Patch Management**: Support for environments without internet connectivity.
- **Third-Party Patches**: Integration with patches from hardware vendors and third-party software providers.
- **Patch Grouping**: Organize patches into categories for easier management.

### Baseline Management

Baselines were at the core of VUM's functionality, allowing administrators to define desired system states:

#### Types of Baselines

1. **Host Baselines**: Define patch and update requirements for ESXi hosts.
2. **VM Baselines**: Specify VMware Tools and virtual hardware version requirements for virtual machines.
3. **VA Baselines**: Manage updates for virtual appliances.

#### Baseline Operations

- **Creation**: Define new baselines with specific patch requirements.
- **Modification**: Update existing baselines with new patches or changes.
- **Assignment**: Associate baselines with hosts, clusters, or datacenters.
- **Evaluation**: Check systems against baselines to determine compliance status.

### Compliance Management

VUM's compliance management features ensured that systems met organizational standards:

- **Compliance Scanning**: Regular checks to identify non-compliant systems.
- **Compliance Reporting**: Generate reports on system compliance status.
- **Automated Remediation**: Automatically apply updates to fix compliance issues.
- **Drift Detection**: Identify when systems deviate from baseline configurations.

### Upgrade Management

In addition to patching, VUM supported major version upgrades:

- **ESXi Upgrades**: Upgrade ESXi hosts from one version to another.
- **VM Hardware Upgrades**: Update virtual machine hardware versions.
- **VMware Tools Upgrades**: Update VMware Tools in virtual machines.
- **Virtual Appliance Upgrades**: Manage updates for virtual appliances.

## Implementation and Configuration

### Prerequisites

Before implementing VUM, several prerequisites needed to be met:

- **vCenter Server**: VUM required vCenter Server for centralized management.
- **Database**: Properly configured database for storing VUM metadata.
- **Network Connectivity**: Access to VMware's patch repository or local repository.
- **Storage**: Adequate storage for patch binaries and update packages.

### Installation Process

1. **Install vCenter Server**: Ensure vCenter Server is properly installed and configured.
2. **Install VUM**: Install VUM as part of the vCenter Server installation or as a separate component.
3. **Configure Database**: Set up the database for storing VUM information.
4. **Configure Repository**: Define the location for storing patch binaries.
5. **Initial Configuration**: Complete the initial setup through the vSphere Client.

### Configuration Steps

1. **Download Patches**: Configure automatic or manual patch downloads.
2. **Create Baselines**: Define baseline configurations for hosts and virtual machines.
3. **Assign Baselines**: Associate baselines with appropriate inventory objects.
4. **Scan Systems**: Perform initial compliance scans.
5. **Remediate Issues**: Apply updates to address compliance gaps.

## Best Practices

### Patch Management Best Practices

1. **Regular Patching Schedule**: Establish a regular schedule for downloading and applying patches.
2. **Test Environment**: Always test patches in a non-production environment before deploying to production.
3. **Critical Patches First**: Prioritize critical security patches for immediate deployment.
4. **Maintenance Windows**: Schedule patching during planned maintenance windows to minimize impact.

### Baseline Management Best Practices

1. **Standardized Baselines**: Create standardized baselines for different system types.
2. **Baseline Versioning**: Maintain versions of baselines to track changes over time.
3. **Regular Reviews**: Periodically review and update baselines to ensure they meet current requirements.
4. **Documentation**: Document baseline contents and update procedures.

### Compliance Management Best Practices

1. **Regular Scanning**: Perform regular compliance scans to identify issues early.
2. **Automated Remediation**: Use automated remediation for non-critical compliance issues.
3. **Compliance Reporting**: Generate regular compliance reports for auditing purposes.
4. **Exception Handling**: Properly document and manage compliance exceptions.

## Integration with Other VMware Products

### vCenter Server Integration

VUM was tightly integrated with vCenter Server, sharing the same database and management interface. This integration provided:

- **Centralized Management**: Single interface for managing both virtual infrastructure and updates.
- **Role-Based Access Control**: Consistent access control with vCenter Server permissions.
- **Inventory Integration**: Direct integration with vCenter Server inventory objects.
- **Task Management**: Unified task and event management.

### vSphere Client Integration

The vSphere Client provided the primary interface for VUM management:

- **Integrated Interface**: VUM functionality was embedded within the vSphere Client.
- **Familiar Navigation**: Consistent navigation with other vSphere features.
- **Real-Time Status**: Real-time updates on patching and compliance status.
- **Workflow Guidance**: Step-by-step guidance for common VUM operations.

### PowerCLI Integration

VMware PowerCLI provided command-line management capabilities for VUM:

- **Automated Scripting**: Automate VUM operations through PowerShell scripts.
- **Bulk Operations**: Perform operations on multiple systems simultaneously.
- **Custom Reporting**: Create custom reports using PowerCLI cmdlets.
- **Integration with Other Tools**: Combine VUM operations with other PowerCLI functionality.

## Limitations and Challenges

### Technical Limitations

1. **Host Downtime**: Many updates required host reboots, causing downtime.
2. **Limited Rollback**: Rollback capabilities were limited for certain types of updates.
3. **Complexity**: Managing multiple baselines and dependencies could become complex.
4. **Performance Impact**: Scanning and patching operations could impact system performance.

### Operational Challenges

1. **Resource Requirements**: VUM required additional storage and database resources.
2. **Maintenance Overhead**: Regular maintenance was required to keep VUM functioning properly.
3. **Learning Curve**: Administrators needed to learn VUM-specific concepts and procedures.
4. **Integration Issues**: Potential integration issues with third-party patches and updates.

## Transition to vSphere Lifecycle Manager (vLCM)

With the introduction of vSphere 7.0, VMware introduced vSphere Lifecycle Manager (vLCM) as the successor to VUM. This transition addressed many of VUM's limitations:

### Key Improvements in vLCM

1. **Image-Based Management**: vLCM uses image-based management rather than individual patch application.
2. **Enhanced Compliance**: More robust compliance checking and remediation.
3. **Reduced Downtime**: Minimized host downtime during update operations.
4. **Better Integration**: Improved integration with hardware vendor tools.

### Migration Considerations

1. **Compatibility**: Ensure compatibility with existing environments and processes.
2. **Training**: Provide training on new vLCM concepts and procedures.
3. **Process Updates**: Update operational procedures to align with vLCM workflows.
4. **Testing**: Thoroughly test vLCM in non-production environments before deployment.

## Conclusion

VMware Update Manager played a crucial role in managing VMware environments for many years, providing essential patching and update capabilities. While it has been superseded by vSphere Lifecycle Manager in newer environments, understanding VUM remains important for managing legacy systems and understanding the evolution of VMware's lifecycle management approach.

Organizations that still rely on VUM should consider planning a migration to vLCM to take advantage of improved functionality and continued support from VMware. However, for existing environments, proper implementation and management of VUM following best practices can continue to provide effective lifecycle management capabilities.

## Related Resources

- [vSphere Lifecycle Manager](/glossary/term/vsphere-lifecycle-manager.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [ESXi](/glossary/term/esxi.md)
- [VMware Tools](/glossary/term/vmware-tools.md)