<!--
Template editável. Não faz parte do base-kit (as 11 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
a empresa cliente precisa planejar pauta de redes sociais com regularidade.
Adaptar ao caso descrito antes de salvar em
.claude/skills/calendario-editorial/SKILL.md — nunca sem confirmação explícita.
-->

---
name: calendario-editorial
description: >
  Planeja a pauta de redes sociais variando tipo de post (bastidores, produto,
  depoimento, oferta, educativo), com data, formato e ângulo. Salva em tabela
  markdown com status. Não cria o conteúdo em si — isso é papel de /carrossel
  ou /criar-arte-redes. Use quando o usuário chamar /calendario-editorial, ou
  disser "planeja meu calendário", "organiza minha pauta", "o que eu posto
  essa semana", "monta o cronograma de posts".
---

# /calendario-editorial — Planejamento de Pauta

## Dependências

- **Contexto do negócio:** `_memoria/empresa.md`
- **Foco atual:** `_memoria/estrategia.md`
- **Tom de voz:** `_memoria/preferencias.md`
- **Calendário existente:** `conteudo/calendario-editorial.md` (se já existir)

## Workflow

### 1. Ler o contexto

Ler `_memoria/empresa.md` e `_memoria/estrategia.md` antes de sugerir qualquer pauta — o calendário precisa refletir o negócio real e o foco atual da empresa.

### 2. Verificar o que já existe

Ler `conteudo/calendario-editorial.md` se existir. Se já tiver itens planejados que ainda não foram publicados, não duplicar — continuar a partir de onde parou.

### 3. Definir o período e o ritmo

Se o usuário não disser, perguntar:

> "Quer planejar essa semana, as próximas duas semanas, ou o mês inteiro? E quantos posts por semana fazem sentido pro time de vocês?"

### 4. Montar a pauta

Variar o tipo, sem repetir o mesmo formato ou tema duas vezes seguidas. Tipos comuns (ajustar conforme o negócio — não são fixos):

- **Bastidores:** processo, equipe trabalhando, dia a dia
- **Produto/serviço:** o que a empresa entrega, cases, resultado de cliente
- **Depoimento:** reação de cliente satisfeito (se tiver print ou relato)
- **Oferta:** CTA direto pra converter (vaga, prazo, condição especial)
- **Educativo:** conteúdo de valor relacionado ao que a empresa faz

Pra cada post, definir: dia da semana, tema, formato (carrossel, arte única, ou story) e ângulo/gancho em uma frase.

Mostrar a sugestão antes de salvar:

> "Pauta pra [período]:
>
> [dia] — [tema] — [formato] — [ângulo]
> [dia] — [tema] — [formato] — [ângulo]
>
> Faz sentido ou quer trocar algum?"

Esperar aprovação ou ajuste antes de salvar.

### 5. Salvar

Salvar (ou atualizar) `conteudo/calendario-editorial.md` como tabela, com coluna de status:

```markdown
# Calendário Editorial

| Data | Tema | Formato | Ângulo | Status |
|------|------|---------|--------|--------|
| ... | ... | ... | ... | planejado |
```

Status possíveis: `planejado`, `feito`, `publicado`. Ao adicionar itens novos, manter os que já existem no arquivo.

### 6. Encerrar

> "Calendário salvo em conteudo/calendario-editorial.md. Quando for criar o post de [dia], chama `/carrossel` ou `/criar-arte-redes` com o tema '[tema]'."

## Regras

- Não criar o conteúdo em si (texto, visual) — isso fica pra `/carrossel` e `/criar-arte-redes`.
- Nunca repetir o mesmo tema ou formato dois posts seguidos.
- Tom direto, sem repetir a mesma estrutura de frase entre os itens da pauta.
- Sempre mostrar a pauta pro usuário aprovar antes de salvar.
- Se o usuário já tiver itens `planejado` no arquivo, perguntar se quer marcar algum como `feito`/`publicado` antes de adicionar pauta nova.
