<!--
Referência pra adaptar quando o cliente é uma franquia/rede com 10+ páginas
administradas centralmente. Ao instalar de verdade, o conteúdo deste arquivo
(adaptado ao caso do cliente) vira o `.claude/skills/agendar-publicacao/SKILL.md`
final, junto com o cadastro de unidades e os scripts que ele referencia.
-->

# Implementação C — Publicação em massa multi-unidade (Meta Graph API)

Boa quando: a empresa é franqueadora ou administra centralmente as páginas de Instagram/Facebook de várias unidades (10 ou mais), e quer publicar o mesmo conteúdo (ou conteúdo por unidade) em todas de uma vez.

## Cadastro de unidades

Usar o padrão de "tabela markdown centralizada" (ver orientação em `.claude/skills/novo-projeto/SKILL.md`): `franqueados/cadastro.md`, uma linha por unidade.

```markdown
# Cadastro de Unidades — Páginas Sociais

| Unidade | Cidade/UF | Instagram (@) | IG Business Account ID | Facebook (página) | Page ID | Status |
|---|---|---|---|---|---|---|
| [Nome da Unidade] | [Cidade/UF] | [@handle] | [ID] | [Nome da Página] | [Page ID] | Ativo |
```

Unidades sem **IG Business Account ID** e **Page ID** preenchidos ficam de fora da publicação em massa.

## Setup (primeira vez)

Um app só cobre todas as unidades. O modelo é: **um App + um System User, ambos dentro do Business Portfolio da empresa**, com o System User tendo papel de admin atribuído a todas as páginas e contas de Instagram das unidades. Não criar um app por unidade.

Se `META_SYSTEM_TOKEN` não existir em `.env`, guiar o setup usando `/configurar-app-meta` (se instalada) como base — ela cobre Business Portfolio, criação do app, produtos certos e a decisão Standard x Advanced Access, que são os mesmos passos aqui. A única diferença pra esse caso multi-unidade:

1. Em vez de gerar token pessoal (Passos 5-7 do `/configurar-app-meta`), criar um **System User** em Business Settings > Usuários do sistema, com papel de Admin, atribuindo acesso admin a todas as páginas/contas de Instagram das unidades.
2. **Escopos:** os mesmos — `instagram_content_publish`, `instagram_basic`, `pages_read_engagement`, `pages_manage_posts`.
3. Publicar em muitas páginas de dono diferente quase sempre exige **Advanced Access** (ver Passo 4 do `/configurar-app-meta`) — confirmar status em App Dashboard > App Review antes de tentar publicar em escala. Se ainda estiver em Standard Access, rodar primeiro num grupo pequeno de unidades de teste.
4. **Converter pra token de longa duração** e salvar em `.env` como `META_SYSTEM_TOKEN` (em vez de `FACEBOOK_PAGE_ACCESS_TOKEN` — nome diferente porque esse token cobre várias páginas, não uma só).
5. **Configurar host de imagens** (ex.: imgbb) — a Graph API precisa de URL pública pra cada imagem.

## Vincular uma unidade nova ao cadastro

1. Pedir o link ou @ da página do Facebook da unidade.
2. Listar as páginas administradas pra achar o Page ID:
   ```bash
   curl -s "https://graph.facebook.com/v21.0/me/accounts?access_token=$META_SYSTEM_TOKEN"
   ```
3. Com o Page ID, buscar o Instagram Business Account vinculado:
   ```bash
   curl -s "https://graph.facebook.com/v21.0/PAGE_ID?fields=instagram_business_account&access_token=$META_SYSTEM_TOKEN"
   ```
4. Atualizar a linha da unidade em `franqueados/cadastro.md` com os IDs encontrados.

**Checagem ao vivo:** o cadastro é só um retrato da última consulta — se alguém vincula um Instagram novo direto pelo Meta Business, o arquivo fica desatualizado até a próxima consulta. Por isso o script de publicação deve **conferir o IG Business Account ID direto na Graph API antes de publicar em cada unidade** (a não ser que rode com uma flag tipo `--no-live-check`), corrigindo o cadastro automaticamente se o ID mudou.

## Workflow de publicação

1. **Detectar o conteúdo a publicar** (pack de posts pronto, de `/carrossel` ou entregue por terceiro).
2. **Montar a lista de destino:** ler o cadastro, filtrar unidades com Status ativo e IDs preenchidos.
3. **Preview obrigatório:** mostrar quantos posts em quantas unidades, quais unidades ficaram de fora e por quê, e perguntar se quer dry-run primeiro.
4. **Dry-run** (recomendado, pelo menos no primeiro lote de cada ciclo).
5. **Publicação real**, só depois de confirmação explícita — **isolando falhas** por unidade (uma página falhar não trava as demais) e **em lotes com espaçamento** (não disparar todas as chamadas simultaneamente — rate limit da Graph API).
6. **Registrar resultado:** uma linha por unidade publicada em `agendamentos/registro.md` (data, quantidade, unidade, status, horário) — essa granularidade alimenta dashboards depois (ver `/dashboard-cliente`).
7. **Confirmar:** resumo de quantas unidades publicaram com sucesso e quais falharam (com motivo).

## Regras

- NUNCA publicar sem confirmação explícita do usuário.
- Dry-run recomendado a cada pack/ciclo novo.
- Falha em uma página nunca pode travar a publicação nas demais.
- Publicar em lotes espaçados pra respeitar o rate limit da Graph API.
- Se o app ainda estiver em Standard Access, não tentar publicar em todas as unidades de uma vez.
- Essa skill não cria nem edita conteúdo — só distribui o que já está pronto.
