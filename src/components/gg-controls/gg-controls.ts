import type { GgVideo } from '../gg-video/gg-video';
import './gg-controls.css';

/** Controles da prévia no navegador: tocar/pausar, linha do tempo e barra de espaço. */
export class GgControls extends HTMLElement {
  private video!: GgVideo;
  private playing = true;
  private time = 0;
  private last = 0;
  private button!: HTMLButtonElement;
  private scrub!: HTMLInputElement;
  private output!: HTMLOutputElement;

  attach(video: GgVideo): void {
    this.video = video;
    this.innerHTML = `<button type="button">Pausar</button>
      <input type="range" min="0" max="1000" value="0" aria-label="Linha do tempo">
      <output>0,0 s</output>`;
    this.button = this.querySelector('button')!;
    this.scrub = this.querySelector('input')!;
    this.output = this.querySelector('output')!;

    this.button.addEventListener('click', () => this.toggle());
    this.scrub.addEventListener('input', () => {
      this.time = (Number(this.scrub.value) / 1000) * this.video.duration;
      this.show();
    });
    window.addEventListener('keydown', (e) => {
      if (e.code !== 'Space') return;
      e.preventDefault();
      this.toggle();
    });

    this.last = performance.now();
    requestAnimationFrame(this.tick);
  }

  private toggle(): void {
    this.playing = !this.playing;
    this.button.textContent = this.playing ? 'Pausar' : 'Tocar';
  }

  private tick = (now: number): void => {
    if (this.playing) {
      this.time = (this.time + (now - this.last) / 1000) % this.video.duration;
      this.show();
    }
    this.last = now;
    requestAnimationFrame(this.tick);
  };

  private show(): void {
    const { duration } = this.video;
    this.video.render(this.time);
    this.scrub.value = String(Math.round((this.time / duration) * 1000));
    this.output.textContent = `${this.time.toFixed(1).replace('.', ',')} s / ${duration.toFixed(0)} s`;
  }
}

customElements.define('gg-controls', GgControls);

declare global {
  interface HTMLElementTagNameMap {
    'gg-controls': GgControls;
  }
}
