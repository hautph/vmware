export const getIndex = (req, res) => {
  res.render('raid/index', { 
    title: 'RAID Calculator'
  });
};

export const calculateRAID = (req, res) => {
  const { 
    numDisks, 
    diskSize, 
    diskType,
    raidLevel,
    blockSizeKB,
    ioSizeKB,
    readPercentage
  } = req.body;
  
  // Convert inputs to numbers
  const numDisksInt = parseInt(numDisks) || 0;
  const diskSizeFloat = parseFloat(diskSize) || 0;
  const blockSizeKBInt = parseInt(blockSizeKB) || 64;
  const ioSizeKBInt = parseInt(ioSizeKB) || 4;
  const readPercentageFloat = parseFloat(readPercentage) || 50;
  
  // Calculate raw capacity
  const rawCapacity = numDisksInt * diskSizeFloat;
  
  // Calculate usable capacity based on RAID level
  let usableCapacity = 0;
  let overheadFactor = 0;
  let raidType = '';
  
  switch(raidLevel) {
    case 'raid0':
      usableCapacity = rawCapacity;
      overheadFactor = 0;
      raidType = 'Striping';
      break;
    case 'raid1':
      usableCapacity = rawCapacity / 2;
      overheadFactor = 2;
      raidType = 'Mirroring';
      break;
    case 'raid5':
      usableCapacity = rawCapacity - diskSizeFloat; // One disk for parity
      overheadFactor = 1 + (1 / (numDisksInt - 1));
      raidType = 'Striping with Parity';
      break;
    case 'raid6':
      usableCapacity = rawCapacity - (2 * diskSizeFloat); // Two disks for parity
      overheadFactor = 1 + (2 / (numDisksInt - 2));
      raidType = 'Striping with Dual Parity';
      break;
    case 'raid10':
      usableCapacity = rawCapacity / 2;
      overheadFactor = 2;
      raidType = 'Mirroring + Striping';
      break;
    default:
      usableCapacity = rawCapacity;
      overheadFactor = 0;
      raidType = 'Unknown';
  }
  
  // Calculate IOPS based on RAID level and disk type
  // These are approximate values for different disk types
  let diskIOPS = 0;
  let diskTypeDesc = '';
  
  switch(diskType) {
    case 'ssd':
      diskIOPS = 5000; // Approximate for consumer SSD
      diskTypeDesc = 'SSD';
      break;
    case 'sas':
      diskIOPS = 150; // Approximate for 15K RPM SAS
      diskTypeDesc = '15K RPM SAS';
      break;
    case 'sata':
      diskIOPS = 75; // Approximate for 7.2K RPM SATA
      diskTypeDesc = '7.2K RPM SATA';
      break;
    default:
      diskIOPS = 100;
      diskTypeDesc = 'Mixed';
  }
  
  // Calculate RAID penalty for writes
  let writePenalty = 1;
  switch(raidLevel) {
    case 'raid0':
      writePenalty = 1;
      break;
    case 'raid1':
    case 'raid10':
      writePenalty = 2; // Read from one, write to two
      break;
    case 'raid5':
      writePenalty = 4; // Read old data, read old parity, write new data, write new parity
      break;
    case 'raid6':
      writePenalty = 6; // Read old data, read P, read Q, write new data, write P, write Q
      break;
  }
  
  // Calculate effective IOPS
  const totalRawIOPS = numDisksInt * diskIOPS;
  const readIOPS = totalRawIOPS * (readPercentageFloat / 100);
  const writeIOPS = (totalRawIOPS * ((100 - readPercentageFloat) / 100)) / writePenalty;
  const effectiveIOPS = readIOPS + writeIOPS;
  
  // Calculate throughput (MB/s)
  const blockSizeMB = blockSizeKBInt / 1024;
  const throughputMBps = (effectiveIOPS * blockSizeMB);
  
  // Calculate rebuild time (hours)
  const rebuildTimeHours = usableCapacity / 100; // Approximate rebuild rate of 100 GB/hour
  
  const results = {
    numDisks: numDisksInt,
    diskSize: diskSizeFloat,
    diskType: diskTypeDesc,
    raidLevel,
    raidType,
    blockSizeKB: blockSizeKBInt,
    ioSizeKB: ioSizeKBInt,
    readPercentage: readPercentageFloat,
    rawCapacity,
    usableCapacity,
    overheadFactor,
    totalRawIOPS,
    readIOPS: Math.round(readIOPS),
    writeIOPS: Math.round(writeIOPS),
    effectiveIOPS: Math.round(effectiveIOPS),
    writePenalty,
    throughputMBps: throughputMBps.toFixed(2),
    rebuildTimeHours: rebuildTimeHours.toFixed(2),
    recommendations: [
      'RAID is not a backup solution - always implement separate backup strategies',
      'RAID 10 provides excellent performance and redundancy for critical applications',
      'RAID 5 offers good balance of capacity and protection for general workloads',
      'RAID 6 provides additional fault tolerance for large arrays',
      'SSDs offer significantly better performance than HDDs in any RAID configuration',
      'Consider using RAID controllers with battery-backed write cache for better performance'
    ]
  };
  
  res.render('raid/results', { 
    title: 'RAID Calculation Results',
    results
  });
};