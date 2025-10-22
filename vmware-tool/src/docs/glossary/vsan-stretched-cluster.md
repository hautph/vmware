---
term: vSAN Stretched Cluster
category: Storage
---

A vSAN Stretched Cluster is a deployment model that allows a single vSAN cluster to span two geographically separate sites. This provides continuous availability and disaster avoidance for virtual machines by synchronously replicating data between the sites. In the event of a site failure, virtual machines can automatically failover to the surviving site with no data loss.

## Key Features

*   **Active-Active Architecture:** Both sites in a stretched cluster are active, allowing virtual machines to run on either site.
*   **Synchronous Replication:** Data is synchronously replicated between the two sites, ensuring zero data loss in a site failure scenario.
*   **Automated Failover:** In the event of a site failure, virtual machines can automatically failover to the healthy site.
*   **Witness Host:** A third site (witness host) is used to arbitrate in split-brain scenarios, ensuring data consistency.
*   **vSphere IaaS Control Plane on vSAN Stretched Clusters:** In vSphere 8, the vSphere IaaS Control Plane can now be deployed on vSAN stretched clusters for new installations, enhancing its resilience.
