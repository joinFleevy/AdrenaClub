const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'public', 'images', 'coaches');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// 1. Coach Hmimed (Judo & Wrestling Master in Blue Kimono)
execSync('ffmpeg -y -i scratch/abdellah_fb.jpg -vf "crop=110:145:280:175,scale=400:520:flags=lanczos" public/images/coaches/coach-hmimed.jpg', { stdio: 'inherit' });

// 2. Coach Abdellah (Kickboxing & Combat Coach)
execSync('ffmpeg -y -i scratch/abdellah_fb.jpg -vf "crop=105:140:85:175,scale=400:520:flags=lanczos" public/images/coaches/coach-abdellah.jpg', { stdio: 'inherit' });

// 3. Coach Préparation & Enfants (Yellow Adrena Shirt)
execSync('ffmpeg -y -i scratch/abdellah_fb.jpg -vf "crop=95:125:510:135,scale=400:520:flags=lanczos" public/images/coaches/coach-youth.jpg', { stdio: 'inherit' });

console.log('Coach photos saved in public/images/coaches!');
