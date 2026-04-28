import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import { currency, todayInputPlus } from "../../utils/format";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState([]);
  const { register, control, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: {
      customerName: "",
      phone: "",
      address: "",
      estimatedDelivery: todayInputPlus(3),
      garments: [{ type: "Shirt", quantity: 1, price: 100 }]
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: "garments" });
  const garments = watch("garments");

  useEffect(() => {
    api.get("/pricing").then(({ data }) => setPricing(data));
  }, []);

  const total = useMemo(() => garments.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0), [garments]);

  function handleTypeChange(index, type) {
    const match = pricing.find((item) => item.type === type);
    if (match) setValue(`garments.${index}.price`, match.price);
  }

  async function onSubmit(values) {
    await api.post("/orders", values);
    toast.success("Order created successfully");
    navigate("/customer/orders");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">Create Order</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-300">Choose garments, confirm pickup, and get instant billing.</p>
      </div>
      <form className="glass grid gap-5 p-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label>Customer Name</label><input required {...register("customerName", { required: true })} /></div>
          <div><label>Phone Number</label><input required {...register("phone", { required: true })} /></div>
        </div>
        <div><label>Pickup Address</label><textarea rows="3" required {...register("address", { required: true })} /></div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5 md:grid-cols-[1fr_120px_150px_150px_auto]" key={field.id}>
              <div>
                <label>Garment Type</label>
                <select {...register(`garments.${index}.type`)} onChange={(event) => handleTypeChange(index, event.target.value)}>
                  {(pricing.length ? pricing : [{ type: "Shirt" }, { type: "Pants" }, { type: "Saree" }, { type: "Coat" }, { type: "Blanket" }]).map((item) => <option key={item.type}>{item.type}</option>)}
                </select>
              </div>
              <div><label>Quantity</label><input type="number" min="1" {...register(`garments.${index}.quantity`, { valueAsNumber: true })} /></div>
              <div><label>Price</label><input type="number" min="0" {...register(`garments.${index}.price`, { valueAsNumber: true })} /></div>
              <div><label>Subtotal</label><div className="rounded-2xl bg-slate-100 px-4 py-3 font-black dark:bg-white/10">{currency((garments[index]?.quantity || 0) * (garments[index]?.price || 0))}</div></div>
              <button className="btn-secondary self-end !p-3 text-rose-600" disabled={fields.length === 1} onClick={() => remove(index)} type="button"><FiTrash2 /></button>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <button className="btn-secondary" type="button" onClick={() => append({ type: "Shirt", quantity: 1, price: pricing.find((item) => item.type === "Shirt")?.price || 100 })}><FiPlus /> Add garment</button>
          <div className="rounded-3xl bg-slate-950 px-6 py-4 text-white dark:bg-cyan-400 dark:text-slate-950">
            <p className="text-xs font-bold uppercase opacity-70">Total Bill</p>
            <p className="text-2xl font-black">{currency(total)}</p>
          </div>
        </div>
        <button className="btn-primary" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Order"}</button>
      </form>
    </div>
  );
}
