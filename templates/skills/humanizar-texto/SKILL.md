<!--
Template editável. Não faz parte do base-kit (as 11 skills sempre instaladas).
Diferente dos outros templates sob demanda, este não depende de um processo
específico do cliente — serve qualquer texto que a empresa produza com o
Claude. Por isso o /mapear pode oferecer como "revisão final" de qualquer
skill de texto (proposta, email, ata, relatório, documentar-processo), ou
ser instalado direto se o consultor perceber que o time se incomoda com
"cheiro de IA" no que sai do sistema — algo que a Pergunta 8 do /instalar
("o que mais incomoda em textos gerados por IA?") já costuma revelar.
Adaptar ao caso descrito antes de salvar em
.claude/skills/humanizar-texto/SKILL.md — nunca sem confirmação explícita.

Baseado em github.com/blader/humanizer (MIT), que por sua vez se baseia em
"Signs of AI writing" da Wikipedia (WikiProject AI Cleanup). Os padrões em
padroes-ia.md foram traduzidos e adaptados pra clichês de IA em português —
não é tradução literal, porque muita palavra-tell em inglês (delve, crucial,
showcase) não é o que aparece em texto gerado em PT-BR.
-->

---
name: humanizar-texto
description: >
  Reescreve texto com "cheiro de IA" pra soar como uma pessoa escreveu, sem
  mudar o que foi dito nem inventar fato novo. Remove clichês, linguagem de
  venda vazia, fontes vagas, listas com minititulo em negrito, emoji
  decorativo, travessão em excesso, final genérico e outros 30+ padrões
  catalogados. Use quando o usuário chamar /humanizar-texto, disser "isso
  parece texto de IA", "tira a cara de robô disso", "deixa mais natural",
  "humaniza esse texto", ou como passo final de qualquer skill que gera
  texto pro cliente ler (proposta, email, ata, relatório).
---

# /humanizar-texto — Remover Cheiro de IA

## Dependências

- **Padrões catalogados:** `padroes-ia.md` (nesta mesma pasta) — ler antes de revisar qualquer texto
- **Tom de voz da empresa:** `_memoria/preferencias.md` — o texto final tem que soar como aquela empresa escreve, não só "menos robótico" de forma genérica
- **Amostra de escrita real (opcional):** se o usuário colar um texto que ele mesmo escreveu antes, isso pesa mais que qualquer regra abaixo

## O que fazer

1. **Ler o texto contra os padrões de `padroes-ia.md`.** Marcar mentalmente o que aparece.
2. **Manter toda informação.** Pode encurtar trecho fraco, expandir trecho útil, juntar ou separar parágrafo — mas nenhum fato, nome, número, data ou citação pode sumir.
3. **Nunca inventar fato.** Não adicionar nome, número, data, citação ou fonte que não veio do texto original ou do próprio usuário. Se uma frase pede um detalhe que falta, ou pergunta pro usuário, ou reescreve de um jeito mais simples que não precise do detalhe.
4. **Bater com o tom certo.** Ler `_memoria/preferencias.md` antes de reescrever — o texto de uma proposta formal não fica no mesmo tom de um post de Instagram. Se tiver amostra de escrita real do usuário, ela manda mais que qualquer regra de estilo abaixo (inclusive a de travessão).

## Quando usar dentro de outra skill

Se for chamado como passo final de outra skill (ex.: `/proposta` termina e o usuário pede pra revisar), devolver só o texto final revisado — sem listar os padrões encontrados, isso é ruído nesse contexto. Se for chamado direto pelo usuário com um texto colado, mostrar:

1. O que foi encontrado (lista curta dos padrões, não precisa ser as 35 categorias — só o que apareceu de fato)
2. O texto final reescrito

Se o usuário apontar um arquivo inteiro (ex.: "humaniza o `conteudo/artigo.md`"), reescrever só a prosa — não tocar em bloco de código, frontmatter, dado estruturado ou link.

## Processo de reescrita

1. Ler o texto e marcar cada padrão que bate com `padroes-ia.md`.
2. Escrever um rascunho. Ler em voz alta (mentalmente) — checar ritmo, variação de tamanho de frase, uso de verbos simples ("é", "tem") em vez de rodeio ("configura-se como", "conta com").
3. Perguntar: "ainda soa como texto de IA em algum trecho?" e "esse rascunho manteve todo fato, nome, número e citação do original?" — qualquer perda ou invenção é erro, corrigir antes de entregar.
4. Escrever a versão final resolvendo o texto todo de uma vez, não corrigindo padrão por padrão isoladamente — se uma frase continuar estranha, reescrever o parágrafo inteiro em torno da ideia principal, não só trocar a palavra marcada.

## O que não marcar como problema

Nem todo padrão da lista é sinal de IA por si só — ver a seção "Falsos positivos" em `padroes-ia.md` antes de reescrever algo que já está bom. Gramática impecável, palavra formal isolada, um travessão sozinho, uma repetição deliberada de abertura de frase — nada disso prova nada sozinho. Só reescrever quando **vários** padrões aparecem juntos no mesmo trecho.

## Regras

- Nunca inventar fato, nome, data, número ou citação — nem pra "soar mais pessoal"
- Sempre ler `_memoria/preferencias.md` antes de reescrever, pra calibrar o tom certo
- Se tiver amostra de escrita real do usuário, ela vale mais que qualquer regra de estilo deste arquivo
- Texto técnico, jurídico ou de referência fica neutro — não forçar "personalidade" onde não cabe
- Reescrever o parágrafo em torno da ideia principal em vez de caçar palavra por palavra
- Nunca reescrever trecho que está entre aspas, é nome próprio, título ou exemplo citado — aí o padrão está sendo discutido, não usado de verdade
