---
title: What is vSAN?
category: Storage
technology: vSAN
---

# What is vSAN?

## Section 1: What is vSAN?

VMware's Software-Defined Storage (SDS) integrated into vSphere; turns local disks on ESXi hosts into a shared, hyper-converged datastore (HCI). No need for external SAN/NAS—pool 'em and rule 'em all. Supports up to 96-host clusters in vSphere 9.

## Section 2: How It Works

Pools disks into groups; stores VM data as "objects" (not files); stripes data across hosts via policies. VMs access local storage for low latency, with auto-failover via HA/DRS. Requires 10/25/100GbE networking.

## Section 3: Core Components

- Disk Groups: 1 SSD cache + 1-7 capacity disks per host (max 5 groups/host).
- Cache Tier: SSD for hot data, dedup/compression.
- Capacity Tier: HDD/SSD for bulk storage (all-flash in v9).
- vSAN Health Service: AI-powered monitoring/alerts.
- Witness Appliance: Quorum keeper for stretched clusters.

## Section 4: Key Features

- Fault Tolerance: RAID-1 mirroring (FTT=1) or RAID-5/6 erasure coding (saves 25-50% space).
- Policies: Per-VM rules (e.g., FTT=1, encryption=on).
- Data Services: Dedup, compression (4-10x reduction), encryption via vSphere Trust Authority.
- Stretch Clustering: Sync replication for DR (zero-RPO).
- v9 Upgrades: AI/ML perf boosts, fleet-wide ops integration.

## Section 5: Benefits & Trade-offs

### Pros
- 50-70% cost savings
- <1ms latency, millions of IOPS
- Single-pane management via vCenter
- Scales with hosts
- Kubernetes/HCX friendly

### Cons
- Needs beefy all-flash hosts and solid networking
- Skimp here, and it's traffic jam city

## Additional Information

vSAN represents a fundamental shift from traditional shared storage architectures to a hyper-converged infrastructure model where compute and storage resources are integrated on the same physical hardware. This approach simplifies data center operations while providing enterprise-grade storage services with the flexibility to scale compute and storage resources independently as needed.

The solution is particularly well-suited for modern data center environments that require high performance, simplified management, and cost-effective scaling. With its policy-driven approach to storage management, vSAN enables administrators to define storage requirements at the VM level, ensuring that each workload receives the appropriate level of performance, availability, and data services.