#!/usr/bin/env node

// Render build script to ensure react-scripts is available
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Render build process...');

// Set environment variables
process.env.CI = 'false';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

try {
    // Check if react-scripts is available
    const reactScriptsPath = path.join(__dirname, 'node_modules', '.bin', 'react-scripts');
    const reactScriptsExists = fs.existsSync(reactScriptsPath) || fs.existsSync(reactScriptsPath + '.cmd');

    if (!reactScriptsExists) {
        console.log('⚠️  react-scripts not found, installing...');
        execSync('npm install react-scripts@5.0.1', { stdio: 'inherit' });
    } else {
        console.log('✅ react-scripts found');
    }

    // Run the build
    console.log('🔨 Building React application...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('✅ Build completed successfully!');

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}