export const getIndex = (req, res) => {
  res.render('cpu/index', { 
    title: 'CPU Sizing Calculator'
  });
};

export const calculateCPUSizing = (req, res) => {
  const { 
    numVMs, 
    avgVCPUsPerVM, 
    cpuOverheadPerVM, 
    consolidationRatio, 
    hostCPUType,
    cpuReservationMHz,
    cpuLimitMHz
  } = req.body;
  
  // Convert inputs to numbers
  const numVMsInt = parseInt(numVMs) || 0;
  const avgVCPUsPerVMFloat = parseFloat(avgVCPUsPerVM) || 0;
  const cpuOverheadPerVMFloat = parseFloat(cpuOverheadPerVM) || 0;
  const consolidationRatioFloat = parseFloat(consolidationRatio) || 0;
  
  // Calculate total vCPUs needed
  const totalVCPUs = numVMsInt * avgVCPUsPerVMFloat;
  
  // Calculate CPU overhead (in MHz)
  const totalOverheadMHz = numVMsInt * cpuOverheadPerVMFloat;
  
  // Estimate physical CPU cores needed based on consolidation ratio
  // Consolidation ratio represents how many vCPUs can be scheduled per physical core
  const physicalCoresNeeded = Math.ceil(totalVCPUs / consolidationRatioFloat);
  
  // CPU reservation and limit calculations
  const totalCPUReservation = numVMsInt * (parseInt(cpuReservationMHz) || 0);
  const totalCPULimit = numVMsInt * (parseInt(cpuLimitMHz) || 0);
  
  // Determine recommended CPU model based on host type
  let recommendedCPUModel = '';
  let recommendedCPUSpecs = '';
  
  switch(hostCPUType) {
    case 'xeon':
      recommendedCPUModel = 'Intel Xeon Scalable';
      recommendedCPUSpecs = '8-28 cores, 2.0-3.5 GHz';
      break;
    case 'epyc':
      recommendedCPUModel = 'AMD EPYC';
      recommendedCPUSpecs = '8-64 cores, 2.0-3.7 GHz';
      break;
    case 'core':
      recommendedCPUModel = 'Intel Core';
      recommendedCPUSpecs = '4-16 cores, 2.5-5.0 GHz';
      break;
    default:
      recommendedCPUModel = 'General Purpose CPU';
      recommendedCPUSpecs = '8+ cores recommended';
  }
  
  const results = {
    numVMs: numVMsInt,
    avgVCPUsPerVM: avgVCPUsPerVMFloat,
    cpuOverheadPerVM: cpuOverheadPerVMFloat,
    consolidationRatio: consolidationRatioFloat,
    hostCPUType,
    cpuReservationMHz: parseInt(cpuReservationMHz) || 0,
    cpuLimitMHz: parseInt(cpuLimitMHz) || 0,
    totalVCPUs,
    totalOverheadMHz,
    physicalCoresNeeded,
    totalCPUReservation,
    totalCPULimit,
    recommendedCPUModel,
    recommendedCPUSpecs,
    recommendations: [
      'Consider CPU contention when setting consolidation ratios',
      'Reserve 10-20% CPU capacity for overhead and peak usage',
      'Use CPU reservations for critical workloads',
      'Monitor CPU ready time to optimize performance',
      'Consider NUMA topology for large hosts',
      'Use CPU limits to prevent noisy neighbors'
    ]
  };
  
  res.render('cpu/results', { 
    title: 'CPU Sizing Results',
    results
  });
};