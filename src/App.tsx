import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Pricing from './pages/Pricing'
import Staff from './pages/Staff'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Landing />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="customers" element={<Customers />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="staff" element={<Staff />} />
          </Route>

          {/* Alternative dashboard routes for easier navigation */}
          <Route path="/analytics" element={<Layout />}>
            <Route index element={<Analytics />} />
          </Route>
          <Route path="/inventory" element={<Layout />}>
            <Route index element={<Inventory />} />
          </Route>
          <Route path="/customers" element={<Layout />}>
            <Route index element={<Customers />} />
          </Route>
          <Route path="/pricing" element={<Layout />}>
            <Route index element={<Pricing />} />
          </Route>
          <Route path="/staff" element={<Layout />}>
            <Route index element={<Staff />} />
          </Route>
          
          {/* Catch all route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App