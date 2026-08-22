<!--
Template editável. Não faz parte do base-kit (as 11 skills sempre instaladas).
O /mapear oferece este template quando a entrevista de descoberta identifica que
a empresa cliente produz posts/carrosséis pra redes sociais com regularidade.
Adaptar ao caso descrito antes de salvar em .claude/skills/carrossel/SKILL.md —
nunca sem confirmação explícita.

Já tem Canva conectado e prefere não editar HTML? O template `criar-arte-redes`
é mais rápido pra post único (sem várias etapas de slide) do que montar este
fluxo. Os dois podem coexistir — usar o que fizer sentido pra cada pedido.
-->

---
name: carrossel
description: >
  Cria carrosséis pra Instagram/TikTok em HTML, renderizados em PNG pelo
  Playwright, com sistema de design CSS reutilizável parametrizado por
  marca/design-guide.md. Texto em 3 fases com checkpoint de aprovação humana
  entre cada uma. Use quando o usuário pedir um post, carrossel, criativo ou
  publicação pra redes sociais, ou chamar /carrossel.
---

# /carrossel — Criação de Carrossel

## Setup (primeira vez)

Antes de criar qualquer carrossel, checar 3 coisas. Se tudo estiver OK, pular direto pro workflow.

### 1. Design guide

Ler `marca/design-guide.md`. Se os campos estiverem vazios:

