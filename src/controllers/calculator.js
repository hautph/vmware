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

export const calculateVMDensity = (req, res) => {
  const { physicalCores, coreSpeed, memoryGB, vmCores, vmRamGB } = req.body;
  
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
  const { numVMs, avgVMSize, growthRate, retentionPeriod } = req.body;
  
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