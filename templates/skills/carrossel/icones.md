# Ícones dos carrosséis

> Ícones do pacote `lucide` (mesmo padrão usado pela maioria das empresas que têm um app/site próprio). Colar o `<svg>` dentro de `<span class="icon icon-badge">` no slide — o traço herda a cor do container via `currentColor`.

## Como conseguir um ícone que não está aqui

1. Ver o nome do ícone que faz sentido em [lucide.dev/icons](https://lucide.dev/icons) (ex.: "calendar", "trending-up", "shield-check").
2. Copiar o SVG mostrado na página do ícone (o site já tem um botão "Copy SVG").
3. Colar aqui embaixo, seguindo o mesmo formato dos exemplos, com uma linha de "Uso" explicando quando usar esse ícone nesta empresa.

Manter esse arquivo curto — só adicionar ícone aqui quando for usar de verdade num carrossel, não copiar a biblioteca inteira de uma vez.

## Exemplos de partida (universais, qualquer negócio pode usar)

### check-circle

Uso: confirmação, benefício entregue, item concluído de uma lista

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
```

### trending-up

Uso: crescimento, resultado, métrica positiva

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
```

### clock

Uso: tempo, rotina, prazo

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
```

### users

Uso: equipe, clientes, comunidade

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
```

### shield-check

Uso: segurança, confiança, garantia

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
```

### arrow-right

Uso: CTA, próximo passo

```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
```
