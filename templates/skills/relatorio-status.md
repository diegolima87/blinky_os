<!--
Template editável. O /mapear usa este arquivo como ponto de partida quando uma
empresa cliente precisa de uma variação específica de relatório periódico
(ex.: relatório financeiro mensal por unidade, relatório de SLA de suporte,
relatório de performance de tráfego pago) — adapta o conteúdo abaixo ao caso
descrito na entrevista. A versão genérica já vem instalada em
.claude/skills/relatorio-status/SKILL.md.
-->

---
name: relatorio-status
description: >
  Gera um relatório periódico de status/performance — individual por unidade
  e consolidado — em planilha e PDF, a partir de dados fornecidos ou de skills
  de dados já instaladas.
  Use quando o usuário disser "relatório de status", "relatório semanal",
  "relatório mensal", "como estão as contas/projetos essa semana".
---

# /relatorio-status — Relatório Periódico

## Dependências

- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`
- **Lista de unidades a reportar:** pasta com subpasta por unidade, cada uma com arquivo de dados
- **Fonte dos dados:** skill relevante do catálogo, planilha, ou arquivo em `dados/`

---

## Workflow

### Passo 1 — Identificar as unidades a reportar

Ler as pastas/arquivos de dados das unidades relevantes.

### Passo 2 — Puxar os dados

Buscar as métricas do período pedido pra cada unidade. Nunca inventar dado que não veio da fonte.

### Passo 3 — Montar os relatórios

Individual (por unidade, comparado ao período anterior) e consolidado (todas as unidades + resumo de totais).

### Passo 4 — Gerar os arquivos

`/xlsx` pra planilha (uma aba por unidade + consolidado), `/pdf` pra versão em PDF do consolidado. Salvar em `relatorios/relatorio-[periodo]-[data].{xlsx,pdf}`.

### Passo 5 — Resumo pro usuário

Fechar com resumo em prosa: o que melhorou, o que caiu, o que precisa de atenção.

---

## Regras

- Nunca inventar métrica
- Tom conforme `_memoria/preferencias.md`
- Data no nome do arquivo em `AAAA-MM-DD`
