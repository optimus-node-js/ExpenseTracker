# 💸 ExpenseTracker — Personal Finance Manager

> A full-stack, mobile-responsive personal-finance platform: track transactions, budgets, income, loans, SIPs, subscriptions and investments — and import bank statements straight from PDF or Excel.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

---

## ✨ Features

| Module | Highlights |
|---|---|
| **Dashboard & Analytics** | Spending overview, category breakdowns, trends |
| **Transactions** | Full CRUD, categories, filters |
| **Budgets** | Monthly budgets with progress tracking |
| **Income sources** | Salary, freelance and other income streams |
| **Loans & SIPs** | EMI and systematic-investment tracking |
| **Investments** | Portfolio holdings |
| **Subscriptions** | Auto-detected recurring payments |
| **Statement import** | Upload bank statements (PDF / Excel) → parsed into transactions |
| **Auth & profile** | Session-based signup/login, avatar uploads via Cloudinary |
| **Marketing site** | Landing, features, blog, guides, docs, FAQ, careers, legal pages |

## 🔌 API (excerpt)

| Method | Endpoint |
|---|---|
| `GET/POST/PUT/DELETE` | `/api/transactions`, `/api/budgets` |
| `GET` | `/api/dashboard`, `/api/analytics` |
| `POST` | `/api/upload-statement` |
| `GET/POST` | `/api/loans`, `/api/income-sources`, `/api/investments`, `/api/sips`, `/api/subscriptions` |
| `POST` | `/api/signup`, `/api/login`, `/api/logout` |

## 📂 Structure

```
client/      React + Vite + shadcn/ui app (pages, components, hooks, layouts)
server/      Express API — routes, Mongo models, storage layer, PDF/Excel/transaction parsers
shared/      Shared schema/types
```

## 🚀 Run locally

```bash
git clone https://github.com/optimus-node-js/ExpenseTracker.git
cd ExpenseTracker
```

```bash
npm install
cat > .env <<EOF
MONGODB_URI=<your-mongodb-uri>
SESSION_SECRET=<random-secret>
CLOUDINARY_URL=<optional>
EOF
npm run dev
```

---

## 👤 Author

**Rahul Vishwakarma** — Senior Full Stack Developer · Ahmedabad, India

[![Portfolio](https://img.shields.io/badge/Portfolio-rahul--vishwakarma--portfolio.vercel.app-0A66C2?style=flat-square&logo=vercel&logoColor=white)](https://rahul-vishwakarma-portfolio.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rahul%20Vishwakarma-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/rahul-vishwakarma-101346192)
[![Email](https://img.shields.io/badge/Email-karmarahul67%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:karmarahul67@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-optimus--node--js-181717?style=flat-square&logo=github)](https://github.com/optimus-node-js)

If you find this project useful, consider giving it a ⭐.
