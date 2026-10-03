import { back, enter, seg } from '../../../lib/anim';
import { ARROW } from '../../../lib/icons';
import { SceneElement } from '../../scene-element/scene-element';
import './cta-scene.css';

/** Encerramento: endereço do site e chamada para ação. */
export class CtaScene extends SceneElement {
  protected override centered = true;
  private word!: HTMLElement;
  private url!: HTMLElement;
  private pills!: HTMLElement;
  private button!: HTMLElement;

  protected template(): string {
    const { pills, button } = this.data.cta;
    return `<div class="wordmark cta-word"><b>GG</b> Setup</div>
      <div class="url">ggsetup<b>.com.br</b></div>
      <div class="pills">${pills.map((p) => `<div class="pill">${p}</div>`).join('')}</div>
      <div class="cta-btn"><span>${button}</span>${ARROW}</div>`;
  }

  protected override mount(): void {
    this.word = this.el('.cta-word');
    this.url = this.el('.url');
    this.pills = this.el('.pills');
    this.button = this.el('.cta-btn');
  }

  protected draw(lt: number): void {
    enter(this.word, seg(lt, 0.3, 1.0), 40);
    enter(this.url, seg(lt, 0.7, 1.4), 40);
    enter(this.pills, seg(lt, 1.2, 1.9), 30);
    this.button.style.opacity = String(seg(lt, 1.7, 1.95));
    this.button.style.transform = `scale(${0.6 + 0.4 * back(seg(lt, 1.7, 2.4))})`;
  }
}

customElements.define('gg-cta-scene', CtaScene);
