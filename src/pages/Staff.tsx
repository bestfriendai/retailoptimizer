import React, { useState } from 'react'
import {
  Users,
  UserPlus,
  Trophy,
  // Target,
  TrendingUp,
  TrendingDown,
  Star,
  // Clock,
  DollarSign,
  Award,
  Calendar,
  BarChart3
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // RadialBarChart,
  // RadialBar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import MetricsCard from '@/components/dashboard/MetricsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Utility function
// const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`

// Mock data for staff performance
const staffMetrics = {
  totalStaff: 12,
  avgSalesPerStaff: 8450,
  topPerformerGrowth: 28.5,
  teamGoalProgress: 87.3
}

const staffMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Sales Associate',
    avatar: 'SJ',
    hireDate: '2023-01-15',
    salesThisMonth: 12450,
    salesGoal: 10000,
    transactions: 89,
    avgTransactionValue: 139.89,
    customerRating: 4.8,
    hoursWorked: 168,
    commission: 1245,
    badges: ['Top Seller', 'Customer Favorite'],
    trend: 'up',
    growth: 18.5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Sales Associate',
    avatar: 'MC',
    hireDate: '2023-06-22',
    salesThisMonth: 9850,
    salesGoal: 9000,
    transactions: 76,
    avgTransactionValue: 129.61,
    customerRating: 4.6,
    hoursWorked: 160,
    commission: 985,
    badges: ['Rising Star'],
    trend: 'up',
    growth: 12.3
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Sales Associate',
    avatar: 'ER',
    hireDate: '2024-02-10',
    salesThisMonth: 7200,
    salesGoal: 8000,
    transactions: 65,
    avgTransactionValue: 110.77,
    customerRating: 4.4,
    hoursWorked: 164,
    commission: 720,
    badges: ['New Team Member'],
    trend: 'down',
    growth: -5.2
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Assistant Manager',
    avatar: 'DK',
    hireDate: '2022-08-05',
    salesThisMonth: 15200,
    salesGoal: 12000,
    transactions: 98,
    avgTransactionValue: 155.10,
    customerRating: 4.9,
    hoursWorked: 176,
    commission: 1520,
    badges: ['Team Leader', 'Customer Champion', 'Sales Expert'],
    trend: 'up',
    growth: 25.8
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Sales Associate',
    avatar: 'LT',
    hireDate: '2023-04-18',
    salesThisMonth: 8900,
    salesGoal: 9500,
    transactions: 72,
    avgTransactionValue: 123.61,
    customerRating: 4.7,
    hoursWorked: 158,
    commission: 890,
    badges: ['Consistent Performer'],
    trend: 'up',
    growth: 8.9
  }
]

const teamGoals = [
  {
    category: 'Monthly Sales',
    target: 120000,
    current: 104700,
    progress: 87.3,
    color: '#22c55e'
  },
  {
    category: 'Customer Satisfaction',
    target: 4.5,
    current: 4.68,
    progress: 104,
    color: '#3b82f6'
  },
  {
    category: 'Transaction Count',
    target: 800,
    current: 712,
    progress: 89,
    color: '#f59e0b'
  },
  {
    category: 'Avg Transaction Value',
    target: 130,
    current: 127.45,
    progress: 98,
    color: '#8b5cf6'
  }
]

const salesByEmployee = staffMembers.map(staff => ({
  name: staff.name.split(' ')[0],
  sales: staff.salesThisMonth,
  goal: staff.salesGoal,
  achievement: (staff.salesThisMonth / staff.salesGoal) * 100
}))

const performanceCategories = [
  { name: 'Exceeding Goals', value: 3, color: '#22c55e' },
  { name: 'Meeting Goals', value: 2, color: '#3b82f6' },
  { name: 'Below Goals', value: 1, color: '#f59e0b' },
  { name: 'Needs Attention', value: 1, color: '#ef4444' }
]

