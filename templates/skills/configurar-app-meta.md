<!--
Template editável. Não faz parte do base-kit (as 12 skills sempre instaladas).
O /mapear oferece este template quando o cliente quer publicar automático no
Instagram/Facebook e ainda não tem um App do Meta configurado — é o passo
ANTES de usar a skill global `publicar-redes` (método Graph API) ou a
implementação multi-unidade do `/agendar-publicacao`. As duas esperam as
mesmas variáveis de `.env` que esta skill produz no final
(INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID, FACEBOOK_PAGE_ACCESS_TOKEN,
FACEBOOK_PAGE_ID). Adaptar ao caso descrito antes de salvar em
.claude/skills/configurar-app-meta/SKILL.md — nunca sem confirmação explícita.

Escopo: só a parte de criar o App e extrair credencial. Publicação em si é
responsabilidade de outra skill (publicar-redes, agendar-publicacao). Pra
franquia/rede com 10+ páginas, ver a variação "System User" na seção final —
o resto do fluxo (Business Portfolio, produtos, Standard vs Advanced Access)
é o mesmo, só muda quem vira o "dono" do token.
-->

---
name: configurar-app-meta
description: >
  Guia passo a passo, uma etapa por vez, pra criar um App no Meta for
  Developers e extrair as credenciais pra publicar automático no Instagram e
  Facebook — sem pressupor que a pessoa já conhece a interface do Meta.
  Termina com as variáveis prontas pro .env. Use quando o usuário disser "como
  crio um app no Meta", "preciso configurar a API do Instagram/Facebook",
  "não sei configurar o Meta pra postar automático", "conectar Instagram no
  Claude Code", ou chamar /configurar-app-meta.
---

# /configurar-app-meta — Criar o App do Meta pra Publicar Automático

## O que essa skill entrega no final

As variáveis abaixo, prontas pra colar no `.env` — são as mesmas que a skill global `publicar-redes` (método Graph API) e a implementação multi-unidade do `/agendar-publicacao` já esperam encontrar:

```
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
FACEBOOK_PAGE_ACCESS_TOKEN=
FACEBOOK_PAGE_ID=
```

Essa skill **não publica nada** — só chega até aqui. Depois de configurado, usar `/publicar-redes` (se instalada globalmente) ou `/agendar-publicacao` pra publicar de verdade.

## Antes de começar — pré-requisitos

Perguntar e confirmar, um de cada vez:

1. **"O Instagram do negócio já é conta Business ou Creator (não pessoal)?"** Se não: orientar a converter em Configurações do Instagram > Conta > Mudar para conta profissional. Sem isso, nada do resto funciona.
2. **"Esse Instagram já está conectado a uma Página do Facebook?"** Checar em Configurações do Instagram > Contas conectadas. Se não estiver, conectar antes de seguir — a API só publica em Instagram vinculado a uma Página.
3. **"Você tem papel de Admin nessa Página do Facebook?"** Precisa ser admin (não editor/anunciante) pra completar os passos seguintes.

Só avançar depois que os 3 estiverem OK.

## Passo 1 — Business Portfolio (antigo "Business Manager")

Perguntar: **"Já tem um Business Portfolio no Meta com essa Página dentro?"**

- **Se sim:** seguir pro Passo 2.
- **Se não:** guiar:
  > "Acessa business.facebook.com, clica em 'Criar conta', preenche nome do negócio e seus dados. Depois, em Configurações do negócio > Contas > Páginas, adiciona a Página do Instagram/Facebook que vamos usar."

## Passo 2 — Criar o App

> "Agora vamos criar o App em developers.facebook.com:
> 1. Entra com a mesma conta pessoal que é admin da Página
> 2. Clica em 'Meus Apps' > 'Criar App'
> 3. Escolhe o tipo que mais se aproxima de 'Empresa' (o Meta muda esse nome de vez em quando — qualquer opção voltada pra uso comercial/empresarial serve)
> 4. Vincula o app ao Business Portfolio do Passo 1 quando ele pedir
> 5. Dá um nome pro app (ex.: '[Nome da Empresa] — Publicação Social')"

## Passo 3 — Adicionar os produtos certos

No painel do app recém-criado, adicionar:
- **Instagram Graph API** (ou "Instagram" — nome varia)
- **Facebook Login for Business** (necessário pra gerar token com os escopos certos)

Sem isso, os escopos do Passo 5 não aparecem pra conceder.

## Passo 4 — Entender Standard x Advanced Access ANTES de seguir

Isso evita o erro mais comum: achar que precisa de aprovação do Meta (App Review) quando não precisa, ou o contrário.

Perguntar:

> "Esse app vai publicar só na página/Instagram de **um negócio só, onde você (ou quem está configurando) já é admin**? Ou ele vai ser usado pra publicar em páginas de **terceiros que não te deram acesso de admin** — tipo uma agência atendendo vários clientes sem acesso direto?"

