# Spendly 💰 — Frontend

Spendly is a modern personal finance management platform frontend built with a strong focus on scalability, clean architecture, user experience and real-world frontend engineering practices.

The application simulates the frontend layer of a real financial product, including authentication flows, protected routes, wallet management, financial transactions and integration with a secure Spring Boot backend API.

🚧 **Project Status:** Active Development

---

# 🎯 Project Goal

Spendly aims to simulate the frontend architecture of a real financial platform, emphasizing:

- Modern frontend architecture
- Secure authentication flows
- JWT-based session handling
- Real-world financial workflows
- Responsive and maintainable UI
- Scalable React application structure
- Strong TypeScript typing
- Clean separation of concerns

---

# 🚀 Tech Stack

## Frontend Core

- React 19
- TypeScript
- Vite
- React Router DOM v7

## Styling & UI

- Tailwind CSS v4

## API & State Management

- Axios
- Context API
- React Hooks

---

# 🧱 Current Stage

The frontend currently includes:

- Complete authentication flow
- Public and protected route system
- JWT session persistence
- Automatic logout on invalid session
- Wallet management module
- Financial transactions module
- Real-time wallet balance updates
- Dynamic transaction categories
- Backend integration with Axios
- Friendly error handling
- Responsive UI structure
- Loading, error and empty states

The application continues evolving toward a complete financial management platform integrated with the Spendly backend.

---

# 🧠 Domain Direction

Spendly evolved from a digital banking simulation into a more realistic personal finance management platform.

This transition allowed the project to:

- Represent realistic financial workflows
- Improve portfolio relevance
- Focus on financial organization
- Simulate real product behavior
- Prepare the platform for dashboards and analytics
- Maintain strong technical architecture while improving business direction

---

# ✅ Progress

# Phase 1 — Authentication System (Completed)

## Implemented features

- Login page
- Register page
- CPF and password validation
- JWT authentication flow
- Authentication persistence with localStorage
- Axios API client
- Protected routes
- Public routes
- Automatic Authorization header handling
- Session hydration on refresh
- Automatic logout on invalid token
- Friendly authentication error handling

## Authentication concepts applied

- Context API state management
- Protected route architecture
- Session persistence
- Axios interceptors
- Global authentication state
- Token-based authentication flow

---

# Phase 2 — Wallet Management (Completed)

The wallet module represents the first complete financial workflow implemented in the frontend.

## Features

- Create wallet
- Deactivate wallet
- List authenticated user wallets
- Initial balance support
- Wallet type rendering
- Real-time UI updates
- Friendly validation feedback
- Loading and empty states

## Wallet Types

- Conta bancária
- Dinheiro físico
- Cartão de crédito
- Investimento
- Carteira digital

## Frontend concepts applied

- Component composition
- Service layer abstraction
- Typed API integration
- Controlled forms
- Local state synchronization
- Callback-based updates
- Separation of concerns
- Reusable UI structure

---

# Phase 3 — Financial Transactions (Completed)

The transaction module handles financial operations linked to wallets.

## Features

- Create income transactions
- Create expense transactions
- Dynamic category filtering
- Real-time balance updates
- Friendly financial validation feedback
- Transaction listing
- Protected financial operations
- Loading and error handling
- Automatic session invalidation on 401

## Transaction Types

### Receita

- Salário
- Freelance
- Retorno de investimento
- Presente
- Outra receita

### Despesa

- Alimentação
- Transporte
- Saúde
- Educação
- Lazer
- Compras
- Contas
- Investimento
- Outra despesa

## Financial UX Rules

- Categories dynamically change based on transaction type
- Users cannot select invalid category/type combinations
- Insufficient funds errors are displayed with friendly messages
- Wallet balances update automatically after transactions
- Invalid sessions automatically redirect users to login

---

# 🔐 Authentication Architecture

The authentication system was structured using React Context API and protected routing.

## Implemented Components

| Component | Responsibility |
|---|---|
| AuthContext | Global authentication state |
| ProtectedRoute | Blocks unauthenticated access |
| PublicRoute | Prevents authenticated users from accessing public pages |
| Axios Interceptor | Automatically attaches JWT token |
| DashboardPage | Initial authenticated area |

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

# 🧠 Frontend Concepts Applied

- Context API state management
- Protected route architecture
- Separation of concerns
- Typed API communication
- Form validation
- Authentication persistence
- Reusable service layer
- React hooks architecture
- Feature-based organization
- Dynamic UI rendering
- Loading and async state management
- Callback-driven synchronization
- Friendly error handling
- Session invalidation handling

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

---

# 🔗 Related Repositories

- [Spendly Backend](https://github.com/paulojrtoledo/spendly-backend)

---

# 👤 Author

Paulo Emilio de Toledo Jr.
