# Netlify Deployment Guide

This guide explains how to deploy your Meeting Timezone Planner to Netlify.

## Prerequisites

- GitHub account
- Netlify account

## Steps for Deployment

### 1. Push Your Code to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/meeting-timezone-planner.git
git push -u origin main
```

### 2. Connect Netlify to Your GitHub Repository

1. Log in to your [Netlify account](https://app.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select your repository

### 3. Configure Build Settings

Configure the following settings:

- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Advanced build settings**: Add the following environment variables:
  - `NODE_VERSION`: `18`
  - `NPM_FLAGS`: `--legacy-peer-deps`

### 4. Deploy Your Site

1. Click "Deploy site"
2. Wait for the build to complete
3. Once deployed, Netlify will provide you with a URL for your site

### 5. Custom Domain (Optional)

You can set up a custom domain for your site through the Netlify dashboard:

1. Go to "Site settings" > "Domain management"
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

## Troubleshooting

- If you encounter any issues with routing, check your `netlify.toml` and `_redirects` files.
- If static assets aren't loading, ensure paths are correct (relative paths are preferred).
- For build failures, check the build logs in Netlify for specific error messages.

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/)
