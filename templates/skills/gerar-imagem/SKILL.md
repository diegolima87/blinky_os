<!--
Template editável. Não faz parte do base-kit (as 11 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
a empresa cliente gera imagens por IA com regularidade (posts, criativos,
landing page). Adaptar ao caso descrito antes de salvar em
.claude/skills/gerar-imagem/SKILL.md — nunca sem confirmação explícita.
-->

---
name: gerar-imagem
description: >
  Gera imagens com IA pra posts, criativos e landing pages. Usa Pollinations
  (grátis, sem API key) por padrão; se a empresa já paga por qualidade/upscale
  maior, usa Magnific (ex-Freepik) ou outra API configurada. Escolhe o tamanho
  certo pra plataforma automaticamente. Use quando o usuário pedir pra gerar,
  criar ou fazer uma imagem/foto/arte com IA, ou chamar /gerar-imagem.
---

# /gerar-imagem

## Dependências

- **Identidade visual:** `marca/design-guide.md` — usar só se o pedido envolver cor/elemento de marca específico (a API de imagem não segue CSS, mas pode receber a cor como direção no prompt se fizer sentido)
- **Estilo fotográfico da empresa (opcional):** `references/estilo-fotografico.md`, se a empresa tiver um (ver "Cenas com pessoas" abaixo)
- **Ferramenta grátis:** Pollinations.ai (ver `templates/ferramentas/catalogo.md`)
- **Ferramenta paga (se configurada):** Magnific — `scripts/gerar-imagem.js` e `scripts/upscale-imagem.js`, `MAGNIFIC_API_KEY` no `.env`

## Tamanho por uso (mapear automaticamente, só perguntar se genuinamente ambíguo)

| Uso | Proporção |
|---|---|
| Feed Instagram/Facebook (retrato, formato mais usado hoje) | 4:5 (`social_4_5` na Magnific) |
| Feed quadrado | 1:1 (`square_1_1`) |
| Stories, Reels, TikTok | 9:16 (`social_story_9_16`) |
| Landing page, banner de site, capa larga | 16:9 (`widescreen_16_9`) |
| Post horizontal (LinkedIn, apresentação) | 4:3 (`classic_4_3`) |

## Fluxo

1. **Entender o pedido:** cena/tema, se envolve pessoa ou não, pra que vai servir (post específico, criativo avulso, landing page) e a plataforma/formato — inferir o que der, perguntar só o que faltar.

2. **Cenas com pessoas:** se a empresa já tem um `references/estilo-fotografico.md` (padrão visual pra fotos com gente — ex.: faixa etária, tom, o que evitar), aplicar como base do prompt. Se não tiver, seguir as regras gerais abaixo (sem estilo específico definido). Se o pedido descrever um estilo diferente explicitamente (ilustração, flat design), o pedido do usuário vale mais que qualquer padrão.

3. **Escolher a ferramenta:**
   - **Pollinations (padrão, grátis):** primeira opção sempre. Ver comando no catálogo de ferramentas.
   - **Magnific (se `MAGNIFIC_API_KEY` estiver configurada e o usuário pedir qualidade maior):**
     ```bash
     node --env-file=.env scripts/gerar-imagem.js "<prompt em inglês>" <nome-arquivo> --out <pasta> --tamanho <tamanho> [--n 1] [--negativo "..."]
     ```
     Usar `--n` só se o usuário pedir variações (padrão 1 imagem por geração). Tamanhos válidos estão listados no topo do script.

4. **Pasta de destino:** seguir o padrão de pastas já usado pela empresa pra conteúdo de redes sociais/criativos (ver estrutura em `CLAUDE.md`); se não houver um lugar óbvio, perguntar ou usar `dados/criativos/`.

5. Ler a imagem gerada e mostrar pro usuário antes de considerar concluído.

6. Se o usuário não gostar, ajustar o prompt e gerar de novo — avisar antes de rodar mais de 3 gerações seguidas quando a ferramenta for paga (cada imagem consome crédito).

7. **Upscale (só Magnific):** se o usuário pedir upscale de uma imagem existente:
   ```bash
   node --env-file=.env scripts/upscale-imagem.js caminho/foto.jpg --scale 2x
   ```
   Sobrescreve o arquivo de entrada por padrão. Usar `--formato png` se a imagem tiver fundo transparente.

## Regras

- Sempre oferecer Pollinations primeiro — só subir pra uma API paga se já estiver configurada ou o usuário pedir qualidade maior explicitamente.
- Nunca pedir texto/legenda embutida na imagem — os modelos de imagem erram isso quase sempre. Texto entra depois por cima, via HTML/Playwright, se precisar.
- Imagem de teste gerada durante ajuste de prompt não fica no repositório — apagar antes de encerrar se o usuário não aprovou.
- Prompt sempre em inglês (resultado mais consistente), mesmo que o pedido tenha vindo em português.
- Prompt negativo curto — longo demais pode fazer a API devolver imagem ruim ou preta.
