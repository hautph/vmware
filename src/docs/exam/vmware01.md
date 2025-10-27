---
title: VMware vSphere Professional Exam - Set 1
module: Professional VMware vSphere 8.x
total_questions: 108
---

# VMware vSphere Professional Exam - Set 1

## Page 1

### Question 1
An administrator receives reports from the application team of poor performance of a virtual machine (VM). The administrator reviews the virtual machine and discovers that it has 20 snapshots that are over 12 months old. What could the administrator do to improve the VM's performance?

**Select one:**
1. Inflate the base disk to make space for future snapshots.
2. Revert to the latest snapshot.
3. Consolidate all of the snapshots into the base VM.
4. Identify and delete the largest delta .vmdk file.

### Question 2
An administrator has a requirement to revert a running virtual machine to a previous snapshot after a failed attempt to upgrade an application. When the administrator originally took the snapshot, the following choices in the Take Snapshot dialog were made:
- Snapshot the virtual machine's memory = true
- Quiesce guest file system = false

Which two statements describe the result of the administrator selecting the "Revert to Latest Snapshot" option to return the virtual machine to a previous snapshot? (Choose two.)

**Select one or more:**
1. The virtual machine will be restored to the child snapshot.
2. The virtual machine will be restored to the parent snapshot.
3. The virtual machine will be restored in a powered off state.
4. The virtual machine will be restored in a powered on state.
5. The virtual machine will be restored in a suspended state.

### Question 3
To keep virtual machines (VMs) up and running at all times in a vSphere cluster, an administrator would like VMs to be migrated automatically when the host hardware health status becomes degraded. Which cluster feature can be used to meet this requirement?

**Select one:**
1. vSphere HA Orchestrated Restart
2. vSphere Fault Tolerance
3. Predictive DRS
4. Proactive HA

### Question 4
An administrator plans to update the Supervisor cluster and has noticed some of the Tanzu Kubernetes Grid clusters are running an incompatible version. Which action must the administrator take before proceeding with the Supervisor cluster update?

**Select one:**
1. No action is needed - Incompatible Tanzu Kubernetes Grid clusters can be manually updated after the Supervisor cluster update.
2. Update all Tanzu Kubernetes Grid clusters to the latest version prior to the Supervisor cluster update
3. Update incompatible Tanzu Kubernetes Grid clusters prior to the Supervisor cluster update
4. No action is needed - Tanzu Kubernetes Grid clusters will be updated automatically as part of the update process.

### Question 5
An administrator needs to create affinity rules for the following vSphere cluster setup:
- The cluster contains two virtual machines (VMs) named app01 and app02.
- The cluster contains six hosts named esx11 through esx16.
- The app01 and app02 VMs run software that is licensed to run only on esx11, esx12, or esx13.
- vSphere Distributed Resource Scheduler (DRS) is configured.

Which set of steps must the administrator perform to ensure that the licensing requirements are met for app01 and app02?

**Select one:**
1. 1. Add the esx11 - esx13 hosts to a host group. 2. Create a VM-VM affinity rule for app01 and app02.
2. 1. Add all the hosts to a host group. 2. Create a VM-VM anti-affinity rule for app01 and app02.
3. 1. Add the VMs to a VM group and the esx11 - esx13 hosts to a host group. 2. Create a VM-Host required rule between the VM group and the host group.
4. 1. Add the VMs to a VM group and the esx11 - esx13 hosts to a host group. 2. Create a VM-Host preferential rule between the VM group and the host group.

## Page 2

### Question 6
An administrator is completing the configuration of a new vSphere cluster and has enabled vSphere High Availability (HA) and vSphere Distributed Resource Scheduler (DRS). After adding the ESXi hosts to the cluster, which networking information will the administrator be prompted to provide when using the Cluster Quickstart workflow?

**Select one:**
1. Management networking
2. vMotion networking
3. vSAN networking
4. Virtual machine networking

### Question 7
An administrator creates a virtual machine that contains the latest company-approved software, tools and security updates. Company policy requires that only full clones are allowed for server workloads. A combination of which two tasks should the administrator complete to prepare for the deployment of this virtual machine for multiple users? (Choose two.)

**Select one or more:**
1. Set appropriate permissions on the virtual machine.
2. Convert the virtual machine to a template.
3. Upgrade the virtual hardware.
4. Take a snapshot of the virtual machine.
5. Create a virtual machine customization specification.

### Question 8
A VMkernel port is labelled PROD01 and uses the default TCP/IP stack. Currently, this VMkernel port is configured for supporting live virtual machine (VM) migrations. Which configuration change should the administrator make to isolate live VM migration traffic from other network traffic?

**Select one:**
1. Modify PROD01 by changing the TCP/IP stack to vSphere vMotion.
2. Remove PROD01 and create a new VMkernel port and set the TCP/IP stack to vSphere vMotion.
3. Create a new VMkernel port and set the TCP/IP stack to provisioning.
4. Remove PROD01 and create a new VMkernel port with the TCP/IP stack set to provisioning

### Question 9
Which two actions should an administrator take to ensure a VM has the highest networking bandwidth? (Choose two.)

**Select one or more:**
1. Configure traffic shaping
2. Configure resource pools
3. Configure shares, reservations, and limits
4. Configure marking and filtering
5. Configure LACP

### Question 10
An administrator is tasked with allowing a single user the ability to take snapshots on a virtual machine. When looking in vCenter, the administrator can see that there are already users and groups assigned permissions on the virtual machine as follows:
- The group VM_Users has the Virtual Machine Power User role.
- The group VM_Viewers has the Read Only role.

The administrator confirms that the user requesting the additional access is currently one of five members of the VM_Viewers group. Which two steps should the administrator take to grant this user the additional access required without impacting the user access of others? (Choose two.)

**Select one or more:**
1. Add the user to the VM_Users group and leave the permissions on the virtual machine object unchanged
2. Add a new permission on the virtual machine object selecting the user and the new custom role.
3. Edit the Read Only role to add the Virtual Machine Snapshot Management privileges.
4. Add a new permission on the virtual machine object selecting the VM Viewers group and the new custom role.
5. Create a new custom role with the Virtual Machine Snapshot Management privileges

## Page 3

### Question 11
An administrator is tasked with configuring certificates for a VMware software-defined data center (SDDC) based on the following requirements:
- The solution should minimize the ongoing management overhead of replacing certificates.
- No intermediate certificate authorities are allowed in the certificate chain.
- All external traffic should be secured using certificates signed by an Enterprise Certificate Authority (CA).

Which two actions should the administrator take to ensure the solution meets corporate policy? (Choose two.)

**Select one or more:**
1. Replace the solution user certificates with self-signed certificates generated from the VMware Certificate Authority (VMCA)
2. Replace the VMware Certificate Authority (VMCA) certificate with a custom certificate generated from the Enterprise CA.
3. Replace the machine SSL certificates with self-signed certificates generated from the VMware Certificate Authority (VMCA).
4. Replace the solution user certificates with custom certificates generated from the Enterprise CA
5. Replace the machine SSL certificates with custom certificates generated from the Enterprise CA

### Question 12
An administrator notices a performance issue in VMware vCenter. To try and understand more about the performance issue, the administrator needs to gather more information about the vCenter database to eliminate a potential disk space issue. Which two tools can the administrator use? (Choose two.)

**Select one or more:**
1. Perfmon
2. vCenter Management Interface (VAMI)
3. df
4. vSphere Client
5. esxtop

### Question 13
An administrator plans to bring VMware vCenter offline in order to perform hardware maintenance on the host where the vCenter Server Appliance is running. Which vSphere feature must be configured to ensure that vCenter users experience minimal downtime?

