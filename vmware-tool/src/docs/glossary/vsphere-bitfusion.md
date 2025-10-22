---
term: vSphere Bitfusion
category: Advanced Technologies
---

vSphere Bitfusion is a technology that allows the disaggregation and sharing of GPU resources across the network. It enables multiple users or virtual machines to share a single physical GPU, or for a single virtual machine to access multiple GPUs located on different physical servers. This optimizes the utilization of expensive GPU resources, particularly for AI/ML and high-performance computing (HPC) workloads.

## How it Works

Bitfusion virtualizes GPUs and makes them available as a shared resource pool. When a virtual machine requires GPU acceleration, it can dynamically connect to available GPUs over the network. The Bitfusion client software running in the virtual machine intercepts GPU calls and redirects them to the remote physical GPU, making it appear as if the GPU is locally attached.

## Benefits

*   **GPU Resource Sharing:** Maximizes the utilization of expensive GPU hardware by allowing multiple users or VMs to share them.
*   **Flexible GPU Allocation:** Dynamically allocates GPU resources to virtual machines based on demand.
*   **Reduced Costs:** Optimizes GPU investments by improving utilization and reducing the need for dedicated GPUs per server.
*   **Accelerated AI/ML and HPC:** Provides efficient access to GPU resources for compute-intensive workloads.
