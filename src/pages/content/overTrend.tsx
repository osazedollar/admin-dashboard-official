import { useState } from "react";
import Navbar from "../../components/Navbar";
import DashboardHeader from "../../components/Header";
import ProviderSidebar from "../../components/ContentSidebar";
import { Search, Trash2 } from "lucide-react";

interface Provider {
  id: string;
  media: string;
  description: string;
  reach: number;
  engagement: number;
  region: string;
  options: boolean;
}

export default function AllProviders() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "#123",
      media: "https://via.placeholder.com/40",
      description: "Hey, check out! #me #trend",
      reach: 5.7,
      engagement: 10.5,
      region: "Europe",
      options: true,
    },
    {
      id: "#124",
      media: "https://via.placeholder.com/40",
      description: "Another trend!",
      reach: 2.1,
      engagement: 5.2,
      region: "Asia",
      options: true,
    },
    // Add more sample providers here
  ]);

  // Filter providers by search
  const filtered = providers.filter((p) =>
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete handler
  const handleDelete = (id: string) => {
    setProviders((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-6">
      <Navbar />
      <DashboardHeader />

      <div className="flex gap-6">
        <ProviderSidebar />

        <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-gray-700">
              Trend Activities
            </h2>

            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-64">
              <Search className="text-gray-400 mr-2" size={16} />
              <input
                type="text"
                placeholder="Search Trend"
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
                  <th className="py-2 px-3">Media</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Reach</th>
                  <th className="py-2 px-3">Engagement</th>
                  <th className="py-2 px-3">Region</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((provider) => (
                  <tr key={provider.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{provider.id}</td>
                    <td className="py-2 px-3">
                      <img
                        src={provider.media}
                        alt={provider.description}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-2 px-3">{provider.description}</td>
                    <td className="py-2 px-3">{provider.reach}k</td>
                    <td className="py-2 px-3">{provider.engagement}k</td>
                    <td className="py-2 px-3">{provider.region}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleDelete(provider.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded hover:bg-gray-200 ${
                  currentPage === i + 1 ? "bg-gray-300 font-semibold" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
