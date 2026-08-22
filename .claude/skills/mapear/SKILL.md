---
name: mapear
description: >
  Entrevista o usuário sobre os processos repetitivos do time e cria pastas e skills
  personalizadas pro dia a dia da empresa cliente. Rodar depois do /instalar, e de novo
  a cada departamento novo que entra no rollout.
  Use quando o usuário chamar /mapear, quando disser "quero organizar os processos",
  "quero criar skills", "mapear tarefas", ou "personalizar o ambiente".
---

# /mapear — Mapeamento de Processos

## Contexto

Essa skill é o segundo passo depois do `/instalar`. A instalação configurou quem é a empresa. Agora é hora de entender **o que o time faz no dia a dia** e criar a estrutura certa pra isso.

**Regra central desta skill (não negociável): nunca criar um arquivo de skill sem confirmação explícita do usuário.** Essa é a diferença mais importante entre "sugerir uma automação" e "instalar automação por conta própria" — o Blinky OS sempre mostra o plano e espera "sim" antes de criar qualquer coisa.

## Antes de começar

1. Ler `_memoria/empresa.md` pra entender a empresa
2. Ler `_memoria/estrategia.md` pra saber a fase do rollout e o foco atual
3. Ler `templates/ferramentas/catalogo.md` pra saber quais APIs, CLIs e MCPs estão disponíveis
4. Ler `templates/skills/catalogo.md` pra saber quais skills externas prontas existem
5. Listar as pastas que já existem no workspace (pra não criar duplicatas)
6. Listar os templates disponíveis em `templates/skills/` (pra saber o que já temos pronto)
7. Listar as skills já instaladas em `.claude/skills/` (pra não recriar o que já existe)

## Fase 1 — Descoberta

Começar com uma pergunta aberta:

> "Me conta: quais são as coisas que o time faz toda semana (ou todo mês) que tomam tempo? Pode ser qualquer coisa: propostas, relatórios, atas de reunião, documentar um processo, responder cliente, montar apresentação..."

Deixar o usuário responder livremente. Depois, fazer perguntas de aprofundamento conforme necessário:

- "Esse [processo X] segue sempre o mesmo passo a passo ou muda muito?"
- "O resultado final é um arquivo? Se sim, onde é guardado hoje?"
- "Tem alguma coisa que precisa acontecer antes de começar? Tipo juntar informações, ler algo?"
- "Com que frequência isso acontece?"
- "Quem no time faz isso hoje?"

Se a fase do rollout (em `estrategia.md`) for **piloto**, focar a descoberta num time/pessoa só. Se for **departamental**, focar no departamento que está entrando agora. Se for **empresa toda**, perguntar livremente por qualquer área.

O objetivo é montar uma lista clara de processos repetitivos. Pra cada um, entender:
- **O que é** (em uma frase)
- **Frequência** (diário, semanal, por demanda)
- **Se gera um entregável** (arquivo, documento, relatório) ou é só um processo
- **Se segue um passo a passo consistente** ou varia muito

## Fase 2 — Apresentar o mapa

Quando tiver entendido o suficiente (geralmente 3-6 processos), apresentar o mapa:

> "Beleza, identifiquei esses processos:
>
> 1. **[nome do processo]** — [frequência] — [gera entregável / é um fluxo]
> 2. **[nome do processo]** — [frequência] — [gera entregável / é um fluxo]
> 3. ...
>
> Qual quer organizar primeiro?"

Aguardar o usuário escolher. Mapear um por vez.

## Fase 3 — Organizar cada processo

Para o processo escolhido, seguir esta lógica:

### 3.1 — Verificar se já tem algo pronto

Verificar em duas fontes, nessa ordem:

**1. Templates de skills** (`templates/skills/`) — skills editáveis pra instalar no projeto.

**2. Catálogo de skills externas** (`templates/skills/catalogo.md`) — skills globais ou nativas do Claude Code já prontas.

**Se encontrar template compatível:**

> "Tenho um modelo pronto pra isso: [nome do template]. Deixa eu mostrar o que ele faz:"

Mostrar um resumo curto do fluxo (não o arquivo inteiro). Depois perguntar:

> "Esse fluxo faz sentido pro caso de vocês? Quer ajustar alguma coisa?"

Adaptar conforme o feedback antes de instalar.

**Se encontrar skill externa compatível (do catálogo):**

> "Já existe uma skill pronta pra isso: [nome]. Ela [o que faz em uma frase]. Dá pra usar direto com `/[nome]` sem precisar criar nada. Quer testar?"

Se o usuário quiser adaptar o comportamento, criar uma skill local que complementa ou substitui a externa.

**Se não encontrar nada:**

> "Não tenho nada pronto pra isso, mas dá pra criar uma skill do zero com base no que você contou."

Seguir pra criação manual (3.3).

### 3.2 — Decidir a estrutura

Analisar as pastas que já existem no workspace e decidir:

**Se o processo gera entregáveis (arquivos):**
- Verificar se já existe uma pasta onde faz sentido guardar (ex: `comercial/propostas/`, `financeiro/relatorios/`)
- Se sim, usar a pasta existente. Não criar pasta nova.
- Se não, criar uma pasta nova com nome claro

