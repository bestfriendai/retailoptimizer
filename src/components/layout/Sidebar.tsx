import React from 'react'
import { ChevronLeft, Store, HelpCircle, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navigation from './Navigation'
import { cn } from '@/lib/utils'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  open: boolean
}

export default function Sidebar({ collapsed, onToggle, open }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        "lg:relative lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={cn(
            "flex items-center space-x-3 transition-opacity duration-200",
            collapsed ? "opacity-0" : "opacity-100"
          )}>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">RetailOptimizer</h1>
              <p className="text-xs text-gray-500">Downtown Store #1</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              "hidden lg:flex transition-transform duration-200",
              collapsed && "rotate-180"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <Navigation collapsed={collapsed} />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-600 hover:text-gray-900",
              collapsed ? "justify-center px-2" : "justify-start"
            )}
            title={collapsed ? "Help & Support" : undefined}
          >
            <HelpCircle className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
            {!collapsed && "Help & Support"}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-gray-600 hover:text-red-600",
              collapsed ? "justify-center px-2" : "justify-start"
            )}
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
            {!collapsed && "Sign Out"}
          </Button>
        </div>
      </div>
    </>
  )
}