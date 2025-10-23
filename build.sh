#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Set environment variables for build
export CI=false
export GENERATE_SOURCEMAP=false
export NODE_OPTIONS="--max-old-space-size=4096"

# Check Node.js version
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Clean any existing installations
echo "Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "Installing dependencies..."
npm install

# Verify critical dependencies
echo "Verifying react-scripts installation..."
if [ ! -f "node_modules/.bin/react-scripts" ]; then
    echo "react-scripts not found, installing explicitly..."
    npm install react-scripts@5.0.1 --save
fi

# List installed packages for debugging
echo "Checking installed packages..."
npm list react-scripts || echo "react-scripts not properly installed"

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
    exit 1
fi