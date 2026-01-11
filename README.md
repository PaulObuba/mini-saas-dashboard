# Mini SaaS Dashboard

A modern SaaS dashboard built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**, demonstrating clean architecture, scalable theming, protected routes, and reusable UI components.

🔗 **Live Demo**  
https://mini-saas.vercel.app/

---

## 🧰 Tech Stack

- Next.js 14+ (App Router)
- React & TypeScript
- Tailwind CSS v4 (CSS variables, no config file)
- React Hook Form + Yup
- Context API (Auth & Theme)
- Recharts
- Class Variance Authority (CVA)

---

## ⚙️ Setup

```bash
git clone https://github.com/PaulObuba/mini-saas-dashboard.git
cd mini-saas-dashboard
npm install
npm run dev
```

---

## 🧠 Decisions & Trade-offs

- **Context API instead of Redux/Zustand**  
  Chosen for simplicity and reduced boilerplate given the app’s scope. Scales well for theme and auth state without added complexity.

- **Mock authentication (localStorage)**  
  Prioritized UI, routing, and state management over backend integration. Allows faster iteration and clearer focus on frontend architecture.

- **Tailwind CSS v4 with CSS variables**  
  Enables runtime theming without rebuilds. Trade-off is less editor autocomplete compared to traditional Tailwind config.

- **App Router (Next.js)**  
  Chosen for modern layout composition and route colocation. Requires careful handling of client/server boundaries.

- **Strict TypeScript & ESLint rules**  
  Improves reliability and maintainability at the cost of initial development speed.

- **Component-first design system**  
  Slight upfront cost, but results in cleaner, reusable, and scalable UI components.
