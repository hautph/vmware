---
term: Supervisor Cluster
category: Cloud Technologies
---

A Supervisor Cluster is a key component of vSphere with Tanzu. It is a special type of Kubernetes cluster that runs directly on ESXi hosts and serves as the control plane for managing the lifecycle of other Kubernetes clusters (Tanzu Kubernetes Grid clusters) and vSphere Pods. The Supervisor Cluster enables developers to provision and deploy containerized applications directly on vSphere infrastructure using Kubernetes APIs.

## Key Functions

*   **Kubernetes Control Plane:** Provides the Kubernetes API server and other control plane components for managing Kubernetes resources.
*   **Lifecycle Management:** Manages the creation, scaling, and deletion of Tanzu Kubernetes Grid clusters and vSphere Pods.
*   **Resource Management:** Allocates and manages underlying vSphere resources (compute, storage, network) for Kubernetes workloads.
*   **Integrated with vCenter Server:** Managed and monitored through vCenter Server, providing a unified management experience for both virtual machines and containers.

## Benefits

*   **Unified Platform:** Integrates Kubernetes directly into vSphere, providing a single platform for virtual machines and containers.
*   **Developer Self-Service:** Enables developers to provision and manage Kubernetes resources using familiar Kubernetes tools.
*   **Operational Consistency:** Allows vSphere administrators to manage Kubernetes infrastructure using their existing vSphere skills and tools.
*   **Enhanced Security:** Leverages vSphere's security features to provide a secure environment for Kubernetes workloads.
