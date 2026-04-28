import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function Pricing() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get("/pricing").then(({ data }) => setItems(data)); }, []);

  async function save() {
    const { data } = await api.put("/pricing", { items });
    setItems(data);
    toast.success("Pricing updated");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div><h1 className="text-3xl font-black">Pricing Settings</h1><p className="mt-2 text-slate-500 dark:text-slate-300">Update garment prices used during customer order creation.</p></div>
      <div className="glass grid gap-4 p-6">
        {items.map((item, index) => (
          <div className="grid gap-3 md:grid-cols-[1fr_180px]" key={item._id || item.type}>
            <input value={item.type} onChange={(e) => setItems(items.map((row, i) => i === index ? { ...row, type: e.target.value } : row))} />
            <input type="number" min="0" value={item.price} onChange={(e) => setItems(items.map((row, i) => i === index ? { ...row, price: Number(e.target.value) } : row))} />
          </div>
        ))}
        <button className="btn-secondary" onClick={() => setItems([...items, { type: "New Item", price: 0 }])}>Add Price Row</button>
        <button className="btn-primary" onClick={save}>Save Pricing</button>
      </div>
    </div>
  );
}
