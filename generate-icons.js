const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'logo.svg');
const publicPath = path.join(__dirname, 'public');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(svgPath);
  
  // Generar logo192.png (192x192)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicPath, 'logo192.png'));
  console.log('✓ logo192.png generado (192x192)');
  
  // Generar logo512.png (512x512)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicPath, 'logo512.png'));
  console.log('✓ logo512.png generado (512x512)');
  
  // Generar favicon como PNG de 32x32 (para convertir a ICO después)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicPath, 'favicon-32.png'));
  console.log('✓ favicon-32.png generado (32x32)');
  
  // Generar icono para apple-touch-icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicPath, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png generado (180x180)');
  
  // Generar favicon.ico como PNG de 32x32 (los navegadores modernos aceptan PNG como favicon)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicPath, 'favicon.png'));
  console.log('✓ favicon.png generado (32x32)');
  
  console.log('\n¡Todos los iconos generados correctamente!');
}

generateIcons().catch(console.error);
