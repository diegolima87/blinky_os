<!--
Template editável. Não faz parte do base-kit (as 11 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
a empresa cliente precisa agendar publicação de posts com regularidade — não
antes, porque em geral existe conteúdo pronto (de /carrossel ou
/criar-arte-redes) antes de precisar de fila. Adaptar ao caso descrito, ESCOLHER
UMA das três referências abaixo (não instalar as três), e salvar em
.claude/skills/agendar-publicacao/SKILL.md + a referência escolhida — nunca sem
confirmação explícita.
-->

---
name: agendar-publicacao
description: >
  Enfileira posts (imagens já prontas de /carrossel ou /criar-arte-redes) pra
  publicação automática em Instagram/Facebook, escolhendo a implementação
  certa pro stack do cliente: agendador local (Windows), fila em cloud
  (Supabase + cron), ou publicação em massa multi-unidade (Meta Graph API).
  Use quando o usuário disser "agenda esse post", "programa pra sexta",
  "publica em massa", "publica nas páginas dos franqueados", ou chamar
  /agendar-publicacao.
---

# /agendar-publicacao — Fila de Publicação

## Como escolher a implementação (perguntar antes de instalar)

Esta skill não tem uma arquitetura única — três negócios diferentes resolveram o mesmo problema de formas distintas, e a certa depende do stack do cliente. Perguntar:

> "Quantas contas/páginas precisam publicar — uma marca só, ou várias unidades da mesma empresa (franquia/rede)? E vocês já usam Supabase, ou preferem algo rodando localmente/agendado no computador?"

- **1 conta, sem Supabase** → usar `referencia-local-agendador-windows.md`
- **1 a poucas contas, já usa (ou vai usar) Supabase** → usar `referencia-supabase-cron.md`
- **10+ páginas da mesma empresa (franquia/rede)** → usar `referencia-multi-unidade-graph-api.md`

Ler a referência escolhida, adaptar ao caso do cliente, e instalar **só essa** como o `SKILL.md` final (mais os scripts que ela citar) em `.claude/skills/agendar-publicacao/`. Não instalar as três — geram confusão sobre qual está ativa.

## Princípios compartilhados (valem pras três implementações — não negociáveis)

Esses princípios vêm de erro real já cometido em produção, não de teoria:

- **Nunca cria conteúdo.** Recebe imagem(ns) + legenda já prontas (de `/carrossel` ou `/criar-arte-redes`). Se não tiver conteúdo pronto, não é essa skill que resolve.
- **Enfileirar ≠ publicar.** A publicação de fato roda num processo desacoplado (tarefa agendada, cron, ou execução em lote) — nunca na hora de enfileirar. Isso permite cancelar/ajustar antes da hora.
- **Sempre um freio manual.** Um jeito de pausar tudo sem precisar desinstalar nada (arquivo de pausa, campo de status cancelado, ou equivalente).
- **Falha de uma unidade/plataforma nunca trava as demais.** Isolar erro por item, reportar no final o que falhou e por quê.
- **Sempre dry-run/preview antes de ativar de verdade**, pelo menos na primeira publicação de cada lote/ciclo novo.
- **Nunca deletar histórico** — só marcar status (`cancelado`, `pulado`, `falhou`). O log de publicações alimenta relatórios/dashboards depois.
- **Nunca publicar sem confirmação explícita do usuário** antes de cada lote/execução real (não confundir com o agendamento automático já configurado rodando sozinho depois que o usuário aprovou o ciclo).

## Depois de instalada

Confirmar com o usuário: "A partir de agora, quando eu tiver um post pronto, posso perguntar se quer agendar, ou você prefere chamar `/agendar-publicacao` manualmente?"
