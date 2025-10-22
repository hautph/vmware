---
term: SR-IOV (Single Root I/O Virtualization)
category: Networking
---

SR-IOV (Single Root I/O Virtualization) is a hardware-assisted virtualization technology that allows a single physical PCI Express (PCIe) device to be shared directly by multiple virtual machines. This bypasses the hypervisor for I/O processing, providing near bare-metal performance and ultra-low latency for network and storage traffic within virtual machines.

## How it Works

SR-IOV-enabled network adapters or storage controllers create multiple virtual functions (VFs) from a single physical function (PF). Each VF can be assigned directly to a virtual machine, allowing the VM to communicate directly with the hardware device without the overhead of the hypervisor. This is particularly beneficial for I/O-intensive applications.

## Benefits

*   **Near Bare-Metal Performance:** Provides significantly higher throughput and lower latency for network and storage I/O.
*   **Reduced CPU Overhead:** Offloads I/O processing from the ESXi host CPU, freeing up resources for virtual machine workloads.
*   **Enhanced Security:** Isolates virtual machines at the hardware level, preventing interference between them.
*   **Suitable for I/O-Intensive Workloads:** Ideal for applications that require high network bandwidth or low storage latency, such as databases, high-performance computing (HPC), and network appliances.
