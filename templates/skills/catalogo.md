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
