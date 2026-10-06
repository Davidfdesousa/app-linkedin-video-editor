import svg from '../assets/circuit-logo.svg?raw';
import { cubicBezier, seg } from './anim';

/** Markup do logo com o circuito (mesmo SVG do loading do app). */
export const CIRCUIT_LOGO = svg;

/** Duração de um ciclo da corrente percorrendo os traços, igual ao loading do app. */
const CYCLE = 3.4;
const SWEEP_IN = cubicBezier(0.55, 0.05, 0.25, 1);
const SWEEP_OUT = cubicBezier(0.6, 0, 0.9, 0.35);

/**
 * Keyframes de cada traço, copiados do CircuitLoader do app: `w` = largura da
 * máscara; `at` = frações do ciclo em que a corrente começa a entrar, termina
 * de acender, começa a sair e termina de sair. Os tempos são dessincronizados
 * de propósito, pra não parecer um bloco piscando junto.
 */
const SWEEPS = [
  { w: 310.5, at: [0.10, 0.50, 0.76, 0.90] },
  { w: 403.2, at: [0.18, 0.68, 0.82, 0.97] },
  { w: 266.8, at: [0.05, 0.40, 0.73, 0.87] },
  { w: 250.5, at: [0.14, 0.58, 0.79, 0.93] },
  { w: 159.8, at: [0.00, 0.26, 0.70, 0.84] },
] as const;

/**
 * Posiciona as máscaras do circuito no segundo `t`. O app anima isso por CSS;
 * aqui é calculado a partir do tempo, pra o render quadro a quadro sair igual.
 */
export function drawCircuit(root: HTMLElement, t: number): void {
  const p = (t % CYCLE) / CYCLE;
  root.querySelectorAll<SVGRectElement>('.gg-load-sweep').forEach((rect, i) => {
    const { w, at: [inStart, inEnd, outStart, outEnd] } = SWEEPS[i];
    const lit = 0.2 * w;
    const x = p < inEnd
      ? -w + (lit + w) * SWEEP_IN(seg(p, inStart, inEnd))
      : lit + (w - lit) * SWEEP_OUT(seg(p, outStart, outEnd));
    rect.setAttribute('transform', `translate(${x.toFixed(2)} 0)`);
  });
}
