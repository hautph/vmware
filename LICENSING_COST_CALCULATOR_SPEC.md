# Licensing Cost Calculator Technical Specification

## Overview
This document provides the technical specification for implementing a Licensing Cost Calculator for the VMware tool.

## Features
1. vSphere licensing comparison (Standard vs. Enterprise Plus)
2. vSAN licensing options
3. NSX licensing requirements
4. Bundle vs. individual product licensing
5. Subscription vs. perpetual licensing

## Implementation Plan

### Controller Implementation
**File**: `/src/controllers/licensing.js`

```javascript
// Licensing Cost Calculator
export const getIndex = (req, res) => {
  res.render('calculators/licensing', { 
    title: 'VMware Licensing Cost Calculator'
  });
};

export const calculateLicensing = (req, res) => {
  const { 
    numVMs,
    numHosts,
    vsphereEdition,
    vsanEnabled,
    vsanCapacityTB,
    nsxEnabled,
    nsxEdition,
    licensingModel,
    supportLevel,
    region
  } = req.body;
  
  // Convert inputs to appropriate types
  const parsedData = {
    numVMs: parseInt(numVMs) || 0,
    numHosts: parseInt(numHosts) || 0,
    vsphereEdition: vsphereEdition || 'standard',
    vsanEnabled: vsanEnabled === 'yes',
    vsanCapacityTB: parseFloat(vsanCapacityTB) || 0,
    nsxEnabled: nsxEnabled === 'yes',
    nsxEdition: nsxEdition || 'datacenter',
    licensingModel: licensingModel || 'perpetual',
    supportLevel: supportLevel || 'basic',
    region: region || 'north-america'
  };
  
  // Perform calculations
  const results = calculateLicensingCosts(parsedData);
  
  res.render('calculators/licensing-results', { 
    title: 'Licensing Cost Calculation Results',
    results: {
      ...parsedData,
      ...results
    }
  });
};

function calculateLicensingCosts(data) {
  // Base pricing (these would be updated regularly)
  const pricing = {
    vsphere: {
      standard: 1500, // Per CPU
      enterprisePlus: 3500 // Per CPU
    },
    vsan: {
      perTB: 2500 // Per usable TB
    },
    nsx: {
      datacenter: 5000, // Per CPU
      advanced: 3000, // Per CPU
      standard: 1500 // Per CPU
    },
    support: {
      basic: 0.18, // 18% of license cost
      production: 0.24, // 24% of license cost
      premier: 0.29 // 29% of license cost
    }
  };
  
  // Calculate vSphere licensing costs
  const vsphereCPUs = data.numHosts * 2; // Assuming 2 CPUs per host
  const vsphereLicenseCost = vsphereCPUs * pricing.vsphere[data.vsphereEdition];
  
  // Calculate vSAN licensing costs
  let vsanLicenseCost = 0;
  if (data.vsanEnabled) {
    vsanLicenseCost = data.vsanCapacityTB * pricing.vsan.perTB;
  }
  
  // Calculate NSX licensing costs
  let nsxLicenseCost = 0;
  if (data.nsxEnabled) {
    nsxLicenseCost = vsphereCPUs * pricing.nsx[data.nsxEdition];
  }
  
  // Calculate support costs
  const totalLicenseCost = vsphereLicenseCost + vsanLicenseCost + nsxLicenseCost;
  const supportCost = totalLicenseCost * pricing.support[data.supportLevel];
  
  // Calculate subscription vs perpetual
  let annualCost = 0;
  let upfrontCost = 0;
  
  if (data.licensingModel === 'subscription') {
    // Subscription model (annual cost)
    annualCost = totalLicenseCost + supportCost;
  } else {
    // Perpetual model (upfront + annual support)
    upfrontCost = totalLicenseCost;
    annualCost = supportCost;
  }
  
  // 3-year and 5-year costs
  const total3YearCost = upfrontCost + (annualCost * 3);
  const total5YearCost = upfrontCost + (annualCost * 5);
  
  // Cost per VM and per host
  const costPerVM = totalLicenseCost / data.numVMs;
  const costPerHost = totalLicenseCost / data.numHosts;
  
  // Edition comparison
  const alternativeEdition = data.vsphereEdition === 'standard' ? 'enterprisePlus' : 'standard';
  const alternativeLicenseCost = vsphereCPUs * pricing.vsphere[alternativeEdition];
  const alternativeVsanCost = data.vsanEnabled ? vsanLicenseCost : 0;
  const alternativeNsxCost = data.nsxEnabled ? (vsphereCPUs * pricing.nsx[data.nsxEdition]) : 0;
  const alternativeTotalLicenseCost = alternativeLicenseCost + alternativeVsanCost + alternativeNsxCost;
  const alternativeSupportCost = alternativeTotalLicenseCost * pricing.support[data.supportLevel];
  
  let alternativeAnnualCost = 0;
  let alternativeUpfrontCost = 0;
  
  if (data.licensingModel === 'subscription') {
    alternativeAnnualCost = alternativeTotalLicenseCost + alternativeSupportCost;
  } else {
    alternativeUpfrontCost = alternativeTotalLicenseCost;
    alternativeAnnualCost = alternativeSupportCost;
  }
  
  const alternative3YearCost = alternativeUpfrontCost + (alternativeAnnualCost * 3);
  const alternative5YearCost = alternativeUpfrontCost + (alternativeAnnualCost * 5);
  
  // Recommendations
  const recommendations = [];
  
  if (data.vsphereEdition === 'standard' && data.numVMs > 50) {
    recommendations.push('Consider vSphere Enterprise Plus for environments with more than 50 VMs for advanced features.');
  }
  
  if (data.vsanEnabled && data.vsanCapacityTB > 100) {
    recommendations.push('For large vSAN deployments, consider volume licensing discounts.');
  }
  
  if (data.licensingModel === 'perpetual' && annualCost > 50000) {
    recommendations.push('For large upfront costs, consider the subscription model for better cash flow.');
  }
  
  if (data.supportLevel === 'basic' && data.numHosts > 10) {
    recommendations.push('For production environments with more than 10 hosts, consider Production Support.');
  }
  
  return {
    vsphereCPUs,
    vsphereLicenseCost,
    vsanLicenseCost,
    nsxLicenseCost,
    totalLicenseCost,
    supportCost,
    annualCost,
    upfrontCost,
    total3YearCost,
    total5YearCost,
    costPerVM,
    costPerHost,
    alternative: {
      edition: alternativeEdition,
      licenseCost: alternativeLicenseCost,
      totalLicenseCost: alternativeTotalLicenseCost,
      supportCost: alternativeSupportCost,
      annualCost: alternativeAnnualCost,
      upfrontCost: alternativeUpfrontCost,
      total3YearCost: alternative3YearCost,
      total5YearCost: alternative5YearCost
    },
    recommendations
  };
}
```

