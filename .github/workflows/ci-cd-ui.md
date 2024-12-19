name: CI/CD for Dockerized UI Package

on:
  push:
    branches:
      - master
    paths:
      - 'packages/ui/**'
  pull_request:
    branches:
      - master
    paths:
      - 'packages/ui/**'

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

      # Step 4: Build Docker image for UI package
      - name: Build Docker Image for UI Package
        run: |
          docker buildx build -t ui-package -f packages/ui/Dockerfile .

      # Step 5: Push to Vercel Container Registry (UI Package)
      - name: Push to Vercel Container Registry (UI Package)
        run: |
          npx vercel container push ui-package vercel://${{ secrets.VERCEL_PROJECT_ID_UI }}
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN_UI }}

      # Step 6: Deploy UI package to Vercel
      - name: Deploy UI Package to Vercel
        run: |
          npx vercel deploy --prebuilt --token ${{ secrets.VERCEL_TOKEN_UI }} --cwd=packages/ui
