import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  Package,
  Users,
  DollarSign,
  UserCheck,
  Home
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
    description: 'Dashboard overview'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    description: 'Sales analytics & trends'
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    description: 'Stock management & optimization'
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
    description: 'Customer segmentation & campaigns'
  },
  {
    name: 'Pricing',
    href: '/pricing',
    icon: DollarSign,
    description: 'Price optimization & competitor monitoring'
  },
  {
    name: 'Staff',
    href: '/staff',
    icon: UserCheck,
    description: 'Performance tracking & goals'
  }
]

interface NavigationProps {
  collapsed?: boolean
}

export default function Navigation({ collapsed = false }: NavigationProps) {
  const location = useLocation()

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.href || 
          (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
              'hover:bg-accent hover:text-accent-foreground card-hover',
              isActive 
                ? 'bg-primary/10 text-primary border-r-2 border-primary glass-effect neon-glow' 
                : 'text-muted-foreground hover:text-foreground',
              collapsed ? 'justify-center' : 'justify-start'
            )}
            title={collapsed ? item.description : undefined}
          >
            <Icon className={cn(
              'flex-shrink-0 w-5 h-5 transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
              collapsed ? '' : 'mr-3'
            )} />
            {!collapsed && (
              <span className="truncate">{item.name}</span>
            )}
            {!collapsed && isActive && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}