import { useAuth } from "../../context/AuthContext";

export default function AdminSettings() {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div><h1 className="text-3xl font-black">Admin Settings</h1><p className="mt-2 text-slate-500 dark:text-slate-300">Store admin account and workspace information.</p></div>
      <div className="glass grid gap-4 p-6">
        <div><label>Name</label><input value={user.name} readOnly /></div>
        <div><label>Email</label><input value={user.email} readOnly /></div>
        <div><label>Phone</label><input value={user.phone} readOnly /></div>
        <div><label>Workspace</label><input value="LaundryPro Dry Cleaning Store" readOnly /></div>
      </div>
    </div>
  );
}
