import { useState, useRef, useEffect } from "react";
import { Bell, User, Search, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [results] = useState([
    "Leather Jacket",
    "Sneakers",
    "Purple Hoodie",
    "Denim Jeans",
    "Satin Dress",
  ]);

  // For now, we’ll simulate filtered results
  const filtered = results.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setShowAccount(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center bg-white shadow-sm p-4 rounded-xl border-b border-gray-100 backdrop-blur-sm">
      {/* Left: Logo or Title */}
      <h1 className="text-xl font-semibold text-[#9c27b0] whitespace-nowrap">
        Pendeet Dashboard
      </h1>

      {/* Middle: Search Bar */}
      <div className="flex items-center w-full max-w-md mx-6 relative">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c27b0] transition"
        />

        {/* Search Results Card */}
        {query && (
          <div className="absolute top-12 w-full bg-white shadow-lg rounded-lg p-2 border border-gray-100 max-h-60 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Icons */}
      <div className="flex gap-6 items-center relative">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <Bell
            className="text-gray-600 cursor-pointer hover:text-[#9c27b0] transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-lg border border-gray-100 p-3 z-50">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Notifications
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="hover:text-[#9c27b0] cursor-pointer">
                  New user signed up 🎉
                </li>
                <li className="hover:text-[#9c27b0] cursor-pointer">
                  3 new product uploads
                </li>
                <li className="hover:text-[#9c27b0] cursor-pointer">
                  Vendor payout processed
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Account */}
        <div className="relative" ref={accountRef}>
          <User
            className="text-gray-600 cursor-pointer hover:text-[#9c27b0] transition-colors"
            onClick={() => setShowAccount(!showAccount)}
          />
          {showAccount && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-100 p-3 z-50">
              <p className="text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
                Admin Account
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2 hover:text-[#9c27b0] cursor-pointer">
                  <Settings size={16} /> Settings
                </li>
                <li className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer">
                  <LogOut size={16} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
