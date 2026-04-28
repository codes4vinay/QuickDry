import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FiBox, FiCheckCircle, FiClock, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import api from "../../services/api";
import { useApi } from "../../hooks/useApi";
import StatCard from "../../components/StatCard";
import SkeletonGrid from "../../components/Skeleton";
import { currency } from "../../utils/format";

const colors = ["#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#f43f5e"];

export default function AdminHome() {
  const { data, loading } = useApi(async () => (await api.get("/dashboard/admin")).data, []);
  if (loading) return <SkeletonGrid />;

  const statusData = Object.entries(data.ordersByStatus || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-black">Admin Dashboard Home</h1><p className="mt-2 text-slate-500 dark:text-slate-300">Revenue, fulfilment, and demand analytics in one place.</p></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={FiBox} label="Total Orders" value={data.totalOrders} />
        <StatCard icon={FiDollarSign} label="Total Revenue" value={currency(data.totalRevenue)} tone="emerald" />
        <StatCard icon={FiTrendingUp} label="Orders Today" value={data.ordersToday} tone="violet" />
        <StatCard icon={FiCheckCircle} label="Delivered" value={data.deliveredOrders} tone="emerald" />
        <StatCard icon={FiClock} label="Pending" value={data.pendingOrders} tone="amber" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="glass p-5 xl:col-span-1">
          <h2 className="mb-4 text-lg font-black">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={96} label>
                {statusData.map((_, index) => <Cell fill={colors[index % colors.length]} key={index} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass p-5 xl:col-span-2">
          <h2 className="mb-4 text-lg font-black">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#06b6d4" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass p-5">
        <h2 className="mb-4 text-lg font-black">Daily Orders</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data.dailyOrders}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
