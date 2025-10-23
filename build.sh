#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Set environment variables for build
export CI=false
export GENERATE_SOURCEMAP=false
export NODE_OPTIONS="--max-old-space-size=4096"

# Clean any existing node_modules and package-lock
echo "Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies with clean install
echo "Installing dependencies with npm ci..."
npm ci

# Verify react-scripts is installed
echo "Verifying react-scripts installation..."
if [ ! -f "node_modules/.bin/react-scripts" ]; then
    echo "react-scripts not found, installing explicitly..."
    npm install react-scripts@5.0.1
fi

# Build the application
echo "Building React application..."
npm run build

echo "Build completed successfully!"
if [ -d "build" ]; then
    echo "Build size:"
    du -sh build/ 2>/dev/null || echo "Could not calculate build size"
    
    echo "Build contents:"
    ls -la build/ 2>/dev/null || echo "Could not list build contents"
else
    echo "Warning: Build directory not found!"
fi