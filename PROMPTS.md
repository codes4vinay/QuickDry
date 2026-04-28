# LaundryPro AI Prompts

These are representative prompts used while building LaundryPro. They are written in a natural style because the assignment asks to show practical AI usage, not just final code.

## 1. Product Direction

```text
Turn this laundry assignment into a real SaaS-style MERN product called LaundryPro.
I want two dashboards: one for customers and one for store admins.
Keep the scope realistic for an intern assignment but make it look recruiter-ready.
List the routes, models, screens, and core workflows.
```

## 2. Backend API

```text
Build an Express + MongoDB API for LaundryPro with JWT auth and roles CUSTOMER and ADMIN.
Use Mongoose models for User, Order, and Pricing.
Customers should only see their own orders.
Admins should manage all orders, customers, pricing, and reports.
Calculate order totals on the server, not the client.
```

## 3. Dashboard Analytics

```text
Create dashboard aggregations for a laundry admin dashboard:
total orders, total revenue, orders today, delivered orders, pending orders,
orders by status, monthly revenue, and daily orders.
Also create a customer dashboard with total orders, active orders, delivered orders, and pending bills.
```

## 4. Premium Frontend

```text
Design a Vite React + Tailwind UI that feels like a premium SaaS product.
Use a sidebar layout, top navbar, glass cards, dark mode, status badges,
beautiful tables, loading skeletons, empty states, charts, and smooth Framer Motion animations.
Do not make a landing page; make the app itself the first experience after auth.
```

## 5. Customer Order Flow

```text
Build a customer create-order form with dynamic garment rows.
Garments have default prices: Shirt 100, Pants 150, Saree 250, Coat 300, Blanket 400.
Each row should show quantity and subtotal, with total bill displayed live.
The backend should generate unique order id and estimated delivery date.
```

## 6. Admin Operations

```text
Create admin screens for manage orders, customers, pricing, and reports.
Admins should update order status, edit order information, delete orders,
see customer total spend, update pricing, and export order data as CSV.
```

## 7. README Polish

```text
Write a concise README for a MERN intern assignment that feels professional.
Include setup instructions, feature list, API routes, AI usage report, tradeoffs,
and future improvements. Be honest about what is production-like and what is simplified.
```
