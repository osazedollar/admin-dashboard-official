import { NavLink } from "react-router-dom";
import { Package, UserPlus, MessageCircle, MapPin } from "lucide-react";

export default function ProviderSidebar() {
  const links = [
    { name: "All Provider", icon: <Package size={18} />, path: "/providers" },
    { name: "Add Provider", icon: <UserPlus size={18} />, path: "/providers/add" },
    { name: "Message", icon: <MessageCircle size={18} />, path: "/providers/message" },
    { name: "Region", icon: <MapPin size={18} />, path: "/providers/region" },
  ];

  return (
    <aside className="w-56 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <h3 className="text-gray-800 font-semibold text-sm mb-2">
        Provider Activity
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
