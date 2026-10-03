import type { SceneName } from '../../types';
import { easeSoft, seg } from '../../lib/anim';
import { FADE, type Span } from '../../lib/timeline';
import './gg-header.css';

const STEPS = ['Jogos', 'Peças', 'Resumo'];

/** Logo + indicador de etapas, visível da etapa 1 até a etapa 3. */
export class GgHeader extends HTMLElement {
  private spans!: Record<SceneName, Span>;
  private pills: HTMLElement[] = [];

  setup(spans: Record<SceneName, Span>): void {
    this.spans = spans;
    this.innerHTML = `<div class="wordmark"><b>GG</b> Setup</div>
      <div class="steps">${STEPS.map((label, i) => `<div class="step-pill"><span class="num">${i + 1}</span>${label}</div>`).join('')}</div>`;
    this.pills = [...this.querySelectorAll<HTMLElement>('.step-pill')];
  }

  update(t: number): void {
    const { games, parts, fps } = this.spans;
    const [a, b] = [games[0], fps[1]];
    const alpha = t < a || t > b ? 0 : Math.min(easeSoft(seg(t, a, a + FADE)), 1 - easeSoft(seg(t, b - FADE, b)));
    this.style.opacity = String(alpha);

    const step = t < parts[0] ? 1 : t < fps[0] ? 2 : 3;
    this.pills.forEach((pill, i) => {
      pill.classList.toggle('active', i + 1 === step);
      pill.classList.toggle('done', i + 1 < step);
    });
  }
}

customElements.define('gg-header', GgHeader);
