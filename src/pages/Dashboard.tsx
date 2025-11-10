import { useState } from "react";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import { Users, Activity, Upload, DollarSign } from "lucide-react";
import DashboardHeader from "../components/Header";
import Modal from "../helpers/Modal";

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (title: string) => {
    setSelectedCard(title);
  };

  const closeModal = () => setSelectedCard(null);

  const renderModalContent = () => {
    switch (selectedCard) {
      case "Revenue":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Revenue Overview</h2>
            <p className="text-sm text-gray-600">
              Your total platform revenue has reached ₦73,000,243.00 this month.
              Great performance! Keep tracking your growth trends to maximize
              profits.
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
              Vendors have uploaded over 900,860 new products. The ecosystem is
              expanding fast — keep it up!
            </p>
          </div>
        );
      case "Total Users (All Time)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-sm text-gray-600">
              You currently have 10,000 total registered users across all time.
              This metric reflects your community’s global reach.
            </p>
          </div>
        );
      case "Active Users (Nov 2025)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Active Users</h2>
            <p className="text-sm text-gray-600">
              7,300 users actively engaged this month — showing strong retention
              and daily activity growth.
            </p>
          </div>
        );
      case "Sign-ups (Nov 2025)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Monthly Sign-ups</h2>
            <p className="text-sm text-gray-600">
              You’ve gained 10,000 new users this month — a clear sign of
              organic growth and market expansion.
            </p>
          </div>
        );
      case "Sign-ins (Nov 2025)":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-2">Monthly Sign-ins</h2>
            <p className="text-sm text-gray-600">
              Over 10,000 users signed in this month, indicating excellent user
              retention and platform loyalty.
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

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <StatCard
          title="Revenue"
          value="₦73,000,243.00"
          icon={<DollarSign />}
          onClick={() => handleCardClick("Revenue")}
        />
        <StatCard
          title="Generated Content"
          value="₦803,000,243.00"
          icon={<Activity />}
          onClick={() => handleCardClick("Generated Content")}
        />
        <StatCard
          title="Product Uploads"
          value="₦900,860,243.00"
          icon={<Upload />}
          onClick={() => handleCardClick("Product Uploads")}
        />
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <StatCard
          title="Total Users (All Time)"
          value="10,000"
          icon={<Users />}
          onClick={() => handleCardClick("Total Users (All Time)")}
        />
        <StatCard
          title="Active Users (Nov 2025)"
          value="7,300"
          icon={<Activity />}
          onClick={() => handleCardClick("Active Users (Nov 2025)")}
        />
        <StatCard
          title="Sign-ups (Nov 2025)"
          value="10,000"
          icon={<Users />}
          onClick={() => handleCardClick("Sign-ups (Nov 2025)")}
        />
        <StatCard
          title="Sign-ins (Nov 2025)"
          value="10,000"
          icon={<Users />}
          onClick={() => handleCardClick("Sign-ins (Nov 2025)")}
        />
      </div>

   <div className="grid md:grid-cols-2 gap-6 mt-8">
  {/* Recent Sign-ups */}
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Recent Sign-ups</h3>
    <div className="space-y-4">
      {[
        { name: "Burak Adesuwa", email: "burakade2700@gmail.com", date: "Wed Nov 25, 00:08" },
        { name: "Favour John", email: "favourjohn@gmail.com", date: "Wed Nov 25, 00:15" },
      ].map((user, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Profile Circle with First Letter */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9c27b0] text-white font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">{user.date}</p>
        </div>
      ))}
    </div>
  </div>

    {/* Recent Sign-ins */}
    <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Sign-ins</h3>
        <div className="space-y-4">
        {[
            { name: "Alien Ferdie", email: "alienferd2700@gmail.com", date: "Wed Nov 25, 00:08" },
            { name: "Chidera Peace", email: "chiderapeace@gmail.com", date: "Wed Nov 25, 00:10" },
        ].map((user, i) => (
            <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Profile Circle with Initial */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#9c27b0] text-white font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </div>
            <p className="text-sm text-gray-400">{user.date}</p>
            </div>
        ))}
        </div>
    </div>
    </div>


      {/* Modal */}
      {selectedCard && (
        <Modal 
            onClose={closeModal} isOpen={false}>
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
}
