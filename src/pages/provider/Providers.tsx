import { useState } from "react";
import Navbar from "../../components/Navbar";
import DashboardHeader from "../../components/Header";
import ProviderSidebar from "../../components/ProviderSidebar";
import { Search } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  region: string;
  active: boolean;
}

export default function AllProviders() {
  const [search, setSearch] = useState("");
  const [providers] = useState<Provider[]>([
    {
      id: "#123",
      name: "Speedaf",
      email: "saf@gmail.com",
      phone: "+234",
      website: "www.speedaf.com",
      region: "Ugbowo",
      active: true,
    },
  ]);

  const filtered = providers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-6">
      <Navbar />
      <DashboardHeader />

      <div className="flex gap-6">
        {/* Sidebar */}
        <ProviderSidebar />

        {/* Main Content */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-gray-700">
              Shipments Activities
            </h2>

            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-64">
              <Search className="text-gray-400 mr-2" size={16} />
              <input
                type="text"
                placeholder="Search Provider"
                className="bg-transparent outline-none text-sm w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 px-3">Id</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Phone</th>
                  <th className="py-2 px-3">Website</th>
                  <th className="py-2 px-3">Region</th>
                  <th className="py-2 px-3">Active</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((provider) => (
                  <tr key={provider.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{provider.id}</td>
                    <td className="py-2 px-3">{provider.name}</td>
                    <td className="py-2 px-3">{provider.email}</td>
                    <td className="py-2 px-3">{provider.phone}</td>
                    <td className="py-2 px-3">{provider.website}</td>
                    <td className="py-2 px-3">{provider.region}</td>
                    <td className="py-2 px-3">
                      {provider.active ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