**Select one:**
1. Hybrid Linked Mode
2. vSphere Distributed Resource Scheduler
3. vCenter Server High Availability
4. Enhanced Linked Mode

### Question 14
Refer to the exhibit. After removing an ESXi host from a cluster for maintenance, a number of virtual machines have encountered the warning seen in the exhibit. After re-adding the ESXi, the issue is resolved. Which step should the administrator take to move the triggered alarm to its normal state?

**Select one:**
1. Disable
2. Acknowledge
3. Ignore
4. Reset to Green

### Question 15
An administrator is tasked with deploying a new on-premises software-defined data center (SDDC) that will contain a total of eight VMware vCenter instances. The following requirements must be met:
All vCenter instances should be visible in a single vSphere Client session.
All vCenter inventory should be searchable from a single vSphere Client session.
Any administrator must be able to complete operations on any vCenter instance using a single set of credentials.

What should the administrator configure to meet these requirements?

**Select one:**
1. A single Enhanced Linked Mode group consisting of eight vCenter instances in one Single Sign-On domain.
2. A single Hybrid Linked Mode group consisting of eight vCenter instances in one Single Sign-On domain.
3. Two Enhanced Linked Mode groups consisting of four vCenter instances each in a Single Sign-On domain.
4. A single Hybrid Linked Mode group consisting of four vCenter instances each in a Single Sign-On domain.

## Page 4

### Question 16
An administrator has Windows virtual machines (VMs) and VMware Tools is installed in each VM. The administrator performs a status check of VMware Tools using vSphere Lifecycle Manager. What is the VMware Tools status for the Windows VMs if the version of VMware Tools has a known problem and must be immediately upgraded?

**Select one:**
1. Version Unsupported
2. Guest Managed
3. Unknown
4. Upgrade Available

### Question 17
An administrator is creating a content library to manage VM templates and ISO images. The administrator wants to password-protect the images and templates and share them with a remote site. Which two tasks must the administration perform when creating the content library? (Choose two.)

**Select one or more:**
1. Enable authentication.
2. Publish the local content library.
3. Enable the security policy.
4. Create a subscribed content library.
5. Select an NFS datastore.

### Question 18
An administrator needs to perform maintenance on a datastore that is running the vSphere Cluster Services (vCLS) virtual machines (VMs). Which feature can the administrator use in this scenario to avoid the use of Storage vMotion on the vCLS VMs?

**Select one:**
1. vSphere Distributed Resource Scheduler (DRS)
2. vSphere vMotion
3. vSphere Fault Tolerance
4. vCLS Retreat Mode

### Question 19
An administrator is tasked with looking into the disaster recovery (DR) options for a software-defined data center (SDDC). The following requirements must be met:
- All virtual machines (VMs) must be protected to a secondary site.
- The source VMs must remain online until the failover.
- When failing over to the secondary site, application downtime is allowed.
- The DR failover must be managed from the vSphere Client.
- Costs must remain as low as possible.

How can the administrator accomplish this task?

**Select one:**
1. Configure VMware Cloud Disaster Recovery (VCDR) and combine it with array-based storage replication.
2. Configure VMware a Site Recovery Manager and combine it with vSphere Replication.
3. Configure VMware Site Recovery Manager and combine it with array-based storage replication.
4. Configure VMware Site Recovery Manager and combine it with array-based storage replication.

### Question 20
An administrator is performing maintenance activities and discovers that a Virtual Machine File System (VMFS) datastore has a lot more used capacity than expected. The datastore contains 10 virtual machines (VMs) and, when the administrator reviews the contents of the associated datastore, discovers that five virtual machines have a snapshot file (-delta.vmdk files) that has not been modified in over 12 months. The administrator checks the Snapshot Manager within the vSphere Client and confirms that there are no snapshots visible. Which task should the administrator complete on the virtual machines to free up datastore space?

**Select one:**
1. Storage vMotion each VM to another datastore.
2. Delete all snapshots for each VM.
3. Consolidate the snapshots for each VM.
4. Inflate the disk files for each VM.

## Page 5

### Question 21
An administrator wants to use tag-based placement rules on their virtual machine disks using VMware vCenter. Which option would allow the administrator to achieve this?

**Select one:**
1. Storage Policy Based Management
2. Storage I/O Control
3. vSphere Storage APIs for Storage Awareness (VASA)
4. vSphere Distributed Resource Scheduler (DRS)

### Question 22
Refer to the exhibit. An administrator configures a distributed switch and adds the first VMware ESXi server to it. The administrator also performs the following activities:
- The administrator assigns two uplinks to the distributed switch.
- The administrator enables uplink teaming.

When attempting to perform a health check of the teaming policy, the health status of the Teaming and Failover reports as "Unknown", as seen in the exhibit. What can the administrator changes in the distributed switch for the health status to report correctly?

**Select one:**
1. Add a minimum of two hosts with one uplink each
2. Add a minimum of three hosts with four uplinks each
3. Add a minimum of three hosts with two uplinks each
4. Add a minimum of two hosts with two uplinks each

### Question 23
A vSphere cluster has the following vSphere Distributed Resource Scheduler (DRS) group configuration:
Virtual machine (VM) group named DB
Host groups named PROD11 and PROD55

The administrator wants to force the VMs in the DB group to run on the hosts in the PROD11 group. However, if all the hosts in PROD11 go offline for maintenance, then the VMs in the DB group should run on hosts in PROD55. Which VM/Host rule must the administrator create to ensure that these requirements are met?

**Select one:**
1. A required rule between the DB group and the PROD11 group
2. A preferential rule between the DB group and the PROD11 group
3. A required rule between the DB group and the PROD55 group
4. A preferential rule between the DB group and the PROD55 group

### Question 24
An administrator is tasked with configuring certificates for a VMware software-defined data center (SDDC) based on the following requirements:
- All certificates should use certificates trusted by the Enterprise Certificate Authority (CA).
- The solution should minimize the ongoing management overhead of replacing certificates.

Which three actions should the administrator take to ensure that the solution meets corporate policy? (Choose three.)

**Select one or more:**
1. Replace the solution user certificates with custom certificates generated from the Enterprise CA.
2. Replace the machine SSL certificates with trusted certificates generated from the VMware Certificate Authority (VMCA).
3. Replace the solution user certificates with trusted certificates generated from the VMware Certificate Authority (VMCA).
4. Replace the VMware Certificate Authority (VMCA) certificate with a self-signed certificate generated from the VMCA.
5. Replace the VMware Certificate Authority (VMCA) certificate with a custom certificate generated from the Enterprise CA.
6. Replace the machine SSL certificates with custom certificates generated from the Enterprise CA.

### Question 25
Which two infrastructure services are provided by the Platform Services Controller? (Choose two.)

**Select one or more:**
1. vSphere Syslog Collector
2. vCenter Single Sign-On
3. License Service
4. vSphere Web Client
5. Auto Deploy

## Page 6

### Question 26
Which step is completed during Stage 1 of the vCenter Server Appliance deployment?

**Select one:**
1. Configure SSH access
2. Join a vCenter Single Sign-On domain
3. Create a new vCenter Single Sign-On domain
4. Select the deployment size

### Question 27
The vCenter inventory contains a virtual machine (VM) template called Linux-01. The administrator wants to install a software patch into Linux-01 while allowing users to continue to access Linux-01 to deploy VMs. Which series of steps should the administrator take to accomplish this task?

