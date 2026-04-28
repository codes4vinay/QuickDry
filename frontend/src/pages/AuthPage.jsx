import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiArrowRight, FiCheck, FiMoon, FiSun } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const { register: registerUser, login, user } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { role: "CUSTOMER" },
  });

  if (user) return <Navigate to={user.role === "ADMIN" ? "/admin" : "/customer"} replace />;

  async function onSubmit(values) {
    try {
      const nextUser = mode === "login" ? await login(values) : await registerUser(values);
      navigate(nextUser.role === "ADMIN" ? "/admin" : "/customer");
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f8fb] text-slate-900 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-white/70 bg-white/80 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition hover:opacity-80">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/15 dark:bg-sky-300 dark:text-slate-950">
              QD
            </div>
            <div>
              <h1 className="text-lg font-black">QuickDry</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Laundry Management System</p>
            </div>
          </Link>
          <button onClick={toggleTheme} className="btn-secondary !p-3" title="Toggle dark mode">
            {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </header>

      <div className="flex-1 px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_440px]"
        >
          <section className="hidden lg:block">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-600 dark:text-sky-300">Laundry counter access</p>
            <h2 className="mt-4 max-w-2xl text-5xl font-black leading-tight tracking-tight">
              Sign in and keep every bag, bill, and delivery moving.
            </h2>
            <div className="mt-8 grid max-w-xl gap-4">
              {[
                "Create pickup orders with garment-level detail",
                "Track every job from received to delivered",
                "Run separate workspaces for customers and store admins",
              ].map((item) => (
                <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80" key={item}>
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-200">
                    <FiCheck />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="glass p-6 sm:p-8">
              <div className="mb-8 grid grid-cols-2 gap-2 rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                    mode === "login"
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                    mode === "register"
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  Register
                </button>
              </div>

              <h2 className="mb-1 text-2xl font-black">{mode === "login" ? "Welcome back" : "Create account"}</h2>
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                {mode === "login" ? "Sign in to continue your laundry workflow" : "Get started with QuickDry"}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {mode === "register" && (
                  <>
                    <div>
                      <label className="mb-2 block">Name</label>
                      <input {...register("name", { required: "Name is required" })} placeholder="Your full name" />
                      {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block">Phone</label>
                      <input {...register("phone", { required: "Phone is required" })} placeholder="10-digit phone number" />
                      {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>}
                    </div>

                    <input type="hidden" value="CUSTOMER" {...register("role")} />
                  </>
                )}

                <div>
                  <label className="mb-2 block">Email</label>
                  <input {...register("email", { required: "Email is required" })} type="email" placeholder="you@example.com" />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full">
                  {isSubmitting ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
                  {!isSubmitting && <FiArrowRight size={18} />}
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">By continuing, you agree to our terms of service</p>
          </section>
        </motion.div>
      </div>

      <footer className="border-t border-white/70 bg-white/60 px-5 py-4 dark:border-white/10 dark:bg-slate-950/60">
        <div className="mx-auto max-w-6xl text-center text-xs text-slate-600 dark:text-slate-400">
          <p>&copy; 2026 QuickDry. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
