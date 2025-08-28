import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";
import { cn } from "@/lib/utils";

interface AnimatedChartProps {
  data: unknown[];
  title?: string;
  type?: "line" | "area" | "bar";
  dataKey: string;
  xAxisKey?: string;
  height?: number;
  gradientFrom?: string;
  gradientTo?: string;
  showAnimation?: boolean;
  delay?: number;
  className?: string;
}

export function AnimatedChart({
  data,
  title,
  type = "area",
  dataKey,
  xAxisKey = "name",
  height = 300,
  gradientFrom = "#10b981",
  gradientTo = "#06b6d4",
  showAnimation = true,
  delay = 0,
  className
}: AnimatedChartProps) {
  const [animatedData, setAnimatedData] = useState<unknown[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      // Start with empty data
      setAnimatedData([]);
      
      // Gradually populate data
      const timer = setTimeout(() => {
        setIsVisible(true);
        data.forEach((item, index) => {
          setTimeout(() => {
            setAnimatedData(prev => [...prev, item]);
          }, index * 100);
        });
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setAnimatedData(data);
      setIsVisible(true);
    }
  }, [data, showAnimation, delay]);

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: unknown }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl"
        >
          <p className="text-gray-300 text-sm mb-1">{label}</p>
          <p className="text-emerald-400 font-semibold">
            {typeof payload[0].value === "number" 
              ? payload[0].value.toLocaleString()
              : payload[0].value
            }
          </p>
        </motion.div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: animatedData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={gradientFrom} />
                <stop offset="100%" stopColor={gradientTo} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.1)" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: gradientTo, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: gradientTo, strokeWidth: 2 }}
            />
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientFrom} />
                <stop offset="100%" stopColor={gradientTo} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.1)" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={dataKey}
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      default: // area
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.3} />
                <stop offset="100%" stopColor={gradientTo} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={gradientFrom} />
                <stop offset="100%" stopColor={gradientTo} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.1)" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="url(#strokeGradient)"
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={{ fill: gradientTo, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: gradientTo, strokeWidth: 2 }}
            />
          </AreaChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-black/40 backdrop-blur-xl border border-white/10",
        "p-6",
        className
      )}
    >
      {/* Title */}
      {title && (
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
          className="text-lg font-semibold text-white mb-6"
        >
          {title}
        </motion.h3>
      )}

      {/* Chart container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>

      {/* Loading animation */}
      {!isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <motion.div
            className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isVisible 
            ? "inset 0 0 20px rgba(16, 185, 129, 0.1)"
            : "inset 0 0 20px rgba(16, 185, 129, 0.05)"
        }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}

export default AnimatedChart;