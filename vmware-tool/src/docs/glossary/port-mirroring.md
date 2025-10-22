---
term: Port Mirroring
category: Networking
---

Port Mirroring (also known as SPAN or RSPAN on physical switches) is a feature that allows a copy of network packets from one or more source ports or VLANs to be sent to a destination port. In a vSphere environment, Port Mirroring on a vSphere Distributed Switch (VDS) is used to monitor network traffic for analysis, intrusion detection, or troubleshooting purposes.

## How it Works

When Port Mirroring is configured, all traffic (ingress and egress) from the specified source ports or VLANs is duplicated and sent to a designated destination port. This destination port is typically connected to a network analysis tool, such as an intrusion detection system (IDS) or a packet sniffer, which can then analyze the mirrored traffic without disrupting the original data flow.

## Benefits

*   **Network Monitoring:** Provides a non-intrusive way to monitor network traffic for performance analysis, security auditing, and compliance.
*   **Troubleshooting:** Helps in diagnosing network connectivity issues, application performance problems, and other network-related issues.
*   **Security Analysis:** Enables intrusion detection systems to analyze network traffic for malicious activity.
*   **Compliance:** Assists in meeting regulatory compliance requirements by providing a mechanism for network traffic inspection.
