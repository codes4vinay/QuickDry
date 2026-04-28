import { useEffect, useState } from "react";
import api from "../../services/api";
import EmptyState from "../../components/EmptyState";
import { currency, date } from "../../utils/format";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => { api.get("/customers").then(({ data }) => setCustomers(data)); }, []);

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-black">Customers</h1><p className="mt-2 text-slate-500 dark:text-slate-300">Customer lifetime order and spend overview.</p></div>
      {!customers.length ? <EmptyState title="No customers yet" /> : (
        <div className="glass overflow-hidden">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/5"><tr><th className="p-5">Name</th><th>Email</th><th>Phone</th><th>Total Orders</th><th>Total Spent</th><th>Joined</th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {customers.map((customer) => (
                <tr key={customer._id}><td className="p-5 font-black">{customer.name}</td><td>{customer.email}</td><td>{customer.phone}</td><td>{customer.totalOrders}</td><td className="font-black">{currency(customer.totalSpent)}</td><td>{date(customer.createdAt)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
