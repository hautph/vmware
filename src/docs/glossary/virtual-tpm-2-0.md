---
term: Virtual TPM 2.0
category: Security
---

Virtual TPM 2.0 (Trusted Platform Module) is a virtualized hardware security chip that provides cryptographic functions and secure storage for virtual machine encryption keys, certificates, and other sensitive data. Virtual TPM enables virtual machines to leverage hardware-based security features that were previously only available on physical systems, providing a trusted computing environment for security-sensitive workloads.

## Overview

Virtual TPM 2.0 provides:
- Hardware-based cryptographic key generation and storage
- Secure boot attestation for virtual machines
- Platform integrity measurement and reporting
- Integration with Windows Hello and BitLocker
- Support for modern authentication protocols

## Key Features

### Cryptographic Capabilities
- RSA and ECC key generation and management
- Secure hash algorithms (SHA-1, SHA-256)
- Random number generation for cryptographic operations
- Digital signature generation and verification
- Key attestation and certification

### Platform Security
- Measured boot and secure boot support
- Platform configuration register (PCR) management
- Integrity measurement of system components
- Remote attestation capabilities
- Anti-tampering protection

### Key Storage
- Persistent storage of encryption keys
- Secure key hierarchy management
- Key migration between trusted platforms
- Key backup and recovery mechanisms
- Integration with key management services

## Architecture

### Components
- **TPM Virtual Device**: Virtualized TPM chip integrated with the VM
- **vTPM Manager**: ESXi service that manages vTPM operations
- **Key Storage**: Secure storage for TPM keys and certificates
- **Policy Engine**: Controls access to TPM functions based on security policies

### Trust Chain
1. **Hardware Root of Trust**: Physical TPM on ESXi host
2. **Hypervisor Verification**: ESXi integrity validation
3. **VM Boot Process**: Secure VM startup sequence
4. **Application Trust**: Trusted execution environment for applications

## Configuration Examples

### PowerCLI Configuration
```powershell
# Enable Virtual TPM on a VM
$vm = Get-VM "SecureVM"
New-VTpm -VM $vm

# Check vTPM status
Get-VTpm -VM "SecureVM"

# Remove vTPM from VM
Remove-VTpm -VTpm (Get-VTpm -VM "SecureVM") -Confirm:$false
```

### ESXi CLI Configuration
```bash
# List VMs with vTPM enabled
vim-cmd vmsvc/getallvms | grep -i tpm

# Check vTPM device status
vim-cmd vmsvc/device.getdevices <vmid> | grep -i tpm

# Enable vTPM on a VM (requires VM power-off)
vim-cmd vmsvc/devices.createx <vmid> "tpm" "tpm0"
```

## Requirements

### Hardware
- Physical TPM 2.0 chip on ESXi host
- ESXi 6.7 or later
- Compatible virtual machine hardware version (14 or later)

### Software
- vCenter Server 6.7 or later
- Guest operating system with TPM support (Windows 10, Windows Server 2016/2019)
- Appropriate licensing (vSphere Enterprise Plus)

### Compatibility
- VM hardware version 14 or later
- Supported guest operating systems
- Proper certificate authority configuration
- Network connectivity for remote attestation

## Use Cases

### BitLocker Encryption
- Enable BitLocker drive encryption on Windows VMs
- Secure key storage and management
- Recovery key protection
- Integration with Active Directory

### Windows Hello for Business
- Hardware-based authentication for Windows logon
- Multi-factor authentication without additional hardware
- Secure key storage for user credentials
- Integration with Azure Active Directory

### Application Security
- Secure storage of application secrets
- Digital signature generation for code signing
- Certificate-based authentication
- Secure key exchange protocols

### Compliance and Auditing
- FIPS 140-2 compliance for cryptographic operations
- Platform integrity reporting for compliance audits
- Secure audit trail of cryptographic operations
- Integration with security information and event management (SIEM)

## Best Practices

1. **Planning**: Plan vTPM deployment as part of overall security architecture
2. **Backup**: Implement backup procedures for vTPM-enabled VMs
3. **Migration**: Understand vTPM implications during VM migration
4. **Monitoring**: Monitor vTPM operations and security events
5. **Updates**: Keep ESXi and guest operating systems updated
6. **Documentation**: Maintain documentation of vTPM configurations and policies

## vSphere 8 Enhancements

### Improved Performance
- Enhanced cryptographic operation performance
- Reduced overhead for TPM operations
- Better integration with hardware security modules
- Optimized key management processes

### Enhanced Security
- Stronger attestation protocols
- Improved anti-tampering mechanisms
- Better integration with vSphere Trust Authority
- Enhanced key protection algorithms

### Simplified Management
- Streamlined vTPM provisioning workflows
- Improved PowerCLI cmdlets for vTPM management
- Better integration with vSphere Lifecycle Manager
- Enhanced monitoring and reporting capabilities

## Troubleshooting Commands

```bash
# Check vTPM status for a VM
Get-VTpm -VM "SecureVM" | Select-Object *

# Verify TPM availability on ESXi host
esxcli system settings advanced list -o /User/TPM/Enable

# Check VM configuration for vTPM
vim-cmd vmsvc/get.config <vmid> | grep -i tpm

# View vTPM logs
tail -f /var/log/vmware/vmkernel.log | grep -i tpm
```

## Related Technologies

- [Secure Boot](/glossary/term/secure-boot.md)
- [vSphere Trust Authority](/glossary/term/vsphere-trust-authority.md)
- [VM Encryption](/glossary/term/virtual-machine-encryption.md)
- [vSphere High Availability](/glossary/term/vsphere-high-availability.md)