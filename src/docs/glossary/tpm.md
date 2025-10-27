---
term: Trusted Platform Module (TPM)
category: Security
---

Trusted Platform Module (TPM) is a specialized hardware security chip that provides cryptographic functions, secure key storage, and platform integrity measurement to establish a hardware-based root of trust for computing systems. TPM enables systems to verify their integrity, protect sensitive data, and establish secure communication channels.

## Overview

TPM provides:
- Hardware-based cryptographic key generation and storage
- Platform integrity measurement and attestation
- Secure boot validation and enforcement
- Protection against firmware and boot-level attacks
- Compliance with industry security standards

## Key Features

### Cryptographic Capabilities
- **Key Generation**: RSA and ECC key generation with hardware protection
- **Secure Storage**: Tamper-resistant storage of encryption keys and certificates
- **Random Number Generation**: Cryptographically secure random number generation
- **Digital Signatures**: Generation and verification of digital signatures
- **Hash Functions**: Secure hash algorithms (SHA-1, SHA-256, SHA-384, SHA-512)

### Platform Security
- **Measured Boot**: Measurement and recording of boot process components
- **Secure Boot**: Validation of boot components through digital signatures
- **Platform Configuration Registers (PCRs)**: Storage of system integrity measurements
- **Remote Attestation**: Reporting of platform integrity to remote systems
- **Anti-Tampering**: Physical and logical protection against tampering

### Key Management
- **Key Hierarchy**: Hierarchical key management with endorsement, storage, and attestation keys
- **Key Migration**: Secure migration of keys between trusted platforms
- **Key Backup**: Secure backup and recovery of encryption keys
- **Key Attestation**: Certification of key authenticity and integrity

## Architecture

### Hardware Components
- **Cryptographic Processor**: Dedicated processor for cryptographic operations
- **Secure Memory**: Tamper-resistant memory for key storage
- **I/O Interface**: Interface for communication with system components
- **Physical Security**: Physical protection against tampering and side-channel attacks

### Logical Components
- **Endorsement Key (EK)**: Unique asymmetric key burned into the TPM during manufacturing
- **Storage Root Key (SRK)**: Primary key used to wrap other keys stored in the TPM
- **Attestation Identity Key (AIK)**: Key used for attestation operations
- **Platform Configuration Registers (PCRs)**: Registers that store integrity measurements

### Trust Chain
1. **Hardware Root of Trust**: TPM as the hardware-based root of trust
2. **Firmware Verification**: Verification of system firmware integrity
3. **Boot Loader Validation**: Validation of boot loader signatures
4. **OS Component Validation**: Validation of operating system components
5. **Application Trust**: Trusted execution environment for applications

## Configuration Examples

### ESXi Host Configuration
```bash
# Check TPM status on ESXi host
esxcli system settings advanced list -o /User/TPM/Enable

# View TPM information
esxcli system tpm info

# Check TPM attestation status
esxcli system tpm attestation get

# Enable TPM (requires host reboot)
esxcli system settings advanced set -o /User/TPM/Enable -i 1
```

### PowerCLI Configuration
```powershell
# Check TPM status on multiple ESXi hosts
Get-VMHost | Get-AdvancedSetting -Name "User.TPM.Enable"

# Enable TPM on ESXi hosts
Get-VMHost "esxi01.domain.com" | New-AdvancedSetting -Name "User.TPM.Enable" -Value 1 -Confirm:$false

# View TPM information
Get-VMHost | Get-View | Select-Object Name, TpmPresent, TpmActivated

# Check attestation status
Get-VMHost | Get-View | Select-Object Name, TpmAttestationStatus
```

### Windows Guest OS Configuration
```cmd
# Check TPM status in Windows
wmic /namespace:\\root\cimv2\security\microsofttpm path win32_tpm get *

# View TPM information using PowerShell
Get-WmiObject -Namespace "root\CIMV2\Security\MicrosoftTpm" -Class Win32_Tpm

# Check TPM status using tpm.msc
# Run "tpm.msc" from Start menu or command line

# View PCR values
tpm.msc -> TPM Management -> PCRs tab
```

