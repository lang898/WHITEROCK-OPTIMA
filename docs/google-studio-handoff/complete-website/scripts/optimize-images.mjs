import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assetsRoot = path.join(root, "assets");
const manifest = {};

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

const sources = (await walk(assetsRoot)).filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png"].includes(ext) && !path.basename(file).includes(".optimized.") && path.basename(file) !== "favicon.png";
});

for (const source of sources) {
  try {
    const ext = path.extname(source).toLowerCase();
    const base = source.slice(0, -ext.length);
    const jpgPath = `${base}.jpg`;
    const webpPath = `${base}.webp`;
    const relativeSource = path.relative(root, source).replaceAll(path.sep, "/");
    if (relativeSource.startsWith("assets/factory/")) {
      try {
        await fs.access(webpPath);
        const metadata = await sharp(source).metadata();
        const dimensions = { width: metadata.width, height: metadata.height };
        manifest[relativeSource] = dimensions;
        manifest[path.relative(root, webpPath).replaceAll(path.sep, "/")] = dimensions;
        continue;
      } catch {}
    }
    const pipeline = sharp(source).autoOrient().resize({ width: 1800, withoutEnlargement: true });

    if (source === jpgPath) {
      const tempPath = `${base}.optimized.jpg`;
      await pipeline.clone().jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(tempPath);
      await fs.rm(jpgPath, { force: true });
      await fs.rename(tempPath, jpgPath);
    } else {
      await pipeline.clone().jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(jpgPath);
    }

    await pipeline.clone().webp({ quality: 78, effort: 6 }).toFile(webpPath);
    const metadata = await sharp(jpgPath).metadata();
    const dimensions = { width: metadata.width, height: metadata.height };
    manifest[path.relative(root, jpgPath).replaceAll(path.sep, "/")] = dimensions;
    manifest[path.relative(root, webpPath).replaceAll(path.sep, "/")] = dimensions;
  } catch (error) {
    console.warn(`Skipping unreadable image ${path.relative(root, source)}: ${error.message}`);
  }
}

await fs.writeFile(path.join(root, "data/image-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log("Optimized images with sharp and generated JPEG/WebP variants.");
