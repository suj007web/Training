# Use Node.js 22 for build
FROM node:22.18.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of app and build
COPY . .
RUN npm run build

# ================================
# Use a lighter image for serving
FROM node:22.18.0-alpine AS runner

WORKDIR /app

# Only copy built output & deps
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3001

# Start the Next.js app
CMD ["npm", "start"]