### Route Implementation
**File**: `/src/routes/licensing.js`

```javascript
import express from 'express';
const router = express.Router();
import { 
  getIndex,
  calculateLicensing
} from '../controllers/licensing.js';

// Licensing Cost Calculator
router.get('/', getIndex);
router.post('/', calculateLicensing);

export default router;
```

### View Implementation
**File**: `/src/views/calculators/licensing.ejs`

```html
<%- include('../../partials/header.ejs', { title: 'VMware Licensing Cost Calculator' }) %>

<div class="row">
    <div class="col-12">
        <h1><i class="bi bi-currency-dollar"></i> VMware Licensing Cost Calculator</h1>
        <p class="lead">Calculate and compare VMware licensing costs</p>
        
        <div class="card">
            <div class="card-header">
                <h3><i class="bi bi-input-cursor"></i> Environment Information</h3>
            </div>
            <div class="card-body">
                <form action="/calculators/licensing" method="POST">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="numVMs" class="form-label">Number of VMs</label>
                                <input type="number" class="form-control" id="numVMs" name="numVMs" required min="1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="numHosts" class="form-label">Number of Hosts</label>
                                <input type="number" class="form-control" id="numHosts" name="numHosts" required min="1">
                            </div>
                            
                            <div class="mb-3">
                                <label for="vsphereEdition" class="form-label">vSphere Edition</label>
                                <select class="form-select" id="vsphereEdition" name="vsphereEdition" required>
                                    <option value="standard">vSphere Standard</option>
                                    <option value="enterprisePlus">vSphere Enterprise Plus</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label for="licensingModel" class="form-label">Licensing Model</label>
                                <select class="form-select" id="licensingModel" name="licensingModel" required>
                                    <option value="perpetual">Perpetual License</option>
                                    <option value="subscription">Subscription</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="supportLevel" class="form-label">Support Level</label>
                                <select class="form-select" id="supportLevel" name="supportLevel" required>
                                    <option value="basic">Basic Support (18%)</option>
                                    <option value="production">Production Support (24%)</option>
                                    <option value="premier">Premier Support (29%)</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label for="region" class="form-label">Region</label>
                                <select class="form-select" id="region" name="region" required>
                                    <option value="north-america">North America</option>
                                    <option value="europe">Europe</option>
                                    <option value="asia-pacific">Asia Pacific</option>
                                </select>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="vsanEnabled" name="vsanEnabled" value="yes">
                                <label class="form-check-label" for="vsanEnabled">Enable vSAN Licensing</label>
                            </div>
                            
                            <div class="mb-3" id="vsanFields" style="display: none;">
                                <label for="vsanCapacityTB" class="form-label">vSAN Capacity (TB)</label>
                                <input type="number" class="form-control" id="vsanCapacityTB" name="vsanCapacityTB" min="1" step="0.1">
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="nsxEnabled" name="nsxEnabled" value="yes">
                                <label class="form-check-label" for="nsxEnabled">Enable NSX Licensing</label>
                            </div>
                            
                            <div class="mb-3" id="nsxFields" style="display: none;">
                                <label for="nsxEdition" class="form-label">NSX Edition</label>
                                <select class="form-select" id="nsxEdition" name="nsxEdition">
                                    <option value="standard">NSX Standard</option>
                                    <option value="advanced">NSX Advanced</option>
                                    <option value="datacenter">NSX Data Center</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">
                        <i class="bi bi-calculator"></i> Calculate Licensing Costs
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Toggle vSAN fields
    document.getElementById('vsanEnabled').addEventListener('change', function() {
        document.getElementById('vsanFields').style.display = this.checked ? 'block' : 'none';
    });
    
    // Toggle NSX fields
    document.getElementById('nsxEnabled').addEventListener('change', function() {
        document.getElementById('nsxFields').style.display = this.checked ? 'block' : 'none';
    });
});
</script>

<%- include('../../partials/footer.ejs') %>
```

