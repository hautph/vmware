---
term: vGPU (Virtual GPU)
category: Advanced_Features
---

vGPU (Virtual GPU) is a technology that enables multiple virtual machines to share a single physical GPU, providing GPU acceleration for graphics-intensive workloads like 3D rendering, machine learning, and scientific computing. vGPU technology virtualizes the GPU hardware, allowing for flexible allocation of GPU resources to different virtual machines based on their specific requirements.

## Overview

vGPU technology provides:
- Shared GPU resource allocation for multiple VMs
- Flexible GPU memory and compute resource distribution
- Support for graphics and compute workloads
- Integration with hypervisor management tools
- Hardware-accelerated performance for virtualized environments

## Key Features

### Resource Virtualization
- GPU memory partitioning and allocation
- Compute unit sharing between VMs
- Quality of Service (QoS) for GPU resources
- Dynamic resource adjustment
- Performance isolation between workloads

### Workload Support
- 3D graphics acceleration for desktop virtualization
- CUDA and OpenCL support for compute workloads
- Machine learning and AI training/inference
- Video encoding and decoding acceleration
- Scientific computing and simulation

### Management Capabilities
- Centralized GPU resource management
- Monitoring and performance analytics
- Policy-based resource allocation
- Integration with vSphere management tools
- Automated provisioning and configuration

## Architecture

### Components
- **Physical GPU**: NVIDIA Tesla, Quadro, or A-series hardware
- **vGPU Manager**: Software layer that virtualizes GPU resources
- **vGPU Drivers**: Guest OS drivers for GPU access
- **Hypervisor Integration**: ESXi support for vGPU operations
- **Management Interface**: vCenter Server integration for administration

### vGPU Types
- **Pass-through (VMDirectPath)**: Direct assignment of entire GPU to single VM
- **Shared vGPU**: Multiple VMs sharing GPU resources with defined profiles
- **Multi-Instance GPU (MIG)**: Partitioning of GPU into separate instances (A100/H100)

### Resource Allocation
- **Profile-Based**: Predefined resource allocations (e.g., 1Q, 2Q, 4Q)
- **Memory Partitioning**: GPU memory divided among VMs
- **Compute Sharing**: GPU compute units shared between workloads
- **Bandwidth Management**: Control of GPU memory and PCIe bandwidth

## Configuration Examples

### ESXi CLI Configuration
```bash
# List available vGPU profiles
esxcli graphics vgpu profile list

# Check GPU device status
esxcli graphics device list

# Enable vGPU on a VM (requires VM configuration)
vim-cmd vmsvc/devices.createx <vmid> "vgpu" "vgpu0" --profile "grid_p100-4q"

# View vGPU statistics
esxcli graphics stats get
```

### PowerCLI Configuration
```powershell
# Enable vGPU on a VM
$vm = Get-VM "GraphicsVM"
New-VGPU -VM $vm -VGPUProfile "grid_p100-4q"

# Check vGPU configuration
Get-VGPU -VM "GraphicsVM"

# List available vGPU profiles
Get-VGpuProfile -VMHost (Get-VMHost "esxi01.domain.com")
```

### VM Configuration
```xml
<!-- Sample VMX configuration for vGPU -->
vgpu.profile = "grid_p100-4q"
vgpu.enable = "TRUE"
```

## Requirements

### Hardware
- NVIDIA Tesla, Quadro, or A-series GPUs
- ESXi 6.7 or later with vGPU support
- Compatible NVIDIA vGPU software licenses
- Sufficient PCIe bandwidth and power
- Proper BIOS/UEFI settings

### Software
- vCenter Server 6.7 or later
- NVIDIA vGPU Manager software
- Guest OS with vGPU drivers
- Proper licensing for vGPU profiles
- Updated management tools

### Licensing
- **NVIDIA vGPU Licenses**: Required for shared vGPU profiles
- **vSphere Enterprise Plus**: Required for advanced GPU features
- **Profile-Specific Licenses**: Different license types for different profiles
- **Subscription Model**: Annual or perpetual licensing options

## Use Cases

### Graphics-Intense Workloads
- Virtual desktop infrastructure (VDI) with 3D graphics
- CAD/CAM software in virtualized environments
- Media and entertainment content creation
- Architectural and engineering design applications
- Scientific visualization and analysis

### Compute-Intensive Applications
- Machine learning and artificial intelligence
- Data analytics and big data processing
- Financial modeling and risk analysis
- Scientific simulations and research computing
- Cryptocurrency mining and blockchain applications

### Development and Testing
- GPU-accelerated development environments
- Testing of graphics and compute applications
- Training and education scenarios
- Proof of concept and demonstration environments
- Cross-platform development and testing

## Best Practices

1. **Profile Selection**: Choose appropriate vGPU profiles based on workload requirements
2. **Resource Planning**: Plan GPU resource allocation to avoid overcommitment
3. **Monitoring**: Monitor GPU utilization and performance metrics
4. **Updates**: Keep GPU drivers and vGPU software updated
5. **Backup**: Implement backup procedures for vGPU-enabled VMs
6. **Documentation**: Maintain documentation of vGPU configurations and policies

## vSphere 8 Enhancements

### Improved Performance
- Enhanced GPU memory management
- Better compute resource sharing
- Reduced overhead for vGPU operations
- Improved driver compatibility
- Faster provisioning and configuration

### Enhanced Management
- Better integration with vSphere Client
- Enhanced monitoring and reporting
- Simplified profile management
- Improved troubleshooting tools
- Better support for modern GPU architectures

### Security Improvements
- Enhanced isolation between VMs
- Better encryption support
- Improved access controls
- Enhanced audit capabilities
- Better compliance reporting

## Troubleshooting Commands

```bash
# Check GPU device status
esxcli graphics device list

# List vGPU profiles
esxcli graphics vgpu profile list

# View vGPU statistics
esxcli graphics stats get

# Check vGPU logs
tail -f /var/log/vmware/vgpu.log

# Verify vGPU configuration on VM
vim-cmd vmsvc/get.config <vmid> | grep -i vgpu
```

## Related Technologies

- [DirectPath I/O](/glossary/term/directpath-io.md)
- [Virtual TPM 2.0](/glossary/term/virtual-tpm-2-0.md)
- [vSphere with Tanzu](/glossary/term/vsphere-with-tanzu.md)
- [Cluster Level GPU Monitoring](/glossary/term/cluster-level-gpu-monitoring.md)
- [DPU](/glossary/term/dpu.md)