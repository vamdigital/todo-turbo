# use Node.js to build the UI Package
FROM node:18-alpine AS builder

# Install curl
RUN apk add --no-cache curl

# Install xdg-utils to open the browser
RUN apk add --no-cache xdg-utils

# Set up pnpm global bin directory
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Install pnpm globally
RUN npm install -g pnpm

# Create app directory
WORKDIR /app

# Copy root-level pnpm configuration
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Install dependencies for the specific package
RUN pnpm install  --frozen-lockfile


# Copy all files
COPY . .

RUN pnpm build-storybook --workspace ui

# Serve the static files using Nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80
