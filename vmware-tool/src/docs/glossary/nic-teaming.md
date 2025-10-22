---
term: NIC Teaming
category: Networking
---

NIC Teaming is a network configuration that allows multiple physical network adapters to be grouped together to provide redundancy, load balancing, and increased bandwidth for virtual machine network connectivity.

## Code Sample

```bash
# ESXi CLI command to check NIC teaming configuration
esxcli network nic list | grep -i teaming
```

## Configuration

```ini
# NIC teaming configuration
[nic-teaming]
policy = loadbalance_srcid
notify_switches = yes
failback = yes
```