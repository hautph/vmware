// Simple Cloudflare Worker for static content
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Serve a simple HTML page
    if (pathname === '/' || pathname === '/index.html') {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>VMware Tool</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="text-center mt-5">
                            <h1 class="display-4">VMware Resource Sizing Tool</h1>
                            <p class="lead">This application requires a Node.js server to run properly.</p>
                            <p>To use this tool, please:</p>
                            <ol class="text-start">
                                <li>Clone the repository</li>
                                <li>Run <code>npm install</code></li>
                                <li>Run <code>npm start</code> or <code>npm run dev</code></li>
                                <li>Access the application at <a href="http://localhost:3000">http://localhost:3000</a></li>
                            </ol>
                            <div class="alert alert-info">
                                <h5>Deployment Note</h5>
                                <p>This application uses Express.js with Node.js built-in modules that are not compatible with Cloudflare Workers static deployment.</p>
                                <p>For production deployment, consider using a Node.js hosting platform like:</p>
                                <ul class="text-start">
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
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: 200
      });
    }
    
    // Return 404 for other paths
    return new Response('Not Found', { status: 404 });
  }
};

// Cloudflare Pages Function to handle API requests
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Handle API health check
  if (path === '/api/health') {
    return new Response(
      JSON.stringify({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'vmware-tool-static'
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    );
  }

  // For all other paths, return a simple response indicating this is a static deployment
  return new Response(
    JSON.stringify({ 
      message: 'VMware Tool Static Deployment', 
      path: path,
      note: 'This is a static version. For full functionality, run the application locally with Node.js.'
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    }
  );
}
