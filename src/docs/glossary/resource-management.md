---
term: Resource Management
category: Resource_Management
---

Resource Management in vSphere refers to the set of features and capabilities that allow administrators to allocate, monitor, and control the consumption of compute (CPU), memory, storage, and network resources within a virtualized environment. The goal of resource management is to ensure that all virtual machines and applications receive the necessary resources to perform optimally, while also maximizing the utilization of underlying physical hardware.

## Key Concepts

*   **Resource Pools:** Logical groupings of CPU and memory resources that can be used to partition and delegate control over resources.
*   **Shares:** Define the relative priority or importance of a virtual machine or resource pool when there is contention for resources.
*   **Reservations:** Guarantee a minimum amount of CPU or memory resources for a virtual machine or resource pool.
*   **Limits:** Set an upper bound on the amount of CPU or memory resources that a virtual machine or resource pool can consume.
*   **DRS (Distributed Resource Scheduler):** Automates the balancing of compute workloads across hosts in a cluster.
*   **Storage DRS:** Automates the balancing of storage workloads across datastores in a datastore cluster.
*   **Network I/O Control (NIOC):** Prioritizes network bandwidth for different types of traffic.

## Benefits

*   **Optimized Performance:** Ensures that critical applications receive the resources they need for optimal performance.
*   **Efficient Resource Utilization:** Maximizes the use of physical hardware resources, reducing costs.
*   **Predictable Performance:** Provides consistent and predictable performance for virtual machines.
*   **Simplified Administration:** Automates resource allocation and management, reducing manual effort.
*   **SLA Compliance:** Helps in meeting Service Level Agreements (SLAs) for critical workloads.
