---
title: vSphere 8 vs vSphere 7: What's New?
category: Release Notes
excerpt: Overview of key new features and enhancements in VMware vSphere 8 compared to vSphere 7, including DPU support, scalability improvements, AI/ML optimizations, and lifecycle management.
---

# vSphere 8 vs vSphere 7: What's New?

VMware vSphere 8 represents a significant evolution from vSphere 7, introducing a range of new features and enhancements focused on supporting modern, cloud-native workloads, improving performance and scalability, and simplifying management. This article provides a high-level overview of the key differences between vSphere 8 and vSphere 7.

## Key Innovations in vSphere 8

### 1. Distributed Services Engine (DPU Support)

Perhaps the most significant architectural change in vSphere 8 is the introduction of the **Distributed Services Engine**. This feature allows vSphere to offload networking and security services from the server's CPU to Data Processing Units (DPUs).

*   **Benefits:**
    *   **Improved Performance:** Frees up CPU cycles for application workloads, leading to better overall performance.
    *   **Enhanced Security:** Isolates networking and security functions from the host CPU, reducing the attack surface.
    *   **Simplified Management:** Centralizes management of network and security services.

### 2. Scalability and Performance

vSphere 8 increases the scalability limits of the platform:

*   **Increased VM Density:** Support for up to 10,000 VMs per cluster (up from 8,000 in vSphere 7).
*   **Enhanced vGPU Support:** Up to 8 vGPU devices per VM.
*   **Improved DRS:** The Distributed Resource Scheduler (DRS) has been enhanced to make more intelligent workload placement decisions, especially for workloads using persistent memory.

### 3. AI/ML Workload Optimization

vSphere 8 includes several enhancements specifically for AI/ML workloads:

*   **Enhanced GPU Virtualization:** More efficient sharing and utilization of powerful GPU resources.
*   **Optimized Resource Scheduling:** Better scheduling of AI/ML training and inference workloads.
*   **Support for new hardware:** Including Intel Xeon Max Series processors with High Bandwidth Memory (HBM).

### 4. Lifecycle Management (vLCM)

vSphere Lifecycle Manager (vLCM) sees significant improvements:

*   **Standalone Host Support:** vLCM can now manage standalone ESXi hosts, not just clusters.
*   **Live Patching:** A critical new feature that allows for the patching of live ESXi hosts without requiring a reboot or workload evacuation, dramatically reducing downtime.
*   **vSphere Configuration Profiles (Technical Preview):** A new way to manage cluster configurations, moving towards a desired-state configuration model.

### 5. vSphere with Tanzu

vSphere 8 simplifies and enhances the integration with Tanzu for running Kubernetes workloads:

*   **Unified Tanzu Kubernetes Grid:** A single, unified Kubernetes runtime for a more consistent experience.
*   **Workload Availability Zones:** Allows Kubernetes clusters to span across vSphere clusters, increasing resilience and simplifying multi-cluster management.

### 6. Security Enhancements

vSphere 8 continues to strengthen the security of the platform:

*   **TLS 1.2 Mandate:** Support for older TLS 1.0 and 1.1 protocols has been removed.
*   **TPM 2.0 Requirement:** Deprecates TPM 1.2 in favor of the more secure TPM 2.0 standard.
*   **Enhanced Workload Security:** Various improvements to VM encryption and secure boot processes.

### 7. Green Metrics

A new feature that provides visibility into the energy consumption of the vSphere infrastructure. This helps organizations track their carbon footprint and work towards more energy-efficient operations.

### 8. Virtual Hardware Version 20

A new virtual hardware version that introduces support for:

*   Higher resource maximums for VMs.
*   Virtual NUMA topology.
*   Enhanced DirectPath I/O.

## Summary

vSphere 8 is a major release that builds upon the solid foundation of vSphere 7. The introduction of DPUs, significant lifecycle management improvements like live patching, and the continued focus on AI/ML and Kubernetes workloads make it a compelling upgrade for organizations looking to modernize their infrastructure and improve operational efficiency.
