---
term: VMkernel Networking
category: Networking
---

VMkernel Networking refers to the network interfaces and services provided by the ESXi VMkernel. These interfaces, known as VMkernel ports, are used for various management and infrastructure services, including vMotion, IP storage (NFS, iSCSI), vSAN, Fault Tolerance, and host management.

## Key Functions of VMkernel Ports

*   **Management Traffic:** Provides network connectivity for ESXi host management (e.g., vCenter Server, SSH).
*   **vMotion Traffic:** Facilitates the live migration of virtual machines between ESXi hosts.
*   **IP Storage Traffic:** Enables access to network-based storage such as NFS and iSCSI.
*   **vSAN Traffic:** Carries data and metadata traffic for vSAN clusters.
*   **Fault Tolerance Logging:** Used for logging data between primary and secondary Fault Tolerant virtual machines.
*   **vSphere Replication Traffic:** Handles data replication between source and target sites.

## Configuration

VMkernel ports are configured with IP addresses, subnet masks, and default gateways, and can be associated with specific VLANs and physical network adapters.
