import React from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Shield,
  // Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Store
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: BarChart3,
    title: 'Sales Analytics & Forecasting',
    description: 'AI-powered seasonal trend analysis and revenue forecasting with 95% accuracy',
    highlight: 'Identify peak seasons and optimize inventory before demand spikes'
  },
  {
    icon: Package,
    title: 'Smart Inventory Management',
    description: 'Automated reorder points and stock optimization to prevent stockouts',
    highlight: 'Reduce carrying costs by 25% while maintaining 99% in-stock rates'
  },
  {
    icon: Users,
    title: 'Customer Segmentation',
    description: 'Advanced customer analytics with targeted marketing campaign tools',
    highlight: 'Increase customer lifetime value by 40% with personalized campaigns'
  },
  {
    icon: DollarSign,
    title: 'Dynamic Price Optimization',
    description: 'Real-time competitor monitoring and AI-suggested price adjustments',
    highlight: 'Boost margins by 15% while staying competitive in your market'
  },
  {
    icon: TrendingUp,
    title: 'Staff Performance Tracking',
    description: 'Individual sales metrics, goal tracking, and performance recognition',
    highlight: 'Motivate your team and identify top performers for better results'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance and data encryption',
    highlight: 'Your business data is protected with military-grade security'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Owner, Downtown Electronics',
    content: 'RetailOptimizer helped us increase revenue by 28% in just 3 months. The seasonal forecasting is incredibly accurate.',
    rating: 5,
    image: 'SC'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Manager, Sports Plus',
    content: 'The inventory management alone saved us $15K in carrying costs. Never running out of popular items anymore.',
    rating: 5,
    image: 'MR'
  },
  {
    name: 'Lisa Thompson',
    role: 'Owner, Fashion Boutique',
    content: 'Customer segmentation tools helped us launch targeted campaigns that doubled our email marketing ROI.',
    rating: 5,
    image: 'LT'
  }
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 89,
    description: 'Perfect for single-location independent retailers',
    features: [
      'Sales analytics dashboard',
      'Basic inventory management',
      'Customer database (up to 1,000)',
      'Email support',
      'Mobile app access'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    price: 149,
    description: 'Advanced features for growing retail businesses',
    features: [
      'Everything in Starter',
      'AI-powered forecasting',
      'Price optimization engine',
      'Advanced customer segmentation',
      'Staff performance tracking',
      'Priority phone support',
      'Custom reports'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'Full-featured solution for multi-location retailers',
    features: [
      'Everything in Professional',
      'Multi-location management',
      'Advanced integrations',
      'Custom dashboard builder',
      'Dedicated account manager',
      'White-label options',
      'API access'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const stats = [
  { label: 'Independent Retailers', value: '2,000+' },
  { label: 'Average Revenue Increase', value: '28%' },
  { label: 'Cost Savings', value: '$15K+' },
  { label: 'Customer Satisfaction', value: '4.9/5' }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RetailOptimizer</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Reviews</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Support</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Button asChild>
                <Link to="/dashboard">
                  Start Free Trial
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary-100 text-primary-800 border-primary-200">
                  ✨ Trusted by 2,000+ Independent Retailers
                </Badge>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Compete with Big Box Stores Using 
                  <span className="text-primary-600"> AI Analytics</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Turn your independent retail store into a data-driven powerhouse. Get the same 
                  analytics tools that big retailers use, designed specifically for your business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/dashboard">
                    Start Free 14-Day Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">$47.8K</div>
                    <div className="text-xs text-green-600">+28.5% vs last month</div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Customers</span>
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">1,247</div>
                    <div className="text-xs text-blue-600">+15.2% new customers</div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Inventory</span>
                      <Package className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">98.5%</div>
                    <div className="text-xs text-purple-600">In-stock rate</div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Profit Margin</span>
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">45.2%</div>
                    <div className="text-xs text-green-600">Optimized pricing</div>
                  </Card>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white p-4 rounded-full shadow-lg">
                <BarChart3 className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Optimize Your Retail Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get enterprise-level retail analytics without the enterprise complexity or cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 ml-4">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <p className="text-sm text-primary-800 font-medium">
                        💡 {feature.highlight}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Join Thousands of Successful Retailers
            </h2>
            <p className="text-xl text-gray-600">
              See how independent retailers are competing with big box stores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{testimonial.image}</span>
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No setup fees. No long-term contracts. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`p-8 relative ${
                plan.popular ? 'ring-2 ring-primary-600 shadow-lg' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-0">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600 text-lg">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full text-lg py-6 ${
                      plan.popular 
                        ? 'bg-primary-600 hover:bg-primary-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    asChild
                  >
                    <Link to="/dashboard">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Retail Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join 2,000+ independent retailers who've increased their revenue by an average of 28%
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/dashboard">
                Start Your Free 14-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center text-primary-100">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">RetailOptimizer</span>
              </div>
              <p className="text-gray-400">
                Empowering independent retailers with enterprise-level analytics.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Sales</a></li>
                <li><a href="#" className="hover:text-white">System Status</a></li>
                <li><a href="#" className="hover:text-white">Training</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-400">
              © 2024 RetailOptimizer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}