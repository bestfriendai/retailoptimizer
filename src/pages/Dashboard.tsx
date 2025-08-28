import React from 'react'
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Package,
  AlertTriangle,
  // Target,
  Clock
} from 'lucide-react'
import MetricsCard from '@/components/dashboard/MetricsCard'
import SalesChart from '@/components/charts/SalesChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generateDateRange, formatCurrency } from '@/lib/utils'

// Mock data - in a real app, this would come from your API
const dashboardMetrics = {
  revenue: {
    current: 47820,
    previous: 43250,
    growth: 10.6
  },
  orders: {
    current: 312,
    previous: 287,
    growth: 8.7
  },
  customers: {
    current: 1247,
    previous: 1189,
    growth: 4.9
  },
  avgOrderValue: {
    current: 153.27,
    previous: 150.70,
    growth: 1.7
  }
}

const salesData = generateDateRange(30).map((date, index) => ({
  name: date,
  sales: 1000 + Math.random() * 2000,
  forecast: index > 20 ? 1200 + Math.random() * 1800 : undefined,
  lastYear: 800 + Math.random() * 1500
}))

const topProducts = [
  { name: 'Wireless Headphones', sales: 1247, growth: 15.2, stock: 23 },
  { name: 'Smartphone Case', sales: 892, growth: -3.1, stock: 156 },
  { name: 'Bluetooth Speaker', sales: 734, growth: 22.8, stock: 8 },
  { name: 'USB-C Cable', sales: 623, growth: 8.4, stock: 45 },
  { name: 'Power Bank', sales: 512, growth: -1.2, stock: 89 }
]

const recentAlerts = [
  { 
    id: 1,
    type: 'stock',
    message: 'Bluetooth Speaker running low (8 units remaining)',
    severity: 'high',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'performance',
    message: 'Daily sales target 85% achieved',
    severity: 'medium',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'customer',
    message: '12 new customer registrations today',
    severity: 'low',
    time: '6 hours ago'
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening at your store today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="success">
            Store Open
          </Badge>
          <span className="text-sm text-gray-500">
            Updated 2 minutes ago
          </span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Revenue"
          value={dashboardMetrics.revenue.current}
          previousValue={dashboardMetrics.revenue.previous}
          growth={dashboardMetrics.revenue.growth}
          format="currency"
          trend="up"
          icon={<DollarSign className="h-5 w-5" />}
          description="Strong month-over-month growth"
        />
        <MetricsCard
          title="Orders"
          value={dashboardMetrics.orders.current}
          previousValue={dashboardMetrics.orders.previous}
          growth={dashboardMetrics.orders.growth}
          trend="up"
          icon={<ShoppingCart className="h-5 w-5" />}
          description="25 orders today so far"
        />
        <MetricsCard
          title="Customers"
          value={dashboardMetrics.customers.current}
          previousValue={dashboardMetrics.customers.previous}
          growth={dashboardMetrics.customers.growth}
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description="58 unique customers this month"
        />
        <MetricsCard
          title="Avg Order Value"
          value={dashboardMetrics.avgOrderValue.current}
          previousValue={dashboardMetrics.avgOrderValue.previous}
          growth={dashboardMetrics.avgOrderValue.growth}
          format="currency"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Higher value transactions"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="xl:col-span-2">
          <SalesChart 
            data={salesData}
            title="Sales Trends (Last 30 Days)"
            height={350}
            showForecast={true}
            showComparison={true}
          />
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-primary-600" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(product.sales)} sales
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={product.stock < 10 ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {product.stock} left
                    </Badge>
                    <span className={`text-xs ${
                      product.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.growth > 0 ? '+' : ''}{product.growth.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <p className="text-sm text-gray-900">{alert.message}</p>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {alert.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}