**Select one:**
1. 1. Verify that Linux-01 is in a content library. 2. Check out Linux-01. 3. Install the software patch. 4. Check in Linux-01.
2. 1. Clone Linux-01. 2. Convert the clone to a VM. 3. Install the software patch. 4. Convert the VM back to a template.
3. 1. Verify that Linux-01 is in a content library. 2. Clone Linux-01 3. Convert the clone to a VM. 4. Install the software patch.
4. 1. Convert Linux-01 to a VM 2. Install the software patch. 3. Convert the VM back to a VM template. 4. Add Linux-01 to the content library.

### Question 28
An administrator has a requirement to revert a running virtual machine to a previous snapshot after a failed attempt to upgrade an application. When the administrator originally took the snapshot, the following choices in the Take Snapshot dialog were made:
- Snapshot the virtual machine's memory = false
- Quiesce guest file system = false

What will be the result of the administrator selecting the "Revert to Latest Snapshot" option to return the virtual machine to a previous snapshot?

**Select one:**
1. The virtual machine will be restored to the child snapshot in a powered off state.
2. The virtual machine will be restored to the child snapshot in a powered on state
3. The virtual machine will be restored to the parent snapshot in a powered on state.
4. The virtual machine will be restored to the parent snapshot in a powered off state.

### Question 29
Which two datastore types store the components of a virtual machine as a set of objects? (Choose two.)

**Select one or more:**
1. Network File System (NFS) 4.1
2. vSphere Virtual Volumes (vVols)
3. Network File System (NFS) 3
4. VMware vSAN
5. VMware Virtual Machine File System (VMFS)

### Question 30
After a number of outages within a production VMware software-defined data center, an administrator is tasked with identifying a solution to meet the following requirements:
Reduce the risk of outages by proactively identifying issues with the environment and resolving them.
Reduce the complexity of uploading log bundles when raising support tickets.

Which solution should the administrator recommend to meet these requirements?

**Select one:**
1. VMware Skyline Advisor Pro
2. VMware Aria Operations for Logs
3. VMware Aria Operations
4. VMware Skyline Health

## Page 7

### Question 31
An administrator has configured Storage I/O Control (SIOC) on a Virtual Machine File System (VMFS) datastore.
- The datastore supports 30,000 IOPS
- Storage I/O Control has been set to manual
- Storage I/O Control is triggered when latency hits 30 ms
- The datastore contains 3 virtual machines (VMs)
    1. A gold tier VM
    2. A silver tier VM
    3. A bronze tier VM

Assuming the datastore latency does not exceed 29ms, what is the maximum number of IOPS the bronze tier VM is entitled to?

**Select one:**
1. 5,000
2. 20,000
3. 30,000
4. 10,000

### Question 32
A vSphere cluster has the following configuration:
Virtual machines (VMs) are running Production and Test workloads
vSphere Distributed Resource Scheduler (DRS) is enabled
There are no resource pools in the cluster

Performance monitoring data shows that the Production workload VMs are not receiving their fully allocated memory when the vSphere cluster is fully utilized. A combination of which two steps could the administrator perform to ensure that the Production VMs are always guaranteed the full allocation of memory? (Choose two.)

**Select one or more:**
1. Create a sibling resource pool for each of the Production and Test VMs.
2. Create a child resource pool for the Test VMs.
3. Create a parent resource pool for the Production VMs.
4. Assign a custom memory share value to the resource pool containing the Production VMs.
5. Assign a memory reservation value to the resource pool containing the Production VMs.

### Question 33
Which feature would allow for the non-disruptive migration of a virtual machine between two clusters in a single VMware vCenter instance?

**Select one:**
1. vSphere vMotion
2. vSphere Fault Tolerance
3. vSphere Storage vMotion
4. Cross vCenter Migration

### Question 34
Which two tasks can be completed using vSphere LifeCycle Manager? (Choose two.)

**Select one or more:**
1. Check that the ESXi hosts are compliant with the recommended baseline and update the hosts.
2. Upgrade VMware vCenter from version 7 to 8.
3. Manage the firmware lifecycle of ESXi hosts that are part of a managed cluster with a single image.
4. Manage the firmware lifecycle of ESXi hosts are part of a managed cluster using baselines.
5. Check the hardware compatibility of the hosts in a cluster against the VMware Compatibility Guide (VCG) using baselines.

### Question 35
An administrator needs to update a VMware vCenter instance to a newer minor release version. Due to restrictions within the environment, the vCenter instance does not have access to the Internet. As a first step, the administrator downloads the required update on another machine. What are the next steps the administrator must perform to complete the update?

**Select one:**
1. Mount the ISO update file to the CD-ROM drive of the vCenter instance. Use the vCenter Management Interface to select the CD-ROM as the source for the update.
2. Place the ZIP update file in a folder accessible to the vCenter instance over HTTPS. Use the vSphere Client to select the update file as the source for the update.
3. Place the ISO update file in a folder accessible to the vCenter instance over HTTPS. Use the vCenter Management Interface to select the update file as the source for the update.
4. Place the update ISO file in a Virtual Machine File System (VMFS) datastore. Use the vSphere Client to select the update ISO file as the source for the update.

## Page 8

### Question 36
Refer to the exhibit. After updating a predefined alarm on VMware vCenter, an administrator enables email notifications as shown in the attached alarm; however, notifications are NOT being sent. Where must the mail server settings be configured by the administrator to resolve this issue?

**Select one:**
1. In the ESXi host system config
2. In the vCenter settings in the vSphere Client
3. In the vCenter Management Interface
4. In the alarm rule definition

### Question 37
An administrator is attempting to configure Storage I/O Control (SIOC) on five datastores within a vSphere environment. The administrator is being asked to determine why SIOC configuration completed successfully on only four of the datastores. What are two possible reasons why the configuration was not successful? (Choose two.)

**Select one or more:**
1. The datastore is using ISCSI
2. SAS disks are used for the datastore.
3. The datastore has multiple extents
4. The administrator is using NFS storage
5. The datastore contains Raw Device Mappings (RDMs).

### Question 38
An administrator is tasked with configuring an appropriate Single Sign-On (SSO) solution for VMware vCenter based on the following criteria:
- The solution should support the creation of Enhanced Link Mode groups.
- All user accounts are stored within a single Active Directory domain and the solution must support only this Active Directory domain as the identity source.
- All user account password and account lockout policies must be managed within the Active Directory domain.
- The solution should support token-based authentication.

Which SSO solution should the administrator choose based on the criteria?

**Select one:**
1. vCenter Identity Provider Federation with Active Directory over LDAP as the identity provider
2. vCenter Single Sign-On with Active Directory (Windows Integrated Authentication) as the identity source
3. vCenter Identity Provider Federation with Active Directory Federation Services as the identity provider
4. vCenter Single Sign-On with Active Directory over LDAP as the identity source

### Question 39
An administrator is adding a new ESXi host to an existing vSphere cluster. When selecting the cluster, the administrator is unable to use the Cluster Quickstart workflow to add and configure the additional host. What could be the root cause of this issue?

**Select one:**
1. The administrator must manually add the host to the cluster before using the Cluster Quickstart workflow.
2. The administrator has not been assigned the required permissions to use the Cluster Quickstart workflow
3. The administrator must enable the Cluster Quickstart workflow option in VMware vCenter
4. The administrator has previously dismissed the Cluster Quickstart workflow

### Question 40
Which three features are only available when using vSphere Distributed Switches instead of vSphere Standard Switches? (Choose three.)

**Select one or more:**
1. Netflow
2. Configuration backup and restore
3. IPv4 support
4. 802.1Q tagging
5. Port mirroring
6. IPv6 support

## Page 9

### Question 41
An administrator is investigating user logon failures for a VMware vCenter instance. Where can the administrator find log files containing information related to user login activities?

