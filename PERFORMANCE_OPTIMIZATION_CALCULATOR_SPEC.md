# Performance & Optimization Calculator Technical Specification

## Overview
This document provides the technical specification for implementing a Performance & Optimization Calculator for the VMware tool.

## Features
1. CPU Ready Time Calculator
2. Memory Ballooning Impact Assessment
3. Storage I/O Latency Analysis
4. Network Throughput Optimization
5. Resource Contention Analysis

## Implementation Plan

### Controller Implementation
**File**: `/src/controllers/performance.js`

```javascript
// Performance & Optimization Calculator
export const getIndex = (req, res) => {
  res.render('calculators/performance', { 
    title: 'Performance & Optimization Calculator'
  });
};

export const calculatePerformance = (req, res) => {
  const { 
    numVMs,
    avgCPUUtilization,
    cpuReadyTimeMs,
    memoryAllocationGB,
    memoryUsageGB,
    memoryBalloonGB,
    storageIOPSTotal,
    storageLatencyMs,
    networkBandwidthMbps,
    networkUtilization,
    hostCPUCount,
    hostMemoryGB,
    storageType
  } = req.body;
  
  // Convert inputs to appropriate types
  const parsedData = {
    numVMs: parseInt(numVMs) || 0,
    avgCPUUtilization: parseFloat(avgCPUUtilization) || 0,
    cpuReadyTimeMs: parseFloat(cpuReadyTimeMs) || 0,
    memoryAllocationGB: parseFloat(memoryAllocationGB) || 0,
    memoryUsageGB: parseFloat(memoryUsageGB) || 0,
    memoryBalloonGB: parseFloat(memoryBalloonGB) || 0,
    storageIOPSTotal: parseInt(storageIOPSTotal) || 0,
    storageLatencyMs: parseFloat(storageLatencyMs) || 0,
    networkBandwidthMbps: parseFloat(networkBandwidthMbps) || 0,
    networkUtilization: parseFloat(networkUtilization) || 0,
    hostCPUCount: parseInt(hostCPUCount) || 0,
    hostMemoryGB: parseFloat(hostMemoryGB) || 0,
    storageType: storageType || 'sata'
  };
  
  // Perform calculations
  const results = calculatePerformanceMetrics(parsedData);
  
  res.render('calculators/performance-results', { 
    title: 'Performance & Optimization Results',
    results: {
      ...parsedData,
      ...results
    }
  });
};

function calculatePerformanceMetrics(data) {
  // CPU Ready Time Analysis
  const cpuReadyTimePercent = (data.cpuReadyTimeMs / 10) / 100; // Convert to percentage
  const cpuReadyAssessment = cpuReadyTimePercent < 1 ? 'Excellent' : 
                             cpuReadyTimePercent < 5 ? 'Good' : 
                             cpuReadyTimePercent < 10 ? 'Fair' : 'Poor';
  
  // Memory Ballooning Impact
  const balloonPercent = (data.memoryBalloonGB / data.memoryAllocationGB) * 100;
  const memoryPressureAssessment = balloonPercent < 5 ? 'Low' : 
                                   balloonPercent < 15 ? 'Moderate' : 
                                   balloonPercent < 30 ? 'High' : 'Critical';
  
  // Storage I/O Analysis
  const storageLatencyAssessment = data.storageLatencyMs < 10 ? 'Excellent' : 
                                   data.storageLatencyMs < 20 ? 'Good' : 
                                   data.storageLatencyMs < 50 ? 'Fair' : 'Poor';
  
  // Network Analysis
  const networkUtilizationPercent = data.networkUtilization;
  const networkAssessment = networkUtilizationPercent < 50 ? 'Excellent' : 
                            networkUtilizationPercent < 70 ? 'Good' : 
                            networkUtilizationPercent < 85 ? 'Fair' : 'Poor';
  
  // Resource Contention Analysis
  const avgCPUUtilization = data.avgCPUUtilization;
  const cpuContentionAssessment = avgCPUUtilization < 60 ? 'Low' : 
                                  avgCPUUtilization < 80 ? 'Moderate' : 
                                  avgCPUUtilization < 90 ? 'High' : 'Critical';
  
  // Recommendations
  const recommendations = [];
  
  if (cpuReadyTimePercent >= 5) {
    recommendations.push('High CPU ready time detected. Consider reducing CPU overcommitment or redistributing VMs.');
  }
  
  if (balloonPercent >= 15) {
    recommendations.push('Significant memory ballooning detected. Consider adding more physical RAM or reducing memory allocation.');
  }
  
  if (data.storageLatencyMs >= 20) {
    recommendations.push('High storage latency detected. Check storage performance and consider upgrading to faster storage.');
  }
  
  if (networkUtilizationPercent >= 70) {
    recommendations.push('High network utilization detected. Consider network upgrades or traffic optimization.');
  }
  
  if (avgCPUUtilization >= 80) {
    recommendations.push('High CPU utilization detected. Consider adding more CPU resources or optimizing workloads.');
  }
  
  return {
    cpuReadyTimePercent: cpuReadyTimePercent.toFixed(2),
    cpuReadyAssessment,
    balloonPercent: balloonPercent.toFixed(2),
    memoryPressureAssessment,
    storageLatencyAssessment,
    networkAssessment,
    cpuContentionAssessment,
    recommendations
  };
}
```

