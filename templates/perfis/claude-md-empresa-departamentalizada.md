# Perfil: Empresa Departamentalizada

**Quando usar:** empresa já organizada por áreas (marketing, comercial, financeiro, RH, operações...), cada uma com processos e responsáveis próprios. Este é o perfil-alvo principal do Blinky OS pra engajamentos de consultoria — onde o playbook de rollout em fases (piloto → departamental → empresa toda) faz mais sentido.

## Estrutura de pastas sugerida

```
marketing/
comercial/
  propostas/
financeiro/
  relatorios/
rh/
operacoes/
projetos/
dados/
tarefas.md
```

Ajustar os nomes das áreas conforme o organograma real informado no `/instalar` — a lista acima é só ponto de partida. Usar `/novo-projeto` pra dar sub-contexto a cada área conforme o rollout avança.

## Como calibrar `CLAUDE.md` e `_memoria/empresa.md`

- **Equipe:** registrar por área — quem é responsável por qual departamento, quem vai usar o sistema em cada um.
- **Departamentos/áreas:** listar de verdade, no formato do organograma da empresa — isso alimenta o `/mapear` pra rodar área por área.
- **Skills prioritárias no `/mapear`:** varia por área — mapear cada departamento separadamente em vez de tentar uma skill única "pra empresa toda".
- **Fase do rollout inicial:** sempre começa em "piloto" (um time/departamento-teste), passa por "departamental" (um departamento de cada vez) antes de "empresa toda". Não pular a fase departamental nesse perfil — é onde o handoff de cada área acontece.
