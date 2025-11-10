import Navbar from "../../components/Navbar";
import DashboardHeader from "../../components/Header";
import UserSidebar from "../../components/UserSidebar";

export default function AddUser() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-6">
      <Navbar />
      <DashboardHeader />

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <UserSidebar />

        <section className="flex-1 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Add New User
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
            />
            <input
              type="text"
              placeholder="Brand Name"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
            />
            <input
              type="text"
              placeholder="Phone"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
            />
            <input
              type="text"
              placeholder="Country"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
            />
            <input
              type="text"
              placeholder="State"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-purple-600 text-white font-medium rounded-lg py-2 hover:bg-purple-700 transition"
            >
              Save User
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
