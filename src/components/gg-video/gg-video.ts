import type { SceneName, VideoData } from '../../types';
import { buildTimeline } from '../../lib/timeline';
import type { SceneElement } from '../scene-element/scene-element';
import { GgHeader } from '../gg-header/gg-header';
import { IntroScene } from '../scenes/intro-scene/intro-scene';
import { HookScene } from '../scenes/hook-scene/hook-scene';
import { GamesScene } from '../scenes/games-scene/games-scene';
import { PartsScene } from '../scenes/parts-scene/parts-scene';
import { FpsScene } from '../scenes/fps-scene/fps-scene';
import { CompareScene } from '../scenes/compare-scene/compare-scene';
import { CtaScene } from '../scenes/cta-scene/cta-scene';
import './gg-video.css';

const SCENES: Record<SceneName, new () => SceneElement> = {
  intro: IntroScene,
  hook: HookScene,
  games: GamesScene,
  parts: PartsScene,
  fps: FpsScene,
  compare: CompareScene,
  cta: CtaScene,
};

/** O quadro do vídeo (1080×1350): monta as cenas a partir da timeline e desenha o tempo `t`. */
export class GgVideo extends HTMLElement {
  static readonly WIDTH = 1080;
  static readonly HEIGHT = 1350;

  duration = 0;
  private header?: GgHeader;
  private scenes: SceneElement[] = [];

  load(data: VideoData): void {
    const { spans, duration } = buildTimeline(data.timeline);
    this.duration = duration;
    this.innerHTML = '<div class="grid-bg"></div>';

    this.header = new GgHeader();
    this.header.setup(spans);
    this.append(this.header);

    this.scenes = data.timeline.map(([name], i) => {
      const scene = new SCENES[name]();
      scene.setup(data, spans[name], { first: i === 0, last: i === data.timeline.length - 1 });
      this.append(scene);
      return scene;
    });
  }

  render(t: number): void {
    this.header?.update(t);
    for (const scene of this.scenes) scene.update(t);
  }
}

customElements.define('gg-video', GgVideo);

declare global {
  interface HTMLElementTagNameMap {
    'gg-video': GgVideo;
  }
}
