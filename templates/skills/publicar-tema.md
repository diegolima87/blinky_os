<!--
Template editável. Não faz parte do base-kit (as 12 skills sempre instaladas).
O /mapear oferece este template quando o cliente já tem (ou está montando) um
blog/site de conteúdo e quer transformar cada tema da estratégia de SEO num
pacote completo — artigo + carrossel + legendas — de um comando só. Depende
conceitualmente da skill `/seo` já ter rodado (ou pelo menos ter uma lista de
temas) e da skill `/carrossel` pra gerar o resumo visual. Adaptar ao caso
descrito antes de salvar em .claude/skills/publicar-tema/SKILL.md — nunca sem
confirmação explícita.

Esta skill só CRIA o conteúdo (sempre como rascunho). A publicação de verdade
(deploy do blog, post no Instagram/Facebook) fica com o fluxo de deploy do
próprio site do cliente e com `/agendar-publicacao` ou `/publicar-site` (se
instaladas) — nunca automatizar esse passo dentro desta skill.
-->

---
name: publicar-tema
description: >
  Orquestra a criação completa de uma peça de conteúdo SEO + redes sociais a
  partir de um tema. Pega um tema (manual ou da estratégia de conteúdo do
  /seo), escreve o artigo de blog completo (sempre como rascunho), gera o
  carrossel resumo via skill /carrossel, e produz as legendas pra Instagram,
  Facebook e LinkedIn — tudo amarrado, com o carrossel apontando pro blog.
  Use quando o usuário pedir "publicar tema", "gera o conteúdo do tema X",
  "transforma esse tema em post", "cria o conteúdo completo", ou /publicar-tema.
---

# /publicar-tema — Pipeline de conteúdo SEO + redes sociais

Skill orquestradora. Pega um tema → entrega artigo de blog (rascunho) + carrossel + 3 legendas (Insta, FB, LinkedIn), tudo conectado.

## Dependências

- **Estratégia de conteúdo:** `conteudo/seo/05-estrategia-conteudo.md` (lista mestra de temas, criada pelo `/seo`)
- **Outras pesquisas SEO:** `conteudo/seo/01-pesquisa-demanda.md`, `02-analise-concorrencia.md`, `08-geo-otimizacao-ia.md`
- **Skill carrossel:** `.claude/skills/carrossel/SKILL.md` — usar pra fase do carrossel
- **Site (blog):** destino dos artigos varia por cliente (Astro, Hugo, WordPress, outro). Se ainda não tiver site, perguntar antes
- **Tom de voz:** `_memoria/preferencias.md`
- **Contexto:** `_memoria/empresa.md`, `marca/design-guide.md`

## Workflow

### Passo 0 — Escolher o tema

Se o usuário passou um tema explícito → usar.

Se não passou nada → ler `conteudo/seo/05-estrategia-conteudo.md`, listar os artigos satélite + a página pilar, e perguntar:

> "Qual tema da estratégia? (lista de opções)"

Marcar mentalmente quais já viraram blog (checar pasta do blog) pra não duplicar.

### Passo 1 — Pesquisa rápida

Antes de escrever, ler o que tem nas pesquisas SEO sobre esse tema:
- Keyword principal e variações (`01-pesquisa-demanda.md`)
- Como concorrentes tratam (`02-analise-concorrencia.md`) — pra fugir do óbvio
- Ângulo GEO se aplicável (`08-geo-otimizacao-ia.md`) — perguntas que IAs respondem

### Passo 2 — Escrever o blog post

**Destino:** depende do stack do site. Se não estiver claro, confirmar com o usuário (ex.: `site/src/content/blog/<slug>.md` pra Astro, markdown pra colar no editor pra WordPress).

**Slug:** kebab-case curto, sem stopword. Ex.: "Como conservar carne salgada no restaurante" → `conservar-carne-salgada`.

**Frontmatter** (se o stack usa markdown com frontmatter):

