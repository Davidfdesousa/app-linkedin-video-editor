import { easeInOut, easeSoft, enter, enterSoft, seg } from '../../../lib/anim';
import { SCALE } from '../../../lib/icons';
import { SceneElement } from '../../scene-element/scene-element';
import './fps-scene.css';

/** Etapa 3: FPS estimado do jogo mais pesado em cada resolução. */
export class FpsScene extends SceneElement {
  private panel!: HTMLElement;
  private rows: HTMLElement[] = [];
  private summary!: HTMLElement;
  private callout!: HTMLElement;
  private footnote!: HTMLElement;

  protected template(): string {
    const { heaviestGame, fpsByResolution, fpsSummary, gpuNote, fpsNote } = this.data;
    const rows = fpsByResolution.map((f) => `
      <div class="fps-row tone-${f.tone}${f.selected ? ' selected' : ''}">
        <div class="fps-top">
          <div class="fps-res">${f.res}${f.selected ? '<small>sua tela</small>' : ''}</div>
          <div class="fps-val tnum"><span class="n">—</span><small>FPS</small><span class="tag">· ${f.label}</span></div>
        </div>
        <div class="track"><div class="bar"></div><div class="range"></div></div>
      </div>`).join('');

    return `${this.stepTitle('Etapa 3', 'Seus jogos rodam liso?', `FPS estimado no mais pesado: <b>${heaviestGame}</b>.`)}
      <div class="panel">
        <div class="panel-label">FPS estimado por resolução</div>
        ${rows}
        <div class="summary"><span class="ok">✓</span><span>${fpsSummary}</span></div>
      </div>
      <div class="callout">${SCALE}<div>${gpuNote}</div></div>
      <div class="footnote">${fpsNote}</div>`;
  }

  protected override mount(): void {
    this.panel = this.el('.panel');
    this.rows = this.all('.fps-row');
    this.summary = this.el('.summary');
    this.callout = this.el('.callout');
    this.footnote = this.el('.footnote');
  }

  protected draw(lt: number): void {
    this.drawStepTitle(lt);
    enter(this.panel, seg(lt, 0.6, 1.4), 60);

    const max = this.data.fpsScaleMax;
    this.data.fpsByResolution.forEach((f, i) => {
      const row = this.rows[i];
      const start = 1.8 + i * 1.0;
      enter(row, seg(lt, start - 0.3, start + 0.3), 20);

      // A barra cresce até o mínimo da faixa; depois a faixa (mín → máx) aparece por cima.
      const grow = easeInOut(seg(lt, start, start + 1.3));
      const bar = row.querySelector<HTMLElement>('.bar')!;
      const range = row.querySelector<HTMLElement>('.range')!;
      bar.style.width = `${(f.lo / max) * 100 * grow}%`;
      range.style.left = `${(f.lo / max) * 100 * grow}%`;
      range.style.width = `${((f.hi - f.lo) / max) * 100 * seg(lt, start + 1.2, start + 1.6)}%`;

      row.querySelector('.n')!.textContent = grow < 0.02 ? '—' : `${Math.round(f.lo * grow)}–${Math.round(f.hi * grow)}`;
      row.querySelector<HTMLElement>('.tag')!.style.opacity = String(easeSoft(seg(lt, start + 1.2, start + 1.7)));
    });

    enterSoft(this.summary, seg(lt, 5.4, 6.2), 12);
    enterSoft(this.callout, seg(lt, 6.8, 7.7), 20);
    enterSoft(this.footnote, seg(lt, 7.4, 8.2), 8);
  }
}

customElements.define('gg-fps-scene', FpsScene);
