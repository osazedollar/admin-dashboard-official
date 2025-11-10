import { NavLink } from "react-router-dom";
import { Package, UserPlus, } from "lucide-react";

export default function ProviderSidebar() {
  const links = [
    { name: "All Product", icon: <Package size={18} />, path: "/content" },
    { name: "All Trend", icon: <UserPlus size={18} />, path: "/content/view-trend" },
  ];

  return (
    <aside className="w-56 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <h3 className="text-gray-800 font-semibold text-sm mb-2">
        Content Activity
      </h3>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
