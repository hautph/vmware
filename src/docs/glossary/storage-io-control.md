---
term: Storage I/O Control (SIOC)
category: Storage
---

Storage I/O Control (SIOC) is a feature that provides fair allocation of I/O resources to virtual machines sharing the same datastore. When storage I/O contention occurs, SIOC dynamically allocates available I/O resources to virtual machines based on their configured shares, ensuring that critical workloads receive preferential treatment.

## How it Works

SIOC monitors the I/O latency of datastores. When latency exceeds a configurable threshold, SIOC detects contention and begins to throttle the I/O of less important virtual machines, allowing more critical virtual machines to access the storage resources they need. This ensures that performance-sensitive applications maintain their required level of service.

## Benefits

*   **Fair I/O Allocation:** Ensures fair distribution of storage I/O resources among virtual machines.
*   **Performance Prioritization:** Allows administrators to prioritize I/O for critical workloads.
*   **Prevents I/O Contention:** Mitigates the impact of storage I/O bottlenecks on virtual machine performance.
*   **Automated Resource Management:** Dynamically adjusts I/O allocation based on real-time demand.
