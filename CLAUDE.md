# Blinky OS

<!-- NOT CONFIGURED -->
> Esta instalação ainda não foi configurada. Rode `/instalar` pra configurar o Blinky OS pra esta empresa.

## O que é esse workspace

[uma ou duas frases descrevendo o que essa pasta representa pra empresa — preenchido pelo `/instalar`]

**Estrutura de pastas:**
[lista das pastas criadas e o que vai em cada uma — gerada conforme o perfil detectado pelo `/instalar`]
- `templates/skills/` — modelos de skill prontos pra personalizar com `/mapear`
- `templates/ferramentas/catalogo.md` — APIs, CLIs e MCPs disponíveis pra usar em skills
- `templates/design/referencias/` — sistemas de design de referência (espaçamento, hierarquia, tipografia) pra elevar o acabamento visual de qualquer entregável, sempre com a cor/fonte real do cliente por cima

## Sobre a empresa

[descrição em 2-4 linhas com o que foi dito no `/instalar`]

## O que mais fazemos aqui

[lista das principais atividades/entregas]

## Time e contexto

[formato organizacional detectado, quem usa o sistema, fase do engajamento]

## Tom de voz

[como escrever, o que evitar]

## Ferramentas conectadas

[lista das ferramentas em uso — atualizar conforme MCPs forem instalados]

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (se existirem e estiverem configurados):

1. `_memoria/empresa.md` — quem é a empresa, o que faz, como funciona
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, fase do rollout
4. `_memoria/agora.md` — contexto vivo: onde paramos, decisões recentes, pendências (atualizado a cada sessão)

Usar essas informações como base pra qualquer resposta ou decisão. Ao sugerir prioridades, formatos ou abordagens, considerar o foco atual descrito em `estrategia.md` — e respeitar a fase do rollout: não empurrar automação pra empresa toda durante uma fase piloto.

Para qualquer tarefa visual (proposta, slide, relatório com identidade), consultar `marca/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe uma skill relevante em `.claude/skills/`.
Se encontrar, seguir as instruções da skill.
Se não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (alguém do time provavelmente vai pedir de novo), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o padrão de repetição for claro. **Nunca criar a skill sem essa confirmação** — use `/mapear` como o fluxo formal pra isso.

---

## Aprender com correções

Quando alguém corrigir algo, melhorar uma resposta ou dar uma instrução que parece permanente (frases como "na verdade é assim", "não faça mais isso", "prefere assim", "sempre que...", "evita...", "da próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre a empresa** (clientes, como funciona, serviços, mercado, organograma) → `_memoria/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato de resposta, o que evitar) → `_memoria/preferencias.md`
- **Sobre prioridades e foco atual** (projetos em andamento, prazos, fase do rollout) → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** (onde salvar arquivos, como nomear) → adicionar aqui no `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro. Confirmar o que foi salvo mostrando a linha adicionada.

Não perguntar se a correção for óbvia de contexto imediato. Só perguntar quando a informação tiver valor duradouro.

---

## Manter memória atualizada

Ao terminar uma tarefa que mudou algo relevante (novo processo, ferramenta instalada, mudança de fase do rollout, skill criada), perguntar:

> "Isso mudou algo no contexto. Quer que eu atualize os arquivos de memória?"

Se sim, identificar o que precisa atualizar (mesmas categorias da seção anterior). Mostrar o que vai mudar antes de salvar — nunca reformatar o arquivo inteiro.

**Quando NÃO perguntar:** tarefas pontuais que não mudam contexto, perguntas simples, mudanças já salvas pelo bloco "Aprender com correções".

**Dica:** se não souber se algo mudou, rodar `/atualizar` faz uma varredura completa.

---

## Criação de skills

Quando pedirem pra criar uma nova skill:

1. Verificar se existe um template relevante em `templates/skills/`. Se existir, usar como base.
2. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar o conteúdo ao contexto real da empresa.
3. Se a skill precisar de arquivos de apoio (templates, referências), criar dentro da pasta da skill.
4. Salvar em `.claude/skills/nome-da-skill/SKILL.md`.
5. Seguir o fluxo da skill-creator nativa do Claude Code quando não houver template pronto.
6. **Nunca criar sem confirmação explícita de quem está usando o sistema.**

---

## Confidencialidade

Este workspace roda dentro da empresa de um cliente — tratar tudo como confidencial por padrão:

- Nunca commitar chaves de API, tokens ou credenciais. Guardar sempre em `.env` (já protegido pelo `.gitignore`).
- Nunca enviar dados de `_memoria/` ou de pastas departamentais pra fora do repositório sem permissão explícita de quem pediu.
- Ao lidar com dados sensíveis (financeiro, RH, contratos), confirmar antes de gerar qualquer saída que saia do repositório (email, upload, link compartilhável).

---

## Fase da instalação

`_memoria/estrategia.md` guarda a fase atual do rollout: **piloto**, **departamental** ou **empresa toda**. Respeitar essa fase ao sugerir automações ou expandir o uso do sistema — não sugerir rollout pra empresa toda enquanto a fase ainda é piloto.
