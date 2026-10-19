const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const targetDir = path.join(process.cwd(), 'public', 'images', 'disciplines');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const tasks = [
  {
    name: 'musculation.jpg',
    src: 'time/360/gic-pano-CIABIhA_eqE9mX-pc_9L5lMEEVcK-20261014-173717.jpg',
    yaw: 180,
    fovH: 92,
    fovV: 62
  },
  {
    name: 'crossfit.jpg',
    src: 'time/360/gic-pano-CIABIhAFe2JKv3j7vvNQVWEHwbba-20261014-173539.jpg',
    yaw: -90,
    fovH: 95,
    fovV: 65
  },
  {
    name: 'combat.jpg',
    src: 'time/360/gic-pano-CIABIhAFe2JKv3j7vvNQVWEHwbba-20261014-173539.jpg',
    yaw: 90,
    fovH: 95,
    fovV: 65
  },
  {
    name: 'femmes.jpg',
    src: 'time/360/gic-pano-CIABIhA_eqE9mX-pc_9L5lMEEVcK-20261014-173717.jpg',
    yaw: 90,
    fovH: 92,
    fovV: 62
  },
  {
    name: 'enfants.jpg',
    src: 'time/360/gic-pano-CIABIhAFe2JKv3j7vvNQVWEHwbba-20261014-173539.jpg',
    yaw: 0,
    fovH: 90,
    fovV: 60
  },
  {
    name: 'reception.jpg',
    src: 'time/360/gic-pano-CIABIhCTOb8DBHjUBL8nYDPSS4CX-20261014-173934.jpg',
    yaw: 0,
    fovH: 90,
    fovV: 65
  }
];

for (const t of tasks) {
  const dest = path.join(targetDir, t.name);
  const cmd = `ffmpeg -y -i "${t.src}" -vf "v360=e:rectilinear:yaw=${t.yaw}:pitch=0:h_fov=${t.fovH}:v_fov=${t.fovV}:w=1000:h=650" -frames:v 1 -q:v 2 "${dest}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log('Generated:', dest, fs.statSync(dest).size, 'bytes');
}
