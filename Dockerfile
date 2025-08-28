# Multi-stage Docker build for SaaS Empire applications
# This template can be copied to each application directory

# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Add metadata
LABEL org.opencontainers.image.title="SaaS Empire Application"
LABEL org.opencontainers.image.description="Production-ready SaaS application"
LABEL org.opencontainers.image.version="1.0.0"

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies with clean npm cache
RUN npm ci --only=production --no-audit --no-fund && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.25-alpine AS production

# Install security updates
RUN apk update && apk upgrade && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S saas && \
    adduser -S saas -u 1001

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Set proper permissions
RUN chown -R saas:saas /usr/share/nginx/html && \
    chown -R saas:saas /var/cache/nginx && \
    chown -R saas:saas /var/log/nginx && \
    chown -R saas:saas /etc/nginx/conf.d

# Switch to non-root user
USER saas

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]