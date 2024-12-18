# Use Node.js to build the UI Package
FROM node:18-alpine AS builder

# Install curl and xdg-utils
RUN apk add --no-cache curl xdg-utils

# Set up pnpm global bin directory
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory for the UI package
WORKDIR /app

# Copy root-level pnpm workspace and lock files
# Copy root-level pnpm configuration
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Install dependencies for the specific package
RUN pnpm install  --frozen-lockfile

# Copy the UI package files (this should include the storybook app)
COPY . .

# Install the UI package dependencies (including Storybook)
WORKDIR /app/packages/ui
RUN pnpm install --frozen-lockfile  # Install dependencies for the UI package

# Run the build for Storybook (since it's in the UI package)
RUN pnpm build-storybook

# Final image to serve the static files using Nginx
FROM nginx:alpine

# Ensure the /app directory exists for the copy
RUN mkdir -p /usr/share/nginx/html

# Copy the built Storybook files to Nginx's serving directory
COPY --from=builder /app/packages/ui/storybook-static /usr/share/nginx/html

# Expose port 80 for HTTP and 6006 for Storybook
EXPOSE 80 6006

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
