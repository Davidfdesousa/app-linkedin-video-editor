export type SceneName = 'intro' | 'hook' | 'games' | 'parts' | 'fps' | 'compare' | 'cta';

export type IconName = 'cpu' | 'gpu' | 'ram' | 'mobo' | 'psu' | 'ssd';

/** 'ok' = Roda liso, 'good' = Roda bem, 'warn' = Jogável. */
export type FpsTone = 'ok' | 'good' | 'warn';

export type FpsRange = readonly [lo: number, hi: number];

export interface Game {
  name: string;
  meta: string;
  color: string;
  /** Segundo (dentro da cena) em que o jogo é marcado; null = não selecionado. */
  pickAt: number | null;
  /** Aparece só depois da busca digitada. */
  fromSearch?: boolean;
  /** Recebe o selo "o mais pesado". */
  heaviest?: boolean;
}

export interface PartOption {
  model: string;
  store: string;
  price: number;
  /** Recomendada pelo site: ganha o selo "Recomendada". */
  rec?: boolean;
  /** Selo opcional das outras opções, ex.: "Mais em conta". */
  tag?: string;
}

export interface Part {
  cat: string;
  icon: IconName;
  /** Índice, em `options`, da opção que o usuário marca. */
  pick: number;
  options: PartOption[];
}

export interface FpsByResolution {
  res: string;
  lo: number;
  hi: number;
  label: string;
  tone: FpsTone;
  /** Resolução da tela do usuário: ganha destaque. */
  selected?: boolean;
}

export interface CompareData {
  idealLabel: string;
  topLabel: string;
  idealPrice: number;
  topPrice: number;
  game: string;
  idealFps: FpsRange;
  /** Faixa de FPS da config "Tudo que dá" no jogo mais pesado; null mostra só a diferença de preço. */
  topFps: FpsRange | null;
  note: string;
}

export interface VideoData {
  intro: { tagline: string };
  hook: { eyebrow: string; line: string; sub: string };
  games: Game[];
  searchQuery: string;
  resolution: string;
  /** Linha de fonte da etapa 1 (de onde vêm os jogos e os requisitos). */
  gamesNote: string;
  parts: Part[];
  pricesNote: string;
  heaviestGame: string;
  fpsByResolution: FpsByResolution[];
  fpsScaleMax: number;
  fpsSummary: string;
  gpuNote: string;
  fpsNote: string;
  compare: CompareData;
  cta: { pills: string[]; button: string };
  /** Ordem e duração (s) de cada cena. */
  timeline: [SceneName, number][];
}
