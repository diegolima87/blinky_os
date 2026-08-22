<!--
Referência pra adaptar quando o cliente tem 1 conta, sem Supabase, e prefere
algo rodando localmente. Ao instalar de verdade, o conteúdo deste arquivo
(adaptado ao caso do cliente) vira o `.claude/skills/agendar-publicacao/SKILL.md`
final, junto com os scripts que ele referencia.
-->

# Implementação A — Agendador local (Windows Task Scheduler)

Boa quando: uma conta/marca só, sem infraestrutura cloud, tudo roda na máquina do usuário.

## Estrutura

```
agendamentos/
  fila.json      <- o que o robô lê pra publicar (gerado pelos scripts, não editar na mão)
  log.txt        <- o que já foi publicado
  PAUSA          <- se esse arquivo existir, o robô sai sem publicar nada (freio de mão)
```

## Scripts necessários

- `scripts/montar-fila.js` — lê o conteúdo pronto (imagens + legenda de `/carrossel` ou `/criar-arte-redes`) e monta/atualiza `fila.json`. Rodar de novo no meio do ciclo não republica o que já saiu — preserva o status de quem já foi publicado.
- `scripts/publicar-agendado.js` — o "piloto automático". Roda via Agendador de Tarefas do Windows, num intervalo curto (ex.: de hora em hora, dentro do horário comercial). Publica **no máximo um post por execução**, e só o que está agendado pra hoje.
- `scripts/instalar-tarefa.ps1` / `scripts/desinstalar-tarefa.ps1` — registram/removem a tarefa agendada.

## As quatro travas de segurança (não negociáveis — isso roda sozinho por semanas)

1. **Um post por execução.** Nunca esvazia a fila acumulada de uma vez, mesmo que vários posts estejam atrasados.
2. **Atraso máximo configurável (sugestão: 2 dias).** Post mais velho que isso vira `pulado` em vez de publicar atrasado — se a máquina ficou dias desligada, o calendário retoma no dia certo, não despeja tudo de uma vez.
3. **Status por plataforma.** Se Instagram publicou e Facebook falhou, a próxima execução só tenta o Facebook (não republica o Instagram).
4. **Arquivo `PAUSA`.** Se existir em `agendamentos/`, o script sai sem publicar nada. É o freio de mão manual — criar/apagar esse arquivo é o jeito mais rápido de pausar/retomar sem mexer em código ou desinstalar a tarefa.

## Workflow

1. Conteúdo pronto (de `/carrossel` ou `/criar-arte-redes`) → rodar `montar-fila.js` pra colocar na fila.
2. Confirmar com o usuário a data/hora de publicação de cada item antes de considerar a fila pronta.
3. Se a tarefa agendada ainda não estiver instalada, rodar `instalar-tarefa.ps1` (só depois do OK explícito do usuário).
4. O `publicar-agendado.js` cuida do resto sozinho — registrar em `agendamentos/log.txt` cada execução (publicou, pulou, ou saiu por causa do `PAUSA`).

## Ajuste de post já agendado

Reeditar o conteúdo de origem e rodar `montar-fila.js` de novo — ele atualiza a fila sem duplicar. Se o post já foi ao ar, não reescrever: ajuste vale só pra post futuro.

## Comandos

```powershell
powershell -ExecutionPolicy Bypass -File scripts\instalar-tarefa.ps1
powershell -ExecutionPolicy Bypass -File scripts\desinstalar-tarefa.ps1
```

```bash
node scripts/montar-fila.js
```
