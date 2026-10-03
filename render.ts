/**
 * Renderiza o index.html em MP4 (1080×1350, 30 fps) ou gera quadros de prévia.
 *
 *   npm run render                 → out/ggsetup-linkedin.mp4
 *   npm run preview -- 12 30 50    → out/preview_12.png, out/preview_30.png, ...
 *
 * Requer ffmpeg no PATH e o Chromium do Playwright (npx playwright install chromium).
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

type Mode = 'render' | 'preview';

declare global {
  interface Window {
    __RENDER?: boolean;
    render: (t: number) => void;
    DURATION: number;
  }
}

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(ROOT, 'out');
const WIDTH = 1080;
const HEIGHT = 1350;
const FPS = 30;

async function main(): Promise<void> {
  const mode: Mode = process.argv[2] === 'preview' ? 'preview' : 'render';
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
  await page.addInitScript(() => { window.__RENDER = true; });
  await page.goto(pathToFileURL(path.join(ROOT, 'index.html')).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const duration = await page.evaluate(() => window.DURATION);

  if (mode === 'preview') {
    const times = process.argv.slice(3).map(Number).filter((n) => Number.isFinite(n));
    for (const t of times.length ? times : [2, duration / 2, duration - 1]) {
      await page.evaluate((time) => window.render(time), t);
      const file = path.join(OUT_DIR, `preview_${t}.png`);
      await page.screenshot({ path: file });
      console.log('preview', file);
    }
  } else {
    const out = path.join(OUT_DIR, 'ggsetup-linkedin.mp4');
    const ffmpeg = spawn('ffmpeg', [
      '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out,
    ], { stdio: ['pipe', 'ignore', 'inherit'] });

    const total = Math.round(duration * FPS);
    for (let i = 0; i < total; i++) {
      await page.evaluate((time) => window.render(time), i / FPS);
      const frame = await page.screenshot({ type: 'png' });
      if (!ffmpeg.stdin.write(frame)) await new Promise<void>((r) => ffmpeg.stdin.once('drain', () => r()));
      if (i % (FPS * 5) === 0) process.stdout.write(`\r${Math.round((i / total) * 100)}%`);
    }
    ffmpeg.stdin.end();
    await new Promise<void>((r) => ffmpeg.on('close', () => r()));
    console.log(`\rpronto: ${out} (${total} quadros, ${duration}s)`);
  }

  await browser.close();
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
