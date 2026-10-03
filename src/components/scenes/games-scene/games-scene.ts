import { easeOut, easeSoft, enter, seg } from '../../../lib/anim';
import { SEARCH } from '../../../lib/icons';
import { PICK_CHECK, PICK_LAYERS, drawPick } from '../../../lib/pick';
import { SceneElement } from '../../scene-element/scene-element';
import './games-scene.css';

/** Momentos (s, tempo local) da busca digitada e da troca de resolução. */
const SEARCH_OPEN = 4.9;
const TYPE_START = 5.2;
const TYPE_END = 6.3;
const SEARCH_CLOSE = 6.9;
const RESOLUTION_SWITCH = 7.6;
const HEAVY_LABEL = 8.4;

/** Etapa 1: escolha dos jogos, com busca e resolução da tela. */
export class GamesScene extends SceneElement {
  private panel!: HTMLElement;
  private cards: HTMLElement[] = [];
  private searchText!: HTMLElement;
  private placeholder!: HTMLElement;
  private caret!: HTMLElement;
  private count!: HTMLElement;
  private chipDefault!: HTMLElement;
  private chipTarget!: HTMLElement;

  protected template(): string {
    const { games, resolution } = this.data;
    const cards = games.map((g) => `
      <div class="game">
        ${PICK_LAYERS}
        <div class="swatch" style="background:${g.color}"></div>
        <div class="name">${g.name}</div>
        <div class="meta">${g.meta}${g.heaviest ? ' <span class="heavy">· o mais pesado</span>' : ''}</div>
        ${PICK_CHECK}
      </div>`).join('');

    return `${this.stepTitle('Etapa 1', 'O que você quer jogar?', 'Escolha até 5. <b>O mais pesado define a máquina.</b>')}
      <div class="panel">
        <div class="search">
          ${SEARCH}<span class="search-text"></span><span class="caret"></span><span class="placeholder">Buscar jogo…</span>
        </div>
        <div class="games">${cards}</div>
        <div class="games-footer">
          <div class="counter"><span class="game-count tnum">0</span> / 5 jogos</div>
          <div class="chips">
            <div class="chip chip-default">Full HD</div>
            <div class="chip chip-target">${resolution}</div>
            <div class="chip">4K</div>
          </div>
        </div>
      </div>`;
  }

  protected override mount(): void {
    this.panel = this.el('.panel');
    this.cards = this.all('.game');
    this.searchText = this.el('.search-text');
    this.placeholder = this.el('.placeholder');
    this.caret = this.el('.caret');
    this.count = this.el('.game-count');
    this.chipDefault = this.el('.chip-default');
    this.chipTarget = this.el('.chip-target');
  }

  protected draw(lt: number): void {
    this.drawStepTitle(lt);
    enter(this.panel, seg(lt, 0.6, 1.4), 60);
    this.drawSearch(lt);

    let picked = 0;
    this.data.games.forEach((game, i) => {
      const card = this.cards[i];
      if (game.fromSearch) {
        const p = easeOut(seg(lt, TYPE_END, TYPE_END + 0.4));
        card.style.opacity = String(p);
        card.style.transform = `scale(${0.94 + 0.06 * p})`;
      } else {
        enter(card, seg(lt, 1.0 + i * 0.1, 1.6 + i * 0.1), 20);
      }
      drawPick(card, lt, game.pickAt);
      const heavy = card.querySelector<HTMLElement>('.heavy');
      if (heavy) heavy.style.opacity = String(easeSoft(seg(lt, HEAVY_LABEL, HEAVY_LABEL + 0.6)));
      if (game.pickAt !== null && lt >= game.pickAt) picked++;
    });
    this.count.textContent = String(picked);

    const switched = lt >= RESOLUTION_SWITCH;
    this.chipDefault.classList.toggle('on', !switched);
    this.chipTarget.classList.toggle('on', switched);
  }

  private drawSearch(lt: number): void {
    const query = this.data.searchQuery;
    const typed = query.slice(0, Math.round(seg(lt, TYPE_START, TYPE_END) * query.length));
    const searching = lt > SEARCH_OPEN && lt < SEARCH_CLOSE;
    this.searchText.textContent = searching ? typed : '';
    this.placeholder.style.display = searching && typed.length ? 'none' : 'inline';
    this.caret.style.opacity = String(searching ? (Math.floor(lt * 2.5) % 2 ? 1 : 0.2) : 0);
  }
}

customElements.define('gg-games-scene', GamesScene);
