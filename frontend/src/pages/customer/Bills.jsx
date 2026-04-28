import { useEffect, useState } from "react";
import api from "../../services/api";
import OrderTable from "../../components/OrderTable";
import EmptyState from "../../components/EmptyState";
import { downloadInvoice } from "../../utils/invoice";

export default function Bills() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get("/orders").then(({ data }) => setOrders(data)); }, []);
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-black">Bills / Invoices</h1><p className="mt-2 text-slate-500 dark:text-slate-300">Download clean PDF invoices for every order.</p></div>
      {orders.length ? <OrderTable orders={orders} onInvoice={downloadInvoice} /> : <EmptyState title="No invoices yet" text="Invoices are generated after you create an order." />}
    </div>
  );
}
