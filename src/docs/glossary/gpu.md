---
term: GPU (Graphics Processing Unit)
category: Hardware
---

A Graphics Processing Unit (GPU) is a specialized electronic circuit designed to rapidly manipulate and alter memory to accelerate the creation of images in a frame buffer intended for output to a display device. In modern virtualized environments, GPUs can be shared among multiple virtual machines through GPU virtualization technologies, enabling graphics-intensive workloads like 3D rendering, machine learning, and scientific computing.

## Overview

GPU provides:
- Parallel processing capabilities for graphics and compute workloads
- High-throughput processing for data-intensive applications
- Hardware acceleration for specific algorithms
- Virtual GPU support for multiple virtual machines

## Key Features

### Graphics Processing
- **Rasterization**: Conversion of 3D models to 2D images
- **Shading**: Application of lighting and texture effects
- **Rendering**: Generation of final images for display
- **Anti-aliasing**: Smoothing of jagged edges in images

### Compute Capabilities
- **Parallel Processing**: Thousands of cores for simultaneous operations
- **High Memory Bandwidth**: Fast data transfer for processing
- **Floating Point Performance**: High precision mathematical operations
- **Specialized Instructions**: Support for graphics and compute operations

### Virtualization Support
- **vGPU**: Virtual GPU technology for shared GPU resources
- **DirectPath I/O**: Direct GPU assignment to VMs
- **GPU Passthrough**: Dedicated GPU access for VMs
- **Shared GPU**: Time-sliced GPU access for multiple VMs

## Architecture

### Core Components
- **Streaming Multiprocessors**: Processing units for parallel execution
- **Memory Subsystem**: High-speed memory for data storage
- **Raster Operations Units**: Hardware for pixel processing
- **Texture Units**: Specialized processors for texture mapping

### Memory Architecture
- **Video Memory (VRAM)**: Dedicated memory for GPU operations
- **Memory Controllers**: Management of memory access patterns
- **Cache Hierarchy**: L1 and L2 cache for performance optimization
- **Bandwidth Optimization**: Techniques for maximizing memory throughput

### Compute Architecture
- **CUDA Cores**: Processing units in NVIDIA GPUs
- **Stream Processors**: Processing units in AMD GPUs
- **Tensor Cores**: Specialized units for AI/ML operations
- **RT Cores**: Ray tracing acceleration units

## Virtualization in VMware

### GPU Virtualization Technologies
- **vSphere with Tanzu**: Integrated GPU support for Kubernetes workloads
- **vSGA**: Shared GPU architecture for multiple VMs
- **vDGA**: Dedicated GPU assignment for single VMs
- **vGPU**: Virtual GPU technology for flexible resource allocation

### Resource Management
- **GPU Profiles**: Predefined GPU resource allocations
- **Memory Partitioning**: Division of GPU memory among VMs
- **Compute Scheduling**: Management of GPU compute workloads
- **Performance Monitoring**: Tracking of GPU utilization and performance

### Configuration Options
- **Static Assignment**: Fixed GPU allocation to VMs
- **Dynamic Allocation**: Flexible GPU resource distribution
- **Quality of Service**: Performance guarantees for GPU workloads
- **Load Balancing**: Distribution of GPU workloads across resources

## Configuration Examples

### ESXi GPU Configuration
```bash
# View GPU information
esxcli graphics device list

# Check GPU scheduling settings
esxcli system settings advanced list -o /Graphics/

# View GPU memory information
esxcli graphics device get -d <device-id>

# Check GPU power management
esxcli system settings advanced list -o /Power/GpuPolicy
```

### PowerCLI GPU Management
```powershell
# View GPU information for ESXi hosts
Get-VMHost | Get-View | Select-Object Name, @{N="GPUs";E={$_.Hardware.Gpu}}

# Configure GPU profile for a VM
Get-VM "MyVM" | New-AdvancedSetting -Name "pciPassthru.use64bitMMIO" -Value 1 -Confirm:$false

# Enable GPU passthrough for a VM
Get-VM "MyVM" | New-AdvancedSetting -Name "pciPassthru.0.functionId" -Value 0 -Confirm:$false

# Set GPU memory reservation for a VM
Get-VM "MyVM" | Get-View | Select-Object Name, @{N="GpuMemory";E={$_.Config.Hardware.Device | Where-Object {$_.DeviceInfo.Label -like "*GPU*"}}}
```

