---
term: VLAN (Virtual LAN)
category: Networking
---

VLAN (Virtual LAN) is a network segmentation technology that allows multiple logical networks to be created within a single physical network infrastructure, providing isolation and security for virtual machine traffic.

## Code Sample

```bash
# ESXi CLI command to list VLAN configurations
esxcli network vswitch standard portgroup list | grep -i vlan
```

## Configuration

```ini
# VLAN configuration
[vlan]
id = 100
name = VM-Network-VLAN100
type = static
```