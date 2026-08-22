<!--
Referência pra adaptar quando o cliente tem 1 a poucas contas e já usa (ou vai
usar) Supabase. Ao instalar de verdade, o conteúdo deste arquivo (adaptado ao
caso do cliente) vira o `.claude/skills/agendar-publicacao/SKILL.md` final,
junto com a Edge Function e a tabela que ele referencia.
-->

# Implementação B — Fila em cloud (Supabase + cron)

Boa quando: uma a poucas contas, o cliente já usa (ou está disposto a usar) Supabase, e quer que a publicação funcione mesmo com o computador desligado.

## Dependências

- **Tabela:** `scheduled_posts` no Supabase do cliente
- **Bucket:** um bucket público (ex.: `social-media`) pra hospedar as imagens de forma que a Graph API consiga buscar
- **Credencial:** `SUPABASE_SERVICE_ROLE_KEY` no `.env`
- **Quem publica de fato:** uma Edge Function (ex.: `publish-scheduled-posts`), disparada por `pg_cron` a cada N minutos. Esta skill só enfileira — nunca publica direto.

## Schema conceitual de `scheduled_posts`

Campos essenciais: `scheduled_for` (ISO 8601 com fuso horário local, ex. `-03:00` pra Brasília), `platforms` (array — `instagram`, `facebook`, ou ambos), `caption`, `image_paths` (array de caminhos no bucket), `status` (`pending` / `published` / `failed` / `cancelado`).

## Workflow

### 1. Reunir os dados
Perguntar o que faltar: caminho da(s) imagem(ns) (normalmente já vem de `/carrossel` ou `/criar-arte-redes`), legenda, plataforma(s), data e hora (formato livre tipo "sexta às 9h" — converter pra data/hora exata e confirmar com o usuário).

### 2. Subir a(s) imagem(ns) pro bucket
Pra cada imagem, upload via REST usando a `SUPABASE_SERVICE_ROLE_KEY`:
```bash
KEY=$(grep SUPABASE_SERVICE_ROLE_KEY .env | cut -d'"' -f2)
PATH_NO_BUCKET="AAAA-MM-DD-slug/post-1.png"
curl -s -X POST "https://<projeto>.supabase.co/storage/v1/object/social-media/$PATH_NO_BUCKET" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: image/png" \
  --data-binary "@caminho/local/da/imagem.png"
```
Guardar o `PATH_NO_BUCKET` de cada imagem (vai em `image_paths`).

### 3. Confirmar antes de agendar
Mostrar resumo (plataforma(s), imagem(ns), legenda, data/hora por extenso) e esperar confirmação explícita.

### 4. Inserir na fila
Só depois da confirmação:
```bash
curl -s -X POST "https://<projeto>.supabase.co/rest/v1/scheduled_posts" \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  --data '{
    "scheduled_for": "AAAA-MM-DDTHH:MM:00-03:00",
    "platforms": ["instagram", "facebook"],
    "caption": "legenda aqui",
    "image_paths": ["AAAA-MM-DD-slug/post-1.png"]
  }'
```

### 5. Confirmar pro usuário
"Agendado! Publica automaticamente em [data/hora]. Se quiser cancelar ou mudar o horário antes disso, me avisa."

## Cancelar ou reagendar

Cancelar: atualizar a linha pra `status: "cancelado"` (nunca deletar, mantém histórico). Reagendar: atualizar `scheduled_for` na mesma linha, contanto que `status` ainda seja `pending`.

## Regras

- Nunca publicar direto — essa skill só enfileira. Quem publica é a Edge Function via cron.
- Sempre confirmar data/hora e legenda com o usuário antes de inserir na fila.
- Se as credenciais do Graph API (Meta) ainda não estiverem configuradas nos secrets do Supabase (`INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`, `FACEBOOK_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID`), avisar que o post vai ficar na fila mas não vai publicar até isso ser configurado.
- Instagram: 1 imagem = post normal, 2 a 10 = carrossel. Facebook: 1 imagem = foto única, 2+ = post com fotos anexadas (a Edge Function trata isso).
