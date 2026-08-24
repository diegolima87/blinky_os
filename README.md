# Blinky OS

### O sistema operacional de negócio que roda dentro do Claude Code

[![Feito para Claude Code](https://img.shields.io/badge/feito%20para-Claude%20Code-d97757)](https://claude.com/claude-code)
[![Licença](https://img.shields.io/badge/licença-uso%20via%20curso%2Fconsultoria-blue)](LICENSA.md)
[![Status](https://img.shields.io/badge/status-v1-green)](#escopo-do-v1)

Memória de negócio persistente + skills que automatizam o trabalho repetitivo, tudo dentro do Claude Code — sem dashboard, sem SaaS novo pra aprender, sem mais uma senha. Se o time já usa Claude Code (ou VS Code com a extensão), já sabe usar o Blinky OS.

Pensado pra ser **instalado dentro de empresas clientes**, como parte de um engajamento de consultoria — mas funciona igual de bem pro seu próprio negócio.

---

## Índice

- [O problema que isso resolve](#o-problema-que-isso-resolve)
- [Como funciona](#como-funciona)
- [Como obter sua cópia](#como-obter-sua-cópia)
  - [Já instalei antes — como atualizo?](#já-instalei-antes--como-atualizo)
- [Exemplo real: uma semana com o Blinky OS](#exemplo-real-uma-semana-com-o-blinky-os)
- [As skills do sistema](#as-skills-do-sistema)
- [Templates sob demanda](#templates-sob-demanda)
- [Anatomia de uma instalação](#anatomia-de-uma-instalação)
- [Rollout em fases (uso consultivo)](#rollout-em-fases-uso-consultivo)
- [Perguntas frequentes](#perguntas-frequentes)
- [Escopo do v1](#escopo-do-v1)
- [Licença](#licença)

---

## O problema que isso resolve

Toda empresa que começa a usar IA no dia a dia bate no mesmo teto: a conversa não lembra de nada de uma sessão pra outra, cada pessoa do time explica o contexto do zero, e as automações boas ficam presas na cabeça de quem sabe "prompt engineering" em vez de virarem processo do time.

O Blinky OS resolve isso com duas peças simples:

- **Memória** — arquivos markdown (`_memoria/`, `CLAUDE.md`, `marca/design-guide.md`) que descrevem quem é a empresa, como ela trabalha e o que importa agora. O Claude lê isso automaticamente no início de toda conversa — ninguém precisa colar contexto de novo.
- **Skills** — comandos como `/proposta`, `/relatorio-status` ou `/ata-reuniao` que encapsulam um processo repetitivo do time inteiro, não um prompt pessoal de alguém. Uma vez criada, qualquer pessoa do time roda a mesma automação com o mesmo padrão de qualidade.

Nada disso é mágico ou proprietário: é tudo arquivo de texto, versionado em `git`, editável em qualquer editor. O "sistema operacional" é literal — uma estrutura de pastas e regras que organiza como o Claude opera dentro daquele negócio.

## Como funciona

```
empresa-cliente/
├── CLAUDE.md                 ← a "constituição": como o Claude se comporta aqui
├── _memoria/                 ← quem é a empresa, prioridades, o que mudou essa semana
├── .claude/skills/           ← as automações instaladas (comandos /nome-da-skill)
├── marca/design-guide.md     ← identidade visual usada em qualquer entregável
└── templates/                ← catálogo de skills e ferramentas pra instalar sob demanda
```

O ciclo de vida é simples: **`/instalar`** conhece a empresa uma vez → **`/mapear`** transforma os processos repetitivos do time em skills → no dia a dia, **`/iniciar`** carrega o contexto e **`/atualizar`** grava o que mudou → **`/syncar`** garante que nada se perde, tudo salvo no GitHub do próprio cliente.

Não tem servidor, não tem conta nova pra criar, não tem dado do cliente saindo pra infraestrutura de terceiros além do que o próprio Claude Code já usa. O repositório é do cliente, do início ao fim.

## Como obter sua cópia

Cada instalação vive no seu próprio repositório — não se edita este repo diretamente. Três jeitos de começar, do mais simples ao mais manual.

### Mais simples — colar um prompt no Claude Code

1. Crie uma pasta vazia no computador e abra ela no VS Code.
2. Abra o Claude Code nessa pasta.
3. Cole isso no chat:

   > Clona o repositório https://github.com/diegolima87/blinky_os nesta pasta (`git clone https://github.com/diegolima87/blinky_os.git .`), depois apaga a pasta `.git` e roda `git init` de novo, pra esta instalação ficar independente, sem nenhuma conexão com o repositório original. Depois disso, leia `CLAUDE.md` e a skill em `.claude/skills/instalar/SKILL.md`, e conduza comigo a entrevista de instalação do Blinky OS seguindo essas instruções, uma pergunta por vez.

O Claude clona o kit, desconecta do repositório original e já começa a instalação na mesma conversa — não precisa saber nenhum comando de antemão. O passo de apagar o `.git` é importante: sem ele, essa pasta continuaria "conectada" ao repositório do kit, e um `/syncar` mais adiante tentaria enviar as mudanças pra lá em vez de criar o repositório próprio da empresa.

### Tem conta no GitHub

Clique em **"Use this template"** no topo desta página. Isso cria uma cópia própria, no seu GitHub, pronta pra clonar. Depois, abra a pasta clonada no Claude Code e rode `/instalar`.

### Prefere terminal

```bash
npx giget gh:diegolima87/blinky_os meu-blinky-os
```

Isso baixa só os arquivos do kit (sem histórico de git) numa pasta `meu-blinky-os/`, pronta pra abrir no Claude Code e rodar `/instalar`.

### Já instalei antes — como atualizo?

Cada instalação é desconectada de propósito do repositório original (é o que garante que o `/syncar` de um cliente nunca vaze pro GitHub de outro). Isso significa que **puxar atualização não é `git pull`** — é a skill `/atualizar-kit` que faz isso, trazendo só o que é código do kit (skills fixas, `templates/`) e nunca tocando em memória, identidade visual ou skills criadas sob medida pro cliente.

Se a instalação já tem `/atualizar-kit` (toda instalação nova a partir de agora já vem com ela), basta rodar o comando. Se for uma instalação de antes dessa skill existir, um bootstrap único — cole isto no Claude Code dessa pasta:

> Busca o conteúdo de https://raw.githubusercontent.com/diegolima87/blinky_os/main/.claude/skills/atualizar-kit/SKILL.md e salva em `.claude/skills/atualizar-kit/SKILL.md` nesta pasta. Depois leia o arquivo salvo e rode o fluxo dele.

A partir daí, `/atualizar-kit` funciona normalmente nas próximas vezes.

## Exemplo real: uma semana com o Blinky OS

Pra deixar concreto o que "memória + skills dentro do Claude Code" quer dizer na prática, um exemplo — empresa fictícia, mas o fluxo é exatamente o real.

**Segunda-feira, instalação.** O consultor abre a pasta recém-clonada no VS Code, abre o Claude Code e roda `/instalar`. Entrevista curta, uma pergunta por vez:

```
> Como a empresa funciona hoje: uma pessoa, time pequeno, já tem
  departamentos, ou vocês atendem outros clientes?

Já temos departamentos — comercial, financeiro e operações.

> Vamos começar com um time piloto, um departamento, ou a empresa
  toda de uma vez?

Piloto no comercial primeiro.
```

Sete perguntas depois, o Claude já gerou `CLAUDE.md`, `_memoria/empresa.md`, `_memoria/estrategia.md` (fase: `piloto`) e a estrutura de pastas certa pro perfil "empresa departamentalizada" — mostrando tudo antes de criar, nada é gravado sem confirmação.

**Ainda segunda, `/mapear`.** A entrevista de processos descobre que toda sexta o comercial monta manualmente uma planilha de status pros clientes, e que toda proposta nova é feita copiando um Google Doc antigo e editando na mão. O Claude confere `templates/skills/` e o catálogo, encontra templates prontos pra ambos os casos, adapta ao vocabulário do time e — só depois de confirmação explícita — instala `/relatorio-status` e ajusta `/proposta` (já parte do base-kit) pra usar as cores da empresa.

**Quinta-feira, uma proposta de verdade.** Alguém do comercial abre o Claude Code e digita `/proposta`. Cola um briefing solto de WhatsApp. O Claude lê `marca/design-guide.md`, gera um HTML com a identidade visual da empresa, renderiza um PNG via Playwright pra pré-visualização, e — se `/publicar-site` estiver instalado — sobe num link compartilhável na hora. Nenhuma etapa exigiu abrir Figma, Canva ou editar HTML na mão.

**Sexta-feira, o relatório da semana.** `/relatorio-status` lê os dados da semana e gera o mesmo relatório que antes levava a manhã inteira pra montar — agora em minutos, com o mesmo padrão toda semana, porque o padrão está na skill, não na cabeça de uma pessoa.

**Fim do dia, `/atualizar` + `/syncar`.** O Claude compara o que existe no workspace com o que está documentado, propõe atualizar `_memoria/agora.md` com o que ficou pendente pra segunda, mostra exatamente o que vai mudar, e — com um "sim" — grava. `/syncar` faz commit e push pro GitHub do próprio cliente. Segunda que vem, `/iniciar` lê esse contexto e a conversa já começa sabendo onde parou.

Nada disso usou um prompt "esperto" escrito na hora — cada passo é uma skill, versionada em `.claude/skills/*/SKILL.md`, visível e editável por qualquer pessoa do time no VS Code, com `git diff` mostrando exatamente o que mudou a cada ajuste.

## As skills do sistema

Doze skills vêm em toda instalação — universais, servem qualquer empresa. Skills especializadas (redes sociais, agendamento, dashboards) não vêm por padrão: ficam em `templates/skills/` e só são instaladas quando o `/mapear` confirma que aquele processo existe de verdade no negócio ([ver por quê](#por-que-nem-toda-skill-vem-instalada)).

| Skill | O que faz |
|---|---|
| `/instalar` | Entrevista de onboarding — detecta o perfil da empresa e gera `CLAUDE.md`, memória e estrutura de pastas |
| `/mapear` | Entrevista os processos repetitivos do time e transforma cada um numa skill nova, sempre com confirmação antes de criar |
| `/iniciar` | Carrega o contexto salvo no começo de cada sessão de trabalho |
| `/atualizar` | Compara o workspace real com a memória documentada e propõe correções |
| `/atualizar-kit` | Traz atualização do kit original (skills fixas, templates) — nunca toca em memória ou skill customizada |
| `/syncar` | Salva o estado atual no GitHub do cliente (commit + push), configura o remote na primeira vez |
| `/novo-projeto` | Cria uma pasta de departamento, cliente ou projeto novo com `CLAUDE.md` dedicado |
| `/proposta` | Gera proposta comercial ou interna em HTML, com a identidade visual da empresa |
| `/ata-reuniao` | Transforma anotações ou transcrição de reunião numa ata com decisões e próximos passos |
| `/documentar-processo` | Transforma um processo explicado em conversa num SOP passo a passo |
| `/relatorio-status` | Gera relatório periódico de status/performance — por unidade e consolidado |
| `/email-profissional` | Rascunha email profissional calibrado ao destinatário e ao objetivo |

## Templates sob demanda

Além do base-kit, `templates/skills/` guarda modelos prontos pra processos que **aparecem com frequência em negócios reais, mas nem toda empresa tem** — o `/mapear` oferece cada um só quando a entrevista confirma que aquele processo existe de fato ali:

- **`gerar-imagem`** — imagem por IA com fallback grátis (Pollinations) → paga (Magnific)
- **`carrossel`** — carrossel pra redes sociais, sistema de design reutilizável, sem cacoetes visuais de IA
- **`criar-arte-redes`** — mesma necessidade, via Canva
- **`calendario-editorial`** — planejamento de pauta de conteúdo
- **`publicar-site`** — publica HTML com link público (Cloudflare Pages)
- **`dashboard-cliente`** — painel HTML persistente, atualizado por dados, não recriado do zero a cada vez
- **`agendar-publicacao`** — fila de publicação agendada, com 3 arquiteturas de referência (local, cloud, multi-unidade/franquia) conforme o porte do cliente

Cada template chega **sem** nome de empresa, cor ou credencial real — é adaptado ao cliente no momento em que o `/mapear` instala.

### Por que nem toda skill vem instalada

Automação que ninguém pediu é peso morto: mais um `/comando` que a pessoa não sabe se deve usar, mais uma coisa pra manter. O Blinky OS segue a mesma regra em toda instalação — **nada é instalado sem confirmação explícita**, e só depois que a entrevista de `/mapear` confirma que aquele processo é repetitivo de verdade no dia a dia daquele time.

## Anatomia de uma instalação

```
CLAUDE.md                      # regras de comportamento + contexto da empresa
_memoria/
  empresa.md                   # quem é, o que faz, como é organizada
  preferencias.md              # tom de voz, o que evitar
  estrategia.md                # foco atual, fase do rollout
  agora.md                     # contexto vivo — onde paramos, pendências
.claude/skills/                # as 12 skills do base-kit, prontas pra usar
marca/
  design-guide.md              # cores, fontes, identidade visual
templates/
  perfis/                      # estrutura de pastas por tipo de organização
  skills/                      # modelos de skill sob demanda (ver acima)
  ferramentas/catalogo.md      # APIs, CLIs e MCPs conhecidos, prontos pra plugar
  design/referencias/          # sistemas de design de referência pra elevar o acabamento visual
dados/                         # arquivos de apoio (imagens, planilhas, prints de marca)
```

## Rollout em fases (uso consultivo)

- **Piloto** — um time ou pessoa-chave, poucas skills, validação rápida.
- **Departamental** — repete `/mapear` por área, usando `/novo-projeto` pra dar sub-contexto a cada departamento.
- **Empresa toda** — `_memoria/empresa.md` reflete o organograma completo; handoff pro time do cliente rodar sozinho (`/iniciar`, `/mapear`, `/syncar`).

A fase fica registrada em `_memoria/estrategia.md`, e o `CLAUDE.md` instrui o Claude a respeitá-la — não empurrar automação pra empresa toda enquanto o engajamento ainda está em piloto.

## Perguntas frequentes

**Precisa saber programar?**
Não. Toda a interação é conversa (perguntas em português, uma de cada vez) e os arquivos gerados são markdown. Saber usar o VS Code pra abrir pastas já é suficiente.

**Os dados do cliente ficam expostos em algum lugar?**
Não além do que o próprio Claude Code já usa. O repositório é do cliente (GitHub próprio, pode ser privado), `.env` fica fora do git por padrão, e o `CLAUDE.md` instrui o Claude a tratar tudo como confidencial e confirmar antes de qualquer saída de dado sensível.

**Isso substitui o Notion/planilha/CRM que já usamos?**
Não. É uma camada de automação em cima do que já existe — o `/instalar` inclusive pergunta quais ferramentas o time já usa e sugere conectores (MCP) quando disponíveis, em vez de propor trocar o que já funciona.

**Dá pra usar sem VS Code?**
Sim, o Claude Code CLI funciona sozinho no terminal. O VS Code (com a extensão) só soma: diff visual, explorador de arquivos e terminal integrado no mesmo lugar.

**O que acontece se eu editar uma skill na mão?**
Nada de especial — é só markdown. Edite em qualquer editor, o Claude lê o arquivo atualizado na próxima vez que a skill rodar.

**Preciso pagar por mais alguma coisa além do Claude Code?**
Só o que a própria skill instalada precisar (ex.: uma conta Cloudflare grátis pra publicar site, ou uma API de imagem paga se o time optar por ela) — tudo listado e explicado em `templates/ferramentas/catalogo.md` antes de qualquer instalação.

## Escopo do v1

Só Claude Code (sem ponte pra Codex/outras ferramentas) e sem pipelines multi-agente — o framework é memória + skills. Squads multi-agente ficam pra uma versão futura, com checkpoints implementados como permissões reais, não só instrução em texto.

### Oportunidades estratégicas (fora do escopo atual)

Fica registrado aqui pra não se perder — candidatos a versão futura, não implementados agora:

- **Pesquisa de satisfação/persona via WhatsApp com IA** — motor próprio já maduro e usado por clientes reais, orquestrando conversa, transcrição e análise automática de resultado. Candidato a virar uma skill de integração no espírito de como as skills `*-ratos` de ads orquestram Meta/Google Ads, mas pra NPS/pesquisa.
- **Geração gráfica em lote pra redes de franquia** — peças com campos dinâmicos posicionados por template (nome, cidade, QR code) a partir de uma planilha, pra gerar dezenas de variações de uma vez. Ainda em MVP, sem API pública — revisitar quando a ferramenta amadurecer.
- **Automação de funil comercial via WhatsApp** — scoring de lead, cadências automáticas por faixa de perfil, chat pago via assinatura. Referência de arquitetura pra uma futura skill de vendas, além do que `proposta`/`followup` já cobrem.

## Licença

Uso liberado pra quem adquiriu acesso ao curso/comunidade Blinky OS (ou foi convidado diretamente pelo autor) — no seu próprio negócio ou em instalações pra clientes de consultoria. Não é permitido redistribuir ou revender o kit como produto/curso concorrente. Termos completos em [LICENSA.md](LICENSA.md).
