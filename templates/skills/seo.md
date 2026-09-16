<!--
Template editável. Não faz parte do base-kit (as 12 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
o cliente depende de busca orgânica/local (Google, Maps, ou quer aparecer em
respostas de IA) e ainda não tem estratégia formal — diferente do catálogo de
tráfego pago (`ads-ratos`/`google-ads-ratos`/`meta-ads-ratos`/`ga4-ratos`, que
cobre campanha paga via API oficial). Adaptar ao caso descrito antes de salvar
em .claude/skills/seo/SKILL.md — nunca sem confirmação explícita.

Alimenta e é alimentado por outras skills: `/publicar-tema` consome a
estratégia de conteúdo do Passo 5; `/responder-avaliacoes` é usada dentro do
Passo 3 (GMB) e do checklist de monitoramento (Passo 7); a estrutura de
campanha do Passo 6 é insumo pro `google-ads-ratos` (catálogo), que cria a
campanha direto via API em vez de gerar CSV pra importar na mão.
-->

---
name: seo
description: >
  Fluxo completo de SEO, GEO e estratégia de Google Ads em 8 passos: pesquisa
  de demanda, análise de concorrência, Google Meu Negócio, otimização
  on-page, estratégia de conteúdo, estrutura de campanha Google Ads, checklist
  de monitoramento e GEO (aparecer em IAs como ChatGPT, Gemini, Perplexity).
  Use quando o usuário pedir "seo", "geo", "palavras-chave", "aparecer no
  google", "aparecer no chatgpt", "aparecer nas ias", "google meu negócio",
  "gmb", "analisar concorrência seo", "pesquisa de nicho", "google trends".
---

# /seo — SEO completo + GEO + estratégia de Google Ads

## Dependências

- **Contexto do negócio:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`
- **Estratégia atual:** `_memoria/estrategia.md`
- **Ferramentas:** WebSearch, WebFetch (nativos — sem API paga)
- **Outputs vão em:** `conteudo/seo/`

## Workflow

### Passo 1 — DEMANDA: O que as pessoas buscam nesse nicho?

**Objetivo:** Entender se existe demanda real e como as pessoas buscam.

1. Ler `_memoria/empresa.md` pra extrair: produtos/serviços, região, público-alvo, diferenciais
2. Gerar uma lista inicial de **30-50 termos-semente** baseados em:
   - Categorias de produto/serviço
   - Intenção de busca (informacional, comercial, transacional)
   - Localização (cidade, região, estado)
   - Uso final / contexto do cliente
3. Usar **WebSearch** pra cada grupo de termos:
   - Buscar `"[termo] site:trends.google.com"` pra ver sazonalidade
   - Buscar `"[termo]"` pra ver o que aparece (orgânico, ads, maps)
   - Buscar `"[termo] related searches"` pra expandir a lista
4. Classificar cada termo por:
   - **Volume estimado:** alto / médio / baixo / micro
   - **Intenção:** informacional, comercial, transacional, navegacional
   - **Dificuldade:** quantos concorrentes fortes aparecem?
   - **Relevância:** direto (produto exato) / indireto (nicho relacionado) / tangencial

**Output:** Salvar em `conteudo/seo/01-pesquisa-demanda.md` com:
- Tabela de termos classificados
- Top 10 termos prioritários (volume + intenção transacional + baixa concorrência)
- Termos sazonais
- Termos descartados e por quê

### Passo 2 — CONCORRÊNCIA: Quem aparece pra essas buscas?

**Objetivo:** Mapear quem domina os resultados e onde estão os gaps.

1. Pegar os **top 10 termos** do Passo 1
2. Pra cada termo, usar **WebSearch** e analisar:
   - **Top 5 resultados orgânicos:** quem são, que tipo de página (site institucional, marketplace, blog, diretório)
   - **Resultados do Maps/Local Pack:** quem aparece, quantas avaliações, nota
   - **Google Ads:** alguém anuncia? qual a copy?
3. Pra cada concorrente relevante (máx 5-8), usar **WebFetch** pra analisar:
   - Estrutura do site (páginas, blog, catálogo)
   - Meta titles e descriptions das páginas principais
   - Conteúdo: falam de quê? com que profundidade?
   - Schema markup: usam dados estruturados?
   - GMB: perfil completo? fotos? posts? avaliações?
4. Identificar:
   - **Gaps:** o que nenhum concorrente faz bem
   - **Oportunidades:** termos onde ninguém domina
   - **Ameaças:** concorrentes fortes demais pra competir de frente
   - **Benchmark:** o padrão mínimo que o negócio precisa atingir

**Output:** `conteudo/seo/02-analise-concorrencia.md` com tabela de concorrentes, mapa de gaps/oportunidades, recomendações de onde atacar primeiro.

### Passo 3 — GMB: Google Meu Negócio (resultado mais rápido)

**Objetivo:** Montar o perfil completo do Google Business Profile pra aparecer no Maps e Local Pack.

1. Pesquisar como está o perfil atual (se existir): buscar o nome da empresa no Google
2. Criar documento com **tudo que precisa ser preenchido/otimizado:**

   **Informações básicas:** nome (idêntico ao registrado), categoria principal + secundárias, endereço, telefone, site, horário, área de atendimento.

   **Descrição do negócio:** descrição otimizada (750 caracteres) com palavras-chave naturais, tom conforme `_memoria/preferencias.md`.

   **Atributos e serviços:** serviços relevantes, atributos (entrega, atacado, produção própria, etc.).

   **Fotos recomendadas:** checklist (fachada, interior, produtos, equipe, produção) + especificações.

   **Posts GMB:** 4 posts iniciais sugeridos + calendário de posts recorrentes.

   **Estratégia de avaliações:** como pedir avaliação dos clientes atuais; usar `/responder-avaliacoes` (se instalada) pra manter o padrão de resposta.

   **Citações e diretórios:** lista de diretórios relevantes pro nicho, NAP consistente (Name, Address, Phone) pra todas as listagens.

**Output:** `conteudo/seo/03-google-meu-negocio.md`

### Passo 4 — ON-PAGE: Otimizar o site

**Objetivo:** Garantir que cada página esteja otimizada pras palavras-chave certas.

1. Ler a estrutura atual do site (se existir; senão, perguntar as páginas)
2. Pra cada página: mapeamento de palavra-chave, meta tags otimizadas (title 50-60 caracteres com keyword no início, meta description 150-160 caracteres com CTA, H1/H2/H3 sugeridos), schema markup (LocalBusiness, Product, FAQ em JSON-LD), checklist técnico (URLs amigáveis, alt text, velocidade, mobile-friendly, sitemap.xml, robots.txt, canonical, Open Graph), mapa de internal linking.

**Output:** `conteudo/seo/04-otimizacao-on-page.md` com tabela página → keyword → title → description → H1, schema pronto pra copiar, checklist técnico com status.

### Passo 5 — CONTEÚDO: Estratégia de autoridade

**Objetivo:** Criar plano de conteúdo que posicione a empresa como referência no nicho.

1. Baseado nos termos do Passo 1 (especialmente os informacionais):
   - **Páginas/posts evergreen:** 5-10 ideias que respondem dúvidas reais do público, com título otimizado, keyword-alvo, estrutura de headings, estimativa de tamanho
   - **Cluster de conteúdo:** página pilar + páginas satélite que linkam pra pilar
   - **Calendário editorial:** prioridade, frequência sugerida, formato (blog post, guia, FAQ, comparativo)
   - **Conteúdo local:** páginas de área de atendimento (se fizer sentido)

**Output:** `conteudo/seo/05-estrategia-conteudo.md`

> Essa lista é o insumo da skill `/publicar-tema` (se instalada) — cada item dessa estratégia vira artigo + carrossel + legendas com um único comando.

### Passo 6 — ESTRUTURA DE CAMPANHA: Google Ads

**Objetivo:** Estruturar campanha baseada nos dados reais da pesquisa, pronta pra virar campanha de verdade.

1. Objetivo (leads, visitas, alcance local)
2. Estrutura: 1 grupo de anúncio por cluster de keyword do Passo 1, 10-15 keywords por grupo, lista de negativas, extensões (sitelinks, chamada, snippet)
3. Copies: 15 headlines (30 caracteres) + 4 descriptions (90 caracteres) por grupo, seguindo `_memoria/preferencias.md`, sem afirmação superlativa não comprovada
4. Landing page: avaliar se o site atual serve ou precisa de página específica

**Output:** `conteudo/seo/06-estrutura-google-ads.md` com clusters, keywords, copies e configuração recomendada.

> Esse documento é o briefing pronto pro `google-ads-ratos` (ver `templates/ferramentas/catalogo.md`) montar a campanha de verdade via API — sem precisar exportar CSV nem montar grupo por grupo na mão na interface do Google.

### Passo 7 — MONITORAMENTO: Checklist recorrente

**Semanal:** posição nos top 10 termos; responder avaliações no GMB (`/responder-avaliacoes`); postar no GMB (1x/semana mínimo).

**Mensal:** revisar métricas de campanha paga (usar `ads-ratos`/`google-ads-ratos` do catálogo, se instaladas); verificar tráfego orgânico (Google Search Console); atualizar palavras-chave negativas; publicar 1-2 conteúdos do calendário editorial (`/publicar-tema`); verificar citações/diretórios.

**Trimestral:** refazer pesquisa de concorrência (Passo 2 resumido); atualizar fotos e posts do GMB; revisar estratégia de conteúdo; avaliar novas oportunidades de keyword.

**Output:** `conteudo/seo/07-checklist-monitoramento.md`

### Passo 8 — GEO: Aparecer nas respostas de IAs

**Objetivo:** Otimizar a presença pra que IAs generativas (ChatGPT, Gemini, Perplexity, Copilot) citem a empresa quando alguém perguntar sobre o nicho.

**Por que importa:** cada vez mais clientes perguntam pra IA "qual o melhor fornecedor/serviço de X em Y?" — quem aparece ganha lead qualificado sem pagar ads.

1. **Auditoria GEO:** WebSearch nos top 10 termos em engines de IA (Perplexity, etc.); verificar se a empresa (ou concorrentes) aparece; mapear quais fontes as IAs citam pra esse nicho
2. **Conteúdo otimizado pra IA:** cada artigo do Passo 5 deve ter respostas diretas nas primeiras linhas, dados concretos (números, certificações, endereços, fatos verificáveis), estrutura com perguntas como H2/H3 (formato Q&A) — evitar texto vago, IAs descartam genérico
3. **FAQ Schema no site:** seção de FAQ com perguntas reais do nicho, FAQPage schema (JSON-LD), 5-10 perguntas sugeridas
4. **Citações externas:** diretórios, sites de avaliação, guest posts, menções em blogs do nicho, aparições em mídia
5. **Dados estruturados reforçados:** LocalBusiness, FAQPage, Product, Article schemas
6. **Monitoramento GEO:** a cada 30 dias, testar os top 5 termos no ChatGPT/Gemini/Perplexity; registrar se a empresa apareceu, quem apareceu, fonte citada; ajustar conteúdo com base no resultado

**Output:** `conteudo/seo/08-geo-otimizacao-ia.md` com auditoria, FAQ + schema JSON-LD, lista de ações e checklist de monitoramento.

## Execução

Ao rodar `/seo`, executar **todos os 8 passos em sequência**, salvando cada output no arquivo correspondente. Entre cada passo, mostrar resumo do que foi encontrado antes de seguir.

Se o usuário quiser rodar apenas um passo: `/seo passo 3` ou `/seo gmb` ou `/seo geo`.

Ao finalizar, apresentar **resumo executivo** com: top 5 oportunidades encontradas, ações prioritárias, estimativa de investimento em ads, próximos passos recomendados.

## Regras

- Toda pesquisa deve ser real (usar WebSearch/WebFetch), nunca inventar dado de volume ou concorrência
- Copies e textos seguem `_memoria/preferencias.md` estritamente
- Termos em português do Brasil, como o público busca
- Quando um dado não puder ser obtido (ex.: volume exato), deixar claro que é estimativa e explicar a lógica
- Focar em termos com intenção comercial/transacional pra negócio B2C/B2B local
- Schema markup em formato JSON-LD (padrão Google)
- Nunca inventar CPC ou estimativa de custo de ads sem base real
