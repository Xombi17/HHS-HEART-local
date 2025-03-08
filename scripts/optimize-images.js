const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp for image optimization...');
  execSync('npm install sharp --legacy-peer-deps');
}

const sharp = require('sharp');

// Directories to process
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_DIRS = [
  path.join(PUBLIC_DIR, 'images'),
];

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

// Process all images in the specified directories
async function optimizeImages() {
  console.log('Starting image optimization...');
  
  let totalSaved = 0;
  let totalProcessed = 0;
  
  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`Directory not found: ${dir}`);
      continue;
    }
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const ext = path.extname(file).toLowerCase();
      
      // Skip if not an image or already optimized
      if (!SUPPORTED_FORMATS.includes(ext) || file.includes('.opt.')) {
        continue;
      }
      
      const stats = fs.statSync(filePath);
      const originalSize = stats.size;
      
      // Skip directories
      if (stats.isDirectory()) {
        continue;
      }
      
      try {
        const outputPath = path.join(
          dir,
          `${path.basename(file, ext)}.opt${ext}`
        );
        
        // Process the image
        await sharp(filePath)
          .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true })
          .toFile(outputPath);
        
        const newStats = fs.statSync(outputPath);
        const newSize = newStats.size;
        const saved = originalSize - newSize;
        
        // Replace original with optimized if smaller
        if (saved > 0) {
          fs.unlinkSync(filePath);
          fs.renameSync(outputPath, filePath);
          totalSaved += saved;
          console.log(`Optimized: ${file} - Saved ${formatBytes(saved)} (${Math.round((saved / originalSize) * 100)}%)`);
        } else {
          fs.unlinkSync(outputPath);
          console.log(`Skipped: ${file} - Already optimized`);
        }
        
        totalProcessed++;
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }
  
  console.log(`\nOptimization complete!`);
  console.log(`Processed ${totalProcessed} images`);
  console.log(`Total saved: ${formatBytes(totalSaved)}`);
}

// Format bytes to human-readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Run the optimization
optimizeImages().catch(console.error); 