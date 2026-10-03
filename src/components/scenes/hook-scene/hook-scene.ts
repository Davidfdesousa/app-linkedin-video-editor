import { enter, seg } from '../../../lib/anim';
import { SceneElement } from '../../scene-element/scene-element';
import './hook-scene.css';

/** Gancho: a pergunta que abre o vídeo. */
export class HookScene extends SceneElement {
  protected override centered = true;
  private eyebrow!: HTMLElement;
  private line!: HTMLElement;
  private sub!: HTMLElement;

  protected template(): string {
    const { eyebrow, line, sub } = this.data.hook;
    return `<div class="eyebrow hook-eyebrow">${eyebrow}</div>
      <div class="h1 hook-line">${line}</div>
      <div class="sub hook-sub">${sub}</div>`;
  }

  protected override mount(): void {
    this.eyebrow = this.el('.hook-eyebrow');
    this.line = this.el('.hook-line');
    this.sub = this.el('.hook-sub');
  }

  protected draw(lt: number): void {
    enter(this.eyebrow, seg(lt, 0.3, 1.0), 30);
    enter(this.line, seg(lt, 0.6, 1.5), 50);
    enter(this.sub, seg(lt, 1.5, 2.3), 30);
  }
}

customElements.define('gg-hook-scene', HookScene);
