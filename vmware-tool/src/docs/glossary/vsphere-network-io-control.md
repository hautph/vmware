---
term: vSphere Network I/O Control (NIOC)
category: Networking
---

vSphere Network I/O Control (NIOC) is a feature that allows administrators to prioritize network bandwidth for different types of traffic on a vSphere Distributed Switch (VDS). NIOC ensures that critical workloads receive the necessary network resources, even during periods of network congestion, by dynamically allocating bandwidth based on predefined policies.

## How it Works

NIOC monitors the network bandwidth utilization on the uplinks of a VDS. When congestion occurs, NIOC enforces resource allocation based on shares, reservations, and limits configured for different network resource pools (e.g., vMotion, vSAN, Fault Tolerance, virtual machine traffic). This ensures that high-priority traffic is not starved of bandwidth by lower-priority traffic.

## Benefits

*   **Network Performance Prioritization:** Guarantees network bandwidth for critical applications and services.
*   **Prevents Network Congestion:** Mitigates the impact of network bottlenecks on virtual machine performance.
*   **Optimized Resource Utilization:** Ensures efficient use of network resources by dynamically allocating bandwidth.
*   **Policy-Based Management:** Allows for granular control over network resource allocation based on business requirements.
