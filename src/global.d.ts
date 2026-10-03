export {};

declare global {
  interface Window {
    /** Definido pelo render.ts antes da página carregar: desliga a prévia interativa. */
    __RENDER?: boolean;
    /** Desenha o quadro do segundo `t`. Determinístico: o mesmo `t` gera sempre o mesmo quadro. */
    render: (t: number) => void;
    /** Duração total do vídeo em segundos. */
    DURATION: number;
  }
}
