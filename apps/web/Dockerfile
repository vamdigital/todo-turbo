# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY pnpm-lock.yaml package.json turbo.json ./
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY packages ./packages
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile

# Expose Next.js port
EXPOSE 3000

# Start Next.js in development mode
CMD ["pnpm", "--filter", "web", "start"]
