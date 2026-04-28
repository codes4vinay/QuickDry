import { useEffect, useState } from "react";
import api from "../../services/api";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";

const steps = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

export default function TrackOrder() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get("/orders").then(({ data }) => {
      setOrders(data);
      setSelected(data[0] || null);
    });
  }, []);

  if (!orders.length) return <EmptyState title="No order to track" text="Create an order first and the progress tracker will appear here." />;

  const activeIndex = selected?.status === "CANCELLED" ? -1 : steps.indexOf(selected?.status);

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-black">Track Order</h1><p className="mt-2 text-slate-500 dark:text-slate-300">Follow progress from received to delivered.</p></div>
      <div className="glass grid gap-4 p-5 md:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {orders.map((order) => (
            <button className={`w-full rounded-3xl border p-4 text-left ${selected?._id === order._id ? "border-cyan-400 bg-cyan-50 dark:bg-cyan-400/10" : "border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/5"}`} onClick={() => setSelected(order)} key={order._id}>
              <p className="font-black">{order.orderId}</p>
              <p className="text-sm text-slate-500">{order.garments.length} item types</p>
            </button>
          ))}
        </div>
        <div className="rounded-[1.5rem] bg-slate-50 p-6 dark:bg-white/5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black">{selected.orderId}</h2>
            <StatusBadge status={selected.status} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div className="relative" key={step}>
                <div className={`grid h-14 w-14 place-items-center rounded-full text-lg font-black ${index <= activeIndex ? "bg-slate-950 text-white dark:bg-cyan-400 dark:text-slate-950" : "bg-slate-200 text-slate-500 dark:bg-white/10"}`}>{index + 1}</div>
                <p className="mt-3 font-black">{step}</p>
                {index < steps.length - 1 && <div className={`absolute left-16 top-7 hidden h-1 w-[calc(100%-3rem)] md:block ${index < activeIndex ? "bg-cyan-400" : "bg-slate-200 dark:bg-white/10"}`} />}
              </div>
            ))}
          </div>
          {selected.status === "CANCELLED" && <p className="mt-8 rounded-2xl bg-rose-100 p-4 font-bold text-rose-700">This order has been cancelled.</p>}
        </div>
      </div>
    </div>
  );
}
