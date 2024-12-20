# Use official Node.js image as the base
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json, lockfile, and pnpm workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile

# Copy the application code
COPY . .

# Build the application
RUN pnpm build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port and run the server
EXPOSE 3000
CMD ["pnpm", "--filter", "web", "start"]

