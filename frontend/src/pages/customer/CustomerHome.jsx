import { FiBox, FiCheckCircle, FiClock, FiCreditCard } from "react-icons/fi";
import api from "../../services/api";
import { useApi } from "../../hooks/useApi";
import StatCard from "../../components/StatCard";
import SkeletonGrid from "../../components/Skeleton";
import OrderTable from "../../components/OrderTable";
import EmptyState from "../../components/EmptyState";
import { currency } from "../../utils/format";

export default function CustomerHome() {
  const { data, loading } = useApi(async () => (await api.get("/dashboard/customer")).data, []);
  if (loading) return <SkeletonGrid />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Dashboard Home</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-300">Your laundry activity, delivery progress, and pending bills.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FiBox} label="Total Orders" value={data.totalOrders} />
        <StatCard icon={FiClock} label="Active Orders" value={data.activeOrders} tone="amber" />
        <StatCard icon={FiCheckCircle} label="Delivered Orders" value={data.deliveredOrders} tone="emerald" />
        <StatCard icon={FiCreditCard} label="Pending Bills" value={currency(data.pendingBills)} tone="violet" />
      </div>
      {data.recentOrders?.length ? <OrderTable orders={data.recentOrders} /> : <EmptyState title="No orders yet" text="Create your first pickup order and it will show here." />}
    </div>
  );
}
