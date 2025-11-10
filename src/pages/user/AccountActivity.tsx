import Navbar from "../../components/Navbar";
import DashboardHeader from "../../components/Header";
import UserSidebar from "../../components/UserSidebar";

export default function AccountActivity() {
  const activities = [
    { id: 1, user: "Fendy", action: "Logged in", date: "2025-11-10 10:24 AM" },
    { id: 2, user: "Fendy", action: "Updated profile", date: "2025-11-09 09:10 AM" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-6">
      <Navbar />
      <DashboardHeader />

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <UserSidebar />

        <section className="flex-1 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Account Activity
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Action</th>
                  <th className="text-left p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((log) => (
                  <tr key={log.id} className="border-t border-gray-200">
                    <td className="p-3">{log.id}</td>
                    <td className="p-3">{log.user}</td>
                    <td className="p-3">{log.action}</td>
                    <td className="p-3">{log.date}</td>
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
