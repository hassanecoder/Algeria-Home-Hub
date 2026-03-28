# TechMarket Algeria (TechMarket DZ)

## Overview

Full-featured electronics & home appliance e-commerce web application for Algeria. Built with React + Vite frontend, Express.js API backend, and PostgreSQL database.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS v4 (artifacts/techmarket-dz)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (API), Vite (frontend)
- **Routing**: Wouter
- **State**: React Query (TanStack)
- **Forms**: React Hook Form + Zod

## Structure

```text
artifacts/
├── techmarket-dz/     # React + Vite frontend (served at /)
├── api-server/        # Express API server (served at /api)
└── mockup-sandbox/    # Canvas design sandbox
lib/
├── api-spec/          # OpenAPI spec + Orval codegen config
├── api-client-react/  # Generated React Query hooks
├── api-zod/           # Generated Zod schemas
└── db/                # Drizzle ORM schema + DB connection
scripts/               # Utility scripts including database seed
```

## Pages

1. **Home** (`/`) - Hero carousel, category grid, featured products, brands, deals
2. **Products** (`/products`) - Filter sidebar, product grid, search, sort, pagination
3. **Product Detail** (`/products/:id`) - Image gallery, specs, add to cart, reviews
4. **Cart** (`/cart`) - Cart management, delivery calculation
5. **Checkout** (`/checkout`) - Multi-step: shipping (58 wilayas), payment, confirmation
6. **Wishlist** (`/wishlist`) - Saved products
7. **Brands** (`/brands`) - Brand directory
8. **Categories** (`/categories`) - Category browser
9. **Deals** (`/deals`) - Flash deals and promotions
10. **About** (`/about`) - Company info, store locations
11. **Contact** (`/contact`) - Contact form, Algerian store addresses

## Data

- **Categories**: 7 main categories (Smartphones, Laptops, TV/Audio, Gros/Petit Électroménager, Gaming, Accessories)
- **Brands**: 15 brands (Samsung, Apple, Xiaomi, LG, Sony, HP, Lenovo, Huawei, Oppo, Dell, Asus, Hisense, TCL, Condor, Realme)
- **Products**: 26+ products seeded with full specifications in French/Arabic
- **Promotions**: 4 active promotional banners

## Algerian Context

- Prices in DZD (Algerian Dinar)
- Free delivery above 5000 DZD, standard 350 DZD
- 58 Algerian wilayas in checkout
- Payment: Cash on Delivery, CIB, Edahabia
- Bilingual French/Arabic

## Running

- Seed database: `pnpm --filter @workspace/scripts run seed`
- API codegen: `pnpm --filter @workspace/api-spec run codegen`
- Push DB schema: `pnpm --filter @workspace/db run push`
