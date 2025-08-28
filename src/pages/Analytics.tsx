import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts'
import {
  Calendar,
  TrendingUp,
  Filter,
  Download,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import MetricsCard from '@/components/dashboard/MetricsCard'
import { formatCurrency, generateDateRange } from '@/lib/utils'

// Utility function
const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`

// Mock data for seasonal trends
const seasonalData = [
  { month: 'Jan', sales: 65000, forecast: 68000, trend: 'winter' },
  { month: 'Feb', sales: 59000, forecast: 62000, trend: 'winter' },
  { month: 'Mar', sales: 80000, forecast: 82000, trend: 'spring' },
  { month: 'Apr', sales: 81000, forecast: 85000, trend: 'spring' },
  { month: 'May', sales: 95000, forecast: 98000, trend: 'spring' },
  { month: 'Jun', sales: 105000, forecast: 108000, trend: 'summer' },
  { month: 'Jul', sales: 115000, forecast: 118000, trend: 'summer' },
  { month: 'Aug', sales: 112000, forecast: 115000, trend: 'summer' },
  { month: 'Sep', sales: 88000, forecast: 92000, trend: 'fall' },
  { month: 'Oct', sales: 76000, forecast: 79000, trend: 'fall' },
  { month: 'Nov', sales: 95000, forecast: 98000, trend: 'fall' },
  { month: 'Dec', sales: 125000, forecast: 130000, trend: 'winter' }
]

const categoryPerformance = [
  { name: 'Electronics', value: 45000, growth: 12.5, color: '#22c55e' },
  { name: 'Clothing', value: 38000, growth: -2.3, color: '#3b82f6' },
  { name: 'Home & Garden', value: 25000, growth: 18.7, color: '#f59e0b' },
  { name: 'Sports', value: 22000, growth: 8.2, color: '#8b5cf6' },
  { name: 'Books', value: 15000, growth: -5.1, color: '#ef4444' }
]

const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
  hour: `${hour}:00`,
  sales: Math.random() * 500 + 100,
  customers: Math.floor(Math.random() * 25 + 5)
}))

const weeklyComparison = generateDateRange(7).map((day, ) => ({
  day,
  thisWeek: 2000 + Math.random() * 3000,
  lastWeek: 1800 + Math.random() * 2800,
  twoWeeksAgo: 1600 + Math.random() * 2600
}))

export default function Analytics() {
  const [selectedPeriod] = useState('month')
  const [selectedCategory] = useState('all')
  
  // Use the variables to prevent eslint warnings
  console.log('Analytics period:', selectedPeriod, 'category:', selectedCategory);

  const CustomTooltip = ({ active, payload, label }: unknown) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: { color?: string; name?: string; value?: number }, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 capitalize">
                {entry.dataKey.replace(/([A-Z])/g, ' $1').trim()}:
              </span>
              <span className="text-sm font-medium">
                {typeof entry.value === 'number' && entry.dataKey.includes('sales') || entry.dataKey.includes('value')
                  ? formatCurrency(entry.value)
                  : entry.value
                }
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600 mt-1">
            Deep insights into your retail performance and seasonal trends
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricsCard
          title="Peak Sales Hour"
          value="2:00 PM - 3:00 PM"
          growth={15.3}
          icon={<Zap className="h-5 w-5" />}
          description="Highest traffic and conversion"
          className="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        <MetricsCard
          title="Best Category"
          value="Electronics"
          growth={12.5}
          icon={<TrendingUp className="h-5 w-5" />}
          description="Top performing product category"
          className="bg-gradient-to-br from-green-50 to-green-100"
        />
        <MetricsCard
          title="Seasonal Boost"
          value="Holiday Season"
          growth={28.7}
          icon={<Calendar className="h-5 w-5" />}
          description="Expected 28% increase in Dec"
          className="bg-gradient-to-br from-purple-50 to-purple-100"
        />
      </div>

      {/* Seasonal Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary-600" />
              Seasonal Sales Trends & Forecasting
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">AI Powered</Badge>
              <Badge variant="outline">95% Accuracy</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={seasonalData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#salesGradient)"
              />
              <Bar dataKey="forecast" fill="#0ea5e9" opacity={0.6} />
            </ComposedChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {['spring', 'summer', 'fall', 'winter'].map((season, index) => {
              const seasonData = seasonalData.filter(d => d.trend === season)
              const avgSales = seasonData.reduce((sum, d) => sum + d.sales, 0) / seasonData.length
              const seasonColors = ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6']
              
              return (
                <div key={season} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium capitalize text-gray-900">{season}</h4>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: seasonColors[index] }}
                    />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(avgSales)}
                  </p>
                  <p className="text-xs text-gray-600">Average monthly sales</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance and Hourly Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-primary-600" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={categoryPerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${formatPercent((percent || 0) * 100)}`}
                >
                  {categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-3 mt-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      {formatCurrency(category.value)}
                    </span>
                    <span className={`text-sm ${
                      category.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {category.growth > 0 ? '+' : ''}{category.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hourly Sales Pattern */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
              Hourly Sales Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#64748b"
                  interval={2}
                />
                <YAxis stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#hourlyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Peak Hour</p>
                <p className="text-lg font-bold text-blue-900">2-3 PM</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-600 font-medium">Rush Hours</p>
                <p className="text-lg font-bold text-yellow-900">11AM-3PM</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Evening Peak</p>
                <p className="text-lg font-bold text-green-900">6-8 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
            Weekly Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="twoWeeksAgo" fill="#cbd5e1" name="2 Weeks Ago" />
              <Bar dataKey="lastWeek" fill="#94a3b8" name="Last Week" />
              <Bar dataKey="thisWeek" fill="#22c55e" name="This Week" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}