import { back, enter, seg } from '../../../lib/anim';
import { LOGO } from '../../../lib/icons';
import { SceneElement } from '../../scene-element/scene-element';
import './intro-scene.css';

/** Abertura: logo, wordmark e slogan. */
export class IntroScene extends SceneElement {
  protected override centered = true;
  private mark!: HTMLElement;
  private word!: HTMLElement;
  private tag!: HTMLElement;

  protected template(): string {
    return `<div class="intro-mark">${LOGO}</div>
      <div class="wordmark intro-word"><b>GG</b> Setup</div>
      <div class="intro-tag">${this.data.intro.tagline}</div>`;
  }

  protected override mount(): void {
    this.mark = this.el('.intro-mark');
    this.word = this.el('.intro-word');
    this.tag = this.el('.intro-tag');
  }

  protected draw(lt: number): void {
    this.mark.style.transform = `scale(${0.4 + 0.6 * back(seg(lt, 0.1, 0.9))})`;
    this.mark.style.opacity = String(seg(lt, 0.1, 0.45));
    enter(this.word, seg(lt, 0.5, 1.3), 50);
    enter(this.tag, seg(lt, 1.1, 1.9), 40);
  }
}

customElements.define('gg-intro-scene', IntroScene);
