---
name: atualizar-kit
description: >
  Traz atualizações do kit Blinky OS original (github.com/diegolima87/blinky_os)
  pra dentro desta instalação — skills fixas do base-kit, templates e catálogos.
  Nunca toca em memória, identidade visual ou skills criadas sob medida pro
  cliente. Diferente de /atualizar (que sincroniza a memória com o estado
  atual do workspace, não busca nada de fora) — este traz melhoria nova do
  kit original. Use quando o usuário chamar /atualizar-kit, disser "tem
  versão nova do Blinky OS", "atualiza o kit", "puxa as melhorias do
  blinky_os", "sincroniza com o repositório original".
---

# /atualizar-kit — Trazer Atualizações do Kit Original

## O que isso faz (e o que não faz)

Busca a versão mais recente de `github.com/diegolima87/blinky_os` e atualiza só o que é **código do kit** nesta instalação. Nunca mexe em dado real da empresa cliente.

**Atualiza (kit-owned):**
- As skills fixas do base-kit em `.claude/skills/`: `instalar`, `iniciar`, `mapear`, `atualizar`, `syncar`, `novo-projeto`, `proposta`, `ata-reuniao`, `documentar-processo`, `relatorio-status`, `email-profissional`, `atualizar-kit`
- `templates/` inteiro — perfis, skills sob demanda, catálogo de ferramentas, referências de design
- `LICENSA.md`
- A parte fixa ("constituição") do `CLAUDE.md` — tudo a partir da linha `---` que segue a seção "Ferramentas conectadas"

**Nunca toca:**
- `_memoria/` (empresa, preferências, estratégia, contexto vivo)
- `marca/design-guide.md`
- A parte de topo do `CLAUDE.md` — Identidade, O que é esse workspace, Sobre a empresa, O que mais fazemos aqui, Time e contexto, Tom de voz, Ferramentas conectadas (tudo que o `/instalar` preencheu pra essa empresa específica)
- Qualquer skill em `.claude/skills/` que não esteja na lista fixa acima — são skills que o `/mapear` criou ou adaptou pra esse cliente
- `dados/`, pastas de departamento/cliente/projeto, e qualquer coisa fora da lista "Atualiza"

## Fluxo

### 1. Buscar a versão atual do kit

Clonar o kit original numa pasta temporária, **fora** do repositório do cliente (usar a pasta temp do sistema):

```bash
git clone --depth 1 https://github.com/diegolima87/blinky_os.git <pasta-temporaria>
```

Nunca adicionar isso como remote do repositório do cliente — é só uma cópia de leitura, descartada no fim do processo.

### 2. Comparar

**Importante:** comparar ignorando diferença de quebra de linha (CRLF vs LF) — clone novo no Windows costuma vir com terminador diferente do que já está no repositório do cliente por causa do `core.autocrlf`, mesmo quando o conteúdo é idêntico. Normalizar (ex.: remover `\r`) antes de comparar, senão o diagnóstico do passo 3 vai listar o kit inteiro como "modificado" mesmo sem nenhuma mudança real — confirmado isso na prática rodando a skill uma vez direto no próprio repositório do kit.

Pra cada caminho da lista "Atualiza" acima, comparar o conteúdo da pasta temporária com o que existe no repositório do cliente:

- **Novo** — existe no kit baixado, não existe localmente (skill nova, template novo)
- **Modificado** — existe nos dois, conteúdo diferente
- **Sem mudança** — conteúdo idêntico, nem listar

Pra `CLAUDE.md`, comparar **só a parte a partir do `---`** que segue "Ferramentas conectadas" — nunca a parte de cima, que é do cliente.

Se algum arquivo da lista fixa do base-kit estiver diferente do que o kit baixado tem, mas também diferente de qualquer versão anterior conhecida (sinal de que foi customizado localmente por um consultor), marcar como "modificado localmente" em vez de "modificado" — isso muda o aviso no passo 3.

### 3. Mostrar o diagnóstico

Nunca aplicar nada antes desse passo. Formato:

> "Atualizações disponíveis do Blinky OS:
>
> **Novo:**
> - `templates/skills/humanizar-texto/` — skill de revisão de texto
> - `templates/design/referencias/` — referências de sistema de design
>
> **Modificado:**
> - `.claude/skills/proposta/SKILL.md` — passou a referenciar as novas referências de design
> - `CLAUDE.md` (parte fixa) — ajuste na seção 'Fluxo de trabalho'
>
> **Modificado localmente (cuidado):**
> - `.claude/skills/email-profissional/SKILL.md` — esse arquivo foi customizado aqui, diferente tanto da versão anterior quanto da nova. Sobrescrever perde a customização.
>
> Quer aplicar tudo, revisar um por um, ou pular por agora?"

Se não houver nada novo: "Kit já está na versão mais recente. Nada pra atualizar."

Se o usuário quiser revisar um por um, mostrar um resumo do que muda em cada arquivo antes de aplicar — não precisa ser o diff linha a linha, só o essencial. Pra qualquer item marcado "modificado localmente", perguntar explicitamente antes de sobrescrever, mesmo que o usuário já tenha dito "aplica tudo".

### 4. Aplicar

Só depois da confirmação. Copiar os arquivos "novo" e "modificado" aprovados da pasta temporária pro repositório do cliente. Pra `CLAUDE.md`, substituir só a parte a partir do `---`, preservando tudo acima intacto — nunca reescrever o arquivo inteiro.

### 5. Limpar

Apagar a pasta temporária do clone. Confirmar que não sobrou nenhum `.git` ou remote novo dentro do repositório do cliente.

### 6. Confirmar

> "Kit atualizado — [N] arquivos novos, [N] modificados.
> Isso ainda não foi salvo no GitHub do cliente. Roda `/syncar` quando quiser gravar."

## Regras

- Nunca aplicar nada sem mostrar o diagnóstico completo e esperar confirmação — mesmo gate usado no resto do sistema
- Nunca tocar em `_memoria/`, `marca/design-guide.md`, na parte de topo do `CLAUDE.md`, ou em qualquer skill fora da lista fixa do base-kit
- Se um arquivo do base-kit foi customizado localmente, sempre confirmar explicitamente antes de sobrescrever — mesmo dentro de um "aplica tudo"
- Nunca deixar a pasta temporária do clone dentro do repositório do cliente, nem adicionar remote apontando pro kit original
- Tom direto, sem explicar git em detalhe a não ser que o usuário pergunte
