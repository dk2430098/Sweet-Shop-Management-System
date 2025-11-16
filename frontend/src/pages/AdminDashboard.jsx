import { useState, useEffect } from "react";
import { sweetsAPI } from "../services/api.js";
import SweetCard from "../components/SweetCard.jsx";
import SweetForm from "../components/SweetForm.jsx";
import Navbar from "../components/Navbar.jsx";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function AdminDashboard({ onNavigate }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const data = await sweetsAPI.getAll();
      setSweets(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (sweetData) => {
    try {
      if (editingSweet) {
        await sweetsAPI.update(editingSweet._id, sweetData);
        alert("Sweet updated successfully!");
      } else {
        await sweetsAPI.create(sweetData);
        alert("Sweet added successfully!");
      }
      setShowForm(false);
      setEditingSweet(null);
      fetchSweets();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sweet?")) {
      try {
        await sweetsAPI.delete(id);
        alert("Sweet deleted successfully!");
        fetchSweets();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleRestock = async (id, amount) => {
    try {
      await sweetsAPI.restock(id, amount);
      alert("Restocked successfully!");
      fetchSweets();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={onNavigate} currentPage="admin" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingSweet(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <PlusCircle size={20} />
            Add New Sweet
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <SweetForm
              sweet={editingSweet}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingSweet(null);
              }}
            />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4">
              All Sweets ({sweets.length})
            </h3>

            {sweets.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No sweets available. Add your first sweet!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sweets.map((sweet) => (
                  <div key={sweet._id} className="relative">
                    <SweetCard
                      sweet={sweet}
                      onRestock={handleRestock}
                      isAdmin={true}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(sweet)}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-lg"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(sweet._id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
