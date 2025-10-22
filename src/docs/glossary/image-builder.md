---
term: Image Builder
category: Management Tools
---

Image Builder is a component of vSphere Lifecycle Manager (vLCM) that allows administrators to create custom ESXi images. These custom images can include specific drivers, patches, and software components, enabling organizations to tailor their ESXi deployments to meet their unique hardware and software requirements.

## How it Works

Image Builder allows administrators to select a base ESXi image and then add or remove VIBs (vSphere Installation Bundles) to create a customized image. These custom images can then be used with Auto Deploy for automated ESXi host provisioning or with vLCM for cluster-wide image management.

## Benefits

*   **Customized ESXi Images:** Enables the creation of ESXi images tailored to specific hardware and software needs.
*   **Driver Inclusion:** Allows for the inclusion of necessary drivers for specialized hardware that may not be part of the default ESXi image.
*   **Simplified Patching:** Integrates patches and updates directly into the ESXi image, simplifying the patching process.
*   **Consistent Deployments:** Ensures that all ESXi hosts are deployed with a consistent and standardized image.
*   **Reduced Footprint:** Allows for the creation of minimal ESXi images by removing unnecessary components.
