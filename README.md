# Food Ordering Website (MERN Stack)

## Project Description
A modern, responsive food ordering web application built with the MERN stack (MongoDB, Express, React, Node.js). It provides a customer-facing interface for browsing menus, managing a shopping cart, placing orders, and tracking order status, as well as an admin dashboard for managing food items, categories, and orders.

## Features
- User registration and login (JWT authentication)
- Food menu browsing with search and category filters
- Shopping cart with persistent storage
- Checkout with cash-on-delivery payment
- Order history and tracking for customers
- Admin dashboard with statistics and management capabilities
- Role‑based access control (user vs admin)
- Responsive design for mobile, tablet, and desktop

## Technologies Used
- **Frontend**: React, Vite, React Router, Axios, Lucide React icons, CSS
- **Backend**: Node.js, Express, Mongoose, JWT, bcrypt
- **Database**: MongoDB Atlas
- **Deployment**: GitHub, Vercel (frontend & backend)

## Project Structure
```
food-ordering-website/
├─ frontend/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ context/
│  │  ├─ services/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  └─ package.json
├─ backend/
│  ├─ config/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ middleware/
│  ├─ server.js
│  └─ package.json
├─ .gitignore
├─ .env.example
└─ README.md
```

## Setup & Installation (Local Development)
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd food-ordering-website
   ```
2. **Create environment files**
   - Copy `.env.example` to `.env` in both `frontend` and `backend` directories and fill in the required values.
3. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```
4. **Run the application**
   - Start the backend server:
     ```bash
     cd backend
     npm run dev   # or node server.js
     ```
   - In a separate terminal, start the frontend:
     ```bash
     cd frontend
     npm run dev
     ```
5. Open `http://localhost:5173` (or the port shown) in your browser.

## Environment Variables (`.env.example`)
```
# Frontend
VITE_API_URL=http://localhost:5000/api   # Backend API base URL

# Backend
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/food-ordering?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

## Scripts
- **Frontend**
  - `npm run dev` – Start Vite development server
  - `npm run build` – Create production build
- **Backend**
  - `npm run dev` – Start server with nodemon
  - `npm start` – Start server (production)

## Deployment
### Vercel (Frontend)
1. Create a new Vercel project and link the `frontend` directory.
2. Set the `VITE_API_URL` environment variable to the backend's Vercel URL.
3. Deploy.

### Vercel (Backend)
1. Create another Vercel project and link the `backend` directory.
2. Add environment variables (`MONGODB_URI`, `JWT_SECRET`).
3. Vercel will treat `server.js` as a serverless function.

## Screenshots
*(Add screenshots of the UI here)*

---
*This README will be updated as the project progresses.*