**Select one:**
1. In the vSphere Client when viewing the vCenter virtual machine
2. On the vCenter Management Interface
3. On the ESXi host using the Direct Console User Interface
4. On the vCenter Server Appliance

### Question 42
What are three options an administrator can configure after creating a vSphere Namespace? (Choose three.)

**Select one or more:**
1. Storage policies
2. Update policies
3. Backup schedule
4. Permissions
5. Certificates
6. Resource and Object limits

### Question 43
An administrator is tasked with moving an application and guest operating system (OS) running on top of a physical server to a software-defined data center (SDDC) in a remote secure location. The following constraints apply:
- The remote secure location has no network connectivity to the outside world.
- The business owner is not concerned if all changes in the application make it to the SDDC in the secure location.
- The application's data is hosted in a database with a high number of transactions.

What could the administrator do to create an image of the guest OS and application that can be moved to this remote data center?

**Select one:**
1. Create a hot clone of the physical server using VMware vCenter Converter.
2. Use storage replication to replicate the guest OS and application.
3. Create a cold clone of the physical server using VMware vCenter Converter.
4. Restore the guest OS from a backup.

### Question 44
An administrator manages VM templates and ISO images for a remote office. Their main requirements are to store these templates in a single repository and manage different versions of the templates. What solution should the administrator deploy to meet these requirements?

**Select one:**
1. A subscribed content library
2. A vSAN datatore
3. A local content library
4. A shared VMFS datastore

### Question 45
Refer to the exhibit. An administrator set up the following configuration:
- The distributed switch has four ESXi hosts, and each host has two 10 Gbps NICs.
- In the Network I/O Control configuration, the amount of bandwidth reserved for virtual machine (VM) traffic if 4 Gbps.

The administrator wants to guarantee that VMs in the Retail distributed port group can access 50 percent of the available reserved bandwidth for VM traffic. Given this scenario, what should the size (in Gbps) of the Retail network resource pool be?

**Select one:**
1. 8
2. 40
3. 16
4. 32

## Page 10

### Question 46
Which four elements can a vSphere Lifecycle Manager image contain? (Choose four.)

**Select one or more:**
1. ESXi base image
2. ESXi configuration
3. Vendor agents
4. Independent components
5. BIOS updates
6. Vendor add-ons
7. Firmware and drivers add-on

### Question 47
An administrator is configuring a vSphere cluster to use a vSphere Lifecycle Manager image. The vSphere Lifecycle Manager depot has been configured with all of the software components needed for the image. The administrator plans to reuse an existing image that is configured on a cluster in another VMware vCenter instance. Which series of steps should the administrator take to complete this task?

**Select one:**
1. 1. Export the existing image to an ISO file format to a web server. 2. Upload the ISO file to a datastore accessible to the vSphere Cluster. 3. Import the image from the uploaded ISO file into the vSphere Lifecycle Manager Import Image dialog to create a new image.
2. 1. Export the existing image to an ISO file format to their local machine. 2. Attach the ISO file to the CD-ROM drive of the ESXi host. 3. Import the image from the CD-ROM drive of the ESXi host into the vSphere Lifecycle Manager Import Image dialog to create a new image.
3. 1. Export the existing image to a JSON file format to their local machine. 2. Import the JSON image file into the vSphere Lifecycle Manager Import Image dialog to create a new image.
4. 1. Export the existing image to a ZIP file format to a web server machine. 2. Import the ZIP image file into the vSphere Lifecycle Manager depot to create a new image.

### Question 48
A combination of which two components of the software-defined data center (SDDC) are responsible for the initial abstraction of CPU, memory, disk, and network resources and their subsequent management? (Choose two.)

**Select one or more:**
1. VMware ESXi
2. VMware Aria Suite Lifecycle
3. VMware Aria Operations
4. VMware vCenter Cloud Gateway
5. VMware vCenter

### Question 49
An administrator is tasked with looking into the disaster recovery options for protecting a database server using VMware vSphere Replication. The following requirements must be met:
The virtual machine must remain online during the protection.
The virtual machine's snapshots must be used as part of the replication process.

Which step must the administrator complete to accomplish this task?

**Select one:**
1. Configure the virtual machine storage policy.
2. Enable guest OS VSS quiescing for this virtual machine.
3. Perform a full initial synchronization of the source virtual machine to the target location.
4. Configure network traffic isolation for vSphere Replication.

### Question 50
An administrator needs to consolidate a number of physical servers by migrating the workloads to a software-defined data center solution. Which VMware solution should the administrator recommend?

**Select one:**
1. VMware NSX
2. VMware vSphere
3. VMware Horizon
4. VMware vSAN

## Page 11

### Question 51
An administrator enables Secure Boot on an ESXi host. On booting the ESXi host, the following error message appears:
Fatal error: 39 (Secure Boot Failed)

What is the cause of this issue?

**Select one:**
1. The Trusted Platform Module chip has failed.
2. The administrator attempted to boot with a bootloader that is unsigned or has been tampered with.
3. The kernel hos been tampered with.
4. A package (VIB or driver) has been tampered with

### Question 52
After adding a new vSphere ESXi host with identical hardware configuration to an existing vSphere cluster, which task would an administrator complete prior to checking the compliance with an existing host profile?

**Select one:**
1. Copy the host setting from the new host
2. Import the host profile
3. Duplicate the host profile
4. Attach the host profile to the new host

### Question 53
An administrator notices a Fibre Channel adapter in an ESXi host has been experiencing inconsistent connectivity states. Which trigger can be used to quickly identify the issue and alert the administrator so that the issue can be resolved?

**Select one:**
1. Lost Network Connectivity
2. Host Connection Lost
3. Lost Network Path Redundancy
4. Lost Storage Connectivity

### Question 54
A VMkernel port is labelled PROD01 and uses the default TCP/IP stack. Which configuration change should the administrator make to isolate long-distance vSphere vMotion migration traffic from other vSphere vMotion traffic?

**Select one:**
1. Remove PROD01 and create a new VMkernel port with the TCP/IP stack set to provisioning.
2. Remove PROD01 and create a new VMkernel port with the TCP/IP stack set to vMotion.
3. Create a new VMkernel port and set the TCP/IP stack to vMotion.
4. Modify PROD01 by changing the TCP/IP stack to provisioning.

### Question 55
Refer to the exhibit. Given the configuration shown in the exhibit, what should the administrator do if the latest VM template contains changes that are no longer needed?

**Select one:**
1. Revert to App-LibTemplate (2)
2. Delete App-LibTemplate (2)
3. Check out App-LibTemplate (3)
4. Delete App-LibTemplate (3)

## Page 12

### Question 56
A company has two sites: Site A and Site B. The administrator would like to manage the VMware vCenter inventories in both sites from a single vSphere Client session. Which vCenter feature must be configured?

**Select one:**
1. Enhanced Linked Mode
2. VMware Site Recovery Manager
3. VMware Certificate Authority
4. vCenter Single Sign-On

### Question 57
An administrator is deploying a new all flash vSAN cluster based on the vSAN Original Storage Architecture (OSA). What is the minimum supported network throughput in Gb/s for each host?

**Select one:**
1. 1
2. 25
3. 10
4. 50

### Question 58
An administrator has been notified that a number of hosts are not compliant with the company policy for time synchronization. The relevant portion of the policy states:
All physical servers must synchronize time with an external time source that is accurate to the microsecond.

Which step should the administrator take to ensure compliance with the policy?

