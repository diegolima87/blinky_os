# Blinky OS

Sistema operacional de empresa dentro do Claude Code. Memória de negócio persistente + skills que automatizam o trabalho repetitivo — pensado pra ser **instalado dentro de empresas clientes** como parte de um engajamento de consultoria, não só pra uso pessoal.

## Como funciona

Cada empresa cliente ganha seu próprio repositório, clonado a partir deste kit. Dentro dele:

- **`_memoria/`** — quem é a empresa, como ela funciona, prioridades atuais e o que mudou na última semana. O Claude lê isso no início de toda conversa.
- **`.claude/skills/`** — automações prontas pro dia a dia (propostas, atas, relatórios) mais as skills de sistema (instalar, mapear, sincronizar).
- **`marca/design-guide.md`** — identidade visual da empresa, usada em qualquer entregável visual.
- **`templates/`** — modelos de skill, catálogo de ferramentas/MCPs e perfis de onboarding usados pelo `/instalar`.
- **`CLAUDE.md`** — a "constituição": as regras de como o Claude se comporta nesse workspace (checar skill antes de agir freehand, pedir permissão antes de criar skill nova ou gravar em memória, tratar tudo como confidencial).

## Como obter sua cópia

Cada instalação vive no seu próprio repositório — não se edita este repo diretamente. Três jeitos de começar, do mais simples ao mais manual.

### Mais simples — colar um prompt no Claude Code

1. Crie uma pasta vazia no computador e abra ela no VS Code.
2. Abra o Claude Code nessa pasta.
3. Cole isso no chat:

   > Clona o repositório https://github.com/diegolima87/blinky_os nesta pasta (`git clone https://github.com/diegolima87/blinky_os.git .`). Depois de clonar, leia `CLAUDE.md` e a skill em `.claude/skills/instalar/SKILL.md`, e conduza comigo a entrevista de instalação do Blinky OS seguindo essas instruções, uma pergunta por vez.

O Claude clona o kit e já começa a instalação na mesma conversa — não precisa saber nenhum comando de antemão.

### Tem conta no GitHub

Clique em **"Use this template"** no topo desta página. Isso cria uma cópia própria, no seu GitHub, pronta pra clonar. Depois, abra a pasta clonada no Claude Code e rode `/instalar`.

### Prefere terminal

```bash
npx giget gh:diegolima87/blinky_os meu-blinky-os
```

Isso baixa só os arquivos do kit (sem histórico de git) numa pasta `meu-blinky-os/`, pronta pra abrir no Claude Code e rodar `/instalar`.

## Primeiros passos numa empresa nova

1. Clone este kit (ou use um dos caminhos acima) num repositório novo, dedicado à empresa cliente.
2. Rode `/instalar` — entrevista de onboarding que detecta o formato organizacional do cliente e gera `CLAUDE.md`, `_memoria/` e a estrutura de pastas certas.
3. Rode `/mapear` — entrevista que descobre os processos repetitivos do time e transforma cada um numa skill nova (sempre com confirmação antes de criar qualquer arquivo).
4. Rode `/syncar` pra conectar o repo ao GitHub do cliente (isso é o backup e o handoff).
5. Nas sessões seguintes, comece com `/iniciar` (carrega o contexto) e termine com `/atualizar` (grava o que mudou).

## Rollout em fases (uso consultivo)

- **Piloto** — um time ou pessoa-chave, poucas skills, validação rápida.
- **Departamental** — repete `/mapear` por área, usando `/novo-projeto` pra dar sub-contexto a cada departamento.
- **Empresa toda** — `_memoria/empresa.md` reflete o organograma completo; handoff pro time do cliente rodar sozinho (`/iniciar`, `/mapear`, `/syncar`).

## Escopo do v1

Só Claude Code (sem ponte pra Codex/outras ferramentas) e sem pipelines multi-agente — o framework é memória + skills. Squads multi-agente ficam pra uma versão futura, com checkpoints implementados como permissões reais, não só instrução em texto.
