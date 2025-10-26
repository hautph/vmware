---
term: Update Manager
category: Management Tools
---

Update Manager (now largely superseded by vSphere Lifecycle Manager - vLCM) was a vCenter Server service used for patching, upgrading, and updating ESXi hosts, virtual machine hardware, and VMware Tools. It provided a centralized mechanism to ensure compliance and consistency across the vSphere environment.

For a detailed guide on VMware Update Manager, including its architecture, features, and best practices, see the [Update Manager Detailed Guide](/knowledge/article/update-manager-detailed).

## Key Functions (Historical)

*   **Host Patching and Upgrades:** Scanned ESXi hosts for compliance against baselines and applied patches or performed upgrades.
*   **VMware Tools and VM Hardware Upgrades:** Facilitated the upgrade of VMware Tools and virtual machine hardware versions across virtual machines.
*   **Baseline Management:** Allowed administrators to define baselines (collections of patches, extensions, or upgrades) to ensure compliance.

## Evolution to vSphere Lifecycle Manager (vLCM)

With vSphere 7 and later, vSphere Lifecycle Manager (vLCM) has replaced Update Manager as the primary tool for lifecycle management. vLCM offers a more robust, image-based approach to managing ESXi hosts and clusters, providing greater consistency and automation.