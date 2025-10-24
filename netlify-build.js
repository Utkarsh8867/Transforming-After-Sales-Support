#!/usr/bin/env node

// Netlify build script to ensure dependencies are properly installed
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Netlify build process...');

// Set environment variables for build
process.env.CI = 'false';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

try {
    console.log('📦 Node.js version:', process.version);
    console.log('📦 npm version:', execSync('npm --version', { encoding: 'utf8' }).trim());

    // Install dependencies with legacy peer deps to avoid conflicts
    console.log('📥 Installing dependencies...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

    // Verify react-scripts is available
    const reactScriptsPath = path.join(__dirname, 'node_modules', '.bin', 'react-scripts');
    if (!fs.existsSync(reactScriptsPath)) {
        console.log('⚠️  react-scripts not found, installing explicitly...');
        execSync('npm install react-scripts@5.0.1', { stdio: 'inherit' });
    }

    // Run the build
    console.log('🔨 Building React application...');
    execSync('npm run build', { stdio: 'inherit' });

    // Verify build output
    const buildPath = path.join(__dirname, 'build');
    if (fs.existsSync(buildPath)) {
        console.log('✅ Build completed successfully!');
        console.log('📁 Build directory contents:');
        const buildContents = fs.readdirSync(buildPath);
        buildContents.forEach(file => console.log(`   - ${file}`));
    } else {
        throw new Error('Build directory not found');
    }

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}