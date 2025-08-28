import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  shimmer?: boolean;
}

export function PremiumButton({
  children,
  variant = "primary",
  size = "md",
  className,
  loading = false,
  icon,
  shimmer = false,
  ...props
}: PremiumButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = cn(
    "relative inline-flex items-center justify-center rounded-lg font-medium",
    "transition-all duration-200 overflow-hidden",
    "focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "group"
  );

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-2",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-3",
  };

  const variantClasses = {
    primary: cn(
      "bg-gradient-to-r from-emerald-500 to-cyan-500",
      "text-white border border-emerald-400/50",
      "hover:from-emerald-400 hover:to-cyan-400",
      "shadow-lg shadow-emerald-500/25",
      "hover:shadow-xl hover:shadow-emerald-500/40"
    ),
    secondary: cn(
      "bg-white/10 text-white border border-white/20",
      "hover:bg-white/20 hover:border-white/30",
      "backdrop-blur-sm"
    ),
    ghost: cn(
      "text-gray-300 hover:text-white",
      "hover:bg-white/10"
    ),
    gradient: cn(
      "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
      "text-white border-0",
      "hover:from-purple-400 hover:via-pink-400 hover:to-orange-400",
      "shadow-lg shadow-purple-500/25",
      "hover:shadow-xl hover:shadow-purple-500/40"
    ),
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      disabled={loading}
      {...props}
    >
      {/* Shimmer effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 -top-[1px] -bottom-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: isHovered ? ["-100%", "100%"] : "-100%",
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered 
            ? "inset 0 0 20px rgba(255, 255, 255, 0.1)"
            : "inset 0 0 20px rgba(255, 255, 255, 0)"
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        whileTap={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <>
            {icon && (
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {icon}
              </motion.div>
            )}
            <span>{children}</span>
          </>
        )}
      </div>

      {/* Particle effects for primary variant */}
      {variant === "primary" && isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: "100%", 
                opacity: 0 
              }}
              animate={{ 
                y: "-20%", 
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}

export default PremiumButton;