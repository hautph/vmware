---
title: DCUI (Direct Console User Interface)
category: Management
---

DCUI (Direct Console User Interface) is the text-based console interface for VMware ESXi that provides local system administration capabilities. It is the primary interface for configuring and managing ESXi hosts when no network connectivity is available or when remote management tools cannot be used.

## Overview

DCUI features:
- Text-based interface accessible directly from the ESXi host console
- System configuration and management without network dependency
- Recovery and troubleshooting capabilities
- Basic system monitoring and maintenance functions
- Access to critical system settings and configurations

## Accessing DCUI

### Physical Access
1. Connect a monitor and keyboard directly to the ESXi host
2. Press F2 to access the System Customization menu
3. Enter the root password when prompted
4. Navigate through the menu options using arrow keys

### Remote Access
1. Enable ESXi Shell or SSH access
2. Connect via SSH client
3. Use commands to configure system settings
4. Some configurations still require direct console access

## DCUI Menu Options

### System Customization
- Configure management network settings
- Set root password
- Configure DNS and routing
- Enable/disable ESXi Shell and SSH access
- Configure SNMP settings

### Troubleshooting Options
- Restart management agents
- Reset system configuration
- Restore factory defaults
- Enable maintenance mode
- Access technical support mode

### View System Information
- System version and build information
- Hardware health status
- Network configuration details
- Storage configuration
- Active alerts and warnings

## Configuration Example

Common DCUI configuration tasks:

```bash
# Access DCUI menu (requires physical console access)
# Press F2 at console

# Configure management network through CLI
esxcli network ip interface ipv4 set -i vmk0 -t static -I 192.168.1.10 -N 255.255.255.0 -g 192.168.1.1

# Enable SSH access
esxcli system settings advanced set -o /UserVars/SuppressShellWarning -i 1
vim-cmd hostsvc/enable_ssh

# Set root password
passwd

# Restart management agents
services.sh restart
```

## Security Considerations

### Access Control
- Limit physical access to ESXi hosts
- Use strong root passwords
- Disable DCUI when not needed for security-sensitive environments
- Monitor access to DCUI and console

### Remote Access Security
- Enable SSH with key-based authentication
- Restrict SSH access to specific IP addresses
- Regularly review SSH access logs
- Disable SSH when not in use

## Best Practices

1. **Physical Security**: Secure physical access to ESXi hosts
2. **Password Management**: Use strong, regularly updated passwords
3. **Access Logging**: Monitor and log DCUI access attempts
4. **Documentation**: Document DCUI configuration changes
5. **Emergency Procedures**: Maintain procedures for DCUI-based recovery
6. **Training**: Ensure administrators are familiar with DCUI operations

## DCUI vs Remote Management

| Feature | DCUI | Remote Management |
|---------|------|------------------|
| Network Dependency | None | Required |
| Accessibility | Physical console only | Network-based |
| Functionality | Basic system config | Full management capabilities |
| Security | Physical security model | Network security model |
| Use Cases | Recovery, initial setup | Day-to-day management |

## Troubleshooting Commands

```bash
# Restart management agents
services.sh restart

# Check system health
esxcli hardware platform get

# View system logs
tail -f /var/log/vmkernel.log

# Check network configuration
esxcli network ip interface list

# Reset system configuration (use with caution)
esxcli system settings advanced set -o /UserVars/HostClientCEIPOptIn -i 0
```

## Related Technologies

- [ESXi](/glossary/esxi)
- [vSphere Client](/glossary/vsphere-client)
- [VMkernel](/glossary/vmkernel)
- [Management Network](/glossary/management-network)
- [Maintenance Mode](/glossary/maintenance-mode)