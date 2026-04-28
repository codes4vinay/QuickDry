import { useEffect, useState } from "react";
import api from "../../services/api";
import { exportCsv } from "../../utils/invoice";
import { currency, date } from "../../utils/format";

export default function Reports() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get("/orders").then(({ data }) => setOrders(data)); }, []);
  const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const delivered = orders.filter((order) => order.status === "DELIVERED").length;

  function download() {
    exportCsv("laundrypro-orders.csv", [
      ["Order ID", "Customer", "Phone", "Status", "Total", "Created"],
      ...orders.map((order) => [order.orderId, order.customerName, order.phone, order.status, order.totalAmount, date(order.createdAt)])
    ]);
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-black">Reports</h1><p className="mt-2 text-slate-500 dark:text-slate-300">Export CSV and review revenue summary.</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass p-6"><p className="text-sm font-bold text-slate-500">Revenue Summary</p><h2 className="mt-2 text-3xl font-black">{currency(revenue)}</h2></div>
        <div className="glass p-6"><p className="text-sm font-bold text-slate-500">Delivered Orders</p><h2 className="mt-2 text-3xl font-black">{delivered}</h2></div>
        <div className="glass p-6"><p className="text-sm font-bold text-slate-500">Total Orders</p><h2 className="mt-2 text-3xl font-black">{orders.length}</h2></div>
      </div>
      <button className="btn-primary" onClick={download}>Export CSV</button>
    </div>
  );
}