**Select one:**
1. Ensure that each vCenter Server Appliance is configured to use a Precision Time Protocol (PTP) source.
2. Ensure that each vCenter Server Appliance is configured to use a Network Time Protocol (NTP) source
3. Ensure that each ESXi host is configured to use a Precision Time Protocol (PTP) source.
4. Ensure that each ESXi host is configured to use a Network Time Protocol (NTP) source

### Question 59
An administrator has a requirement to revert a running virtual machine to a previous snapshot after a failed attempt to upgrade an application. When the administrator originally took the snapshot, the following choices in the Take Snapshot dialog were made:
- Snapshot the virtual machine's memory = false
- Quiesce guest file system = false

What will be the result of the administrator selecting the "Revert to Latest Snapshot" option to return the virtual machine to a previous snapshot? (Choose two.)

**Select one or more:**
1. The virtual machine will be restored in a powered on state.
2. The virtual machine will be restored to the child snapshot
3. The virtual machine will be restored in a powered off state.
4. The virtual machine will be restored to the parent snapshot
5. The virtual machine will be restored in a suspended state.

### Question 60
A vSphere environment is experiencing intermittent short bursts of CPU contention, causing brief production outages for some of the virtual machines (VMs). To understand the cause of the issue, the administrator wants to observe near real-time statistics tor all VMs. Which two vSphere reporting tools could the administrator use? (Choose two.)

**Select one or more:**
1. esxtop
2. esxcli
3. Overview Performance Charts
4. resxtop
5. Advanced Performance Charts

## Page 13

### Question 61
A group of new virtual machines have been deployed using thin-provisioned disks due to the limited storage space available in an environment. The storage team has expressed concern about extensive use of this type of provisioning. An administrator is tasked with creating a custom alarm to notify the storage team when thin provisioning reaches a certain capacity threshold. Where must the administrator define this alarm?

**Select one:**
1. Data center
2. Datastore cluster
3. Virtual machine
4. Datastore

### Question 62
An administrator decides to restore VMware vCenter from a file-based backup following a failed upgrade. Which interface should the administrator use to complete the restore?

**Select one:**
1. Direct Console User Interface (DCUI)
2. vSphere Client
3. vCenter Management Interface (VAMI)
4. vCenter GUI Installer

### Question 63
What is the minimum network throughput in Gb/s for vSAN using the Express Storage Architecture (ESA)?

**Select one:**
1. 10
2. 50
3. 25
4. 1

### Question 64
An administrator is asked to configure a security policy at the port group level of a standard switch. The following requirements must be met:
- The security policy must apply to all virtual machines on portgroup-1.
- All traffic must be forwarded, regardless of the destination.

Which security policy must the administrator configure?

**Select one:**
1. Promiscuous mode set to accept
2. Forged transmits set to reject
3. Promiscuous mode set to reject
4. MAC address changes set to accept

### Question 65
An administrator remotely deploys VMware ESXi using an out of band management connection and now needs to complete the configuration of the management network so that the host is accessible through the vSphere Host Client. The following information has been provided to complete the configuration:
- Host FQDN: esxi01.corp.local
- Management VLAN ID: 10
- DHCP: No
- Management IP Address: 172.16.10.101/24
- Management IP Gateway: 172.16.10.1
- Corporate DNS Servers: 172.16.10.5, 172.16.10.6
- DNS Domain: corp.local

In addition, all host configurations must also meet the following requirements:
- The management network must use only IPv4 network protocols.
- The management network must be fault tolerant.

Which four high level tasks should the administrator complete in the Direct Console User Interface (DCUI) in order to meet the requirements and successfully log into the vSphere Host Client? (Choose four.)

**Select one or more:**
1. Update the VMware ESXi Management Network DNS configuration to use the corporate DNS servers for names resolution.
2. Update the VMware ESXi Management Network IPv4 configuration to use a static IPv4 address.
3. Restore the original Management vSphere Standard Switch.
4. Disable IPv6 for the VMware ESXi Management Network.
5. Create a DNS A Record for the VMware ESXi host on the corporate DNS servers.
6. Set the value of the VMware ESXi Management Network VLAN ID to 10.
7. Configure at least two network adapters for the VMware ESXi Management Network.

## Page 14

### Question 66
An administrator creates a new corporate virtual machine (VM) template every month to include all of the latest patches. The administrator needs to ensure that the new VM template is synchronized from the primary data center site (London) to two secondary data center sites (Tokyo and New York). The administrator is aware that datastore space is limited within the secondary data center sites. The administrator needs to ensure that the VM template is available in the secondary sites the first time a new virtual machine is requested. Which four steps should the administrator take to meet these requirements? (Choose four.)

**Select one or more:**
1. Create a new subscribed content library in each secondary site
2. Configure the subscribed content library to download content when needed
3. Configure each subscribed content library to download content immediately.
4. Create a new published content library at the primary site
5. Create a new published content library in each secondary site
6. Add the virtual machine template to the subscribed content library
7. Add the virtual machine template to the published content library.

### Question 67
An administrator needs to configure a content library solution based on the following information:
- A new corporate virtual machine (VM) template is created every month to include all of the latest patches.
- The new VM template should be downloaded from the primary data center site (London) to two secondary data center sites (Tokyo and New York) as soon as possible.
- There is limited disk space available at one of the secondary data center sites (Tokyo) due to an ongoing data center consolidation project.

Which four steps should the administrator take to configure the content library solution before adding a VM template? (Choose four.)

**Select one or more:**
1. Create a new published content library at the primary site.
2. Configure the Tokyo subscribed content library to download content immediately.
3. Create a new published content library in each secondary site.
4. Configure the Tokyo subscribed content library to download content when needed.
5. Configure the New York subscribed content library to download content when needed.
6. Configure the New York subscribed content library to download content immediately.
7. Create a new subscribed content library in each secondary site.

### Question 68
An administrator is tasked with applying updates to a vSphere cluster running vSAN using vSphere Lifecycle Manager. Downtime to the ESXi hosts must be minimal while the work is completed. The administrator has already completed the following steps and no errors have been returned:
- Downloaded all applicable software and created a new image.
- Attached the new image to the cluster and run a compliance check against the image for the cluster.
- Ran a remediation pre-check for the cluster.

Which two series of steps should the administrator perform to start the remediation of the cluster using the new image? (Choose two.)

**Select one or more:**
1. 1. Place each of the ESXi hosts into maintenance mode manually. 2. Use the Stage option in vSphere Lifecycle Manager to stage the required software on all ESXi hosts one at a time.
2. 1. Use the Remediate option in vSphere Lifecycle Manager to remediate all of the ESXi hosts in the cluster in parallel. 2. Allow vSphere Lifecycle Manager to automatically control maintenance mode on the ESXi hosts.
3. 1. Leave all ESXi hosts in the cluster operational. 2. Use the Stage All option in vSphere Lifecycle Manager to stage the required software onto all ESXi hosts in the cluster in parallel.
4. 1. Leave all ESXi hosts in the cluster operational. 2. Use the Stage All option in vSphere Lifecycle Manager to stage the required software onto all ESXi hosts one at a time.
5. 1. Use the Remediate option in vSphere Lifecycle Manager to remediate all of the ESXi hosts in the cluster in sequence. 2. Allow vSphere Lifecycle Manager to automatically control maintenance mode on the ESXi hosts.

### Question 69
An administrator is tasked with configuring remote direct memory access (RDMA) over Converged Ethernet v2 (RoCE v2). Which two types of adapters must the administrator configure? (Choose two.)

**Select one or more:**
1. Paravirtual RDMA adapter
2. Fibre Channel over Ethernet (FCoE) adapter
3. RDMA network adapter
4. Software NVMe over RDMA storage adapter
5. Software iSCSi adapter

