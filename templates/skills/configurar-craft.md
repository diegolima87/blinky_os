<!--
Template editável. Não faz parte do base-kit (as 12 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica
que a empresa cliente produz peça visual, vídeo ou áudio com frequência e o que
já existe (HTML via `carrossel`, Canva via `criar-arte-redes`) não basta —
edição em lote de fotos, layout multipágina, vídeo, áudio. Adaptar ao caso
descrito antes de salvar em .claude/skills/configurar-craft/SKILL.md — nunca
sem confirmação explícita.

Escopo: instalar os apps da Suíte Craft que o cliente realmente vai usar e
conectá-los ao Claude por MCP. O uso do dia a dia (pedir a peça) acontece em
linguagem natural depois disso — o Claude descobre os comandos do app com
`<app>-cli commands`; não há skill separada por app.

Projeto alpha (versões 0.6–0.10 em 13/10/2026). Nunca vender como substituto de
Photoshop/Premiere em produção crítica; alinhar isso com o cliente ANTES de
instalar. Fonte oficial: github.com/storytold/<app>. Catálogo com o que foi
testado de verdade: templates/ferramentas/catalogo.md (seção "Suíte Craft").
-->

---
name: configurar-craft
description: >
  Instala e conecta ao Claude os editores da Suíte Craft (PhotoCraft pra foto e
  arte, DesignCraft pra layout e carrossel, FilmCraft pra vídeo, VectorCraft pra
  logo e vetor, entre outros) — open source, grátis, sem conta. Baixa só o que
  o cliente vai usar, confere o checksum e registra o MCP restrito à pasta de
  trabalho. Termina com uma peça de teste renderizada. Use quando o usuário
  disser "quero editar foto/vídeo pelo Claude", "instala o PhotoCraft", "usar a
  suíte Craft", "ArtCraft", "editor de vídeo open source", ou chamar
  /configurar-craft.
---

# /configurar-craft — Instalar a Suíte Craft e Conectar ao Claude

## O que essa skill entrega no final

- Os apps escolhidos em `ferramentas/craft/<app>/` (zip portátil — nada instalado no sistema, tudo dentro da pasta do cliente)
- Cada app registrado como MCP do Claude Code, com acesso **restrito à pasta de trabalho** quando o app permite
- Uma peça de teste renderizada e conferida visualmente

Essa skill **não cria peça de cliente** — chega até a ferramenta funcionando. Depois é só pedir a arte/vídeo em linguagem natural.

## Antes de começar — alinhar expectativa

Dizer ao usuário, sem rodeio:

> "Esses editores são open source e **ainda estão em alpha** (versões 0.6 a 0.10). Funcionam e já fazem muita coisa, mas o próprio PhotoCraft avisa que ainda não substitui o Photoshop no uso profissional diário. Cada app pesa de 60 a 130 MB. Quer seguir mesmo assim?"

Se o caso for só post estático simples, sugerir `carrossel` ou `criar-arte-redes` antes — resolvem com menos setup. Só seguir com confirmação.

## Passo 1 — Escolher os apps (instalar só o necessário)

Perguntar: **"O que o time mais produz?"** e mapear:

| Se produz... | Instalar | Papel |
|---|---|---|
| Arte com camadas, tratamento de foto, lote de imagens | `photocraft` | Photoshop |
| Carrossel, material editorial, peça multipágina | `designcraft` | InDesign |
| Vídeo (corte, cor, áudio, legenda) | `filmcraft` | Premiere |
| Logo, ícone, ilustração vetorial | `vectorcraft` | Illustrator |
| Animação/motion graphics | `effectcraft` | After Effects |
| Locução, edição de áudio | `soundcraft` | Pro Tools |
| Revelar fotos RAW em lote | `lightcraft` | Lightroom |
| Juntar/dividir/editar PDF | `pdfcraft` | Acrobat |

Regra: **no máximo 2 apps na primeira rodada.** Ferramenta instalada que ninguém usa vira peso morto. O resto entra depois, quando o time pedir.

Pra geração de imagem por IA, não é aqui — usar `gerar-imagem`. A Suíte Craft **edita**, não gera.

## Passo 2 — Baixar e verificar (um app por vez)

Fonte única: `github.com/storytold/<app>`. Conferir o nome da organização na URL antes de baixar (cópia falsa com nome parecido é o risco clássico).

```bash
APP=photocraft                                              # trocar pelo app escolhido
TAG=$(gh api repos/storytold/$APP/releases/latest --jq .tag_name)   # ex.: v0.8.2
VER=${TAG#v}
mkdir -p "ferramentas/craft/_download/$APP" && cd "ferramentas/craft/_download/$APP"
gh release download "$TAG" -R storytold/$APP -p "$APP-$VER-windows-x64-portable.zip" -p "SHA256SUMS.txt"
```

Sem o `gh`: baixar `https://github.com/storytold/<app>/releases/latest` pelo navegador (arquivo `*-windows-x64-portable.zip` + `SHA256SUMS.txt`). Se o Windows bloquear o zip baixado pelo navegador: botão direito > Propriedades > **Desbloquear**, antes de extrair. PC com processador Snapdragon/Arm: usar `windows-arm64-portable.zip`. No macOS: o app é um `.dmg` e o CLI vem num zip separado (`<app>-cli-<versão>-macos-universal.zip`).

**Conferir o checksum — obrigatório, parar se divergir:**

```bash
grep "windows-x64-portable.zip" SHA256SUMS.txt
sha256sum "$APP-$VER-windows-x64-portable.zip"       # os dois hashes têm que ser idênticos
```

O checksum prova que o arquivo chegou íntegro, não que a origem é confiável — por isso a conferência da organização acima.

## Passo 3 — Colocar na pasta do cliente

```bash
cd ../../../..                                        # volta pra raiz do workspace
unzip -q "ferramentas/craft/_download/$APP/$APP-$VER-windows-x64-portable.zip" -d ferramentas/craft/
mv "ferramentas/craft/$APP-$VER-windows-x64-portable" "ferramentas/craft/$APP"   # caminho fixo, sem versão
rm -rf ferramentas/craft/_download
```

Dentro de `ferramentas/craft/<app>/` ficam `<app>-cli.exe` (o que o Claude usa) e `<app>.exe` (o app com janela, pra quem quiser abrir à mão). A pasta já é ignorada pelo git (`.gitignore` do kit) — **confirmar** que a linha `ferramentas/craft/` está no `.gitignore` do cliente; se não estiver, adicionar antes de qualquer `/syncar`.

## Passo 4 — Teste de fumaça (sem MCP ainda)

Rodar e **olhar o resultado** (abrir a imagem gerada — não declarar OK só porque o comando não deu erro):

```bash
# PhotoCraft — arte 1080x1350 (feed Instagram) do zero, fundo roxo, exporta PNG
ferramentas/craft/photocraft/photocraft-cli.exe run \
  --new '{"width":1080,"height":1350,"mode":"rgb","depth":8,"background":"white"}' \
  --cmd layer.newFillLayer.solidColor --params '{"color":"#6D28D9"}' \
  --out ferramentas/craft/teste-arte.png

# DesignCraft — renderiza as páginas do documento de exemplo em PNG
ferramentas/craft/designcraft/designcraft-cli.exe run --sample --all-pages ferramentas/craft/teste/

# FilmCraft — exporta o projeto de demonstração em MP4 (leva ~30 s) e confere o arquivo
ferramentas/craft/filmcraft/filmcraft-cli.exe --demo export ferramentas/craft/teste.mp4 --format h264 --scale 0.5
ferramentas/craft/filmcraft/filmcraft-cli.exe probe ferramentas/craft/teste.mp4

# Qualquer app — lista os comandos que ele aceita (é daqui que o Claude descobre o que dá pra fazer)
ferramentas/craft/<app>/<app>-cli.exe commands
```

O PhotoCraft avisa `layer(s) flattened` ao exportar PNG — esperado: PNG não guarda camadas. Pra reeditar depois, salvar também o arquivo nativo (`.pcraft`).

Depois de olhar, apagar os arquivos de teste (`ferramentas/craft/teste-arte.png`, `ferramentas/craft/teste/` e `ferramentas/craft/teste.mp4`). Se der erro de execução, parar e mostrar ao usuário o erro exato — não tentar contornar.

## Passo 5 — Conectar ao Claude (MCP)

O caminho do `.exe` é específico da máquina, então o registro **não pode ir pro repositório do cliente**. Há duas formas, conforme o ambiente:

- **Escopo local** (`claude mcp add`, o padrão): fica na config pessoal do usuário (`~/.claude.json`). Serve em terminal no macOS/Linux. **No Windows com VS Code há duas armadilhas** (as duas aconteceram na primeira instalação): (1) o escopo local vale pela pasta onde o comando roda — um terminal aberto em `C:\Users\<nome>` registra pra pasta pessoal e não pro projeto; a última linha da saída diz `[project: …]`, conferir; (2) o Claude Code guarda cada projeto pela grafia exata do caminho, e `B:/…` (terminal) e `b:/…` (extensão do VS Code, letra minúscula) viram projetos diferentes — na prática o mesmo projeto aparece duplicado na `~/.claude.json` —, então um registro feito num terminal pode não aparecer na sessão da extensão.
- **Escopo de projeto** (`.mcp.json` na raiz do workspace): vale pra qualquer grafia do caminho, e a primeira sessão pede a aprovação do usuário. É a saída certa no Windows + VS Code. Como o arquivo leva o caminho absoluto da máquina, **adicionar `.mcp.json` ao `.git/info/exclude`** (exclusão só local) — o `/syncar` faz `git add` de tudo e publicaria o caminho no GitHub do cliente. Exemplo (PhotoCraft):

```json
{
  "mcpServers": {
    "photocraft": {
      "type": "stdio",
      "command": "<caminho-absoluto>/ferramentas/craft/photocraft/photocraft-cli.exe",
      "args": ["mcp", "--automation-read-root", "<caminho-absoluto>/conteudo", "--automation-write-root", "<caminho-absoluto>/conteudo"],
      "env": {}
    }
  }
}
```

`claude mcp get photocraft` mostra `Scope: Project config` e `Status: Pending approval` até o usuário aprovar ao reabrir a sessão. A restrição de pasta aceita letra do drive em maiúscula ou minúscula e também caminho relativo à pasta permitida (testado).

Os comandos abaixo são a forma `claude mcp add` (escopo local); o conteúdo do `.mcp.json` é o mesmo comando e os mesmos argumentos.

**PhotoCraft e VectorCraft — com restrição de pasta (sempre usar):**

```bash
claude mcp add photocraft -- "<caminho-absoluto>/ferramentas/craft/photocraft/photocraft-cli.exe" mcp \
  --automation-read-root "<caminho-absoluto>/conteudo" --automation-write-root "<caminho-absoluto>/conteudo"
```

A pasta de trabalho (`conteudo/` ou outra, combinar com o usuário) é a **única** que o Claude consegue ler e escrever por esse MCP. Insumos que estão fora (logo em `marca/`, foto em `dados/`) são copiados pra dentro da pasta da peça antes de usar. Nunca apontar o root pra raiz do workspace, pra pasta pessoal ou pra um drive inteiro — `_memoria/` e `dados/` têm informação confidencial do cliente.

**FilmCraft e DesignCraft — sem restrição de pasta (limitação do app, documentada no README):**

```bash
claude mcp add filmcraft -- "<caminho-absoluto>/ferramentas/craft/filmcraft/filmcraft-cli.exe" mcp
```

Esses dois **não aceitam** `--automation-read-root`: o servidor lê e escreve onde o usuário puder. Avisar o usuário e oferecer o caminho mais seguro — **pular o MCP e usar só o CLI pelo terminal** (`filmcraft-cli.exe run …`), onde cada chamada passa pela permissão normal do Claude Code. Registrar o MCP sem restrição só com o "sim" explícito do usuário, e **nunca** abrir arquivo de origem desconhecida (vídeo, projeto ou PDF baixado de terceiros) por esse caminho. EffectCraft, LightCraft e SoundCraft: conferir `<app>-cli.exe --help` pra ver se `mcp` aceita `--automation-*-root`; se não aceitar, mesma regra. Se o VS Code ou o terminal estiver aberto como **Administrador** (aconteceu na primeira instalação), tudo que o Claude inicia — inclusive o MCP — roda elevado: mais um motivo pra manter a restrição de pasta e deixar FilmCraft/DesignCraft só no CLI.

**Se o Claude Code bloquear o `claude mcp add`:** aconteceu na primeira instalação — o classificador de segurança trata o registro de um executável baixado que passa a iniciar sozinho a cada sessão como "persistência não autorizada". **Parar e deixar o usuário decidir:** mostrar o comando pronto (dizendo em qual pasta rodar) ou sugerir a regra de permissão `Bash(claude mcp add:*)`. Só depois que o usuário autorizar o registro explicitamente — rodando o comando ele mesmo ou pedindo pra você fazer — é legítimo usar o `.mcp.json` quando o escopo local não alcança a sessão; antes disso, nunca criar `.mcp.json` nem editar `~/.claude.json` pra contornar o bloqueio. Se o usuário registrou na pasta errada, desfazer só o que ele criou (`claude mcp remove <app> --scope local`, rodado na mesma pasta em que ele registrou) e conferir depois. Enquanto isso o CLI pelo terminal já faz o mesmo trabalho — o MCP é conveniência, não pré-requisito.

Depois de registrar: **reiniciar a sessão** do Claude Code (no escopo de projeto, aprovar o servidor quando ele perguntar) e conferir com `/mcp` que o app aparece conectado. Antes de registrar, dá pra checar que o servidor sobe: `<app>-cli.exe mcp` responde ao handshake MCP (testado: PhotoCraft e DesignCraft listam 25 ferramentas cada).

**Testar a restrição na prática (PhotoCraft/VectorCraft):** pedir ao Claude pra abrir, pelo MCP, um arquivo que está *fora* da pasta de trabalho. Tem que ser recusado (testado no PhotoCraft 0.8.2, pelo próprio MCP: com os roots, o arquivo de dentro abre e o de fora volta `absolute paths must be inside the automation root`; no VectorCraft só confirmei que as flags existem). Se abrir, a restrição não está valendo — remover o MCP (`claude mcp remove <app>`) e voltar pro CLI.

## Passo 6 — Primeira peça de verdade

Pedir ao usuário uma peça real e pequena (um post, uma capa, um corte de 15 segundos). Fluxo:

1. Ler `marca/design-guide.md` (cores, fontes) e aplicar — a Suíte Craft não conhece a marca do cliente
2. Descobrir o comando certo com `<app>-cli commands --filter <palavra>` em vez de chutar o nome
3. Salvar em `conteudo/[AAAA-MM-DD]-[slug]/`, com o arquivo editável **e** o exportado
4. **Renderizar, abrir e olhar** o resultado; mostrar ao usuário e esperar aprovação antes de dizer que está pronto
5. Próximo passo: `/publicar-redes` ou `/agendar-publicacao` (se instaladas)

## Manutenção

- **Atualizar:** repetir os Passos 2 e 3 (o caminho fixo `ferramentas/craft/<app>/` mantém o MCP funcionando). Os projetos lançam versão com frequência — conferir uma vez por mês, não a cada uso.
- **Remover:** `claude mcp remove <app>` e apagar `ferramentas/craft/<app>/`.
- **Alternativa gráfica:** o ArtCraft Launcher (`github.com/storytold/craft-launcher`) instala e atualiza os apps com janela pra quem for operar à mão. Este fluxo usa o zip portátil porque mantém tudo na pasta do cliente e o caminho do CLI previsível.

## Regras

- Nunca instalar app que o time não pediu — máximo 2 na primeira rodada
- Sempre conferir o checksum e a organização `storytold` antes de extrair
- MCP com restrição de pasta sempre que o app permitir; sem restrição, só com "sim" explícito
- Nunca declarar peça pronta sem ter renderizado e olhado o resultado
- Projeto alpha: se algo falhar, mostrar o erro real e oferecer o caminho alternativo (`carrossel`, `criar-arte-redes`) — não esconder a limitação
