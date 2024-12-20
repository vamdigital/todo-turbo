name: CI/CD for Dockerized Next.js App

on:
  push:
    branches:
      - master
    paths:
      - 'apps/web/**'
  pull_request:
    branches:
      - master
    paths:
      - 'apps/web/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout code
      - name: Checkout code
        uses: actions/checkout@v3

      # Step 2: Set up Docker Buildx (for multi-platform builds)
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      # Step 3: Cache Docker layers to speed up builds
      - name: Cache Docker layers
        uses: actions/cache@v3
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-

      # Step 4: Build Docker image for Next.js app
      - name: Build Docker Image for Next.js app
        run: |
          docker buildx build -t nextjs-app -f apps/web/Dockerfile .

      # Step 5: Push to Vercel Container Registry (Next.js)
      - name: Push to Vercel Container Registry (Next.js)
        run: |
          npx vercel container push nextjs-app vercel://${{ secrets.VERCEL_PROJECT_ID_NEXTJS }}
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN_NEXTJS }}

      # Step 6: Deploy Next.js app to Vercel
      - name: Deploy Next.js app to Vercel
        run: |
          npx vercel deploy --prebuilt --token ${{ secrets.VERCEL_TOKEN_NEXTJS }} --cwd=apps/web
