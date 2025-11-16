import { useState } from "react";
import { ShoppingCart, Package } from "lucide-react";

export default function SweetCard({ sweet, onPurchase, onRestock, isAdmin }) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (sweet.quantity <= 0) {
      alert("Out of stock");
      return;
    }
    setLoading(true);
    await onPurchase(sweet._id);
    setLoading(false);
  };

  const handleRestock = async () => {
    const restockAmount = prompt("Enter quantity to restock:");
    if (restockAmount && Number(restockAmount) > 0) {
      setLoading(true);
      await onRestock(sweet._id, Number(restockAmount));
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {sweet.imageUrl && (
        <img
          src={sweet.imageUrl}
          alt={sweet.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      <h3 className="text-xl font-semibold mb-2">{sweet.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{sweet.category}</p>

      {sweet.description && (
        <p className="text-gray-500 text-sm mb-3">{sweet.description}</p>
      )}

      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-green-600">
          ₹{sweet.price}
        </span>
        <span
          className={`text-sm ${
            sweet.quantity > 0 ? "text-gray-600" : "text-red-600"
          }`}
        >
          Stock: {sweet.quantity}
        </span>
      </div>

      {/* Purchase Button (one at a time) */}
      {sweet.quantity > 0 && !isAdmin && (
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-400"
        >
          <ShoppingCart size={18} />
          Purchase
        </button>
      )}

      {/* Restock Button */}
      {isAdmin && (
        <button
          onClick={handleRestock}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-green-700 disabled:bg-gray-400"
        >
          <Package size={18} />
          Restock
        </button>
      )}
    </div>
  );
}
