export const getIndex = (req, res) => {
  res.render('calculators/index', { 
    title: 'VMware Calculators'
  });
};

// VM Density calculator
export const getVMDensity = (req, res) => {
  res.render('calculators/vm-density', { 
    title: 'VM Density Calculator'
  });
};

import { exportToPDF, exportToCSV } from '../utils/export.js';

export const calculateVMDensity = (req, res) => {
  const { physicalCores, coreSpeed, memoryGB, vmCores, vmRamGB, exportFormat } = req.body;
  
  // Calculate density
  const cpuBasedDensity = Math.floor(physicalCores / vmCores);
  const memoryBasedDensity = Math.floor(memoryGB / vmRamGB);
  const recommendedDensity = Math.min(cpuBasedDensity, memoryBasedDensity);
  
  // Apply VMware best practices (conservative approach)
  const conservativeDensity = Math.floor(recommendedDensity * 0.8);
  
  const results = {
    physicalCores: parseInt(physicalCores),
    coreSpeed: parseFloat(coreSpeed),
    memoryGB: parseInt(memoryGB),
    vmCores: parseInt(vmCores),
    vmRamGB: parseInt(vmRamGB),
    cpuBasedDensity,
    memoryBasedDensity,
    recommendedDensity,
    conservativeDensity,
    recommendations: [
      'Consider CPU and memory contention when determining final density',
      'Account for overhead from hypervisor and other services',
      'Reserve resources for maintenance operations',
      'Monitor performance after deployment to optimize'
    ]
  };
  
  // Handle export requests
  if (exportFormat === 'pdf') {
    return exportToPDF(results, 'vm-density', res);
  } else if (exportFormat === 'csv') {
    return exportToCSV(results, 'vm-density', res);
  }
  
  res.render('calculators/vm-density-results', { 
    title: 'VM Density Calculation Results',
    results
  });
};

// Storage Capacity calculator
export const getStorage = (req, res) => {
  res.render('calculators/storage', { 
    title: 'Storage Capacity Planner'
  });
};

export const calculateStorage = (req, res) => {
  const { numVMs, avgVMSize, growthRate, retentionPeriod, exportFormat } = req.body;
  
  // Calculate storage requirements
  const currentStorage = numVMs * avgVMSize;
  const growthFactor = 1 + (growthRate / 100);
  const projectedStorage = currentStorage * growthFactor;
  const backupStorage = currentStorage * 1.5; // 1.5x for backups
  const totalRequired = projectedStorage + backupStorage;
  
  const results = {
    numVMs: parseInt(numVMs),
    avgVMSize: parseFloat(avgVMSize),
    growthRate: parseFloat(growthRate),
    retentionPeriod: parseInt(retentionPeriod),
    currentStorage,
    projectedStorage,
    backupStorage,
    totalRequired,
    recommendations: [
      'Include snapshots in your storage calculations',
      'Account for vSAN overhead (approximately 10%)',
      'Consider thin provisioning to save space',
      'Plan for storage performance, not just capacity'
    ]
  };
  
  // Handle export requests
  if (exportFormat === 'pdf') {
    return exportToPDF(results, 'storage', res);
  } else if (exportFormat === 'csv') {
    return exportToCSV(results, 'storage', res);
  }
  
  res.render('calculators/storage-results', { 
    title: 'Storage Calculation Results',
    results
  });
};

// Network Bandwidth calculator
export const getNetwork = (req, res) => {
  res.render('calculators/network', { 
    title: 'Network Bandwidth Estimator'
  });
};

export const calculateNetwork = (req, res) => {
  const { numVMs, avgBandwidth, peakMultiplier, redundancy } = req.body;
  
  // Calculate bandwidth requirements
  const averageTotal = numVMs * avgBandwidth;
  const peakTotal = averageTotal * peakMultiplier;
  const redundantBandwidth = redundancy === 'yes' ? peakTotal * 2 : peakTotal;
  
  const results = {
    numVMs: parseInt(numVMs),
    avgBandwidth: parseFloat(avgBandwidth),
    peakMultiplier: parseFloat(peakMultiplier),
    redundancy,
    averageTotal,
    peakTotal,
    redundantBandwidth,
    recommendations: [
      'Consider jumbo frames for better network performance',
      'Separate management, vMotion, and VM traffic on different networks',
      'Monitor network utilization to optimize allocation',
      'Plan for network bursts during VM migrations'
    ]
  };
  
  res.render('calculators/network-results', { 
    title: 'Network Bandwidth Results',
    results
  });
};

