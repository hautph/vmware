---
term: Port Group
category: Networking
---

A Port Group is a logical grouping of ports on a vSphere Standard Switch (VSS) or vSphere Distributed Switch (VDS). Port groups define the network connectivity and policies for virtual machines and VMkernel ports. Each port group is configured with specific settings such as VLAN ID, security policies, and traffic shaping.

## Key Characteristics

*   **Network Segmentation:** Allows for the creation of logically separate networks within the vSphere environment using VLANs.
*   **Policy Enforcement:** Applies consistent network policies (e.g., security, traffic shaping) to all virtual machines or VMkernel ports connected to the port group.
*   **Simplified Management:** Simplifies network configuration by allowing administrators to manage a group of ports as a single entity.

## Types of Port Groups

*   **Virtual Machine Port Group:** Used to connect virtual machines to the network.
*   **VMkernel Port Group:** Used for VMkernel services such as vMotion, vSAN, and management.
