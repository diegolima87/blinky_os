<!--
Template editável. Não faz parte do base-kit (as 11 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
a empresa cliente cria arte pra redes sociais e já usa (ou está disposta a usar)
Canva. Adaptar ao caso descrito antes de salvar em
.claude/skills/criar-arte-redes/SKILL.md — nunca sem confirmação explícita.

Alternativa ao template `carrossel`: esse usa Canva (MCP) em vez de HTML/CSS —
mais rápido pra post único, menos flexível pra carrossel de várias etapas.
-->

---
name: criar-arte-redes
description: >
  Cria a arte de um post único pra Instagram/Facebook usando Canva (MCP),
  seguindo a identidade visual da empresa. Gera candidatos, deixa o usuário
  escolher, exporta em PNG. Use quando o usuário pedir "criar arte pro post",
  "fazer uma arte", "gerar post pro Instagram", "preciso de uma imagem pra
  rede social", ou chamar /criar-arte-redes.
---

# /criar-arte-redes — Criar Arte pra Instagram e Facebook

## Dependências

- **Identidade visual:** `marca/design-guide.md` (cores, tipografia, logo)
- **Ferramenta:** Canva MCP (`mcp__claude_ai_Canva__*`) — ver `templates/ferramentas/catalogo.md`
- **Onde salvar:** `conteudo/[AAAA-MM-DD]-[slug-do-post]/`
- **Próximo passo depois de pronta a arte:** `/agendar-publicacao` (se instalada), ou publicação manual

---

## Workflow

### Passo 1 — Entender o post

Perguntar (se o usuário não tiver dito ainda):
- Sobre o que é o post (produto, promoção, dica, institucional)
- Tem algum texto/CTA que precisa aparecer na arte
- É pra Instagram, Facebook, ou os dois (o formato feed 1080x1350 funciona bem pros dois)

### Passo 2 — Checar o brand kit no Canva

Rodar `mcp__claude_ai_Canva__list-brand-kits`. Se existir um brand kit da empresa, usar o `brand_kit_id` no passo seguinte. Se não existir, seguir sem brand kit, mas incluir na query as cores e tipografia de `marca/design-guide.md` pra manter a identidade.

### Passo 3 — Gerar candidatos

Rodar `mcp__claude_ai_Canva__generate-design` com `design_type: "instagram_post"` e uma `query` descrevendo o post (tema, texto/CTA, estilo da marca). Incluir `brand_kit_id` se achou um no passo 2.

Mostrar as opções geradas pro usuário escolher (não escolher sozinho).

### Passo 4 — Criar o design escolhido

Com a escolha do usuário, rodar `mcp__claude_ai_Canva__create-design-from-candidate` pra adicionar o design definitivo à conta Canva.

### Passo 5 — Exportar em PNG

1. Rodar `mcp__claude_ai_Canva__get-export-formats` pro design, pra confirmar que PNG é suportado
2. Rodar `mcp__claude_ai_Canva__export-design` com `format.type: "png"`
3. Baixar o PNG pro caminho `conteudo/[AAAA-MM-DD]-[slug-do-post]/post.png`

### Passo 6 — Encerrar e sugerir o próximo passo

> "Arte pronta em `conteudo/[data]-[slug]/post.png`. Quer que eu já chame o `/agendar-publicacao` pra programar a publicação?"

Se sim, seguir direto pro fluxo dessa skill (se instalada) passando esse caminho.

---

## Regras

- Nunca publicar direto por essa skill — ela só cria e exporta a arte. Publicação é sempre via `/agendar-publicacao` (ou fluxo manual), com preview e confirmação.
- Sempre mostrar os candidatos gerados pro usuário escolher, nunca decidir sozinho.
- Seguir as cores e tipografia de `marca/design-guide.md` mesmo sem brand kit configurado no Canva.
- Nome de pasta e arquivo em formato `AAAA-MM-DD-slug-curto`.
- A IA de geração de texto do Canva erra acentuação em português com frequência — se o post precisa de texto embutido preciso, revisar com atenção ou preferir montar em HTML (skill `/carrossel`).
