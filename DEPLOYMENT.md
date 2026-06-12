# Frontend Deployment

Spendly is under active development. The published deployment is an MVP
technical demo for portfolio purposes, not a production-ready financial
product.

## Recommended Platforms

Deploy the frontend using a static hosting platform with Vite support, such as:

- Vercel
- Netlify

## Prerequisites

Before deploying the frontend, confirm that:

- [ ] The backend is published and its main flows have been tested.
- [ ] The public backend URL is available over HTTPS.
- [ ] Backend CORS allows requests from the public frontend URL.
- [ ] `VITE_API_URL` is configured in the frontend hosting provider.

## Required Environment Variable

Configure the following variable in the production environment:

```env
VITE_API_URL=https://url-publica-do-backend
```

Use the public backend base URL without adding credentials or other sensitive
values. After changing this variable, trigger a new frontend build because Vite
injects environment variables at build time.

## Deployment Checklist

- [ ] Connect the frontend repository to Vercel or Netlify.
- [ ] Select the project root containing `package.json`.
- [ ] Use `npm run build` as the build command.
- [ ] Use `dist` as the output directory.
- [ ] Add `VITE_API_URL` to the production environment variables.
- [ ] Deploy the frontend.
- [ ] Add the deployed frontend URL to the backend CORS configuration.
- [ ] Redeploy or restart the backend if its CORS configuration changed.

## Demo User

Create a dedicated user in the published environment for recruiters and
visitors. The account must use entirely fictitious data:

- Do not use a real CPF or other personal information.
- Use a fictional CPF accepted by the application's validation rules.
- Use a demonstration-only email and password.
- Do not reuse credentials from personal or production accounts.
- Add a small set of sample wallets and transactions when useful for presenting
  the dashboard.

The demo credentials may be documented in the project README or portfolio page
if public access is intentional. Never commit credentials that grant access to
real data, infrastructure, provider dashboards, or privileged accounts.

## Post-Deployment Test

- [ ] Open the published frontend URL.
- [ ] Log in with the demo user.
- [ ] Confirm that the dashboard loads without API or CORS errors.
- [ ] Switch between Light and Dark themes.
- [ ] Open the Wallets page.
- [ ] Open the Transactions page.
- [ ] Create a wallet.
- [ ] Create a transaction.
- [ ] Return to the dashboard and confirm that its data was updated.

If a request fails, verify the browser network response, the configured
`VITE_API_URL`, and the backend CORS allowlist before publishing the demo link.
