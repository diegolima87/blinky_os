---
name: documentar-processo
description: >
  Transforma um processo explicado em conversa livre num procedimento (SOP)
  documentado, passo a passo, pronto pra ser seguido por outra pessoa do time.
  Use quando o usuário disser "documenta esse processo", "escreve o passo a
  passo disso", "cria um SOP pra", "registra como fazemos isso", ou explicar
  um fluxo de trabalho pedindo pra virar documentação.
---

# /documentar-processo — Documentação de Procedimento (SOP)

## Diferença em relação ao `/mapear`

Esta skill **documenta** um processo em texto claro pra qualquer pessoa do time seguir. Ela não cria automação nem skill nova — só transforma conhecimento tácito em procedimento escrito. Se o processo documentado aqui acabar sendo repetitivo o suficiente pra virar uma automação, use `/mapear` depois.

## Dependências

- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Entender o processo

Se o usuário já explicou o processo livremente, usar isso como base. Se faltar clareza, perguntar:

1. "Qual é o objetivo desse processo — o que ele resolve ou entrega?"
2. "Quando ele começa? O que dispara ele?"
3. "Quais são os passos, na ordem?"
4. "Quem normalmente faz isso? Precisa de acesso ou permissão específica?"
5. "Como se sabe que terminou certo? Tem algum jeito de dar errado que vale avisar?"

### Passo 2 — Estruturar o SOP

Gerar em markdown, no formato:

```markdown
# [Nome do Processo]

**Objetivo:** [o que esse processo entrega/resolve, em uma frase]
**Responsável(is):** [quem normalmente executa]
**Frequência:** [diário / semanal / sob demanda / gatilho específico]
**Ferramentas necessárias:** [lista, se houver]

## Quando executar
[o que dispara esse processo]

## Passo a passo
1. [passo 1]
2. [passo 2]
3. ...

## Como saber que deu certo
[critério de conclusão / resultado esperado]

## Erros comuns e como evitar
- [erro comum 1 → como evitar]
- [erro comum 2 → como evitar]

## Última atualização
[data]
```

### Passo 3 — Salvar

Salvar em `processos/[nome-do-processo].md` (ou na pasta do departamento relevante, se o processo for específico de uma área — ver estrutura em `CLAUDE.md`).

### Passo 4 — Sugerir automação, se fizer sentido

Se o processo documentado é claramente repetitivo e sempre segue os mesmos passos, perguntar:

> "Esse processo parece repetitivo o bastante pra virar uma automação. Quer rodar `/mapear` pra transformar isso numa skill?"

Não criar a skill diretamente aqui — apenas sugerir o próximo passo.

---

## Regras

- Tom direto, sem jargão de consultoria
- Passo a passo deve ser executável por alguém que nunca fez isso antes — sem pular etapas óbvias só pra quem já sabe
- Não inventar passos que não foram descritos — se algo ficou vago, perguntar antes de preencher
- Sempre datar o documento pra saber quando precisa de revisão
