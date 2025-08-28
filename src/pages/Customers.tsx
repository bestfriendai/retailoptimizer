import React, { useState } from 'react'
import {
  Users,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  // Target,
  // TrendingUp,
  Star,
  Search,
  Filter,
  Send,
  Gift,
  AlertCircle
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import MetricsCard from '@/components/dashboard/MetricsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock data for customer segments
const customerSegments = [
  {
    segment: 'VIP Customers',
    count: 89,
    revenue: 45200,
    avgOrderValue: 185.50,
    color: '#22c55e',
    growth: 12.5,
    description: 'High-value, loyal customers'
  },
  {
    segment: 'Regular Customers',
    count: 456,
    revenue: 67800,
    avgOrderValue: 95.25,
    color: '#3b82f6',
    growth: 8.3,
    description: 'Frequent repeat customers'
  },
  {
    segment: 'New Customers',
    count: 234,
    revenue: 18900,
    avgOrderValue: 65.75,
    color: '#f59e0b',
    growth: 25.7,
    description: 'First-time buyers this month'
  },
  {
    segment: 'At-Risk Customers',
    count: 127,
    revenue: 8500,
    avgOrderValue: 55.20,
    color: '#ef4444',
    growth: -15.2,
    description: 'Haven\'t purchased in 90+ days'
  }
]

const customers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    segment: 'VIP',
    totalSpent: 2850.50,
    visitCount: 47,
    lastVisit: '2024-08-18',
    avgOrderValue: 125.80,
    preferredCategory: 'Electronics',
    loyaltyPoints: 2850,
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    phone: '+1 (555) 987-6543',
    segment: 'Regular',
    totalSpent: 1245.75,
    visitCount: 23,
    lastVisit: '2024-08-17',
    avgOrderValue: 85.60,
    preferredCategory: 'Sports',
    loyaltyPoints: 1245,
    joinDate: '2023-06-22'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    email: 'emma.r@email.com',
    phone: '+1 (555) 456-7890',
    segment: 'New',
    totalSpent: 189.99,
    visitCount: 3,
    lastVisit: '2024-08-19',
    avgOrderValue: 63.33,
    preferredCategory: 'Clothing',
    loyaltyPoints: 189,
    joinDate: '2024-08-01'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'd.kim@email.com',
    phone: '+1 (555) 321-0987',
    segment: 'At-Risk',
    totalSpent: 945.20,
    visitCount: 12,
    lastVisit: '2024-05-15',
    avgOrderValue: 78.77,
    preferredCategory: 'Electronics',
    loyaltyPoints: 945,
    joinDate: '2023-03-10'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    phone: '+1 (555) 654-3210',
    segment: 'VIP',
    totalSpent: 3200.75,
    visitCount: 52,
    lastVisit: '2024-08-18',
    avgOrderValue: 145.25,
    preferredCategory: 'Home & Garden',
    loyaltyPoints: 3200,
    joinDate: '2022-11-08'
  }
]

