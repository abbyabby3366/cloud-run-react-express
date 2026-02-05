# Cloud Run Express + React App

This is a simple full-stack application designed for testing deployments to Google Cloud Run.

## 🛠️ Local Development

### 1. Install Dependencies
Run this in the root directory:
```bash
npm install
```

### 2. Start the App
Run this to start both the Express backend and React frontend concurrently:
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080

## 🐳 Docker (Local Build)

If you have Docker installed and want to build the image locally:
```bash
docker build -t cloud-run-app .
```

To run the container locally:
```bash
docker run -p 8080:8080 cloud-run-app
```

## 🔐 MongoDB & Environment Variables

The project now uses MongoDB for a persistent counter. 

1. **Local Setup**: I've created a `.env` file for you with your connection string.
2. **Cloud Run Setup**: **NEVER** upload your `.env` file to Cloud Run. Instead, follow these steps in the Google Cloud Console:

### How to add Env Vars to Cloud Run (Manual)
1. Go to your **Cloud Run service**.
2. Click **EDIT & DEPLOY NEW REVISION**.
3. Scroll down to the **Variables & Secrets** tab.
4. Click **ADD VARIABLE**:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://...` (your full URI)
5. Click **DEPLOY**.

---

## 🚀 Manual Deployment to Cloud Run

To deploy this without using CLI commands:

1. **Zip the project**: Zip everything **except** `node_modules` and `.git`.
2. **Cloud Console**:
   - Go to [Cloud Run](https://console.cloud.google.com/run).
   - Click **Create Service**.
   - Choose **Continuously deploy from a repository** (if using GitHub) or **Deploy from source** if you want to upload the zip.
3. **Dockerfile**: The project includes a multi-stage `Dockerfile`. Cloud Run will automatically detect it and use it to build your container.

Check [walkthrough.md](file:///C:/Users/desmo/.gemini/antigravity/brain/1f192dcf-8235-4fed-9700-59f8d68dda79/walkthrough.md) for more detailed deployment options.