- **Um negócio só, você é admin:** **Standard Access resolve.** Basta adicionar a própria conta como admin/desenvolvedor do app (Configurações do App > Funções). Não precisa de App Review. Seguir pro Passo 5.
- **Terceiros sem acesso admin, ou múltiplos clientes:** vai precisar de **App Review pedindo Advanced Access** nas permissões do Passo 5. Isso exige gravar um vídeo demonstrando o uso e enviar pro Meta revisar — não é imediato (dias a semanas). Avisar o usuário disso antes de continuar, e sugerir rodar em Standard Access com um cliente de teste enquanto o review não sai.

## Passo 5 — Gerar o token de teste

> "Vamos gerar um token pra testar:
> 1. Acessa developers.facebook.com/tools/explorer/
> 2. Seleciona o app que criamos, no menu 'Meta App'
> 3. Em 'Permissions', marca: `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`
> 4. Clica em 'Generate Access Token' e autoriza
> 5. Cola aqui o token gerado"

Esse token dura só ~1 hora — é só pra teste, o Passo 6 troca por um de verdade.

## Passo 6 — Converter pra token de longa duração (60 dias)

Pedir **App ID** e **App Secret** (Configurações do App > Básico):

```bash
curl -s "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=TOKEN_DO_PASSO_5"
```

Guardar o `access_token` da resposta — é o token de longa duração.

## Passo 7 — Pegar os IDs

Com o token de longa duração:

```bash
curl -s "https://graph.facebook.com/v21.0/me/accounts?access_token=TOKEN_LONGO"
```

Isso retorna as Páginas administradas — cada uma com `id` (Page ID) e `access_token` próprio (token de Página, normalmente não expira — é esse que vai pra `FACEBOOK_PAGE_ACCESS_TOKEN`).

Com o Page ID, buscar a conta de Instagram vinculada:

```bash
curl -s "https://graph.facebook.com/v21.0/PAGE_ID?fields=instagram_business_account&access_token=TOKEN_DA_PAGINA"
```

O `id` que volta em `instagram_business_account` é o `INSTAGRAM_USER_ID`.

## Passo 8 — Testar antes de salvar

```bash
curl -s "https://graph.facebook.com/v21.0/INSTAGRAM_USER_ID?fields=username&access_token=TOKEN_DA_PAGINA"
```

Se voltar o `username` certo do Instagram, tá funcionando. Se der erro, ver "Erros comuns" abaixo antes de insistir.

## Passo 9 — Salvar e confirmar

Adicionar no `.env`:

```
INSTAGRAM_ACCESS_TOKEN=<token da página, do Passo 7>
INSTAGRAM_USER_ID=<id do Passo 7>
FACEBOOK_PAGE_ACCESS_TOKEN=<token da página, do Passo 7>
FACEBOOK_PAGE_ID=<page id do Passo 7>
```

> "Configurado! A partir de agora, `/publicar-redes` (ou `/agendar-publicacao`, se for o caso de franquia) já vão encontrar essas credenciais prontas. Um lembrete: o token de Página costuma não expirar, mas se algum dia parar de funcionar, roda essa skill de novo que eu te guio pra renovar."

## Erros comuns

| Erro | Causa provável |
|---|---|
| "Instagram account not eligible for publishing" | Conta ainda é pessoal, não Business/Creator, ou não está conectada à Página |
| "Invalid OAuth access token" | Token expirou (o de teste do Passo 5 dura só 1h) ou é de outro app |
| Permissão não aparece pra marcar no Explorer | Falta adicionar o produto certo no Passo 3 |
| `instagram_business_account` vem vazio na resposta do Passo 7 | Instagram não está de fato conectado a essa Página — revisar pré-requisito 2 |
| Publicação falha mesmo com token válido | Provavelmente é o limite do Standard Access — revisar Passo 4 |

## Variação: franquia/rede com muitas páginas (System User)

Se o cliente administra centralmente 10+ páginas (franqueadora, rede), o modelo muda um pouco: em vez do token pessoal dos Passos 5-7, criar um **System User** dentro do Business Portfolio (Configurações do negócio > Usuários do sistema), com papel de Admin atribuído a todas as páginas/contas de Instagram das unidades — um token só cobre todas. Os Passos 1 a 4 (Business Portfolio, criar app, produtos, Standard x Advanced Access) continuam os mesmos. Ver `templates/skills/agendar-publicacao/referencia-multi-unidade-graph-api.md` pro resto do fluxo específico de franquia (cadastro de unidades, publicação em lote).

## Regras

- Uma pergunta/passo de cada vez — não despejar o guia inteiro de uma vez, a pessoa vai executar no navegador enquanto conversa
- Nunca pular o Passo 4 (Standard x Advanced Access) — é onde a maioria trava depois, achando que "não funciona" quando na verdade falta App Review
- Nunca imprimir token/secret no meio de uma explicação genérica — só pedir e usar, sem repetir de volta desnecessariamente
- Se o usuário travar num passo, pedir print da tela em vez de adivinhar — a interface do Meta muda com frequência
