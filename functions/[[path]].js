// Cloudflare Pages Function for VMware Tool
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Handle the root path with a proper landing page
  if (path === '/' || path === '/index.html') {
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>VMware Resource Sizing Tool</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
          <style>
              .hero-section { background: linear-gradient(135deg, #0d6efd, #6610f2); color: white; }
              .feature-card { transition: transform 0.3s; }
              .feature-card:hover { transform: translateY(-5px); }
          </style>
      </head>
      <body>
          <header class="hero-section py-5">
              <div class="container">
                  <div class="row align-items-center">
                      <div class="col-lg-8">
                          <h1 class="display-4 fw-bold">VMware Resource Sizing Tool</h1>
                          <p class="lead">Calculate optimal CPU, RAM, and Storage requirements for your VMware infrastructure</p>
                      </div>
                      <div class="col-lg-4 text-center d-none d-lg-block">
                          <i class="bi bi-server" style="font-size: 5rem; opacity: 0.7;"></i>
                      </div>
                  </div>
              </div>
          </header>

          <div class="container py-5">
              <div class="row mb-5">
                  <div class="col-12 text-center">
                      <h2 class="mb-4">Important Deployment Note</h2>
                      <div class="alert alert-warning">
                          <h4><i class="bi bi-exclamation-triangle"></i> Limited Functionality</h4>
                          <p>This application requires a Node.js server to run with full functionality.</p>
                          <p>The current deployment on Cloudflare Pages is a static version with limited features.</p>
                      </div>
                  </div>
              </div>

              <div class="row g-4 mb-5">
                  <div class="col-md-6 col-lg-4">
                      <div class="card feature-card h-100 border-primary">
                          <div class="card-body">
                              <div class="text-center mb-3">
                                  <i class="bi bi-cpu text-primary" style="font-size: 2.5rem;"></i>
                              </div>
                              <h5 class="card-title text-center">Resource Sizing</h5>
                              <p class="card-text">Calculate optimal CPU, RAM, and Storage requirements for multi-tier applications.</p>
                          </div>
                      </div>
                  </div>
                  
                  <div class="col-md-6 col-lg-4">
                      <div class="card feature-card h-100 border-success">
                          <div class="card-body">
                              <div class="text-center mb-3">
                                  <i class="bi bi-book text-success" style="font-size: 2.5rem;"></i>
                              </div>
                              <h5 class="card-title text-center">VMware Glossary</h5>
                              <p class="card-text">Comprehensive reference for VMware terms and concepts.</p>
                          </div>
                      </div>
                  </div>
                  
                  <div class="col-md-6 col-lg-4">
                      <div class="card feature-card h-100 border-info">
                          <div class="card-body">
                              <div class="text-center mb-3">
                                  <i class="bi bi-calculator text-info" style="font-size: 2.5rem;"></i>
                              </div>
                              <h5 class="card-title text-center">Calculators</h5>
                              <p class="card-text">Specialized tools for VM density, storage, network, and disaster recovery planning.</p>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="row mb-5">
                  <div class="col-12">
                      <div class="card">
                          <div class="card-header bg-primary text-white">
                              <h3 class="mb-0"><i class="bi bi-code-slash"></i> Run Locally for Full Features</h3>
                          </div>
                          <div class="card-body">
                              <h5>To use this tool with full functionality:</h5>
                              <ol>
                                  <li>Clone the repository: <code>git clone https://github.com/hautph/vmware.git</code></li>
                                  <li>Navigate to the project directory: <code>cd vmware</code></li>
                                  <li>Install dependencies: <code>npm install</code></li>
                                  <li>Start the application: <code>npm start</code></li>
                                  <li>Open your browser to: <a href="http://localhost:3000">http://localhost:3000</a></li>
                              </ol>
                              
                              <div class="alert alert-info mt-4">
                                  <h5><i class="bi bi-info-circle"></i> Alternative Hosting Options</h5>
                                  <p>For production deployment with full functionality, consider these platforms:</p>
                                  <div class="row">
                                      <div class="col-md-6">
                                          <ul>
                                              <li><i class="bi bi-check-circle-fill text-success"></i> Heroku</li>
                                              <li><i class="bi bi-check-circle-fill text-success"></i> Render</li>
                                              <li><i class="bi bi-check-circle-fill text-success"></i> DigitalOcean App Platform</li>
                                          </ul>
                                      </div>
                                      <div class="col-md-6">
                                          <ul>
                                              <li><i class="bi bi-check-circle-fill text-success"></i> AWS Elastic Beanstalk</li>
                                              <li><i class="bi bi-check-circle-fill text-success"></i> Google Cloud Run</li>
                                              <li><i class="bi bi-check-circle-fill text-success"></i> Azure App Service</li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="row">
                  <div class="col-12 text-center">
                      <p class="text-muted">
                          <i class="bi bi-github"></i> Source code available on 
                          <a href="https://github.com/hautph/vmware" target="_blank">GitHub</a>
                      </p>
                  </div>
              </div>
          </div>

          <footer class="bg-dark text-white py-4">
              <div class="container">
                  <div class="row">
                      <div class="col-12 text-center">
                          <p class="mb-0">&copy; 2025 VMware Resource Sizing Tool. This is a static deployment on Cloudflare Pages.</p>
                      </div>
                  </div>
              </div>
          </footer>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 200
    });
  }

  // Handle API endpoints
  if (path.startsWith('/api/')) {
    if (path === '/api/health') {
      return new Response(
        JSON.stringify({ 
          status: 'ok', 
          timestamp: new Date().toISOString(),
          service: 'vmware-tool-static',
          version: '1.0.0'
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    if (path === '/api/status') {
      return new Response(
        JSON.stringify({ 
          status: 'static-deployment',
          message: 'VMware Tool is deployed as a static site on Cloudflare Pages',
          features: [
            'Static landing page',
            'Basic API endpoints',
            'Asset serving'
          ],
          note: 'For full functionality, run locally with Node.js'
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }
  }

  // For all other paths, return a helpful response
  return new Response(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>VMware Tool - Page Not Available</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    </head>
    <body>
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="text-center">
                        <i class="bi bi-exclamation-circle text-warning" style="font-size: 4rem;"></i>
                        <h1 class="mt-3">Page Not Available</h1>
                        <p class="lead">This path is not available in the static deployment.</p>
                        <p>The full VMware Resource Sizing Tool requires a Node.js server to run properly.</p>
                        <a href="/" class="btn btn-primary">Return to Home</a>
                        <div class="mt-4">
                            <p class="text-muted">To access the full application, please run it locally:</p>
                            <code>git clone https://github.com/hautph/vmware.git && cd vmware && npm install && npm start</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' },
    status: 200
  });
}