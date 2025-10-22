---
term: vSphere Trust Authority
category: Security
---

vSphere Trust Authority is VMware's native security solution that provides cryptographic protection for virtual machines, enabling encryption of VMs at rest and in transit with hardware-backed key management.

## Code Sample

```powershell
# PowerCLI to configure Trust Authority
Get-TrustAuthorityCluster | Set-TrustAuthorityCluster -State Enabled
```

## Configuration

```ini
# Trust Authority configuration
[trust-authority]
enabled = true
attestation = required
encryption = required
```