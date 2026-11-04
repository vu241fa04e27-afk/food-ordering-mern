# 🍔 FoodHub PRO – Full-Stack MERN Food Ordering & Restaurant Management Platform

> **MERN Stack Web Development Training Program – Final Project Submission**

---

## 👥 Team & Submission Information

| Parameter | Details |
|---|---|
| **Team Name** | **Team AFK** |
| **Project Title** | **FoodHub PRO – Interactive Food Ordering & Kitchen Order Management System** |
| **Course / Program**| MERN Stack Web Development Training Program |
| **Lead / Member 1** | **[Student 1 Name]** — Reg No: `VU241FA04E27` (Lead Developer, GitHub: `vu241fa04e27-afk`) |
| **Member 2** | **[Student 2 Name]** — Reg No: `[Registration Number 2]` (Frontend & UI/UX Developer) |
| **Member 3** | **[Student 3 Name]** — Reg No: `[Registration Number 3]` (Backend & Database Developer) |
| **GitHub Repository**| `https://github.com/vu241fa04e27-afk/food-ordering-website` |
| **Live Frontend URL**| *(Add your deployed frontend link here)* |
| **Live Backend API** | *(Add your deployed backend link here)* |

---

## 📖 1. Project Overview & Description
**FoodHub PRO** is a production-grade, highly responsive, and creatively animated full-stack food ordering and restaurant management platform developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. 

The application offers two unified experiences:
1. **Customer Facing Portal**: Discover artisanal dishes across 8+ categories, interactive search, dynamic cart management, seamless checkout with Cash on Delivery (COD), order history, and real-time step-by-step kitchen status tracking.
2. **Admin Command Center**: Real-time sales analytics (Revenue, Orders, Food items, Customers), a live order dispatcher to advance kitchen milestones (*Pending → Confirmed → Cooking → Out for Delivery → Delivered*), category creation and management, and instant dish creation into the live database.

---

## 🎯 2. Project Objectives
- Build an authentic, secure, and resilient **end-to-end full-stack web platform**.
- Implement full **CRUD operations** (Create, Read, Update, Delete) across Food Menus, Categories, Orders, and User Profiles.
- Deliver an appetizing, modern UI/UX using **Appetite-Inducing Neo-Glassmorphism**, smooth micro-animations, and celebratory feedback (`canvas-confetti`).
- Enforce strict server-side validation: **JWT-based authentication**, **bcrypt** password encryption, and backend order calculation.
- Deploy the decoupled system cleanly to cloud providers (**GitHub** and **Vercel** serverless functions).

---

## 🛠️ 3. Technologies & Tools Used

### **Frontend**
- **React.js (v18)** — Modern component-based view layer with hooks.
- **Vite (v5)** — Ultra-fast frontend development build tooling.
- **React Router DOM (v6)** — Single Page Application (SPA) declarative client-side routing.
- **Axios** — HTTP client configured with automated JWT interceptors.
- **Lucide React** — Minimalist vector icons.
- **Canvas-Confetti** — Celebration particle physics for orders and micro-interactions.
- **Vanilla CSS3** — Custom design tokens, glassmorphism blur, responsive grid layouts, and CSS keyframe animations (`anim-float`, `pulsePill`).

### **Backend**
- **Node.js** — Asynchronous event-driven runtime environment.
- **Express.js** — Fast, unopinionated REST API framework.
- **Mongoose (v8)** — Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Tokens (JWT)** — Stateless user session management and protected routing.
- **bcryptjs** — Salted one-way password hashing.
- **CORS & Dotenv** — Cross-Origin resource sharing and environment management.

### **Database & Cloud Deployment**
- **MongoDB Atlas** — Managed cloud NoSQL database cluster.
- **GitHub** — Git version control and team collaboration.
- **Vercel** — Production frontend hosting and serverless backend API execution.

---

## ✨ 4. Key Features & Functionality

### 🛒 Customer Features
- **Authentication**: JWT register and login with automatic password hashing.
- **Food Exploration**: Search meals by name with real-time query filtering.
- **Category Filter Tabs**: 1-click filtering across Pizza, Burgers, Biryani, Indian, Chinese, Sandwiches, Desserts, and Beverages.
- **Food Details**: Detailed views with quantity selectors, ingredients, and instant add-to-cart.
- **Shopping Cart**: LocalStorage-persisted cart state with item counter badges, quantity adjustments, and auto-calculated delivery charges.
- **Express Checkout**: Form auto-fills user address and phone with 100% Cash on Delivery (COD) support.
- **Live Order Tracking**: Visual milestone tracker (*Confirmed → Prep Started → Sizzling in Kitchen → Rider on the Way → Delivered*).
- **Profile Management**: Update delivery address, contact details, and credentials.
- **About & Contact**: Story showcase with restaurant gallery, contact channels, and interactive inquiry form.

### 🛡️ Admin Features
- **Role-Based Access Control (RBAC)**: Protected routes checking `req.user.role === 'admin'`.
- **4 Live KPI Metric Cards**: Total Revenue (₹), Total Orders, Total Registered Customers, and Total Food Items.
- **Category Creation & Management**: Create new categories (e.g., Seafood, Pasta) and delete outdated ones.
- **Food Menu CRUD**: Upload new dishes (name, price, category, photo URL, description) directly to MongoDB.
- **Live Orders Dispatcher**: Advance customer order status in real time.

