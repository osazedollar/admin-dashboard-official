import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/pendeet_move.png";

const tabs = [
  { name: "Overview", path: "/" },
  { name: "Users", path: "/users" },
  { name: "Provider", path: "/providers" },
  { name: "Content", path: "/content" },
];

const messages = [
  "Your community keeps expanding! Stay connected with your growing users and keep delivering great experiences every day.",
  "User engagement is on the rise — a clear sign your platform is attracting and retaining active members.",
  "Every new user is a step toward your vision. Keep the momentum going — growth never stops!",
  "Steady user growth reflects strong engagement and consistent platform performance this month.",
];

export default function DashboardHeader() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tab: {name: string; path: string}) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden relative">
      {/* Navigation Tabs */}
      <div className="flex justify-start items-center gap-6 px-6 pt-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab)}
            className={`relative pb-2 text-sm font-medium transition-colors ${
              activeTab === tab.name
                ? "text-purple-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-purple-600"
                : "text-gray-600 hover:text-purple-700"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-16 py-12 relative">
        {/* Text Section */}
        <div className="md:w-2/3 relative z-10">
          <h2 className="text-gray-700 font-semibold text-lg mb-2">
            Congratulations, your users are growing!
          </h2>

          <div className="relative h-[60px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-sm text-gray-500 max-w-2xl leading-relaxed absolute"
              >
                {messages[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/3 mt-6 md:mt-0 relative">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={HeroImage}
              alt="Dashboard Growth"
              className="w-full h-48 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#9c27b0]/70 to-transparent mix-blend-multiply rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
