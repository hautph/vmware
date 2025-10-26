---
title: Storage Operations
day: 5
---

# Day 5: Storage Operations

## Overview
Today's session focuses on advanced vSphere storage technologies, including NVMe support, vSAN configuration, storage policy-based management, and Storage I/O Control. These concepts are crucial for optimizing storage performance and managing storage resources effectively.

## Learning Objectives
By the end of this session, you will be able to:
- Discuss vSphere support for NVMe and iSER technologies
- Describe the architecture and requirements of vSAN configuration
- Explain storage policy-based management
- Recognize components in the vSphere Virtual Volumes architecture
- Configure Storage I/O Control

## Topics Covered

### 1. NVMe and iSER Support

#### Understanding NVMe
Non-Volatile Memory Express (NVMe) is a high-performance storage interface designed for solid-state drives and other non-volatile memory technologies.

**Key Benefits:**
- Lower latency compared to traditional storage protocols
- Higher IOPS and throughput
- Better scalability and efficiency
- Support for parallel processing with multiple queues

#### vSphere NVMe Support
vSphere provides comprehensive support for NVMe devices:
- Native NVMe driver support
- Passthrough capabilities for virtual machines
- Support for NVMe over Fabrics (NVMe-oF)
- Integration with vSAN for all-flash configurations

#### iSER (iSCSI Extensions for RDMA)
iSER enhances traditional iSCSI by leveraging RDMA for improved performance:
- Reduced CPU overhead
- Lower latency
- Higher throughput
- Better scalability

### 2. vSAN Architecture and Configuration

#### vSAN Overview
VMware vSAN is a software-defined storage solution that aggregates local storage resources from ESXi hosts to create a shared datastore.

**Key Components:**
- **Hosts**: Physical servers contributing storage resources
- **Disks**: SSDs and HDDs providing cache and capacity tiers
- **Network**: High-speed interconnect for data synchronization
- **vSAN Cluster**: Group of hosts working together to provide storage

#### vSAN Architecture
**Storage Policy-Based Management (SPBM):**
- Policies define storage requirements for virtual machines
- Automatic placement and compliance checking
- Dynamic policy updates without downtime

**Object-Based Storage:**
- Data is stored as objects with metadata
- Flexible placement across cluster nodes
- Built-in replication and protection

#### Configuration Requirements
**Hardware Requirements:**
- Minimum 3 hosts for vSAN cluster
- Supported storage controllers and devices
- Adequate network bandwidth (10GbE recommended)
- Sufficient memory and CPU resources

**Network Requirements:**
- Dedicated vSAN network for optimal performance
- Jumbo frames support (MTU 9000)
- Low latency and high bandwidth connectivity
- Redundant network paths

### 3. Storage Policy-Based Management (SPBM)

#### Understanding SPBM
Storage Policy-Based Management allows administrators to define storage requirements as policies that are automatically enforced by vSphere.

**Policy Components:**
- **Capability Definitions**: Storage features and characteristics
- **Capability Constraints**: Specific requirements for each capability
- **Rule Sets**: Collections of constraints that define a policy
- **Associations**: Linking policies to virtual machines or datastores

#### Creating Storage Policies
**Steps to Create a Policy:**
1. In the vSphere Client, navigate to **Storage Policies**
2. Click **New VM Storage Policy**
3. Define policy name and description
4. Select policy components and configure constraints
5. Assign the policy to virtual machines or datastores

**Common Policy Settings:**
- Number of failures to tolerate (FTT)
- Failure tolerance method (RAID, Erasure Coding)
- Flash read cache reservation
- IOPS limit for object
- Object space reservation

#### Policy Management
**Best Practices:**
- Create policies that match application requirements
- Regularly review and update policies
- Monitor policy compliance status
- Use policy tags for easier management

### 4. vSphere Virtual Volumes (vVols)

#### What are vVols?
vSphere Virtual Volumes represent a transformation in how storage is consumed and managed, moving from LUN-based to VM-based storage management.

**Key Benefits:**
- Array integration at the VM level
- Granular storage management
- Advanced data services per VM
- Simplified storage operations

#### vVols Architecture
**Components:**
- **Storage Provider**: Array vendor's implementation
- **vCenter Server**: Policy management and orchestration
- **ESXi Host**: VASA provider communication
- **Virtual Volumes**: Individual VM disk objects

**Types of vVols:**
- **Data vVols**: Store virtual machine data
- **Swap vVols**: Store virtual machine memory swap files
- **Memory vVols**: Store virtual machine suspend files

#### vVols Implementation
**Requirements:**
- VASA 2.0 compliant storage array
- vSphere 6.0 or later
- Proper network connectivity
- Storage provider registration

**Configuration Steps:**
1. Register storage provider in vCenter
2. Create storage containers
3. Define storage capabilities
4. Create VM storage policies
5. Deploy virtual machines with vVol datastores

### 5. Storage I/O Control (SIOC)

#### Understanding SIOC
Storage I/O Control helps prevent storage performance degradation by monitoring and controlling I/O activity to datastores.

**How SIOC Works:**
- Monitors datastore latency
- Automatically enforces I/O limits when latency exceeds threshold
- Prioritizes I/O based on shares and limits
- Provides detailed performance statistics

#### Configuring SIOC
**Steps to Enable SIOC:**
1. Select the datastore in the vSphere Client
2. Go to **Configure** > **Settings** > **Resource Allocation**
3. Enable Storage I/O Control
4. Set congestion threshold (default 30ms)
5. Configure shares, limits, and reservations

**Configuration Options:**
- **Congestion Threshold**: Latency threshold for I/O control activation
- **Shares**: Relative priority of virtual machines
- **Limit**: Maximum IOPS per virtual machine
- **Reservation**: Guaranteed minimum IOPS per virtual machine

#### Benefits of SIOC
- Prevents datastore performance degradation
- Ensures critical workloads receive priority
- Provides visibility into storage performance
- Enables proactive performance management

## Hands-On Exercises

### Exercise 1: Configuring vSAN
1. Create a vSAN cluster with minimum 3 hosts
2. Configure disk groups with SSD cache and HDD capacity
3. Verify cluster health and performance
4. Create storage policies and assign to virtual machines

### Exercise 2: Creating Storage Policies
1. Define storage policies for different workload types
2. Configure FTT and RAID settings
3. Assign policies to virtual machines
4. Monitor policy compliance status

### Exercise 3: Enabling and Configuring SIOC
1. Enable SIOC on a test datastore
2. Set congestion threshold and monitor latency
3. Configure shares and limits for virtual machines
4. Observe I/O control behavior under load

## Key Takeaways
- NVMe and iSER provide high-performance storage connectivity
- vSAN offers software-defined storage with policy-based management
- SPBM enables granular storage control at the VM level
- vVols provide array integration and advanced data services
- SIOC helps prevent storage performance degradation

## Further Reading
- VMware vSAN Documentation
- Storage Policy-Based Management Guide
- vSphere Virtual Volumes Implementation Guide
- Storage I/O Control Best Practices