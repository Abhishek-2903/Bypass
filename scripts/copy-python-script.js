const fs = require('fs');
const path = require('path');

console.log('🔧 Pre-build: Ensuring Python script is in correct location...');

// Source path (your current location)
const sourceScript = path.resolve(__dirname, '..', 'components', 'esp.py');
const sourceScriptAlt = 'C:\\backup\\incase port is not working\\new_format\\components\\esp.py';

// Target directory in project root
const targetDir = path.resolve(__dirname, '..', 'components');
const targetScript = path.join(targetDir, 'esp.py');

console.log('Source script paths to check:');
console.log('  1.', sourceScript);
console.log('  2.', sourceScriptAlt);
console.log('Target script path:', targetScript);

// Create components directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('✅ Created components directory:', targetDir);
}

// Check if script already exists in target location
if (fs.existsSync(targetScript)) {
  console.log('✅ Python script already exists in target location');
  process.exit(0);
}

// Try to copy from primary source location
if (fs.existsSync(sourceScript)) {
  fs.copyFileSync(sourceScript, targetScript);
  console.log('✅ Copied Python script from:', sourceScript);
  process.exit(0);
}

// Try to copy from alternative source location
if (fs.existsSync(sourceScriptAlt)) {
  fs.copyFileSync(sourceScriptAlt, targetScript);
  console.log('✅ Copied Python script from:', sourceScriptAlt);
  process.exit(0);
}

// If we reach here, the script wasn't found
console.error('❌ ERROR: esp.py not found in any expected location!');
console.error('Please ensure esp.py exists in one of these locations:');
console.error('  1.', sourceScript);
console.error('  2.', sourceScriptAlt);
console.error('  3. Or manually copy it to:', targetScript);
process.exit(1);