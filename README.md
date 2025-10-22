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
   git clone https://github.com/your-username/vmware-tool.git
   cd vmware-tool
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

## Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Cloudflare Pages Deployment

1. Push your code to a GitHub repository
2. Connect Cloudflare Pages to your repository
3. Configure the following build settings:
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `.`
   - **Root directory**: `/`

## Project Structure

```
vmware-tool/
├── src/
│   ├── controllers/    # Business logic
│   ├── routes/         # Route definitions
│   ├── views/          # EJS templates
│   ├── docs/           # Markdown documentation
│   ├── locales/        # Internationalization files
│   └── app.js          # Main application entry point
├── package.json        # Dependencies and scripts
└── wrangler.toml       # Cloudflare Pages configuration
```

## Technologies Used

- **Node.js** with **Express.js** framework
- **EJS** templating engine
- **Bootstrap 5** for responsive design
- **Marked** for Markdown parsing
- **Highlight.js** for code syntax highlighting
- **i18next** for internationalization

## License

ISC