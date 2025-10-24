// Enhanced export script for static deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a simple static version of key pages
const pages = {
  'index.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VMware Resource Sizing Tool</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        .hero {
            background: linear-gradient(135deg, #007acc, #005a99);
            color: white;
            padding: 4rem 0;
            margin-bottom: 2rem;
        }
        .feature-card {
            transition: transform 0.3s ease;
            margin-bottom: 1.5rem;
        }
        .feature-card:hover {
            transform: translateY(-5px);
        }
    </style>
</head>
<body>
    <div class="hero">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h1 class="display-4 fw-bold">VMware Resource Sizing Tool</h1>
                    <p class="lead">Calculate optimal CPU, RAM, and Storage requirements for your multi-tier application architecture.</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <div class="alert alert-info">
                    <h4 class="alert-heading">Application Information</h4>
                    <p>This is a full-featured Express.js application that requires a Node.js server to run with all its features.</p>
                    <p>The static version provides information about the application and deployment options.</p>
                </div>
                
                <h2 class="mb-4">Key Features</h2>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card feature-card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-calculator text-primary"></i> Resource Calculator</h5>
                                <p class="card-text">Compute CPU, RAM, and storage requirements for multi-tier applications.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card feature-card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-book text-primary"></i> VMware Glossary</h5>
                                <p class="card-text">Comprehensive reference for VMware terminology and concepts.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card feature-card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-journal-text text-primary"></i> Knowledge Base</h5>
                                <p class="card-text">Technical articles and best practices in Markdown format.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card feature-card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-tools text-primary"></i> Interactive Tools</h5>
                                <p class="card-text">Specialized calculators for VM density, storage, network, and more.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h2 class="mt-5 mb-4">Deployment Options</h2>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Running Locally</h5>
                        <p>To run the full application with all features:</p>
                        <ol>
                            <li>Clone the repository: <code>git clone &lt;your-repo-url&gt;</code></li>
                            <li>Install dependencies: <code>npm install</code></li>
                            <li>Start the development server: <code>npm run dev</code></li>
                            <li>Access at: <a href="http://localhost:3000">http://localhost:3000</a></li>
                        </ol>
                    </div>
                </div>
                
                <div class="card mt-3">
                    <div class="card-body">
                        <h5 class="card-title">Production Deployment</h5>
                        <p>For production deployment, use a Node.js hosting platform:</p>
                        <ul>
                            <li>Heroku</li>
                            <li>Render</li>
                            <li>DigitalOcean App Platform</li>
                            <li>AWS Elastic Beanstalk</li>
                            <li>Google Cloud Run</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <footer class="bg-light py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2025 VMware Tool. Not affiliated with VMware, Inc.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="text-decoration-none">Privacy Policy</a> | 
                    <a href="#" class="text-decoration-none">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
`,
  'calculators.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VMware Calculators - VMware Resource Sizing Tool</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <i class="bi bi-server"></i> VMware Tool
            </a>
        </div>
    </nav>
    
    <div class="container my-5">
        <div class="row">
            <div class="col-12">
                <h1><i class="bi bi-calculator"></i> VMware Calculators</h1>
                <p class="lead">Specialized calculators for planning your VMware infrastructure.</p>
                
                <div class="alert alert-warning">
                    <h4><i class="bi bi-exclamation-triangle"></i> Limited Functionality</h4>
                    <p>This static version shows the available calculators. For full functionality, run the application locally with Node.js.</p>
                </div>
                
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-server"></i> VM Consolidation Calculator</h5>
                                <p class="card-text">Calculate how many virtual machines can run on a physical host based on CPU and memory resources.</p>
                                <a href="#" class="btn btn-primary disabled">VM Consolidation Calculator</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-hdd"></i> Storage Capacity Planner</h5>
                                <p class="card-text">Plan storage requirements considering growth, backups, and VMware overhead.</p>
                                <a href="#" class="btn btn-success disabled">Storage Capacity Planner</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-diagram-3"></i> Network Bandwidth Estimator</h5>
                                <p class="card-text">Estimate network bandwidth requirements for your virtual environment.</p>
                                <a href="#" class="btn btn-info disabled">Network Bandwidth Estimator</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-database"></i> vSAN Sizing Calculator</h5>
                                <p class="card-text">Calculate storage requirements for VMware vSAN clusters.</p>
                                <a href="#" class="btn btn-warning disabled">vSAN Sizing Calculator</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-shield-lock"></i> Disaster Recovery Calculator</h5>
                                <p class="card-text">Calculate storage and bandwidth requirements for disaster recovery solutions.</p>
                                <a href="#" class="btn btn-danger disabled">Disaster Recovery Calculator</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-cpu"></i> CPU Sizing Calculator</h5>
                                <p class="card-text">Calculate optimal CPU resources for your VMware environment.</p>
                                <a href="#" class="btn btn-dark disabled">CPU Sizing Calculator</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-memory"></i> Memory Sizing Calculator</h5>
                                <p class="card-text">Calculate optimal memory resources for your VMware environment.</p>
                                <a href="#" class="btn btn-warning disabled">Memory Sizing Calculator</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-hdd-network"></i> RAID Calculator</h5>
                                <p class="card-text">Calculate RAID configuration performance and capacity.</p>
                                <a href="#" class="btn btn-info disabled">RAID Calculator</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-cloud-arrow-up"></i> Backup & Restore Speed Calculator</h5>
                                <p class="card-text">Calculate backup and restore times based on your configuration.</p>
                                <a href="#" class="btn btn-success disabled">Backup & Restore Speed Calculator</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <footer class="bg-light py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2025 VMware Tool. Not affiliated with VMware, Inc.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="index.html" class="text-decoration-none">Home</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
`,
  'glossary.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>VMware Glossary - VMware Resource Sizing Tool</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <i class="bi bi-server"></i> VMware Tool
            </a>
        </div>
    </nav>
    
    <div class="container my-5">
        <div class="row">
            <div class="col-12">
                <h1><i class="bi bi-book"></i> VMware Glossary</h1>
                <p class="lead">Look up VMware terminology and understand key components and concepts.</p>
                
                <div class="alert alert-warning">
                    <h4><i class="bi bi-exclamation-triangle"></i> Limited Functionality</h4>
                    <p>This static version shows information about the glossary feature. For full functionality with search capabilities, run the application locally with Node.js.</p>
                </div>
                
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">VMware Glossary</h5>
                        <p>The glossary contains comprehensive definitions of VMware terminology, including:</p>
                        <ul>
                            <li>Core architecture terms (ESXi, vCenter, VMkernel, etc.)</li>
                            <li>Networking concepts (vSwitch, Port Groups, NSX, etc.)</li>
                            <li>Storage technologies (vSAN, VMFS, NFS, etc.)</li>
                            <li>Availability and migration features (HA, FT, vMotion, etc.)</li>
                            <li>Security components (AppDefense, NSX, etc.)</li>
                        </ul>
                        <p>For the full interactive glossary with search functionality, run the application locally.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <footer class="bg-light py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2025 VMware Tool. Not affiliated with VMware, Inc.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="index.html" class="text-decoration-none">Home</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
`
};

// Write all pages to the dist directory
for (const [filename, content] of Object.entries(pages)) {
  const filePath = path.join(distDir, filename);
  fs.writeFileSync(filePath, content);
  console.log(`Created ${filename}`);
}

console.log('Static export completed.');
console.log('Files created in dist/:');
console.log('- index.html (Main page)');
console.log('- calculators.html (Calculators overview)');
console.log('- glossary.html (Glossary information)');