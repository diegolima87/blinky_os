---
name: iniciar
description: Inicia a sessão de trabalho lendo o contexto da empresa cliente e ajudando o usuário a começar. Usar no começo de cada sessão nova do Claude Code.
---

# /iniciar

Use essa skill no começo de cada sessão de trabalho.

## O que fazer

1. Verificar se `_memoria/empresa.md` existe e está configurado (sem `<!-- NOT CONFIGURED -->`)
2. Verificar se `_memoria/preferencias.md` existe e está configurado
3. Verificar se `_memoria/estrategia.md` existe e está configurado
4. Ler `_memoria/agora.md` (contexto vivo: onde paramos, decisões recentes, pendências) se estiver configurado
5. Apresentar um resumo de contexto e perguntar o que o usuário quer fazer

## Fluxo

### Se os arquivos de memória existem e estão configurados

Leia `_memoria/empresa.md`, `_memoria/preferencias.md`, `_memoria/estrategia.md` e, se configurado, `_memoria/agora.md`.

Apresente um resumo curto e direto no formato:

```
Tudo certo. Contexto carregado:

**Empresa:** [nome e o que faz, em uma linha]
**Fase do rollout:** [piloto / departamental / empresa toda, de estrategia.md]
**Foco agora:** [prioridade principal de estrategia.md — se não configurado, omitir essa linha]
**Onde paramos:** [de agora.md — a última coisa em andamento; omitir se não configurado]
**Pendências:** [de agora.md — até 2 itens em aberto mais relevantes; omitir se não houver]
**Lembretes:** [qualquer preferência importante, ex: "sem travessões", "responder em PT"]

O que você quer fazer hoje?
```

Mantenha o resumo enxuto (até 6 linhas). Não reescreva tudo que está nos arquivos, só o essencial pra retomar.

### Se os arquivos de memória não existem ou têm `<!-- NOT CONFIGURED -->`

Avise o usuário:

```
Essa instalação do Blinky OS ainda não foi configurada.
Rode /instalar pra eu aprender sobre a empresa — leva uns 5 minutos.
Depois de configurado, o /iniciar vai funcionar completo.
```

## Comportamento

- Tom direto, sem enrolação. Não diga "Olá! Fico feliz em ajudar!"
- Não liste os arquivos que foram lidos. Só mostre o que importa.
- Se houver tarefas pendentes em `tarefas.md`, mencione até 3 itens no topo
- Após o resumo, aguarde o usuário responder o que quer fazer
