# Spendly 💰 — Frontend

Spendly is a modern personal finance management platform frontend built with a strong focus on scalability, clean architecture, user experience and real-world frontend engineering practices.

The application simulates the frontend layer of a real financial product, including authentication flows, protected routes, wallet management, financial transactions, authenticated financial dashboard data and integration with a secure Spring Boot backend API.

> 🚧 **Project Status:** Active Development
> This project is still evolving and is not production-ready yet.

---

# 🎯 Project Goal

Spendly aims to simulate the frontend architecture of a real financial platform, emphasizing:

* Modern frontend architecture
* Secure authentication flows
* JWT-based session handling
* Real-world financial workflows
* Responsive and maintainable UI
* Scalable React application structure
* Strong TypeScript typing
* Clean separation of concerns
* Authenticated dashboard experience
* User-centered financial management flows

This repository contains the **frontend application** of Spendly.
The backend API is maintained in a separate repository:

> ⚙️ **Backend Repository:**
> [Spendly Backend](https://github.com/paulojrtoledo/spendly-backend)

---

# 🚀 Tech Stack

## Frontend Core

* React 19
* TypeScript
* Vite
* React Router DOM v7

## Styling & UI

* Tailwind CSS v4
* CSS Variables
* Shared Light/Dark theme system

## API & State Management

* Axios
* Context API
* React Hooks
* LocalStorage session persistence

---

# 🧱 Current Stage

The frontend currently includes:

* Complete authentication flow
* Public and protected route system
* JWT session persistence
* Automatic logout on invalid or expired session
* Wallet management module
* Financial transactions module
* Authenticated financial dashboard
* Real-time wallet balance updates
* Dynamic transaction categories
* Backend integration with Axios
* Friendly error handling
* Responsive UI structure
* Loading, error, retry and empty states
* Shared Light/Dark visual theme
* Theme persistence with localStorage
* Themed login, dashboard, wallet and transaction pages

The application continues evolving toward a complete financial management platform integrated with the Spendly backend.

---

# 🧠 Domain Direction

Spendly evolved from a digital banking simulation into a more realistic personal finance management platform.

This transition allowed the project to:

* Represent realistic financial workflows
* Improve portfolio relevance
* Focus on financial organization
* Simulate real product behavior
* Prepare the platform for dashboards and analytics
* Maintain strong technical architecture while improving business direction
* Connect frontend experience with real backend business rules

---

# ✅ Progress

# Phase 1 — Authentication System (Completed)

## Implemented features

* Login page
* Register page
* CPF and password validation
* JWT authentication flow
* Authentication persistence with localStorage
* Axios API client
* Protected routes
* Public routes
* Automatic Authorization header handling
* Session hydration on refresh
* Automatic logout on invalid token
* Friendly authentication error handling

## Authentication concepts applied

* Context API state management
* Protected route architecture
* Session persistence
* Axios interceptors
* Global authentication state
* Token-based authentication flow
* Route-level access control

---

# Phase 2 — Wallet Management (Completed)

The wallet module represents one of the first complete financial workflows implemented in the frontend.

## Features

* Create wallet
* Deactivate wallet
* List authenticated user wallets
* Initial balance support
* Wallet type rendering
* Real-time UI updates
* Friendly validation feedback
* Loading and empty states
* Themed wallet cards and forms
* Light/Dark mode support

## Wallet Types

* Conta bancária
* Dinheiro físico
* Cartão de crédito
* Investimento
* Carteira digital

## Frontend concepts applied

* Component composition
* Service layer abstraction
* Typed API integration
* Controlled forms
* Local state synchronization
* Callback-based updates
* Separation of concerns
* Reusable UI structure
* Theme-aware component styling

---

# Phase 3 — Financial Transactions (Completed)

The transaction module handles financial operations linked to wallets.

## Features

* Create income transactions
* Create expense transactions
* Dynamic category filtering
* Real-time balance updates
* Friendly financial validation feedback
* Transaction listing
* Protected financial operations
* Loading and error handling
* Automatic session invalidation on 401
* Themed transaction forms and lists
* Light/Dark mode support for transaction UI

## Transaction Types

### Receita

* Salário
* Freelance
* Retorno de investimento
* Presente
* Outra receita

### Despesa

* Alimentação
* Transporte
* Saúde
* Educação
* Lazer
* Compras
* Contas
* Investimento
* Outra despesa

## Financial UX Rules

* Categories dynamically change based on transaction type
* Users cannot select invalid category/type combinations
* Insufficient funds errors are displayed with friendly messages
* Wallet balances update automatically after transactions
* Invalid sessions automatically redirect users to login
* Income and expense values receive clear visual distinction

---

# Phase 4 — Authenticated Financial Dashboard (Completed)

The dashboard module displays a real financial summary from the authenticated backend API.

## Features

* Authenticated dashboard data fetching
* Total balance card
* Total income card
* Total expense card
* Active wallet count
* Transaction count
* Recent transactions list
* Loading state
* Error state
* Retry action
* Empty state for users without transactions
* Quick links to wallets and transactions

## Dashboard API

```http
GET /dashboard/summary
```

## Example Response

```json
{
  "totalBalance": 6300.00,
  "totalIncome": 6600.00,
  "totalExpense": 100.00,
  "walletCount": 2,
  "transactionCount": 3,
  "recentTransactions": [
    {
      "id": 3,
      "description": "Market",
      "amount": 100.00,
      "type": "EXPENSE",
      "category": "FOOD",
      "walletName": "Main Wallet",
      "createdAt": "2026-05-25T20:29:00.910114"
    }
  ]
}
```

## Frontend concepts applied

* Typed dashboard response models
* Dedicated dashboard service
* Axios authenticated request flow
* Async state management
* Friendly error handling
* Responsive dashboard layout
* Real backend data rendering

---

# Phase 5 — Shared Light/Dark Theme System (Completed)

The UI was refactored to use a shared visual identity with Light and Dark modes.

## Features

* Centralized color palette in global CSS
* CSS variables for theme colors
* Light mode
* Dark mode
* Theme toggle component
* Theme persistence in localStorage
* Theme applied to LoginPage
* Theme applied to DashboardPage
* Theme applied to WalletsPage
* Theme applied to TransactionsPage
* Themed cards, forms, buttons, inputs, lists and empty states

## Theme persistence

The selected theme is stored locally using:

```txt
spendly-theme
```

## Theme concepts applied

* CSS variables
* Reusable theme hook
* Shared ThemeToggle component
* Theme-aware Tailwind styling
* Global visual consistency
* Easy future palette replacement

---

# 🔐 Authentication Architecture

The authentication system was structured using React Context API and protected routing.

## Implemented Components

| Component         | Responsibility                                           |
| ----------------- | -------------------------------------------------------- |
| AuthContext       | Global authentication state                              |
| ProtectedRoute    | Blocks unauthenticated access                            |
| PublicRoute       | Prevents authenticated users from accessing public pages |
| Axios Interceptor | Automatically attaches JWT token                         |
| LoginPage         | Public authentication screen                             |
| DashboardPage     | Initial authenticated financial overview                 |

---

# 🔄 Authentication Flow

1. User submits CPF and password
2. Frontend sends request to backend
3. Backend validates credentials
4. JWT token is returned
5. Token is stored locally
6. AuthContext hydrates authentication state
7. Protected routes become accessible
8. Axios automatically attaches Authorization header
9. Invalid sessions automatically logout the user
10. User is redirected to login when authentication is no longer valid

---

# 🌐 API Integration

The frontend communicates directly with the Spendly backend API.

---

# Authentication

## Login

```http
POST /auth/login
```

### Request

```json
{
  "cpf": "12345678901",
  "password": "123456"
}
```

### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer"
}
```

---

## Register Customer

```http
POST /customers
```

### Request

```json
{
  "name": "Paulo Emilio",
  "cpf": "12345678901",
  "password": "123456",
  "email": "paulo@email.com"
}
```

---

## Current Authenticated User

```http
GET /customers/me
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 💼 Wallet Endpoints

