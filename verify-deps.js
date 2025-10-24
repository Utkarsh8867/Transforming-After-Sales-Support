#!/usr/bin/env node

// Verify that Vite and React dependencies are properly installed
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Vite + React dependencies...');

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
    dependencies: ['react', 'react-dom'],
    devDependencies: ['vite', '@vitejs/plugin-react']
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

console.log('🛠️  Checking devDependencies...');
criticalDeps.devDependencies.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
        console.log(`✅ ${dep}: ${packageJson.devDependencies[dep]}`);
    } else {
        console.error(`❌ ${dep} not found in devDependencies!`);
        process.exit(1);
    }
});

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('⚠️  node_modules not found - dependencies need to be installed');
} else {
    console.log('✅ node_modules directory exists');

    // Check if Vite binary exists
    const vitePath = path.join(__dirname, 'node_modules', '.bin', 'vite');
    const vitePathCmd = path.join(__dirname, 'node_modules', '.bin', 'vite.cmd');
    if (fs.existsSync(vitePath) || fs.existsSync(vitePathCmd)) {
        console.log('✅ Vite binary found');
    } else {
        console.log('⚠️  Vite binary not found in node_modules/.bin/');
    }
}

// Check if vite.config.js exists
const viteConfigPath = path.join(__dirname, 'vite.config.js');
if (fs.existsSync(viteConfigPath)) {
    console.log('✅ vite.config.js found');
} else {
    console.log('⚠️  vite.config.js not found');
}

// Check if main.jsx exists
const mainJsxPath = path.join(__dirname, 'src', 'main.jsx');
if (fs.existsSync(mainJsxPath)) {
    console.log('✅ src/main.jsx found');
} else {
    console.log('⚠️  src/main.jsx not found');
}

console.log('🎉 Vite + React dependency verification complete!');