// vSAN Sizing calculator
export const getVSANSizing = (req, res) => {
  res.render('calculators/vsan-sizing', { 
    title: 'vSAN Sizing Calculator'
  });
};

export const calculateVSANSizing = (req, res) => {
  const { numHosts, numVMs, avgVMSize, redundancy, allFlash, cacheReserve } = req.body;
  
  // Calculate storage requirements
  const rawCapacity = numVMs * avgVMSize;
  
  // Apply redundancy factor (RAID overhead)
  let redundancyFactor = 1.33; // Default for RAID 5 (1.33x overhead)
  if (redundancy === 'raid6') {
    redundancyFactor = 1.5; // RAID 6 (1.5x overhead)
  } else if (redundancy === 'raid1') {
    redundancyFactor = 2; // RAID 1 (2x overhead)
  }
  
  // Calculate usable capacity
  const usableCapacity = rawCapacity / redundancyFactor;
  
  // Calculate raw capacity needed
  const rawCapacityNeeded = rawCapacity * redundancyFactor;
  
  // Add vSAN overhead (10% for metadata and slack space)
  const vsanOverhead = rawCapacityNeeded * 0.1;
  const totalRawCapacity = rawCapacityNeeded + vsanOverhead;
  
  // Calculate per host capacity
  const perHostCapacity = totalRawCapacity / numHosts;
  
  // Cache tier sizing (if all-flash configuration)
  let cacheTierSize = 0;
  if (allFlash === 'yes') {
    cacheTierSize = perHostCapacity * (cacheReserve / 100);
  }
  
  const results = {
    numHosts: parseInt(numHosts),
    numVMs: parseInt(numVMs),
    avgVMSize: parseFloat(avgVMSize),
    redundancy,
    allFlash: allFlash === 'yes',
    cacheReserve: parseFloat(cacheReserve),
    rawCapacity,
    usableCapacity,
    rawCapacityNeeded,
    vsanOverhead,
    totalRawCapacity,
    perHostCapacity,
    cacheTierSize,
    recommendations: [
      'For production environments, use at least 3 hosts for vSAN cluster',
      'Consider all-flash configuration for better performance',
      'Reserve 10-15% cache tier for hybrid configurations',
      'Reserve 5-10% cache tier for all-flash configurations',
      'Plan for host failures with N+1 or N+2 redundancy',
      'Monitor disk group balance across hosts'
    ]
  };
  
  res.render('calculators/vsan-sizing-results', { 
    title: 'vSAN Sizing Results',
    results
  });
};

// vSAN Cost calculator
export const getVSANCost = (req, res) => {
  res.render('calculators/vsan-cost', { 
    title: 'vSAN Cost Calculator'
  });
};

