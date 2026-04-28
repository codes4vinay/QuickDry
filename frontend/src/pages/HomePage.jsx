import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiMail,
  FiMoon,
  FiPackage,
  FiPhone,
  FiRepeat,
  FiShield,
  FiSun,
  FiTruck,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const services = [
  { icon: FiPackage, title: "Pickup Intake", copy: "Capture garments, stains, quantity, and customer notes at the counter." },
  { icon: FiRepeat, title: "Wash Workflow", copy: "Move every order through received, processing, ready, and delivered." },
  { icon: FiTruck, title: "Delivery Tracking", copy: "Give customers a simple view of where their laundry stands." },
  { icon: FiCreditCard, title: "Bills & Invoices", copy: "Create transparent totals and downloadable invoices automatically." },
];

const orderSteps = ["Received", "Sorting", "Washing", "Pressing", "Ready"];

const stats = [
  { label: "Orders Today", value: "128" },
  { label: "Ready Bags", value: "42" },
  { label: "Pending Bills", value: "18" },
];

export default function HomePage() {
  const { user } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const dashboardLink = user ? (user.role === "ADMIN" ? "/admin" : "/customer") : "/auth";

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f8fb] text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
        <div className="section-shell flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/15 dark:bg-sky-300 dark:text-slate-950">
              QD
            </div>
            <div>
              <h1 className="text-lg font-black leading-tight">QuickDry</h1>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Laundry management system</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
            <a className="transition hover:text-slate-950 dark:hover:text-white" href="#workflow">Workflow</a>
            <a className="transition hover:text-slate-950 dark:hover:text-white" href="#services">Services</a>
            <a className="transition hover:text-slate-950 dark:hover:text-white" href="#trust">Trust</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="btn-secondary !p-3" onClick={toggleTheme} title="Toggle theme">
              {dark ? <FiSun /> : <FiMoon />}
            </button>
            <Link to={dashboardLink} className="btn-primary hidden sm:inline-flex">
              {user ? "Open Dashboard" : "Start Now"} <FiArrowRight />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="section-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-14">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-700 shadow-sm dark:border-sky-300/10 dark:bg-sky-300/10 dark:text-sky-200">
              <FiShield /> Built for laundry counters
            </div>
            <h2 className="text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
              QuickDry laundry operations, from pickup to delivery.
            </h2>
            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              A clean workspace for stores and customers: create pickup orders, manage garments, track live statuses, bill faster, and keep the whole laundry floor moving.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={dashboardLink} className="btn-primary">
                {user ? "Go to Workspace" : "Create Laundry Account"} <FiArrowRight />
              </Link>
              <a href="#workflow" className="btn-secondary">
                See Workflow <FiClock />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="absolute -inset-8 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-400/10" />
            <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-slate-900">
              <div className="rounded-xl bg-slate-950 p-4 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">Live plant board</p>
                    <h3 className="mt-2 text-2xl font-black">Washer Lane A</h3>
                  </div>
                  <div className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-black text-slate-950">92% on time</div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div className="rounded-lg bg-white/10 p-3" key={stat.label}>
                      <p className="text-xs font-semibold text-slate-300">{stat.label}</p>
                      <p className="mt-1 text-2xl font-black">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-xl border border-slate-100 bg-sky-50 p-4 dark:border-white/10 dark:bg-sky-300/10">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black">Order QD-2048</h4>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-sky-700 dark:bg-slate-950 dark:text-sky-200">Processing</span>
                  </div>
                  <div className="mt-5 space-y-4">
                    {orderSteps.map((step, index) => (
                      <div className="flex items-center gap-3" key={step}>
                        <div className={`grid h-8 w-8 place-items-center rounded-full text-sm font-black ${index < 3 ? "bg-slate-950 text-white dark:bg-sky-300 dark:text-slate-950" : "bg-white text-slate-400 dark:bg-slate-900"}`}>
                          {index < 3 ? <FiCheck /> : index + 1}
                        </div>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white dark:bg-slate-900">
                          <div className={`h-full rounded-full ${index < 3 ? "w-full bg-sky-500" : "w-1/3 bg-slate-200 dark:bg-white/10"}`} />
                        </div>
                        <p className="w-20 text-right text-xs font-black text-slate-600 dark:text-slate-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Garments</p>
                  {["Shirts x 6", "Trousers x 3", "Blanket x 1"].map((item) => (
                    <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3 text-sm font-bold dark:bg-white/10" key={item}>
                      <span>{item}</span>
                      <FiPackage className="text-sky-600 dark:text-sky-300" />
                    </div>
                  ))}
                  <div className="mt-4 rounded-lg bg-emerald-50 p-3 dark:bg-emerald-400/10">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-300">Invoice total</p>
                    <p className="text-2xl font-black">Rs. 1,240</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="workflow" className="border-y border-white/70 bg-white/75 py-14 dark:border-white/10 dark:bg-slate-900/55">
          <div className="section-shell">
            <div className="grid gap-4 md:grid-cols-5">
              {orderSteps.map((step, index) => (
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950" key={step}>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">Step {index + 1}</p>
                  <h3 className="mt-3 text-lg font-black">{step}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">Clear status visibility for staff and customers.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-shell py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 dark:text-sky-300">Laundry system features</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Designed for daily store work.</h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
              The UI keeps repeat tasks close: order creation, garment counts, status updates, billing, and customer follow-up.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="glass p-5" key={service.title}>
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-300/10 dark:text-sky-200">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-black">{service.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">{service.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="trust" className="section-shell pb-16">
          <div className="grid gap-5 rounded-2xl bg-slate-950 p-6 text-white sm:grid-cols-3">
            {[
              { icon: FiClock, title: "Fast counter flow", copy: "Create orders in minutes." },
              { icon: FiBarChart2, title: "Store analytics", copy: "Watch revenue and demand." },
              { icon: FiShield, title: "Role dashboards", copy: "Separate customer and admin views." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div className="flex gap-4" key={item.title}>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/10 text-sky-300">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-slate-300">{item.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/70 bg-white/80 py-10 dark:border-white/10 dark:bg-slate-950/85">
        <div className="section-shell">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/15 dark:bg-sky-300 dark:text-slate-950">
                  QD
                </div>
                <div>
                  <h2 className="text-lg font-black">QuickDry</h2>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mini Laundry Order Management</p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
                Manage orders, garments, status updates, bills, and dashboard insights for a dry-cleaning store.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Product</h3>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <a className="transition hover:text-sky-600 dark:hover:text-sky-300" href="#workflow">Workflow</a>
                <a className="transition hover:text-sky-600 dark:hover:text-sky-300" href="#services">Services</a>
                <a className="transition hover:text-sky-600 dark:hover:text-sky-300" href="#trust">Dashboard</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Access</h3>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <Link className="transition hover:text-sky-600 dark:hover:text-sky-300" to="/auth">Customer Login</Link>
                <Link className="transition hover:text-sky-600 dark:hover:text-sky-300" to="/auth">Admin Login</Link>
                <Link className="transition hover:text-sky-600 dark:hover:text-sky-300" to={dashboardLink}>Open Workspace</Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Contact</h3>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-2"><FiPhone /> +91 98765 43210</span>
                <span className="flex items-center gap-2"><FiMail /> hello@quickdry.local</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-slate-200 pt-5 text-xs font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row">
            <p>Copyright 2026 QuickDry. All rights reserved.</p>
            <p>Built for the Software Engineering laundry assignment.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
