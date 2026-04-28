import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./layouts/DashboardLayout";
import CustomerHome from "./pages/customer/CustomerHome";
import CreateOrder from "./pages/customer/CreateOrder";
import MyOrders from "./pages/customer/MyOrders";
import TrackOrder from "./pages/customer/TrackOrder";
import Bills from "./pages/customer/Bills";
import Profile from "./pages/customer/Profile";
import AdminHome from "./pages/admin/AdminHome";
import ManageOrders from "./pages/admin/ManageOrders";
import Customers from "./pages/admin/Customers";
import Pricing from "./pages/admin/Pricing";
import Reports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/AdminSettings";

function ProtectedRoute({ role, children }) {
  const { user, booting } = useAuth();
  if (booting)
    return (
      <div className="grid min-h-screen place-items-center text-lg font-black">
        Loading QuickDry...
      </div>
    );
  if (!user) return <Navigate to="/auth" replace />;
  if (role && user.role !== role)
    return (
      <Navigate to={user.role === "ADMIN" ? "/admin" : "/customer"} replace />
    );
  return children;
}

function RootRedirect() {
  const { user, booting } = useAuth();
  if (booting)
    return (
      <div className="grid min-h-screen place-items-center text-lg font-black">
        Loading QuickDry...
      </div>
    );
  if (!user) return <HomePage />;
  return (
    <Navigate to={user.role === "ADMIN" ? "/admin" : "/customer"} replace />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/customer"
        element={
          <ProtectedRoute role="CUSTOMER">
            <DashboardLayout type="customer" />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerHome />} />
        <Route path="create-order" element={<CreateOrder />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="track" element={<TrackOrder />} />
        <Route path="bills" element={<Bills />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <DashboardLayout type="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
