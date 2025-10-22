---
term: vSAN Original Storage Architecture (OSA)
category: Storage
---

vSAN Original Storage Architecture (OSA) refers to the traditional architecture of VMware vSAN that has been in use prior to the introduction of the vSAN Express Storage Architecture (ESA) in vSphere 8. OSA utilizes a two-tier architecture consisting of a cache tier for performance and a capacity tier for data storage.

## Key Characteristics

*   **Two-Tier Architecture:** Employs a cache tier (typically flash-based) for read/write caching and a capacity tier (HDD or SSD) for persistent data storage.
*   **Hybrid or All-Flash Configurations:** Can be deployed with a combination of flash and magnetic disks (hybrid) or entirely with flash devices (all-flash).
*   **Proven and Mature:** A well-established and widely adopted architecture for hyper-converged storage.

## Comparison with vSAN ESA

While OSA remains a viable and supported architecture, vSAN ESA in vSphere 8 offers an alternative, optimized for modern hardware and workloads, providing enhanced performance and efficiency through a single-tier design.
