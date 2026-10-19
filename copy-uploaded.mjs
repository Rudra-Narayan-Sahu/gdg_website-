import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const dirs = [
  'C:\\Users\\rudra\\.gemini\\antigravity-ide\\brain\\a63311b1-f5ec-4703-9537-812ef8ad72fb\\.user_uploaded',
  'C:\\Users\\rudra\\.gemini\\antigravity-ide\\brain\\tempmediaStorage'
];

const destDir = path.resolve('./public/gallery');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const seenHashes = new Set();
let count = 1;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.jpg') && !file.endsWith('.jpeg') && !file.endsWith('.png')) continue;
    // Only recent media files
    if (!file.includes('1792219')) continue;
    const fullPath = path.join(dir, file);
    const data = fs.readFileSync(fullPath);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    if (seenHashes.has(hash)) continue;
    seenHashes.add(hash);

    const outName = `photo_${count}.jpg`;
    fs.writeFileSync(path.join(destDir, outName), data);
    console.log(`Saved ${outName} from ${file} (${data.length} bytes, hash: ${hash.substring(0, 10)})`);
    count++;
  }
}

console.log(`Done. Total unique photos saved: ${count - 1}`);
