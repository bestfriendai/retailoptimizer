#!/bin/bash

echo "🚀 Setting up RetailOptimizer Premium UI..."

# Kill any running dev servers
pkill -f "npm run dev" 2>/dev/null

# Install dependencies
echo "📦 Installing premium UI dependencies..."
npm install @tabler/icons-react mini-svg-data-uri motion react-use tailwindcss-animate three @types/three @react-three/fiber @react-three/drei

# Update index.css with enhanced styles
echo "🎨 Enhanced CSS already in place..."

# Start the dev server
echo "🏃 Starting development server..."
npm run dev

echo "✨ RetailOptimizer Premium is ready!"
echo "🌐 Visit http://localhost:5173 to see your premium retail analytics platform"