## List Wallets

```http
GET /wallets
```

---

## Create Wallet

```http
POST /wallets
```

### Request

```json
{
  "name": "Santander",
  "walletType": "BANK_ACCOUNT",
  "initialBalance": 500
}
```

---

## Update Wallet

```http
PATCH /wallets/{id}
```

---

## Deactivate Wallet

```http
DELETE /wallets/{id}
```

---

# 💸 Transaction Endpoints

## Create Transaction

```http
POST /transactions
```

### Request

```json
{
  "walletId": 1,
  "type": "EXPENSE",
  "category": "FOOD",
  "amount": 100,
  "description": "Market"
}
```

---

## List Transactions

```http
GET /transactions
```

---

## Get Transaction By ID

```http
GET /transactions/{id}
```

---

# 📊 Dashboard Endpoints

## Get Authenticated Financial Summary

```http
GET /dashboard/summary
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Response

```json
{
  "totalBalance": 6300.00,
  "totalIncome": 6600.00,
  "totalExpense": 100.00,
  "walletCount": 2,
  "transactionCount": 3,
  "recentTransactions": [
    {
      "id": 3,
      "description": "Market",
      "amount": 100.00,
      "type": "EXPENSE",
      "category": "FOOD",
      "walletName": "Main Wallet",
      "createdAt": "2026-05-25T20:29:00.910114"
    }
  ]
}
```

---

# 🧠 Frontend Concepts Applied

* Context API state management
* Protected route architecture
* Separation of concerns
* Typed API communication
* Form validation
* Authentication persistence
* Reusable service layer
* React hooks architecture
* Feature-based organization
* Dynamic UI rendering
* Loading and async state management
* Callback-driven synchronization
* Friendly error handling
* Session invalidation handling
* Centralized theme management
* CSS variables for design tokens
* Responsive UI composition
* Light/Dark mode support

---

# 📦 Running Locally

## Clone repository

```bash
git clone https://github.com/paulojrtoledo/spendly-frontend.git
```

## Navigate to project folder

```bash
cd spendly-frontend
```

## Install dependencies

```bash
npm install
```

## Run development server

```bash
npm run dev
```

The frontend usually runs at:

```txt
http://localhost:5173
```

---

# ⚙️ Backend Requirement

To use the application properly, the Spendly backend must also be running.

Backend repository:

```txt
https://github.com/paulojrtoledo/spendly-backend
```

Expected backend local URL:

```txt
http://localhost:8080
```

---

# 🧪 Testing Status

The project currently builds successfully with TypeScript.

Current validation:

* `npm run build` passing
* Authentication manually validated
* Dashboard integration manually validated
* Wallet and transaction flows manually validated
* Light/Dark theme manually validated

Planned improvements:

* Unit tests for components
* Integration tests for authentication flows
* Tests for protected routes
* Tests for wallet and transaction forms
* Tests for dashboard rendering
* Accessibility improvements
* CI pipeline for build and tests

---

# 🗺️ Roadmap

Planned next steps include:

* Transaction cancellation UI
* Transaction editing UI
* Filters and pagination for transactions
* More complete dashboard analytics
* Better empty-state onboarding
* Accessibility refinements
* Automated testing setup
* CI validation
* Improved mobile experience
* Possible future chart visualizations

---

# 🔗 Related Repositories

* [Spendly Backend](https://github.com/paulojrtoledo/spendly-backend)

---

# 👤 Author

**Paulo Emilio**
Frontend / Full-Stack Developer in progress

* GitHub: [paulojrtoledo](https://github.com/paulojrtoledo)
* LinkedIn: [Paulo Emilio](https://www.linkedin.com/)