export default function Staff() {
  const [selectedView] = useState('performance')
  console.log('Staff view:', selectedView);

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'top seller': return 'bg-green-100 text-green-800 border-green-200'
      case 'customer favorite': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'rising star': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'team leader': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'customer champion': return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'sales expert': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getGoalProgress = (current: number, target: number) => {
    return Math.round((current / target) * 100)
  }

  const CustomTooltip = ({ active, payload, label }: unknown) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: unknown, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 capitalize">
                {entry.dataKey}: {formatCurrency(entry.value)}
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
          <h1 className="text-3xl font-bold text-gray-900">Staff Performance</h1>
          <p className="text-gray-600 mt-1">
            Track team performance, goals, and recognition
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricsCard
          title="Team Members"
          value={staffMetrics.totalStaff}
          growth={8.3}
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description="Active staff members"
        />
        <MetricsCard
          title="Avg Sales per Staff"
          value={staffMetrics.avgSalesPerStaff}
          growth={15.2}
          trend="up"
          format="currency"
          icon={<DollarSign className="h-5 w-5" />}
          description="Monthly average"
        />
        <MetricsCard
          title="Top Performer Growth"
          value={staffMetrics.topPerformerGrowth}
          growth={12.5}
          trend="up"
          format="percent"
          icon={<Trophy className="h-5 w-5" />}
          description="Best performer this month"
          className="bg-gradient-to-br from-yellow-50 to-yellow-100"
        />
        <MetricsCard
          title="Team Goal Progress"
          value={staffMetrics.teamGoalProgress}
          growth={5.8}
          trend="up"
          format="percent"
          icon={<Target className="h-5 w-5" />}
          description="On track to meet targets"
          className="border-green-200 bg-green-50"
        />
      </div>

      {/* Team Goals Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {teamGoals.map((goal, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">{goal.category}</h3>
                <Badge 
                  variant={goal.progress >= 100 ? 'success' : goal.progress >= 90 ? 'warning' : 'secondary'}
                  className="font-medium"
                >
                  {goal.progress.toFixed(0)}%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium">
                    {goal.category.includes('Sales') || goal.category.includes('Value') 
                      ? formatCurrency(goal.current) 
                      : goal.category.includes('Satisfaction')
                      ? goal.current.toFixed(1) + '/5'
                      : formatNumber(goal.current)
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-medium">
                    {goal.category.includes('Sales') || goal.category.includes('Value')
                      ? formatCurrency(goal.target)
                      : goal.category.includes('Satisfaction')
                      ? goal.target.toFixed(1) + '/5'
                      : formatNumber(goal.target)
                    }
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(goal.progress, 100)}%`,
                      backgroundColor: goal.color
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Performance */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                Individual Sales Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesByEmployee}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="goal" fill="#e5e7eb" name="Goal" />
                  <Bar dataKey="sales" fill="#22c55e" name="Actual Sales" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={performanceCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {performanceCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {performanceCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-600">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium">{category.value} staff</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary-600" />
            Team Directory
            <Badge variant="secondary" className="ml-2">
              {staffMembers.length} members
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Staff Member</th>
                  <th className="text-left p-4 font-medium text-gray-900">Sales Performance</th>
                  <th className="text-left p-4 font-medium text-gray-900">Transactions</th>
                  <th className="text-left p-4 font-medium text-gray-900">Customer Rating</th>
                  <th className="text-left p-4 font-medium text-gray-900">Recognition</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((staff) => {
                  const goalProgress = getGoalProgress(staff.salesThisMonth, staff.salesGoal)
                  
                  return (
                    <tr key={staff.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{staff.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{staff.name}</h4>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span>{staff.role}</span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(staff.hireDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {formatCurrency(staff.salesThisMonth)}
                            </span>
                            <div className="flex items-center space-x-1">
                              {staff.trend === 'up' ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              <span className={`text-sm ${
                                staff.growth > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {staff.growth > 0 ? '+' : ''}{staff.growth}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                goalProgress >= 100 ? 'bg-green-500' :
                                goalProgress >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(goalProgress, 100)}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-600">
                            Goal: {formatCurrency(staff.salesGoal)} ({goalProgress}%)
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">{staff.transactions}</p>
                          <p className="text-sm text-gray-600">
                            Avg: {formatCurrency(staff.avgTransactionValue)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(staff.customerRating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {staff.customerRating}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {staff.badges.slice(0, 2).map((badge, index) => (
                            <Badge 
                              key={index} 
                              className={`text-xs ${getBadgeColor(badge)}`}
                            >
                              {badge}
                            </Badge>
                          ))}
                          {staff.badges.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{staff.badges.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          {goalProgress >= 100 && (
                            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                              <Award className="h-3 w-3 mr-1" />
                              Reward
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