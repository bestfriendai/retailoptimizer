import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BarChart3, 
  Package, 
  Users, 
  DollarSign, 
  UserCheck
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface FloatingDockProps {
  className?: string;
}

const dockItems = [
  { 
    title: "Dashboard", 
    icon: LayoutDashboard, 
    href: "/dashboard",
    color: "from-emerald-500 to-cyan-500"
  },
  { 
    title: "Analytics", 
    icon: BarChart3, 
    href: "/analytics",
    color: "from-purple-500 to-pink-500"
  },
  { 
    title: "Inventory", 
    icon: Package, 
    href: "/inventory",
    color: "from-orange-500 to-red-500"
  },
  { 
    title: "Customers", 
    icon: Users, 
    href: "/customers",
    color: "from-blue-500 to-indigo-500"
  },
  { 
    title: "Pricing", 
    icon: DollarSign, 
    href: "/pricing",
    color: "from-green-500 to-emerald-500"
  },
  { 
    title: "Staff", 
    icon: UserCheck, 
    href: "/staff",
    color: "from-violet-500 to-purple-500"
  },
];

export function FloatingDock({ className }: FloatingDockProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useRef(0);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50",
        "mx-auto flex h-16 items-end gap-4 rounded-2xl",
        "bg-black/20 backdrop-blur-md border border-white/10",
        "px-4 pb-3 shadow-2xl",
        className
      )}
      onMouseMove={(e) => {
        mouseX.current = e.pageX;
      }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {dockItems.map((item, idx) => (
        <motion.div
          key={item.href}
          className="relative"
          onMouseEnter={() => setHoveredIndex(idx)}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 2, x: "-50%" }}
                className="absolute left-1/2 transform -translate-x-1/2 -top-12 z-50"
              >
                <div className="bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium border border-white/20">
                  {item.title}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            onClick={() => navigate(item.href)}
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-xl",
              "border border-white/10 backdrop-blur-sm transition-all duration-200",
              "hover:border-white/20 hover:shadow-xl",
              location.pathname === item.href || location.pathname.startsWith(item.href)
                ? "bg-gradient-to-r " + item.color + " shadow-lg"
                : "bg-white/5 hover:bg-white/10"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon 
              className={cn(
                "h-5 w-5 transition-colors",
                location.pathname === item.href || location.pathname.startsWith(item.href)
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              )} 
            />
            
            {(location.pathname === item.href || location.pathname.startsWith(item.href)) && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl border-2 border-white/30"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default FloatingDock;