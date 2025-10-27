import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Function to export vSAN detailed calculator results to Excel
export const exportVSANToExcel = (results, res) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Worksheet 1: INPUTS
  const inputsData = [
    ['THÔNG SÔ KỸ THUẬT', 'GIÁ TRỊ', 'GHI CHÚ / VENDOR', 'TIÊU CHUẨN'],
    ['Số lượng ESXi Host', results.numHosts, 'VMware ReadyNode', ''],
    ['Số Core / Host', 16, '', ''], // Assuming 16 cores per host
    ['Dung lượng Data Usable (TB)', results.dataUsableTB, '', 'Yêu cầu ban đầu'],
    ['Yêu cầu IOPS (Tổng)', results.requiredIOPS, '', '70% Read, 30% Write'],
    ['Tỷ lệ ghi (%)', results.writePercentage, '', ''],
    ['Yêu cầu Latency (ms)', results.latencyRequirement, '', ''],
    ['Yêu cầu QoS', results.qosRequirement, 'Thấp / Trung bình / Cao', ''],
    ['Băng thông Mạng vSAN (Gbps)', results.networkBandwidth, '10Gbps / 25Gbps / 100Gbps', ''],
    ['CẤU HÌNH vSAN', '', '', ''],
    ['Chính sách vSAN (FTT/RAID)', results.vsanPolicy, '', ''],
    ['Số lượng Disk Group / Host', results.numDiskGroups, '', ''],
    ['Loại ổ Cache (GB)', results.cacheDriveGB, 'NVMe U.2', ''],
    ['Loại ổ Capacity (TB)', results.capacityDriveTB, 'NVMe U.2', ''],
    ['IOPS / ổ Capacity', results.iopsPerCapacityDrive, 'IOPS trung bình', ''],
    ['IOPS / ổ Cache', results.iopsPerCacheDrive, 'IOPS trung bình', ''],
    ['LICENSE & HỖ TRỢ', '', '', ''],
    ['Kiểu License vSAN', results.vsanLicense, 'Standard/Advanced/Enterprise/Enterprise Plus', ''],
    ['Tỷ lệ Hỗ trợ hàng năm (%)', results.supportRate, '% trên giá phần cứng + phần mềm', ''],
    ['CHI PHÍ ƯỚC TÍNH KHÁC', '', '', ''],
    ['Chi phí Điện & Làm mát / Host / Năm', results.powerCostPerHost, 'USD', '']
  ];
  
  const wsInputs = XLSX.utils.aoa_to_sheet(inputsData);
  
  // Set column widths
  wsInputs['!cols'] = [
    { wch: 30 }, // Column A
    { wch: 20 }, // Column B
    { wch: 25 }, // Column C
    { wch: 25 }  // Column D
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, wsInputs, '01_INPUTS');
  
  // Worksheet 2: PRICING
  const pricingData = [
    ['HẠNG MỤC', 'ĐƠN VỊ', 'ĐƠN GIÁ (USD)'],
    ['Phần cứng', '', ''],
    ['Máy chủ ReadyNode', 'Cái', results.hostCost],
    ['Ổ đĩa Cache (' + results.cacheDriveGB + 'GB NVMe)', 'Cái', results.cacheDriveCost],
    ['Ổ đĩa Capacity (' + results.capacityDriveTB + 'TB NVMe)', 'Cái', results.capacityDriveCost],
    ['Card mạng (' + results.networkBandwidth + 'Gbps)', 'Cái', results.networkAdapterCost],
    ['Phần mềm', '', ''],
    ['vSAN ' + results.vsanLicense + ' (per CPU)', 'Core', results.vsanLicenseCost],
    ['vSphere ' + results.vsanLicense + ' (per CPU)', 'Core', results.vsphereLicenseCost]
  ];
  
  const wsPricing = XLSX.utils.aoa_to_sheet(pricingData);
  
  // Set column widths for PRICING
  wsPricing['!cols'] = [
    { wch: 35 }, // Column A
    { wch: 15 }, // Column B
    { wch: 20 }  // Column C
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, wsPricing, '03_PRICING');
  
  // Worksheet 3: PROCESSING
  const processingData = [
    ['TÍNH TOÁN KỸ THUẬT', 'KẾT QUẢ', 'CÔNG THỨC', 'GHI CHÚ'],
    ['1. Tính dung lượng', '', '', ''],
    ['Hệ số Overhead vSAN', results.redundancyFactor || 1.33, '=IF(vsan_policy="RAID-1 (FTT=1)", 2, IF(vsan_policy="RAID-1 (FTT=2)", 3, IF(vsan_policy="RAID-5 (FTT=1)", 1.33, IF(vsan_policy="RAID-6 (FTT=2)", 1.5, "ERROR"))))', 'Quy đổi RAID level ra hệ số'],
    ['Tổng dung lượng thô cần (TB)', results.totalRawCapacityTB ? results.totalRawCapacityTB.toFixed(2) : '', '=data_usable_tb * B3', ''],
    ['Dung lượng thô / Host (TB)', results.capacityPerHostTB ? results.capacityPerHostTB.toFixed(2) : '', '=B4 / num_hosts', ''],
    ['Số ổ Capacity / Host', results.capacityDrivesPerHost || '', '=CEILING.MATH(B5/capacity_drive_size_tb)', 'Làm tròn lên'],
    ['Tổng số ổ Capacity', results.totalCapacityDrives || '', '=B7 * num_hosts', ''],
    ['2. Tính hiệu năng', '', '', ''],
    ['Tổng IOPS Cache cung cấp', results.totalCacheIOPSCapability ? results.totalCacheIOPSCapability.toLocaleString() : '', '=num_hosts * num_disk_groups * iops_per_cache_drive', ''],
    ['Tổng IOPS Capacity cung cấp', results.totalCapacityIOPSCapability ? results.totalCapacityIOPSCapability.toLocaleString() : '', '=B8 * iops_per_capacity_drive', ''],
    ['Tổng IOPS Cung cấp', results.totalIOPSCapability ? results.totalIOPSCapability.toLocaleString() : '', '=B10 + B11', ''],
    ['KẾT LUẬN IOPS', results.performanceStatus || '', '=IF(B12 >= required_iops, "ĐỦ", "KHÔNG ĐỦ")', ''],
    ['3. Kiểm tra Host tối thiểu', '', '', ''],
    ['Số host tối thiểu', results.minRequiredHosts || '', '=IF(vsan_policy="RAID-1 (FTT=1)", 2, IF(vsan_policy="RAID-1 (FTT=2)", 3, IF(vsan_policy="RAID-5 (FTT=1)", 4, IF(vsan_policy="RAID-6 (FTT=2)", 6, "ERROR"))))', ''],
    ['KẾT LUẬN HOST', results.hostStatus || '', '=IF(num_hosts >= B15, "ĐỦ", "CẦN ÍT NHẤT " & B15 & " HOST")', ''],
    ['4. Tính toán Chi phí', '', '', ''],
    ['Tổng chi phí Phần cứng', results.totalHardwareCost ? results.totalHardwareCost.toLocaleString() : '', '=(num_hosts * price_host) + (B8 * price_capacity_drive) + (num_hosts * num_disk_groups * price_cache_drive) + (num_hosts * 2 * price_nic)', ''],
    ['Tổng số Core CPU', results.totalCPUs || '', '=num_hosts * cores_per_host', ''],
    ['Tổng chi phí Phần mềm', results.totalSoftwareCost ? results.totalSoftwareCost.toLocaleString() : '', '=B18 * (price_vsan_license + price_vsphere_license)', ''],
    ['TỔNG CAPEX', results.totalCAPEX ? results.totalCAPEX.toLocaleString() : '', '=B17 + B19', ''],
    ['Chi phí Hỗ trợ năm 1', results.annualSupportCost ? results.annualSupportCost.toLocaleString() : '', '=B20 * support_rate', ''],
    ['Chi phí Vận hành năm 1', results.totalAnnualOPEX ? results.totalAnnualOPEX.toLocaleString() : '', '=B21 + (num_hosts * cost_power_host)', ''],
    ['Dự báo OPEX 3 năm', results.threeYearOPEX ? results.threeYearOPEX.toLocaleString() : '', '=B22 * 3', '']
  ];
  
  const wsProcessing = XLSX.utils.aoa_to_sheet(processingData);
  
  // Set column widths for PROCESSING
  wsProcessing['!cols'] = [
    { wch: 30 }, // Column A
    { wch: 25 }, // Column B
    { wch: 60 }, // Column C
    { wch: 30 }  // Column D
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, wsProcessing, '02_PROCESSING');
  
  // Worksheet 4: OUTPUT
  const outputData = [
    ['BÁO CÁO TỔNG HỢP vSAN', '', ''],
    ['THÔNG SÔ CẤU HÌNH', 'GIÁ TRỊ', 'ĐƠN VỊ'],
    ['Số lượng Host', results.numHosts, 'Cái'],
    ['Chính sách vSAN', results.vsanPolicy, ''],
    ['Tổng Dung lượng Usable', results.dataUsableTB, 'TB'],
    ['Tổng Dung lượng Thô', results.totalRawCapacityTB ? results.totalRawCapacityTB.toFixed(2) : '', 'TB'],
    ['Tổng số ổ Capacity', results.totalCapacityDrives || '', 'Cái'],
    ['Tổng số ổ Cache', results.totalCacheDrives || '', 'Cái'],
    ['Hiệu năng IOPS', results.totalIOPSCapability ? results.totalIOPSCapability.toLocaleString() : '', 'IOPS'],
    ['', '', ''],
    ['TỔNG CHI PHÍ DỰ KIẾN', '', ''],
    ['TỔNG CAPEX', results.totalCAPEX ? '$' + results.totalCAPEX.toLocaleString() : '', 'USD'],
    ['OPEX (Năm đầu tiên)', results.totalAnnualOPEX ? '$' + results.totalAnnualOPEX.toLocaleString() : '', 'USD'],
    ['Dự báo OPEX (3 năm)', results.threeYearOPEX ? '$' + results.threeYearOPEX.toLocaleString() : '', 'USD'],
    ['Tổng Chi phí sở hữu (3 năm)', results.threeYearTCO ? '$' + results.threeYearTCO.toLocaleString() : '', 'USD']
  ];
  
  const wsOutput = XLSX.utils.aoa_to_sheet(outputData);
  
  // Set column widths for OUTPUT
  wsOutput['!cols'] = [
    { wch: 30 }, // Column A
    { wch: 20 }, // Column B
    { wch: 15 }  // Column C
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, wsOutput, '04_OUTPUT');
  
  // Worksheet 5: DASHBOARD
  const dashboardData = [
    ['DASHBOARD BÁO CÁO vSAN', '', '', ''],
    ['', '', '', ''],
    ['TỔNG CAPEX', results.totalCAPEX ? '$' + results.totalCAPEX.toLocaleString() : '', '', ''],
    ['DUNG LƯỢNG USABLE', results.dataUsableTB + ' TB', '', ''],
    ['HIỆU NĂNG IOPS', results.totalIOPSCapability ? results.totalIOPSCapability.toLocaleString() + ' IOPS' : '', '', ''],
    ['', '', '', ''],
    ['PHÂN BỔ CHI PHÍ', 'SỐ TIỀN', 'TỶ LỆ', ''],
    ['Phần cứng', results.totalHardwareCost ? '$' + results.totalHardwareCost.toLocaleString() : '', results.totalCAPEX ? ((results.totalHardwareCost / results.totalCAPEX) * 100).toFixed(1) + '%' : '', ''],
    ['Phần mềm', results.totalSoftwareCost ? '$' + results.totalSoftwareCost.toLocaleString() : '', results.totalCAPEX ? ((results.totalSoftwareCost / results.totalCAPEX) * 100).toFixed(1) + '%' : '', '']
  ];
  
  const wsDashboard = XLSX.utils.aoa_to_sheet(dashboardData);
  
  // Set column widths for DASHBOARD
  wsDashboard['!cols'] = [
    { wch: 25 }, // Column A
    { wch: 20 }, // Column B
    { wch: 15 }, // Column C
    { wch: 15 }  // Column D
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, wsDashboard, '05_DASHBOARD');
  
  // Generate filename with timestamp
  const filename = `vSAN_sizer-V8x-${Date.now()}.xlsx`;
  const filepath = path.join('tmp', filename);
  
  // Ensure tmp directory exists
  if (!fs.existsSync('tmp')) {
    fs.mkdirSync('tmp');
  }
  
  // Write workbook to file
  XLSX.writeFile(wb, filepath);
  
  // Send file to client
  res.download(filepath, filename, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
    }
    // Clean up temporary file
    fs.unlink(filepath, (unlinkErr) => {
      if (unlinkErr) console.error('Error deleting temp file:', unlinkErr);
    });
  });
};