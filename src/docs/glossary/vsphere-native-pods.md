---
term: vSphere Native Pods
category: Cloud Technologies
---

vSphere Native Pods are a construct within vSphere with Tanzu that allows containers to run directly on ESXi hosts without the need for a nested guest operating system. This provides a more efficient and secure way to run containerized workloads, leveraging the performance and security benefits of the ESXi hypervisor directly.

## How it Works

vSphere Native Pods are essentially lightweight virtual machines that are optimized to run containers. They are managed by the Supervisor Cluster and provide a Kubernetes-native experience for deploying and managing containerized applications. Each vSphere Native Pod has its own kernel and isolated resources, offering strong security boundaries.

## Benefits

*   **Enhanced Performance:** Eliminates the overhead of a guest operating system, leading to faster startup times and improved performance for containers.
*   **Strong Security Isolation:** Provides robust security isolation at the hypervisor level for each container.
*   **Simplified Management:** Integrates seamlessly with Kubernetes and vSphere management tools.
*   **Optimized Resource Utilization:** Efficiently utilizes ESXi host resources for containerized workloads.
