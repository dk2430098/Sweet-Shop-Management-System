import { useAuth } from "../context/AuthContext.jsx";
import { LogOut, Candy, LayoutDashboard } from "lucide-react";

export default function Navbar({ onNavigate, currentPage }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <Candy size={32} />
            Sweet Shop
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <span className="text-sm">Hello, {user?.email}</span>

            {/* Admin Button */}
            {user?.isAdmin && (
              <button
                onClick={() =>
                  onNavigate(currentPage === "admin" ? "home" : "admin")
                }
                className="bg-orange-700 px-4 py-2 rounded hover:bg-orange-800 flex items-center gap-2"
              >
                <LayoutDashboard size={18} />
                {currentPage === "admin" ? "Shop" : "Admin"}
              </button>
            )}

            {/* Logout */}
            <button
              onClick={logout}
              className="bg-orange-700 px-4 py-2 rounded hover:bg-orange-800 flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
