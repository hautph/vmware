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