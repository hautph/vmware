---
term: Virtual TPM 2.0
category: Security
---

Virtual TPM 2.0 (Trusted Platform Module) is a virtualized hardware security chip that provides cryptographic functions and secure storage for virtual machine encryption keys, certificates, and other sensitive data.

## Code Sample

```powershell
# PowerCLI to enable Virtual TPM
New-VTpm -VM "SecureVM"
```

## Configuration

```ini
# Virtual TPM configuration
[vtpm]
version = 2.0
encrypted = true
persistent = true
```