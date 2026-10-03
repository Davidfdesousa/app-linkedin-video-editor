# GG Setup — vídeo LinkedIn

Vídeo 1080×1350 (4:5), 30 fps, feito em HTML/CSS e renderizado quadro a quadro.

## Estrutura

- `index.html`: o vídeo inteiro. No topo do `<script>` fica o bloco **`VIDEO_DATA`** com todos os textos, jogos, peças, preços, FPS e a duração de cada cena. Para mudar o conteúdo, basta editar esse bloco.
- `render.ts`: gera o MP4 (ou PNGs de prévia) com Playwright + ffmpeg.

## Ver e ajustar

Abra o `index.html` no navegador. Ele toca em loop, com:

- botão de pausar
- barra para arrastar a linha do tempo
- barra de espaço para pausar e tocar

## Renderizar

```bash
brew install ffmpeg                # uma vez
npm install
npx playwright install chromium    # uma vez
npm run preview -- 12 30 50        # PNGs em out/ nos segundos 12, 30 e 50
npm run render                     # out/ggsetup-linkedin.mp4
```

## Pontos de edição comuns

- **Duração das cenas:** `VIDEO_DATA.timeline`
- **Comparação final em FPS:** `VIDEO_DATA.compare.topFps` guarda a faixa da config "Tudo que dá" no jogo mais pesado (hoje `[91, 116]` no SILENT HILL f em 1440p). O vídeo mostra "+R$ X por +Y FPS", usando o máximo do ideal contra o mínimo do "Tudo que dá". Com `null`, mostra só a diferença de preço.
- **Faixas de FPS:** em `fpsByResolution`, `tone` pode ser `ok` (Roda liso), `good` (Roda bem) ou `warn` (Jogável).
- **Logo:** troque o SVG dentro de `#intro-mark`, hoje um placeholder.
- **Cores:** são os tokens em `:root`.
