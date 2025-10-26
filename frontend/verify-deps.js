#!/usr/bin/env node

// Verify that React and react-scripts dependencies are properly installed
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying React dependencies...');

// Check if package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found!');
    process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Check critical dependencies
const criticalDeps = {
    dependencies: ['react', 'react-dom', 'react-scripts'],
    devDependencies: []
};

console.log('📦 Checking dependencies...');
criticalDeps.dependencies.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
        console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
        console.error(`❌ ${dep} not found in dependencies!`);
        process.exit(1);
    }
});

// Skip devDependencies check since we only need react-scripts in dependencies

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('⚠️  node_modules not found - dependencies need to be installed');
} else {
    console.log('✅ node_modules directory exists');

    // Check if react-scripts binary exists
    const reactScriptsPath = path.join(__dirname, 'node_modules', '.bin', 'react-scripts');
    const reactScriptsPathCmd = path.join(__dirname, 'node_modules', '.bin', 'react-scripts.cmd');
    if (fs.existsSync(reactScriptsPath) || fs.existsSync(reactScriptsPathCmd)) {
        console.log('✅ react-scripts binary found');
    } else {
        console.log('⚠️  react-scripts binary not found in node_modules/.bin/');
    }
}

// Check if package.json has correct scripts
if (packageJson.scripts && packageJson.scripts.build) {
    console.log('✅ Build script found:', packageJson.scripts.build);
} else {
    console.log('⚠️  Build script not found');
}

// Check if src/index.js exists
const indexJsPath = path.join(__dirname, 'src', 'index.js');
if (fs.existsSync(indexJsPath)) {
    console.log('✅ src/index.js found');
} else {
    console.log('⚠️  src/index.js not found');
}

console.log('🎉 React dependency verification complete!');