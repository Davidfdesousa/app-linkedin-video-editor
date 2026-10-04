/**
 * VIDEO_DATA — edite aqui textos, jogos, peças, preços e FPS.
 * Os componentes só leem estes dados.
 *
 * Fonte: ggsetup.com.br, preços lidos em 23/07/2026 (Cyberpunk 2077, ELDEN RING,
 * The Last of Us Part II e SILENT HILL f).
 */
import type { VideoData } from '../types';

export const VIDEO_DATA: VideoData = {
  intro: {
    tagline: 'Escolha seus jogos.<br><span class="text-strong">A gente monta o PC.</span>',
  },
  hook: {
    eyebrow: 'Vai montar um PC gamer?',
    line: 'Comece pelo que importa:<br><span class="text-accent">os seus jogos.</span>',
    sub: 'Peças na medida, preços de lojas confiáveis e FPS estimado.',
  },

  // Etapa 1 — `pickAt` = segundo (dentro da cena) em que o jogo é marcado; null = não selecionado.
  games: [
    { name: 'Cyberpunk 2077',         meta: '#48 mais jogado na Steam', color: '#F2E14C', pickAt: 2.2 },
    { name: 'ELDEN RING',             meta: '#54 mais jogado na Steam', color: '#C9A85C', pickAt: 2.8 },
    { name: 'The Last of Us Part II', meta: 'Remastered · 2025',        color: '#6FA287', pickAt: 3.4 },
    { name: 'Counter-Strike 2',       meta: 'FPS competitivo',          color: '#F5B94A', pickAt: null },
    { name: 'Apex Legends',           meta: 'Battle royale',            color: '#E2735B', pickAt: null },
    { name: 'SILENT HILL f',          meta: 'Lançamento 2025',          color: '#C8323C', pickAt: 6.8, fromSearch: true, heaviest: true },
  ],
  searchQuery: 'SILENT HILL f',
  resolution: '1440p',

  // Etapa 2 — ordem igual à do site. Cada peça mostra 2+ opções reais do site;
  // `rec` = recomendada (ganha o selo), `pick` = índice da opção que o usuário marca.
  parts: [
    { cat: 'Processador', icon: 'cpu', pick: 0, options: [
      { model: 'Intel Core i5-14400F',        store: 'Pichau', price: 999.99, rec: true },
      { model: 'AMD Ryzen 7 9700X',           store: 'Pichau', price: 1699.99 },
    ] },
    { cat: 'Placa-mãe', icon: 'mobo', pick: 0, options: [
      { model: 'Macrovip MV-B760 DDR5',       store: 'KaBuM!', price: 560.90, rec: true },
      { model: 'MSI Pro B760M-P DDR5',        store: 'KaBuM!', price: 659.21 },
    ] },
    { cat: 'Memória RAM', icon: 'ram', pick: 0, options: [
      { model: 'XPG Lancer Blade RGB 16 GB',  store: 'Pichau', price: 1749.99, rec: true },
      { model: 'Corsair Vengeance 2×8 GB',    store: 'KaBuM!', price: 2139.99 },
    ] },
    { cat: 'Placa de vídeo', icon: 'gpu', pick: 0, options: [
      { model: 'PowerColor Radeon RX 9070',   store: 'Pichau', price: 3899.99, rec: true },
      { model: 'PowerColor RX 9060 XT 8 GB',  store: 'Pichau', price: 2799.99, tag: 'Mais em conta' },
    ] },
    { cat: 'Fonte', icon: 'psu', pick: 0, options: [
      { model: 'BPC V2 750 W Semi-modular',   store: 'KaBuM!', price: 272.08, rec: true },
      { model: 'Kalkan 750 W 80 Plus Bronze', store: 'KaBuM!', price: 269.99 },
    ] },
    { cat: 'SSD', icon: 'ssd', pick: 0, options: [
      { model: 'SanDisk Plus 1 TB NVMe',      store: 'KaBuM!', price: 959.20, rec: true },
      { model: 'Kingston NV3 1 TB PCIe 4',    store: 'KaBuM!', price: 1044.05, tag: 'Custo-benefício' },
    ] },
  ],
  pricesNote: 'Preços lidos no GG Setup em 23/07/2026 · mudam ao longo do dia',

  // Etapa 3 — FPS do jogo mais pesado, por resolução (valores do site).
  // tone: 'ok' = Roda liso, 'good' = Roda bem, 'warn' = Jogável.
  heaviestGame: 'SILENT HILL f',
  fpsByResolution: [
    { res: 'Full HD', lo: 97, hi: 123, label: 'Roda liso', tone: 'ok' },
    { res: '1440p',   lo: 70, hi: 89,  label: 'Roda liso', tone: 'ok', selected: true },
    { res: '4K',      lo: 41, hi: 52,  label: 'Roda bem',  tone: 'good' },
  ],
  fpsScaleMax: 140,
  fpsSummary: 'Roda todos os jogos da sua lista em alta, acima de 60 FPS em 1440p.',
  gpuNote: '<b>Radeon RX 9070</b>: R$ 1.100 a mais que a Radeon RX 9060 XT e entrega <b>+24 FPS</b> no SILENT HILL f em 1440p.',
  fpsNote: 'Estimativas do GG Setup · sempre em faixa',

  // Comparação — "Ideal pra você" × "Tudo que dá".
  compare: {
    idealLabel: 'Ideal pra você',
    topLabel: 'Tudo que dá',
    idealPrice: 8442.15,
    topPrice: 26969.85,
    game: 'SILENT HILL f',
    idealFps: [70, 89],
    // Faixa de FPS da config "Tudo que dá" (Core Ultra 9 285K + RTX 5080) no jogo mais pesado, em 1440p.
    // A conta compara a média de cada faixa: (70+89)/2 ≈ 80 contra (91+116)/2 ≈ 104.
    topFps: [91, 116],
    note: 'Preços lidos no GG Setup em 23/07/2026 · KaBuM! e Pichau',
  },

  cta: {
    pills: ['Grátis', 'Sem cadastro', 'KaBuM! × Pichau'],
    button: 'Monte o seu',
  },

  // Duração de cada cena em segundos (animação + tempo de leitura).
  timeline: [
    ['intro', 4.0],
    ['hook', 6.0],
    ['games', 11.5],
    ['parts', 19.0],
    ['fps', 13.0],
    ['compare', 12.5],
    ['cta', 6.0],
  ],
};
