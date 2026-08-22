# Catálogo de Ferramentas

Referência de APIs, CLIs e conectores que podem ser usados dentro de skills do Claude Code. Consultar este arquivo antes de criar skills novas pra saber o que já está disponível — evita reinventar integração que já existe.

> Este catálogo cobre ferramentas de uso geral pra empresas de qualquer área. Se a empresa cliente for intensiva em marketing/tráfego pago, ver a seção "Marketing e tráfego pago" — lá as skills prontas da Ratos de IA (`ads-ratos`, `meta-ads-ratos`, `google-ads-ratos`, `ga4-ratos`) resolvem isso melhor do que uma integração feita do zero.

---

## Criar visuais (HTML pra PNG)

### Playwright CLI
**O que faz:** Renderiza qualquer HTML em imagem PNG (relatórios, propostas, cards, slides)
**Precisa de conta:** Não, roda local
**Como instalar:** `npx playwright install chromium`
**Como usar numa skill:**
```bash
npx playwright screenshot --viewport-size=1920,1080 --full-page "file:///caminho/relatorio.html" "relatorio.png"
```
**Quando usar:** Skills que geram entregável visual (proposta, relatório de status, apresentação)

---

## Publicar na web

### Cloudflare Pages API
**O que faz:** Publica arquivos HTML estáticos com link público (propostas, relatórios compartilháveis, mini-landing pages)
**Precisa de conta:** Sim, Cloudflare (grátis)
**Configurar:** Salvar `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` no `.env`. Comando: `npx wrangler pages deploy .`
**Quando usar:** Sempre que uma skill gerar um HTML que precisa ser compartilhado por link com o cliente ou com terceiros

---

## Comunicação e notificação

### Gmail (MCP)
**O que faz:** Lê e compõe emails sem sair do Claude Code
**Precisa de conta:** Sim, OAuth Google
**Como instalar:** `claude mcp add gmail -- npx -y @gongrzhe/server-gmail-autoauth-mcp`
**Quando usar:** Skills de email profissional, follow-up, comunicação com clientes/fornecedores

### Google Calendar (MCP)
**O que faz:** Vê agenda, cria eventos e encontra horários disponíveis
**Precisa de conta:** Sim, OAuth Google
**Como instalar:** `claude mcp add google-calendar -- npx -y @gongrzhe/server-google-calendar-autoauth-mcp`
**Quando usar:** Skills de agendamento, planejamento de reuniões, atas com follow-up

### WhatsApp Cloud API / Z-API
**O que faz:** Envia e recebe mensagens de WhatsApp programaticamente
**Precisa de conta:** Sim (WhatsApp Cloud API oficial da Meta, ou Z-API como alternativa terceira)
**Configurar:** Tokens no `.env` (varia por provedor)
**Quando usar:** Skills de atendimento, notificação, follow-up comercial

### Telegram
**O que faz:** Envia e recebe mensagens via bot do Telegram
**Precisa de conta:** Sim, bot token do BotFather
**Quando usar:** Skills de notificação interna, alertas de processo

---

## Gestão de projetos e tarefas

### Notion (MCP)
**O que faz:** Acessa páginas, bases de dados, briefings e tarefas do Notion
**Precisa de conta:** Sim, API key em notion.so/my-integrations
**Como instalar:** `claude mcp add notion -- npx -y @notionhq/notion-mcp-server`
**Quando usar:** Skills que precisam ler/escrever tarefas, bases de clientes, documentos, SOPs

### Trello
**O que faz:** Lê e atualiza boards, listas e cards do Trello via API
**Precisa de conta:** Sim, Trello API key + token
**Configurar:** Salvar `TRELLO_KEY` e `TRELLO_TOKEN` no `.env`
**Quando usar:** Skills que leem briefing de card, atualizam status, criam card a partir de uma demanda

