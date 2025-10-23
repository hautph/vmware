export const getIndex = (req, res) => {
  res.render('backup/index', { 
    title: 'Backup & Restore Speed Calculator'
  });
};

export const calculateBackupRestore = (req, res) => {
  const { 
    dataSizeGB, 
    networkSpeedMbps, 
    storageType,
    compressionRatio,
    deduplicationRatio,
    backupWindowHours,
    concurrentJobs,
    targetUtilization
  } = req.body;
  
  // Convert inputs to numbers
  const dataSizeGBFloat = parseFloat(dataSizeGB) || 0;
  const networkSpeedMbpsFloat = parseFloat(networkSpeedMbps) || 1000;
  const compressionRatioFloat = parseFloat(compressionRatio) || 1.0;
  const deduplicationRatioFloat = parseFloat(deduplicationRatio) || 1.0;
  const backupWindowHoursFloat = parseFloat(backupWindowHours) || 8;
  const concurrentJobsInt = parseInt(concurrentJobs) || 1;
  const targetUtilizationFloat = parseFloat(targetUtilization) || 80;
  
  // Calculate effective data size after compression and deduplication
  const effectiveDataSizeGB = dataSizeGBFloat / (compressionRatioFloat * deduplicationRatioFloat);
  
  // Calculate network throughput (MB/s)
  const networkThroughputMBps = networkSpeedMbpsFloat / 8;
  
  // Adjust for target utilization
  const effectiveNetworkThroughputMBps = networkThroughputMBps * (targetUtilizationFloat / 100);
  
  // Calculate storage throughput based on storage type (MB/s)
  let storageThroughputMBps = 0;
  let storageTypeDesc = '';
  
  switch(storageType) {
    case 'ssd':
      storageThroughputMBps = 500; // Approximate for consumer SSD
      storageTypeDesc = 'SSD';
      break;
    case 'sas':
      storageThroughputMBps = 150; // Approximate for 15K RPM SAS
      storageTypeDesc = '15K RPM SAS';
      break;
    case 'sata':
      storageThroughputMBps = 100; // Approximate for 7.2K RPM SATA
      storageTypeDesc = '7.2K RPM SATA';
      break;
    case 'tape':
      storageThroughputMBps = 50; // Approximate for LTO tape
      storageTypeDesc = 'LTO Tape';
      break;
    case 'cloud':
      storageThroughputMBps = networkThroughputMBps * 0.7; // Assume 70% of network speed for cloud
      storageTypeDesc = 'Cloud Storage';
      break;
    default:
      storageThroughputMBps = 150;
      storageTypeDesc = 'Mixed';
  }
  
  // Adjust for concurrent jobs
  const effectiveStorageThroughputMBps = storageThroughputMBps * concurrentJobsInt;
  
  // Calculate bottleneck (lower of network or storage throughput)
  const bottleneckThroughputMBps = Math.min(effectiveNetworkThroughputMBps, effectiveStorageThroughputMBps);
  
  // Calculate backup time (hours)
  const dataSizeMB = effectiveDataSizeGB * 1024;
  const backupTimeHours = dataSizeMB / bottleneckThroughputMBps / 3600;
  
  // Calculate restore time (hours) - typically faster than backup
  const restoreTimeHours = backupTimeHours * 0.8;
  
  // Calculate required throughput to meet backup window
  const requiredThroughputMBps = dataSizeMB / (backupWindowHoursFloat * 3600);
  
  // Calculate daily change rate for incremental backups (%)
  const dailyChangeRate = 10; // Assume 10% daily change rate
  const incrementalDataGB = dataSizeGBFloat * (dailyChangeRate / 100);
  const incrementalDataEffectiveGB = incrementalDataGB / (compressionRatioFloat * deduplicationRatioFloat);
  const incrementalTimeHours = (incrementalDataEffectiveGB * 1024) / bottleneckThroughputMBps / 3600;
  
  const results = {
    dataSizeGB: dataSizeGBFloat,
    networkSpeedMbps: networkSpeedMbpsFloat,
    storageType: storageTypeDesc,
    compressionRatio: compressionRatioFloat,
    deduplicationRatio: deduplicationRatioFloat,
    backupWindowHours: backupWindowHoursFloat,
    concurrentJobs: concurrentJobsInt,
    targetUtilization: targetUtilizationFloat,
    effectiveDataSizeGB: effectiveDataSizeGB.toFixed(2),
    dataSizeMB: dataSizeMB,
    networkThroughputMBps: networkThroughputMBps.toFixed(2),
    effectiveNetworkThroughputMBps: effectiveNetworkThroughputMBps.toFixed(2),
    storageThroughputMBps: storageThroughputMBps.toFixed(2),
    effectiveStorageThroughputMBps: effectiveStorageThroughputMBps.toFixed(2),
    bottleneckThroughputMBps: bottleneckThroughputMBps.toFixed(2),
    backupTimeHours: backupTimeHours.toFixed(2),
    restoreTimeHours: restoreTimeHours.toFixed(2),
    requiredThroughputMBps: requiredThroughputMBps.toFixed(2),
    dailyChangeRate,
    incrementalDataGB: incrementalDataGB.toFixed(2),
    incrementalDataEffectiveGB: incrementalDataEffectiveGB.toFixed(2),
    incrementalTimeHours: incrementalTimeHours.toFixed(2),
    recommendations: [
      'Test backup and restore times regularly to validate calculations',
      'Account for network overhead and protocol inefficiencies',
      'Consider peak hour network usage when scheduling backups',
      'Implement incremental backups to reduce backup windows',
      'Use compression and deduplication to reduce data transfer',
      'Monitor storage performance during backup operations',
      'Plan for backup job failures and retry mechanisms'
    ]
  };
  
  res.render('backup/results', { 
    title: 'Backup & Restore Speed Results',
    results
  });
};