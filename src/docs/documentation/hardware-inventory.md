---
title: Hardware Inventory Report
category: System Hardware
excerpt: Comprehensive inventory of all hardware devices in our infrastructure
changelog: |
  2025-10-28: Added new storage arrays
  2025-10-20: Updated server specifications
  2025-10-15: Added peripheral devices
  2025-10-10: Initial hardware inventory
---

# Hardware Inventory Report

## Executive Summary

This document provides a detailed inventory of all hardware devices within our infrastructure, including servers, storage systems, networking equipment, and peripheral devices.

## Server Hardware

### Physical Servers

#### Compute Nodes

- Manufacturer: Dell EMC
- Model: PowerEdge R750
- CPU: Intel Xeon Silver 4314 (16 cores, 2.4GHz)
- Memory: 128GB DDR4 RAM
- Storage: 2x 1TB NVMe SSD (RAID 1)
- Quantity: 12

#### Database Servers

- Manufacturer: HPE
- Model: ProLiant DL385 Gen10 Plus
- CPU: AMD EPYC 7713 (64 cores, 2.0GHz)
- Memory: 512GB DDR4 RAM
- Storage: 4x 3.84TB NVMe SSD (RAID 10)
- Quantity: 4

#### Storage Controllers

- Manufacturer: Dell EMC
- Model: PowerVault ME5024
- Capacity: 24x 15TB drives
- RAID Support: Levels 0, 1, 5, 6, 10, 50, 60
- Quantity: 2

### Virtualization Hosts

#### VMware vSphere Hosts

- Hypervisor: VMware ESXi 8.0
- Hosts: 8 nodes
- Average CPU Utilization: 65%
- Average Memory Utilization: 70%
- VM Density: ~25 VMs per host

## Storage Systems

### Primary Storage

- Type: SAN Storage
- Vendor: Dell EMC PowerStore
- Total Raw Capacity: 2PB
- Usable Capacity: 1.5PB
- Protocols: Fibre Channel, iSCSI, NFS
- Replication: Enabled to secondary site

### Backup Storage

- Type: NAS Storage
- Vendor: Synology
- Total Capacity: 500TB
- Protocols: SMB, NFS
- Backup Software: Veeam Backup & Replication

## Networking Equipment

### Core Infrastructure

- Core Switches: Cisco Catalyst 9500 (2 units)
- Distribution Switches: Cisco Catalyst 9300 (4 units)
- Access Switches: Cisco Catalyst 9200 (24 units)
- Firewalls: Palo Alto PA-5200 (2 units)

### Wireless Infrastructure

- Controller: Cisco 9800-L
- Access Points: Cisco Catalyst 9120AX (48 units)
- Coverage: 100% of office space

## Peripheral Devices

### Printers & Scanners

- Laser Printers: HP LaserJet Enterprise (12 units)
- Color Printers: Canon imageRUNNER (4 units)
- Scanners: Fujitsu fi-7200 (8 units)

### Video Conferencing

- Conference Room Systems: Cisco Webex Room Kit (16 units)
- Personal Devices: Logitech MeetUp (24 units)
- Recording Systems: Crestron Flex (8 units)

## Data Center Infrastructure

### Power Systems

- UPS Units: APC Smart-UPS (8 units, 10kVA each)
- PDU Units: Server Technology (24 units)
- Generator: Caterpillar C18 (2MW capacity)

### Cooling Systems

- CRAC Units: Liebert CRV (4 units)
- Chillers: Trane CGAM (2 units)
- Temperature Monitoring: Schneider Electric (48 sensors)

## Asset Management

### Tracking System

All hardware assets are tracked using our asset management system with the following information:

- Asset Tag
- Serial Number
- Purchase Date
- Warranty Expiration
- Location
- Assigned User/Department
- Maintenance Schedule

### Lifecycle Management

Hardware lifecycle follows these stages:
1. Procurement
2. Deployment
3. Maintenance
4. Refresh Planning
5. Decommissioning
6. Disposal

## Maintenance Schedule

Regular maintenance is performed according to vendor recommendations:

- Servers: Quarterly health checks
- Storage: Monthly performance reviews
- Networking: Weekly configuration backups
- Peripherals: Annual servicing

## Future Considerations

Planned upgrades and additions:
- Server refresh cycle: Every 3 years
- Storage expansion: Additional 500TB planned for Q2 2026
- Network upgrade: 100Gbps backbone planned for 2026