### Question 70
Refer to the exhibit. An administrator is tasked with adding new capacity to an existing software-defined data center (SDDC).
- The SDDC currently hosts two vSphere clusters (ClusterA and ClusterB) with different CPU compatibilities.
- vSphere vMotion and vSphere Distributed Resource Scheduler (DRS) are currently in use in the SDDC.
- The new capacity will be implemented by provisioning four ESXi hosts running a new generation of Intel Skylake CPUs.
- All workload virtual machines (VMs) must support live migration to any cluster in the SDDC.

The administrator noticed the running critical "evc1" virtual machine (VM) shown in the exhibit is not migrating using vSphere vMotion to the original Clusters A or B. Which three steps must the administrator take to support this functionality? (Choose three.)

**Select one or more:**
1. Configure the Enhanced vMotion Compatibility (EVC) on vSphere Cluster A and B to support Intel Skylake.
2. Power on the VM.
3. Power off the VM.
4. Reboot the VM.
5. Configure the Enhanced vMotion Compatibility (EVC) on the VM to Intel Skylake.
6. Disable the Enhanced vMotion Compatibility (EVC) on the VM.

## Page 15

### Question 71
An administrator is working with VMware Support and is asked to provide log bundles for the ESXi hosts in an environment. Which three options does the administrator have? (Choose three.)

**Select one or more:**
1. Generate a separate log bundle for each ESXi host using the vSphere Host Client.
2. Generate a combined log bundle for all ESXi hosts using the vCenter Management Interface
3. Generate a separate log bundle for each ESXi host using the vSphere Client.
4. Generate a separate log bundle for each ESXi host using the vCenter Management Interface.
5. Generate a combined log bundle for all ESXi hosts using the vSphere Host Client.
6. Generate a combined log bundle for all ESXi hosts using the vSphere Client.

### Question 72
Refer to the exhibit. Given the configuration shown in the exhibit, what must the administrator do to delete only the latest version of the template?

**Select one:**
1. Check out App-LibTemplate (3) and delete the template from the SA-Templates folder.
2. In the SA-Templates folder, rename App-LibTemplate (2) to App-LibTemplate (4).
3. Revert to App-LibTemplate (2) and delete App-LibTemplate (3).
4. Delete App-LibTemplate (3) from the SA-Templates folder.

### Question 73
An administrator is tasked with adding two additional hosts into an existing production vSphere cluster to support the need for additional capacity. The vSphere cluster currently has four identically configured ESXi hosts (esx01, esx02, esx03 and esx04) that utilize Intel Skylake-based CPUs. The two new hosts (esx05 and esx06) are configured identically in terms of memory and storage to the existing hosts, but utilize Intel Ice Lakebased CPUs. The administrator must ensure that:
- Any virtual machine migrates to any of the six ESXi hosts running in the cluster.
- There is no virtual machine downtime during the process of adding the new hosts.

Which step should the administrator take to meet these requirements?

**Select one:**
1. Create a new vSphere cluster with Enhanced vMotion Compatibility (EVC) enabled and move all hosts into the new cluster.
2. Configure Enhanced vMotion Compatibility (EVC) mode on the existing cluster and add the two new hosts into the cluster.
3. Create a new vSphere cluster and move only three hosts into the new cluster.
4. Create a new vSphere cluster with vSphere High Availability (HA) enabled and move all hosts into the new cluster.

### Question 74
An administrator wants to allow a DevOps engineer the ability to delete Tanzu Kubernetes Grid (TKG) cluster objects in a vSphere Namespace. Which role would provide the minimum required permissions to perform this operation?

**Select one:**
1. Can View
2. Can Edit
3. Owner
4. Administrator

### Question 75
An administrator is responsible for the management of a VMware vCenter instance that is currently experiencing performance issues. The administrator quickly identifies that the CPU and memory utilization of vCenter is consistently over 80%. Upon further analysis, it seems that the vpxd process is contributing significantly to the performance issue. A combination of which four steps should the administrator take to resolve the performance issues and ensure that a similar issue can be rectified without requiring downtime to vCenter moving forward? (Choose four.)

**Select one or more:**
1. Power on the vCenter Server Appliance using the vSphere Client
2. Enable CPU and Memory Hot Add on the vCenter virtual machine.
3. Add additional CPU and memory to the vCenter Server Appliance.
4. Enable CPU Hot Add on the vCenter virtual machine.
5. Enable Memory Not Add on the vCenter virtual machine.
6. Gracefully shut down vCenter using the vSphere Client.
7. Power on the vCenter Server Appliance using the vSphere Host Client.

## Page 16

### Question 76
During the staging of a patch on a vCenter Server Appliance, an error was encountered and the process stopped. An administrator resolved the root cause and is ready to continue with the staging of the patch. From the vCenter Management Interface, which action should the administrator take to continue the process from the point at which the error occurred?

**Select one:**
1. Use the Stage Only option to restart the staging.
2. Use the Stage and Install option to resume the staging.
3. Use the Unstage option to restart the staging.
4. Use the Resume option to resume the staging.

### Question 77
Which three vSphere features are still supported for Windows-based virtual machines when enabling vSphere's virtualization-based security feature? (Choose three.)

**Select one or more:**
1. vSphere High Availability (HA)
2. vSphere Fault Tolerance
3. vSphere vMotion
4. vSphere Distributed Resources Scheduler (DRS)
5. Hot Add of CPU or memory
6. PCI passthrough

### Question 78
An administrator must gracefully restart a virtual machine (VM) through the vSphere Client but the option is greyed out. The administrator has full administrative access on VMware vCenter and all the objects available in vCenter, but has no access to log onto the operating system. Which action should the administrator take to meet the objective?

**Select one:**
1. Restart vCenter
2. Upgrade the virtual hardware
3. Migrate the VM to another host
4. Install VMware Tools

### Question 79
An administrator is tasked with migrating a single virtual machine (VM) from an existing VMware vCenter to a secure environment where corporate security policy requires that all VMs be encrypted. The secure environment consists of a dedicated vCenter instance with a 4-node vSphere cluster and already contains a number of encrypted VMs. Which two steps must the administrator take to ensure the migration is a success? (Choose two.)

**Select one or more:**
1. Ensure that the VM is powered off before attempting the migration.
2. Ensure that Encrypted vMotion is turned off for the VM.
3. Ensure that the source and destination vCenter instances share the same Key Management Server (KMS).
4. Ensure that the VM is encrypted before attempting the migration.
5. Ensure that the source and destination vCenter Servers have a different Key Management Server (KMS).

### Question 80
An administrator is investigating reports of users experiencing difficulties logging into a VMware vCenter instance using LDAP accounts. Which service should the administrator check as part of troubleshooting?

**Select one:**
1. VMware Authentication Framework Daemon
2. Identity Management Service
3. Lookup Service
4. vSphere Authentication Proxy Service

## Page 17

### Question 81
Refer to the exhibit An administrator set up the following configuration:
The distributed switch has three ESXi hosts, and each host has two 40 Gbps NICs.
The amount of bandwidth reserved for virtual machine (VM) traffic is 6 Gbps.

The administrator wants to guarantee that VMs in the Finance distributed port group can access 50 percent of the available reserved bandwidth for VM traffic. Given this scenario, what should the size (in Gbps) of the Finance network resource pool be?

**Select one:**
1. 80
2. 18
3. 120
4. 36

### Question 82
An administrator successfully installs VMware ESXi onto the first host of a new vSphere cluster but makes no additional configuration changes. When attempting to log into the vSphere Host Client using the Fully Qualified Domain Name (FQDN) of the host, the administrator receives the following error message:
"We can't connect to the server at esxi101.corp.local."

