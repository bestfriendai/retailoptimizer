export interface User {
  id: string
  email: string
  name: string
  role: 'owner' | 'manager' | 'employee'
  storeId: string
  createdAt: Date
}

export interface Store {
  id: string
  name: string
  address: string
  phone: string
  email: string
  industry: string
  size: 'small' | 'medium' | 'large'
  createdAt: Date
}

export interface SalesData {
  id: string
  date: Date
  amount: number
  quantity: number
  productId: string
  customerId?: string
  employeeId: string
  storeId: string
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  cost: number
  stock: number
  reorderPoint: number
  supplier: string
  storeId: string
  createdAt: Date
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  segment: 'new' | 'regular' | 'vip' | 'at_risk'
  totalSpent: number
  visitCount: number
  lastVisit: Date
  storeId: string
  createdAt: Date
}

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  hireDate: Date
  totalSales: number
  commission: number
  storeId: string
}

export interface DashboardMetrics {
  revenue: {
    current: number
    previous: number
    growth: number
  }
  orders: {
    current: number
    previous: number
    growth: number
  }
  customers: {
    current: number
    previous: number
    growth: number
  }
  avgOrderValue: {
    current: number
    previous: number
    growth: number
  }
}

export interface ChartData {
  name: string
  value: number
  growth?: number
}

export interface SeasonalTrend {
  period: string
  sales: number
  forecast: number
  confidence: number
}

export interface InventoryAlert {
  id: string
  productId: string
  productName: string
  currentStock: number
  reorderPoint: number
  severity: 'low' | 'critical'
  daysLeft: number
}

export interface CustomerSegment {
  segment: string
  count: number
  revenue: number
  avgOrderValue: number
  color: string
}

export interface PriceOptimization {
  productId: string
  productName: string
  currentPrice: number
  suggestedPrice: number
  expectedImpact: number
  confidence: number
  reason: string
}

export interface CompetitorPrice {
  productId: string
  competitor: string
  price: number
  lastUpdated: Date
}

export interface StaffPerformance {
  employeeId: string
  name: string
  sales: number
  transactions: number
  avgTransactionValue: number
  customerRating: number
  goals: {
    sales: number
    transactions: number
  }
}