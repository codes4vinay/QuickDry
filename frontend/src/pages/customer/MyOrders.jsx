import { useEffect, useState } from "react";
import api from "../../services/api";
import EmptyState from "../../components/EmptyState";
import OrderTable from "../../components/OrderTable";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "" });

  async function load() {
    const { data } = await api.get("/orders", { params: filters });
    setOrders(data);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-black">My Orders</h1><p className="mt-2 text-slate-500 dark:text-slate-300">Search, filter, and review your laundry history.</p></div>
      <div className="glass grid gap-3 p-4 md:grid-cols-[1fr_220px_auto]">
        <input placeholder="Search order, garment, phone..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All statuses</option>
          {["RECEIVED", "PROCESSING", "READY", "DELIVERED", "CANCELLED"].map((status) => <option key={status}>{status}</option>)}
        </select>
        <button className="btn-primary" onClick={load}>Search</button>
      </div>
      {orders.length ? <OrderTable orders={orders} /> : <EmptyState title="No matching orders" text="Try changing the search or create a new order." />}
    </div>
  );
}
