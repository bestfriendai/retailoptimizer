// Stripe configuration for RetailOptimizer payments
// This is a template - replace with your actual Stripe keys

import { loadStripe, type Stripe } from '@stripe/stripe-js'

// Replace with your Stripe publishable key
const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_key_here'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey)
  }
  return stripePromise
}

// Stripe price IDs for subscription plans
export const STRIPE_PRICE_IDS = {
  starter: 'price_starter_monthly',
  professional: 'price_professional_monthly', 
  enterprise: 'price_enterprise_monthly'
}

// Helper function to create checkout session
export const createCheckoutSession = async (priceId: string, customerId?: string) => {
  // This would typically call your backend API to create a Stripe checkout session
  // For now, this is just a placeholder
  console.log('Creating checkout session for price:', priceId)
  
  // Example of what you'd send to your backend:
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      customerId,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/pricing`,
    }),
  })
  
  const session = await response.json()
  return session
}

export default getStripe