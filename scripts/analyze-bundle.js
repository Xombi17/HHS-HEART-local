const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if @next/bundle-analyzer is installed
try {
  require('@next/bundle-analyzer');
} catch (err) {
  console.log('Installing @next/bundle-analyzer...');
  execSync('npm install @next/bundle-analyzer --save-dev');
}

const nextConfigPath = path.join(__dirname, '../next.config.js');
const backupPath = path.join(__dirname, '../next.config.backup.js');

// Read the current next.config.js
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

// Check if bundle analyzer is already configured
if (!nextConfig.includes('@next/bundle-analyzer')) {
  // Create a backup
  fs.writeFileSync(backupPath, nextConfig);

  // Add bundle analyzer configuration
  const analyzerConfig = `
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

${nextConfig}

module.exports = withBundleAnalyzer(module.exports)
`;

  fs.writeFileSync(nextConfigPath, analyzerConfig);
  console.log('Bundle analyzer configuration added to next.config.js');
  console.log('Original configuration backed up to next.config.backup.js');
}

console.log('\nOptimization Tips:');
console.log('1. Use dynamic imports for large components that are not needed immediately');
console.log('2. Implement code splitting by using Next.js pages and dynamic imports');
console.log('3. Optimize images using next/image and proper formats (WebP, AVIF)');
console.log('4. Remove unused dependencies from package.json');
console.log('5. Use tree-shaking friendly imports (import specific components instead of entire libraries)');
console.log('6. Consider using lightweight alternatives for large dependencies');
console.log('7. Implement proper caching strategies\n');

// Run the bundle analyzer if --run argument is provided
if (process.argv.includes('--run')) {
  console.log('Running bundle analyzer...');
  execSync('npm run analyze', { stdio: 'inherit' });
} 