## Requirements

### Hardware
- **Compatible GPUs**: NVIDIA or AMD GPUs with virtualization support
- **Minimum Memory**: Sufficient VRAM for workload requirements
- **Compute Capability**: Appropriate compute power for applications
- **Power Requirements**: Adequate power supply for GPU operation

### Software
- **ESXi 6.5 or later**: Hosts with GPU virtualization support
- **vCenter Server**: Centralized GPU resource management
- **VMware Tools**: Guest OS optimization for GPU usage
- **Appropriate Licensing**: vSphere licensing for GPU resources

### Compatibility
- **GPU Models**: Support for specific GPU models and generations
- **Driver Versions**: Compatibility with required GPU drivers
- **Virtualization Features**: Support for GPU virtualization technologies
- **Power Management**: Compatibility with GPU power management features

## Use Cases

### Graphics Workloads
- **3D Rendering**: Accelerated rendering for design and media applications
- **Video Processing**: Real-time video encoding and decoding
- **CAD/CAM**: Hardware acceleration for engineering applications
- **Desktop Virtualization**: Enhanced graphics for virtual desktops

### Compute Workloads
- **Machine Learning**: GPU acceleration for AI/ML training and inference
- **Scientific Computing**: High-performance computing for research
- **Financial Modeling**: Parallel processing for financial calculations
- **Data Analytics**: Accelerated processing for big data applications

### Gaming and Entertainment
- **Game Development**: Real-time rendering for game development
- **Virtual Reality**: Hardware acceleration for VR applications
- **Streaming**: GPU encoding for video streaming services
- **Content Creation**: Accelerated video and image editing

## Best Practices

1. **Workload Assessment**: Evaluate GPU requirements for specific applications
2. **Resource Planning**: Properly size GPU resources for workloads
3. **Monitoring**: Regularly monitor GPU utilization and performance
4. **Driver Management**: Keep GPU drivers updated for optimal performance
5. **Power Management**: Configure appropriate GPU power policies
6. **Memory Allocation**: Ensure adequate GPU memory for applications
7. **Cooling**: Provide adequate cooling for GPU-intensive workloads

## vSphere 8 Enhancements

### GPU Performance Improvements
- **Enhanced vGPU Support**: Better virtual GPU technology support
- **Improved DirectPath I/O**: Enhanced GPU passthrough performance
- **Reduced Overhead**: Lower virtualization overhead for GPU operations
- **Better Scalability**: Improved performance with high-end GPUs

### Security Enhancements
- **Secure GPU Access**: Enhanced security for GPU operations
- **Memory Encryption**: Hardware-based GPU memory encryption support
- **Attestation**: Better GPU attestation and verification
- **Isolation**: Improved isolation between GPU workloads

### Management Features
- **Advanced Monitoring**: Enhanced GPU performance monitoring
- **Automated Optimization**: Automated GPU resource optimization
- **Improved Troubleshooting**: Better tools for GPU performance analysis
- **Streamlined Configuration**: Simplified GPU configuration workflows

## Troubleshooting Commands

```bash
# Check GPU information
esxcli graphics device list

# View GPU utilization
esxtop  # Press 'g' to view GPU-specific information

# Check GPU scheduling settings
esxcli system settings advanced list -o /Graphics/

# View GPU memory information
esxcli graphics device get -d <device-id>

# Check GPU power management
esxcli system settings advanced list -o /Power/GpuPolicy

# View GPU passthrough configuration
vim-cmd vmsvc/device.getdevices <vmid> | grep -i gpu

# Check for GPU performance issues
tail -f /var/log/vmkernel.log | grep -i gpu
```

## Related Technologies

- [ESXi](/glossary/term/esxi.md)
- [vSphere](/glossary/term/vsphere.md)
- [DirectPath I/O](/glossary/term/directpath-io.md)
- [vGPU](/glossary/term/vgpu.md)
- [PCI Passthrough](/glossary/term/pci-passthrough.md)
- [Resource Management](/glossary/term/resource-management.md)