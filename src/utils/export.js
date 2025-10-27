import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Function to export calculator results to PDF
export const exportToPDF = (results, calculatorType, res) => {
  const doc = new PDFDocument();
  const filename = `vmware-${calculatorType}-results-${Date.now()}.pdf`;
  const filepath = path.join('tmp', filename);
  
  // Ensure tmp directory exists
  if (!fs.existsSync('tmp')) {
    fs.mkdirSync('tmp');
  }
  
  doc.pipe(fs.createWriteStream(filepath));
  
  // Add header
  doc.fontSize(20).text(`${calculatorType} Calculation Results`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
  doc.moveDown();
  
  // Add results based on calculator type
  switch(calculatorType) {
    case 'vm-density':
      doc.fontSize(16).text('Host Specifications:');
      doc.fontSize(12).text(`Physical CPU Cores: ${results.physicalCores}`);
      doc.text(`Core Speed: ${results.coreSpeed} GHz`);
      doc.text(`Total Memory: ${results.memoryGB} GB`);
      doc.moveDown();
      
      doc.fontSize(16).text('VM Specifications:');
      doc.fontSize(12).text(`CPU Cores per VM: ${results.vmCores}`);
      doc.text(`RAM per VM: ${results.vmRamGB} GB`);
      doc.moveDown();
      
      doc.fontSize(16).text('Consolidation Calculation:');
      doc.fontSize(12).text(`CPU-Based: ${results.cpuBasedDensity} VMs`);
      doc.text(`Memory-Based: ${results.memoryBasedDensity} VMs`);
      doc.text(`Recommended: ${results.recommendedDensity} VMs`);
      doc.text(`Conservative: ${results.conservativeDensity} VMs`);
      break;
      
    case 'storage':
      doc.fontSize(16).text('VM Specifications:');
      doc.fontSize(12).text(`Number of VMs: ${results.numVMs}`);
      doc.text(`Average VM Size: ${results.avgVMSize} GB`);
      doc.moveDown();
      
      doc.fontSize(16).text('Planning Parameters:');
      doc.fontSize(12).text(`Growth Rate: ${results.growthRate}%`);
      doc.text(`Retention Period: ${results.retentionPeriod} Days`);
      doc.moveDown();
      
      doc.fontSize(16).text('Storage Requirements:');
      doc.fontSize(12).text(`Current Storage: ${results.currentStorage} GB`);
      doc.text(`Projected Storage: ${results.projectedStorage} GB`);
      doc.text(`Backup Storage: ${results.backupStorage} GB`);
      doc.text(`Total Required: ${results.totalRequired} GB`);
      break;
      
    // Add cases for other calculator types as needed
  }
  
  doc.moveDown();
  
  // Add recommendations
  if (results.recommendations && results.recommendations.length > 0) {
    doc.fontSize(16).text('Recommendations:');
    doc.fontSize(12);
    results.recommendations.forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec}`);
    });
  }
  
  doc.end();
  
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

// Function to export calculator results to CSV
export const exportToCSV = (results, calculatorType, res) => {
  let csvContent = 'VMware Calculator Results\n';
  csvContent += `Generated on: ${new Date().toLocaleString()}\n\n`;
  
  switch(calculatorType) {
    case 'vm-density':
      csvContent += 'Category,Parameter,Value\n';
      csvContent += 'Host Specifications,Physical CPU Cores,' + results.physicalCores + '\n';
      csvContent += 'Host Specifications,Core Speed (GHz),' + results.coreSpeed + '\n';
      csvContent += 'Host Specifications,Total Memory (GB),' + results.memoryGB + '\n';
      csvContent += 'VM Specifications,CPU Cores per VM,' + results.vmCores + '\n';
      csvContent += 'VM Specifications,RAM per VM (GB),' + results.vmRamGB + '\n';
      csvContent += 'Consolidation Calculation,CPU-Based VMs,' + results.cpuBasedDensity + '\n';
      csvContent += 'Consolidation Calculation,Memory-Based VMs,' + results.memoryBasedDensity + '\n';
      csvContent += 'Consolidation Calculation,Recommended VMs,' + results.recommendedDensity + '\n';
      csvContent += 'Consolidation Calculation,Conservative VMs,' + results.conservativeDensity + '\n';
      break;
      
    case 'storage':
      csvContent += 'Category,Parameter,Value\n';
      csvContent += 'VM Specifications,Number of VMs,' + results.numVMs + '\n';
      csvContent += 'VM Specifications,Average VM Size (GB),' + results.avgVMSize + '\n';
      csvContent += 'Planning Parameters,Growth Rate (%),' + results.growthRate + '\n';
      csvContent += 'Planning Parameters,Retention Period (Days),' + results.retentionPeriod + '\n';
      csvContent += 'Storage Requirements,Current Storage (GB),' + results.currentStorage + '\n';
      csvContent += 'Storage Requirements,Projected Storage (GB),' + results.projectedStorage + '\n';
      csvContent += 'Storage Requirements,Backup Storage (GB),' + results.backupStorage + '\n';
      csvContent += 'Storage Requirements,Total Required (GB),' + results.totalRequired + '\n';
      break;
  }
  
  // Add recommendations
  if (results.recommendations && results.recommendations.length > 0) {
    csvContent += '\nRecommendations\n';
    results.recommendations.forEach((rec, index) => {
      csvContent += `${index + 1},${rec}\n`;
    });
  }
  
  const filename = `vmware-${calculatorType}-results-${Date.now()}.csv`;
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.status(200).send(csvContent);
};