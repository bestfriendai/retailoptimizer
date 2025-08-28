import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "grid" | "dots" | "gradient" | "mesh";
}

export function AnimatedBackground({ 
  children, 
  className, 
  variant = "gradient" 
}: AnimatedBackgroundProps) {
  const renderBackground = () => {
    switch (variant) {
      case "grid":
        return (
          <div className="absolute inset-0 bg-grid opacity-20" />
        );
      
      case "dots":
        return (
          <div className="absolute inset-0 bg-dot opacity-20" />
        );
        
      case "mesh":
        return (
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );
        
      default: // gradient
        return (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(16, 185, 129, 0.15), transparent)",
                "radial-gradient(ellipse 80% 80% at 80% 20%, rgba(6, 182, 212, 0.15), transparent)", 
                "radial-gradient(ellipse 80% 80% at 20% 80%, rgba(139, 92, 246, 0.15), transparent)",
                "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(16, 185, 129, 0.15), transparent)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
    }
  };

  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Animated background */}
      {renderBackground()}
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              opacity: [0, 1, 0.5, 0],
              scale: [0, 1.5, 1, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default AnimatedBackground;