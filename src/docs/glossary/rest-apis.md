---
term: REST APIs
category: Cloud_Integration
---

REST APIs (Representational State Transfer Application Programming Interfaces) are web-based interfaces that allow programmatic access to VMware vSphere and other VMware products, enabling automation and integration with third-party tools.

## Code Sample

```bash
# cURL command to authenticate with vSphere REST API
curl -u "administrator@vsphere.local:password" \
  -X POST "https://vcenter.example.com/api/session"
```

## Configuration

```ini
# REST API configuration
[rest-api]
endpoint = https://vcenter.example.com/api
version = 7.0
auth_method = session
```