export const calculateVSANCost = (req, res) => {
  // Extract all form data
  const {
    // General Information
    projectName,
    sizerVersion,
    hardwareCost,
    licensingCost,
    maintenanceRate,
    powerCost,
    
    // vSAN Requirements
    vsanVersion,
    numHosts,
    growthRate,
    
    // Capacity & Hardware Configuration
    cpuModel,
    numCpusPerHost,
    ramPerHost,
    ramModuleSize,
    usableCapacity,
    enableDedupeComp,
    dedupeCompRatio,
    
    // FTT & RAID Requirements
    ftt,
    raidLevel,
    capacityDeviceType,
    cacheDeviceType,
    
    // Performance Requirements
    totalIOPS,
    totalThroughput,
    targetLatency,
    qosRequirements,
    
    // Network Configuration
    networkSpeed,
    numNetworkAdapters,
    
    // Licensing
    vsanLicense,
    vsphereLicense
  } = req.body;
  
  // Convert form data to appropriate types
  const parsedData = {
    projectName: projectName || 'vSAN Sizing Project',
    sizerVersion: sizerVersion || '1.0',
    hardwareCost: parseFloat(hardwareCost) || 100000,
    licensingCost: parseFloat(licensingCost) || 50000,
    maintenanceRate: parseFloat(maintenanceRate) || 18,
    powerCost: parseFloat(powerCost) || 0.15,
    vsanVersion: vsanVersion || 'vSAN 8.0',
    numHosts: parseInt(numHosts) || 0,
    growthRate: parseFloat(growthRate) || 0,
    
    cpuModel: cpuModel || 'Intel Xeon Gold 6330',
    numCpusPerHost: parseInt(numCpusPerHost) || 2,
    ramPerHost: parseInt(ramPerHost) || 256,
    ramModuleSize: parseInt(ramModuleSize) || 32,
    usableCapacity: parseFloat(usableCapacity) || 0,
    enableDedupeComp: enableDedupeComp === 'yes',
    dedupeCompRatio: parseFloat(dedupeCompRatio) || 0.5,
    
    ftt: parseInt(ftt) || 1,
    raidLevel: raidLevel || 'RAID1',
    capacityDeviceType: capacityDeviceType || 'SAS SSD',
    cacheDeviceType: cacheDeviceType || 'NVMe SSD',
    
    totalIOPS: parseInt(totalIOPS) || 0,
    totalThroughput: parseInt(totalThroughput) || 0,
    targetLatency: parseFloat(targetLatency) || 5,
    qosRequirements: qosRequirements === 'yes',
    
    networkSpeed: parseInt(networkSpeed) || 10,
    numNetworkAdapters: parseInt(numNetworkAdapters) || 2,
    
    vsanLicense: vsanLicense || 'Advanced',
    vsphereLicense: vsphereLicense || 'Enterprise Plus'
  };
  
  // Perform cost calculations
  const results = calculateVSANCosts(parsedData);
  
  res.render('calculators/vsan-cost-results', { 
    title: 'vSAN Cost Calculation Results',
    results: {
      ...parsedData,
      ...results
    }
  });
};

