import Navbar from "../../components/Navbar";
import DashboardHeader from "../../components/Header";
import UserSidebar from "../../components/UserSidebar";
import { MoreHorizontal, Search } from "lucide-react";

export default function Users() {
  const users = [
    {
      id: "#123",
      name: "Fendy",
      email: "@gmail.com",
      dob: "12/03/1998",
      brand: "@fendy",
      phone: "+234",
      country: "Nigeria",
      state: "Lagos",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-6">
      <Navbar />
      <DashboardHeader />

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <UserSidebar />

        <section className="flex-1 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Account</h2>
              <p className="text-sm text-gray-500">All User</p>
            </div>

            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-56">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search User"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="text-left p-3">Id</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">DOB</th>
                  <th className="text-left p-3">Brand name</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Country</th>
                  <th className="text-left p-3">State</th>
                  <th className="text-left p-3">Options</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.dob}</td>
                    <td className="p-3">{user.brand}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.country}</td>
                    <td className="p-3">{user.state}</td>
                    <td className="p-3">
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal size={18} className="text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