The following information has been provided to complete the configuration:
- Host FQDN: esxi101.corp.local
- Management VLAN ID: 10
- DHCP: No
- Management IP Address: 172.16.10.101 / 24
- Management IP Gateway: 172.16.10.1
- Corporate DNS Servers: 172.16.10.5, 172.16.10.6
- DNS Domain: corp.local

In addition, all host configurations must also meet the following requirements:
- The management network must use only IPv4 network protocols.
- The management network must be fault tolerant.

Which three high level tasks should the administrator complete, at a minimum, in order to successfully log into the vSphere Host Client using the FQDN for esxi101 and complete the configuration? (Choose three.)

**Select one or more:**
1. Ensure a DNS A Record is created for the VMware ESXi host on the corporate DNS servers.
2. Disable IPv6 for the VMware ESXi Management Network.
3. Update the VMware ESXi Management Network DNS configuration to use the corporate DNS servers for names resolution
4. Set the value of the VMware ESXi Management Network VLAN ID to 10.
5. Update the VMware ESXi Management Network IPv4 configuration to use a static a IPv4 address.
6. Configure at least two network adapters for the VMware ESXi Management Network

### Question 83
An administrator needs to provide encryption for workloads within an existing vSphere cluster. The following requirements must be met:
- Workloads should be encrypted at rest.
- Encrypted workloads must automatically be encrypted during transit.
- Encryption should not require any specific hardware.

What should the administrator configure to meet these requirements?

**Select one:**
1. Unified Extensible Firmware Interface (UEFI) Secure Boot
2. Encrypted vSphere vMotion
3. VM Encryption
4. Host Encryption

### Question 84
Which VMware offering will allow an administrator to manage the lifecycle of multiple vCenter Server instances in a single software as a service (SaaS)-based solution to help drive operational efficiency?

**Select one:**
1. VMware Cloud Foundation
2. VMware vSphere with Tanzu
3. VMware vSphere+
4. VMware Aria Suite Lifecycle

### Question 85
When configuring vCenter High Availability (HA), which two statements are true regarding the active, passive, and witness nodes? (Choose two.)

**Select one or more:**
1. They must have a minimum of a 1 Gbps network adapter.
2. Network latency must be less than 10 milliseconds.
3. Network latency must be more than 10 milliseconds.
4. They must have a supported Wide Area Network (WAN).
5. They must have a minimum of a 10 Gbps network adapter.

## Page 18

### Question 86
If a distributed switch uses the "Route based on physical NIC load" load balancing algorithm, what does the mean send or receive utilization of an uplink need to exceed for the flow of traffic to move to the second uplink?

**Select one:**
1. 75 percent of the capacity over a 30 second period
2. 60 percent of the capacity over a 30 second period
3. 60 percent of the capacity over a 40 second period
4. 75 percent of the capacity over a 40 second period

### Question 87
An administrator is looking to deploy a new VMware vCenter instance. The current environment consists of 75 hosts and is expected to grow up to 100 hosts over the next three years. Which deployment size should the administrator select?

**Select one:**
1. Large
2. Medium
3. Tiny
4. Small

### Question 88
An administrator is preparing for a deployment of a new vCenter Server Appliance. The following information has been provided to complete the deployment:
- ESXi Host name (FQDN): esx01.corp.local
- ESXi IP Address: 172.20.10.200
- vCenter Server Name (FQDN): vcsa01.corp.local
- vCenter Server IP Address: 172.20.10.100
- NTP Server: 172.20.10.20
- DNS Server: 172.20.10.1
- Deployment Size: Tiny
- Storage Size: Default

Which two actions must the administrator complete before starting the installation of the vCenter Server Appliance? (Choose two.)

**Select one or more:**
1. Create a forward DNS A record for the vCenter Server (vcsa01).
2. Create a DNS CNAME record for the ESXi Host server (esx01.corp.local).
3. Create a reverse DNS A record for the vCenter Server (vcsa01).
4. Create a DNS CNAME record for the vCenter Server (vcsa01.corp.local)
5. Create a reverse DNS A record for the ESXi Host server (esx01)

### Question 89
An administrator is preparing to perform an update to vSphere clusters that are running vSAN. The administrator wants to ensure that the following requirements are met as part of the update:
- All hosts in the cluster are updated with the same software.
- The firmware versions on the hosts are updated.
- The new software versions are checked for compliance against the vSAN Hardware Compatibility List.

Which three steps should the administrator take to meet these requirements? (Choose three.)

**Select one or more:**
1. Configure vSphere Lifecycle Manager with a baseline for the cluster.
2. Download the firmware updates from the VMware website.
3. Register the vendor hardware management system as a vCenter Server extension.
4. Download the firmware updates from the vendor website.
5. Configure vSphere Lifecycle Manager with an image for the cluster.
6. Run a hardware compatibility check using vSphere Lifecycle Manager.

### Question 90
An administrator manually configures a reference ESXi host that meets company security standards for vSphere environments. The administrator now needs to apply all of the security standards to every identically configured host across multiple vSphere clusters within a single VMware vCenter instance. Which four steps would the administrator complete to meet this requirement? (Choose four.)

**Select one or more:**
1. Check the compliance of each host against the host profile.
2. Extract the host profile from the reference host
3. Import host customization on the reference host
4. Reset host customization on the reference host.
5. Attach the host profile to each cluster that requires the secure configuration.
6. Remediate all non-compliant hosts.
7. Export the host profile from vCenter.

## Page 19

### Question 91
An administrator has a host profile named Standard-Config. The administrator wants to change the other host profiles to use only the storage configuration settings that are defined in the Standard-Config host profile. What should the administrator do to make this change?

**Select one:**
1. Copy the storage settings from Standard-Config to all other host profiles.
2. Export host customizations and import them to the other host profiles.
3. Duplicate the Standard-Config host profile and only modify the storage configuration settings.
4. Export the Standard-Config host profile and attach it to tile other hosts.

### Question 92
What are two use cases for VMware vSphere+? (Choose two.)

**Select one or more:**
1. Simplify vCenter lifecycle management through cloud-enabled automation.
2. Allow live migration between on-premises and VMware Cloud.
3. Enhance on-premises workloads by managing them through the VMware Cloud Console.
4. Allow the creation of affinity and anti-affinity rules to be used during failover events.
5. Increase the performance of the native vCenter vMotion capability.

### Question 93
An administrator is asked to segregate virtual machine (VM) traffic by VLAN on a vSphere standard switch. The following requirements must be met:
- VLAN ID on the switch port group must be 4095.
- VLAN tagging must be done at the VM level.

Which tagging mode is required?

**Select one:**
1. Virtual Guest Tagging (VGT)
2. None
3. External Switch Tagging (EST)
4. Virtual Switch Tagging (VST)

### Question 94
An administrator is planning to upgrade a VMware vCenter instance to version 8. It is currently integrated with the following solutions:
- VMware Aria Operations for Logs
- VMware Aria Operations

Which tool can the administrator use to automatically detect interoperability between the solutions and eliminate any unwanted or unexpected results during the upgrade process?

**Select one:**
1. vSphere Update Manager
2. vCenter Server Update Planner
3. VMware Aria Suite Lifecycle
4. vSphere Lifecycle Manager

### Question 95
Following a merger with another company, an administrator is tasked with configuring an identity source for VMware vCenter so that all vSphere administrators can authenticate using their existing Active Directory accounts. Each company has user accounts in their own Active Directory forests. The following additional information has been provided:
The corporate policy states that only Windows-based machine accounts are allowed in Active Directory.

