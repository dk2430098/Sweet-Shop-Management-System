# Sweet Shop Management System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen)](https://sweet-shop-management-system-mse4.vercel.app/)

A fully functional **full-stack Sweet Shop Management System** built using **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.
The app supports **customer browsing**, **admin inventory management**, **secure authentication**, and **real-time updates**.

This project demonstrates modern full-stack development practices, clean architecture, and production deployment using **Vercel**, **Render**, and **MongoDB Atlas**.

---

## Live Demo

### **Frontend (Vercel)**

https://sweet-shop-management-system-mse4.vercel.app/

### **Backend (Render)**

https://sweet-shop-management-system-1-yy5w.onrender.com

---

## Tech Stack

### **Frontend**

- React (Vite)
- Tailwind CSS
- Axios
- Lucide Icons
- Context API for Authentication
- Fully Responsive UI

### **Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js for password hashing
- CORS enabled

### **Testing**

- Jest + Supertest (Backend Testing)

### **Deployment**

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas (Cloud)

---

## Features

### **User Features**

- Login & Register
- Search sweets by:

  - Name
  - Category
  - Price range

- View sweet details
- Purchase sweets (quantity updates live)
- Beautiful responsive UI

---

### **Admin Features**

Admins get full control:

- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock quantity
- View all sweets in dashboard
- Quick actions (Edit / Delete / Restock)
- Secure admin-only access

---

## 📡 API Endpoints

### **Authentication**

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a user       |
| POST   | `/api/auth/login`    | Login & get JWT token |

### **Sweets**

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| GET    | `/api/sweets`              | Get all sweets       |
| GET    | `/api/sweets/search`       | Search sweets        |
| POST   | `/api/sweets`              | Create sweet (Admin) |
| PUT    | `/api/sweets/:id`          | Update sweet         |
| DELETE | `/api/sweets/:id`          | Delete sweet         |
| POST   | `/api/sweets/:id/purchase` | Reduce quantity      |
| POST   | `/api/sweets/:id/restock`  | Increase quantity    |

---

## Project Structure

Sweet-Shop-Management-System/
│
├── backend/
│ ├── src/
│ │ ├── controllers/ # Authentication + Sweets controllers
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # API routes
│ │ ├── tests/ # Jest + SuperTest API test cases
│ │ └── server.js # Express app entry point
│ ├── package.json
│ └── .env
│
└── frontend/
├── src/
│ ├── components/ # Navbar, SweetCard, SweetForm, etc.
│ ├── pages/ # Home, Login, Admin Dashboard
│ ├── context/ # AuthContext for JWT + user state
│ └── services/ # Axios API integration layer
├── index.html
├── package.json
└── .env

---

## Environment Variables

### **Backend (.env)**

```
PORT=10000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

### **Frontend (.env)**

```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## How to Run Locally

### **Clone the Repo**

```bash
git clone https://github.com/dk2430098/Sweet-Shop-Management-System.git
cd Sweet-Shop-Management-System
```

### **Backend**

```bash
cd backend
npm install
npm run dev
```

### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`
Backend runs on: `http://localhost:3080` (or Render port)

---

## Admin Credentials (Demo)

```
Email: deepak.phulo@gmail.com
Password: Deepak@123
```

---

## Screenshots (Optional)

docs/
├── Admin/
├── Login/
└── User/

\*\* Login & Registration Screens (docs/Login/)

| File Name                        | Description                                     |
| -------------------------------- | ----------------------------------------------- |
| **LoginPage.png**                | Main login page for users and admin             |
| **LoginCrediantials.png**        | Login page showing admin demo credentials       |
| **RegisterationPage.png**        | User registration UI                            |
| **RegiterationCrediantials.png** | Registration confirmation / example credentials |

\*\* User Screens (docs/User/)

| File Name             | Description                                  |
| --------------------- | -------------------------------------------- |
| **userPage.png**      | User homepage showing available sweets       |
| **userPage2.png**     | Additional view of user sweet list           |
| **userPage3.png**     | Expanded user browsing view                  |
| **seachSweet.png**    | Search filter UI (Name/Category/Price)       |
| **searchSweet2.png**  | Search results example                       |
| **searchSweet3.png**  | Search UI responsive mode                    |
| **searchSweet4.png**  | Search usage example                         |
| **sweetPurchase.png** | User purchase confirmation (1 quantity only) |

## \*\* Admin Screens (docs/Admin/)

