import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import OrderTable from "../../components/OrderTable";
import EmptyState from "../../components/EmptyState";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [editing, setEditing] = useState(null);

  async function load() {
    const { data } = await api.get("/orders", { params: filters });
    setOrders(data);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await api.patch(`/orders/${id}/status`, { status });
    toast.success("Status updated");
    load();
  }

  async function deleteOrder(order) {
    if (!confirm(`Delete ${order.orderId}?`)) return;
    await api.delete(`/orders/${order._id}`);
    toast.success("Order deleted");
    load();
  }

  async function saveEdit(event) {
    event.preventDefault();
    await api.put(`/orders/${editing._id}`, editing);
    toast.success("Order updated");
    setEditing(null);
    load();
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-black">Manage Orders</h1><p className="mt-2 text-slate-500 dark:text-slate-300">View, edit, update status, and delete orders.</p></div>
      <div className="glass grid gap-3 p-4 md:grid-cols-[1fr_220px_auto]">
        <input placeholder="Search order, customer, phone, item..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All statuses</option>
          {["RECEIVED", "PROCESSING", "READY", "DELIVERED", "CANCELLED"].map((status) => <option key={status}>{status}</option>)}
        </select>
        <button className="btn-primary" onClick={load}>Apply</button>
      </div>
      {orders.length ? <OrderTable orders={orders} admin onEdit={setEditing} onDelete={deleteOrder} onStatus={updateStatus} /> : <EmptyState title="No orders found" />}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur">
          <form className="glass grid w-full max-w-2xl gap-4 p-6" onSubmit={saveEdit}>
            <h2 className="text-2xl font-black">Edit {editing.orderId}</h2>
            <input value={editing.customerName} onChange={(e) => setEditing({ ...editing, customerName: e.target.value })} />
            <input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
            <textarea rows="3" value={editing.address} onChange={(e) => setEditing({ ...editing, address: e.target.value })} />
            <div className="flex justify-end gap-3">
              <button className="btn-secondary" type="button" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
