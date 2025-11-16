import { useState, useEffect } from "react";
import { sweetsAPI } from "../services/api.js";
import SweetCard from "../components/SweetCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { Search } from "lucide-react";

export default function Home({ onNavigate }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchParams.name) params.name = searchParams.name;
      if (searchParams.category) params.category = searchParams.category;
      if (searchParams.minPrice) params.minPrice = searchParams.minPrice;
      if (searchParams.maxPrice) params.maxPrice = searchParams.maxPrice;

      const data = await sweetsAPI.search(params);
      setSweets(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id) => {
    try {
      await sweetsAPI.purchase(id);
      alert("Purchase successful!");
      fetchSweets(); // refresh data
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={onNavigate} currentPage="home" />

      <div className="container mx-auto px-4 py-8">
        {/* Search Box */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search size={24} />
            Search Sweets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={searchParams.name}
              onChange={(e) =>
                setSearchParams({ ...searchParams, name: e.target.value })
              }
              className="px-4 py-2 border rounded"
            />

            <input
              type="text"
              placeholder="Category"
              value={searchParams.category}
              onChange={(e) =>
                setSearchParams({ ...searchParams, category: e.target.value })
              }
              className="px-4 py-2 border rounded"
            />

            <input
              type="number"
              placeholder="Min Price"
              value={searchParams.minPrice}
              onChange={(e) =>
                setSearchParams({ ...searchParams, minPrice: e.target.value })
              }
              className="px-4 py-2 border rounded"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={searchParams.maxPrice}
              onChange={(e) =>
                setSearchParams({ ...searchParams, maxPrice: e.target.value })
              }
              className="px-4 py-2 border rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Search
            </button>

            <button
              onClick={() => {
                setSearchParams({
                  name: "",
                  category: "",
                  minPrice: "",
                  maxPrice: "",
                });
                fetchSweets();
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Sweet List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Available Sweets ({sweets.length})
            </h2>

            {sweets.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No sweets found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sweets.map((sweet) => (
                  <SweetCard
                    key={sweet._id}
                    sweet={sweet}
                    onPurchase={handlePurchase}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
