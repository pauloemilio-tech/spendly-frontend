# Spendly 💰 — Frontend

Spendly is a personal finance management platform under active development, built with a focus on scalability, clean architecture and real-world application structure.

The frontend was designed to simulate the experience of a modern financial platform, emphasizing authentication flows, protected routes, API integration and maintainable frontend architecture.

🚧 Project Status: Active Development

---

## 🎯 Project Goal

The goal of Spendly is to build a realistic full stack financial application focused on:

* Modern frontend architecture
* Secure authentication flows
* Backend integration with JWT
* Scalable React application structure
* Real-world user experience
* Clean and maintainable code practices

---

## 🚀 Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS v4
* React Router DOM v7
* Axios
* Context API

---

## 🧠 Domain Direction

Spendly was originally created as a digital banking simulation project and later evolved into a personal finance management platform.

This transition allowed the project to:

* Represent a more realistic product scenario
* Improve portfolio relevance
* Focus on financial organization workflows
* Enable future features such as dashboards, expense tracking and financial insights
* Maintain strong technical architecture while improving product direction

---

## 🧱 Current Stage

The frontend currently includes:

* Complete authentication flow
* Protected and public route system
* Authentication persistence
* Backend integration with JWT
* Context-based authentication architecture
* User session handling
* Dashboard structure
* Wallet management module
* API communication layer with Axios
* Form validation and error handling
* Loading, error and empty UI states

The application continues evolving toward a complete personal finance platform integrated with the Spendly backend.

---

# ✅ Progress

## Phase 1 — Authentication System (Completed)

### Implemented features

* Project structure setup
* Login page
* Register page
* CPF and password validation
* Axios API client
* JWT authentication flow
* Authentication persistence with localStorage
* Axios interceptor for protected requests
* Backend integration with Spring Boot API
* Error handling and validation feedback
* Auth context architecture
* Route protection system
* Dashboard initialization flow

---

## Phase 2 — Wallet Management (Completed)

### Implemented features

* Wallet listing
* Wallet creation flow
* Wallet service layer
* Wallet form component
* Wallet list component
* Protected wallet route
* Real-time wallet list updates
* Typed wallet models
* API integration with backend wallet endpoints
* Loading, error and empty states
* Tailwind-based responsive UI structure

### Frontend concepts applied

* Component composition
* Service layer abstraction
* Typed API integration
* Local state management
* Controlled forms
* Callback-based state synchronization
* Separation of concerns
* Reusable UI structure

---

## 🔐 Authentication Architecture

The authentication system was structured using React Context API and protected routing.

### Implemented components

| Component         | Responsibility                                           |
| ----------------- | -------------------------------------------------------- |
| AuthContext       | Global authentication state                              |
| ProtectedRoute    | Blocks unauthenticated access                            |
| PublicRoute       | Prevents authenticated users from accessing public pages |
| Axios Interceptor | Automatically attaches JWT token                         |
| DashboardPage     | Initial authenticated area                               |

---

## 🔐 Authentication Flow

1. User submits CPF and password
2. Frontend sends request to backend
3. Backend validates credentials
4. JWT token is returned
5. Token is stored locally
6. AuthContext hydrates authentication state
7. Protected routes become accessible
8. Axios automatically attaches Authorization header

---

## 💼 Wallet Management Module

The wallet module represents the first real financial workflow implemented in the frontend.

### Features

* Create wallet
* List authenticated user wallets
* Protected wallet access
* Real-time UI updates after wallet creation
* Loading feedback
* Error feedback
* Empty state handling

### Wallet UI Structure

| Component     | Responsibility                          |
| ------------- | --------------------------------------- |
| WalletsPage   | Orchestrates wallet state and API calls |
| WalletForm    | Handles wallet creation                 |
| WalletList    | Displays wallets and UI states          |
| walletService | Centralizes wallet API communication    |

---

## 🌐 API Integration

The frontend communicates directly with the Spendly backend API.

---

# Authentication

## Login

POST /auth/login

### Request

```json id="y3tnlb"
{
  "cpf": "12345678901",
  "password": "123456"
}
```

### Response

```json id="4aq1ww"
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer"
}
```

---

## Register Customer

POST /customers

### Request

```json id="ulh8vq"
{
  "name": "Paulo Emilio",
  "cpf": "12345678901",
  "password": "123456",
  "email": "paulo@email.com"
}
```

---

## Current Authenticated User

GET /customers/me

### Headers

```http id="h6n96w"
Authorization: Bearer <JWT_TOKEN>
```

---

# Wallets

## List Wallets

GET /wallets

---

## Create Wallet

POST /wallets

### Request

```json id="39y5ha"
{
  "name": "Main Wallet",
  "walletType": "BANK_ACCOUNT"
}
```

---

## 🧠 Frontend Concepts Applied

* Context API state management
* Protected route architecture
* Separation of concerns
* Typed API communication
* Form validation
* Authentication persistence
* Reusable service layer
* React hooks architecture
* Scalable folder organization
* Feature-based component organization
* Loading and async state management
* Callback-driven UI synchronization

---

## 📦 Running Locally

### Clone repository

```bash id="wb4c3q"
git clone https://github.com/paulojrtoledo/spendly-frontend.git
```

### Navigate to project folder

```bash id="12tvqv"
cd spendly-frontend
```

### Install dependencies

```bash id="mjlwm8"
npm install
```

### Run development server

```bash id="79d5fk"
npm run dev
```

---

## 🔗 Related Repository

Backend Repository:

https://github.com/paulojrtoledo/spendly-backend

---

## 👤 Author

Paulo Emilio de Toledo Jr.
