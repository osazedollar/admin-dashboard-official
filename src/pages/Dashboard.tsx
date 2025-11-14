import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, Activity, Upload, DollarSign } from "lucide-react";

import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/Header";
import Modal from "../helpers/Modal";

import { fetchDashboardStats, type DashboardData } from "./dashboardThunks";
import type { RootState, AppDispatch } from "../store";

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const handleCardClick = (title: string) => setSelectedCard(title);
  const closeModal = () => setSelectedCard(null);

  // Custom hook for cycling items
  function useCycleItems<T>(items: T[], chunkSize: number, intervalMs: number) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (!items || items.length <= chunkSize) return;

      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + chunkSize) % items.length);
      }, intervalMs);

      return () => clearInterval(timer);
    }, [items, chunkSize, intervalMs]);

    return items.slice(currentIndex, currentIndex + chunkSize);
  }

  const recentSignups = useCycleItems(data?.recentActivity.recentSignups || [], 2, 10000);
  const recentSignins = useCycleItems(data?.recentActivity.recentSignins || [], 2, 10000);
  // Get current month and year
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" }); // e.g., "November"
  const year = now.getFullYear(); // e.g., 2025

  const renderModalContent = () => {
    switch (selectedCard) {
      case "Revenue":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Revenue Overview</h2>
            <p className="text-sm text-gray-600">
              Your total platform revenue has reached ₦73,000,243.00 this month.
              Great performance! Keep tracking your growth trends to maximize profits.
            </p>
          </div>
        );
      case "Generated Content":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Generated Content</h2>
            <p className="text-sm text-gray-600">
              Total value of user-generated content stands at ₦803,000,243.00.
              This shows increasing community participation and engagement.
            </p>
          </div>
        );
      case "Product Uploads":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Product Uploads</h2>
            <p className="text-sm text-gray-600">
              Vendors have uploaded over 900,860 new products. The ecosystem is expanding fast — keep it up!
            </p>
          </div>
        );
      case "Total Users (All Time)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-sm text-gray-600">
              You currently have {data?.summary.totalUsers.toLocaleString() ?? "-"} total registered users.
            </p>
          </div>
        );
      case "Active Users (Nov 2025)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Active Users</h2>
            <p className="text-sm text-gray-600">
              {data?.summary.activeUsers.toLocaleString() ?? "-"} users actively engaged this month.
            </p>
          </div>
        );
      case "Sign-ups (Nov 2025)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Monthly Sign-ups</h2>
            <p className="text-sm text-gray-600">
              {data?.summary.signupUsers.toLocaleString() ?? "-"} new users signed up this month.
            </p>
          </div>
        );
      case "Sign-ins (Nov 2025)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Monthly Sign-ins</h2>
            <p className="text-sm text-gray-600">
              {data?.summary.signinUsers.toLocaleString() ?? "-"} users signed in this month.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-6">
      <Navbar />
      <DashboardHeader />

      {/* Top Stat Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <StatCard title="Revenue" value="₦73,000,243.00" icon={<DollarSign />} onClick={() => handleCardClick("Revenue")} />
        <StatCard title="Generated Content" value="₦803,000,243.00" icon={<Activity />} onClick={() => handleCardClick("Generated Content")} />
        <StatCard title="Product Uploads" value="₦900,860,243.00" icon={<Upload />} onClick={() => handleCardClick("Product Uploads")} />
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <StatCard
          title="Total Users (All Time)"
          value={data?.summary.totalUsers?.toLocaleString() ?? "-"}
          icon={<Users />}
          onClick={() => handleCardClick("Total Users (All Time)")}
        />
        <StatCard
          title={`Active Users (${monthName} ${year})`}
          value={data?.summary.activeUsers?.toLocaleString() ?? "-"}
          icon={<Activity />}
          onClick={() => handleCardClick(`Active Users (${monthName} ${year})`)}
        />
        <StatCard
          title={`Sign-ups (${monthName} ${year})`}
          value={data?.summary.signupUsers?.toLocaleString() ?? "-"}
          icon={<Users />}
          onClick={() => handleCardClick(`Sign-ups (${monthName} ${year})`)}
        />
        <StatCard
          title={`Sign-ins (${monthName} ${year})`}
          value={data?.summary.signinUsers?.toLocaleString() ?? "-"}
          icon={<Users />}
          onClick={() => handleCardClick(`Sign-ins (${monthName} ${year})`)}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Recent Sign-ups */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Sign-ups</h3>
          <div className="space-y-4">
            {recentSignups.length > 0 ? recentSignups.map((user, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9c27b0] text-white font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                    {(user.name ?? "").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name ?? "Unknown"}</p>
                    <p className="text-sm text-gray-500">{user.email ?? "-"}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{user.activity_date ? new Date(user.activity_date).toLocaleString() : "-"}</p>
              </div>
            )) : (
              <p className="text-sm text-gray-500">No recent sign-ups</p>
            )}
          </div>
        </div>

        {/* Recent Sign-ins */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Sign-ins</h3>
          <div className="space-y-4">
            {recentSignins.length > 0 ? recentSignins.map((user, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9c27b0] text-white font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                    {(user.name ?? "").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name ?? "Unknown"}</p>
                    <p className="text-sm text-gray-500">{user.email ?? "-"}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{user.activity_date ? new Date(user.activity_date).toLocaleString() : "-"}</p>
              </div>
            )) : (
              <p className="text-sm text-gray-500">No recent sign-ins</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCard && <Modal onClose={closeModal} isOpen={false}>{renderModalContent()}</Modal>}
    </div>
  );
}
