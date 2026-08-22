---
name: proposta
description: >
  Gera uma proposta comercial ou interna profissional em HTML a partir de um
  briefing em texto livre. Aplica a identidade visual da empresa (cores, fontes
  do design-guide.md).
  Use quando o usuário mencionar "proposta", "proposta comercial", "orçamento",
  "apresentação de projeto" ou pedir um documento de venda/aprovação para
  cliente ou área interna.
---

# /proposta — Geração de Proposta

## Dependências

- **Identidade visual:** `marca/design-guide.md`
- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Coletar o briefing

Se o usuário ainda não forneceu um briefing completo, perguntar:

1. "Pra quem é a proposta? (cliente externo ou aprovação interna)"
2. "Qual é o problema ou necessidade a resolver?"
3. "O que está sendo proposto? (serviço, produto ou iniciativa)"
4. "Qual é o valor/investimento? (pode ser range ou 'a definir')"
5. "Tem prazo ou entregável específico?"

Se o usuário já forneceu as informações de forma livre, extrair o que der e prosseguir sem fazer todas as perguntas.

### Passo 2 — Ler os arquivos de memória

- Ler `marca/design-guide.md` pra aplicar cores e fontes
- Ler `_memoria/empresa.md` pra dados de quem propõe (nome, serviços, contato)
- Ler `_memoria/preferencias.md` pra tom da proposta

### Passo 3 — Gerar o HTML

Criar um arquivo HTML completo com as seguintes seções:

**Estrutura da proposta:**
1. Header — logo/nome da empresa + data. Se o design guide tiver logo definido, usar a imagem (140-180px de largura), escolhendo a versão certa pro fundo. Sem logo, usar o nome em texto
2. Destinatário — "Proposta para [Cliente/Área]"
3. O problema — o desafio que motiva a proposta (2-3 parágrafos, na perspectiva de quem recebe)
4. A solução — o que está sendo proposto e por que resolve
5. Escopo — o que está incluído (lista clara)
6. O que NÃO está incluído (quando relevante — evita conflito depois)
7. Prazo e entregáveis
8. Investimento — valor com contexto de retorno quando possível
9. Próximos passos — ação clara
10. Sobre quem entrega — 3-4 linhas

**Estilo visual:**
- Aplicar cores e fontes do `marca/design-guide.md`
- Se o design guide estiver vazio, usar: fundo branco, texto escuro, acento em azul escuro (#1E3A5F), tipografia limpa
- Layout de uma coluna, responsivo, leve
- Valor em destaque visual (não escondido)

### Passo 4 — Salvar

Salvar em `propostas/proposta-[destinatario]-[data].html` (ou na pasta de propostas específica do perfil/departamento, se houver — ver estrutura em `CLAUDE.md`).

Se houver skill/ferramenta de publicação configurada (ver `templates/ferramentas/catalogo.md`), oferecer gerar link compartilhável.

---

## Regras

- Tom segue `_memoria/preferencias.md`
- Nunca inventar valor, prazo ou escopo — se não foi fornecido, deixar placeholder claro pra preencher
- A proposta deve soar como veio de uma pessoa, não de um template corporativo genérico
- Sem jargão vazio ("soluções inovadoras", "entregamos valor", etc)
