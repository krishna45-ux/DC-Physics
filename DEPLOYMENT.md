# 🚀 Deployment Guide for D C Physics App

This guide will help you deploy your D C Physics educational web application to either **GitHub Pages** or **Render**.

---

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ Git installed on your computer
- ✅ A GitHub account
- ✅ Your Gemini API key ready (for environment variables)

---

## **Option 1: GitHub Pages** ⭐ (Recommended - FREE)

GitHub Pages is perfect for static React apps and provides fast, reliable hosting.

### **Step 1: Create a GitHub Repository**

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name your repository (e.g., `dc-physics-app`)
4. Make it **Public** (required for free GitHub Pages)
5. Click **"Create repository"**

### **Step 2: Initialize Git and Push Your Code**

Open your terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: D C Physics App"

# Add your GitHub repository as remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**⚠️ Important:** Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### **Step 3: Update package.json**

Edit `package.json` and update the `homepage` field (line 6):

```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
```

Example: `"homepage": "https://johnsmith.github.io/dc-physics-app"`

### **Step 4: Install gh-pages and Deploy**

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Build and deploy to GitHub Pages
npm run deploy
```

This command will:
- Build your app for production
- Create a `gh-pages` branch
- Push the built files to GitHub Pages

### **Step 5: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **"Source"**, select the **`gh-pages`** branch
4. Click **Save**

### **Step 6: Configure Environment Variables**

Since GitHub Pages is static hosting, you'll need to configure your API key:

**Option A:** Use `.env.local` (Not Recommended for production)
- Keep your API key in the `.env.local` file (never commit this to Git!)

**Option B:** Use a Backend Proxy (Recommended)
- Set up a simple backend API to handle Gemini API calls securely
- Use services like Vercel, Netlify Functions, or Cloudflare Workers

### **🎉 Your Site is Live!**

Your website will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## **Option 2: Render** ⚡ (Modern Platform - FREE Tier Available)

Render provides a modern hosting platform with automatic deployments and better environment variable support.

### **Step 1: Push Your Code to GitHub**

Follow steps 1-2 from the GitHub Pages section above to create a repository and push your code.

### **Step 2: Sign Up for Render**

1. Go to [Render.com](https://render.com)
2. Sign up using your GitHub account (easiest option)

### **Step 3: Create a New Static Site**

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure the deployment:
   - **Name:** `dc-physics-app` (or your preferred name)
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

### **Step 4: Add Environment Variables**

1. In your Render dashboard, go to **"Environment"**
2. Add your environment variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your actual Gemini API key
3. Click **"Save Changes"**

### **Step 5: Deploy**

Click **"Create Static Site"** and Render will automatically:
- Install dependencies
- Build your project
- Deploy it to a live URL

### **🎉 Your Site is Live!**

Render will provide you with a URL like: `https://dc-physics-app.onrender.com`

### **Auto-Deployments**

Render automatically redeploys your site whenever you push changes to GitHub!

---

## **Comparison: GitHub Pages vs Render**

| Feature | GitHub Pages | Render |
|---------|-------------|--------|
| **Price** | Free | Free (with paid tiers) |
| **Custom Domain** | ✅ Yes | ✅ Yes |
| **HTTPS** | ✅ Automatic | ✅ Automatic |
| **Environment Variables** | ❌ Limited | ✅ Full Support |
| **Auto-Deploy** | Manual or GitHub Actions | ✅ Automatic |
| **Build Time** | Local build + deploy | Server-side build |
| **Best For** | Static sites, portfolios | Modern web apps |

---

## **🔒 Important Security Notes**

### **Protecting Your API Key:**

Since this is a client-side app, your Gemini API key will be exposed in the browser. Here are solutions:

1. **Backend API Proxy (Recommended)**
   - Create a simple backend API (using Node.js, Express, or serverless functions)
   - Move API calls to the backend
   - Keep your API key secure on the server

2. **API Key Restrictions**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Restrict your API key to specific domains (your deployed URL)
   - Set usage quotas to prevent abuse

3. **Use Serverless Functions**
   - Platforms like Vercel, Netlify, or Render offer serverless functions
   - Create an API endpoint that calls Gemini API
   - Keep the API key on the server side

---

## **📦 Quick Deployment Commands**

### **GitHub Pages:**
```bash
npm install --save-dev gh-pages
npm run deploy
```

### **Manual Build (for any platform):**
```bash
npm run build
# The built files will be in the 'dist' folder
```

---

## **🆘 Troubleshooting**

### **Issue: Blank page after deployment**
- Check browser console for errors
- Verify the `base` path in `vite.config.ts` is set correctly
- Ensure all assets are loading with correct paths

### **Issue: API key not working**
- Verify environment variables are set correctly
- Check if `.env.local` is in `.gitignore` (it should be)
- Consider using a backend proxy for API calls

### **Issue: 404 errors on refresh**
- For GitHub Pages: Add a `404.html` that redirects to `index.html`
- For Render: Configure rewrites in `render.yaml`

---

## **🎓 Next Steps**

After deployment:
1. Test all features on the live site
2. Set up a custom domain (optional)
3. Monitor usage and performance
4. Set up analytics (Google Analytics, etc.)

---

## **📞 Need Help?**

If you encounter any issues:
- Check the [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
- Review [GitHub Pages documentation](https://docs.github.com/en/pages)
- Read [Render documentation](https://render.com/docs/static-sites)

**Happy Deploying! 🚀**