// Helper function to calculate vSAN costs
function calculateVSANCosts(data) {
  // Storage multiplier based on FTT and RAID level
  const getStorageMultiplier = (ftt, raidLevel) => {
    if (raidLevel === 'RAID1') return 1 + ftt;
    if (raidLevel === 'RAID5') return 1 + (ftt * 1.33);
    if (raidLevel === 'RAID6') return 1 + (ftt * 1.5);
    return 1 + ftt; // Default
  };
  
  // Calculate storage requirements
  const storageMultiplier = getStorageMultiplier(data.ftt, data.raidLevel);
  const rawCapacityBeforeFTT = data.usableCapacity / (1 - (data.enableDedupeComp ? (1 - data.dedupeCompRatio) : 0));
  const rawCapacityAfterFTT = rawCapacityBeforeFTT * storageMultiplier;
  const metadataOverhead = rawCapacityAfterFTT * 0.1; // 10%
  const slackSpace = rawCapacityAfterFTT * 0.15; // 15%
  const totalRawCapacity = rawCapacityAfterFTT + metadataOverhead + slackSpace;
  const capacityPerHost = totalRawCapacity / data.numHosts;
  
  // Calculate power consumption with detailed breakdown
  const detailedPowerConsumption = {
    cpu: 200, // Default value, would be more detailed in a real implementation
    ram: data.ramPerHost * 0.5, // 0.5W per GB of RAM
    // Storage and network power estimates
    storage: 15, // Estimated power for storage controllers per host
    network: 5, // Estimated power for network adapters per host
    chassis: 50 // Base chassis power
  };
  
  const detailedPowerPerHost = detailedPowerConsumption.cpu + detailedPowerConsumption.ram + detailedPowerConsumption.storage + 
                       detailedPowerConsumption.network + detailedPowerConsumption.chassis;
  const detailedTotalPower = data.numHosts * detailedPowerPerHost;
  
  // Calculate hardware costs using user-provided values
  const hardwareCosts = {
    hosts: data.hardwareCost,
    cpus: data.numHosts * data.numCpusPerHost * 4000, // Default CPU cost
    ram: data.numHosts * data.ramPerHost * 15, // Default RAM cost per GB
    cacheDevices: data.numHosts * 200 * 800, // Default cache device cost
    capacityDevices: totalRawCapacity * 400, // Default capacity device cost
    networkAdapters: data.numHosts * data.numNetworkAdapters * 300, // Default network adapter cost
    total: 0,
    // Detailed power information
    powerConsumption: {
      perHost: detailedPowerPerHost,
      total: detailedTotalPower,
      details: detailedPowerConsumption
    }
  };
  
  hardwareCosts.total = hardwareCosts.hosts + hardwareCosts.cpus + hardwareCosts.ram + 
                        hardwareCosts.cacheDevices + hardwareCosts.capacityDevices + hardwareCosts.networkAdapters;
  
  // Calculate licensing costs using user-provided values
  const licenseCosts = {
    vsan: data.licensingCost * 0.6, // Default distribution
    vsphere: data.licensingCost * 0.4, // Default distribution
    total: data.licensingCost
  };
  
  // Calculate operational costs using user-provided values
  const operationalCosts = {
    // Annual costs
    maintenance: hardwareCosts.total * (data.maintenanceRate / 100),
    power: detailedTotalPower * data.powerCost,
    cooling: detailedTotalPower * data.powerCost * 0.3, // 30% of power cost
    // 3-year costs
    maintenance3Year: hardwareCosts.total * (data.maintenanceRate / 100) * 3,
    power3Year: detailedTotalPower * data.powerCost * 3,
    cooling3Year: detailedTotalPower * data.powerCost * 0.3 * 3,
    total3Year: 0,
    // 5-year costs
    maintenance5Year: hardwareCosts.total * (data.maintenanceRate / 100) * 5,
    power5Year: detailedTotalPower * data.powerCost * 5,
    cooling5Year: detailedTotalPower * data.powerCost * 0.3 * 5,
    total5Year: 0
  };
  
  operationalCosts.total3Year = operationalCosts.maintenance3Year + operationalCosts.power3Year + operationalCosts.cooling3Year;
  operationalCosts.total5Year = operationalCosts.maintenance5Year + operationalCosts.power5Year + operationalCosts.cooling5Year;
  
  // Calculate CapEx and OpEx
  const capex = {
    hardware: hardwareCosts.total,
    licensing: licenseCosts.total,
    deployment: hardwareCosts.total * 0.1, // 10% for deployment
    total: 0
  };
  
  capex.total = capex.hardware + capex.licensing + capex.deployment;
  
  const opex = {
    maintenance: operationalCosts.total3Year,
    energy: operationalCosts.power3Year + operationalCosts.cooling3Year,
    total3Year: operationalCosts.total3Year,
    total5Year: operationalCosts.total5Year
  };
  
  // Calculate TCO
  const tco = {
    year3: capex.total + opex.total3Year,
    year5: capex.total + opex.total5Year
  };
  
  // Calculate ROI (simplified - would be more complex in a real implementation)
  const savings = {
    year3: tco.year3 * 0.2, // Assuming 20% savings from vSAN
    year5: tco.year5 * 0.25 // Assuming 25% savings from vSAN
  };
  
  const roi = {
    year3: (savings.year3 / tco.year3) * 100,
    year5: (savings.year5 / tco.year5) * 100,
    breakEven3Year: 2.5, // Simplified break-even point
    breakEven5Year: 3.2 // Simplified break-even point
  };
  
  // Performance metrics
  const performance = {
    totalIOPS: data.totalIOPS,
    totalThroughput: data.totalThroughput,
    targetLatency: data.targetLatency,
    achievedIOPS: data.totalIOPS * 1.2, // Assuming we can achieve 120% of requirement
    achievedThroughput: data.totalThroughput * 1.1, // Assuming we can achieve 110% of requirement
    estimatedLatency: data.targetLatency * 0.8, // Assuming we can achieve 80% of target
    iopsAssessment: data.totalIOPS > 10000 ? 'Excellent' : data.totalIOPS > 5000 ? 'Good' : 'Fair',
    throughputAssessment: data.totalThroughput > 500 ? 'Excellent' : data.totalThroughput > 250 ? 'Good' : 'Fair'
  };
  
  // Resource utilization
  const utilization = {
    cpu: 70, // Percentage
    memory: 75, // Percentage
    storage: 80, // Percentage
    network: 60 // Percentage
  };
  
  // Sizing details
  const sizing = {
    storage: {
      usableCapacity: data.usableCapacity,
      rawCapacityBeforeFTT: rawCapacityBeforeFTT,
      storageMultiplier: storageMultiplier,
      rawCapacityAfterFTT: rawCapacityAfterFTT,
      metadataOverhead: metadataOverhead,
      slackSpace: slackSpace,
      totalRawCapacity: totalRawCapacity,
      capacityPerHost: capacityPerHost
    },
    cache: {
      cacheTierSize: capacityPerHost * 0.1, // 10% rule of thumb
      cacheDeviceSize: 200, // GB per host
      numCacheDevices: data.numHosts * 2
    },
    compute: {
      totalSockets: data.numHosts * data.numCpusPerHost,
      totalCores: data.numHosts * data.numCpusPerHost * 16, // Assuming 16 cores per CPU
      totalRAM: data.numHosts * data.ramPerHost
    },
    network: {
      requiredBandwidth: data.totalThroughput * 1.5, // 50% overhead
      achievedBandwidth: data.networkSpeed * data.numNetworkAdapters
    }
  };
  
  return {
    hardwareCosts,
    licenseCosts,
    operationalCosts,
    capex,
    opex,
    tco,
    roi,
    savings,
    performance,
    utilization,
    sizing,
    recommendations: [
      'Consider all-flash configuration for better performance',
      'Ensure adequate network bandwidth for vSAN traffic',
      'Plan for N+1 redundancy in your cluster design',
      'Monitor cache hit ratios to optimize performance',
      'Regularly review licensing requirements as your environment grows'
    ]
  };
}

