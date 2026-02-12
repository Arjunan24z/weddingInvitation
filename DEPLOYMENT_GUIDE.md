# 🚀 Wedding Invitation - Deployment Guide

## ✅ Auto-Play Music
The website now auto-plays music on load. Note: Most browsers require user interaction first, so if blocked, the music will start on first click/scroll.

---

## 🌐 Free Hosting Options (Excluding Netlify)

### **Option 1: GitHub Pages (Recommended) ⭐**

**Steps:**

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com/signup

2. **Create a new repository**
   - Click "+" in top right → "New repository"
   - Name: `wedding-invitation` (or any name)
   - Check "Public"
   - Click "Create repository"

3. **Upload your files**
   - Click "uploading an existing file"
   - Drag and drop ALL files/folders from your wedding_Invitation folder
   - Rename `index_new.html` to `index.html` (important!)
   - Rename `styles_new.css` to `styles.css`
   - Rename `script_new.js` to `script.js`
   - Update the links in index.html accordingly
   - Commit changes

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select "main" branch
   - Click Save
   - Your site will be live at: `https://YOUR-USERNAME.github.io/wedding-invitation/`

**Time:** 5-10 minutes  
**Custom Domain:** Free  
**Bandwidth:** Unlimited

---

### **Option 2: Vercel**

**Steps:**

1. Go to https://vercel.com/signup
2. Sign up with GitHub, GitLab, or Bitbucket
3. Click "Add New" → "Project"
4. Import your GitHub repository (or upload files)
5. Click "Deploy"
6. Your site is live!

**URL:** `https://your-project.vercel.app`

---

### **Option 3: Surge.sh (Super Simple!)**

**Steps:**

1. **Install Surge** (requires Node.js)
   ```bash
   npm install -g surge
   ```

2. **Deploy from terminal:**
   ```bash
   cd /Users/akanna968@apac.comcast.com/Documents/wedding_Invitation
   surge
   ```

3. Create account when prompted
4. Press Enter to accept the folder
5. Choose your domain: `your-names-wedding.surge.sh`

**Time:** 2 minutes  
**URL:** `https://your-chosen-name.surge.sh`

---

### **Option 4: Render (Static Sites)**

**Steps:**

1. Go to https://render.com/
2. Sign up (free)
3. New → Static Site
4. Connect GitHub or upload files
5. Deploy

**URL:** `https://your-site.onrender.com`

---

### **Option 5: Firebase Hosting (Google)**

**Steps:**

1. Go to https://firebase.google.com/
2. Create a new project
3. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
4. Login and deploy:
   ```bash
   firebase login
   firebase init hosting
   firebase deploy
   ```

**URL:** `https://your-project.web.app`

---

## 📝 Before Deploying - File Checklist

Make sure to rename these files:
- `index_new.html` → `index.html`
- `styles_new.css` → `styles.css`  
- `script_new.js` → `script.js`

And update references in `index.html`:
```html
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
```

---

## 🎯 Recommended: GitHub Pages

**Why GitHub Pages?**
- ✅ Completely free
- ✅ Easy to update (just upload new files)
- ✅ Custom domain support
- ✅ SSL certificate included
- ✅ No coding required
- ✅ Great uptime

---

## 🔗 Custom Domain (Optional)

After deploying, you can connect a custom domain like `ourwedding.com`:

**For GitHub Pages:**
1. Buy domain from Namecheap/GoDaddy
2. Add CNAME record pointing to `your-username.github.io`
3. Add custom domain in GitHub Pages settings

**Cost:** $10-15/year for domain

---

## 💡 Quick Start with GitHub Pages

**Terminal Commands:**
```bash
cd /Users/akanna968@apac.comcast.com/Documents/wedding_Invitation

# Rename files
mv index_new.html index.html
mv styles_new.css styles.css
mv script_new.js script.js

# Update HTML links manually (or use commands below)
```

Then upload to GitHub!

---

## 🎊 Your Wedding Website is Ready!

Share your beautiful invitation with family and friends! 💕

**Need help?** Ask me any questions about deployment!
