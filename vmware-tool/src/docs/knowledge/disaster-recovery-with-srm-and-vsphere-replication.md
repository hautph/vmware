---
title: Disaster Recovery with SRM and vSphere Replication
category: Disaster Recovery
excerpt: Learn how to implement disaster recovery using VMware Site Recovery Manager (SRM) and vSphere Replication for automated failover and failback processes.
---

# Disaster Recovery with SRM and vSphere Replication

A robust disaster recovery (DR) plan is essential for business continuity. For vSphere environments, VMware provides a powerful combination of tools for DR: vSphere Replication and Site Recovery Manager (SRM). This guide explains the role of each component and how they work together to provide a comprehensive DR solution.

## The Two Pillars of vSphere DR

Think of vSphere Replication and SRM as two halves of a whole. vSphere Replication is the engine that moves the data, while SRM is the brain that orchestrates the recovery process.

### vSphere Replication: The Data Mover

vSphere Replication is a hypervisor-based replication engine that is built into vSphere. Its primary responsibility is to copy virtual machine data from a primary site to a secondary site.

*   **Key Features:**
    *   **Hypervisor-Based:** Replicates VMs regardless of the underlying storage hardware.
    *   **Flexible RPOs:** You can configure Recovery Point Objectives (RPOs) on a per-VM basis, from as low as 5 minutes to 24 hours.
    *   **Efficient:** After the initial full copy, it only replicates changed blocks, minimizing network bandwidth usage.
    *   **Storage Agnostic:** Works with any storage supported by vSphere, including vSAN, FC, iSCSI, and NFS.

While vSphere Replication is excellent at moving data, it does not, by itself, automate the process of failing over to the secondary site. That's where SRM comes in.

### Site Recovery Manager (SRM): The Orchestration Engine

Site Recovery Manager (SRM) is a dedicated disaster recovery orchestration tool. It automates the entire failover and failback process, ensuring a fast and reliable recovery.

*   **Key Features:**
    *   **Automated Recovery Plans:** Create detailed recovery plans that specify the order in which VMs should be powered on, their IP address settings at the recovery site, and any custom scripts that need to be run.
    *   **Non-Disruptive Testing:** Test your recovery plans in an isolated network bubble without impacting your production workloads. This is crucial for verifying your RTOs (Recovery Time Objectives) and ensuring your DR plan works as expected.
    *   **Policy-Based Management:** Manage DR protection for large numbers of VMs using protection groups.
    *   **Push-Button Failover and Failback:** When a disaster strikes, you can initiate a failover with a single click. SRM also automates the process of failing back to the primary site once it's back online.

## How They Work Together: A Complete DR Solution

1.  **Replication:** vSphere Replication is configured to replicate VMs from the primary site to the secondary site.
2.  **Protection:** In SRM, you create "protection groups" to group together VMs that should be failed over together (e.g., all the VMs that make up a multi-tier application).
3.  **Orchestration:** You then create a "recovery plan" that contains one or more protection groups. The recovery plan is where you define the entire orchestration workflow: boot order, IP address changes, etc.
4.  **Testing:** You regularly test your recovery plan to ensure everything is working correctly.
5.  **Failover:** In the event of a disaster, you execute the recovery plan to fail over your workloads to the secondary site.
6.  **Failback:** Once the primary site is restored, you can use SRM to fail back your workloads.

## Conclusion

By combining the data-moving capabilities of vSphere Replication with the powerful orchestration engine of Site Recovery Manager, you can build a highly effective and reliable disaster recovery solution for your vSphere environment. The ability to automate the entire recovery process and conduct non-disruptive testing provides the confidence that you can meet your business's RTOs and RPOs in the face of a disaster.
