# VMware Tool Deployment Guide

## Cloudflare Pages Deployment

This application has been configured for deployment on Cloudflare Pages as a static site.

### Configuration Files

1. **wrangler.toml** - Cloudflare Pages configuration
2. **_routes.json** - Routing configuration for static assets
3. **functions/[[path]].js** - Cloudflare Functions handler
4. **build-static.js** - Static site generation script

### Deployment Process

Cloudflare Pages automatically builds and deploys the application when changes are pushed to the repository.

The build process:
1. Runs `npm run build` (configured in Cloudflare Pages settings)
2. Generates static files in the `dist` directory
3. Deploys the static files to Cloudflare's CDN

### Current Deployment Status

✅ Successfully deployed to Cloudflare Pages

### Limitations

Since this is a full Express.js application with server-side rendering, the Cloudflare Pages deployment provides:
- A static informational landing page
- Basic API endpoints through Cloudflare Functions
- Static asset serving

For the complete application experience with all features, run the application locally or deploy to a Node.js hosting platform.

## Local Development

To run the full application locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production server
npm start
```

The application will be available at `http://localhost:3000`

## Node.js Hosting Deployment

For production deployment with full functionality, use a Node.js hosting platform:

### Heroku
```bash
# Create a Procfile
echo "web: node src/app.js" > Procfile

# Deploy to Heroku
git push heroku main
```

### Render
Create a `render.yaml` file:
```yaml
services:
  - type: web
    name: vmware-tool
    env: node
    buildCommand: npm install
    startCommand: npm start
```

### Other Platforms
- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Google Cloud Run