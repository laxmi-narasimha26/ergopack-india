import fs from 'fs';
import path from 'path';

const sourceDir = path.join(process.cwd(), 'IMAGES');
const targetDir = path.join(process.cwd(), 'public', 'images', 'products');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mappings = [
  { dir: '700 Model Overview', file: '1.png', target: '700.png' },
  { dir: '700E Model Overview', file: '1.png', target: '700e.png' },
  { dir: '700X Model Overview', file: '1.png', target: '700x.png' },
  { dir: '713E Model Overview', file: '1.png', target: '713e.png' },
  { dir: '713X Model Overview', file: '1.png', target: '713x.png' },
  { dir: '726E Model Overview', file: '1.png', target: '726e.png' },
  { dir: '726X Model Overview', file: '1.png', target: '726x.png' },
  { dir: '745E Model Overview', file: '1.png', target: '745e.png' },
  { dir: '745X Model Overview', file: '1.png', target: '745x.png' },
];

mappings.forEach((mapping) => {
  const sourcePath = path.join(sourceDir, mapping.dir, mapping.file);
  const targetPath = path.join(targetDir, mapping.target);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${mapping.dir}/${mapping.file} to ${mapping.target}`);
  } else {
    console.warn(`Source file not found: ${sourcePath}`);
  }
});

console.log('Image mapping complete.');
