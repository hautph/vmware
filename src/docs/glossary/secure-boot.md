---
term: Secure Boot
category: Security
---

Secure Boot is a security feature that ensures only trusted software is loaded during the boot process by validating digital signatures of boot components, preventing unauthorized or malicious code from executing. Secure Boot is part of the Unified Extensible Firmware Interface (UEFI) specification and provides a hardware-based root of trust for the boot process.

## Overview

Secure Boot provides:
- Hardware-based boot security through digital signature validation
- Protection against bootkits and rootkits
- Trusted boot process from firmware to operating system
- Integration with certificate-based trust chains
- Support for modern security standards

## Key Features

### Boot Security
- **Signature Validation**: Validation of digital signatures on boot components
- **Trust Chain**: Establishment of trust chain from firmware to OS
- **Malware Prevention**: Prevention of unauthorized boot code execution
- **Root of Trust**: Hardware-based root of trust for boot process

### Certificate Management
- **Certificate Authorities**: Support for trusted certificate authorities
- **Key Management**: Management of cryptographic keys
- **Certificate Revocation**: Support for certificate revocation
- **Policy Enforcement**: Enforcement of certificate policies

### Integration Capabilities
- **UEFI Compliance**: Compliance with UEFI Secure Boot specification
- **OS Support**: Support for various operating systems
- **Hardware Integration**: Integration with modern server hardware
- **Management Tools**: Integration with security management tools

## Architecture

### Security Components
- **Firmware**: UEFI firmware with Secure Boot support
- **Boot Loader**: Secure boot loader with signature validation
- **Operating System**: Operating system with Secure Boot support
- **Certificates**: Trusted certificates for signature validation

### Trust Chain
1. **Firmware Verification**: Verification of firmware integrity
2. **Boot Loader Validation**: Validation of boot loader signatures
3. **OS Component Validation**: Validation of OS component signatures
4. **Application Validation**: Validation of application signatures
5. **Runtime Verification**: Continuous verification during runtime

### Certificate Hierarchy
- **Root Certificates**: Root certificates from trusted authorities
- **Intermediate Certificates**: Intermediate certificate authorities
- **Leaf Certificates**: Certificates for specific components
- **Revocation Lists**: Certificate revocation lists

## Configuration Examples

### ESXi CLI Configuration
```bash
# Check Secure Boot status
esxcli system settings advanced list -o /UserVars/SecureBootEnabled

# View Secure Boot policy
esxcli system settings advanced list -o /UserVars/SecureBootPolicy

# Check UEFI settings
esxcli system settings advanced list -o /UserVars/UEFI

# View security configuration
esxcli system settings advanced list -o /UserVars/Security
```

### PowerCLI Configuration
```powershell
# Check Secure Boot status on ESXi hosts
Get-VMHost | Get-AdvancedSetting -Name "UserVars.SecureBootEnabled"

# Configure Secure Boot policy
Get-VMHost "esxi01.domain.com" | New-AdvancedSetting -Name "UserVars.SecureBootPolicy" -Value "strict" -Confirm:$false

# View security settings
Get-VMHost | Get-AdvancedSetting -Name "UserVars.Security*"
```

### BIOS/UEFI Configuration
```ini
# UEFI Secure Boot configuration
[uefi]
secure-boot = enabled
policy = standard
validation = strict
certificates = microsoft-standard
```

## Requirements

### Hardware
- **UEFI Firmware**: Servers with UEFI firmware and Secure Boot support
- **TPM Support**: Trusted Platform Module (TPM) for enhanced security
- **Compatible Storage**: Storage devices with Secure Boot support
- **Modern Hardware**: Modern server hardware platforms

### Software
- **ESXi 6.5 or later**: Hosts with Secure Boot support
- **vCenter Server**: Centralized management of Secure Boot
- **Compatible Guest OS**: Guest operating systems with Secure Boot support
- **Proper Licensing**: Appropriate VMware licensing

### Certificates
- **Trusted Certificates**: Certificates from trusted certificate authorities
- **Certificate Management**: Proper certificate management processes
- **Key Storage**: Secure storage of cryptographic keys
- **Policy Configuration**: Proper certificate policy configuration

## Security Policies

### Strict Policy
- **Full Validation**: Full validation of all boot components
- **No Exceptions**: No exceptions to signature validation
- **Maximum Security**: Maximum security protection
- **Zero Tolerance**: Zero tolerance for unsigned components

### Permissive Policy
- **Partial Validation**: Partial validation of boot components
- **Controlled Exceptions**: Controlled exceptions for specific components
- **Balanced Security**: Balanced security and compatibility
- **Managed Risk**: Managed security risk

### Custom Policy
- **Flexible Configuration**: Flexible policy configuration
- **Specific Rules**: Specific rules for different components
- **Granular Control**: Granular security control
- **Tailored Security**: Tailored security for specific requirements

## Best Practices

1. **Planning**: Plan Secure Boot deployment carefully
2. **Certificate Management**: Implement proper certificate management
3. **Monitoring**: Monitor Secure Boot status and events
4. **Testing**: Test Secure Boot configuration thoroughly
5. **Documentation**: Document Secure Boot policies and procedures
6. **Compliance**: Ensure compliance with security standards

## vSphere 8 Enhancements

### Enhanced Security
- **Improved Validation**: Better signature validation algorithms
- **Enhanced Certificates**: Support for enhanced certificate features
- **Better Integration**: Better integration with hardware security
- **Advanced Policies**: More advanced security policies

### Performance Improvements
- **Faster Validation**: Faster signature validation
- **Reduced Overhead**: Lower Secure Boot processing overhead
- **Better Scalability**: Better Secure Boot scalability
- **Enhanced Reliability**: More reliable Secure Boot operations

### Management Features
- **Advanced Monitoring**: Better Secure Boot monitoring
- **Improved Reporting**: Better Secure Boot reporting
- **Streamlined Configuration**: Simplified Secure Boot configuration
- **Enhanced Troubleshooting**: Better Secure Boot troubleshooting

## Troubleshooting Commands

```bash
# Check Secure Boot status
esxcli system settings advanced list -o /UserVars/SecureBootEnabled

# View UEFI settings
esxcli system settings advanced list -o /UserVars/UEFI*

# Check security logs
tail -f /var/log/vmware/vmkernel.log | grep -i secure

# View certificate information
esxcli system settings advanced list -o /UserVars/Certificates

# Check boot process
dmesg | grep -i secure
```

## Related Technologies

- [Virtual TPM 2.0](/glossary/term/virtual-tpm-2-0.md)
- [vSphere Trust Authority](/glossary/term/vsphere-trust-authority.md)
- [VM Encryption](/glossary/term/virtual-machine-encryption.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)