#!/usr/bin/env node

// Verify that react-scripts is properly installed
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying dependencies...');

// Check if package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found!');
    process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Check if react-scripts is in dependencies
if (!packageJson.dependencies || !packageJson.dependencies['react-scripts']) {
    console.error('❌ react-scripts not found in dependencies!');
    process.exit(1);
}

console.log('✅ react-scripts found in dependencies:', packageJson.dependencies['react-scripts']);

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('⚠️  node_modules not found - dependencies need to be installed');
} else {
    console.log('✅ node_modules directory exists');

    // Check if react-scripts binary exists
    const reactScriptsPath = path.join(__dirname, 'node_modules', '.bin', 'react-scripts');
    if (fs.existsSync(reactScriptsPath)) {
        console.log('✅ react-scripts binary found');
    } else {
        console.log('⚠️  react-scripts binary not found in node_modules/.bin/');
    }
}

console.log('🎉 Dependency verification complete!');