# Stage 1: Build the application
FROM node:20-alpine AS builder

# Add necessary build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (using regular npm install since package-lock.json might not exist yet)
RUN npm install --fetch-timeout=600000 --no-audit

# Copy source code
COPY . .

# Increase Node memory limit by setting NODE_OPTIONS before the build
ENV NODE_OPTIONS=--max_old_space_size=4096

# Build the TypeScript code
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

# Add production dependencies
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nodejs

WORKDIR /app

# Copy package files and install only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev --fetch-timeout=600000 --no-audit

# Copy built application
COPY --from=builder /app/dist ./dist

# Set proper ownership
RUN chown -R nodejs:nodejs /app

# Set environment variables
ENV NODE_ENV=production \
    PORT=8080 \
    HOST="0.0.0.0" \
    API_ENVIRONMENT=production

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8080

# Health check using /api/version endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/api/version || exit 1

# Start the application
CMD ["node", "dist/src/index.js"]
