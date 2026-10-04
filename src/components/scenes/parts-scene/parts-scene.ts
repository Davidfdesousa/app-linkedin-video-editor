import { easeSoft, enterSoft, seg } from '../../../lib/anim';
import { brlCents } from '../../../lib/format';
import { partIcon } from '../../../lib/icons';
import { PICK_CHECK, PICK_LAYERS, drawPick } from '../../../lib/pick';
import type { PartOption } from '../../../types';
import { SceneElement } from '../../scene-element/scene-element';
import './parts-scene.css';

const ROW_START = 2.4;
const ROW_GAP = 1.6;
/** Tempo entre a linha aparecer e a opção ser marcada. */
const PICK_DELAY = 1.0;
/** Títulos das colunas: a 1ª opção de cada peça é a recomendada, as outras são equivalentes. */
const COLUMNS = ['Peças recomendadas', 'Outras peças equivalentes'];

/** Etapa 2: o usuário escolhe uma opção de cada peça; o total vai somando. */
export class PartsScene extends SceneElement {
  private panel!: HTMLElement;
  private cols!: HTMLElement;
  private rows: HTMLElement[] = [];
  private total!: HTMLElement;
  private totalValue!: HTMLElement;
  private totalCount!: HTMLElement;
  private footnote!: HTMLElement;

  protected template(): string {
    const { parts, pricesNote } = this.data;
    const rows = parts.map((part) => `
      <div class="part">
        <div class="part-head">${partIcon(part.icon)}<span class="cat">${part.cat}</span></div>
        <div class="opts">${part.options.map((o) => this.option(o)).join('')}</div>
      </div>`).join('');

    return `${this.stepTitle('Etapa 2', 'Escolha as 6 peças', 'A recomendada vem na medida do jogo. <b>A escolha é sua.</b>')}
      <div class="panel">
        <div class="cols"><span class="col rec">${COLUMNS[0]}</span><span class="col">${COLUMNS[1]}</span></div>
        ${rows}
        <div class="total">
          <div>
            <div class="label">Total da sua máquina</div>
            <div class="count"><span class="tnum total-count">0</span> de ${parts.length} peças escolhidas</div>
          </div>
          <div class="value tnum">R$ 0</div>
        </div>
      </div>
      <div class="footnote">${pricesNote}</div>`;
  }

  private option(o: PartOption): string {
    const badge = o.rec ? '<span class="badge rec">Recomendada</span>' : o.tag ? `<span class="badge">${o.tag}</span>` : '';
    return `<div class="opt">
        ${PICK_LAYERS}
        <div class="model">${o.model}</div>
        <div class="meta"><span class="price tnum">${brlCents(o.price)}</span><span>${o.store}</span>${badge}</div>
        <div class="box"></div>
        ${PICK_CHECK}
      </div>`;
  }

  protected override mount(): void {
    this.panel = this.el('.panel');
    this.cols = this.el('.cols');
    this.rows = this.all('.part');
    this.total = this.el('.total');
    this.totalValue = this.el('.total .value');
    this.totalCount = this.el('.total-count');
    this.footnote = this.el('.footnote');
  }

  protected draw(lt: number): void {
    this.drawStepTitle(lt);
    enterSoft(this.panel, seg(lt, 0.8, 1.8), 40);
    enterSoft(this.cols, seg(lt, ROW_START - 0.5, ROW_START + 0.3), 10);
    enterSoft(this.total, seg(lt, ROW_START + 0.2, ROW_START + 1.0), 10);

    let sum = 0;
    let picked = 0;
    this.data.parts.forEach((part, i) => {
      const row = this.rows[i];
      const start = ROW_START + i * ROW_GAP;
      const pickAt = start + PICK_DELAY;
      enterSoft(row, seg(lt, start, start + 0.8), 18);

      // A escolhida ganha anel e check; as outras ficam apagadas.
      const p = easeSoft(seg(lt, pickAt, pickAt + 0.4));
      row.querySelectorAll<HTMLElement>('.opt').forEach((opt, k) => {
        const chosen = k === part.pick;
        drawPick(opt, lt, chosen ? pickAt : null);
        opt.querySelector<HTMLElement>('.box')!.style.opacity = String(chosen ? 1 - p : 1);
        opt.style.opacity = String(chosen ? 1 : 1 - 0.4 * p);
      });

      sum += part.options[part.pick].price * easeSoft(seg(lt, pickAt, pickAt + 0.7));
      if (lt >= pickAt) picked++;
    });

    this.totalValue.textContent = brlCents(sum);
    this.totalCount.textContent = String(picked);
    const end = ROW_START + this.data.parts.length * ROW_GAP;
    enterSoft(this.footnote, seg(lt, end + 0.6, end + 1.4), 8);
  }
}

customElements.define('gg-parts-scene', PartsScene);
