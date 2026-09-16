<!--
Template editável. Não faz parte do base-kit (as 12 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
o cliente recebe regularmente arquivo de dados solto (planilha, export, CSV) e
precisa entender o que ele mostra, sem já ter uma skill estruturada pra aquela
fonte específica. Adaptar ao caso descrito antes de salvar em
.claude/skills/analisar-dados/SKILL.md — nunca sem confirmação explícita.

Diferença pra `relatorio-status` (base-kit): `relatorio-status` é periódico e
estruturado, com fonte de dados já conhecida (ads, projeto, franquia).
`analisar-dados` é pontual — qualquer arquivo que a pessoa jogar na conversa,
sem formato fixo esperado.
-->

---
name: analisar-dados
description: >
  Analisa um arquivo de dados (CSV, Excel, TXT, JSON) e gera um resumo executivo
  com os principais insights, tendências e recomendações. Diferente de
  /relatorio-status (periódico, fonte fixa), serve qualquer arquivo pontual que
  a pessoa jogar na conversa. Use quando o usuário disser "analisa esse
  arquivo", "o que mostram esses dados", "resume esses resultados", "analisa
  esse relatório", ou arrastar um arquivo de dados.
---

# /analisar-dados — Análise de Arquivo

## Dependências

- **Contexto do negócio:** `_memoria/empresa.md` (pra entender o que os dados representam)
- **Tom de voz:** `_memoria/preferencias.md`

## Workflow

### Passo 1 — Entender o contexto

Antes de analisar, perguntar se não estiver claro:
- "O que é esse arquivo? (vendas, anúncios, métricas, respostas de pesquisa...)"
- "Qual é a pergunta principal que você quer responder com esses dados?"

Se o contexto estiver óbvio pelo nome do arquivo ou pelo conteúdo, prossegue sem perguntar.

### Passo 2 — Ler o arquivo

Ler o arquivo fornecido. Se for Excel (.xlsx), usar a skill nativa `/xlsx` pra extrair o conteúdo das células.

### Passo 3 — Análise

Identificar e reportar:

**O que está bom:**
- Métricas acima da média ou em crescimento
- Padrões positivos nos dados
- Top performers (produtos, campanhas, períodos, etc.)

**O que preocupa:**
- Quedas, anomalias ou tendências negativas
- O que está abaixo do esperado
- Gargalos ou desperdícios visíveis

**Comparações:**
- Período atual vs período anterior (se houver)
- Top vs bottom performers
- Distribuição entre categorias

**Insights não óbvios:**
- Correlações interessantes
- Padrões que não aparecem na leitura superficial

### Passo 4 — Output

Gerar um resumo executivo em prosa (não só bullet points):

```markdown
# Análise — [Nome do Arquivo/Relatório]
*[Data da análise]*

## O que esses dados mostram
[2-3 parágrafos com o panorama geral]

## O que está funcionando
[lista com contexto]

## O que merece atenção
[lista com contexto]

## 3 recomendações
1. [ação concreta]
2. [ação concreta]
3. [ação concreta]

## Números-chave
| Métrica | Valor | Contexto |
|---------|-------|---------|
| ... | ... | ... |
```

Salvar em `analises/analise-[nome]-[data].md`.

Perguntar se quer também exportar o resumo em HTML (via `/publicar-site`, se instalado) pra compartilhar ou apresentar.

## Regras

- Análise em prosa, não só listas — o usuário deve poder ler e entender sem abrir o arquivo original
- Nunca inventar dado que não está no arquivo
- Se os dados estiverem incompletos ou com problema, mencionar antes de analisar
- Tom conforme `_memoria/preferencias.md`
