# 🚀 Common Club App - Development Setup Guide

Welcome to the **Common Club** repository! Follow this guide to get the backend and mobile frontend running simultaneously on your local machine.

---

## Prerequisites
 
Make sure you have the following installed before running the project:
 
- **Node.js** – [https://nodejs.org](https://nodejs.org) (LTS version recommended)
- **npm** – comes bundled with Node.js
- **Expo Go** app on your phone – available on the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
---
 
## ⚙️ Setup
 
### 1. Clone the repository
 
```bash
git clone <your-repo-url>
cd <your-project-folder>
```
 
### 2. Install dependencies
 
Install dependencies for **both** the frontend and backend:
 
```bash
# Install frontend dependencies (root folder)
npm install
 
# Install backend dependencies
cd backend
npm install
cd ..
```
 
---
 
## 🔧 Update the IP Address
 
Before running the app, you need to replace `localhost` with your machine's local IP address so your phone can connect to the backend.
 
**Why?** Your phone and computer are on the same Wi-Fi network, but your phone can't reach `localhost` — that only works on your computer itself.
 
### How to find your IP address:
- **Mac:** System Settings → Wi-Fi → Details → IP Address
- **Windows:** Run `ipconfig` in terminal → look for `IPv4 Address`
- **Linux:** Run `ip a` or `hostname -I`
### How to update:
Do a **Find & Replace** across the entire project:
 
- Search for: `localhost`
- Replace with: your IP address (e.g. `192.168.1.42`)
In VS Code: `Cmd+Shift+H` (Mac) or `Ctrl+Shift+H` (Windows)
 
> ⚠️ Your IP address may change when you reconnect to Wi-Fi. If the app can't connect, redo this step.
 
---
 
## ▶️ Running the App
 
You need to run the **backend** and **frontend** at the same time. Use a split terminal for this.
 
### Terminal 1 — Start the backend
 
```bash
cd backend
npm run dev
```
 
### Terminal 2 — Start the Expo app
 
```bash
npx expo start
```
 
> **Tip:** In VS Code, split your terminal with the `+` button or `Ctrl+Shift+5` (Mac: `Cmd+\`).
 
---
 
## 📱 Opening on Your Phone
 
1. Make sure your phone is on the **same Wi-Fi network** as your computer
2. Open the **Expo Go** app on your phone
3. Scan the **QR code** shown in Terminal 2
---
 
## 🛠️ Common Issues
 
| Problem | Fix |
|---|---|
| `npm: command not found` | Install Node.js from [nodejs.org](https://nodejs.org) |
| App can't reach the backend | Double-check you replaced `localhost` with your IP |
| QR code won't scan | Make sure both devices are on the same Wi-Fi |
| Port already in use | Kill the process using that port or restart your terminal |
| Expo Go shows a blank screen | Shake your phone and tap "Reload" |