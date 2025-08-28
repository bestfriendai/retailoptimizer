import { BackendService, DefaultConfigs } from '../../../shared/src/backend/backend-service'
import type { BackendConfig } from '../../../shared/src/backend/backend-service'

// RetailOptimizer-specific backend configuration
const retailOptimizerConfig: BackendConfig = {
  appName: 'retailoptimizer',
  ...DefaultConfigs.retail,
  firebase: {
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'retailoptimizer-production',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'retailoptimizer-production.firebaseapp.com',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'retailoptimizer-production.appspot.com',
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://retailoptimizer-production-default-rtdb.firebaseio.com/'
  },
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  }
}

// Initialize backend service
let backendService: BackendService | null = null

export const initializeRetailOptimizerBackend = async () => {
  if (!backendService) {
    backendService = await BackendService.create(retailOptimizerConfig)
  }
  return backendService
}

export const getRetailOptimizerBackend = () => {
  if (!backendService) {
    throw new Error('RetailOptimizer backend not initialized. Call initializeRetailOptimizerBackend first.')
  }
  return backendService
}

// RetailOptimizer-specific service methods
export class RetailOptimizerService {
  private backend: BackendService

  constructor(backend: BackendService) {
    this.backend = backend
  }

  // Product Management
  async createProduct(productData: unknown) {
    try {
      // Upload product images if any
      const uploadedImages = []
      if (productData.images) {
        for (const image of productData.images) {
          const uploadResult = await this.backend.storage.uploadFile(image, {
            userId: productData.userId,
            folder: 'product-images',
            tags: ['product', productData.category],
            isPublic: true
          })
          uploadedImages.push(uploadResult.url)
        }
      }

      const response = await this.backend.api.post('/products', {
        ...productData,
        images: uploadedImages
      })
      
      // Trigger inventory sync if connected to POS
      if (response.success && productData.posIntegration) {
        await this.syncWithPOS('products')
      }
      
      return response
    } catch (error) {
      console.error('Create product error:', error)
      throw error
    }
  }

  async updateInventory(productId: string, inventoryUpdate: unknown) {
    try {
      const response = await this.backend.api.patch(`/products/${productId}/inventory`, inventoryUpdate)
      
      // Check for low stock alerts
      if (response.data.currentStock <= response.data.lowStockThreshold) {
        await this.backend.notifications.createNotification({
          userId: inventoryUpdate.userId,
          type: 'warning',
          title: 'Low Stock Alert',
          message: `${response.data.name} is running low on stock (${response.data.currentStock} remaining).`,
          category: 'system',
          priority: 'medium',
          actionUrl: `/products/${productId}`,
          metadata: { productId, currentStock: response.data.currentStock }
        })
      }
      
      return response
    } catch (error) {
      console.error('Update inventory error:', error)
      throw error
    }
  }

  // Order Management
  async processOrder(orderData: unknown) {
    try {
      const response = await this.backend.integrations?.industry.processOrder(orderData)
      
      // Send order confirmation email
      if (response.success) {
        await this.backend.notifications.sendTemplateEmail(
          'order_confirmation',
          [orderData.customerEmail],
          {
            orderNumber: response.data.orderNumber,
            total: response.data.total,
            items: response.data.items
          }
        )
        
        // Update inventory for ordered items
        await this.updateInventoryForOrder(response.data.items)
      }
      
      return response
    } catch (error) {
      console.error('Process order error:', error)
      throw error
    }
  }

  private async updateInventoryForOrder(items: unknown[]) {
    try {
      const inventoryUpdates = items.map(item => ({
        productId: item.productId,
        quantity: -item.quantity // Decrease inventory
      }))
      
      await this.backend.integrations?.industry.updateInventory({ updates: inventoryUpdates })
    } catch (error) {
      console.error('Update inventory for order error:', error)
    }
  }

  // Customer Management
  async createCustomer(customerData: unknown) {
    try {
      const response = await this.backend.api.post('/customers', customerData)
      
      // Send welcome email and add to marketing automation
      if (response.success) {
        await this.backend.integrations?.industry.triggerMarketingCampaign({
          campaignType: 'welcome_series',
          customerId: response.data.id,
          triggerData: customerData
        })
      }
      
      return response
    } catch (error) {
      console.error('Create customer error:', error)
      throw error
    }
  }

  async processLoyaltyTransaction(customerId: string, transactionData: unknown) {
    try {
      return await this.backend.integrations?.industry.processLoyaltyTransaction({
        customerId,
        ...transactionData
      })
    } catch (error) {
      console.error('Process loyalty transaction error:', error)
      throw error
    }
  }

  // Analytics and Insights
  async getSalesAnalytics(storeId: string, dateRange: { start: Date; end: Date }) {
    try {
      return await this.backend.integrations?.industry.getAnalytics(dateRange)
    } catch (error) {
      console.error('Get sales analytics error:', error)
      throw error
    }
  }

  async getCustomerInsights(customerId: string) {
    try {
      const customerData = await this.backend.api.get(`/customers/${customerId}`)
      const orderHistory = await this.backend.api.get(`/customers/${customerId}/orders`)
      
      // Generate AI-powered insights
      const insights = await this.backend.integrations?.ai.generatePredictions({
        modelType: 'churn_prediction',
        inputData: {
          customer: customerData.data,
          orders: orderHistory.data
        }
      })
      
      return {
        customer: customerData.data,
        insights: insights?.data
      }
    } catch (error) {
      console.error('Get customer insights error:', error)
      throw error
    }
  }

