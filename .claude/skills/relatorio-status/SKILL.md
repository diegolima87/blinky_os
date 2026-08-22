---
name: relatorio-status
description: >
  Gera um relatório periódico de status/performance — individual por unidade
  (cliente, franqueado, departamento, projeto) e consolidado — em planilha e
  PDF, a partir de dados fornecidos ou de skills de dados já instaladas.
  Use quando o usuário disser "relatório de status", "relatório semanal",
  "relatório mensal", "como estão as contas/projetos essa semana", ou chamar
  /relatorio-status.
---

# /relatorio-status — Relatório Periódico

Esta skill é genérica por design: serve tanto pra relatório de campanhas de tráfego pago quanto pra status de projetos, saúde financeira de unidades/franquias, ou qualquer métrica recorrente que precise ser acompanhada por múltiplas unidades (clientes, franqueados, departamentos, projetos).

## Dependências

- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`
- **Lista de unidades a reportar:** pasta com uma subpasta por unidade (ex.: `clientes/`, `franqueados/`, `projetos/`), cada uma com um arquivo de dados (ex.: `dados-conta.md`) — ou dados soltos em `dados/`
- **Fonte dos dados:** skill(s) relevante(s) do catálogo (`templates/ferramentas/catalogo.md`) — ex.: `/ads-ratos` pra tráfego pago, planilha via `gspread`, ou arquivo em `dados/` pra análise pontual

---

## Workflow

### Passo 1 — Identificar as unidades a reportar

Se o usuário não especificou, perguntar:

> "Quais unidades entram nesse relatório? (todas as que já estão cadastradas, ou uma lista específica)"

Ler as pastas/arquivos de dados das unidades relevantes. Se nenhuma unidade estiver cadastrada ainda, perguntar:

> "Ainda não tem nenhuma unidade cadastrada. Quer que eu crie a estrutura agora? Preciso saber quais unidades entram e onde estão os dados de cada uma."

Aguardar as informações antes de continuar.

### Passo 2 — Puxar os dados

Pra cada unidade, usar a fonte de dados apropriada (skill do catálogo, planilha, ou arquivo em `dados/`) pra buscar as métricas do período pedido.

Se algum dado estiver faltando pra uma unidade, pular essa métrica pra ela e avisar no final quais unidades/métricas ficaram incompletas — **nunca inventar um número que não veio da fonte**.

### Passo 3 — Montar os relatórios

**Individual (um por unidade):**
Tabela com as métricas do período, comparadas com o período anterior quando o dado existir.

**Consolidado (todas as unidades):**
Tabela com todas as unidades lado a lado, mais um resumo no topo com os totais/médias relevantes.

### Passo 4 — Gerar os arquivos

Usar a skill nativa `/xlsx` pra gerar a planilha (uma aba por unidade + uma aba consolidado) e a skill nativa `/pdf` pra gerar a versão em PDF do consolidado.

Salvar em `relatorios/relatorio-[periodo]-[data].xlsx` e `.pdf` (ou na pasta de relatórios do departamento relevante — ver estrutura em `CLAUDE.md`).

### Passo 5 — Resumo pro usuário

Fechar com um resumo curto em prosa (não só números soltos): o que melhorou, o que caiu, e o que precisa de atenção.

---

## Regras

- Nunca inventar métrica que não veio da fonte de dados — se algo não estiver disponível, marcar como "não disponível" na tabela
- Tom conforme `_memoria/preferencias.md`
- Se for a primeira vez rodando (nenhum relatório anterior salvo), avisar que ainda não há comparação com o período anterior
- Data no nome do arquivo no formato `AAAA-MM-DD`