### Results View
**File**: `/src/views/calculators/licensing-results.ejs`

```html
<%- include('../../partials/header.ejs', { title: 'Licensing Cost Calculation Results' }) %>

<div class="row">
    <div class="col-12">
        <h1><i class="bi bi-currency-dollar"></i> VMware Licensing Cost Results</h1>
        <p class="lead">Detailed breakdown of your VMware licensing costs</p>
        
        <div class="mb-3">
            <a href="/calculators/licensing" class="btn btn-secondary">
                <i class="bi bi-arrow-left"></i> New Calculation
            </a>
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3><i class="bi bi-receipt"></i> Cost Breakdown</h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Component</th>
                                    <th>Quantity</th>
                                    <th>Unit Cost</th>
                                    <th>Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>vSphere <%= results.vsphereEdition.charAt(0).toUpperCase() + results.vsphereEdition.slice(1) %></td>
                                    <td><%= results.vsphereCPUs %> CPUs</td>
                                    <td>$<%= (results.vsphereLicenseCost / results.vsphereCPUs).toFixed(2) %></td>
                                    <td>$<%= results.vsphereLicenseCost.toFixed(2) %></td>
                                </tr>
                                <% if (results.vsanLicenseCost > 0) { %>
                                <tr>
                                    <td>vSAN</td>
                                    <td><%= results.vsanCapacityTB %> TB</td>
                                    <td>$<%= (results.vsanLicenseCost / results.vsanCapacityTB).toFixed(2) %></td>
                                    <td>$<%= results.vsanLicenseCost.toFixed(2) %></td>
                                </tr>
                                <% } %>
                                <% if (results.nsxLicenseCost > 0) { %>
                                <tr>
                                    <td>NSX <%= results.nsxEdition.charAt(0).toUpperCase() + results.nsxEdition.slice(1) %></td>
                                    <td><%= results.vsphereCPUs %> CPUs</td>
                                    <td>$<%= (results.nsxLicenseCost / results.vsphereCPUs).toFixed(2) %></td>
                                    <td>$<%= results.nsxLicenseCost.toFixed(2) %></td>
                                </tr>
                                <% } %>
                                <tr>
                                    <td>Support (<%= results.supportLevel.charAt(0).toUpperCase() + results.supportLevel.slice(1) %>)</td>
                                    <td></td>
                                    <td><%= (results.supportCost / results.totalLicenseCost * 100).toFixed(1) %>%</td>
                                    <td>$<%= results.supportCost.toFixed(2) %></td>
                                </tr>
                                <tr class="table-primary">
                                    <td><strong>Total License Cost</strong></td>
                                    <td></td>
                                    <td></td>
                                    <td><strong>$<%= results.totalLicenseCost.toFixed(2) %></strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3><i class="bi bi-graph-up"></i> Cost Summary</h3>
                    </div>
                    <div class="card-body">
                        <h4>Licensing Model: <%= results.licensingModel.charAt(0).toUpperCase() + results.licensingModel.slice(1) %></h4>
                        
                        <% if (results.licensingModel === 'perpetual') { %>
                        <p><strong>Upfront Cost:</strong> $<%= results.upfrontCost.toFixed(2) %></p>
                        <% } %>
                        
                        <p><strong>Annual Cost:</strong> $<%= results.annualCost.toFixed(2) %></p>
                        
                        <p><strong>3-Year Total:</strong> $<%= results.total3YearCost.toFixed(2) %></p>
                        <p><strong>5-Year Total:</strong> $<%= results.total5YearCost.toFixed(2) %></p>
                        
                        <hr>
                        
                        <p><strong>Cost per VM:</strong> $<%= results.costPerVM.toFixed(2) %></p>
                        <p><strong>Cost per Host:</strong> $<%= results.costPerHost.toFixed(2) %></p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3><i class="bi bi-arrow-left-right"></i> Alternative Edition Comparison</h3>
                    </div>
                    <div class="card-body">
                        <h4>Comparing with vSphere <%= results.alternative.edition === 'standard' ? 'Standard' : 'Enterprise Plus' %></h4>
                        
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Period</th>
                                    <th>Current Edition</th>
                                    <th>Alternative</th>
                                    <th>Difference</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>3-Year Total</td>
                                    <td>$<%= results.total3YearCost.toFixed(2) %></td>
                                    <td>$<%= results.alternative.total3YearCost.toFixed(2) %></td>
                                    <td>$<%= (results.alternative.total3YearCost - results.total3YearCost).toFixed(2) %></td>
                                </tr>
                                <tr>
                                    <td>5-Year Total</td>
                                    <td>$<%= results.total5YearCost.toFixed(2) %></td>
                                    <td>$<%= results.alternative.total5YearCost.toFixed(2) %></td>
                                    <td>$<%= (results.alternative.total5YearCost - results.total5YearCost).toFixed(2) %></td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <% if (results.alternative.total3YearCost < results.total3YearCost) { %>
                        <div class="alert alert-success">
                            <i class="bi bi-check-circle"></i> The alternative edition saves $<%= (results.total3YearCost - results.alternative.total3YearCost).toFixed(2) %> over 3 years.
                        </div>
                        <% } else { %>
                        <div class="alert alert-info">
                            <i class="bi bi-info-circle"></i> Your current edition is more cost-effective.
                        </div>
                        <% } %>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
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
    </div>
</div>

<%- include('../../partials/footer.ejs') %>
```

### App.js Integration
Add to `/src/app.js`:

```javascript
import licensingRoutes from './routes/licensing.js';

// Use routes
app.use('/calculators/licensing', licensingRoutes);
```

### Calculator Index Update
Update `/src/views/calculators/index.ejs` to include the new calculator:

```html
<div class="col-md-4 mb-4">
    <div class="card h-100">
        <div class="card-body">
            <h5 class="card-title"><i class="bi bi-currency-dollar"></i> Licensing Cost Calculator</h5>
            <p class="card-text">Calculate and compare VMware licensing costs</p>
            <a href="/calculators/licensing" class="btn btn-success">Licensing Calculator</a>
        </div>
    </div>
</div>
```

## Testing Plan
1. Unit tests for pricing calculations
2. Integration tests for form submissions
3. UI testing for responsive design
4. Pricing accuracy verification
5. Edge case testing (zero values, large numbers)

## Deployment
1. Add new routes to the application
2. Update calculator index page
3. Add internationalization strings
4. Test thoroughly before production deployment
5. Regular pricing updates