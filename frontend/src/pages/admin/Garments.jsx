import { useState, useEffect } from "react";
import api from "../../services/api";
import { FiPlus, FiEdit2, FiTrash2, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Pricing() {
  const [garments, setGarments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    basePrice: "",
    description: "",
  });

  useEffect(() => {
    fetchGarments();
  }, []);

  const fetchGarments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/garments/admin/all");
      setGarments(data);
    } catch (error) {
      toast.error("Failed to load garments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/garments/admin/${editingId}`, formData);
        toast.success("Garment updated");
      } else {
        await api.post("/garments/admin/create", formData);
        toast.success("Garment added");
      }
      setFormData({ name: "", category: "", basePrice: "", description: "" });
      setEditingId(null);
      fetchGarments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save garment");
    }
  };

  const handleEdit = (garment) => {
    setEditingId(garment._id);
    setFormData({
      name: garment.name,
      category: garment.category,
      basePrice: garment.basePrice,
      description: garment.description,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this garment?")) return;
    try {
      await api.delete(`/garments/admin/${id}`);
      toast.success("Garment deleted");
      fetchGarments();
    } catch (error) {
      toast.error("Failed to delete garment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Garments</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Add and manage garment types for your store
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Garment" : "Add New Garment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Garment Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Shirt"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g., Casual"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Base Price (₹)
              </label>
              <input
                type="number"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({ ...formData, basePrice: e.target.value })
                }
                placeholder="0"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Optional details"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Garment" : "Add Garment"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: "",
                    category: "",
                    basePrice: "",
                    description: "",
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Garments List */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {garments.map((garment) => (
                <tr
                  key={garment._id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <td className="px-6 py-4">{garment.name}</td>
                  <td className="px-6 py-4">{garment.category}</td>
                  <td className="px-6 py-4">₹{garment.basePrice}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        garment.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {garment.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(garment)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(garment._id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded transition"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {garments.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No garments added yet. Add your first garment above.
          </div>
        )}
      </div>
    </div>
  );
}
