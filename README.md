# VMware Resource Sizing Tool

A comprehensive VMware planning and resource calculation tool built with Node.js, Express, and EJS.

## Features

- **VMware Resource Sizing Tool**: Calculate optimal CPU, RAM, and Storage requirements for multi-tier application architectures
- **VMware Glossary & Documentation**: Comprehensive reference for VMware terms and concepts
- **Knowledge Base**: Technical articles and best practices in Markdown format
- **Interactive Calculators**: Specialized tools for VM density, storage capacity, network bandwidth, vSAN sizing, and disaster recovery
- **Course Notes**: Module for tracking VMware course content and personal notes
- **Bilingual Support**: Available in English and Vietnamese

## Prerequisites

- Node.js v14 or higher
- npm v6 or higher

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hautph/vmware.git
   cd vmware
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Deployment Options

### Local Development
```bash
npm run dev
```

### Production (Local)
```bash
npm start
```

### Cloudflare Pages (Static Deployment)
This application is currently deployed to Cloudflare Pages as a static site with limited functionality. The full Express.js application cannot run on Cloudflare Pages due to runtime limitations.

**Note**: The Cloudflare Pages deployment only shows a landing page with instructions. For full functionality, you must run the application locally.

### Alternative Hosting Platforms (Recommended for Full Functionality)
For production deployment with full functionality, consider these platforms:

1. **Heroku**
   ```bash
   # Install Heroku CLI
   npm install -g heroku
   heroku login
   heroku create your-app-name
   git push heroku main
   ```

2. **Render**
   - Connect your GitHub repository to Render
   - Set environment variables
   - Deploy as a web service

3. **DigitalOcean App Platform**
   - Create a new app
   - Link your GitHub repository
   - Configure as a web service

4. **AWS Elastic Beanstalk**
   - Use the EB CLI
   - Deploy with `eb deploy`

5. **Google Cloud Run**
   - Containerize the application
   - Deploy with `gcloud run deploy`

## Project Structure

```
vmware/
├── src/
│   ├── controllers/    # Business logic
│   ├── routes/         # Route definitions
│   ├── views/          # EJS templates
│   ├── docs/           # Markdown documentation
│   ├── locales/        # Internationalization files
│   └── app.js          # Main application entry point
├── functions/          # Cloudflare Pages functions
├── package.json        # Dependencies and scripts
└── _routes.json        # Cloudflare Pages routing
```

## Technologies Used

- **Node.js** with **Express.js** framework
- **EJS** templating engine
- **Bootstrap 5** for responsive design
- **Marked** for Markdown parsing
- **Highlight.js** for code syntax highlighting
- **i18next** for internationalization

## Limitations of Cloudflare Pages Deployment

Cloudflare Pages is designed for static sites and serverless functions. The full VMware Resource Sizing Tool cannot run on Cloudflare Pages because:

1. It uses Node.js built-in modules (`fs`, `path`) that are not available in the Cloudflare Workers runtime
2. It requires a persistent server to handle dynamic requests
3. It uses server-side rendering with EJS templates

The current Cloudflare Pages deployment only shows a static landing page with instructions for local installation.

## License

ISC