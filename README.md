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
