<!--
Template editável. O /mapear usa este arquivo como ponto de partida quando uma
empresa cliente precisa de uma variação específica de ata (ex.: ata de comitê
com quórum e votação, ata de reunião com cliente externo) — adapta o conteúdo
abaixo ao caso descrito na entrevista. A versão genérica já vem instalada em
.claude/skills/ata-reuniao/SKILL.md.
-->

---
name: ata-reuniao
description: >
  Transforma anotações soltas, transcrição ou relato de uma reunião numa ata
  estruturada com decisões e próximos passos claros.
  Use quando o usuário disser "faz a ata dessa reunião", "resume essa reunião",
  "registra as decisões", ou colar notas/transcrição pedindo pra organizar.
---

# /ata-reuniao — Ata e Registro de Decisões

## Dependências

- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Coletar o material

Usar notas/transcrição colada, ou perguntar sobre o quê foi a reunião, quem participou, e pedir o relato.

### Passo 2 — Estruturar a ata

Formato: assunto, data, participantes, pauta, discussão (síntese, não transcrição), decisões (lista), próximos passos (ação/responsável/prazo), pendências.

### Passo 3 — Salvar

Salvar em `reunioes/ata-[assunto]-[data].md` ou na pasta do caso adaptado.

### Passo 4 — Oferecer atualizar memória

Se alguma decisão tem valor duradouro, seguir a regra "Aprender com correções" do `CLAUDE.md`.

---

## Regras

- Tom segue `_memoria/preferencias.md`
- Síntese, não transcrição
- Decisões e próximos passos sempre em lista
- Sem responsável claro → marcar "a definir"
