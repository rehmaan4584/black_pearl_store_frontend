# Black Pearl Store

Customer-facing storefront for **Black Pearl** — browse denim and apparel, manage a cart, pay via **Stripe Checkout**, and track orders.

**Live store:** https://rehman-bp-store.duckdns.org

## Architecture

```
Buyer  ──►  Store (this repo)  ──►  Black Pearl API  ──►  Stripe
```

Products, inventory, and orders are managed by sellers through the [admin portal](https://github.com/rehmaan4584/black_pearl_portal_frontend).

## Tech stack

- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS v4** · shadcn/ui · Lucide icons
- **fetch** API client with JWT auth (`localStorage`)
- **Stripe** — hosted checkout via backend (no Stripe SDK in frontend)

## Features

| Area | Details |
|------|---------|
| Home | Hero, shop-by-category, featured products |
| Catalog | `/products` with gender & type filters |
| Product detail | Size/color variant picker, stock check, add to cart |
| Auth | Buyer register & login (`/login`, `/register`) |
| Cart | View, update quantity, remove items |
| Checkout | **Pay with Stripe** → redirect to hosted checkout |
| Post-payment | Success page (`/checkout/success`) · cancel restores inventory (`/checkout/cancel`) |
| Orders | My orders list and order detail with status badges |

**Order statuses:** `PENDING` → `PAID` → `SHIPPED` → `DELIVERED`

## Getting started

### Prerequisites

- Node.js 18+
- [Black Pearl backend](https://github.com/rehmaan4584/black_pearl_backend) running locally

### Setup

```bash
git clone https://github.com/rehmaan4584/black_pearl_store_frontend.git
cd black_pearl_store_frontend
npm install
```

Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3003
```

```bash
npm run dev
```

Open **http://localhost:3000**

> Stripe return URLs in backend `.env` should point to `http://localhost:3000/checkout/success` and `/checkout/cancel` when running locally.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |

## Project structure

```
app/                  # Pages (App Router)
components/           # UI components (Header, ProductInfo, FilterBar, …)
lib/
  api.ts              # Base fetch helpers
  auth-api.ts         # Login / register
  cart-api.ts         # Cart CRUD
  checkout-api.ts     # Stripe session + cancel
  orders-api.ts       # Order history
types/                # TypeScript interfaces
```

## Checkout flow

1. Buyer adds variants to cart (login required)
2. Cart page → **Pay with Stripe**
3. `POST /checkout/session` → redirect to Stripe Hosted Checkout
4. On success → `/checkout/success?orderId=`
5. On cancel → `/checkout/cancel?orderId=` (inventory restored via API)

## Related repos

- [black_pearl_backend](https://github.com/rehmaan4584/black_pearl_backend) — NestJS REST API · [Live](https://rehman-bp-api.duckdns.org/api)
- [black_pearl_portal_frontend](https://github.com/rehmaan4584/black_pearl_portal_frontend) — Seller admin panel · [Live](https://rehman-bp-portal.duckdns.org)

## Author

Abdul Rehman
