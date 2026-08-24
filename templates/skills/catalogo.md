# Catálogo de Skills

Skills externas prontas pra instalar. Usar como referência ao criar skills novas com `/mapear` antes de escrever qualquer coisa do zero.

> Skills globais ficam em `~/.claude/skills/` e funcionam em qualquer projeto/cliente.
> Skills locais ficam em `.claude/skills/` e só funcionam nesse cliente específico.

---

## Trabalhar com documentos (nativas)

- **`/pdf`** — extrai, cria, junta/separa PDFs. Bom pra contratos, relatórios.
- **`/docx`** — cria e edita Word com formatação. Bom pra propostas formais.
- **`/pptx`** — cria e edita PowerPoint. Bom pra decks e treinamentos.
- **`/xlsx`** — cria e edita planilhas com fórmulas e gráficos. Bom pra relatórios financeiros.
- **`/doc-coauthoring`** — fluxo guiado de coescrita, entrevista e itera rascunhos. Bom pra SOPs, specs, documentos de decisão.

Todas nativas do Claude Code — sem instalação.

---

## Criar interfaces, páginas e visuais (nativas)

- **`/frontend-design`** — interfaces web completas em HTML/CSS/React com visual profissional.
- **`/canvas-design`** — arte visual em PNG/PDF (capas, banners, peças gráficas).

---

## Testar sites e apps

- **`/webapp-testing`** — testa apps web locais com Playwright, captura screenshots, lê logs.

Nativa do Claude Code. Útil quando a empresa cliente tem produto digital próprio.

---

## Descobrir e criar skills

- **`/find-skills`** — busca skills existentes quando não se sabe se já existe algo pronto.
- **`/skill-creator`** — guia estruturado pra criar skills novas do zero. É o que `/mapear` invoca no "Caminho B" quando não há template compatível.

---

## Extrair transcrição de vídeo/áudio

### Transcribe
**O que faz:** Transcreve vídeo/áudio de qualquer plataforma (YouTube, Instagram, TikTok, reunião gravada) usando yt-dlp + Whisper
**Bom pra:** Transcrever reunião gravada, aula, conteúdo de vídeo pra virar ata ou material escrito
**Como instalar:** `git clone https://github.com/duduesh/transcribe ~/.claude/skills/transcribe`

---

## Marketing e tráfego pago (opt-in — só se relevante pro cliente)

### Ads Ratos / Meta Ads Ratos / Google Ads Ratos / GA4 Ratos
**O que fazem:** Diagnóstico, gestão de campanha e leitura de analytics pra Meta Ads, Google Ads e GA4, com benchmarks brasileiros
**Bom pra:** Clientes com operação de marketing/tráfego pago relevante
**Como instalar:** `git clone https://github.com/duduesh/{nome} ~/.claude/skills/{nome}`
**Nota:** Não instalar por padrão — só quando `/instalar` ou `/mapear` identificar que a empresa cliente realmente opera tráfego pago.

### Marketing Skills (coreyhaines31)
**O que faz:** Acervo com 57 skills de marketing — copywriting, SEO, CRO, pricing, growth, cold email, content strategy, pesquisa de cliente, entre outras. Formato padrão de skill, sem API própria.
**Bom pra:** Consultar quando `/mapear` identificar uma necessidade de marketing específica que os `*-ratos` (tráfego pago) não cobrem — SEO, copy, pricing, retenção. Puxar só a skill relevante do acervo, não o pacote inteiro.
**Como instalar:** `git clone https://github.com/coreyhaines31/marketingskills` numa pasta temporária e copiar só `skills/<nome-da-skill>/` pra `.claude/skills/` do cliente.
**Nota:** Não instalar o acervo inteiro de uma vez — 57 skills sem curadoria viram peso morto que ninguém usa. Ler a skill individual antes de trazer pro cliente, igual se faz com qualquer template.
**Fonte:** Terceiros

### Social Media Skills (charlie947)
**O que faz:** 20 skills focadas em marca pessoal — construção de voz (`voice-builder`), posts e hooks de LinkedIn, matriz de conteúdo, roteiro de Reels, thumbnail de YouTube.
**Bom pra:** Sócio ou executivo do cliente com marca pessoal ativa no LinkedIn — ângulo diferente de `carrossel`/`calendario-editorial` (que são sobre o conteúdo *da empresa*, não a voz de uma pessoa).
**Destaque:** `voice-builder` entrevista a pessoa e constrói um guia de voz mais profundo do que o que `_memoria/preferencias.md` captura por padrão — vale considerar se o cliente pedir algo nesse nível de detalhe.
**Como instalar:** `git clone https://github.com/charlie947/social-media-skills` e copiar só a skill específica pra `.claude/skills/`.
**Nota:** A maioria não tem dependência externa; `post-scorer` e `reels-scripting` pedem `APIFY_API_TOKEN`/`GOOGLE_AI_API_KEY` — avisar antes de instalar essas duas.
**Fonte:** Terceiros

---

## Editar vídeo por conversa

### Video-Use
**O que faz:** Edita vídeo inteiro por conversa — transcreve, corta, corrige cor, gera legenda e anima, sempre propondo o plano em prosa e esperando confirmação antes de renderizar.
**Bom pra:** Cliente que produz vídeo de verdade com regularidade (depoimento, aula gravada, institucional, conteúdo de entrevista) — não indicar como primeira automação de conteúdo; `carrossel`/`criar-arte-redes` resolvem o caso mais comum (imagem estática) com bem menos setup.
**Como instalar:** `git clone https://github.com/browser-use/video-use ~/.claude/skills/video-use`
**Nota:** Dependência pesada — precisa de `ffmpeg`, `ffprobe`, `yt-dlp`, Python 3, Node.js 22+ e uma chave da ElevenLabs pra transcrição (Manim/Remotion são opcionais, só pra animação). Avisar o cliente do setup antes de instalar, e confirmar que o processo de vídeo é recorrente de verdade — não pontual.
**Fonte:** Terceiros (browser-use)

---

## Como adicionar skills novas a este catálogo

Se uma skill nova foi testada e vale a pena guardar como referência pra outros clientes:

```markdown
### Nome da Skill
**O que faz:** [descrição em uma frase]
**Bom pra:** [casos de uso práticos]
**Como instalar:** [comando ou instrução]
**Fonte:** [nativa, criada internamente, ou de terceiros]
```
