#!/bin/bash

# Build script for Vite + React deployment
echo "Starting Vite build process..."

# Set environment variables for build
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
echo "Verifying Vite installation..."
if [ ! -f "node_modules/.bin/vite" ]; then
    echo "Vite not found, installing explicitly..."
    npm install vite@^4.4.5 --save-dev
fi

# List installed packages for debugging
echo "Checking installed packages..."
npm list vite || echo "Vite not properly installed"
npm list react || echo "React not properly installed"

# Build the application with Vite
echo "Building React + Vite application..."
npm run build

echo "Vite build completed successfully!"
if [ -d "build" ]; then
    echo "Build size:"
    du -sh build/ 2>/dev/null || echo "Could not calculate build size"
    
    echo "Build contents:"
    ls -la build/ 2>/dev/null || echo "Could not list build contents"
    
    echo "Assets directory:"
    ls -la build/assets/ 2>/dev/null || echo "Could not list assets"
else
    echo "Warning: Build directory not found!"
    exit 1
fi