import { back, easeInOut, easeOut, enter, enterSoft, seg } from '../../../lib/anim';
import { brlCents, brlInt } from '../../../lib/format';
import { SceneElement } from '../../scene-element/scene-element';
import './compare-scene.css';

/** Comparação "Ideal pra você" × "Tudo que dá": diferença de preço e de FPS. */
export class CompareScene extends SceneElement {
  private panel!: HTMLElement;
  private barIdeal!: HTMLElement;
  private barTop!: HTMLElement;
  private amountIdeal!: HTMLElement;
  private amountTop!: HTMLElement;
  private diff!: HTMLElement;
  private delta!: HTMLElement;
  private context!: HTMLElement;
  private question!: HTMLElement;
  private footnote!: HTMLElement;

  protected template(): string {
    const c = this.data.compare;
    const diff = c.topPrice - c.idealPrice;
    return `${this.stepTitle('Comparar', `${c.idealLabel} × ${c.topLabel}`, 'Quanto custa a mais — e o que você ganha com isso.')}
      <div class="panel">
        <div class="panel-label">Diferença de preço</div>
        <div class="price-row">
          <div class="who ideal">${c.idealLabel}</div>
          <div class="track"><div class="bar ideal"></div></div>
          <div class="amount ideal-amount tnum">R$ 0</div>
        </div>
        <div class="price-row">
          <div class="who top">${c.topLabel}</div>
          <div class="track"><div class="bar top"></div></div>
          <div class="amount top-amount tnum">R$ 0</div>
        </div>
        <div class="price-diff"><span class="ideal">${c.idealLabel}</span> é <b class="tnum">${brlCents(diff)}</b> mais barata</div>
      </div>
      <div class="verdict">
        ${this.verdict(diff)}
        <div class="question">Vale a <span>pena?</span></div>
      </div>
      <div class="footnote">${c.note}</div>`;
  }

  /** Com `topFps`: "+R$ X por +Y FPS". Sem: só a diferença de preço. */
  private verdict(diff: number): string {
    const c = this.data.compare;
    if (!c.topFps) {
      return `<div class="delta"><div class="chip-big tnum">+${brlInt(diff)}</div></div>
        <div class="context">a mais no "${c.topLabel}" — e o <span class="accent">${c.idealLabel.toLowerCase()}</span><br>já roda todos os seus jogos acima de 60 FPS.</div>`;
    }
    const idealMax = c.idealFps[1];
    const topMin = c.topFps[0];
    return `<div class="delta">
        <div class="chip-big tnum">+${brlInt(diff)}</div><div class="por">por</div><div class="chip-big fps tnum">+${topMin - idealMax} FPS</div>
      </div>
      <div class="context">no <b>${c.game}</b>, o seu jogo mais pesado:<br>de <b>${idealMax}</b> (máx. do ideal) para <b>${topMin}</b> (mín. do "${c.topLabel}").</div>`;
  }

  protected override mount(): void {
    this.panel = this.el('.panel');
    this.barIdeal = this.el('.bar.ideal');
    this.barTop = this.el('.bar.top');
    this.amountIdeal = this.el('.ideal-amount');
    this.amountTop = this.el('.top-amount');
    this.diff = this.el('.price-diff');
    this.delta = this.el('.delta');
    this.context = this.el('.context');
    this.question = this.el('.question');
    this.footnote = this.el('.footnote');
  }

  protected draw(lt: number): void {
    const { idealPrice, topPrice } = this.data.compare;
    this.drawStepTitle(lt);
    enter(this.panel, seg(lt, 0.7, 1.5), 50);

    const pIdeal = easeInOut(seg(lt, 1.5, 2.9));
    const pTop = easeInOut(seg(lt, 1.8, 3.4));
    this.barIdeal.style.width = `${(idealPrice / topPrice) * 100 * pIdeal}%`;
    this.barTop.style.width = `${100 * pTop}%`;
    this.amountIdeal.textContent = brlCents(idealPrice * pIdeal);
    this.amountTop.textContent = brlCents(topPrice * pTop);
    enterSoft(this.diff, seg(lt, 3.5, 4.2), 10);

    enter(this.delta, seg(lt, 5.0, 5.8), 30);
    enter(this.context, seg(lt, 6.0, 6.8), 20);
    const pq = seg(lt, 7.6, 8.3);
    this.question.style.opacity = String(easeOut(pq));
    this.question.style.transform = `scale(${0.85 + 0.15 * back(pq)})`;
    enterSoft(this.footnote, seg(lt, 7.6, 8.4), 8);
  }
}

customElements.define('gg-compare-scene', CompareScene);
