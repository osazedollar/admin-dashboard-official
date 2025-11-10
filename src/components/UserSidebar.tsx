import { useNavigate, useLocation } from "react-router-dom";

export default function UserSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = [
    { name: "All User", path: "/users" },
    { name: "Add User", path: "/users/add" },
    { name: "Account Activity", path: "/users/activity" },
  ];

  return (
    <aside className="w-full md:w-1/5 bg-white rounded-2xl shadow-sm p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        User Activity
      </h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => navigate(link.path)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              pathname === link.path
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {link.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
