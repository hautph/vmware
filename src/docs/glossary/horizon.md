---
term: Horizon
category: Desktop_Virtualization
---

VMware Horizon is a comprehensive Virtual Desktop Infrastructure (VDI) and digital workspace platform that delivers virtual desktops and applications to end users from any device, anywhere. Horizon enables organizations to centralize desktop management, enhance security, and provide a consistent user experience across diverse computing environments.

## Overview

Horizon provides:
- Virtual desktop delivery
- Application virtualization
- Unified access gateway
- Digital workspace experience
- Centralized management

## Key Features

### Desktop Virtualization
- Persistent and non-persistent desktops
- Instant clone technology
- Linked clone optimization
- Desktop pool management

### Application Delivery
- Published applications
- RDSH application delivery
- Application packaging
- User environment management

### Access and Security
- Unified access gateway
- Two-factor authentication
- Smart card support
- Single sign-on integration

## Architecture

### Horizon Connection Server
- Central management component
- User authentication and authorization
- Desktop and application brokering
- Policy enforcement

### Horizon View Composer
- Linked clone management
- Desktop image provisioning
- Storage optimization
- Pool management

### Horizon Agent
- Installed on virtual desktops
- Protocol communication
- Device redirection
- User experience optimization

### Horizon Client
- End-user access software
- Multiple device support
- Protocol optimization
- Offline access capabilities

## Desktop Delivery Models

### Full Clone Desktops
- Dedicated desktops for users
- Complete VM independence
- Higher storage requirements
- Maximum customization

### Linked Clone Desktops
- Shared base image with differencing disks
- Storage optimization
- Centralized image management
- Faster provisioning

### Instant Clone Desktops
- Rapid provisioning technology
- Memory-based cloning
- Minimal storage footprint
- Fast startup times

### RDSH Published Desktops
- Shared desktop sessions
- Resource efficiency
- Cost-effective delivery
- Session-based computing

## Application Delivery

### Published Applications
- Individual application delivery
- Session-based application access
- Resource optimization
- Flexible deployment

### RDS Hosted Applications
- Remote Desktop Session Host delivery
- Multi-user application sharing
- Centralized application management
- License optimization

### Application Packaging
- ThinApp application virtualization
- MSIX app attach support
- Application layering
- Conflict resolution

## Security Features

### Access Control
- Multi-factor authentication
- Smart card integration
- Certificate-based authentication
- Conditional access policies

### Data Protection
- Endpoint compliance checking
- USB device control
- Clipboard and file transfer policies
- Encryption at rest and in transit

### Network Security
- Unified access gateway
- Reverse proxy capabilities
- SSL/TLS encryption
- Firewall integration

## User Experience

### Blast Extreme Protocol
- Adaptive multimedia protocol
- Bandwidth optimization
- Multi-display support
- Peripheral redirection

### User Environment Management
- Profile management
- Application personalization
- Policy-based settings
- Cross-platform consistency

### Client Options
- Desktop client applications
- Web browser access
- Mobile device support
- Thin client devices

## Integration with vSphere

### Native Integration
- Seamless vCenter Server integration
- Unified management interface
- Shared inventory and tagging
- Role-based access control

### Resource Optimization
- vSAN integration for storage
- vSphere HA for availability
- DRS for load balancing
- Resource pools for QoS

## Cloud-Native Features

### Horizon Cloud
- SaaS-based management
- Multi-cloud deployment
- Hybrid deployment models
- Centralized management

### Modern Management
- Cloud-init integration
- Image management service
- Automated scaling
- Analytics and reporting

## vSphere 8 Enhancements

### Performance Improvements
- Enhanced protocol performance
- Better resource utilization
- Improved graphics support
- Optimized user experience

### Modern Management
- Simplified deployment
- Streamlined upgrades
- Enhanced monitoring
- Better troubleshooting

### Security Enhancements
- Advanced authentication options
- Improved compliance reporting
- Enhanced data protection
- Better endpoint security

## Deployment Models

### On-Premises
- Data center deployment
- Full feature set
- Enterprise-grade security
- Comprehensive control

### Cloud Services
- SaaS-based management
- Public cloud deployment
- Simplified operations
- Rapid deployment

### Hybrid
- Combination of on-premises and cloud
- Flexible deployment options
- Consistent user experience
- Centralized management

## Best Practices

1. **Desktop Design**: Plan desktop pools and user assignments carefully
2. **Resource Sizing**: Properly size desktop resources for performance
3. **Storage Optimization**: Implement appropriate storage solutions
4. **Security Policies**: Deploy comprehensive security policies
5. **Monitoring**: Regularly monitor user experience and system performance

## Troubleshooting Commands

```bash
# Check Horizon services status
service-control --status vmware-view

# View connection server logs
tail -f /var/log/vmware/view/*.log

# Check desktop pool status
vim-cmd vmsvc/getallvms | grep -i desktop

# View Horizon client connections
netstat -an | grep 4172
```

## Related Technologies

- [vSphere](/glossary/term/vsphere)
- [vSAN](/glossary/term/vsan)
- [Unified Access Gateway](/glossary/term/unified-access-gateway)
- [Blast Extreme](/glossary/term/blast-extreme)
- [ThinApp](/glossary/term/thinapp)