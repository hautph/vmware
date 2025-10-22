---
term: vSphere Standard Switch (VSS)
category: Networking
---

vSphere Standard Switch (VSS) is a virtual network switch that provides basic networking connectivity for virtual machines on a single ESXi host, offering port grouping and basic network policies.

## Code Sample

```bash
# ESXi CLI command to list standard switches
esxcli network vswitch standard list
```

## Configuration

```ini
# VSS configuration
[vss]
name = vSwitch0
num_ports = 128
mtu = 1500
```