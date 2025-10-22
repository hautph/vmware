---
term: Secure Boot
category: Security
---

Secure Boot is a security feature that ensures only trusted software is loaded during the boot process by validating digital signatures of boot components, preventing unauthorized or malicious code from executing.

## Code Sample

```bash
# ESXi CLI command to check Secure Boot status
esxcli system settings advanced list -o /UserVars/SecureBootEnabled
```

## Configuration

```ini
# Secure Boot configuration
[secure-boot]
enabled = true
validation = strict
policy = uefi
```