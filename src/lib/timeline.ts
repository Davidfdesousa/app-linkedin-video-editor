import type { SceneName } from '../types';
import { easeSoft, seg } from './anim';

export type Span = readonly [start: number, end: number];

/** Duração do fade de entrada/saída de cada cena, em segundos. */
export const FADE = 0.6;

export function buildTimeline(entries: [SceneName, number][]): { spans: Record<SceneName, Span>; duration: number } {
  const spans = {} as Record<SceneName, Span>;
  let cursor = 0;
  for (const [name, length] of entries) {
    spans[name] = [cursor, cursor + length];
    cursor += length;
  }
  return { spans, duration: cursor };
}

/** Opacidade de um trecho com fade in/out. `first`/`last` pulam o fade da ponta. */
export function spanAlpha(t: number, [a, b]: Span, first = false, last = false): number {
  if (t < a || t > b) return 0;
  const fadeIn = first ? 1 : easeSoft(seg(t, a, a + FADE));
  const fadeOut = last ? 1 : 1 - easeSoft(seg(t, b - FADE, b));
  return Math.min(fadeIn, fadeOut);
}
