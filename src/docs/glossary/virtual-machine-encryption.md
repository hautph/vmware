---
term: Virtual Machine Encryption
category: Security
---

Virtual Machine Encryption is a security feature that encrypts the virtual machine files (VMDKs, VMX, etc.) at rest. This protects sensitive data stored within virtual machines from unauthorized access, even if the underlying storage is compromised. The encryption is performed at the hypervisor level, making it transparent to the guest operating system and applications.

## How it Works

When Virtual Machine Encryption is enabled, a unique encryption key is generated for each virtual machine. This key is then used to encrypt the virtual machine files. The keys are managed by a Key Management Server (KMS), which integrates with vCenter Server. Access to the encrypted virtual machines is controlled through vCenter Server permissions.

## Benefits

*   **Data at Rest Protection:** Protects sensitive data within virtual machines from unauthorized access, even if the storage is stolen or compromised.
*   **Enhanced Security:** Strengthens the overall security posture of the vSphere environment.
*   **Compliance:** Helps organizations meet stringent security and compliance requirements for data protection.
*   **Transparent to Guest OS:** Encryption and decryption are handled by the hypervisor, requiring no changes to the guest operating system or applications.