const campaignTemplates = [
  {
    id: 1,
    name: 'Welcome Series',
    segment: 'New',
    type: 'Email',
    description: 'Onboard new customers with product recommendations',
    estimatedReach: 234,
    expectedRevenue: 15600
  },
  {
    id: 2,
    name: 'Win-Back Campaign',
    segment: 'At-Risk',
    type: 'Email + SMS',
    description: '20% discount for customers who haven\'t purchased in 90+ days',
    estimatedReach: 127,
    expectedRevenue: 8900
  },
  {
    id: 3,
    name: 'VIP Appreciation',
    segment: 'VIP',
    type: 'Email',
    description: 'Exclusive early access to new products',
    estimatedReach: 89,
    expectedRevenue: 22400
  },
  {
    id: 4,
    name: 'Birthday Special',
    segment: 'All',
    type: 'SMS',
    description: 'Birthday discount and loyalty bonus',
    estimatedReach: 45,
    expectedRevenue: 3200
  }
]

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSegment, setSelectedSegment] = useState('all')
  const [showCampaigns, setShowCampaigns] = useState(false)

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = selectedSegment === 'all' || 
                          customer.segment.toLowerCase() === selectedSegment.toLowerCase()
    
    return matchesSearch && matchesSegment
  })

  const getSegmentColor = (segment: string) => {
    switch (segment.toLowerCase()) {
      case 'vip': return 'bg-green-100 text-green-800 border-green-200'
      case 'regular': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'new': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'at-risk': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = today.getTime() - date.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const CustomTooltip = ({ active, payload }: unknown) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.segment}</p>
          <p className="text-sm text-gray-600">Customers: {formatNumber(data.count)}</p>
          <p className="text-sm text-gray-600">Revenue: {formatCurrency(data.revenue)}</p>
          <p className="text-sm text-gray-600">Avg Order: {formatCurrency(data.avgOrderValue)}</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">
            Segment customers and create targeted marketing campaigns
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant={showCampaigns ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowCampaigns(!showCampaigns)}
          >
            <Mail className="h-4 w-4 mr-2" />
            {showCampaigns ? 'View Customers' : 'Campaigns'}
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Customers"
          value={customers.length}
          growth={15.8}
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description="Active customer base"
        />
        <MetricsCard
          title="New This Month"
          value={customerSegments.find(s => s.segment === 'New Customers')?.count || 0}
          growth={25.7}
          trend="up"
          icon={<UserPlus className="h-5 w-5" />}
          description="First-time customers"
          className="bg-gradient-to-br from-yellow-50 to-yellow-100"
        />
        <MetricsCard
          title="At-Risk Customers"
          value={customerSegments.find(s => s.segment === 'At-Risk Customers')?.count || 0}
          growth={-15.2}
          trend="down"
          icon={<AlertCircle className="h-5 w-5" />}
          description="Need re-engagement"
          className="border-red-200 bg-red-50"
        />
        <MetricsCard
          title="Customer LTV"
          value={1850}
          growth={12.3}
          trend="up"
          format="currency"
          icon={<Star className="h-5 w-5" />}
          description="Lifetime value average"
        />
      </div>

      {showCampaigns ? (
        /* Campaign Management */
        <>
          {/* Campaign Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-600" />
                Marketing Campaign Templates
                <Badge variant="secondary" className="ml-2">
                  {campaignTemplates.length} templates
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaignTemplates.map((template) => (
                  <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {template.segment}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.type}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-1" />
                        Launch
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Estimated Reach</p>
                        <p className="font-medium text-gray-900">
                          {formatNumber(template.estimatedReach)} customers
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Expected Revenue</p>
                        <p className="font-medium text-green-600">
                          {formatCurrency(template.expectedRevenue)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Segmentation Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      dataKey="count"
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ segment, percent }) => 
                        `${segment.split(' ')[0]} ${((percent || 0) * 100).toFixed(0)}%`
                      }
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Segment</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={customerSegments}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="segment" 
                      stroke="#64748b"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        /* Customer List */
        <>
          {/* Customer Segment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {customerSegments.map((segment, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      <h3 className="font-medium text-gray-900">{segment.segment}</h3>
                    </div>
                    <Target className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Customers:</span>
                      <span className="font-medium">{formatNumber(segment.count)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue:</span>
                      <span className="font-medium">{formatCurrency(segment.revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Order:</span>
                      <span className="font-medium">{formatCurrency(segment.avgOrderValue)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">{segment.description}</p>
                  <div className={`absolute bottom-0 left-0 h-1 w-full ${
                    segment.growth > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search customers by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={selectedSegment}
                    onChange={(e) => setSelectedSegment(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Segments</option>
                    <option value="vip">VIP</option>
                    <option value="regular">Regular</option>
                    <option value="new">New</option>
                    <option value="at-risk">At-Risk</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary-600" />
                Customer Database
                <Badge variant="secondary" className="ml-2">
                  {filteredCustomers.length} customers
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                      <th className="text-left p-4 font-medium text-gray-900">Segment</th>
                      <th className="text-left p-4 font-medium text-gray-900">Total Spent</th>
                      <th className="text-left p-4 font-medium text-gray-900">Visits</th>
                      <th className="text-left p-4 font-medium text-gray-900">Last Visit</th>
                      <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{customer.name}</h4>
                            <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {customer.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {customer.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getSegmentColor(customer.segment)}>
                            {customer.segment}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {formatCurrency(customer.totalSpent)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Avg: {formatCurrency(customer.avgOrderValue)}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900">
                            {customer.visitCount}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            {getDaysAgo(customer.lastVisit)} days ago
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                            {customer.segment === 'At-Risk' && (
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                <Gift className="h-3 w-3 mr-1" />
                                Win-Back
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}