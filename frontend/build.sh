#!/bin/bash

# Build script for React deployment on Render
echo "Starting React build process..."

# Set environment variables for build
export NODE_OPTIONS="--max-old-space-size=4096"
export CI=false
export GENERATE_SOURCEMAP=false

# Check Node.js version
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Clean any existing installations
echo "Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies with clean install
echo "Installing dependencies with npm ci..."
npm ci

# Verify react-scripts is installed
echo "Verifying react-scripts installation..."
if [ ! -f "node_modules/.bin/react-scripts" ]; then
    echo "react-scripts not found, installing explicitly..."
    npm install react-scripts@5.0.1 --save
fi

# List installed packages for debugging
echo "Checking installed packages..."
npm list react-scripts || echo "react-scripts not properly installed"
npm list react || echo "React not properly installed"

# Build the application
echo "Building React application..."
npm run build

echo "React build completed successfully!"
if [ -d "build" ]; then
    echo "Build size:"
    du -sh build/ 2>/dev/null || echo "Could not calculate build size"
    
    echo "Build contents:"
    ls -la build/ 2>/dev/null || echo "Could not list build contents"
    
    echo "Static files:"
    ls -la build/static/ 2>/dev/null || echo "Could not list static files"
else
    echo "Warning: Build directory not found!"
    exit 1
fi