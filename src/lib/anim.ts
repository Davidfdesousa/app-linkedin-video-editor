/** Funções puras de animação: todo quadro é calculado a partir do tempo, sem estado. */

export const clamp = (x: number, min = 0, max = 1): number => Math.min(max, Math.max(min, x));

/** Progresso 0→1 de `t` entre `a` e `b`. */
export const seg = (t: number, a: number, b: number): number => clamp((t - a) / (b - a));

export const easeOut = (x: number): number => 1 - Math.pow(1 - x, 3);
export const easeSoft = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;
export const easeInOut = (x: number): number => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Ease com leve "passada" do alvo (efeito de mola). */
export const back = (x: number): number => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

/** Entrada com fade + subida (easeOut). */
export function enter(el: HTMLElement, p: number, dy = 40): void {
  const e = easeOut(p);
  el.style.opacity = String(e);
  el.style.transform = `translateY(${(1 - e) * dy}px)`;
}

/** Entrada mais suave, para blocos que entram em sequência. */
export function enterSoft(el: HTMLElement, p: number, dy = 18): void {
  const e = easeSoft(p);
  el.style.opacity = String(e);
  el.style.transform = `translateY(${(1 - e) * dy}px)`;
}
