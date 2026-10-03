/**
 * Renderiza o vídeo em MP4 (1080×1350, 30 fps) ou gera quadros de prévia.
 * Sobe o servidor do Vite, abre a página no Chromium do Playwright e captura quadro a quadro.
 *
 *   npm run render                → out/ggsetup-linkedin.mp4
 *   npm run frames -- 12 30 50    → out/preview_12.png, out/preview_30.png, ...
 *
 * Requer ffmpeg no PATH e o Chromium do Playwright (npx playwright install chromium).
 */
import { chromium, type Page } from 'playwright';
import { createServer } from 'vite';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(ROOT, 'out');
const WIDTH = 1080;
const HEIGHT = 1350;
const FPS = 30;

async function main(): Promise<void> {
  const mode = process.argv[2] === 'preview' ? 'preview' : 'render';
  mkdirSync(OUT_DIR, { recursive: true });

  const server = await createServer({ root: ROOT, logLevel: 'error', server: { port: 5199 } });
  await server.listen();
  const url = server.resolvedUrls?.local[0];
  if (!url) throw new Error('Servidor do Vite não informou a URL local');

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
    await page.addInitScript(() => { window.__RENDER = true; });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.render === 'function');
    await page.evaluate(() => document.fonts.ready);
    const duration = await page.evaluate(() => window.DURATION);

    if (mode === 'preview') await renderFrames(page, duration);
    else await renderVideo(page, duration);
  } finally {
    await browser.close();
    await server.close();
  }
}

async function renderFrames(page: Page, duration: number): Promise<void> {
  const times = process.argv.slice(3).map(Number).filter((n) => Number.isFinite(n));
  for (const t of times.length ? times : [2, duration / 2, duration - 1]) {
    await page.evaluate((time) => window.render(time), t);
    const file = path.join(OUT_DIR, `preview_${t}.png`);
    await page.screenshot({ path: file });
    console.log('preview', file);
  }
}

async function renderVideo(page: Page, duration: number): Promise<void> {
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

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
