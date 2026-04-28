# QuickDry - Mini Laundry Order Management System

QuickDry is a full MERN stack laundry management SaaS with two dashboards: a customer dashboard for booking and tracking orders, and an admin dashboard for store operations.

## Tech Stack

- Frontend: React + Vite, Tailwind CSS, React Router DOM, Axios, Framer Motion, Recharts, React Hook Form, React Icons, React Hot Toast
- Backend: Node.js, Express, MongoDB/MongoDB Atlas, Mongoose, JWT, bcryptjs, dotenv, cors

## Features

- JWT authentication with `CUSTOMER` and `ADMIN` roles
- Protected routes and role-based dashboard access
- Persisted login through local storage token restore
- Customer dashboard: metrics, create order, my orders, tracker, PDF invoice download, profile
- Admin dashboard: analytics cards, status chart, revenue chart, daily orders chart
- Admin order management: view table, edit basic customer info, update status, delete order
- Customers page with total orders and total spent
- Pricing settings for garment prices
- Reports page with CSV export and revenue summary
- Dark/light mode toggle
- Responsive sidebar SaaS layout
- Loading skeletons, empty states, badges, toast notifications

## Setup

Install dependencies:

```bash
npm run install:all
```

Create environment files:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

Backend `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/laundrypro
JWT_SECRET=replace-with-a-long-random-production-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

Run the project:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

## Demo Notes

- Public registration creates `CUSTOMER` accounts only.
- Use an existing seeded/admin database account to access the admin dashboard.
- Default prices are seeded on first backend start: Shirt Rs. 100, Pants Rs. 150, Saree Rs. 250, Coat Rs. 300, Blanket Rs. 400.

## API Routes

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Orders:
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id`
- `PATCH /api/orders/:id/status`
- `DELETE /api/orders/:id`

Dashboard:
- `GET /api/dashboard/admin`
- `GET /api/dashboard/customer`

Customers:
- `GET /api/customers`

Pricing:
- `GET /api/pricing`
- `PUT /api/pricing`

## AI Usage Report

AI was used to plan the product scope, split customer/admin workflows, generate the MERN folder structure, draft route/controller logic, shape dashboard analytics, and polish README language.

Sample prompts are included in [PROMPTS.md](./PROMPTS.md).

What AI got wrong or needed correction:

- It initially treated the assignment as only a staff counter app. I corrected the product direction to include both customer and admin dashboards.
- AI often trusts frontend totals. I kept totals calculated in the backend Mongoose model.
- AI can overbuild. I kept the project practical: no payment gateway, no upload system, no multi-branch inventory.
- Public admin signup was removed; production admin creation should use an invite or seed script.

## Tradeoffs

- No online payments; invoices are generated locally as PDFs.
- No email/SMS notifications.
- No automated tests yet.
- Admin account creation is not exposed in public registration; use a seed/invite flow for reviewers or production.

## Future Improvements

- Add Supertest and Vitest coverage.
- Add admin invite flow.
- Add payment status and Razorpay/Stripe integration.
- Add email/SMS updates when order status changes.
- Deploy frontend to Vercel and backend to Render/Railway.
