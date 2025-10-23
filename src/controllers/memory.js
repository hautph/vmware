export const getIndex = (req, res) => {
  res.render('memory/index', { 
    title: 'Memory Sizing Calculator'
  });
};

export const calculateMemorySizing = (req, res) => {
  const { 
    numVMs, 
    avgRAMPerVM, 
    memoryOverheadPerVM, 
    memoryReservationGB,
    memoryLimitGB,
    memoryBalloonPercent,
    swapRecommendation
  } = req.body;
  
  // Convert inputs to numbers
  const numVMsInt = parseInt(numVMs) || 0;
  const avgRAMPerVMFloat = parseFloat(avgRAMPerVM) || 0;
  const memoryOverheadPerVMFloat = parseFloat(memoryOverheadPerVM) || 0;
  const memoryReservationGBFloat = parseFloat(memoryReservationGB) || 0;
  const memoryLimitGBFloat = parseFloat(memoryLimitGB) || 0;
  const memoryBalloonPercentFloat = parseFloat(memoryBalloonPercent) || 0;
  
  // Calculate total RAM needed for VMs
  const totalRAMForVMs = numVMsInt * avgRAMPerVMFloat;
  
  // Calculate memory overhead
  const totalMemoryOverhead = numVMsInt * memoryOverheadPerVMFloat;
  
  // Calculate total memory needed
  const totalMemoryNeeded = totalRAMForVMs + totalMemoryOverhead;
  
  // Calculate memory reservation and limit totals
  const totalMemoryReservation = numVMsInt * memoryReservationGBFloat;
  const totalMemoryLimit = numVMsInt * memoryLimitGBFloat;
  
  // Calculate memory ballooning effect
  const memoryRecoveredByBallooning = totalRAMForVMs * (memoryBalloonPercentFloat / 100);
  const effectiveMemoryAfterBallooning = totalRAMForVMs - memoryRecoveredByBallooning;
  
  // Calculate host memory recommendation (with 10% overhead for host OS and services)
  const hostMemoryRecommendation = totalMemoryNeeded * 1.1;
  
  const results = {
    numVMs: numVMsInt,
    avgRAMPerVM: avgRAMPerVMFloat,
    memoryOverheadPerVM: memoryOverheadPerVMFloat,
    memoryReservationGB: memoryReservationGBFloat,
    memoryLimitGB: memoryLimitGBFloat,
    memoryBalloonPercent: memoryBalloonPercentFloat,
    swapRecommendation,
    totalRAMForVMs,
    totalMemoryOverhead,
    totalMemoryNeeded,
    totalMemoryReservation,
    totalMemoryLimit,
    memoryRecoveredByBallooning,
    effectiveMemoryAfterBallooning,
    hostMemoryRecommendation,
    recommendations: [
      'Reserve 10-20% memory capacity for overhead and peak usage',
      'Use memory reservations for critical workloads',
      'Monitor memory ballooning to identify memory pressure',
      'Consider memory limits to prevent VMs from consuming excessive resources',
      'Enable memory compression to reduce swap usage',
      'Use transparent page sharing to optimize memory utilization'
    ]
  };
  
  res.render('memory/results', { 
    title: 'Memory Sizing Results',
    results
  });
};