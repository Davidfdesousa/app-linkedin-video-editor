# GG Setup — vídeo LinkedIn

Vídeo 1080×1350 (4:5), 30 fps, feito com Vite + TypeScript + Web Components e renderizado quadro a quadro.

## Começar

```bash
npm install
npx playwright install chromium    # uma vez
npm run dev                        # prévia no navegador, com hot reload
```

A prévia toca em loop, com botão de pausar, barra para arrastar a linha do tempo e barra de espaço para pausar e tocar.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Prévia interativa no navegador |
| `npm run frames -- 12 30 50` | PNGs em `out/` nos segundos 12, 30 e 50 |
| `npm run render` | Gera `out/ggsetup-linkedin.mp4` (requer `ffmpeg` no PATH) |
| `npm run typecheck` | Checagem de tipos |
| `npm run build` | Typecheck + build estático em `dist/` |

`frames` e `render` sobem o servidor do Vite sozinhos; não precisa rodar o `dev` antes.

## Commits e releases

O versionamento é automático com [semantic-release](https://semantic-release.gitbook.io/), igual ao GG Setup:

- As mensagens seguem o [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `refactor:`, `chore:`…). O hook `commit-msg` (husky + commitlint) recusa commits fora do padrão.
- A cada push em `main` ou `develop`, o workflow `.github/workflows/release.yml` roda o build e o semantic-release.
- `feat` gera versão minor, `fix` gera patch e `BREAKING CHANGE` gera major. Os outros tipos não geram versão.
- Em `main` sai a versão estável; em `develop` sai um pre-release (`x.y.z-develop.N`).
- Cada release atualiza o `CHANGELOG.md`, a versão no `package.json` e cria a tag e a Release no GitHub.

## Estrutura

```
index.html                  só o <gg-video> e o script de entrada
render.ts                   Vite + Playwright + ffmpeg → MP4 / PNGs
src/
  main.ts                   carrega os dados, expõe window.render e liga a prévia
  types.ts                  tipos de VIDEO_DATA
  data/video-data.ts        ← todo o conteúdo do vídeo (textos, jogos, peças, preços, FPS, timeline)
  lib/                      funções puras: easing, timeline, formatação de R$, ícones, seleção de cards
  styles/                   tokens de cor, reset/base e estilos compartilhados
  components/               uma pasta por componente, com o .ts e o .css juntos
    gg-video/               o quadro: monta as cenas na ordem da timeline e desenha o tempo t
    gg-header/              logo + pílulas de etapa
    gg-controls/            controles da prévia (não aparecem no vídeo)
    scene-element/          classe base das cenas
    scenes/
      intro-scene/  hook-scene/  games-scene/  parts-scene/
      fps-scene/  compare-scene/  cta-scene/
```

Cada cena estende `SceneElement`: monta o HTML uma vez em `template()` e desenha cada quadro em `draw(lt)`, onde `lt` é o tempo dentro da cena. `draw` não guarda estado, então o mesmo tempo sempre gera o mesmo quadro, e é isso que permite renderizar o MP4 quadro a quadro.

## Pontos de edição comuns

- **Conteúdo:** tudo fica em `src/data/video-data.ts`.
- **Duração das cenas:** `timeline` no mesmo arquivo.
- **Peças (etapa 2):** cada peça tem `options` (2 ou mais) e `pick`, o índice da opção marcada. A opção com `rec: true` ganha o selo "Recomendada"; `tag` dá um selo às outras.
- **Comparação final em FPS:** `compare.topFps` guarda a faixa da config "Tudo que dá" no jogo mais pesado (hoje `[91, 116]` no SILENT HILL f em 1440p). O vídeo mostra "+R$ X por +Y FPS", usando o máximo do ideal contra o mínimo do "Tudo que dá". Com `null`, mostra só a diferença de preço.
- **Faixas de FPS:** em `fpsByResolution`, `tone` pode ser `ok` (Roda liso), `good` (Roda bem) ou `warn` (Jogável).
- **Logo:** troque o SVG `LOGO` em `src/lib/icons.ts`, hoje um placeholder.
- **Cores:** tokens em `src/styles/tokens.css`.
