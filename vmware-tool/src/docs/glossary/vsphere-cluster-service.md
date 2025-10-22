---
term: vSphere Cluster Services (vCLS)
category: High Availability
---

vSphere Cluster Services (vCLS) is a new feature introduced in vSphere 7 and enhanced in vSphere 8 that runs as a set of small, purpose-built virtual machines on each ESXi host within a cluster. vCLS ensures the health and availability of cluster services, such as vSphere HA and DRS, even if vCenter Server becomes unavailable.

## How it Works

vCLS deploys a maximum of three tiny virtual machines per cluster, which are automatically managed by vCenter Server. These VMs are responsible for maintaining the health and quorum of the cluster services. If vCenter Server goes offline, vCLS ensures that HA and DRS continue to function, providing a more robust and resilient cluster infrastructure.

## Benefits

*   **Decoupled Cluster Services:** Ensures that core cluster services remain operational even if vCenter Server is down.
*   **Enhanced Resilience:** Improves the overall resilience of the vSphere cluster by eliminating vCenter Server as a single point of failure for HA and DRS.
*   **Simplified Management:** vCLS VMs are automatically deployed and managed by vCenter Server, requiring minimal administrative effort.
*   **Embedded vCLS (vSphere 8 Update 3):** These vCLS VMs operate without a storage footprint, running entirely in host memory using CRX runtime technology. They are system-managed and crucial for DRS and HA functionality.
