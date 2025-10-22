---
term: Encrypted vMotion
category: Security
---

Encrypted vMotion is a security feature that encrypts the entire vMotion data stream during the live migration of virtual machines. This ensures that sensitive virtual machine data is protected from eavesdropping and tampering while it is being transferred between ESXi hosts, even across untrusted networks.

## How it Works

When Encrypted vMotion is enabled, the vMotion traffic is encrypted using strong cryptographic algorithms before it is sent over the network. The encryption and decryption processes are handled by the ESXi hosts, ensuring that the virtual machine data remains secure throughout the migration. This is particularly important for workloads that handle sensitive information or operate in regulated environments.

## Benefits

*   **Data Confidentiality:** Protects sensitive virtual machine data from unauthorized access during vMotion.
*   **Data Integrity:** Ensures that vMotion data is not tampered with during transit.
*   **Enhanced Security:** Strengthens the overall security posture of the vSphere environment.
*   **Compliance:** Helps organizations meet security and compliance requirements for data in transit.