```yaml
---
title: "Título atrativo, próximo da keyword"
description: "Meta description 150-160 caracteres, com keyword e benefício pro leitor"
publishedAt: YYYY-MM-DD
author: "<nome configurado em _memoria/empresa.md>"
keywords:
  - keyword principal
  - variação 1
  - variação 2
draft: true
---
```

**Sempre começar com `draft: true`** (ou equivalente do stack). O usuário revisa e publica quando aprovar — essa skill nunca publica sozinha.

**Estrutura do artigo (800-1500 palavras):**

1. **Lead (1-2 parágrafos):** problema concreto do público, sem enrolação
2. **H2 explicativo:** o quê e por quê
3. **H2 prático:** como fazer / o que olhar
4. **H2 comparativo ou de detalhe técnico** (opcional)
5. **H2 onde a empresa se encaixa:** conexão natural com o produto, sem ser propaganda
6. **CTA final:** link WhatsApp / formulário / contato configurado

**Regras de escrita** (seguir `_memoria/preferencias.md` estritamente): sem jargão de marketing/inglês quando o público não usa; frases curtas, parágrafos de 2-4 linhas; concreto (números, certificações, datas, valores quando souber); markdown limpo.

### Passo 3 — Carrossel resumo

Sem perguntar, partir direto pra criação do carrossel chamando `.claude/skills/carrossel/SKILL.md` (texto puro, sem imagem gerada).

**Pasta:** `conteudo/carrosseis/[tema]/` — mesma convenção que o `/carrossel` já usa.

Estrutura de slides do resumo:
- **Slide 1 — capa:** mesmo título do blog (ou variação enxuta)
- **Slides 2-6:** os pontos-chave do blog (1 ideia por slide, frase natural, não bullet seco)
- **Slide final — CTA pro blog:** "Texto completo no nosso blog" + URL do artigo

### Passo 4 — Legendas (3 versões)

Salvar em `conteudo/carrosseis/[tema]/`:

**`legenda.md`** (Instagram + Facebook — mesmo texto): hook na primeira linha, 2-3 parágrafos de contexto, CTA pro carrossel ("Arraste pro lado") + CTA pro blog, bloco de oferta da empresa (diferenciais, contato), 10-15 hashtags (público + nicho + local).

**`legenda-linkedin.md`** (LinkedIn — mais formal, sem hashtag em excesso): hook (pode ser provocativo, profissional), 3-5 parágrafos analíticos — LinkedIn aceita texto longo, sem "arraste pro lado" (público diferente), CTA direto pro blog, sem bloco de oferta agressivo, fechar com 1 linha de quem é a empresa, máx. 3 hashtags do nicho profissional.

### Passo 5 — Resumo de entrega

No fim, mostrar pro usuário uma lista clara do que foi criado e do que falta fazer manualmente:

```
✓ Blog post: <caminho>/<slug>.md (rascunho)
✓ Carrossel: conteudo/carrosseis/<tema>/
✓ Legendas: legenda.md (Insta + FB), legenda-linkedin.md

Pra publicar de verdade:
1. Revisar o blog e aprovar (flipar draft/rascunho)
2. Rebuild/deploy do site (processo próprio do stack do cliente)
3. Renderizar os PNGs do carrossel (passo final do /carrossel)
4. Publicar carrossel no Insta/FB — usar /agendar-publicacao (se instalada) ou publicar manual com legenda.md
5. Publicar no LinkedIn com legenda-linkedin.md (manual — API de empresa exige aprovação demorada)
```

## Quando NÃO usar essa skill

- Pedido de carrossel avulso (sem blog) → usar `/carrossel` direto
- Atualização de artigo existente → editar direto o arquivo
- Post único, frase de impacto → `/carrossel`

## Princípios

1. **Blog é a peça-mãe.** Carrossel e legendas são derivados dele, não o contrário.
2. **Tudo conectado.** Cada peça referencia a outra (carrossel linka pro blog, blog tem CTA pro contato).
3. **Rascunho sempre.** Nunca publicar automaticamente — usuário revisa e decide quando publicar, em qualquer canal.
4. **Linguagem do público real.** Sem corporativês. Sempre.