### Google Drive (MCP)
**O que faz:** Lê e busca arquivos do Google Drive direto do Claude (docs, planilhas, PDFs, imagens)
**Precisa de conta:** Sim, OAuth Google
**Quando usar:** Skills que precisam ler material que mora no Drive (contratos, base de conhecimento, decks)

---

## Trabalhar com planilhas e dados

### Google Sheets API (gspread)
**O que faz:** Lê e escreve em planilhas do Google Sheets via Python
**Precisa de conta:** Sim, conta Google + service account no Google Cloud
**Configurar:**
1. Criar service account no console.cloud.google.com
2. Habilitar Google Sheets API e Google Drive API
3. Compartilhar a planilha com o email da service account como editor
4. Salvar caminho do JSON no `.env`
**Quando usar:** Skills que leem planilha de controle, atualizam dados, geram relatório em planilha

---

## Trabalhar com documentos (nativas do Claude Code)

Essas já vêm prontas, sem instalação — chamar diretamente:

- **`/pdf`** — extrai texto/tabelas, cria, junta/separa PDFs (contratos, relatórios)
- **`/docx`** — cria e edita documentos Word com formatação (propostas formais, contratos)
- **`/pptx`** — cria e edita apresentações PowerPoint (decks pra cliente, treinamento)
- **`/xlsx`** — cria e edita planilhas com fórmulas e gráficos (relatórios financeiros, dashboards)
- **`/doc-coauthoring`** — fluxo guiado pra coescrever documentos (specs, SOPs, documentos de decisão)

---

## Buscar conteúdo da web

### WebFetch / WebSearch (nativos)
**O que fazem:** Leem o conteúdo de qualquer URL / pesquisam no Google
**Precisa de conta:** Não, já vêm no Claude Code
**Quando usar:** Pesquisa de referências, ler artigos, buscar dados antes de gerar um entregável

---

## Trabalhar com código e Git

### gh CLI / GitHub MCP
**O que faz:** Interage com GitHub direto do terminal ou do Claude: PRs, releases, issues, código, histórico
**Precisa de conta:** Sim, GitHub (grátis)
**Como instalar:** `brew install gh && gh auth login` (CLI) ou GitHub Personal Access Token (MCP)
**Quando usar:** Skills que automatizam fluxo de Git, para empresas cliente que têm time técnico

### context7 (MCP)
**O que faz:** Busca documentação atualizada de bibliotecas, frameworks e APIs
**Precisa de conta:** Não
**Como instalar:** `claude mcp add context7 -- npx -y @upstash/context7-mcp`
**Quando usar:** Qualquer skill que envolva código com biblioteca/framework

---

## Marketing e tráfego pago

> Se a empresa cliente tem operação de marketing/ads relevante, não integrar API do zero — usar as skills prontas da Ratos de IA, que já embrulham as melhores práticas (benchmarks BR, Quality Gates, Health Score).

### Ads Ratos (cérebro orquestrador)
**O que faz:** Diagnóstico, relatório, auditoria e estratégia pra Meta Ads e Google Ads
**Como instalar:** `git clone https://github.com/duduesh/ads-ratos ~/.claude/skills/ads-ratos`

### Meta Ads Ratos / Google Ads Ratos / GA4 Ratos
**O que fazem:** Gestão completa de campanhas Meta/Google Ads e leitura de dados GA4 via SDK/API oficial
**Como instalar:** `git clone https://github.com/duduesh/{meta-ads-ratos,google-ads-ratos,ga4-ratos} ~/.claude/skills/{nome}`

---

## Como adicionar ferramentas novas

Se a empresa usa uma API ou ferramenta que não está nessa lista, adicionar aqui seguindo o formato:

```markdown
### Nome da Ferramenta
**O que faz:** [descrição em uma frase]
**Precisa de conta:** [Sim/Não]
**Configurar:** [o que salvar no .env, se aplicável]
**Como usar numa skill:** [comando ou instrução]
**Quando usar:** [em que tipo de skill faz sentido]
```
