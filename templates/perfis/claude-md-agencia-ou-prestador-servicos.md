# Perfil: Agência ou Prestador de Serviços

**Quando usar:** o próprio cliente é uma agência, consultoria ou prestador de serviços que atende outros clientes — a unidade de trabalho é "por cliente atendido", não por área interna.

## Estrutura de pastas sugerida

```
clientes/
  _modelo-cliente/
    briefing.md
    proposta.html
propostas/
entregas/
financeiro/
tarefas.md
```

## Como calibrar `CLAUDE.md` e `_memoria/empresa.md`

- **Equipe:** registrar quem atende quais clientes/contas.
- **Departamentos/áreas:** geralmente não é por departamento interno, e sim por conta/cliente atendido — usar `clientes/<nome-do-cliente>/` como unidade organizacional em vez de área.
- **Skills prioritárias no `/mapear`:** proposta comercial, relatório de status por cliente, ata de reunião de alinhamento — tudo com variável de "qual cliente" embutida no fluxo.
- **Fase do rollout inicial:** "piloto" costuma ser uma conta específica; "departamental" pode virar "por squad de contas" se a agência tiver squads; "empresa toda" é quando todo atendimento passa pelo sistema.