> "Pra criar o carrossel com a cara da empresa, preciso de algumas coisas:
> 1. Qual a cor principal da marca? (hex tipo #FF5C35, ou descreve: "azul escuro", "laranja quente")
> 2. Tem preferência de fonte? (se não, eu escolho uma boa pro estilo)
> 3. Estilo geral: clean/minimalista, bold/impactante, editorial/elegante, ou outro?
> 4. Tem logo? Se sim, joga o arquivo na pasta `marca/` e me diz o nome"

Com as respostas, preencher `marca/design-guide.md`. A partir da cor principal, gerar uma variação clara e uma escura pra usar nos slides. Se o usuário disser "não sei" ou "escolhe pra mim", usar um padrão limpo (fundo escuro, um tom de destaque, tipografia sans-serif bem contrastada).

### 2. Tom de voz

Ler `_memoria/preferencias.md`. Se estiver vazio, perguntar como a empresa prefere que o texto dos slides seja escrito, e o que incomoda em texto de IA.

### 3. Playwright

```bash
npx playwright screenshot --help 2>/dev/null && echo "OK" || npx playwright install chromium
```

---

## Dependências

- **Identidade visual:** `marca/design-guide.md`
- **Sistema de design CSS:** `shared.css` (desta skill — copiar como base, não reescrever)
- **Ícones:** `icones.md` (desta skill)
- **Contexto:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`
- **Playwright CLI:** `npx playwright screenshot`
- **Geração de imagem (se precisar de foto):** skill `/gerar-imagem`, se instalada — senão, ver a seção "Geração de imagens" abaixo

## Input

O usuário fornece: tema, ideia, texto livre, link ou arquivo de referência. Imagens (opcional) — se anexar fotos, usar nos slides; se não, criar design visual sem foto.

---

## Workflow em 3 Fases

### Fase 1 — Texto

1. Ler `_memoria/preferencias.md` pra calibrar tom, `_memoria/empresa.md` pra contexto e público.
2. Se o input for um link, buscar o conteúdo com WebFetch (fallback: Jina Reader, prefixando a URL com `https://r.jina.ai/`, pra artigos que o WebFetch não trouxer bem).
3. Se o usuário mencionar algo que você não conhece com certeza (produto, ferramenta, evento, termo técnico), pesquisar antes de escrever — nunca chutar ou assumir que o usuário errou.
4. Definir o ângulo do carrossel: educacional, oportunidade, contrário, provocativo ou inspiracional.
5. **Briefing rápido** (uma mensagem só):
   > "Antes de escrever, confirma: quantos slides (padrão 8-10)? Vai ter imagem? CTA do último slide? Tipo: dica prática, tendência, opinião forte, bastidores, ou outro?"

   Se o usuário responder tudo junto, não perguntar de novo — usar bom senso pro que faltou.

6. **Planejar a espinha dorsal e mostrar pro usuário:**
   > **Ângulo:** [a tese/opinião central]
   > **Tensão central:** [a fricção, contradição ou dado surpreendente]
   > **Mecanismo:** [por que isso acontece]
   > **Provas:** [2-3 evidências concretas]
   > **Virada:** [o que muda pra quem tá lendo]
   > **3 opções de capa:** A: [título]/[subtítulo] · B: ... · C: ...
   >
   > Qual capa prefere? A narrativa tá no caminho certo?

   **CHECKPOINT 1:** esperar o usuário escolher a capa e aprovar a direção antes de escrever os slides.

7. Escrever os slides seguindo um arco: capa → hook (tensão) → mecanismo (por quê) → provas/aprofundamento → virada (o que muda pra quem lê) → CTA.

   **Regras de construção do texto:**
   - Cada slide é um parágrafo curto (2-4 frases), não uma lista disfarçada.
   - Toda afirmação factual precisa de especificidade: dado + fonte + ano. Sem dado verificável, preferir opinião honesta a número inventado.
   - Cada slide termina preparando o terreno pro próximo — a passagem entre slides deve ser inevitável pela tensão, não por aviso ("continue no próximo").

   **Padrões proibidos** (cacoetes que denunciam texto de IA):
   - Estruturas binárias: "não é X, é Y"
   - "e isso muda tudo", "no fim das contas", "a pergunta que fica", "cada vez mais", "em um mundo onde", "é preciso", "basicamente"
   - Jargão corporativo: "ecossistema", "mindset", "sinergia", "potencializar", "disruptivo"
   - Aberturas genéricas ("hoje vamos falar sobre") e fechamentos fracos ("swipe pra ver mais", "não esqueça de seguir")
   - Travessão (—), a menos que `_memoria/preferencias.md` diga o contrário

   **Teste de qualidade antes de entregar:** soa como alguém falando, ou como texto gerado por IA? Se trocar o tema e o texto ainda funcionar, tá genérico demais.

8. Gerar legenda: gancho nos primeiros 125 caracteres, 2-3 parágrafos curtos, CTA no final, 5-10 hashtags relevantes.
9. Mostrar o texto completo de todos os slides + legenda no chat, salvar em `conteudo/carrosseis/[tema]/carousel-text.md`.

   **CHECKPOINT 2:** esperar aprovação ou ajustes antes de seguir pra Fase 2.

---

### Fase 2 — Visual (HTMLs + PNGs)

1. Ler `marca/design-guide.md` e `shared.css` (desta skill) pra identidade e regras de design.
2. Criar HTMLs em `conteudo/carrosseis/[tema]/instagram/`, aplicando as cores/fonte do design-guide nas variáveis CSS do `shared.css`.
3. Renderizar **slide 1 primeiro** e mostrar pro usuário:
   ```bash
   npx playwright screenshot --viewport-size=1080,1350 --full-page "file:///caminho/absoluto/slide-01.html" "slide-01.png"
   ```
   **CHECKPOINT:** só renderizar os demais depois do OK no slide 1.
4. Se o usuário pedir ajuste no visual, editar o HTML e re-renderizar só o slide alterado.

---

### Fase 3 — Versão TikTok (opcional)

Perguntar se quer também (1080x1920, formato vertical). Se sim: `height: 1920px`, deixar ~230px livres embaixo (a UI do TikTok sobrepõe essa área), renderizar com `--viewport-size=1080,1920`, salvar em `conteudo/carrosseis/[tema]/tiktok/`.

---

## Geração de imagens

Se o usuário quiser imagens: usar a skill `/gerar-imagem` se estiver instalada. Se não estiver, oferecer instalar (via `/mapear`) ou gerar direto com Pollinations (grátis, sem API key):

```bash
curl -L "https://image.pollinations.ai/prompt/<prompt-url-encoded>?width=1080&height=720&nologo=true" -o imagens/foto-01.jpg
```

Mostrar pro usuário aprovar antes de usar no slide. Dica de prompt: ser específico e adicionar "no text, clean background, professional".

---

## Output final

```
conteudo/carrosseis/[tema]/
  carousel-text.md          <- texto aprovado + legenda
  imagens/                  <- fotos do usuário ou geradas (se houver)
  instagram/
    slide-01.html -> slide-01.png
    ...
  tiktok/ (se solicitado)
    slide-01.html -> slide-01.png
    ...
```

## Armadilhas conhecidas (gerais — atualizar com o que a empresa for encontrando)

- Modelos de geração de imagem têm viés forte em cenas com duas pessoas de papéis diferentes (ex.: podem confundir quem é quem, vestir os dois iguais, ou adicionar gente demais). Cena com uma pessoa só, ou sem pessoas, é bem mais confiável — ver skill `/gerar-imagem` pra mais detalhes.
- Ferramentas de IA de design (ex.: Canva) costumam errar acentuação em português quando geram texto embutido na imagem — não confiar em texto gerado direto na peça, montar em HTML.
- Facebook exige **token de Page**, não de usuário — token de usuário comum causa erro de publicação no feed da página.
- O dry-run de publicação no Instagram cria containers de verdade na API, só não publica — containers órfãos expiram sozinhos em 24h, sem efeito no perfil.

## Regras

- Texto aprovado na Fase 1 não muda na Fase 2 (visual fiel ao texto).
- Sempre mostrar slide 1 antes de renderizar os demais.
- Sem travessão no texto por padrão, a menos que `_memoria/preferencias.md` diga o contrário.
- Se o setup já foi feito antes, não repetir as perguntas — ir direto pro workflow.
- Essa skill nunca publica direto — depois de pronta, sugerir `/agendar-publicacao` (se instalada) ou publicação manual.
