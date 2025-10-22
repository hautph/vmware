---
title: vSAN 8 ESA Deep Dive
category: Storage
excerpt: Deep dive into VMware vSAN 8 Express Storage Architecture (ESA), a new architecture designed for modern NVMe flash storage with single-tier design and improved performance.
---

# vSAN 8 ESA Deep Dive

VMware vSAN 8 introduces a groundbreaking new architecture: the Express Storage Architecture (ESA). ESA is an optional, alternative architecture to the vSAN Original Storage Architecture (OSA) and is designed from the ground up to leverage the full potential of modern hardware, particularly high-performance NVMe flash storage.

## ESA vs. OSA: A Fundamental Shift

The Express Storage Architecture represents a significant departure from the traditional vSAN architecture. Here are the core differences:

*   **Single-Tier Architecture:** Unlike OSA's two-tier design, which uses a cache tier and a capacity tier, ESA employs a single tier of high-performance NVMe devices. This eliminates the need for dedicated caching devices and simplifies the storage architecture.
*   **No Disk Groups:** ESA does away with the concept of disk groups. Instead, all NVMe devices on a host contribute to a single, unified storage pool. This simplifies management, reduces failure domains, and improves resource utilization.
*   **New Log-Structured File System:** ESA features a new log-structured file system that is highly optimized for write performance. It reduces write amplification and lowers write latency, resulting in better overall performance and increased endurance for flash devices.

## Key Features and Benefits of vSAN 8 ESA

### Performance and Efficiency

*   **Optimized for NVMe:** ESA is built to extract maximum performance from NVMe drives, delivering significantly higher IOPS and lower latency compared to OSA.
*   **RAID-6 at RAID-1 Performance:** ESA's design allows it to provide the space efficiency of RAID-6 with performance comparable to RAID-1.
*   **Improved CPU Efficiency:** By offloading tasks and optimizing the data path, ESA reduces the CPU overhead associated with storage operations.
*   **Enhanced Compression:** ESA offers up to 4x better data compression compared to OSA, leading to a lower total cost of ownership (TCO). Compression is enabled by default.

### Advanced Data Services

*   **Scalable Snapshots:** A new, high-performance snapshot engine provides faster and more consistent snapshots with minimal impact on VM performance. It supports up to 200 snapshots per VM.
*   **Adaptive RAID-5/6:** ESA can dynamically adjust its erasure coding scheme to fit the size of the cluster, allowing even smaller clusters to benefit from the space efficiency of RAID-5.
*   **Efficient Encryption:** Encryption is performed higher up in the storage stack, after compression. This minimizes the performance impact of encryption and reduces I/O overhead.

### Simplified Operations

*   **No More Disk Groups:** The removal of disk groups simplifies storage provisioning and management.
*   **Reduced Failure Domains:** With a single storage pool per host, the impact of a device failure is minimized.
*   **Adaptive Network Traffic Shaping:** ESA can prioritize VM traffic over resynchronization traffic during periods of network contention, ensuring application performance is not affected.

## Requirements and Considerations

*   **Hardware:** ESA requires vSAN ReadyNodes with high-performance NVMe devices.
*   **Networking:** A minimum of 25Gbps networking is required for ESA.
*   **Licensing:** A vSAN Advanced or Enterprise license is needed to use ESA.
*   **Migration:** There is no in-place upgrade from OSA to ESA. Migrating to ESA requires creating a new cluster and moving workloads using vMotion and Storage vMotion.
*   **Coexistence:** Both OSA and ESA clusters can be managed by the same vCenter Server, allowing for a gradual transition.

## Conclusion

vSAN 8's Express Storage Architecture is the future of hyperconverged infrastructure. By redesigning the storage stack for modern hardware, ESA delivers unprecedented levels of performance, efficiency, and simplicity. While OSA will continue to be supported, ESA is the clear choice for new vSAN deployments and hardware refreshes.
