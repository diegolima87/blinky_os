---
name: instalar
description: >
  Configura o Blinky OS pra uma empresa cliente. Faz uma entrevista sobre quem
  é o cliente, como a empresa é organizada e o que o time mais produz, e gera
  CLAUDE.md, memória, estrutura de pastas e lista de MCPs personalizados pro
  perfil organizacional detectado.
  Use quando o usuário chamar /instalar, quando _memoria/empresa.md estiver
  vazio ou ausente, ou quando disser "configurar o sistema", "primeira vez",
  "instalar aqui", "nova instalação".
---

# /instalar — Instalação numa Empresa Cliente

## Verificação inicial

Antes de qualquer coisa, verificar se `_memoria/empresa.md` já existe e tem conteúdo real (não apenas o template com `<!-- NOT CONFIGURED -->`).

- Se **não existe ou está vazio**: iniciar o fluxo de onboarding abaixo.
- Se **já tem conteúdo**: informar que a instalação já foi feita e perguntar se quer refazer ou apenas atualizar alguma parte.

---

## Onboarding (primeira vez)

Comece com uma mensagem curta de boas-vindas:

> "Boa. Vou fazer algumas perguntas pra configurar o Blinky OS pra essa empresa. Responde com calma — quanto mais específico, melhor o sistema vai trabalhar pro time."

Faça as perguntas em sequência, uma por vez, em conversa natural. Não liste todas de uma vez. Espere a resposta de cada uma antes de ir pra próxima.

### Pergunta 1 — Quem instala e pra quem
"Qual seu nome (quem está configurando o sistema) e o nome da empresa cliente?"

### Pergunta 2 — Formato organizacional
"Como a empresa funciona hoje: é tocada por uma pessoa ou dupla, é um time pequeno sem áreas definidas, já tem departamentos formados (marketing, comercial, financeiro, RH, operações...), ou o próprio cliente é uma agência/prestador de serviços que atende outros clientes?"

Detectar o perfil com base na resposta:
- **`autonomo-ou-micro`** — uma pessoa ou dupla
- **`pequena-empresa-equipe-unica`** — time pequeno sem áreas formais
- **`empresa-departamentalizada`** — já tem departamentos (perfil-alvo principal do Blinky OS)
- **`agencia-ou-prestador-servicos`** — o cliente atende outros clientes

*(Uma empresa pode ter características de mais de um perfil — usar o que melhor descreve a organização do dia a dia.)*

### Pergunta 3 — Escopo do engajamento
"Vamos começar com um time piloto, um departamento específico, ou a empresa toda de uma vez?"

Registrar a resposta como a fase inicial do rollout (`piloto` / `departamental` / `empresa-toda`) — isso vai pra `_memoria/estrategia.md` e orienta o playbook de continuidade.

### Pergunta 4 — Principais entregas
"O que a empresa mais produz ou entrega no dia a dia? Pode ser mais de uma coisa."

*(Exemplos: propostas comerciais, relatórios, atendimento a cliente, conteúdo, código, processos internos documentados — qualquer combinação)*

### Pergunta 5 — Quem vai usar o sistema
"Quem no time do cliente vai usar o Claude Code no dia a dia? Nomes e papéis, se souber."

*(Importante pro handoff depois — o objetivo final é o time do cliente rodar sozinho, não depender do consultor.)*

### Pergunta 6 — Ferramentas em uso
"Quais ferramentas a empresa usa hoje no trabalho? Cita as principais."

*(Exemplos: Notion, Google Drive, planilhas, WhatsApp Business, CRM, ferramentas de gestão de projeto, Meta Ads/Google Ads)*

### Pergunta 7 — Identidade visual
"A empresa tem identidade visual definida? Se sim, como prefere compartilhar?"

Apresentar as opções em conversa, não como lista formal:

> "Pode mandar o link do site, jogar alguns prints/logo na pasta `dados/` e dizer o nome dos arquivos, descrever em texto (cores, estilo, fontes), ou dizer que ainda não tem definido. Qualquer uma dessas funciona."

**Se compartilhar URL:**
- Buscar o conteúdo do site com WebFetch
- Analisar cores dominantes, tipografia aparente, estilo geral
- Apresentar o que foi detectado antes de preencher `marca/design-guide.md`, confirmando com a pessoa

**Se compartilhar imagens:**
- Pedir pra colocar os arquivos em `dados/` e informar os nomes
- Ler como imagem, analisar cores/estilo, confirmar antes de preencher

**Se descrever em texto:**
- Usar a descrição direto pra preencher `marca/design-guide.md`

**Se ainda não tiver definido:**
- Deixar `marca/design-guide.md` com campos em branco e orientação de como preencher depois
- Mencionar: "Sem problema — preenche quando tiver. Até lá, uso um visual neutro de boa qualidade (baseado em `templates/design/referencias/notion.md`), e troco pra identidade de vocês assim que definirem."

### Pergunta 8 — Tom de voz
"Como o time prefere que o Claude escreva? O que mais incomoda em textos gerados por IA?"

### Pergunta 9 — Confidencialidade
"Tem alguma área ou tipo de dado que precisa de cuidado extra (financeiro, RH, contratos, dados de cliente final)? Isso ajuda a calibrar o que tratar com mais cautela."

---

## Processamento das respostas

Com todas as respostas, montar o pacote de arquivos. **Antes de criar qualquer pasta, mostrar o que foi pensado e deixar a pessoa ajustar** — nunca criar direto sem esse passo.

