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