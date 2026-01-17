# 🚀 Quick Deployment Checklist

## Before You Start
- [ ] Your app is working locally (`npm run dev`)
- [ ] You have a GitHub account
- [ ] Git is installed on your computer
- [ ] You have your Gemini API key ready

---

## GitHub Pages Deployment (5 Minutes)

### 1️⃣ Update Configuration
- [ ] Edit `package.json` line 6: Update `homepage` URL with your GitHub username and repo name
  ```json
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
  ```

### 2️⃣ Create GitHub Repository
- [ ] Go to github.com → New Repository
- [ ] Name it (e.g., `dc-physics-app`)
- [ ] Make it **Public**
- [ ] Create repository

### 3️⃣ Push Your Code
Run these commands in your terminal:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4️⃣ Deploy
```bash
npm run deploy
```

### 5️⃣ Enable GitHub Pages
- [ ] Go to your repo → Settings → Pages
- [ ] Select `gh-pages` branch
- [ ] Save

### ✅ Done!
Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## Render Deployment (3 Minutes)

### 1️⃣ Push to GitHub
Follow steps 2️⃣ and 3️⃣ from above

### 2️⃣ Create Render Account
- [ ] Go to render.com
- [ ] Sign up with GitHub

### 3️⃣ Create Static Site
- [ ] New + → Static Site
- [ ] Connect your repository
- [ ] Configure:
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`

### 4️⃣ Add Environment Variable
- [ ] In Render dashboard → Environment
- [ ] Add: `GEMINI_API_KEY` = `your_actual_api_key`

### 5️⃣ Deploy
- [ ] Click "Create Static Site"

### ✅ Done!
Your site will be live at: `https://your-app.onrender.com`

---

## 📝 Important Notes

### Replace These Before Deploying:
1. **package.json** (line 6): `YOUR_USERNAME` and `YOUR_REPO_NAME`
2. All git commands: Replace repository URL with your actual URL

### Security:
- ⚠️ Never commit `.env.local` to Git (it's already in `.gitignore`)
- 🔒 Restrict your Gemini API key to your deployed domain
- 💡 Consider using a backend proxy for production

---

## 🔄 Updating Your Deployed Site

### GitHub Pages:
```bash
git add .
git commit -m "Your update message"
git push
npm run deploy
```

### Render:
```bash
git add .
git commit -m "Your update message"
git push
```
Render automatically redeploys! 🎉

---

## 🆘 Common Issues

### Blank page after deployment?
- Check `vite.config.ts` has `base: './'`
- Open browser console for errors

### Can't push to GitHub?
- Make sure you've created the repository on GitHub first
- Check your repository URL is correct

### API key not working?
- For GitHub Pages: API key must be in `.env.local` (client-side)
- For Render: Add it in Environment Variables section

---

## 📞 Need Help?
Read the full guide in `DEPLOYMENT.md`
