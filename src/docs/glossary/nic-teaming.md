---
term: NIC Teaming
category: Networking
---

NIC Teaming is a network configuration that allows multiple physical network adapters to be grouped together to provide redundancy, load balancing, and increased bandwidth for virtual machine network connectivity. NIC teaming, also known as link aggregation or bonding, enhances network availability and performance by combining multiple physical network connections into a single logical connection.

## Overview

NIC Teaming provides:
- Network redundancy and fault tolerance
- Load balancing across multiple network adapters
- Increased bandwidth through aggregation
- Automatic failover in case of adapter failure
- Integration with virtualized environments

## Key Features

### Redundancy
- **Automatic Failover**: Automatic switching to working adapters on failure
- **Fault Detection**: Detection of network adapter and link failures
- **Graceful Degradation**: Continued operation with reduced capacity
- **Self-Healing**: Automatic recovery when failed adapters return

### Load Balancing
- **Traffic Distribution**: Distribution of network traffic across adapters
- **Multiple Algorithms**: Various load balancing algorithms
- **Adaptive Load Balancing**: Dynamic adjustment based on traffic patterns
- **Performance Optimization**: Optimized network performance

### Bandwidth Aggregation
- **Increased Throughput**: Combined bandwidth of multiple adapters
- **Better Utilization**: Better utilization of network resources
- **Scalability**: Easy scaling by adding more adapters
- **Cost Efficiency**: Better ROI through resource optimization

## Architecture

### Teaming Components
- **Physical Adapters**: Physical network adapters in the team
- **Virtual Switch**: Virtual switch with teaming configuration
- **Port Groups**: Port groups with teaming policies
- **Load Balancing Algorithms**: Algorithms for traffic distribution

### Failover Mechanisms
- **Link State Tracking**: Monitoring of physical link state
- **Beacon Probing**: Active probing for link status
- **Failback Policies**: Policies for returning to primary adapters
- **Notification Systems**: Notification of failover events

### Load Balancing Methods
- **Source-Based**: Load balancing based on source information
- **Route-Based**: Load balancing based on network routes
- **IP Hash**: Load balancing based on IP address hash
- **Dynamic**: Dynamic load balancing based on utilization

## Configuration Examples

### ESXi CLI Configuration
```bash
# List network adapters
esxcli network nic list

# View NIC teaming policy
esxcli network vswitch standard portgroup policy failover get --portgroup-name="VM Network"

# Configure NIC teaming
esxcli network vswitch standard portgroup policy failover set --portgroup-name="VM Network" --active-uplinks=vmnic0,vmnic1 --standby-uplinks=vmnic2

# Check teaming status
esxcli network vswitch standard portgroup policy failover get --portgroup-name="VM Network"
```

### PowerCLI Configuration
```powershell
# Configure NIC teaming policy
Get-VirtualPortGroup -Name "VM Network" | Get-NicTeamingPolicy | Set-NicTeamingPolicy -MakePrimary vmnic0 -MakeSecondary vmnic1

# View NIC teaming configuration
Get-VirtualPortGroup -Name "VM Network" | Get-NicTeamingPolicy

# Create port group with teaming policy
Get-VirtualSwitch -Name "vSwitch0" | New-VirtualPortGroup -Name "TeamedNetwork" -NicTeamingPolicy (New-NicTeamingPolicy -LoadBalancingPolicy LoadBalanceIP)
```

### vSphere Client Configuration
```xml
<!-- NIC teaming configuration in port group settings -->
<nic-teaming>
active-uplinks = "vmnic0,vmnic1"
standby-uplinks = "vmnic2"
policy = "loadbalance_srcid"
notify-switches = "yes"
failback = "yes"
</nic-teaming>
```

## Requirements

### Hardware
- **Multiple Network Adapters**: Multiple physical network adapters
- **Compatible Switches**: Switches with link aggregation support
- **Proper Cabling**: Proper network cabling for teaming
- **Redundant Infrastructure**: Redundant network infrastructure

### Software
- **ESXi**: Hosts with NIC teaming support
- **vCenter Server**: Centralized management of teaming
- **Network Management Tools**: Tools for teaming management
- **Proper Licensing**: Appropriate VMware licensing

### Network Design
- **Proper Planning**: Careful network design and planning
- **Redundancy**: Proper redundancy planning
- **Performance**: Performance requirements analysis
- **Scalability**: Scalability considerations

## Load Balancing Algorithms

### Route Based on Originating Virtual Port ID
- **Port-Based**: Load balancing based on virtual port ID
- **Simple Implementation**: Simple to implement and understand
- **Good Distribution**: Good distribution for most workloads
- **Predictable**: Predictable load balancing behavior

### Route Based on IP Hash
- **IP-Based**: Load balancing based on source/destination IP
- **Better Distribution**: Better distribution for IP-based traffic
- **Session Persistence**: Session persistence for connections
- **Hash Algorithm**: Uses hash algorithm for distribution

### Route Based on Source MAC Hash
- **MAC-Based**: Load balancing based on source MAC address
- **Physical Distribution**: Distribution based on physical addresses
- **Simple Hash**: Simple hash algorithm
- **Consistent**: Consistent distribution

### Route Based on Physical NIC Load
- **Load-Based**: Load balancing based on actual utilization
- **Dynamic**: Dynamic adjustment based on load
- **Optimal**: Optimal load distribution
- **Adaptive**: Adaptive to changing conditions

### Use Explicit Failover Order
- **Manual**: Manual failover order specification
- **Controlled**: Controlled failover behavior
- **Predictable**: Predictable failover sequence
- **Simple**: Simple failover management

## Best Practices

1. **Planning**: Plan NIC teaming configuration carefully
2. **Redundancy**: Ensure proper redundancy in design
3. **Monitoring**: Monitor teaming performance and status
4. **Testing**: Test failover and load balancing
5. **Documentation**: Document teaming configurations
6. **Change Management**: Implement proper change management

## vSphere 8 Enhancements

### Improved Integration
- **Enhanced Virtual Switch Support**: Better virtual switch integration
- **Advanced Teaming Features**: Support for advanced teaming features
- **Better Management**: Improved teaming management capabilities
- **Enhanced Security**: Better teaming security features

### Performance Improvements
- **Faster Failover**: Faster failover detection and recovery
- **Reduced Overhead**: Lower teaming processing overhead
- **Better Scalability**: Better teaming scalability
- **Enhanced Reliability**: More reliable teaming operations

### Management Features
- **Advanced Monitoring**: Better teaming monitoring
- **Improved Reporting**: Better teaming reporting
- **Streamlined Configuration**: Simplified teaming configuration
- **Enhanced Troubleshooting**: Better teaming troubleshooting

## Troubleshooting Commands

```bash
# Check network adapter status
esxcli network nic list

# View NIC teaming policy
esxcli network vswitch standard portgroup policy failover get --portgroup-name="VM Network"

# Check teaming statistics
esxcli network vswitch standard portgroup policy failover get --portgroup-name="VM Network"

# View network logs
tail -f /var/log/vmware/vmkernel.log | grep -i nic

# Test network connectivity
ping -c 4 <destination_ip>
```

## Related Technologies

- [Port Group](/glossary/term/port-group.md)
- [Virtual Switch](/glossary/term/virtual-switch.md)
- [vSphere Distributed Switch](/glossary/term/vsphere-distributed-switch.md)
- [Physical Adapters](/glossary/term/physical-adapters.md)
- [Load Balancing](/glossary/term/load-balancing.md)