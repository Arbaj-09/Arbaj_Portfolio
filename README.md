# Arbaj Shaikh — Professional Portfolio

Built with **Next.js 15**, **Tailwind CSS**, **TypeScript**

## 🚀 Deploy on Vercel (2 minutes)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "portfolio"
gh repo create arbaj-portfolio --public --push
# OR: create repo on github.com and push manually

# 2. Go to vercel.com → New Project → Import GitHub repo → Deploy ✅
```

## 🖥 Deploy on Hostinger VPS

```bash
# On your VPS (Ubuntu)
sudo apt install nodejs npm nginx -y

# Clone your repo
git clone https://github.com/YOUR_USERNAME/arbaj-portfolio.git
cd arbaj-portfolio

# Install & build
npm install
npm run build

# Run with PM2
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save && pm2 startup

# Nginx config: /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}

# Enable & SSL
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo certbot --nginx -d yourdomain.com
sudo systemctl restart nginx
```

## 📸 Add Your Photo

1. Put your photo as `/public/photo.jpg`
2. In `app/page.tsx` Hero section, find the emoji div and replace with:
```jsx
<img src="/photo.jpg" style={{width:120,height:120,borderRadius:16,objectFit:"cover",margin:"0 auto 20px",display:"block",border:"2px solid rgba(0,200,255,0.25)"}} alt="Arbaj Shaikh" />
```

## 📄 Add Resume

1. Put your resume as `/public/resume.pdf`
2. The "Download Resume" buttons will work automatically!

## 🏃 Local Dev

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## ✏️ Update GitHub Link

In `app/page.tsx`, find the social links in Hero and update:
```
href: "https://github.com/YOUR_ACTUAL_GITHUB"
```
"# Arbaj_Portfolio" 
