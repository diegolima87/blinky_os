<!--
Template editável. Não faz parte do base-kit (as 11 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
a empresa cliente quer um painel de acompanhamento sempre disponível (não um
documento pontual). Adaptar ao caso descrito antes de salvar em
.claude/skills/dashboard-cliente/SKILL.md — nunca sem confirmação explícita.

Diferença pra skill `relatorio-status` (base-kit): `relatorio-status` gera um
documento periódico estático (XLSX/PDF, sob demanda ou por período), pra
enviar. `dashboard-cliente` gera um painel HTML persistente, mantido fresco
por coleta agendada, aberto no navegador a qualquer momento sem precisar
rodar a skill de novo. São complementares — perguntar ao usuário qual dos
dois formatos faz mais sentido pro caso antes de instalar.
-->

---
name: dashboard-cliente
description: >
  Monta um dashboard de acompanhamento recorrente (coleta de dados + geração
  de HTML + agendamento): script de coleta separado do de geração, snapshot
  em JSON entre os dois, HTML autocontido. Prefere um documento pra enviar?
  Use /relatorio-status. Prefere um painel sempre disponível? Use esta skill.
  Use quando o usuário chamar /dashboard-cliente, disser "quero um dashboard",
  "relatório recorrente", "montar um painel de KPIs".
---

# /dashboard-cliente — Dashboard Recorrente

## Contexto

A coleta de dados é sempre separada da geração do dashboard:

1. `coletar-[metrica].py` (ou `.js`) busca na fonte (planilha, API de ads, rede social, financeiro, etc) e salva um snapshot em JSON local — nunca gera HTML.
2. `gerar-dashboard-[metrica].py` (ou `.js`) só lê o snapshot salvo (nunca acessa a fonte de novo) e monta um HTML **autocontido**, com os dados embutidos no próprio arquivo — abre em qualquer navegador, sem depender de servidor ou internet depois de gerado.
3. Um script/`.bat` roda a coleta (e a geração) agendado, via Task Scheduler do Windows (ou cron equivalente).

Essa separação existe porque a fonte de dados pode ser lenta, ter rate limit, ou exigir login — rodar isso toda vez que alguém abre o dashboard seria frágil e lento. Snapshot resolve isso.

## Passo 1 — Definir escopo

Se não foi passado no comando, perguntar em conversa (uma pergunta de cada vez):

- Qual departamento/cliente/projeto é (verificar/criar sub-contexto via `/novo-projeto` se ainda não existir)
- Qual métrica ou fonte de dados (Google Ads, Google Sheets, Instagram/Meta, financeiro, etc)
- Quais KPIs especificamente importam pra esse dashboard
- Com que cadência atualizar (diário, semanal, sob demanda)

## Passo 2 — Verificar acesso à fonte

Consultar `templates/ferramentas/catalogo.md` pra ver se já existe integração pronta pra essa fonte. Se a credencial não estiver configurada, guiar a configuração no `.env` antes de seguir.

## Passo 3 — Script de coleta

Criar `scripts/coletar-[metrica].{py,js}` no sub-contexto relevante:

- Busca os dados na fonte definida no Passo 1
- Salva o snapshot bruto em `dados/[metrica]/snapshot-bruto.json`
- Salva um status da coleta em `dados/ultima-coleta-[metrica].json` (timestamp, sucesso/erro) — permite ao script de geração e ao usuário saberem se a coleta mais recente funcionou

## Passo 4 — Script de geração

Criar `scripts/gerar-dashboard-[metrica].{py,js}`:

- Lê **só** o snapshot salvo, nunca a fonte original
- Monta o HTML final com o payload dos dados embutido inline (não faz fetch em tempo de visualização)
- Usa `marca/design-guide.md` como referência de identidade
- Salva em `dashboards/[metrica]-dashboard.html`

## Passo 5 — Agendamento

Criar um `.bat`/script que roda a coleta (e a geração, se fizer sentido rodar junto) e perguntar se quer configurar no Task Scheduler do Windows (ou cron equivalente). Deixar claro: isso roda local — se a máquina estiver desligada, não atualiza. Se precisar de algo sempre ativo independente da máquina, a alternativa é Cloudflare Workers (cron job), listado no catálogo de ferramentas, que exige mais setup.

## Passo 6 — Encerrar

Resumir onde tudo ficou (scripts, dados, dashboard) e explicar como testar rodando o agendamento manualmente uma vez antes de confiar nele.

## Regras

- Nunca gerar dashboard buscando dado direto da fonte — sempre via snapshot intermediário.
- HTML final sempre autocontido, sem dependência externa (CDN, API) pra abrir.
- Nunca commitar credenciais da fonte de dados — tudo em `.env`, nunca hardcoded no script.
