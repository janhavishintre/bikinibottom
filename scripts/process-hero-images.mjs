import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function removeOuterBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Helper to check if pixel is near-white background
  function isWhite(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Generous threshold for AI generated solid white/near-white backdrop
    return r > 230 && g > 230 && b > 230;
  }

  // Seed with all border pixels
  for (let x = 0; x < width; x++) {
    if (isWhite(x, 0)) {
      queue.push(x, 0);
      visited[0 * width + x] = 1;
    }
    if (isWhite(x, height - 1)) {
      queue.push(x, height - 1);
      visited[(height - 1) * width + x] = 1;
    }
  }

  for (let y = 0; y < height; y++) {
    if (isWhite(0, y) && !visited[y * width + 0]) {
      queue.push(0, y);
      visited[y * width + 0] = 1;
    }
    if (isWhite(width - 1, y) && !visited[y * width + (width - 1)]) {
      queue.push(width - 1, y);
      visited[y * width + (width - 1)] = 1;
    }
  }

  // BFS Flood Fill
  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];

    const idx = (y * width + x) * channels;
    data[idx + 3] = 0; // Transparent!

    // Check 4 neighbors
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos] && isWhite(nx, ny)) {
          visited[nPos] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // Slight alpha smoothing on the boundary
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const pos = y * width + x;
      if (visited[pos]) {
        // If it's transparent, check if any neighbor was not visited (i.e. edge of character)
        const idx = pos * channels;
        const neighbors = [
          (y - 1) * width + x,
          (y + 1) * width + x,
          y * width + (x - 1),
          y * width + (x + 1)
        ];
        let hasCharacterNeighbor = false;
        for (const np of neighbors) {
          if (!visited[np]) {
            hasCharacterNeighbor = true;
            break;
          }
        }
        if (hasCharacterNeighbor) {
          // Soft edge
          data[idx + 3] = 120;
        }
      }
    }
  }

  await sharp(data, {
    raw: { width, height, channels }
  })
    .png()
    .toFile(outputPath);

  console.log(`Saved transparent PNG to ${outputPath}`);
}

async function run() {
  const imagesDir = path.resolve('src/assets/images');
  const files = fs.readdirSync(imagesDir);

  const spongebobJpg = files.find(f => f.startsWith('spongebob_hero_char_'));
  const patrickJpg = files.find(f => f.startsWith('patrick_hero_char_'));
  const squidwardJpg = files.find(f => f.startsWith('squidward_hero_char_'));
  const sandyJpg = files.find(f => f.startsWith('sandy_hero_char_'));
  const krabsJpg = files.find(f => f.startsWith('mr_krabs_money_raw_'));

  if (spongebobJpg) {
    await removeOuterBackground(path.join(imagesDir, spongebobJpg), path.join(imagesDir, 'spongebob_hero.png'));
  }
  if (patrickJpg) {
    await removeOuterBackground(path.join(imagesDir, patrickJpg), path.join(imagesDir, 'patrick_hero.png'));
  }
  if (squidwardJpg) {
    await removeOuterBackground(path.join(imagesDir, squidwardJpg), path.join(imagesDir, 'squidward_hero.png'));
  }
  if (sandyJpg) {
    await removeOuterBackground(path.join(imagesDir, sandyJpg), path.join(imagesDir, 'sandy_hero.png'));
  }
  if (krabsJpg) {
    await removeOuterBackground(path.join(imagesDir, krabsJpg), path.join(imagesDir, 'mr_krabs_money.png'));
  }
}

run().catch(console.error);
