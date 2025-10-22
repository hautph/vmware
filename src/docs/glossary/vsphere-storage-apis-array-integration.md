---
term: vSphere Storage APIs - Array Integration (VAAI)
category: Storage
---

vSphere Storage APIs - Array Integration (VAAI) is a set of APIs that enable ESXi hosts to offload certain storage operations to the storage array hardware. By leveraging the intelligence of the storage array, VAAI reduces the overhead on the ESXi host, improves performance, and frees up CPU cycles for virtual machine workloads.

## Key Primitives (Operations)

*   **Full Copy (Hardware-assisted copy):** Allows the storage array to perform full virtual machine disk copies, rather than the ESXi host.
*   **Block Zeroing (Hardware-assisted zeroing):** Enables the storage array to zero out large blocks of data, speeding up the creation of eager-zeroed thick virtual disks.
*   **Hardware-assisted Locking (Atomic Test & Set - ATS):** Improves the performance of locking mechanisms on VMFS datastores, especially in large environments.
*   **Thin Provisioning Stun/Unmap:** Allows the storage array to reclaim unused space from thin-provisioned virtual disks.

## Benefits

*   **Improved Performance:** Offloads storage operations to the array, reducing ESXi host CPU utilization and improving I/O performance.
*   **Reduced Network Traffic:** Minimizes the amount of data transferred over the network for certain storage operations.
*   **Enhanced Scalability:** Allows for more efficient use of storage resources and supports larger virtualized environments.
