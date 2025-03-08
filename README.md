# CarbonTrackr

## Overview
CarbonTrackr is a minimal proof-of-concept web application that helps users track and offset their carbon footprint using AI-generated recommendations. The application consists of a React frontend and a Node.js backend.

## Features
✅ Carbon Footprint Calculator based on travel distance & transport mode
✅ AI-generated recommendations using OpenAI API
✅ State management with Zustand for persistent storage
✅ REST API with Express.js
✅ Deployment-ready on Vercel (frontend) and Render/Fly.io (backend)

---

## 🛠️ Tech Stack
**Frontend:** React, Zustand, Shadcn, Axios, Vite  
**Backend:** Node.js, Express, OpenAI API, CORS, dotenv  
**Deployment:** Vercel/Netlify (Frontend), Render/Fly.io (Backend)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/carbontrackr.git
cd carbontrackr
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
- Create a `.env` file and add:
  ```
  OPENAI_API_KEY=your_api_key
  PORT=5000
  ```
- Start the backend:
  ```sh
  node index.js
  ```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

---

## 🖥️ API Endpoints
| Method | Endpoint            | Description                        |
|--------|--------------------|--------------------------------|
| POST   | `/api/calculate`   | Calculate carbon footprint       |
| POST   | `/api/recommend`   | Get AI-based reduction suggestions |

---

## 🌍 Deployment
**Frontend:** [Vercel/Netlify URL]  
**Backend:** [Render/Fly.io URL]  

---

## 📜 License
This project is open-source and free to use.

---

## ✉️ Contact
For any issues, reach out at [nageshbsontakke@gmail.com].

