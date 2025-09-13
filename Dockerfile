# Multi-stage build for Node.js app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy source code from build stage
COPY --from=build /app/server.js ./

# Copy environment file
COPY .env .env

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]
