import React, { useState } from 'react'
import {
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Edit,
  BarChart3,
  Zap,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import MetricsCard from '@/components/dashboard/MetricsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock inventory data
const inventoryMetrics = {
  totalProducts: 1247,
  lowStock: 23,
  outOfStock: 8,
  totalValue: 125480
}

const inventoryAlerts = [
  {
    id: 1,
    productName: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    currentStock: 3,
    reorderPoint: 10,
    daysLeft: 2,
    severity: 'critical' as const,
    suggestedOrder: 50,
    supplier: 'TechSupply Co.'
  },
  {
    id: 2,
    productName: 'USB-C Charging Cable',
    sku: 'USC-203',
    currentStock: 8,
    reorderPoint: 15,
    daysLeft: 5,
    severity: 'low' as const,
    suggestedOrder: 100,
    supplier: 'ElectroWholesale'
  },
  {
    id: 3,
    productName: 'Smartphone Case - iPhone 15',
    sku: 'SPC-I15',
    currentStock: 5,
    reorderPoint: 12,
    daysLeft: 3,
    severity: 'critical' as const,
    suggestedOrder: 75,
    supplier: 'MobileAccess Ltd'
  },
  {
    id: 4,
    productName: 'Bluetooth Speaker Mini',
    sku: 'BSM-301',
    currentStock: 12,
    reorderPoint: 20,
    daysLeft: 8,
    severity: 'low' as const,
    suggestedOrder: 60,
    supplier: 'AudioTech Inc'
  }
]

const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    category: 'Electronics',
    price: 89.99,
    cost: 45.00,
    stock: 3,
    reorderPoint: 10,
    sold30Days: 47,
    velocity: 'high',
    supplier: 'TechSupply Co.',
    lastOrdered: '2024-08-15'
  },
  {
    id: 2,
    name: 'USB-C Charging Cable',
    sku: 'USC-203',
    category: 'Electronics',
    price: 24.99,
    cost: 8.50,
    stock: 156,
    reorderPoint: 15,
    sold30Days: 234,
    velocity: 'high',
    supplier: 'ElectroWholesale',
    lastOrdered: '2024-08-10'
  },
  {
    id: 3,
    name: 'Smartphone Case - iPhone 15',
    sku: 'SPC-I15',
    category: 'Accessories',
    price: 34.99,
    cost: 12.00,
    stock: 5,
    reorderPoint: 12,
    sold30Days: 89,
    velocity: 'medium',
    supplier: 'MobileAccess Ltd',
    lastOrdered: '2024-08-12'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker Mini',
    sku: 'BSM-301',
    category: 'Electronics',
    price: 59.99,
    cost: 28.00,
    stock: 12,
    reorderPoint: 20,
    sold30Days: 34,
    velocity: 'medium',
    supplier: 'AudioTech Inc',
    lastOrdered: '2024-08-08'
  },
  {
    id: 5,
    name: 'Power Bank 10000mAh',
    sku: 'PB-10K',
    category: 'Electronics',
    price: 49.99,
    cost: 22.00,
    stock: 89,
    reorderPoint: 25,
    sold30Days: 67,
    velocity: 'medium',
    supplier: 'PowerTech Solutions',
    lastOrdered: '2024-08-05'
  }
]

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesStockFilter = !showOnlyLowStock || product.stock <= product.reorderPoint
    
    return matchesSearch && matchesCategory && matchesStockFilter
  })

  const getStockStatus = (stock: number, reorderPoint: number) => {
    if (stock === 0) return { status: 'out', color: 'destructive', text: 'Out of Stock' }
    if (stock <= reorderPoint / 2) return { status: 'critical', color: 'destructive', text: 'Critical' }
    if (stock <= reorderPoint) return { status: 'low', color: 'warning', text: 'Low Stock' }
    return { status: 'good', color: 'success', text: 'In Stock' }
  }

  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'high': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">
            Smart stock optimization and automated reorder points
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Products"
          value={inventoryMetrics.totalProducts}
          growth={5.2}
          trend="up"
          icon={<Package className="h-5 w-5" />}
          description="Active SKUs in inventory"
        />
        <MetricsCard
          title="Low Stock Alerts"
          value={inventoryMetrics.lowStock}
          growth={-12.5}
          trend="down"
          icon={<AlertTriangle className="h-5 w-5" />}
          description="Items below reorder point"
          className="border-yellow-200 bg-yellow-50"
        />
        <MetricsCard
          title="Out of Stock"
          value={inventoryMetrics.outOfStock}
          growth={-25.0}
          trend="down"
          icon={<TrendingDown className="h-5 w-5" />}
          description="Zero inventory items"
          className="border-red-200 bg-red-50"
        />
        <MetricsCard
          title="Inventory Value"
          value={inventoryMetrics.totalValue}
          growth={8.3}
          trend="up"
          format="currency"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Total stock valuation"
        />
      </div>

      {/* Critical Stock Alerts */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Critical Stock Alerts
            <Badge variant="destructive" className="ml-2">
              {inventoryAlerts.filter(alert => alert.severity === 'critical').length} Critical
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{alert.productName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>SKU: {alert.sku}</span>
                        <span>Stock: {alert.currentStock}</span>
                        <span>Reorder at: {alert.reorderPoint}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      Order {alert.suggestedOrder} units
                    </p>
                    <p className="text-xs text-gray-600">
                      {alert.daysLeft} days left
                    </p>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Zap className="h-4 w-4 mr-1" />
                    Reorder
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
                <option value="clothing">Clothing</option>
              </select>
              <Button
                variant={showOnlyLowStock ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOnlyLowStock(!showOnlyLowStock)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Low Stock Only
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-primary-600" />
            Product Inventory
            <Badge variant="secondary" className="ml-2">
              {filteredProducts.length} products
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Product</th>
                  <th className="text-left p-4 font-medium text-gray-900">Price</th>
                  <th className="text-left p-4 font-medium text-gray-900">Stock</th>
                  <th className="text-left p-4 font-medium text-gray-900">Velocity</th>
                  <th className="text-left p-4 font-medium text-gray-900">Reorder Point</th>
                  <th className="text-left p-4 font-medium text-gray-900">Last Ordered</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock, product.reorderPoint)
                  
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                            <span>SKU: {product.sku}</span>
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {formatCurrency(product.price)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Cost: {formatCurrency(product.cost)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {formatNumber(product.stock)}
                          </span>
                          <Badge variant={stockStatus.color as 'default' | 'secondary' | 'destructive' | 'outline'} className="text-xs">
                            {stockStatus.text}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getVelocityColor(product.velocity)}`}>
                            {product.velocity.toUpperCase()}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.sold30Days} sold
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-gray-900">
                          {formatNumber(product.reorderPoint)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(product.lastOrdered).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          {product.stock <= product.reorderPoint && (
                            <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                              Reorder
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}