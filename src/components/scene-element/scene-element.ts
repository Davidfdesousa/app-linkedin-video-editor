import type { VideoData } from '../../types';
import { enter, seg } from '../../lib/anim';
import { spanAlpha, type Span } from '../../lib/timeline';

export interface SceneOptions {
  /** Primeira cena: entra sem fade. */
  first?: boolean;
  /** Última cena: sai sem fade. */
  last?: boolean;
}

/**
 * Base de todas as cenas. Cada cena:
 *  - monta o próprio HTML uma vez em `template()` a partir de VIDEO_DATA;
 *  - desenha cada quadro em `draw(lt)`, onde `lt` é o tempo local (segundos desde o início da cena).
 * `draw` não guarda estado: o mesmo `lt` gera sempre o mesmo quadro.
 */
export abstract class SceneElement extends HTMLElement {
  protected data!: VideoData;
  private span: Span = [0, 0];
  private options: SceneOptions = {};

  /** Cenas com conteúdo centralizado (intro, hook, CTA). */
  protected centered = false;

  setup(data: VideoData, span: Span, options: SceneOptions = {}): void {
    this.data = data;
    this.span = span;
    this.options = options;
    this.classList.add('scene');
    this.classList.toggle('center', this.centered);
    this.innerHTML = this.template();
    this.mount();
  }

  update(t: number): void {
    const alpha = spanAlpha(t, this.span, this.options.first, this.options.last);
    this.style.opacity = String(alpha);
    if (alpha > 0) this.draw(t - this.span[0]);
  }

  protected abstract template(): string;

  /** Guarda referências aos elementos depois que o HTML existe. */
  protected mount(): void {}

  protected abstract draw(lt: number): void;

  protected el<T extends HTMLElement = HTMLElement>(selector: string): T {
    const found = this.querySelector<T>(selector);
    if (!found) throw new Error(`${this.localName}: elemento "${selector}" não encontrado`);
    return found;
  }

  protected all<T extends HTMLElement = HTMLElement>(selector: string): T[] {
    return [...this.querySelectorAll<T>(selector)];
  }

  /** Bloco "eyebrow + título + subtítulo" das etapas, entrando em cascata. */
  protected stepTitle(eyebrow: string, title: string, sub: string): string {
    return `<div class="step-title">
      <div class="eyebrow">${eyebrow}</div>
      <div class="h1">${title}</div>
      <div class="sub">${sub}</div>
    </div>`;
  }

  protected drawStepTitle(lt: number): void {
    this.all('.step-title > *').forEach((line, i) => enter(line, seg(lt, 0.2 + i * 0.18, 1.0 + i * 0.18), 30));
  }
}
