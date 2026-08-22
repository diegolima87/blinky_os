---
name: ata-reuniao
description: >
  Transforma anotações soltas, transcrição ou relato de uma reunião numa ata
  estruturada com decisões e próximos passos claros.
  Use quando o usuário disser "faz a ata dessa reunião", "resume essa reunião",
  "registra as decisões", "transcreve e organiza essa call", ou colar notas/
  transcrição de uma reunião pedindo pra organizar.
---

# /ata-reuniao — Ata e Registro de Decisões

## Dependências

- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Coletar o material

Se o usuário já colou notas, transcrição ou um relato da reunião, usar isso como fonte. Se não, perguntar:

1. "Sobre o que foi a reunião e quem participou?"
2. "Cola as anotações, a transcrição, ou me conta o que rolou."

Se houver um arquivo de áudio/vídeo da reunião em `dados/`, oferecer usar a skill de transcrição do catálogo (`templates/ferramentas/catalogo.md`) antes de organizar.

### Passo 2 — Estruturar a ata

Gerar em markdown, no formato:

```markdown
# Ata — [Assunto da reunião]

**Data:** [data]
**Participantes:** [lista]

## Pauta
[o que estava previsto discutir, se mencionado]

## Discussão
[resumo objetivo dos pontos discutidos — não transcrição literal, síntese do que importa]

## Decisões
- [decisão 1]
- [decisão 2]

## Próximos passos
- [ ] [ação] — responsável: [nome] — prazo: [data, se houver]
- [ ] [ação] — responsável: [nome] — prazo: [data, se houver]

## Pendências / temas em aberto
- [o que ficou sem decisão, pra retomar depois]
```

Não inventar decisões ou responsáveis que não foram mencionados — deixar em branco ou marcar "a definir" quando faltar informação.

### Passo 3 — Salvar

Salvar em `reunioes/ata-[assunto]-[data].md` (ou na pasta do departamento/projeto relevante, se a reunião for específica de uma área — ver estrutura em `CLAUDE.md`).

### Passo 4 — Oferecer atualizar memória

Se alguma decisão registrada parece ter valor duradouro pro contexto da empresa (mudança de prioridade, novo processo, novo cliente), seguir a regra "Aprender com correções" do `CLAUDE.md`: perguntar se deve salvar em `_memoria/`.

---

## Regras

- Tom segue `_memoria/preferencias.md`
- Síntese, não transcrição — a ata deve ser mais curta que o material bruto
- Decisões e próximos passos sempre em lista, nunca em prosa corrida
- Se não houver responsável claro pra uma ação, marcar "a definir" em vez de inventar um nome
