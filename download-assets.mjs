import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

const files = [
  'gdglogo.png',
  'gdg_logo.png',
  'favicon.ico',
  'hero_new_bg.svg',
  'hero_phone_bg.svg',
  'c1.svg',
  'c2.svg',
  'c3.svg',
  'intro_gdg.png',
  'keploy.png',
  'gen.png',
  'yt_new_bg.svg',
  'yt_phone_bg.svg',
  'gallery_new_bg.svg',
  'gallery_phone_bg.svg',
  'imgtop1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
  'img8.jpg',
  'img9.jpg',
  'team_new_bg.svg',
  'team_phone_bg.svg',
  'dudes.png',
  'lead.png',
  'co-lead.jpg',
  'mentor.jpeg',
  'me.jpg',
  'creative.jpg',
  'sexnik.jpg',
  'ai.jpg',
  'android.gif',
  'globe.png',
  'teambg.png',
  'ytbg.png'
];

const baseUrl = 'https://gdg-website-blue.vercel.app/';

async function downloadFile(filename) {
  const url = `${baseUrl}${filename}`;
  const dest = path.join(publicDir, filename);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Failed to fetch ${filename}: status ${res.status}`);
      return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`Downloaded ${filename} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Error downloading ${filename}:`, err.message);
  }
}

async function run() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  for (const f of files) {
    await downloadFile(f);
  }
  console.log('All downloads finished.');
}

run();
