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
import { exportVSANToExcel } from '../utils/excelExport.js';

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

// Enhanced vSAN Detailed calculator
export const getVSANDetailed = (req, res) => {
  res.render('calculators/vsan-detailed', { 
    title: 'Enhanced vSAN Sizing Calculator'
  });
};

export const calculateVSANDetailed = (req, res) => {
  // Extract all form data
  const {
    numHosts,
    dataUsableTB,
    requiredIOPS,
    writePercentage,
    latencyRequirement,
    qosRequirement,
    vsanPolicy,
    numDiskGroups,
    capacityDriveTB,
    cacheDriveGB,
    iopsPerCapacityDrive,
    iopsPerCacheDrive,
    networkBandwidth,
    vsanLicense,
    supportRate,
    hostCost,
    capacityDriveCost,
    cacheDriveCost,
    networkAdapterCost,
    vsanLicenseCost,
    vsphereLicenseCost,
    powerCostPerHost,
    exportFormat
  } = req.body;
  
  // Parse all numeric values
  const parsedData = {
    numHosts: parseInt(numHosts),
    dataUsableTB: parseFloat(dataUsableTB),
    requiredIOPS: parseInt(requiredIOPS),
    writePercentage: parseInt(writePercentage),
    latencyRequirement: parseFloat(latencyRequirement),
    qosRequirement,
    vsanPolicy,
    numDiskGroups: parseInt(numDiskGroups),
    capacityDriveTB: parseFloat(capacityDriveTB),
    cacheDriveGB: parseInt(cacheDriveGB),
    iopsPerCapacityDrive: parseInt(iopsPerCapacityDrive),
    iopsPerCacheDrive: parseInt(iopsPerCacheDrive),
    networkBandwidth: parseInt(networkBandwidth),
    vsanLicense,
    supportRate: parseFloat(supportRate),
    hostCost: parseInt(hostCost),
    capacityDriveCost: parseInt(capacityDriveCost),
    cacheDriveCost: parseInt(cacheDriveCost),
    networkAdapterCost: parseInt(networkAdapterCost),
    vsanLicenseCost: parseInt(vsanLicenseCost),
    vsphereLicenseCost: parseInt(vsphereLicenseCost),
    powerCostPerHost: parseInt(powerCostPerHost)
  };
  
  // Calculate redundancy overhead based on policy
  let redundancyFactor = 1.33; // Default for RAID-5 (FTT=1)
  if (vsanPolicy === 'RAID-1 (FTT=1)') {
    redundancyFactor = 2; // RAID 1 (2x overhead)
  } else if (vsanPolicy === 'RAID-1 (FTT=2)') {
    redundancyFactor = 3; // RAID 1 (3x overhead)
  } else if (vsanPolicy === 'RAID-5 (FTT=1)') {
    redundancyFactor = 1.33; // RAID 5 (1.33x overhead)
  } else if (vsanPolicy === 'RAID-6 (FTT=2)') {
    redundancyFactor = 1.5; // RAID 6 (1.5x overhead)
  }
  
  // Calculate storage requirements
  const redundancyOverheadTB = parsedData.dataUsableTB * (redundancyFactor - 1);
  const totalRawCapacityTB = parsedData.dataUsableTB * redundancyFactor;
  
  // Add vSAN metadata overhead (10%)
  const metadataOverheadTB = totalRawCapacityTB * 0.1;
  const totalRawCapacityWithOverheadTB = totalRawCapacityTB + metadataOverheadTB;
  
  // Calculate per host capacity
  const capacityPerHostTB = totalRawCapacityWithOverheadTB / parsedData.numHosts;
  
  // Calculate drive requirements
  const capacityDrivesPerHost = Math.ceil(capacityPerHostTB / parsedData.capacityDriveTB);
  const totalCapacityDrives = capacityDrivesPerHost * parsedData.numHosts;
  
  const cacheDrivesPerHost = parsedData.numDiskGroups;
  const totalCacheDrives = cacheDrivesPerHost * parsedData.numHosts;
  
  const totalDrives = totalCapacityDrives + totalCacheDrives;
  
  // Calculate IOPS capability
  const totalCacheIOPSCapability = totalCacheDrives * parsedData.iopsPerCacheDrive;
  const totalCapacityIOPSCapability = totalCapacityDrives * parsedData.iopsPerCapacityDrive;
  const totalIOPSCapability = totalCacheIOPSCapability + totalCapacityIOPSCapability;
  
  // Calculate write penalty based on policy
  let writePenalty = 1.33; // Default for RAID-5
  if (vsanPolicy === 'RAID-1 (FTT=1)') {
    writePenalty = 2; // RAID 1 write penalty
  } else if (vsanPolicy === 'RAID-1 (FTT=2)') {
    writePenalty = 3; // RAID 1 (FTT=2) write penalty
  } else if (vsanPolicy === 'RAID-5 (FTT=1)') {
    writePenalty = 4; // RAID 5 write penalty
  } else if (vsanPolicy === 'RAID-6 (FTT=2)') {
    writePenalty = 6; // RAID 6 write penalty
  }
  
  // Calculate required IOPS with write penalty
  const writeIOPS = parsedData.requiredIOPS * (parsedData.writePercentage / 100);
  const readIOPS = parsedData.requiredIOPS - writeIOPS;
  const adjustedWriteIOPS = writeIOPS * writePenalty;
  const totalRequiredIOPS = readIOPS + adjustedWriteIOPS;
  
  // Performance status
  const performanceStatus = totalIOPSCapability >= totalRequiredIOPS ? 'Sufficient' : 'Insufficient';
  
  // Minimum required hosts based on policy
  let minRequiredHosts = 3;
  if (vsanPolicy === 'RAID-5 (FTT=1)') {
    minRequiredHosts = 4;
  } else if (vsanPolicy === 'RAID-6 (FTT=2)') {
    minRequiredHosts = 6;
  }
  
  const hostStatus = parsedData.numHosts >= minRequiredHosts ? 'Sufficient' : 'Insufficient';
  
  // Cost calculations
  const hostsCost = parsedData.numHosts * parsedData.hostCost;
  const capacityDrivesCost = totalCapacityDrives * parsedData.capacityDriveCost;
  const cacheDrivesCost = totalCacheDrives * parsedData.cacheDriveCost;
  const totalNetworkAdapters = parsedData.numHosts * 2; // Assuming 2 NICs per host
  const networkAdaptersCost = totalNetworkAdapters * parsedData.networkAdapterCost;
  const totalHardwareCost = hostsCost + capacityDrivesCost + cacheDrivesCost + networkAdaptersCost;
  
  // Assuming 16 CPUs per host for licensing
  const totalCPUs = parsedData.numHosts * 16;
  const vsanLicensesCost = totalCPUs * parsedData.vsanLicenseCost;
  const vsphereLicensesCost = totalCPUs * parsedData.vsphereLicenseCost;
  const totalSoftwareCost = vsanLicensesCost + vsphereLicensesCost;
  
  const totalCAPEX = totalHardwareCost + totalSoftwareCost;
  
  // Operational costs
  const annualSupportCost = totalCAPEX * (parsedData.supportRate / 100);
  const annualPowerCost = parsedData.numHosts * parsedData.powerCostPerHost;
  const totalAnnualOPEX = annualSupportCost + annualPowerCost;
  
  const threeYearOPEX = totalAnnualOPEX * 3;
  const fiveYearOPEX = totalAnnualOPEX * 5;
  
  const threeYearTCO = totalCAPEX + threeYearOPEX;
  const fiveYearTCO = totalCAPEX + fiveYearOPEX;
  
  // Recommendations
  const recommendations = [];
  if (performanceStatus !== 'Sufficient') {
    recommendations.push('Increase number of drives or select higher performance drives to meet IOPS requirements');
  }
  if (hostStatus !== 'Sufficient') {
    recommendations.push(`Increase number of hosts to at least ${minRequiredHosts} for ${vsanPolicy} policy`);
  }
  if (parsedData.latencyRequirement < 5) {
    recommendations.push('Consider all-flash configuration for lower latency requirements');
  }
  recommendations.push('Regularly monitor vSAN performance and capacity utilization');
  recommendations.push('Plan for future growth when designing the cluster');
  
  const results = {
    ...parsedData,
    redundancyOverheadTB,
    totalRawCapacityTB: totalRawCapacityWithOverheadTB,
    metadataOverheadTB,
    capacityPerHostTB,
    capacityDrivesPerHost,
    totalCapacityDrives,
    cacheDrivesPerHost,
    totalCacheDrives,
    totalDrives,
    totalIOPSCapability,
    writePenalty,
    adjustedWriteIOPS,
    totalRequiredIOPS,
    performanceStatus,
    minRequiredHosts,
    hostStatus,
    hostsCost,
    capacityDrivesCost,
    cacheDrivesCost,
    totalNetworkAdapters,
    networkAdaptersCost,
    totalHardwareCost,
    totalCPUs,
    vsanLicensesCost,
    vsphereLicensesCost,
    totalSoftwareCost,
    totalCAPEX,
    annualSupportCost,
    annualPowerCost,
    totalAnnualOPEX,
    threeYearOPEX,
    fiveYearOPEX,
    threeYearTCO,
    fiveYearTCO,
    recommendations,
    formData: req.body // Store form data for export functionality
  };
  
  // Handle export requests
  if (exportFormat === 'pdf') {
    return exportToPDF(results, 'vsan-detailed', res);
  } else if (exportFormat === 'csv') {
    return exportToCSV(results, 'vsan-detailed', res);
  } else if (exportFormat === 'excel') {
    return exportVSANToExcel(results, res);
  }
  
  res.render('calculators/vsan-detailed-results', { 
    title: 'Enhanced vSAN Sizing Results',
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
  };
  
  const opex = {
    // Annual costs
    maintenance: operationalCosts.maintenance,
    power: operationalCosts.power,
    cooling: operationalCosts.cooling,
    totalAnnual: operationalCosts.maintenance + operationalCosts.power + operationalCosts.cooling,
    // 3-year costs
    maintenance3Year: operationalCosts.maintenance3Year,
    power3Year: operationalCosts.power3Year,
    cooling3Year: operationalCosts.cooling3Year,
    total3Year: operationalCosts.total3Year,
    // 5-year costs
    maintenance5Year: operationalCosts.maintenance5Year,
    power5Year: operationalCosts.power5Year,
    cooling5Year: operationalCosts.cooling5Year,
    total5Year: operationalCosts.total5Year
  };
  
  return {
    storage: {
      rawCapacityBeforeFTT,
      rawCapacityAfterFTT,
      metadataOverhead,
      slackSpace,
      totalRawCapacity,
      capacityPerHost,
      storageMultiplier
    },
    power: {
      detailed: detailedPowerConsumption,
      perHost: detailedPowerPerHost,
      total: detailedTotalPower
    },
    costs: {
      hardware: hardwareCosts,
      licensing: licenseCosts,
      capex,
      opex
    }
  };
}

// Disaster Recovery calculator
export const getDisasterRecovery = (req, res) => {
  res.render('calculators/disaster-recovery', { 
    title: 'Disaster Recovery Calculator'
  });
};

export const calculateDisasterRecovery = (req, res) => {
  const { 
    primaryVMs, 
    avgVMSize, 
    replicationType, 
    rpoHours, 
    bandwidthMbps,
    exportFormat
  } = req.body;
  
  // Calculate storage requirements
  const primaryStorage = primaryVMs * avgVMSize;
  let drStorage = primaryStorage;
  
  // Adjust for replication type
  if (replicationType === 'full') {
    drStorage = primaryStorage * 2; // Full copy
  } else if (replicationType === 'incremental') {
    drStorage = primaryStorage * 1.2; // 20% overhead for incremental
  }
  
  // Calculate bandwidth requirements
  const rpoSeconds = rpoHours * 3600;
  const dataToTransfer = primaryStorage * 0.1; // Assume 10% change rate
  const requiredBandwidthMbps = (dataToTransfer * 8) / rpoSeconds * 1000; // Convert to Mbps
  
  const bandwidthStatus = requiredBandwidthMbps <= bandwidthMbps ? 'Sufficient' : 'Insufficient';
  
  const results = {
    primaryVMs: parseInt(primaryVMs),
    avgVMSize: parseFloat(avgVMSize),
    replicationType,
    rpoHours: parseFloat(rpoHours),
    bandwidthMbps: parseFloat(bandwidthMbps),
    primaryStorage,
    drStorage,
    requiredBandwidthMbps: requiredBandwidthMbps.toFixed(2),
    bandwidthStatus,
    recommendations: [
      'Consider network compression for replication traffic',
      'Schedule replication during off-peak hours',
      'Monitor bandwidth utilization during replication',
      'Plan for network failures and alternative paths'
    ]
  };
  
  // Handle export requests
  if (exportFormat === 'pdf') {
    return exportToPDF(results, 'disaster-recovery', res);
  } else if (exportFormat === 'csv') {
    return exportToCSV(results, 'disaster-recovery', res);
  }
  
  res.render('calculators/disaster-recovery-results', { 
    title: 'Disaster Recovery Calculation Results',
    results
  });
};