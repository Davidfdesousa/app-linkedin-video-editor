import { back, easeSoft, seg } from './anim';
import { TICK } from './icons';

/** Camadas de seleção (fundo, anel e check) usadas nos cards de jogo e de peça. */
export const PICK_LAYERS = '<div class="pick-tint"></div><div class="pick-ring"></div>';
export const PICK_CHECK = `<div class="pick-check">${TICK}</div>`;

const PICK_DURATION = 0.4;

/**
 * Anima a seleção de um card que tem PICK_LAYERS + PICK_CHECK.
 * `at` = segundo em que é marcado (null = nunca). Retorna o progresso 0→1.
 */
export function drawPick(card: HTMLElement, lt: number, at: number | null): number {
  const raw = at === null ? 0 : seg(lt, at, at + PICK_DURATION);
  const p = easeSoft(raw);
  card.querySelector<HTMLElement>('.pick-tint')!.style.opacity = String(p);
  card.querySelector<HTMLElement>('.pick-ring')!.style.opacity = String(p);
  card.querySelector<HTMLElement>('.pick-check')!.style.transform = `scale(${at === null ? 0 : back(raw)})`;
  return p;
}
