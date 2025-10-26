---
term: Cluster Level GPU Monitoring
category: Monitoring
---

Cluster Level GPU Monitoring, introduced in vSphere 8, provides a consolidated view of GPU compute and memory consumption within the vSphere Client. This feature offers both historical and real-time utilization data for GPUs across an entire cluster.

## Overview

Cluster Level GPU Monitoring provides:
- Centralized visibility of GPU resources across multiple hosts
- Real-time and historical GPU utilization data
- Performance metrics for both passthrough and vGPU configurations
- Integration with vSphere Client for unified monitoring
- Support for NVIDIA GPUs with vSphere 8 and later

## Key Features

### Centralized Monitoring
- Single pane of glass for GPU resource visibility
- Cluster-wide GPU utilization statistics
- Per-VM GPU consumption tracking
- Historical trend analysis
- Performance benchmarking capabilities

### Detailed Metrics
- GPU compute utilization percentage
- GPU memory consumption and allocation
- Frame buffer utilization
- Encoder/decoder utilization for media workloads
- Temperature and power consumption data

### Performance Insights
- Identification of GPU bottlenecks
- Detection of underutilized resources
- Capacity planning for GPU workloads
- Performance optimization recommendations
- Workload placement guidance

## Architecture

### Components
- **GPU Monitoring Service**: Collects and aggregates GPU metrics
- **vCenter Server**: Central repository for GPU performance data
- **vSphere Client**: User interface for GPU monitoring
- **ESXi Host Agents**: Local GPU metric collection
- **NVIDIA vGPU Manager**: GPU virtualization layer integration

### Data Flow
1. **Local Collection**: ESXi hosts collect GPU metrics from NVIDIA drivers
2. **Aggregation**: vCenter Server aggregates metrics from all hosts
3. **Storage**: Performance data stored in vCenter database
4. **Presentation**: vSphere Client displays metrics in dashboards
5. **Analysis**: Administrators analyze trends and performance patterns

## Configuration Examples

### Enabling GPU Monitoring
```powershell
# Check GPU monitoring status
Get-AdvancedSetting -Entity (Get-Cluster "GPUCluster") -Name "gpu.monitoring.enabled"

# Enable GPU monitoring on a cluster
Get-Cluster "GPUCluster" | New-AdvancedSetting -Name "gpu.monitoring.enabled" -Value $true -Confirm:$false
```

### ESXi CLI Configuration
```bash
# Check GPU status on ESXi host
esxcli graphics device list

# View GPU performance metrics
esxcli graphics stats get

# Check vGPU profiles
esxcli graphics vgpu profile list
```

## Requirements

### Hardware
- NVIDIA Tesla, Quadro, or A-series GPUs
- ESXi 8.0 or later with GPU support
- Compatible NVIDIA drivers
- Sufficient PCIe bandwidth and power

### Software
- vCenter Server 8.0 or later
- vSphere Client 8.0 or later
- NVIDIA vGPU software licenses
- Proper GPU licensing for monitored workloads

### Licensing
- **vSphere Enterprise Plus**: Required for advanced GPU features
- **NVIDIA vGPU Licenses**: Required for vGPU workloads
- **vSphere with Tanzu**: Enhanced GPU monitoring for containerized workloads

## Use Cases

### AI/ML Workloads
- Monitor training job resource consumption
- Optimize batch processing schedules
- Identify performance bottlenecks in neural networks
- Allocate appropriate GPU resources for inference
- Track experiment costs based on GPU usage

### Graphics-Intensive Applications
- CAD/CAM software performance monitoring
- Media rendering and encoding workloads
- Virtual desktop infrastructure (VDI) with GPU acceleration
- 3D modeling and simulation applications
- Scientific visualization and analysis

### Resource Planning
- Capacity planning for GPU deployments
- Right-sizing of GPU configurations
- Identification of consolidation opportunities
- Performance baseline establishment
- Trend analysis for future requirements

## Best Practices

1. **Baseline Establishment**: Create performance baselines for different workload types
2. **Regular Monitoring**: Schedule regular GPU performance reviews
3. **Capacity Planning**: Use historical data for future GPU capacity planning
4. **Workload Optimization**: Optimize workloads based on GPU utilization patterns
5. **Alerting**: Configure alerts for GPU performance thresholds
6. **Documentation**: Maintain documentation of GPU configurations and performance

## vSphere 8 Enhancements

### Enhanced Metrics
- Additional GPU performance counters
- Improved accuracy of utilization measurements
- Better integration with NVIDIA management tools
- Enhanced historical data retention
- More granular per-process GPU metrics

### User Interface Improvements
- Customizable GPU monitoring dashboards
- Enhanced charting and visualization options
- Better filtering and sorting capabilities
- Export functionality for reporting
- Mobile-friendly interface for remote monitoring

### Performance Improvements
- Reduced overhead for GPU metric collection
- Faster data aggregation and reporting
- Improved scalability for large GPU clusters
- Better handling of mixed GPU configurations
- Enhanced fault tolerance for monitoring services

## Troubleshooting Commands

```bash
# Check GPU device status
esxcli graphics device list

# View GPU statistics
esxcli graphics stats get

# Check vGPU configuration
esxcli graphics vgpu list

# Monitor GPU logs
tail -f /var/log/vmware/gpu.log

# Check GPU performance in real-time
watch -n 5 'esxcli graphics stats get'
```

## Related Technologies

- [vGPU (Virtual GPU)](/glossary/term/vgpu.md)
- [DirectPath I/O](/glossary/term/directpath-io.md)
- [vSphere Performance Charts](/glossary/term/vsphere-performance-charts.md)
- [vSphere with Tanzu](/glossary/term/vsphere-with-tanzu.md)
- [Resource Management](/glossary/term/resource-management.md)