### 1. Escolher a estrutura de pastas

Ler o template de perfil correspondente em `templates/perfis/claude-md-<perfil>.md` (ex.: `templates/perfis/claude-md-empresa-departamentalizada.md`) pra saber a estrutura sugerida e como calibrar o conteúdo. Apresentar:

> "Com base no que você contou, a estrutura de **[perfil detectado]** faz mais sentido. Ficaria assim:
>
> ```
> [lista de pastas do perfil detectado]
> ```
>
> Quer usar essa, trocar por outro perfil, ou montar uma estrutura personalizada?"

**Se aceitar:** criar as pastas do perfil detectado.
**Se quiser outro perfil:** mostrar a estrutura daquele outro template e confirmar.
**Se quiser personalizar:** perguntar quais pastas fazem sentido e criar conforme descrito.

### 2. Atualizar `CLAUDE.md` na raiz

Preencher as seções de topo (Identidade, O que é esse workspace, Sobre a empresa, O que mais fazemos aqui, Time e contexto, Tom de voz, Ferramentas conectadas) com as respostas da entrevista. **Não tocar** nas seções fixas abaixo da linha `---` que segue "Ferramentas conectadas" (Contexto do negócio, Fluxo de trabalho, Aprender com correções, Manter memória atualizada, Criação de skills, Confidencialidade, Fase da instalação) — essas são a constituição do kit e não mudam de cliente pra cliente. Remover o marcador `<!-- NOT CONFIGURED -->` do topo.

### 3. Criar `_memoria/empresa.md`

Preencher com nome, consultor responsável, o que faz, perfil organizacional, departamentos/áreas (se houver), equipe que usa o sistema, ferramentas, principais entregas.

### 4. Criar `_memoria/estrategia.md`

Preencher **Fase do rollout** com o valor detectado na Pergunta 3 (`piloto` / `departamental` / `empresa-toda`), prioridade principal, o que pode esperar.

### 5. Criar `_memoria/preferencias.md`

Preencher tom de voz, o que evitar, estilo geral com base na Pergunta 8.

### 6. Semear `_memoria/agora.md`

Substituir o template em branco por:

```markdown
# Agora — contexto vivo

> Este é o contexto que muda toda semana (diferente de `estrategia.md`, que é o foco de fundo).
> O `/iniciar` lê isto no começo da sessão; o `/atualizar` escreve aqui no fim.

## Onde paramos
Acabei de configurar o Blinky OS pra essa empresa com o /instalar. Próximo passo sugerido: rodar /mapear pra criar as primeiras skills personalizadas.

## Decisões recentes
[vazio por enquanto — o /atualizar preenche no fim de cada sessão]

## Pendências
- Rodar /mapear pra criar as primeiras skills personalizadas.

## Quente agora
[o que estiver ativo esta semana]
```

Não invente conteúdo além disso — o `agora.md` é preenchido de verdade pelo uso via `/atualizar`.

### 7. Pré-preencher `marca/design-guide.md`

Conforme o que foi levantado na Pergunta 7. Manter o aviso no topo do arquivo:

```
> Você pode editar esse arquivo a qualquer momento.
> Qualquer entregável visual lê este arquivo antes de criar algo.
```

### 8. Recomendar MCPs e ferramentas

Ler `templates/ferramentas/catalogo.md` e cruzar com as ferramentas citadas na Pergunta 6. Pra cada uma com conector disponível no catálogo:

> "Vi que vocês usam [ferramenta]. Tem um conector que deixa o Claude acessar direto. Quer que eu instale agora?"

Se aceitar, rodar o comando de instalação. Se preferir depois, anotar em `tarefas.md`:

```markdown
## MCPs pra instalar depois
- [ ] Notion — `claude mcp add notion -- npx -y @notionhq/notion-mcp-server`
```

Se a ferramenta citada não estiver no catálogo, informar que não há conector pronto e sugerir pesquisar em mcp.so.

---

## Mensagem final

Após gerar todos os arquivos, enviar uma mensagem de encerramento (resumida, sem listar cada linha de cada arquivo):

> "[Nome], o Blinky OS está instalado pra [empresa].
>
> - `CLAUDE.md` — o Claude já sabe quem é essa empresa, como o time trabalha e onde fica cada coisa
> - `_memoria/` — negócio, preferências e fase do rollout salvos ([fase detectada])
> - `marca/design-guide.md` — identidade visual [preenchida / pronta pra preencher]
> - Estrutura de pastas pro perfil de [perfil detectado]
> - [N] MCPs instalados / [N] anotados pra instalar depois
>
> **Duas coisas importantes antes de continuar:**
>
> 1. Chaves de API (tokens, credenciais) sempre num arquivo `.env` — já protegido, nunca vai pro GitHub por engano.
> 2. Pra não perder o trabalho, conecte esse repositório ao GitHub do cliente rodando `/syncar`. Leva 2 minutos.
>
> **Próximo passo:** rode `/mapear` pra entender os processos repetitivos do time e criar as primeiras skills personalizadas."

---

## Regras

- Tom direto e humano, sem excesso de entusiasmo
- Não usar listas com bullet points nas perguntas — fazer em conversa
- Se as respostas forem vagas, fazer uma pergunta de acompanhamento antes de continuar
- Gerar os arquivos todos de uma vez no final, não um a um durante as perguntas
- Mostrar a estrutura de pastas proposta e esperar confirmação antes de criar qualquer pasta
- Após gerar, mostrar a mensagem final resumida — não listar cada linha de cada arquivo
