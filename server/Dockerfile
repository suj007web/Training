# Use official Node.js 22 image
FROM node:22.18.0-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend app
COPY . .

# Build the NestJS app
RUN npm run build

# Expose port (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
