---
title: NetFlow
category: Networking
---

NetFlow is a network protocol developed by Cisco for collecting IP traffic information and monitoring network traffic patterns. In VMware vSphere environments, NetFlow is used to analyze network traffic, troubleshoot connectivity issues, and monitor bandwidth utilization across virtual networks.

## Overview

NetFlow provides:
- Network traffic analysis and monitoring
- Bandwidth utilization reporting
- Security threat detection capabilities
- Network performance troubleshooting
- Traffic pattern analysis for capacity planning

## How NetFlow Works

### Data Collection Process
1. Flows are identified based on specific criteria (source/destination IP, ports, protocols)
2. Flow information is collected and stored in flow records
3. Records are exported to NetFlow collectors for analysis
4. Data is processed and presented in reports or dashboards

### Flow Definition
A flow is defined by these seven key fields:
- Source IP address
- Destination IP address
- Source port
- Destination port
- Layer 3 protocol type
- Type of Service (ToS)
- Input logical interface

## Configuration Example

Configuring NetFlow on vSphere Distributed Switch:

```powershell
# Enable NetFlow on VDS
$vds = Get-VDSwitch "VDS-Production"
$netflow = New-Object VMware.Vim.VDSNetFlowConfig
$netflow.activeFlowTimeout = 60
$netflow.idleFlowTimeout = 15
$netflow.samplingRate = 0
$netflow.internalFlowsOnly = $false
$netflow.observationDomainId = 12345

# Apply NetFlow configuration
$vds.ExtensionData.Config.NetworkResourceManagement = $true
$vds.ExtensionData.Config.IpfixConfig = $netflow
```

ESXi CLI configuration:

```bash
# Configure NetFlow on standard vSwitch
esxcli network vswitch standard set -v vSwitch0 -f true
esxcli network vswitch standard netflow set -v vSwitch0 -A 192.168.1.100 -p 2055 -e true

# View NetFlow configuration
esxcli network vswitch standard netflow get -v vSwitch0

# Configure NetFlow on distributed switch (via vCenter)
# This requires vCenter Server configuration through Web Client
```

## NetFlow vs IPFIX

| Feature | NetFlow v5/v9 | IPFIX |
|---------|---------------|-------|
| Standardization | Cisco proprietary | IETF standard |
| Flexibility | Fixed record format | Variable record format |
| Extensibility | Limited | Highly extensible |
| Vendor Support | Cisco devices | Multi-vendor support |
| VMware Support | vSphere 5.0+ | vSphere 5.1+ |

## Best Practices

1. **Collector Placement**: Deploy NetFlow collectors close to ESXi hosts to reduce network overhead
2. **Sampling Rates**: Use appropriate sampling rates to balance accuracy with performance impact
3. **Storage Planning**: Plan for adequate storage for NetFlow data retention
4. **Security**: Secure NetFlow data transmission with encryption where possible
5. **Monitoring**: Regularly review NetFlow reports for anomalies and trends
6. **Capacity Planning**: Use NetFlow data for network capacity planning and optimization

## Performance Considerations

### Overhead Impact
- CPU utilization increase on ESXi hosts
- Network bandwidth consumption for exporting flow data
- Memory usage for flow cache maintenance
- Storage requirements for flow data retention

### Optimization Techniques
- Adjust active and idle flow timeouts
- Configure appropriate sampling rates
- Limit flow collection to specific traffic types
- Use hardware-assisted NetFlow when available

## Troubleshooting Commands

```bash
# Check NetFlow status on ESXi host
esxcli network vswitch standard netflow get -v vSwitch0

# View NetFlow statistics
esxcli network vswitch standard netflow stats get -v vSwitch0

# Verify NetFlow collector connectivity
nc -zv 192.168.1.100 2055

# Check network connectivity to collector
ping 192.168.1.100
```

## Use Cases

1. **Security Monitoring**: Detect unusual traffic patterns that may indicate security threats
2. **Bandwidth Management**: Identify high-bandwidth applications and users
3. **Troubleshooting**: Diagnose network performance issues and connectivity problems
4. **Capacity Planning**: Plan for network infrastructure upgrades based on usage trends
5. **Compliance**: Meet regulatory requirements for network traffic monitoring

## Related Technologies

- [Port Mirroring](/glossary/port-mirroring)
- [vSphere Distributed Switch (VDS)](/glossary/vsphere-distributed-switch-vds)
- [vSphere Standard Switch (VSS)](/glossary/vsphere-standard-switch-vss)
- [Load Balancing](/glossary/load-balancing)
- [Network I/O Control (NIOC)](/glossary/network-i-o-control-nioc)