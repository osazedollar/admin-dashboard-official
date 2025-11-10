import { useState } from "react";
import Navbar from "../../components/Navbar";
import DashboardHeader from "../../components/Header";
import ProviderSidebar from "../../components/ContentSidebar";
import { Search, Trash2 } from "lucide-react";

interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  region: string;
  action: boolean;
}

export default function ProductActivities() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [products, setProducts] = useState<Product[]>([
    {
      id: "#001",
      image: "https://via.placeholder.com/50",
      name: "Speedaf Shoes",
      description: "Comfortable running shoes",
      price: "$120",
      stock: "25",
      region: "Europe",
      action: true,
    },
    {
      id: "#002",
      image: "https://via.placeholder.com/50",
      name: "Trend Jacket",
      description: "Winter jacket for men",
      price: "$80",
      stock: "15",
      region: "Asia",
      action: true,
    },
    // Add more sample products here
  ]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
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
              Product Activities
            </h2>

            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-64">
              <Search className="text-gray-400 mr-2" size={16} />
              <input
                type="text"
                placeholder="Search Product"
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
                  <th className="py-2 px-3">Image</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Price</th>
                  <th className="py-2 px-3">Stock</th>
                  <th className="py-2 px-3">Region</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{product.id}</td>
                    <td className="py-2 px-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>
                    <td className="py-2 px-3">{product.name}</td>
                    <td className="py-2 px-3">{product.description}</td>
                    <td className="py-2 px-3">{product.price}</td>
                    <td className="py-2 px-3">{product.stock}</td>
                    <td className="py-2 px-3">{product.region}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleDelete(product.id)}
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
