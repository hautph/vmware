---
term: esxtop
category: Monitoring_Management
---

esxtop is a command-line performance monitoring tool for VMware ESXi that provides real-time statistics on CPU, memory, disk, and network usage, helping administrators troubleshoot performance issues. It is the ESXi equivalent of the Linux top command, but specifically designed for VMware environments with detailed metrics for virtualization-specific components.

## Overview

esxtop provides:
- Real-time performance monitoring of ESXi hosts
- Detailed metrics for CPU, memory, disk, and network subsystems
- Interactive and batch mode operation
- Customizable display options and filters
- Historical data collection for trend analysis

## Key Features

### Performance Monitoring
- Real-time display of system resource utilization
- Detailed per-VM and per-world statistics
- Historical data collection for performance analysis
- Customizable refresh intervals
- Multiple display modes for different resource types

### Resource Analysis
- CPU utilization and scheduling metrics
- Memory allocation and consumption tracking
- Disk I/O performance and latency measurements
- Network throughput and packet statistics
- Storage path and adapter performance

### Interactive Capelines
- Dynamic sorting of performance metrics
- Filtering by VM, world, or resource type
- Customizable field selection and display
- Real-time adjustment of monitoring parameters
- Snapshot capture for offline analysis

## Architecture

### Components
- **esxtop Command**: Main executable for performance monitoring
- **VMkernel Interface**: Direct access to ESXi performance data
- **Display Engine**: Text-based interface for metric visualization
- **Data Collection**: Real-time sampling of system performance counters

### Operating Modes
- **Interactive Mode**: Real-time display with user controls
- **Batch Mode**: Automated data collection to files
- **Replay Mode**: Analysis of previously collected data

## Usage Examples

### Interactive Mode
```bash
# Launch esxtop in interactive mode
esxtop

# Keyboard shortcuts in interactive mode:
# 'c' - Switch to CPU display
# 'm' - Switch to memory display
# 'd' - Switch to disk adapter display
# 'n' - Switch to network display
# 'i' - Toggle world display
# 'f' - Add/remove fields
# 's' - Change delay time
# 'W' - Write configuration file
```

### Batch Mode
```bash
# Run esxtop in batch mode for 10 iterations with 5-second intervals
esxtop -b -n 10 -d 5 > performance.log

# Collect specific counter data
esxtop -b -n 1 -c /path/to/counters.conf > snapshot.log

# Run continuously with custom output format
esxtop -b -d 10 -f /path/to/custom.fields > continuous.log
```

### Replay Mode
```bash
# Analyze previously collected data
esxtop -R performance.log
```

## Display Types

### CPU Display
- Physical CPU utilization (%PCPU)
- Logical CPU utilization (%LCPU)
- Ready time and wait time metrics
- Co-stop and migration statistics
- Power management states

### Memory Display
- Total, used, and free memory
- Ballooning and swapping metrics
- Memory allocation per VM
- Transparent page sharing statistics
- Memory compression efficiency

### Disk Adapter Display
- I/O operations per second (IOPS)
- Throughput in KB/s
- Average latency measurements
- Queue depth statistics
- Command abort and reset counts

### Network Display
- Packets per second (PPS)
- Throughput in KB/s
- Drop and error statistics
- Multicast and broadcast traffic
- Link speed and duplex settings

## Configuration

### Configuration File
```ini
# Default esxtop configuration (~/.esxtop50rc)
# Field selection and display preferences
# Sort order and filter settings
# Custom counter definitions
```

### Environment Variables
```bash
# Set custom configuration file location
export ESTOP=$HOME/.esxtoprc

# Specify default delay time
export DELAY=5

# Set number of iterations for batch mode
export ITERATIONS=100
```

## Best Practices

1. **Baseline Collection**: Establish performance baselines during normal operations
2. **Regular Monitoring**: Schedule regular performance monitoring sessions
3. **Threshold Setting**: Define performance thresholds for alerting
4. **Data Retention**: Implement data retention policies for historical analysis
5. **Correlation**: Correlate performance data with application behavior
6. **Documentation**: Document performance findings and resolutions

## Advanced Features

### Custom Fields
- Define custom performance metrics
- Create calculated fields from existing counters
- Export specific metrics for specialized analysis
- Integrate with external monitoring tools

### Filtering
- Filter by VM name or ID
- Filter by resource pool or cluster
- Filter by world or group ID
- Combine multiple filter criteria

### Scripting Integration
- Automate performance data collection
- Integrate with monitoring and alerting systems
- Generate custom reports and dashboards
- Trigger actions based on performance thresholds

## Troubleshooting Commands

```bash
# Check esxtop version
esxtop -v

# List available counters
esxtop -L

# Display help information
esxtop -h

# Check system load
esxtop -b -n 1 | grep "Load average"

# Monitor specific VM performance
esxtop -b -n 1 | grep "VMNAME"
```

## Comparison with Other Tools

| Tool | Purpose | Real-time | Batch Mode | VM Specific |
|------|---------|-----------|------------|-------------|
| esxtop | Comprehensive ESXi monitoring | Yes | Yes | Yes |
| resxtop | Remote ESXi monitoring | Yes | Yes | Yes |
| vm-support | Diagnostic data collection | No | Yes | Yes |
| vSphere Client | GUI-based monitoring | Yes | Limited | Yes |
| PowerCLI | Programmatic monitoring | No | Yes | Yes |

## Related Technologies

- [vSphere Performance Charts](/glossary/term/vsphere-performance-charts.md)
- [vSphere Health Monitoring](/glossary/term/vsphere-health-monitoring.md)
- [Resource Management](/glossary/term/resource-management.md)
- [DRS](/glossary/term/drs.md)
- [Performance Tuning](/knowledge/article/performance-tuning-in-vsphere-8)