**Se o processo é só um fluxo (não gera arquivo em lugar fixo):**
- Não criar pasta nova. Só a skill basta.

Antes de criar qualquer coisa, mostrar o plano:

> "Pra esse processo, vou fazer o seguinte:
>
> - [Criar pasta `financeiro/relatorios/` pra guardar os resultados] (se aplicável)
> - [Instalar a skill `/relatorio-financeiro-mensal` em `.claude/skills/relatorio-financeiro-mensal/SKILL.md`]
> - [A skill vai salvar os arquivos em `financeiro/relatorios/`] (se aplicável)
>
> Confirma?"

**Só criar depois que o usuário confirmar. Este é o gate obrigatório — não pular esta etapa em nenhuma circunstância.**

### 3.3 — Criar a skill personalizada

Antes de criar, ler `templates/ferramentas/catalogo.md` e verificar se alguma ferramenta disponível resolve parte do fluxo descrito. Se encontrar ferramenta relevante, incorporar na skill e avisar:

> "Pra essa skill funcionar completa, vai precisar configurar [ferramenta]. [Instrução curta]. Quer configurar agora ou prefere depois?"

A partir daqui o fluxo se divide em dois caminhos, dependendo do que aconteceu na 3.1:

#### Caminho A — Adaptar template existente

Quando a 3.1 encontrou um template compatível em `templates/skills/`, criar a skill diretamente a partir dele. Garantir:

1. O frontmatter tem `name` e `description` claros
2. A skill lê o contexto relevante (`_memoria/preferencias.md`, `marca/design-guide.md` se for visual)
3. O passo a passo reflete o que foi descrito, não um fluxo genérico
4. Se gera arquivo, a skill indica onde salvar
5. O tom e formato seguem `_memoria/preferencias.md`

#### Caminho B — Criar do zero (delegar pra skill-creator)

Quando a 3.1 não encontrou nem template nem skill externa que sirva, **invocar a skill-creator nativa do Claude Code via Skill tool** ao invés de escrever a skill na mão.

Montar um briefing completo antes de invocar:

- **O processo** — o que foi descrito, em uma frase
- **Frequência e gatilhos** — quando acontece, o que dispara
- **Passo a passo** — o fluxo descrito, sem inventar etapas
- **Entregável** — se gera arquivo, qual formato e onde salvar
- **Ferramentas relevantes** — o que do `templates/ferramentas/catalogo.md` se aplica
- **Contexto da empresa** — pontos de `_memoria/empresa.md` e `_memoria/preferencias.md` que importam
- **Identidade visual** — se for skill que gera output visual, apontar pra `marca/design-guide.md`
- **Onde salvar** — `.claude/skills/nome-da-skill/SKILL.md`

Passar esse briefing pra skill-creator. Depois que ela retornar, **revisar o resultado** antes de finalizar:

- O frontmatter ficou claro?
- O tom bate com `_memoria/preferencias.md`?
- A skill lê os arquivos de memória certos no início?
- Os triggers fazem sentido pro vocabulário do time?

#### Estrutura final (vale pros dois caminhos)

Salvar em `.claude/skills/nome-da-skill/SKILL.md`.

Se a skill precisar de arquivos de apoio (templates HTML, referências, exemplos), criar dentro da mesma pasta:

```
.claude/skills/nome-da-skill/
  SKILL.md              ← instruções principais
  template.html         ← template de output (se aplicável)
  referencia.md         ← material de referência (se aplicável)
```

Depois de criar, confirmar:

> "Pronto, a skill `/[nome]` está instalada. Pode rodar agora pra testar, ou seguimos pro próximo processo."

## Fase 4 — Continuar ou encerrar

Depois de cada processo mapeado, perguntar:

> "Quer mapear o próximo da lista?"

Se sim, voltar pra Fase 3 com o próximo processo.

Se não, salvar os processos que ainda não foram mapeados em `tarefas.md`:

```markdown
## Processos pra mapear depois
- [ ] [processo não mapeado 1]
- [ ] [processo não mapeado 2]
```

Mensagem final:

> "[N] processos mapeados, [N] skills criadas.
> Os que ficaram pendentes estão salvos em tarefas.md. Quando quiser continuar, é só rodar /mapear de novo."

## Regras

- Tom direto, conversa natural, sem formalidade
- Uma pergunta por vez durante a entrevista. Não listar 5 perguntas de uma vez
- Sempre verificar o que já existe antes de criar pasta ou skill nova
- Sempre mostrar o plano antes de criar qualquer coisa
- **Nunca criar skill que o usuário não confirmou explicitamente — sem exceção**
- Se o processo descrito for vago demais, pedir mais detalhes antes de continuar
- Se o processo for muito simples (tipo "manda um email pro cliente"), sugerir que talvez não precise de skill: "Isso parece simples o bastante pra fazer direto. Quer criar uma skill mesmo assim ou seguimos pro próximo?"
