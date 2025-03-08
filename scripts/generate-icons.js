const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp for image generation...');
  execSync('npm install sharp --legacy-peer-deps');
}

const sharp = require('sharp');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate a simple heart icon with text
async function generateIcon(size, text) {
  const svgBuffer = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#dc2626"/>
      <path d="${size/2},${size*0.7} C${size*0.7},${size*0.6} ${size*0.85},${size*0.45} ${size*0.85},${size*0.3} C${size*0.85},${size*0.2} ${size*0.75},${size*0.15} ${size*0.65},${size*0.15} C${size*0.55},${size*0.15} ${size*0.5},${size*0.2} ${size/2},${size*0.3} C${size/2},${size*0.2} ${size*0.45},${size*0.15} ${size*0.35},${size*0.15} C${size*0.25},${size*0.15} ${size*0.15},${size*0.2} ${size*0.15},${size*0.3} C${size*0.15},${size*0.45} ${size*0.3},${size*0.6} ${size/2},${size*0.7} Z" 
        fill="white"/>
      <text x="${size/2}" y="${size*0.9}" font-family="Arial" font-size="${size*0.1}" fill="white" text-anchor="middle">${text}</text>
    </svg>
  `);

  await sharp(svgBuffer)
    .png()
    .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
  
  console.log(`Generated ${size}x${size} icon`);
}

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  try {
    // Generate different sizes
    await generateIcon(192, 'HHS');
    await generateIcon(512, 'HHS Heart');
    
    console.log('Icon generation complete!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Run the icon generation
generateIcons(); 