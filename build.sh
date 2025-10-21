#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Set environment variables for build
export CI=false
export GENERATE_SOURCEMAP=false
export NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building React application..."
npm run build

echo "Build completed successfully!"
echo "Build size:"
du -sh build/

# List build contents
echo "Build contents:"
ls -la build/