  // Dynamic Pricing
  async calculateOptimalPrice(productId: string, context: unknown) {
    try {
      return await this.backend.integrations?.industry.calculateDynamicPricing({
        productId,
        ...context
      })
    } catch (error) {
      console.error('Calculate optimal price error:', error)
      throw error
    }
  }

  // POS Integration
  async syncWithPOS(dataType: 'products' | 'orders' | 'customers' | 'inventory' = 'orders') {
    console.log('Syncing with POS:', dataType);
    try {
      const posSystem = 'square' // This would come from store settings
      const storeId = 'store-123' // This would come from user context
      
      return await this.backend.integrations?.industry.syncPOSTransactions({
        posSystem: posSystem as 'square' | 'toast' | 'lightspeed',
        storeId,
        dateRange: {
          start: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          end: new Date()
        }
      })
    } catch (error) {
      console.error('Sync with POS error:', error)
      throw error
    }
  }

  // E-commerce Integration
  async syncEcommerceData(platform: string, dataTypes: string[] = ['orders']) {
    try {
      const storeId = 'store-123' // This would come from user context
      
      return await this.backend.integrations?.industry.syncEcommerce({
        platform: platform as 'shopify' | 'woocommerce' | 'bigcommerce',
        storeId,
        dataTypes: dataTypes as ('products' | 'orders' | 'customers')[]
      })
    } catch (error) {
      console.error('Sync e-commerce data error:', error)
      throw error
    }
  }

  // Demand Forecasting
  async generateDemandForecast(productId: string, timeHorizon: number = 30) {
    try {
      const productData = await this.backend.api.get(`/products/${productId}`)
      const salesHistory = await this.backend.api.get(`/products/${productId}/sales-history`)
      
      return await this.backend.integrations?.ai.generatePredictions({
        modelType: 'demand_forecasting',
        inputData: {
          product: productData.data,
          salesHistory: salesHistory.data
        },
        timeHorizon
      })
    } catch (error) {
      console.error('Generate demand forecast error:', error)
      throw error
    }
  }

  // Supplier Management
  async createPurchaseOrder(supplierData: unknown) {
    try {
      return await this.backend.integrations?.industry.createPurchaseOrder(supplierData)
    } catch (error) {
      console.error('Create purchase order error:', error)
      throw error
    }
  }

  // Marketing Automation
  async setupAbandonedCartRecovery(customerId: string, cartData: unknown) {
    try {
      return await this.backend.integrations?.industry.triggerMarketingCampaign({
        campaignType: 'abandoned_cart',
        customerId,
        triggerData: cartData
      })
    } catch (error) {
      console.error('Setup abandoned cart recovery error:', error)
      throw error
    }
  }

  // Product Recommendations
  async getProductRecommendations(customerId: string, context: unknown = {}) {
    try {
      return await this.backend.integrations?.ai.getRecommendations({
        userId: customerId,
        itemType: 'products',
        count: 10,
        filters: context
      })
    } catch (error) {
      console.error('Get product recommendations error:', error)
      throw error
    }
  }

  // Competitor Analysis
  async analyzeCompetitorPricing(productIds: string[]) {
    try {
      // This would integrate with price monitoring services
      const competitorData = await this.backend.api.post('/analytics/competitor-pricing', {
        productIds
      })
      
      return competitorData
    } catch (error) {
      console.error('Analyze competitor pricing error:', error)
      throw error
    }
  }
}

// Export initialized service
export const getRetailOptimizerService = async () => {
  const backend = await initializeRetailOptimizerBackend()
  return new RetailOptimizerService(backend)
}

// React hooks for RetailOptimizer
export const useRetailOptimizerAuth = () => {
  const backend = getRetailOptimizerBackend()
  return {
    signIn: backend.signIn.bind(backend),
    signUp: backend.signUp.bind(backend),
    signOut: backend.signOut.bind(backend),
    getCurrentUser: backend.getCurrentUser.bind(backend),
    getCurrentUserProfile: backend.getCurrentUserProfile.bind(backend),
    onAuthStateChanged: backend.onAuthStateChanged.bind(backend)
  }
}

export const useRetailOptimizerNotifications = (userId: string) => {
  const backend = getRetailOptimizerBackend()
  return {
    getUserNotifications: (options?: unknown) => backend.getUserNotifications(userId, options),
    createNotification: backend.createNotification.bind(backend),
    onNotificationsChange: (callback: unknown) => backend.onNotificationsChange(userId, callback)
  }
}

export const useRetailOptimizerStorage = () => {
  const backend = getRetailOptimizerBackend()
  return {
    uploadFile: backend.uploadFile.bind(backend),
    getUserFiles: backend.getUserFiles.bind(backend),
    deleteFile: backend.deleteFile.bind(backend)
  }
}

export const useRetailOptimizerPayments = () => {
  const backend = getRetailOptimizerBackend()
  return {
    createCheckoutSession: backend.createCheckoutSession.bind(backend),
    createPortalSession: backend.createPortalSession.bind(backend),
    getUserSubscription: backend.getUserSubscription.bind(backend)
  }
}

// Default export
export default {
  initializeRetailOptimizerBackend,
  getRetailOptimizerBackend,
  getRetailOptimizerService,
  useRetailOptimizerAuth,
  useRetailOptimizerNotifications,
  useRetailOptimizerStorage,
  useRetailOptimizerPayments
}