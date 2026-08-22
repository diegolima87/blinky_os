<!--
Template editável. O /mapear usa este arquivo como ponto de partida quando uma
empresa cliente precisa de uma variação específica de email (ex.: email de
cobrança com régua de tom, email de onboarding de cliente novo) — adapta o
conteúdo abaixo ao caso descrito na entrevista. A versão genérica já vem
instalada em .claude/skills/email-profissional/SKILL.md.
-->

---
name: email-profissional
description: >
  Rascunha um email profissional a partir de um contexto livre.
  Calibra o tom ao destinatário e ao objetivo do email.
  Use quando o usuário disser "escreve um email pra", "preciso mandar um email
  sobre", "como eu respondo isso", "faz um email pra [cliente/pessoa]".
---

# /email-profissional — Rascunho de Email

## Dependências

- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Coletar o contexto

Pra quem é, qual o objetivo, o que precisa constar ou evitar.

### Passo 2 — Escrever o email

Tom proporcional à relação, objetivo claro na abertura, uma ação por vez. Estrutura: assunto direto, saudação, contexto, ponto principal, próximo passo, assinatura (de `_memoria/empresa.md`).

### Passo 3 — Apresentar opções de tom (quando delicado)

Assuntos delicados (cobrança, feedback negativo, recusa): oferecer versão mais direta e versão mais suave.

---

## Regras

- Tom segue `_memoria/preferencias.md`
- Assunto específico, nunca vago
- Resposta a algo → citar contexto na primeira linha