### Route Implementation
**File**: `/src/routes/performance.js`

```javascript
import express from 'express';
const router = express.Router();
import { 
  getIndex,
  calculatePerformance
} from '../controllers/performance.js';

// Performance & Optimization Calculator
router.get('/', getIndex);
router.post('/', calculatePerformance);

export default router;
```

### View Implementation
**File**: `/src/views/calculators/performance.ejs`

```html
<%- include('../../partials/header.ejs', { title: 'Performance & Optimization Calculator' }) %>

<div class="row">
    <div class="col-12">
        <h1><i class="bi bi-speedometer2"></i> Performance & Optimization Calculator</h1>
        <p class="lead">Analyze and optimize your VMware environment performance</p>
        
        <div class="card">
            <div class="card-header">
                <h3><i class="bi bi-input-cursor"></i> Environment Information</h3>
            </div>
            <div class="card-body">
                <form action="/calculators/performance" method="POST">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="numVMs" class="form-label">Number of VMs</label>
                                <input type="number" class="form-control" id="numVMs" name="numVMs" required min="1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="avgCPUUtilization" class="form-label">Average CPU Utilization (%)</label>
                                <input type="number" class="form-control" id="avgCPUUtilization" name="avgCPUUtilization" required min="0" max="100" step="0.1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="cpuReadyTimeMs" class="form-label">CPU Ready Time (ms)</label>
                                <input type="number" class="form-control" id="cpuReadyTimeMs" name="cpuReadyTimeMs" required min="0" step="0.1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="memoryAllocationGB" class="form-label">Memory Allocation (GB)</label>
                                <input type="number" class="form-control" id="memoryAllocationGB" name="memoryAllocationGB" required min="1" step="0.1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="memoryUsageGB" class="form-label">Actual Memory Usage (GB)</label>
                                <input type="number" class="form-control" id="memoryUsageGB" name="memoryUsageGB" required min="1" step="0.1">
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="memoryBalloonGB" class="form-label">Memory Ballooned (GB)</label>
                                <input type="number" class="form-control" id="memoryBalloonGB" name="memoryBalloonGB" required min="0" step="0.1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="storageIOPSTotal" class="form-label">Total Storage IOPS</label>
                                <input type="number" class="form-control" id="storageIOPSTotal" name="storageIOPSTotal" required min="0">
                            </div>
                            
                            <div class="mb-3">
                                <label for="storageLatencyMs" class="form-label">Storage Latency (ms)</label>
                                <input type="number" class="form-control" id="storageLatencyMs" name="storageLatencyMs" required min="0" step="0.1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="networkBandwidthMbps" class="form-label">Network Bandwidth (Mbps)</label>
                                <input type="number" class="form-control" id="networkBandwidthMbps" name="networkBandwidthMbps" required min="1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="networkUtilization" class="form-label">Network Utilization (%)</label>
                                <input type="number" class="form-control" id="networkUtilization" name="networkUtilization" required min="0" max="100" step="0.1">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="hostCPUCount" class="form-label">Host CPU Count</label>
                                <input type="number" class="form-control" id="hostCPUCount" name="hostCPUCount" required min="1">
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="hostMemoryGB" class="form-label">Host Memory (GB)</label>
                                <input type="number" class="form-control" id="hostMemoryGB" name="hostMemoryGB" required min="1">
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="storageType" class="form-label">Storage Type</label>
                                <select class="form-select" id="storageType" name="storageType" required>
                                    <option value="ssd">SSD</option>
                                    <option value="sas">15K RPM SAS</option>
                                    <option value="sata">7.2K RPM SATA</option>
                                    <option value="nvme">NVMe</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-calculator"></i> Calculate Performance
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<%- include('../../partials/footer.ejs') %>
```

### Results View
**File**: `/src/views/calculators/performance-results.ejs`

