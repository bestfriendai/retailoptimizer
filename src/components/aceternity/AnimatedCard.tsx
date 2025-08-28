import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  delay?: number;
}

export function AnimatedCard({ 
  children, 
  className, 
  hoverEffect = true, 
  glowEffect = false,
  delay = 0 
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={hoverEffect ? { 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-black/40 backdrop-blur-xl",
        "border border-white/10",
        "transition-all duration-300",
        glowEffect && "hover:shadow-2xl hover:shadow-emerald-500/20",
        className
      )}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10"
        animate={{ 
          opacity: isHovered ? 0.5 : 0,
          background: isHovered 
            ? "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))"
            : "linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05))"
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Subtle border glow */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: isHovered 
              ? "inset 0 0 20px rgba(16, 185, 129, 0.2), 0 0 20px rgba(16, 185, 129, 0.1)"
              : "inset 0 0 20px rgba(16, 185, 129, 0.1), 0 0 20px rgba(16, 185, 129, 0.05)"
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

export default AnimatedCard;