# Deployment Guide for Cloudflare Pages

This guide explains how to deploy the VMware Resource Sizing Tool to Cloudflare Pages.

## Prerequisites

1. A GitHub account
2. A Cloudflare account
3. This repository pushed to GitHub

## Deployment Steps

### 1. Push Code to GitHub

First, initialize a git repository and push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/vmware-tool.git
git push -u origin main
```

### 2. Connect Cloudflare Pages to Your Repository

1. Log in to your Cloudflare dashboard
2. Navigate to **Pages** in the left sidebar
3. Click **Create a project**
4. Select **Connect to Git** and authorize Cloudflare to access your GitHub account
5. Select the repository you just created

### 3. Configure Build Settings

Configure the following settings in Cloudflare Pages:

- **Project name**: `vmware-tool` (or any name you prefer)
- **Production branch**: `main`
- **Build command**: `npm install && npm run build`
- **Build output directory**: `/` (root directory)

### 4. Environment Variables

Add any necessary environment variables in the **Environment variables** section:

- `NODE_ENV`: `production`
- Any other environment variables you've defined in your `.env` file

### 5. Deploy

Click **Save and Deploy**. Cloudflare Pages will:

1. Clone your repository
2. Run the build command (`npm install && npm run build`)
3. Deploy the built assets to the Cloudflare edge network

### 6. Access Your Site

Once deployment is complete, you'll receive a unique URL for your site:
`https://vmware-tool.your-subdomain.pages.dev`

## Custom Domain (Optional)

To use a custom domain:

1. In your Cloudflare Pages project, go to **Custom Domains**
2. Click **Setup a custom domain**
3. Enter your domain name
4. Follow the DNS configuration instructions

## Continuous Deployment

Cloudflare Pages automatically rebuilds and deploys your site whenever you push changes to the production branch.

To trigger a new deployment:
```bash
git add .
git commit -m "Update description"
git push origin main
```

## Troubleshooting

### Build Failures

If your build fails:

1. Check the build logs in the Cloudflare Pages dashboard
2. Ensure all dependencies are correctly listed in `package.json`
3. Verify the build command is correct

### Runtime Issues

If your site doesn't work as expected:

1. Check the browser console for errors
2. Verify environment variables are correctly set
3. Ensure all routes are properly configured

## Limitations

Note that Cloudflare Pages is primarily designed for static sites. While you can deploy Express.js applications, they will run in a serverless environment with some limitations:

1. Server-side rendering works, but with cold start times
2. Long-running processes are not supported
3. File system access is limited
4. WebSocket connections have limitations

For full Express.js functionality, consider using Cloudflare Workers with Pages Functions or a traditional hosting provider.