```html
<%- include('../../partials/header.ejs', { title: 'Performance & Optimization Results' }) %>

<div class="row">
    <div class="col-12">
        <h1><i class="bi bi-speedometer2"></i> Performance & Optimization Results</h1>
        <p class="lead">Analysis of your VMware environment performance</p>
        
        <div class="mb-3">
            <a href="/calculators/performance" class="btn btn-secondary">
                <i class="bi bi-arrow-left"></i> New Calculation
            </a>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3><i class="bi bi-cpu"></i> CPU Performance</h3>
                    </div>
                    <div class="card-body">
                        <h4>CPU Ready Time: <%= results.cpuReadyTimePercent %>%</h4>
                        <div class="alert alert-<%= results.cpuReadyAssessment.toLowerCase() === 'excellent' ? 'success' : results.cpuReadyAssessment.toLowerCase() === 'good' ? 'info' : results.cpuReadyAssessment.toLowerCase() === 'fair' ? 'warning' : 'danger' %>">
                            Assessment: <%= results.cpuReadyAssessment %>
                        </div>
                        <p>CPU ready time represents the time a VM was ready to run but had to wait for a physical CPU.</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3><i class="bi bi-memory"></i> Memory Performance</h3>
                    </div>
                    <div class="card-body">
                        <h4>Memory Ballooning: <%= results.balloonPercent %>%</h4>
                        <div class="alert alert-<%= results.memoryPressureAssessment.toLowerCase() === 'low' ? 'success' : results.memoryPressureAssessment.toLowerCase() === 'moderate' ? 'info' : results.memoryPressureAssessment.toLowerCase() === 'high' ? 'warning' : 'danger' %>">
                            Assessment: <%= results.memoryPressureAssessment %>
                        </div>
                        <p>Memory ballooning indicates memory pressure in the host.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3><i class="bi bi-hdd"></i> Storage Performance</h3>
                    </div>
                    <div class="card-body">
                        <h4>Storage Latency: <%= results.storageLatencyMs %> ms</h4>
                        <div class="alert alert-<%= results.storageLatencyAssessment.toLowerCase() === 'excellent' ? 'success' : results.storageLatencyAssessment.toLowerCase() === 'good' ? 'info' : results.storageLatencyAssessment.toLowerCase() === 'fair' ? 'warning' : 'danger' %>">
                            Assessment: <%= results.storageLatencyAssessment %>
                        </div>
                        <p>Storage latency affects VM responsiveness and application performance.</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3><i class="bi bi-diagram-3"></i> Network Performance</h3>
                    </div>
                    <div class="card-body">
                        <h4>Network Utilization: <%= results.networkUtilization %>%</h4>
                        <div class="alert alert-<%= results.networkAssessment.toLowerCase() === 'excellent' ? 'success' : results.networkAssessment.toLowerCase() === 'good' ? 'info' : results.networkAssessment.toLowerCase() === 'fair' ? 'warning' : 'danger' %>">
                            Assessment: <%= results.networkAssessment %>
                        </div>
                        <p>Network utilization affects data transfer speeds and application responsiveness.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <% if (results.recommendations.length > 0) { %>
        <div class="card">
            <div class="card-header">
                <h3><i class="bi bi-lightbulb"></i> Recommendations</h3>
            </div>
            <div class="card-body">
                <ul>
                    <% results.recommendations.forEach(rec => { %>
                    <li><%= rec %></li>
                    <% }); %>
                </ul>
            </div>
        </div>
        <% } %>
    </div>
</div>

<%- include('../../partials/footer.ejs') %>
```

### App.js Integration
Add to `/src/app.js`:

```javascript
import performanceRoutes from './routes/performance.js';

// Use routes
app.use('/calculators/performance', performanceRoutes);
```

### Calculator Index Update
Update `/src/views/calculators/index.ejs` to include the new calculator:

```html
<div class="col-md-4 mb-4">
    <div class="card h-100">
        <div class="card-body">
            <h5 class="card-title"><i class="bi bi-speedometer2"></i> Performance & Optimization</h5>
            <p class="card-text">Analyze and optimize your VMware environment performance</p>
            <a href="/calculators/performance" class="btn btn-primary">Performance Calculator</a>
        </div>
    </div>
</div>
```

## Testing Plan
1. Unit tests for calculation functions
2. Integration tests for form submissions
3. UI testing for responsive design
4. Performance testing for large datasets
5. Accessibility testing

## Deployment
1. Add new routes to the application
2. Update calculator index page
3. Add internationalization strings
4. Test thoroughly before production deployment