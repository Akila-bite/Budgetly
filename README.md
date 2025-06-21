# React + Vite


---

# 💸 Budgetly – Personal Finance Tracker

**Budgetly** is a modern, full-stack personal finance tracker that empowers users to manage their income, expenses, financial goals, and spending habits with ease and insight. Built using the **MERN stack** with **Redux Toolkit**, it supports user authentication, goal setting, real-time analytics, and beautiful data visualizations—all in one seamless app.

---

## 🌐 Deployment

**Live App:** *\[deployed URL here]*

---

## 🚀 Key Features

### 🔐 Authentication

* User registration and login using secure **JWT-based authentication**.
* Persistent login across sessions.

### 👤 Users

* Profile management: update budgeting preferences (`userType`, `budgetingStyle`, etc.).
* Avatar preview in navigation.
* Theme toggle (Light/Dark) applied globally using `ThemeContext`.

### 💳 Transactions (CRUD)

* Add, edit, delete, and view income or expense transactions.
* Transactions are categorized and stored in MongoDB.
* Inline category creation ensures smooth user experience.

### 🗂️ Categories (CRUD)

* Custom categories for Income and Expenses.
* Manage categories from the **Profile > Settings** page.
* Used dynamically across forms and filtering logic.

### 🎯 Goals (CRUD)

* Create, edit, and delete financial goals (saving or spending limits).
* Support for **short-term**, **long-term**, **monthly**, **quarterly**, and **yearly** goals.
* Progress tracking with live updates (e.g., saved R500 out of R2000).
* Goal filtering by type and timeframe.

### 📊 Analytics Dashboard

* Advanced data analytics with custom **React hooks**:

  * `useSpendingTrends`: summarizes spending habits over time using all transaction data.
  * `useBudgetTotals`: memoized hook calculating total income, expenses, and balance.
  * `useCategorySummary`, `useGoalProgress`, and more.
* Memoization ensures recalculations happen **only when data actually changes**, not on every refresh.

### 🧠 Smart Filtering System

* Global `TransactionFilterContext` filters data by:

  * **Category**
  * **Type** (Income/Expense)
  * **Date** (range, day, month, year)
* Filters dynamically update the views and visualizations across pages.

### 📈 Data Visualization

* **Recharts** used for rendering:

  * Spending pie charts
  * Trend line charts
  * Category-based bar graphs
* Interactive, responsive visuals integrated seamlessly into analytics and goals pages.

### 🎨 UI/UX Design

* Clean, responsive interface styled with **Tailwind CSS**.
* Primary theme: **BlueViolet** accents for a modern and elegant feel.
* Cards, progress bars, and form inputs built with accessibility and minimalism in mind.

---

## ⚙️ Tech Stack

* **Frontend:** React.js, Redux Toolkit, React Router, Tailwind CSS, Recharts
* **Backend:** Node.js, Express.js, MongoDB (via MongoDB Atlas)
* **Authentication:** JWT, bcrypt
* **API:** Fully RESTful endpoints
* **State Management:** Redux Toolkit + Context API (for filters and theming)
* **Persistence:** Redux Persist
* **Testing Tools:** Postman (for API testing)

---

## 📁 Upcoming Enhancements

(GET THESE FROM MY NOTEBOOK)

