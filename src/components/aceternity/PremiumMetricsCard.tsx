import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PremiumMetricsCardProps {
  title: string;
  value: number;
  previousValue?: number;
  growth?: number;
  format?: "currency" | "number" | "percentage";
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  description?: string;
  className?: string;
  delay?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function PremiumMetricsCard({
  title,
  value,
  previousValue,
  growth,
  format = "number",
  trend = "neutral",
  icon,
  description,
  className,
  delay = 0,
  gradientFrom = "from-emerald-500",
  gradientTo = "to-cyan-500"
}: PremiumMetricsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Animate the value counting up
  useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.min(increment * currentStep, value));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, animationDuration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formatValue = (val: number) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case "percentage":
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat("en-US").format(Math.round(val));
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />;
      case "down":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        "bg-black/40 backdrop-blur-xl",
        "border border-white/10",
        "hover:border-white/20",
        "transition-all duration-300",
        "hover:shadow-2xl hover:shadow-emerald-500/10",
        "group",
        className
      )}
    >
      {/* Animated gradient background */}
      <motion.div
        className={cn(
          "absolute inset-0 opacity-0 bg-gradient-to-br",
          gradientFrom,
          gradientTo,
          "transition-opacity duration-300"
        )}
        animate={{ 
          opacity: isHovered ? 0.1 : 0.05,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 1.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${60 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              className={cn(
                "p-2 rounded-lg bg-gradient-to-br",
                gradientFrom,
                gradientTo,
                "text-white shadow-lg"
              )}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <div>
              <h3 className="text-sm font-medium text-gray-300">{title}</h3>
              {description && (
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Value */}
        <div className="mb-4">
          <motion.div
            className="text-3xl font-bold text-white mb-1"
            key={displayValue}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {formatValue(displayValue)}
          </motion.div>

          {/* Growth indicator */}
          {growth !== undefined && (
            <motion.div
              className={cn(
                "flex items-center space-x-1 text-sm",
                getTrendColor()
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {getTrendIcon()}
              <span className="font-medium">
                {growth > 0 ? "+" : ""}{growth?.toFixed(1)}%
              </span>
              {previousValue && (
                <span className="text-gray-500 text-xs">
                  vs {formatValue(previousValue)}
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
              gradientFrom,
              gradientTo
            )}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((value / (previousValue || value)) * 100, 100)}%` }}
            transition={{ delay: delay + 0.5, duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered 
            ? "inset 0 0 30px rgba(16, 185, 129, 0.15)"
            : "inset 0 0 30px rgba(16, 185, 129, 0.05)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default PremiumMetricsCard;