import { useState, useEffect } from "react";
import api from "../../services/api";
import { FiLoader, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";

export default function SelectStore() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [garments, setGarments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/store/all");
      setStores(data);
    } catch (error) {
      toast.error("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStore = async (store) => {
    try {
      setSelectedStore(store);
      const { data } = await api.get(`/garments/store/${store._id}`);
      setGarments(data);
    } catch (error) {
      toast.error("Failed to load garments");
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
        <h1 className="text-3xl font-bold">Select a Store</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Choose a laundry store to view their services
        </p>
      </div>

      {!selectedStore ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <div
              key={store._id}
              onClick={() => handleSelectStore(store)}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition cursor-pointer bg-white dark:bg-slate-900"
            >
              <h3 className="text-xl font-bold mb-3">{store.name}</h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-2">
                  <FiMapPin size={16} />
                  <span>
                    {store.address}, {store.city}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone size={16} />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMail size={16} />
                  <span>{store.email}</span>
                </div>
              </div>
              <button className="btn-primary w-full">View Services</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected Store Info */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedStore.name}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  {selectedStore.address}, {selectedStore.city}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedStore(null);
                  setGarments([]);
                }}
                className="btn-secondary"
              >
                Back to Stores
              </button>
            </div>
          </div>

          {/* Garments */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Available Services</h3>
            {garments.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {garments.map((garment) => (
                  <div
                    key={garment._id}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900"
                  >
                    <h4 className="font-bold text-lg mb-1">{garment.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {garment.category}
                    </p>
                    {garment.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        {garment.description}
                      </p>
                    )}
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{garment.basePrice}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">
                No services available at this store.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
