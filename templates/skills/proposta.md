<!--
Template editável. O /mapear usa este arquivo como ponto de partida quando uma
empresa cliente precisa de uma variação específica de proposta (ex.: proposta
técnica, proposta de patrocínio, orçamento de obra) — adapta o conteúdo abaixo
ao caso descrito na entrevista antes de salvar em .claude/skills/<nome>/SKILL.md.
A versão genérica já vem instalada em .claude/skills/proposta/SKILL.md.
-->

---
name: proposta
description: >
  Gera uma proposta comercial ou interna profissional em HTML a partir de um
  briefing em texto livre. Aplica a identidade visual da empresa (cores, fontes
  do design-guide.md).
  Use quando o usuário mencionar "proposta", "proposta comercial", "orçamento",
  "apresentação de projeto" ou pedir um documento de venda/aprovação para
  cliente ou área interna.
---

# /proposta — Geração de Proposta

## Dependências

- **Identidade visual:** `marca/design-guide.md`
- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Coletar o briefing

1. "Pra quem é a proposta? (cliente externo ou aprovação interna)"
2. "Qual é o problema ou necessidade a resolver?"
3. "O que está sendo proposto?"
4. "Qual é o valor/investimento?"
5. "Tem prazo ou entregável específico?"

### Passo 2 — Ler os arquivos de memória

Ler `marca/design-guide.md`, `_memoria/empresa.md` e `_memoria/preferencias.md`.

### Passo 3 — Gerar o HTML

Seções: header com logo/nome, destinatário, o problema, a solução, escopo (incluído e não incluído), prazo e entregáveis, investimento, próximos passos, sobre quem entrega. Aplicar cores/fontes do design guide.

### Passo 4 — Salvar

Salvar em `propostas/proposta-[destinatario]-[data].html` ou na pasta específica do caso adaptado.

---

## Regras

- Tom segue `_memoria/preferencias.md`
- Nunca inventar valor, prazo ou escopo
- Sem jargão vazio
