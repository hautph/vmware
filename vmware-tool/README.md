# VMware Resource Sizing Tool

A comprehensive Node.js application for VMware infrastructure planning and resource calculation.

## Features

### 1. VMware Resource Sizing Tool
Calculate optimal CPU, RAM, and Storage requirements based on workload requirements and industry best practices.

### 2. VMware Glossary & Documentation
Look up VMware terminology and understand key components like vCenter, ESXi, vMotion, etc.

### 3. Knowledge Base with Markdown Support
Access articles written in Markdown format with syntax highlighting for code blocks.

### 4. Interactive Calculators
- VM Density Calculator
- Storage Capacity Planner
- Network Bandwidth Estimator

## Security & Integrations
- Authentication system (planned)
- VMware API integration (planned)
- PDF export functionality (planned)
- Database integration for user preferences (planned)
- Additional calculators (planned)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd vmware-tool
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`

### Production Deployment

To run in production mode:
```bash
npm start
```

## Project Structure

```
vmware-tool/
├── src/
│   ├── app.js              # Main application file
│   ├── routes/             # Route definitions
│   ├── controllers/        # Business logic
│   ├── views/              # EJS templates
│   ├── public/             # Static assets
│   └── utils/              # Utility functions
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
└── package.json            # Project dependencies and scripts
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **EJS** - Template engine
- **Bootstrap 5** - Frontend framework
- **Marked** - Markdown parser
- **Highlight.js** - Syntax highlighting

## Deployment to Cloudflare Pages

1. Push your code to a GitHub repository
2. Log in to your Cloudflare dashboard
3. Go to Pages and create a new project
4. Connect your GitHub repository
5. Configure the build settings:
   - Build command: `npm run build` (if you add a build script) or leave empty
   - Build output directory: `src/public` or `dist` if you have a build step
6. Set environment variables if needed
7. Deploy!

## Future Enhancements

- User authentication and authorization
- Integration with VMware APIs for real-time data
- PDF report generation
- Database integration for saving user preferences
- Additional calculators (vSAN sizing, disaster recovery planning)
- User feedback and rating system for articles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This tool is not affiliated with, endorsed by, or sponsored by VMware, Inc. VMware is a registered trademark of VMware, Inc.