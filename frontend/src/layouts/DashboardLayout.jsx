import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FiBarChart2, FiBox, FiClock, FiDollarSign, FiHome, FiLogOut, FiMenu, FiMoon, FiPackage, FiSettings, FiSun, FiTruck, FiUsers, FiX } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const customerLinks = [
  { to: "/customer", label: "Home", icon: FiHome },
  { to: "/customer/create-order", label: "New Pickup", icon: FiPackage },
  { to: "/customer/orders", label: "My Orders", icon: FiBarChart2 },
  { to: "/customer/track", label: "Track Order", icon: FiTruck },
  { to: "/customer/bills", label: "Bills", icon: FiDollarSign },
  { to: "/customer/profile", label: "Profile", icon: FiSettings }
];

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: FiHome },
  { to: "/admin/orders", label: "Work Queue", icon: FiBox },
  { to: "/admin/customers", label: "Customers", icon: FiUsers },
  { to: "/admin/pricing", label: "Pricing", icon: FiDollarSign },
  { to: "/admin/reports", label: "Reports", icon: FiBarChart2 },
  { to: "/admin/settings", label: "Settings", icon: FiSettings }
];

export default function DashboardLayout({ type }) {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const links = type === "admin" ? adminLinks : customerLinks;
  const isAdmin = type === "admin";

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,rgba(14,165,233,.10),transparent_34%),linear-gradient(225deg,rgba(16,185,129,.10),transparent_30%)]">
      {open && <button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/70 bg-white/90 p-5 backdrop-blur-2xl transition dark:border-white/10 dark:bg-slate-950/90 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-950/15 dark:bg-sky-300 dark:text-slate-950">QD</div>
          <div>
            <h1 className="text-xl font-black">QuickDry</h1>
            <p className="text-xs font-bold text-slate-500">{isAdmin ? "Laundry operations" : "Customer portal"}</p>
          </div>
          <button className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(false)} title="Close menu">
            <FiX />
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-4 dark:border-sky-300/10 dark:bg-sky-300/10">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-sky-600 shadow-sm dark:bg-slate-950 dark:text-sky-300">
              <FiClock />
            </div>
            <div>
              <p className="text-sm font-black">{isAdmin ? "Today's plant" : "Next laundry run"}</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-300">{isAdmin ? "Pickup, wash, press, dispatch" : "Pickup slots open till 8 PM"}</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                className={({ isActive }) => `nav-link ${isActive || location.pathname === link.to ? "nav-link-active" : ""}`}
                end
                key={link.to}
                onClick={() => setOpen(false)}
                to={link.to}
              >
                <Icon />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <button className="nav-link absolute bottom-5 left-5 right-5" onClick={logout}>
          <FiLogOut />
          Logout
        </button>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/70 bg-white/75 px-4 py-4 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 sm:px-8">
          <div className="flex items-center gap-3">
            <button className="btn-secondary !p-3 lg:hidden" onClick={() => setOpen(true)}>
              <FiMenu />
            </button>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 dark:text-sky-300">QuickDry laundry system</p>
              <h2 className="text-xl font-black sm:text-2xl">{isAdmin ? "Store Command Center" : "My Laundry Workspace"}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary !p-3" onClick={toggleTheme} title="Toggle theme">
              {dark ? <FiSun /> : <FiMoon />}
            </button>
            <div className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-right dark:border-white/10 dark:bg-white/10 sm:block">
              <p className="text-sm font-black">{user?.name}</p>
              <p className="text-xs font-bold text-slate-500">{user?.role}</p>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