Which action should the administrator take to configure vCenter Single Sign-On (SSO) to meet this requirement?

**Select one:**
1. Configure SSO to use Active Directory (Integrated Windows Authentication) as the identity source.
2. Configure SSO to use Active Directory over LDAP as the identity source.
3. Configure SSO to use OpenLDAP as the identity source.
4. Join the vCenter Server Appliance to the LDAP domain.

## Page 20

### Question 96
What is the role of vSphere Distributed Services Engine?

**Select one:**
1. Redistribute virtual machines across vSphere cluster hosts to comply with user-defined affinity and anti-affinity rules following host failures or during maintenance operations
2. Provide a live shadow instance of a virtual machine (VM) that mirrors the primary VM to prevent data loss and downtime during outages
3. Provide hardware accelerated data processing to boost infrastructure performance
4. Implement Quality of Service (QoS) on network traffic within a vSphere Distributed Switch

### Question 97
What are two uses cases for VMware Tools? (Choose two.)

**Select one or more:**
1. Ability to shut down a virtual machine remotely
2. Support for unsupported network device drivers
3. Share folders between ESXi hosts and guest OS file systems
4. Time synchronization with an NTP server
5. Direct deployment of the Aria Automation Config minion

### Question 98
An administrator wants to create virtual machine (VM) templates and store them in a content library. The administrator would like to use the content library to manage different versions of these templates so that reverting to an earlier version is an option. How should the administrator create these templates?

**Select one:**
1. Export a VM in the vCenter inventory to an OVF template. Import the OVF template into the content library
2. Select a VM in the vCenter inventory. Clone the VM to the content library as a VM template type.
3. Convert a VM to a template in the vCenter inventory. Clone the template to the content library.
4. Select a VM template in the vCenter inventory. Clone the template to the content library

### Question 99
An administrator is responsible for performing maintenance tasks on a vSphere cluster. The cluster has the following configuration:
- Identically configured vSphere ESXi hosts (esx01, esx02, esx03 and esx04)
- All workloads are deployed into a single VMFS datastore provided by the external storage array
- vSphere High Availability (HA) has not been enabled
- vSphere Distributed Resource Scheduler (DRS) has not been enabled

Currently, a critical production application workload (VM1) is running on esx01. Given this scenario, which two actions are required to ensure VM1 continues to run when esx01 is placed into maintenance mode? (Choose two.)

**Select one or more:**
1. VM1 must be manually live migrated to another host within the cluster using vSphere vMotion before esx01 is placed into maintenance mode.
2. VM1 must be manually shut down and cold migrated to another host within the cluster using vSphere vMotion before esx01 is placed into maintenance mode.
3. VM1 must be manually migrated to another host within the cluster using vSphere Storage vMotion before esx01 is placed into maintenance mode.
4. Fully automated DRS must be enabled on the cluster so that VM1 will be automatically migrated to another host within the cluster when esx01 is placed into maintenance mode.
5. vSphere HA must be enabled on the cluster so that VM1 will be automatically migrated to another host within the cluster when esx01 is placed into maintenance mode.

### Question 100
An administrator is tasked with implementing a backup solution capable of backing up the Supervisor cluster, vSphere Pods, and persistent volumes. Which two solutions must be used to meet this requirement? (Choose two.)

**Select one or more:**
1. Velero Plugin for vSphere
2. vSphere Host Client
3. VMware vCenter
4. NSX-T Manager
5. Standalone Velero and Restic

## Page 21

### Question 101
An administrator is tasked with installing VMware vCenter. The vCenter Server Appliance must support an environment of:
400 hosts
4000 virtual machines

Which two resources must be allocated, at a minimum, to meet the requirements? (Choose two.)

**Select one or more:**
1. 8 vCPUs
2. 4 vCPUs
3. 30 GB Memory
4. 16 vCPUs
5. 20 GB Memory

### Question 102
An administrator is tasked with configuring vSphere Trust Authority. The administrator has completed the following steps:
Set up the workstation - Enabled the Trust Authority Administrator
Enabled the Trust Authority State
Collected information about the ESXi hosts and vCenter to be trusted

Which step does the administrator need to complete next?

**Select one:**
1. Import the Trusted Cluster information to the Trusted Hosts
2. Import the Trusted Host information to the Trust Authority Cluster
3. Import the Trusted Host information to the Trusted Cluster
4. Create the Key Provider on the Trusted Cluster

### Question 103
A vSphere cluster hosts a three-tier application. The cluster has 50% resources available. If a host in the cluster fails, the database server must be online before the application server, and the application server must be online before the Web server. Which feature can be used to meet these requirements?

**Select one:**
1. Proactive HA
2. vSphere HA Restart Priority
3. Predictive DRS
4. vSphere HA Orchestrated Restart

### Question 104
Refer to the exhibit An environment has the following configuration:
1. Resource Pool "RP-MOM" has a reservation of 6GHz and one running virtual machine (VM) "VM-M1" with 1 GHz reserved.
2. Resource Pool "RP-KID" has a reservation of 2GHz, and expandable reservations is activated.

The administrator creates two VMs, "VM-K1" and "VM-K2", in the "RP-KID" resource pool with 2GHz reserved for each, and turns on "VM-M1."

Given this scenario, which statement is true?

**Select one:**
1. The administrator must deactivate expandable reservations to turn on VM-K2.
2. VM-K2 can be powered on because it can get the resources needed from RP-MOM.
3. VM-K2 cannot be powered on because there are not enough resources in RP-KID.
4. The administrator can create a third VM ("VM-K3") at RP-KID and reserve 6GHz.

### Question 105
An administrator is planning to upgrade a VMware vCenter instance to version 8. It is currently integrated with the following solutions:
- VMware Aria Automation
- VMware Cloud Director

Which tool can the administrator use to run interoperability reports before the upgrade process?

**Select one:**
1. vSphere Lifecycle Manager
2. vCenter Server Update Planner
3. vSphere Update Manager
4. VMware Aria Suite Lifecycle

## Page 22

### Question 106
An administrator needs better performance and near-zero CPU utilization from the ESXi hosts for networking functions and processing. The administrator creates a new vSphere Distributed Switch and enables network offloads compatibility. Which solution would help achieve this goal?

**Select one:**
1. vSphere Network I/O Control
2. Universal Passthrough version 2
3. Data Processing Units (DPUs)
4. vSphere Distributed Services Engine

### Question 107
An administrator has mapped three vSphere zones to three vSphere clusters. Which two statements are true for this vSphere with Tanzu zonal Supervisor enablement? (Choose two.)

**Select one or more:**
1. One Supervisor will be created across all zones.
2. Individual vSphere Namespaces will be spread across all zones.
3. One Supervisor will be created in a specific zone.
4. Three Supervisors will be created in Linked Mode.
5. Individual vSphere Namespaces will be placed into a specific zone.

### Question 108
An administrator is configuring vSphere Lifecycle Manager to install patches to a vSphere cluster. The cluster runs workload virtual machines (VMs) that are incompatible with vSphere vMotion, and therefore cannot be live migrated between hosts during the installation of the patches. Which configuration in vSphere Lifecycle Manager will allow the administrator to reduce the downtime associated with the patching operation without migrating the VMs?

**Select one:**
1. Enable Quick Boot and set the VM power state to the suspend to memory option
2. Enable Distributed Power Management (DPM) and set the VM power state to the suspend to disk option
3. Enable Quick Boot ana set the VM power stale to the suspend to disk option
4. Enable vSphere High Availability (HA) admission control and set the VM power stale to the suspend to memory option