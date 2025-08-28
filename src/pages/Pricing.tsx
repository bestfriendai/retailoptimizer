import React, { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye,
  // Target,
  Zap,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import MetricsCard from '@/components/dashboard/MetricsCard'
import { formatCurrency } from '@/lib/utils'

// Utility function
// const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`

// Mock data for price optimization
const pricingMetrics = {
  avgMargin: 45.2,
  competitiveProducts: 156,
  priceOpportunities: 23,
  revenueImpact: 15200
}

const priceOptimizations = [
  {
    id: 1,
    productName: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    currentPrice: 89.99,
    suggestedPrice: 94.99,
    competitorAvg: 95.50,
    expectedImpact: 8.5,
    confidence: 92,
    reason: 'Competitor pricing allows for increase',
    status: 'recommended',
    monthlyVolume: 47,
    category: 'Electronics'
  },
  {
    id: 2,
    productName: 'USB-C Charging Cable',
    sku: 'USC-203',
    currentPrice: 24.99,
    suggestedPrice: 22.99,
    competitorAvg: 21.50,
    expectedImpact: -3.2,
    confidence: 87,
    reason: 'Price decrease to match market',
    status: 'urgent',
    monthlyVolume: 234,
    category: 'Electronics'
  },
  {
    id: 3,
    productName: 'Smartphone Case - iPhone 15',
    sku: 'SPC-I15',
    currentPrice: 34.99,
    suggestedPrice: 39.99,
    competitorAvg: 42.00,
    confidence: 95,
    expectedImpact: 12.8,
    reason: 'High demand, low competition',
    status: 'high-impact',
    monthlyVolume: 89,
    category: 'Accessories'
  },
  {
    id: 4,
    productName: 'Power Bank 10000mAh',
    sku: 'PB-10K',
    currentPrice: 49.99,
    suggestedPrice: 47.99,
    competitorAvg: 46.50,
    expectedImpact: -1.8,
    confidence: 78,
    reason: 'Competitive pressure',
    status: 'monitor',
    monthlyVolume: 67,
    category: 'Electronics'
  }
]

const competitorData = [
  {
    id: 1,
    competitor: 'TechMart',
    productsTracked: 45,
    avgPriceDiff: 2.3,
    lastUpdated: '2024-08-19T10:30:00',
    status: 'active',
    reliability: 'high'
  },
  {
    id: 2,
    competitor: 'ElectroWorld',
    productsTracked: 67,
    avgPriceDiff: -1.8,
    lastUpdated: '2024-08-19T09:15:00',
    status: 'active',
    reliability: 'high'
  },
  {
    id: 3,
    competitor: 'GadgetPlus',
    productsTracked: 34,
    avgPriceDiff: 5.7,
    lastUpdated: '2024-08-19T08:45:00',
    status: 'active',
    reliability: 'medium'
  },
  {
    id: 4,
    competitor: 'MobileHub',
    productsTracked: 23,
    avgPriceDiff: -3.2,
    lastUpdated: '2024-08-18T16:20:00',
    status: 'warning',
    reliability: 'low'
  }
]

const priceHistory = [
  {
    date: '2024-08-12',
    product: 'Wireless Bluetooth Headphones',
    oldPrice: 87.99,
    newPrice: 89.99,
    reason: 'Market adjustment',
    impact: '+5.2% revenue'
  },
  {
    date: '2024-08-10',
    product: 'USB-C Charging Cable',
    oldPrice: 26.99,
    newPrice: 24.99,
    reason: 'Competitor matching',
    impact: '+12% volume'
  },
  {
    date: '2024-08-08',
    product: 'Power Bank 10000mAh',
    oldPrice: 52.99,
    newPrice: 49.99,
    reason: 'Promotion launch',
    impact: '+18% sales'
  }
]

export default function Pricing() {
  const [selectedTab, setSelectedTab] = useState('optimization')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-green-100 text-green-800 border-green-200'
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high-impact': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'monitor': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCompetitorStatus = (status: string) => {
    switch (status) {
      case 'active': return { color: 'success', text: 'Active', icon: CheckCircle }
      case 'warning': return { color: 'warning', text: 'Warning', icon: AlertTriangle }
      case 'error': return { color: 'destructive', text: 'Error', icon: XCircle }
      default: return { color: 'secondary', text: 'Unknown', icon: AlertTriangle }
    }
  }

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (diffHours > 0) return `${diffHours}h ${diffMinutes}m ago`
    return `${diffMinutes}m ago`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Price Optimization</h1>
          <p className="text-gray-600 mt-1">
            AI-powered pricing strategies and competitor monitoring
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Prices
          </Button>
          <Button size="sm">
            <Target className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricsCard
          title="Average Margin"
          value={pricingMetrics.avgMargin}
          growth={2.8}
          trend="up"
          format="percent"
          icon={<DollarSign className="h-5 w-5" />}
          description="Healthy profit margins"
        />
        <MetricsCard
          title="Products Monitored"
          value={pricingMetrics.competitiveProducts}
          growth={15.2}
          trend="up"
          icon={<Eye className="h-5 w-5" />}
          description="Active competitor tracking"
        />
        <MetricsCard
          title="Price Opportunities"
          value={pricingMetrics.priceOpportunities}
          growth={-8.3}
          trend="down"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Optimization suggestions"
          className="border-yellow-200 bg-yellow-50"
        />
        <MetricsCard
          title="Revenue Impact"
          value={pricingMetrics.revenueImpact}
          growth={22.1}
          trend="up"
          format="currency"
          icon={<Target className="h-5 w-5" />}
          description="Potential monthly gain"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('optimization')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'optimization'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Price Optimization
        </button>
        <button
          onClick={() => setSelectedTab('competitors')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'competitors'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Competitor Monitoring
        </button>
        <button
          onClick={() => setSelectedTab('history')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'history'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Price History
        </button>
      </div>

      {selectedTab === 'optimization' && (
        <div className="space-y-6">
          {/* AI Insights Banner */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    AI Pricing Insights
                  </h3>
                  <p className="text-blue-800 mb-3">
                    Based on market analysis, demand patterns, and competitor data, we've identified 23 pricing optimization opportunities that could increase your monthly revenue by {formatCurrency(pricingMetrics.revenueImpact)}.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">12 price increases recommended</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">8 price decreases suggested</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">3 monitoring required</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Apply All High-Confidence
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price Optimization Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary-600" />
                Price Optimization Recommendations
                <Badge variant="secondary" className="ml-2">
                  {priceOptimizations.length} products
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-900">Product</th>
                      <th className="text-left p-4 font-medium text-gray-900">Current Price</th>
                      <th className="text-left p-4 font-medium text-gray-900">Suggested Price</th>
                      <th className="text-left p-4 font-medium text-gray-900">Market Avg</th>
                      <th className="text-left p-4 font-medium text-gray-900">Impact</th>
                      <th className="text-left p-4 font-medium text-gray-900">Confidence</th>
                      <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceOptimizations.map((optimization) => (
                      <tr key={optimization.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{optimization.productName}</h4>
                            <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                              <span>SKU: {optimization.sku}</span>
                              <Badge variant="outline" className="text-xs">
                                {optimization.category}
                              </Badge>
                              <Badge className={getStatusColor(optimization.status)}>
                                {optimization.status.replace('-', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900">
                            {formatCurrency(optimization.currentPrice)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {formatCurrency(optimization.suggestedPrice)}
                            </span>
                            {optimization.suggestedPrice > optimization.currentPrice ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-900">
                            {formatCurrency(optimization.competitorAvg)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`font-medium ${
                            optimization.expectedImpact > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {optimization.expectedImpact > 0 ? '+' : ''}{optimization.expectedImpact.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  optimization.confidence >= 90 ? 'bg-green-500' :
                                  optimization.confidence >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${optimization.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {optimization.confidence}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                            <Button 
                              size="sm" 
                              className={
                                optimization.status === 'urgent' ? 'bg-red-600 hover:bg-red-700' :
                                optimization.status === 'high-impact' ? 'bg-blue-600 hover:bg-blue-700' :
                                'bg-primary-600 hover:bg-primary-700'
                              }
                            >
                              Apply
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'competitors' && (
        <div className="space-y-6">
          {/* Competitor Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {competitorData.map((competitor) => {
              const statusInfo = getCompetitorStatus(competitor.status)
              const StatusIcon = statusInfo.icon

              return (
                <Card key={competitor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{competitor.competitor}</h3>
                      <Badge variant={statusInfo.color as 'default' | 'secondary' | 'destructive' | 'outline'}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.text}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Products:</span>
                        <span className="font-medium">{competitor.productsTracked}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg Diff:</span>
                        <span className={`font-medium ${
                          competitor.avgPriceDiff > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {competitor.avgPriceDiff > 0 ? '+' : ''}{competitor.avgPriceDiff.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Updated:</span>
                        <span className="text-sm">{getTimeSince(competitor.lastUpdated)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reliability:</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            competitor.reliability === 'high' ? 'text-green-600 border-green-200' :
                            competitor.reliability === 'medium' ? 'text-yellow-600 border-yellow-200' :
                            'text-red-600 border-red-200'
                          }`}
                        >
                          {competitor.reliability}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Competitor Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                Competitor Price Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900">
                        ElectroWorld dropped USB-C Cable price by 12%
                      </h4>
                      <p className="text-red-700 text-sm mt-1">
                        Their price is now $21.50 vs our $24.99 - Consider price adjustment
                      </p>
                      <p className="text-red-600 text-xs mt-2">2 hours ago</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                      Review
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-yellow-900">
                        TechMart increased Bluetooth Headphones price
                      </h4>
                      <p className="text-yellow-700 text-sm mt-1">
                        Price went from $89 to $97 - Opportunity to increase our price
                      </p>
                      <p className="text-yellow-600 text-xs mt-2">4 hours ago</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">
                      Analyze
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900">
                        New competitor detected: MobileTech Pro
                      </h4>
                      <p className="text-blue-700 text-sm mt-1">
                        Found 23 overlapping products - Adding to monitoring list
                      </p>
                      <p className="text-blue-600 text-xs mt-2">6 hours ago</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'history' && (
        <div className="space-y-6">
          {/* Price Change History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-primary-600" />
                Recent Price Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priceHistory.map((change, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{change.product}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{change.date}</span>
                        <span className="flex items-center">
                          {formatCurrency(change.oldPrice)} → {formatCurrency(change.newPrice)}
                          {change.newPrice > change.oldPrice ? (
                            <TrendingUp className="h-3 w-3 ml-1 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 ml-1 text-red-600" />
                          )}
                        </span>
                        <span>{change.reason}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="success" className="font-medium">
                        {change.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}