// Firebase configuration for RetailOptimizer
// This is a template - replace with your actual Firebase config

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  // Replace with your Firebase project configuration
  apiKey: "your-api-key-here",
  authDomain: "retailoptimizer.firebaseapp.com",
  projectId: "retailoptimizer",
  storageBucket: "retailoptimizer.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-ABCD123456"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export default app