import { FiDownload, FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import { currency, date } from "../utils/format";

export default function OrderTable({ orders, admin = false, onView, onEdit, onDelete, onStatus, onInvoice }) {
  return (
    <div className="glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="border-b border-slate-200/70 bg-slate-50/80 text-xs uppercase text-slate-500 dark:border-white/10 dark:bg-white/5">
            <tr>
              <th className="px-5 py-4">Order ID</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 dark:divide-white/10">
            {orders.map((order) => (
              <tr className="transition hover:bg-slate-50/80 dark:hover:bg-white/5" key={order._id}>
                <td className="px-5 py-4 font-black">{order.orderId}</td>
                <td className="px-5 py-4">
                  <p className="font-bold">{order.customerName}</p>
                  <p className="text-slate-500">{order.phone}</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {order.garments.map((item) => (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-white/10" key={`${order._id}-${item.type}`}>
                        {item.type} x {item.quantity}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 font-black">{currency(order.totalAmount)}</td>
                <td className="px-5 py-4">
                  {admin ? (
                    <select className="min-w-36 py-2" value={order.status} onChange={(event) => onStatus(order._id, event.target.value)}>
                      {["RECEIVED", "PROCESSING", "READY", "DELIVERED", "CANCELLED"].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <StatusBadge status={order.status} />
                  )}
                </td>
                <td className="px-5 py-4 text-slate-500">{date(order.createdAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="btn-secondary !p-3" onClick={() => onView?.(order)} title="View">
                      <FiEye />
                    </button>
                    {onInvoice && (
                      <button className="btn-secondary !p-3" onClick={() => onInvoice(order)} title="Download invoice">
                        <FiDownload />
                      </button>
                    )}
                    {admin && (
                      <>
                        <button className="btn-secondary !p-3" onClick={() => onEdit?.(order)} title="Edit">
                          <FiEdit3 />
                        </button>
                        <button className="btn-secondary !p-3 text-rose-600" onClick={() => onDelete?.(order)} title="Delete">
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