---

## 📁 5. Project Architecture & Directory Structure

```
food-ordering-website/
├── frontend/                     # React + Vite Frontend
│   ├── src/
│   │   ├── assets/               # Visual assets & images
│   │   ├── components/
│   │   │   └── NavBar.jsx        # Glassmorphic responsive header
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Global user auth state
│   │   │   └── CartContext.jsx   # Persistent localStorage cart state
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Hero, categories ribbon, trending dishes
│   │   │   ├── Menu.jsx          # Live search, category tabs, food cards
│   │   │   ├── FoodDetails.jsx   # Single item plate view & quantity selector
│   │   │   ├── Cart.jsx          # Cart review & free delivery calculator
│   │   │   ├── Checkout.jsx      # Address input & COD confirmation
│   │   │   ├── MyOrders.jsx      # Order history archive
│   │   │   ├── OrderTracking.jsx # Visual kitchen milestone tracker
│   │   │   ├── Profile.jsx       # User profile editor
│   │   │   ├── AdminDashboard.jsx# KPI stats, category creator, order switcher
│   │   │   ├── About.jsx         # Story, 3 pillars, culinary gallery
│   │   │   ├── Contact.jsx       # Contact details & inquiry form
│   │   │   ├── Login.jsx         # User login form
│   │   │   └── Register.jsx      # User registration form
│   │   ├── services/
│   │   │   └── api.js            # Axios client with JWT interceptor
│   │   ├── App.jsx               # React Router route definitions
│   │   ├── index.css             # UI/UX Pro Max culinary design system
│   │   └── main.jsx              # React DOM entrypoint
│   ├── package.json
│   ├── vercel.json               # SPA routing rewrite rule
│   └── vite.config.js
│
├── backend/                      # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                 # Mongoose Atlas connection handler
│   ├── controllers/
│   │   ├── authController.js     # User registration & login
│   │   ├── foodController.js     # Food items CRUD
│   │   ├── categoryController.js # Category CRUD
│   │   ├── orderController.js    # Order creation, my-orders, status update
│   │   └── userController.js     # Profile get & update
│   ├── middleware/
│   │   ├── auth.js               # JWT bearer verification middleware
│   │   └── admin.js              # Admin role authorization guard
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Food.js               # Food item schema
│   │   ├── Order.js              # Order & items schema
│   │   └── Category.js           # Category schema
│   ├── routes/
│   │   ├── auth.js               # /api/auth routes
│   │   ├── food.js               # /api/foods routes
│   │   ├── category.js           # /api/categories routes
│   │   ├── order.js              # /api/orders routes
│   │   ├── user.js               # /api/users profile routes
│   │   └── userAdmin.js          # /api/users admin user list
│   ├── seed.js                   # Database seed script (22 foods + 8 categories)
│   ├── server.js                 # Express server bootstrap & routes
│   ├── package.json
│   └── vercel.json               # Serverless Node function config
│
├── PRESENTATION.md               # 10-Slide Project Presentation outline
├── .gitignore
├── .env.example
└── README.md
```

---

## 🚀 6. Installation & Execution Guide

### Prerequisites
- Node.js (v18 or higher)
- Git
- MongoDB Atlas cluster URL

### 1. Clone the Repository
```bash
git clone https://github.com/vu241fa04e27-afk/food-ordering-website.git
cd food-ordering-website
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` folder:
```ini
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_jwt_key
CLIENT_ORIGIN=http://localhost:5173
```
Populate the database with sample dishes and admin account:
```bash
node seed.js
```
Start the backend server:
```bash
node server.js
# Or in watch mode:
npm run dev
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` folder:
```ini
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🔑 7. Demo Credentials

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@example.com` | `admin123` | Full Admin Dashboard (`/admin`), Category Manager, Food CRUD, Order Dispatcher |
| **Customer** | *(Create new via `/register`)* | *(Your choice)* | Browse, Add to Cart, Checkout, Live Order Tracking, Profile |

---

## 🌐 8. Deployment Instructions (Vercel)

### Backend Deployment:
1. Push your code to GitHub.
2. In Vercel, click **"Add New Project"** → Import your repository.
3. Set **Root Directory** to `backend`.
4. Under **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas URI.
   - `JWT_SECRET`: Any secure random secret string.
   - `CLIENT_ORIGIN`: Your deployed frontend URL.
5. Click **Deploy**. Note down your Backend URL (e.g., `https://food-backend.vercel.app`).

### Frontend Deployment:
1. In Vercel, click **"Add New Project"** → Import the same repository.
2. Set **Root Directory** to `frontend`.
3. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://food-backend.vercel.app/api`
4. Click **Deploy**. Your food ordering website is now live globally!

---

## 📄 9. Project Presentation
A detailed, university-format 10-slide PowerPoint content structure is stored in **`PRESENTATION.md`** inside this repository.
