import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, Activity, Upload, DollarSign } from "lucide-react";

import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/Header";
import Modal from "../helpers/Modal";

import { fetchDashboardStats, type SummaryStats } from "./dashboardThunks";
import type { RootState, AppDispatch } from "../store";

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const handleCardClick = (title: string) => setSelectedCard(title);
  const closeModal = () => setSelectedCard(null);

  // Cycle hook
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

  const recentSignups = useCycleItems(
    data?.recentActivity?.recentSignups || [],
    2,
    10000
  );

  const recentSignins = useCycleItems(
    data?.recentActivity?.recentSignins || [],
    2,
    10000
  );

  // Date helpers
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  // Extract location
  function extractLocation(details?: string): string {
    if (!details) return "Unknown";
    const parts = details.split("Location:");
    if (parts.length < 2) return "Unknown";
    return parts[1].trim();
  }

  // Modal content
  const renderModalContent = () => {
    switch (selectedCard) {
      case "Revenue":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Revenue Overview</h2>
            <p className="text-sm text-gray-600">
              Your total platform revenue has reached ₦73,000,243.00 this month.
            </p>
          </div>
        );

      case "Generated Content":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Generated Content</h2>
            <p className="text-sm text-gray-600">
              Total value of user-generated content stands at ₦803,000,243.00.
            </p>
          </div>
        );

      case "Product Uploads":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Product Uploads</h2>
            <p className="text-sm text-gray-600">
              Vendors have uploaded over 900,860 new products.
            </p>
          </div>
        );

      case "Total Users (All Time)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-sm text-gray-600">
              {data?.summary?.totalUsers?.toLocaleString() ?? "-"} users.
            </p>
          </div>
        );

      case `Active Users (${monthName} ${year})`:
      case `Sign-ups (${monthName} ${year})`:
      case `Sign-ins (${monthName} ${year})`:
        const keyMap: Record<string, keyof SummaryStats> = {
          totalUsers: "totalUsers",
          signupUsers: "signupUsers",
          signinUsers: "signinUsers",
          activeUsers: "activeUsers",
          totalSessionHours: "totalSessionHours",
          avgSessionMinutes: "avgSessionMinutes",
        };

        const summaryKey = keyMap[selectedCard!];

        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">{selectedCard}</h2>
            <p className="text-sm text-gray-600">
              {data?.summary?.[summaryKey]?.toLocaleString() ?? "-"}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Loader UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-6">
      <Navbar />
      <DashboardHeader />

      {/* ========== TOP CARDS ========== */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <StatCard title="Revenue" value="₦73,000,243.00" icon={<DollarSign />} onClick={() => handleCardClick("Revenue")} />
        <StatCard title="Generated Content" value="₦803,000,243.00" icon={<Activity />} onClick={() => handleCardClick("Generated Content")} />
        <StatCard title="Product Uploads" value="₦900,860,243.00" icon={<Upload />} onClick={() => handleCardClick("Product Uploads")} />
      </div>

      {/* ========== SUMMARY CARDS ========== */}
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <StatCard
          title="Total Users (All Time)"
          value={data?.summary?.totalUsers?.toLocaleString() ?? "-"}
          icon={<Users />}
          onClick={() => handleCardClick("Total Users (All Time)")}
        />
        <StatCard
          title={`Active Users (${monthName} ${year})`}
          value={data?.summary?.activeUsers?.toLocaleString() ?? "-"}
          icon={<Activity />}
          onClick={() => handleCardClick(`Active Users (${monthName} ${year})`)}
        />
        <StatCard
          title={`Sign-ups (${monthName} ${year})`}
          value={data?.summary?.signupUsers?.toLocaleString() ?? "-"}
          icon={<Users />}
          onClick={() => handleCardClick(`Sign-ups (${monthName} ${year})`)}
        />
        <StatCard
          title={`Sign-ins (${monthName} ${year})`}
          value={data?.summary?.signinUsers?.toLocaleString() ?? "-"}
          icon={<Users />}
          onClick={() => handleCardClick(`Sign-ins (${monthName} ${year})`)}
        />
      </div>

      {/* ========== RECENT ACTIVITY ========== */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {/* --- Recent Signups --- */}
        <RecentList title="Recent Sign-ups" users={recentSignups} extractLocation={extractLocation} />

        {/* --- Recent Signins --- */}
        <RecentList title="Recent Sign-ins" users={recentSignins} extractLocation={extractLocation} />
      </div>

      {/* ========== MODAL ========== */}
      {selectedCard && (
        <Modal onClose={closeModal} isOpen={true}>
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
}

/* ------------------ Extracted Component for Cleaner UI ------------------ */
function RecentList({ title, users, extractLocation }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-5">
        {users.length > 0 ? (
          users.map((user: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 p-4 rounded-xl border hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#9c27b0] text-white font-bold text-lg shadow">
                  {(user.name ?? "U").charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {user.name ?? "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">{user.email ?? "-"}</p>
                </div>
              </div>

              <div className="flex flex-col text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {user.activity_date
                    ? new Date(user.activity_date).toLocaleString()
                    : "-"}
                </p>

                <p>
                  <span className="font-semibold">IP:</span>{" "}
                  {user.ip_address ?? "N/A"}
                </p>

                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {extractLocation(user.details)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No data</p>
        )}
      </div>
    </div>
  );
}