// Disaster Recovery calculator
export const getDisasterRecovery = (req, res) => {
  res.render('calculators/disaster-recovery', { 
    title: 'Disaster Recovery Calculator'
  });
};

export const calculateDisasterRecovery = (req, res) => {
  const { primaryVMs, avgVMSize, rto, rpo, replicationType, bandwidth } = req.body;
  
  // Calculate storage requirements
  const primaryStorage = primaryVMs * avgVMSize;
  
  // Calculate replica storage (typically 1.2x to 1.5x primary storage)
  const replicaMultiplier = 1.3; // Conservative estimate
  const replicaStorage = primaryStorage * replicaMultiplier;
  
  // Calculate total storage needed
  const totalStorage = primaryStorage + replicaStorage;
  
  // Calculate bandwidth requirements for replication
  let bandwidthRequirement = 0;
  let dailyChangeRate = 0;
  
  if (replicationType === 'synchronous') {
    // Synchronous requires high bandwidth, low latency
    dailyChangeRate = primaryStorage * 0.05; // 5% daily change rate
    bandwidthRequirement = dailyChangeRate / 24; // MB/s
  } else if (replicationType === 'asynchronous') {
    // Asynchronous can handle lower bandwidth
    dailyChangeRate = primaryStorage * 0.1; // 10% daily change rate
    bandwidthRequirement = dailyChangeRate / 24; // MB/s
  }
  
  // RTO/RPO assessment
  let rtoAssessment = '';
  let rpoAssessment = '';
  
  if (rto <= 4) {
    rtoAssessment = 'Excellent - Can recover quickly';
  } else if (rto <= 24) {
    rtoAssessment = 'Good - Standard recovery time';
  } else {
    rtoAssessment = 'Fair - Extended recovery time';
  }
  
  if (rpo <= 15) {
    rpoAssessment = 'Excellent - Near real-time protection';
  } else if (rpo <= 60) {
    rpoAssessment = 'Good - Hourly protection';
  } else {
    rpoAssessment = 'Fair - Daily protection';
  }
  
  const results = {
    primaryVMs: parseInt(primaryVMs),
    avgVMSize: parseFloat(avgVMSize),
    rto: parseInt(rto),
    rpo: parseInt(rpo),
    replicationType,
    bandwidth: parseFloat(bandwidth),
    primaryStorage,
    replicaStorage,
    totalStorage,
    dailyChangeRate,
    bandwidthRequirement,
    rtoAssessment,
    rpoAssessment,
    recommendations: [
      'Test DR failover regularly to ensure RTO/RPO targets are met',
      'Consider using VMware Site Recovery for automated failover',
      'Implement network quality of service (QoS) for replication traffic',
      'Monitor replication lag to ensure RPO compliance',
      'Plan for DR site sizing to accommodate peak workloads',
      'Document and regularly update DR procedures'
    ]
  };
  
  res.render('calculators/disaster-recovery-results', { 
    title: 'Disaster Recovery Results',
    results
  });
};