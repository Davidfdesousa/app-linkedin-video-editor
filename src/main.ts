import './styles/tokens.css';
import './styles/base.css';
import './styles/shared.css';
import { GgVideo } from './components/gg-video/gg-video';
import { GgControls } from './components/gg-controls/gg-controls';
import { VIDEO_DATA } from './data/video-data';

const video = document.querySelector('gg-video')!;
video.load(VIDEO_DATA);
video.render(0);

// API usada pelo render.ts para gerar o MP4 quadro a quadro.
window.render = (t) => video.render(t);
window.DURATION = video.duration;

const isRender = window.__RENDER === true;
document.documentElement.classList.add(isRender ? 'render' : 'preview');

if (!isRender) startPreview();

/** Prévia no navegador: escala o quadro para caber na janela e toca em loop. */
function startPreview(): void {
  const frame = document.getElementById('frame')!;
  const fit = (): void => {
    const scale = Math.min((window.innerWidth - 32) / GgVideo.WIDTH, (window.innerHeight - 90) / GgVideo.HEIGHT, 1);
    video.style.transform = `scale(${scale})`;
    frame.style.width = `${GgVideo.WIDTH * scale}px`;
    frame.style.height = `${GgVideo.HEIGHT * scale}px`;
  };
  fit();
  window.addEventListener('resize', fit);

  const controls = new GgControls();
  document.body.append(controls);
  controls.attach(video);
}
