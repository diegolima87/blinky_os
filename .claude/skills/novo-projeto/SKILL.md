---
name: novo-projeto
description: >
  Cria uma nova pasta de departamento, cliente ou projeto com CLAUDE.md dedicado.
  Entrevista o usuário sobre o que é, gera a estrutura e referencia no CLAUDE.md principal.
  Use quando o usuário chamar /novo-projeto, disser "novo departamento", "novo cliente",
  "novo projeto", "criar pasta pro time X", ou quando precisar organizar um trabalho
  novo em pasta separada (ex.: entrar em uma fase departamental do rollout).
---

# /novo-projeto — Criar novo sub-contexto

Cria uma pasta de departamento/cliente/projeto com `CLAUDE.md` dedicado, entrevistando o usuário sobre o que é.

## Quando usar

- Rollout entrando em fase departamental — cada departamento novo ganha seu sub-contexto
- Novo cliente entrando (perfil agência/prestador de serviços)
- Novo produto, site ou iniciativa que merece pasta própria e contexto separado

## Fluxo

### Passo 1: Entender o sub-contexto

Perguntar em conversa natural (uma pergunta por vez):

**Pergunta 1:** "Qual é o nome? (pode ser nome do departamento, do cliente ou do projeto)"

**Pergunta 2:** "Que tipo é?"
- Departamento (área interna da empresa cliente — marketing, comercial, financeiro...)
- Cliente (a empresa atende esse cliente — perfil agência/prestador de serviços)
- Produto ou iniciativa própria
- Interno (processo, ferramenta, organização)

**Pergunta 3:** "Me explica em poucas palavras o que é e o que precisa ser entregue ali."

**Pergunta 4:** "Tem prazo, responsável específico ou ferramenta particular que eu precise saber?"

Se as respostas já vierem completas, pular as perguntas já respondidas.

### Passo 2: Definir a pasta

Sugerir o local baseado no tipo:

- **Departamento** → nome da pasta já usada na estrutura do perfil (ex.: `marketing/`, `financeiro/`) — ver `CLAUDE.md` da raiz
- **Cliente** → `clientes/nome-do-cliente/`
- **Produto/iniciativa** → `projetos/nome-do-projeto/`
- **Interno** → `projetos/nome-do-projeto/`

Verificar a estrutura de pastas que já existe (ler `CLAUDE.md` principal) pra manter consistência com o perfil detectado no `/instalar`.

Apresentar a sugestão e aguardar confirmação:

> "Sugiro criar em `marketing/`. Faz sentido ou prefere outro lugar?"

**Quando são muitas unidades homogêneas fazendo a mesma coisa** (franquia, rede, múltiplas contas de mídia social administradas centralmente pela empresa cliente): considerar **tabela markdown centralizada** em vez de pasta por unidade — uma pasta tipo `franqueados/cadastro.md` (uma linha por unidade: nome, cidade, IDs relevantes) + `agendamentos/registro.md` (log append-only), em vez de `unidades/<nome>/` pra cada uma. Esse padrão é referenciado pela implementação multi-unidade do template `agendar-publicacao` e pelo `relatorio-status` quando o relatório cobre várias unidades de uma vez.

**Quando cada cliente tem contexto/marca própria e são poucos:** usar pasta por cliente (`clientes/<nome>/design-guide.md` isolado) — já é o padrão do perfil `agencia-ou-prestador-servicos`.

Se a resposta não for óbvia (não é claramente "muitas unidades iguais" nem "poucos clientes distintos"), perguntar ao usuário qual dos dois padrões faz mais sentido antes de criar a estrutura.

### Passo 3: Criar a pasta e o `CLAUDE.md` do sub-contexto

Cada sub-contexto ganha seu próprio `CLAUDE.md` dedicado dentro da pasta:

```markdown
# [Nome do Departamento/Cliente/Projeto]

## O que é
[descrição curta, 1-2 frases]

## Tipo
[Departamento / Cliente / Produto / Interno]

## Escopo
[o que precisa ser entregue, baseado nas respostas]

## Contexto
[prazo, responsável, ferramentas, qualquer detalhe relevante]

## Arquivos importantes
- (será preenchido conforme o trabalho avança)

## Regras específicas
- (será preenchido conforme o trabalho avança)
```

Se for **cliente**, adicionar também:

```markdown
## Contato
[nome do contato, se mencionou]

## Entregas
- [ ] [entrega 1]
- [ ] [entrega 2]
```

### Passo 4: Atualizar o `CLAUDE.md` principal

Ler o `CLAUDE.md` da raiz. Encontrar a seção **Estrutura de pastas** (no topo, não nas regras fixas) e adicionar a nova pasta.

> Adicionei `marketing/` na estrutura de pastas do `CLAUDE.md` principal.

### Passo 5: Atualizar memória (se aplicável)

Se é um **departamento novo entrando em rollout**, perguntar:

> "Quer que eu atualize a fase do rollout em `_memoria/estrategia.md` também?"

Se é um **cliente novo** (perfil agência), perguntar:

> "Quer que eu adicione esse cliente em `_memoria/empresa.md` também?"

### Passo 6: Confirmar

Mostrar o resumo:

```
Sub-contexto criado!

Pasta: marketing/
CLAUDE.md: marketing/CLAUDE.md
Referência: adicionado na estrutura de pastas do CLAUDE.md principal

Pra trabalhar aqui, é só falar. O Claude já vai ler o contexto da pasta.
```

## Regras

- Tom direto, sem cerimônia
- Não criar subpastas dentro do sub-contexto a menos que o usuário peça
- O `CLAUDE.md` do sub-contexto deve ser curto (menos de 30 linhas no início). Vai crescer com o uso
- Nunca mover pastas existentes sem perguntar
- Se a pasta já foi criada manualmente, só gerar o `CLAUDE.md` dentro dela
- Respeitar a estrutura de pastas que o `/instalar` criou pra aquele perfil
