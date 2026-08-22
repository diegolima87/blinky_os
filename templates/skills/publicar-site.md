<!--
Template editável. Não faz parte do base-kit (as 11 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
a empresa cliente precisa compartilhar HTML (proposta, site, relatório) por
link com regularidade. Adaptar ao caso descrito antes de salvar em
.claude/skills/publicar-site/SKILL.md — nunca sem confirmação explícita.

A skill `proposta` do base-kit já pergunta, ao gerar uma proposta, se existe
skill de publicação configurada pra oferecer link compartilhável — instalar
este template já ativa esse gancho, sem precisar editar `proposta`.
-->

---
name: publicar-site
description: >
  Publica um arquivo HTML no ar via Cloudflare Pages e retorna um link
  compartilhável com HTTPS. Use quando o usuário disser "publica", "coloca
  no ar", "quero um link", "deploy", "publica esse HTML", ou depois de gerar
  uma proposta/site/relatório que precisa ser compartilhado por link.
---

# /publicar-site — Deploy no Cloudflare Pages

## O que faz

Envia um arquivo HTML (proposta, site, relatório — qualquer coisa gerada por outra skill) pro Cloudflare Pages e retorna uma URL pública com HTTPS. O link funciona em qualquer dispositivo e pode ser compartilhado direto com o cliente.

## Como usar

Chame `/publicar-site` seguido do caminho do arquivo:
```
/publicar-site propostas/proposta-cliente-x-2026-08-22.html
/publicar-site relatorios/relatorio-agosto.html
```

Ou chame sem argumento — pergunta qual arquivo publicar.

---

## Pré-requisitos

1. **Conta no Cloudflare** (gratuita): cloudflare.com
2. **API Token do Cloudflare** com permissão de Cloudflare Pages
3. **Project ID** no Cloudflare Pages

Configurar no `.env` na raiz do projeto:
```
CLOUDFLARE_API_TOKEN=seu_token_aqui
CLOUDFLARE_ACCOUNT_ID=seu_account_id_aqui
CLOUDFLARE_PROJECT_NAME=nome-do-projeto
```

Se o `.env` não tiver essas variáveis, guiar a configuração passo a passo antes de tentar publicar.

---

## Workflow

1. Verificar se o arquivo existe e é um HTML válido.
2. Verificar se `.env` tem as variáveis necessárias — se não tiver, guiar configuração.
3. Fazer upload via Cloudflare Pages API (ver `templates/ferramentas/catalogo.md` pra detalhes das duas formas de usar — `wrangler` ou upload direto por arquivo).
4. Retornar a URL pública.

**Output:**
> "Publicado. Link: https://[projeto].pages.dev/[arquivo]"

---

## Dica

Pra ter um domínio próprio, conectar o domínio no painel do Cloudflare Pages depois de publicar — a skill continua funcionando igual.

## Regras

- Nunca commitar `.env` no git (já protegido pelo `.gitignore` do kit).
- Se der erro de autenticação, mostrar o erro real do Cloudflare em vez de só dizer "falhou".
