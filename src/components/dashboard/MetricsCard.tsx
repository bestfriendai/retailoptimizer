import React from 'react'
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency, formatNumber, formatPercent } from '@/lib/utils'

interface MetricsCardProps {
  title: string
  value: string | number
  previousValue?: string | number
  growth?: number
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  format?: 'currency' | 'number' | 'percent'
  description?: string
  className?: string
}

export default function MetricsCard({
  title,
  value,
  previousValue,
  growth,
  trend,
  icon,
  format = 'number',
  description,
  className
}: MetricsCardProps) {
  const formatValue = (val: string | number) => {
    const numVal = typeof val === 'string' ? parseFloat(val) : val
    switch (format) {
      case 'currency':
        return formatCurrency(numVal)
      case 'percent':
        return formatPercent(numVal)
      default:
        return formatNumber(numVal)
    }
  }

  const growthColor = growth && growth > 0 ? 'text-green-600' : 'text-red-600'
  const GrowthIcon = growth && growth > 0 ? ArrowUp : ArrowDown
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {formatValue(value)}
          </div>
          {growth !== undefined && (
            <div className={cn("flex items-center text-sm", growthColor)}>
              <GrowthIcon className="h-4 w-4 mr-1" />
              {formatPercent(Math.abs(growth))}
            </div>
          )}
        </div>
        
        {previousValue && (
          <p className="text-xs text-gray-500 mt-1">
            vs {formatValue(previousValue)} last period
          </p>
        )}
        
        {description && (
          <p className="text-xs text-gray-600 mt-2 flex items-center">
            {TrendIcon && <TrendIcon className="h-3 w-3 mr-1" />}
            {description}
          </p>
        )}

        {/* Trend indicator */}
        {trend && (
          <div className={cn(
            "absolute bottom-0 left-0 h-1 w-full",
            trend === 'up' ? 'bg-green-500' : trend === 'down' ? 'bg-red-500' : 'bg-gray-300'
          )} />
        )}
      </CardContent>
    </Card>
  )
}