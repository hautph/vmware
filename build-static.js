// Simple build script for Cloudflare Pages
console.log('Building for Cloudflare Pages...');

// This is a placeholder for static build
// Cloudflare Pages will use the functions directory for dynamic handling

console.log('Build completed. Cloudflare Pages will use functions for dynamic content.');

// Create necessary directories and files for static deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the dist directory exists for Cloudflare Pages
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a simple index.html file for the root
const indexPath = path.join(distDir, 'index.html');
const indexContent = `
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
                    <p>The static version on Cloudflare Pages provides information about the application and deployment options.</p>
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
`;

fs.writeFileSync(indexPath, indexContent);

console.log('Cloudflare Pages build completed.');
console.log('Note: This is a static informational page. For the full application, run it locally with Node.js.');