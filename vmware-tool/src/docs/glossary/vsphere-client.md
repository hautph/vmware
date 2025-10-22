---
term: vSphere Client (HTML5)
category: Monitoring & Management
---

vSphere Client (HTML5) is the web-based user interface for managing VMware vSphere environments, providing a modern, responsive interface for configuring and monitoring virtual infrastructure from any device with a web browser.

## Code Sample

```javascript
// JavaScript code to access vSphere Client API
fetch('https://vcenter.example.com/ui')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Configuration

```ini
# vSphere Client configuration
[vsphere-client]
url = https://vcenter.example.com/ui
theme = dark
language = en
```