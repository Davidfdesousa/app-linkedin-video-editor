/** R$ 1.234,56 */
export const brlCents = (v: number): string =>
  'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** R$ 1.235 */
export const brlInt = (v: number): string => 'R$ ' + Math.round(v).toLocaleString('pt-BR');
