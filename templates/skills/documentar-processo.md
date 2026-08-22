<!--
Template editável. O /mapear usa este arquivo como ponto de partida quando uma
empresa cliente precisa de uma variação específica de documentação de processo
(ex.: SOP com checklist de compliance, runbook técnico com troubleshooting
detalhado) — adapta o conteúdo abaixo ao caso descrito na entrevista. A versão
genérica já vem instalada em .claude/skills/documentar-processo/SKILL.md.
-->

---
name: documentar-processo
description: >
  Transforma um processo explicado em conversa livre num procedimento (SOP)
  documentado, passo a passo, pronto pra ser seguido por outra pessoa do time.
  Use quando o usuário disser "documenta esse processo", "escreve o passo a
  passo disso", "cria um SOP pra", "registra como fazemos isso".
---

# /documentar-processo — Documentação de Procedimento (SOP)

## Dependências

- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Entender o processo

Perguntar: objetivo, gatilho, passos na ordem, quem executa, critério de conclusão, erros comuns.

### Passo 2 — Estruturar o SOP

Formato: nome, objetivo, responsável(is), frequência, ferramentas, quando executar, passo a passo numerado, como saber que deu certo, erros comuns, data de atualização.

### Passo 3 — Salvar

Salvar em `processos/[nome-do-processo].md` ou na pasta do departamento relevante.

### Passo 4 — Sugerir automação, se fizer sentido

Se o processo for claramente repetitivo, sugerir `/mapear` como próximo passo — não criar skill aqui.

---

## Regras

- Passo a passo executável por quem nunca fez isso antes
- Não inventar passos não descritos
- Sempre datar
