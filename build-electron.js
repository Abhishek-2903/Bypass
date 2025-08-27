#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Electron build process...\n');

// Function to run commands with error handling
function runCommand(command, description) {
  console.log(`📋 ${description}...`);
  console.log(`   Command: ${command}\n`);
  
  try {
    execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd(),
      env: { 
        ...process.env, 
        NODE_ENV: 'production',
        ELECTRON: 'true'
      }
    });
    console.log(`✅ ${description} completed successfully\n`);
  } catch (error) {
    console.error(`❌ ${description} failed:`);
    console.error(error.message);
    process.exit(1);
  }
}

// Function to check if file exists
function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description} found at: ${filePath}`);
  } else {
    console.warn(`⚠️  ${description} not found at: ${filePath}`);
  }
}

// Function to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Check prerequisites
console.log('🔍 Checking prerequisites...\n');

// Check if Python is available
try {
  execSync('python --version', { stdio: 'pipe' });
  console.log('✅ Python is available');
} catch (error) {
  try {
    execSync('python3 --version', { stdio: 'pipe' });
    console.log('✅ Python3 is available');
  } catch (error3) {
    console.warn('⚠️  Python not found in PATH - Python scripts may not work in the final executable');
  }
}

// Check Python dependencies
try {
  execSync('python -c "import serial, websockets; print(\'Dependencies OK\')"', { stdio: 'pipe' });
  console.log('✅ Python dependencies (pyserial, websockets) are installed');
} catch (error) {
  console.warn('⚠️  Python dependencies may be missing - run: pip install pyserial websockets');
}

// Check critical files
console.log('\n📋 Checking critical files...');
checkFile('components/esp.py', 'Python script');
checkFile('electron/main.js', 'Electron main process');
checkFile('next.config.js', 'Next.js configuration');
checkFile('package.json', 'Package configuration');

// Ensure build directories exist
console.log('\n📁 Ensuring build directories...');
ensureDir('dist');
ensureDir('.next');

// Step 1: Clean previous builds
runCommand('npm run clean', 'Cleaning previous builds');

// Step 2: Install dependencies
runCommand('npm install', 'Installing dependencies');

// Step 3: Build Next.js application
runCommand('npm run build', 'Building Next.js application');

// Step 4: Check build output
console.log('\n🔍 Verifying build output...');
checkFile('.next/standalone/server.js', 'Next.js server build');
checkFile('.next/static', 'Next.js static files');

// Step 5: Build Electron application
console.log('\n🔨 Building Electron executable...');
runCommand('npm run electron-dist', 'Building Electron executable');

// Step 6: Verify output
console.log('\n🎉 Build process completed!');
console.log('\n📦 Build outputs:');

const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  files.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    const size = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   📄 ${file} (${size} MB)`);
  });
} else {
  console.warn('⚠️  Dist directory not found - build may have failed');
}

console.log('\n🎯 Next steps:');
console.log('1. Navigate to the dist/ directory');
console.log('2. Run the .exe file to test your application');
console.log('3. The executable should be self-contained and portable');
console.log('4. Make sure Python is installed on target machines for full functionality');

console.log('\n✨ Build script completed successfully!');