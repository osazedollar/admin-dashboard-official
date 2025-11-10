import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function StatCard({ title, value, icon, onClick }: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        rotate: 1,
        boxShadow: "0px 0px 25px rgba(156, 39, 176, 0.4)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={onClick}
      className="relative cursor-pointer bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center overflow-hidden group"
    >
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#9c27b0] transition-all duration-500"></div>
      <div className="text-3xl mb-2 text-[#9c27b0]">{icon}</div>
      <p className="text-gray-600 text-sm">{title}</p>
      <h2 className="text-lg font-semibold mt-1 text-gray-800">{value}</h2>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[#9c27b0] blur-2xl rounded-2xl transition-opacity duration-500"></div>
    </motion.div>
  );
}