| File Name                | Description                     |
| ------------------------ | ------------------------------- |
| **adminHomePage.png**    | Admin dashboard with all sweets |
| **adminCrediants.png**   | Admin account details preview   |
| **adminInsideShop2.png** | Admin view inside sweet shop    |
| **adminInsideShop3.png** | Admin sweet list view           |
| **adminInsideShop4.png** | Admin UI alternate view         |

## Why This Project Is Great

- Real-world CRUD functionality
- Authentication & role-based access
- Full cloud deployment
- Clean React + Tailwind UI
- Stable backend architecture
- Multiple environments (local, production)
- Easy to extend for real shop usage

---

## Author

**Deepak Kumar**
Full Stack Developer
GitHub: [https://github.com/dk2430098](https://github.com/dk2430098)

---

## My AI Usage

This project was developed with support from AI tools to improve productivity, maintain code quality, and accelerate debugging. Below is a transparent overview of how AI assisted throughout the development process.

### ** AI Tools Used**

- **ChatGPT (OpenAI)**
- **GitHub Copilot (VS Code Extension)**

---

### How I Used AI\*\*

I used AI as a coding assistant—not as a replacement for my own development work.
Here are the specific ways AI was used:

#### **1. Planning & Architecture**

- Used **ChatGPT** to outline the overall architecture of the Sweet Shop Management System (frontend + backend).
- Asked AI for guidance on structuring:

  - Routes and controllers
  - React folder organization
  - Environment variable usage
  - Database schema design for Sweet, User, and Purchase logic

#### **2. Debugging**

- Used **ChatGPT** to debug:

  - Express routing issues
  - JWT authentication errors
  - Vercel deployment failures (case-sensitive file names, build failures)
  - Render backend environment issues

- Asked AI to explain error messages in detail and suggest fixes.

#### **3. Code Assistance**

- Used **GitHub Copilot** for:

  - Auto-completing repetitive React component boilerplate
  - Generating initial versions of service functions (API calls)
  - Suggesting test case skeletons for Jest

- Asked **ChatGPT** to help refactor pieces of code for:

  - Cleaner controller functions
  - REST API structure
  - Integrating purchase & restock logic

#### **4. UI & UX Improvements**

- Used AI suggestions for:

  - Improving form layouts
  - Adding better error messages
  - Organizing Admin Dashboard interactions
  - Designing a professional README structure

#### **5. Documentation**

- Used **ChatGPT** to help write:

  - Project description
  - Feature breakdown
  - Setup instructions
  - This “My AI Usage” section

---

### **📌 Reflection: How AI Impacted My Workflow**

Using AI significantly improved my development workflow:

- **Faster problem-solving:**
  Whenever I hit an unexpected error (especially deployment-related), AI helped quickly identify root causes and solutions.

- **Higher code quality:**
  With AI recommendations, I improved structure, readability, and separation of concerns across backend controllers and React components.

- **Better learning:**
  Instead of simply giving answers, AI explained _why_ something works, helping me understand concepts like:

  - Mongoose schema behavior
  - Express middleware
  - Vercel vs. Render deployment differences
  - State management in React

- **More efficient development:**
  Tasks that usually take hours—debugging, structuring, documentation—became much faster.

**However, all final logic, architectural decisions, testing, and debugging verification were done by me.
AI acted as a supportive tool, not an auto-builder.**

---

## ✅ Test Report (Summary)

 **Jest + Supertest**.

| Category                        | Tests   | Status   |
| ------------------------------- | ------- | -------- |
| Authentication (Register/Login) | 4 tests | ✅ Passed |
| Sweets Search API               | 4 tests | ✅ Passed |
| Sweet Purchase API              | 2 tests | ✅ Passed |
| Sweet CRUD (Create/List/Delete) | 4 tests | ✅ Passed |
| Auth Middleware                 | 2 tests | ✅ Passed |
| Database Connectivity           | 1 test  | ✅ Passed |
| Restock API                     | 2 tests | ❌ Failed |
| Update Sweet API                | 1 test  | ❌ Failed |

### ❗ Failed Tests

* **Restock Sweet API**

  * Missing required `username` and `password` in test user creation.
* **Update Sweet API**

  * Unauthorized access (401) instead of expected 200.

### 📝 Test Command

You can run the test suite using:

```bash
npm test
```

###  Full Test Report

Full raw test output is available at:

```
backend/test-report.txt
```

---


