---
term: SR-IOV Passthrough
category: Advanced_Technologies
---

SR-IOV Passthrough refers to the use of Single Root I/O Virtualization (SR-IOV) technology to provide virtual machines with direct access to a virtual function (VF) of a physical PCI Express (PCIe) device. While similar to DirectPath I/O in providing direct hardware access, SR-IOV allows a single physical device to be shared among multiple virtual machines, each accessing its own dedicated VF.

## How it Works

An SR-IOV-enabled physical device (e.g., network adapter) presents multiple VFs to the hypervisor. Each VF appears as a separate, independent PCIe device. These VFs can then be assigned directly to individual virtual machines. The virtual machine's guest operating system interacts directly with its assigned VF, bypassing the hypervisor's virtualization layer for that specific I/O path.

## Benefits

*   **Near Bare-Metal Performance:** Provides significantly higher throughput and lower latency for network and storage I/O compared to traditional virtualized I/O.
*   **Reduced CPU Overhead:** Offloads I/O processing from the ESXi host CPU, freeing up resources for virtual machine workloads.
*   **Device Sharing:** Allows a single physical device to be shared among multiple virtual machines, optimizing hardware utilization.
*   **Enhanced Security:** Isolates virtual machines at the hardware level, preventing interference between them.
*   **Suitable for I/O-Intensive Workloads:** Ideal for applications that require high network bandwidth or low storage latency, such as databases, high-performance computing (HPC), and network appliances.

## Comparison with DirectPath I/O

Unlike DirectPath I/O, which dedicates an entire physical device to a single VM, SR-IOV Passthrough allows multiple VMs to share a single physical device by accessing its virtual functions. This offers a more flexible and scalable approach to direct hardware access.

## Related Technologies

- [DirectPath I/O](/glossary/term/directpath-io.md)
- [vGPU (Virtual GPU)](/glossary/term/vgpu.md)
- [DPU](/glossary/term/dpu.md)
- [NIC Teaming](/glossary/term/nic-teaming.md)
- [VM Migration](/glossary/term/vm-migration.md)