## Requirements

### Hardware
- **TPM Chip**: Physical TPM 1.2 or TPM 2.0 chip on the motherboard
- **Compatible Server**: Server hardware with TPM support
- **UEFI Firmware**: UEFI firmware with TPM support
- **Secure Boot**: Secure Boot capability for enhanced security

### Software
- **ESXi 6.5 or later**: Hosts with TPM support
- **vCenter Server**: Centralized management of TPM-enabled hosts
- **Compatible Guest OS**: Guest operating systems with TPM support
- **Appropriate Licensing**: vSphere Enterprise Plus or appropriate licensing

### Compatibility
- **TPM Versions**: Support for TPM 1.2 and TPM 2.0 specifications
- **Guest Operating Systems**: Windows, Linux, and other TPM-aware operating systems
- **Certificate Authority**: Proper certificate authority configuration
- **Network Connectivity**: Network connectivity for remote attestation

## Security Policies

### Attestation Policies
- **Platform Validation**: Validation of platform integrity measurements
- **Boot Component Verification**: Verification of boot component signatures
- **Configuration Compliance**: Compliance with security configuration policies
- **Continuous Monitoring**: Continuous monitoring of platform integrity

### Key Management Policies
- **Key Generation**: Policies for cryptographic key generation
- **Key Storage**: Policies for secure key storage
- **Key Usage**: Policies for key usage and access control
- **Key Lifecycle**: Policies for key lifecycle management

### Access Control Policies
- **User Authentication**: Authentication requirements for TPM access
- **Application Authorization**: Authorization of applications to use TPM
- **Administrative Access**: Administrative access controls for TPM management
- **Audit Requirements**: Audit requirements for TPM operations

## Best Practices

1. **Planning**: Plan TPM deployment as part of overall security architecture
2. **Hardware Selection**: Select hardware with TPM 2.0 for better security features
3. **Certificate Management**: Implement proper certificate management processes
4. **Monitoring**: Monitor TPM operations and security events
5. **Backup**: Implement backup procedures for TPM-enabled systems
6. **Updates**: Keep firmware and software updated with security patches
7. **Documentation**: Maintain documentation of TPM configurations and policies
8. **Compliance**: Ensure compliance with relevant security standards

## vSphere 8 Enhancements

### Improved TPM Support
- **Enhanced TPM 2.0**: Better support for TPM 2.0 features and capabilities
- **Improved Performance**: Optimized TPM operations with reduced overhead
- **Better Integration**: Better integration with vSphere Trust Authority
- **Enhanced Security**: Stronger cryptographic algorithms and protocols

### Advanced Attestation
- **Enhanced Measurements**: More detailed platform integrity measurements
- **Improved Reporting**: Better attestation reporting and analysis
- **Real-time Monitoring**: Real-time monitoring of platform integrity
- **Automated Response**: Automated response to integrity violations

### Management Features
- **Streamlined Configuration**: Simplified TPM configuration workflows
- **Enhanced PowerCLI**: Better PowerCLI cmdlets for TPM management
- **Improved Monitoring**: Better monitoring and alerting for TPM events
- **Centralized Management**: Centralized management of TPM-enabled hosts

## Troubleshooting Commands

```bash
# Check TPM status on ESXi host
esxcli system tpm info

# View TPM attestation information
esxcli system tpm attestation get

# Check TPM logs
tail -f /var/log/vmware/vmkernel.log | grep -i tpm

# View advanced TPM settings
esxcli system settings advanced list -o /User/TPM*

# Check hardware TPM presence
lspci | grep -i tpm

# View PCR values
esxcli system tpm pcr get

# Check TPM firmware version
esxcli system tpm info | grep -i version
```

## Related Technologies

- [Virtual TPM 2.0](/glossary/term/virtual-tpm-2-0.md)
- [Secure Boot](/glossary/term/secure-boot.md)
- [vSphere Trust Authority](/glossary/term/vsphere-trust-authority.md)
- [VM Encryption](/glossary/term/virtual-machine-encryption.md)
- [ESXi](/glossary/term/esxi.md)