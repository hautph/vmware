---
term: VMware vSphere Storage APIs – Data Protection
category: Integration_APIs
---

VMware vSphere Storage APIs – Data Protection (VADP), commonly known as VADP (formerly vStorage APIs for Data Protection), is a framework provided by VMware that enables centralized, efficient, and off-host backup and recovery of vSphere virtual machines.

## Overview

VMware vSphere Storage APIs – Data Protection (VADP) is a critical component of VMware's data protection ecosystem that provides a standardized interface for third-party backup applications to perform backup and recovery operations on vSphere virtual machines. VADP succeeded the VMware Consolidated Backup (VCB) framework and offers significant improvements in performance, efficiency, and functionality.

VADP enables backup solutions to:
*   Perform off-host backup operations without impacting virtual machine performance
*   Utilize VMware's Changed Block Tracking (CBT) for incremental backups
*   Leverage snapshot technology for consistent point-in-time backups
*   Support application-aware backups through VMware Tools and VSS

## Key Features

*   **Changed Block Tracking (CBT):** Identifies only the blocks that have changed since the last backup, dramatically reducing backup windows and network traffic
*   **Snapshot-Based Backups:** Creates quiesced snapshots of virtual machines for consistent backups without downtime
*   **Off-Host Processing:** Moves backup processing off the ESXi host to dedicated proxy servers, reducing host resource consumption
*   **Application Consistency:** Integrates with VMware Tools and Volume Shadow Copy Service (VSS) to ensure application-consistent backups
*   **Efficient Data Transfer:** Utilizes optimized data paths for faster backup and restore operations
*   **Granular Recovery:** Supports file-level, disk-level, and full VM recovery options
*   **Replication Support:** Enables replication of backup data for disaster recovery scenarios

## Architecture

### Core Components

*   **Backup Proxy Server:** Dedicated server that handles backup processing and data transfer
*   **vCenter Server:** Central management point that coordinates backup operations
*   **ESXi Hosts:** Physical servers running virtual machines that are being backed up
*   **Storage Infrastructure:** Backend storage systems where virtual machine data resides

### Data Flow

1. **Backup Initiation:** Backup application communicates with vCenter Server through VADP APIs
2. **Snapshot Creation:** vCenter Server coordinates with ESXi hosts to create quiesced snapshots
3. **Data Identification:** CBT identifies changed blocks since the last backup
4. **Data Transfer:** Changed blocks are transferred from ESXi hosts to backup proxy servers
5. **Backup Processing:** Backup proxy processes and stores backup data in backup repositories
6. **Cleanup:** Snapshots are removed after successful backup completion

### Architecture Diagram
```
Backup Application
       |
    VADP APIs
       |
  vCenter Server
       |
   ESXi Hosts
   ├── VM1 Snapshot
   ├── VM2 Snapshot
   └── VMn Snapshot
       |
  Backup Proxy Server
       |
  Backup Repository
```

## Configuration and Management

### Prerequisites

*   **vCenter Server:** Required for centralized management of backup operations
*   **VMware Tools:** Must be installed and running on all virtual machines to be backed up
*   **Backup Proxy Server:** Dedicated server with sufficient resources for backup processing
*   **Network Connectivity:** Proper network configuration between all components
*   **Storage Access:** Appropriate storage permissions and connectivity

### Integration with Backup Solutions

```bash
# Example backup workflow using VADP-enabled backup solution
1. Backup application connects to vCenter Server via VADP APIs
2. Backup job is scheduled and initiated
3. vCenter Server creates snapshots of target virtual machines
4. CBT identifies changed blocks for incremental backup
5. Data is transferred to backup proxy server for processing
6. Backup data is stored in designated repository
7. Snapshots are removed and backup job completes
```

### Management Operations

*   **Backup Job Configuration:** Define backup schedules, retention policies, and notification settings
*   **Monitoring and Reporting:** Track backup job status, performance metrics, and success rates
*   **Restore Operations:** Perform various restore scenarios including full VM, disk, and file-level recovery
*   **Maintenance Tasks:** Regular cleanup, repository management, and performance optimization

## Best Practices

1. **Resource Planning:** Allocate sufficient CPU, memory, and network resources to backup proxy servers
2. **Network Optimization:** Use dedicated network interfaces for backup traffic to avoid performance impact
3. **Storage Considerations:** Plan storage capacity with CBT efficiency and retention policies in mind
4. **Backup Scheduling:** Schedule backups during maintenance windows to minimize performance impact
5. **Regular Testing:** Test restore operations regularly to ensure backup integrity
6. **Monitoring:** Monitor backup job success rates and performance metrics continuously
7. **Security:** Implement proper access controls and encryption for backup data

## Troubleshooting Commands

```bash
# Check VMware Tools status on virtual machines
vim-cmd vmsvc/get.guest <vmid> | grep -A 5 toolsStatus

# Verify CBT status on virtual machines
vim-cmd vmsvc/get.config <vmid> | grep -A 10 changeTrackingEnabled

# Check snapshot status
vim-cmd vmsvc/snapshot.get <vmid>

# Verify network connectivity to vCenter Server
ping <vcenter-server-ip>

# Check backup proxy server resources
esxtop or top
```

## VADP vs. Previous Technologies

### Advantages over VMware Consolidated Backup (VCB)

*   **Performance:** Significantly faster backup and restore operations
*   **Efficiency:** CBT reduces backup windows and network traffic
*   **Resource Usage:** Off-host processing reduces ESXi host resource consumption
*   **Integration:** Better integration with modern backup applications
*   **Scalability:** Improved scalability for large environments

### Evolution from VCB

*   **Simplified Architecture:** Eliminated complex VCB proxy server setup
*   **Enhanced APIs:** More robust and feature-rich API set
*   **Native Integration:** Direct integration with vSphere components
*   **Improved Reliability:** Better error handling and recovery mechanisms

## Related Technologies

*   [Changed Block Tracking (CBT)](/glossary/term/changed-block-tracking) - Technology that identifies modified blocks for efficient backups
*   [VMware Tools](/glossary/term/vmware-tools) - Suite of utilities that enhances VM performance and management
*   [vCenter Server](/glossary/term/vcenter) - Centralized management platform for vSphere environments
*   [Snapshot](/glossary/term/snapshot) - Point-in-time copy of virtual machine state