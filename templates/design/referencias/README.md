# Referências de sistema de design

Seis arquivos `DESIGN.md` — cor, tipografia, espaçamento e componentes documentados em detalhe — adaptados de [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT). São "interpretações inspiradas" em marcas conhecidas, não os ativos proprietários reais delas.

## O que isso é (e o que não é)

**É** uma referência de **sistema** — como uma marca de ponta estrutura escala tipográfica, espaçamento, hierarquia e restrição visual. Serve pra elevar o piso de qualidade de qualquer entregável do Blinky OS (proposta, carrossel, dashboard, site), pra qualquer cliente, não só quando falta identidade própria.

**Não é** referência de **marca**. A cor, a fonte e o logo de um entregável vêm sempre de `marca/design-guide.md` daquele cliente específico. Usar um arquivo daqui pra estrutura/hierarquia e as cores/fonte do cliente por cima — nunca o contrário. Ninguém quer receber uma proposta que "parece Stripe" em vez de parecer a própria empresa.

## Quando usar

- Uma skill visual (`/carrossel`, `/proposta`, `/dashboard-cliente`, `/publicar-site`) está montando o CSS/HTML e quer um ponto de partida com qualidade profissional em vez de reinventar espaçamento e escala do zero.
- O cliente ainda não definiu identidade visual (`/instalar`, Pergunta 7) — em vez de um "visual neutro" genérico, usar a estrutura de um destes como baseline até a marca real ser definida.
- O cliente descreveu um estilo geral (clean/minimalista, bold/impactante, editorial/elegante...) e vale conferir como uma marca de ponta resolveu esse mesmo estilo.

## Mapeamento por estilo

| Estilo geral | Referência | Bom pra |
|---|---|---|
| Corporativo / confiável | `stripe.md` | Proposta B2B formal, relatório financeiro |
| Clean / minimalista (dado denso) | `linear.md` | Dashboard, relatório com muita métrica |
| Clean / minimalista (neutro/versátil) | `notion.md` | Baseline padrão quando ainda não tem marca definida |
| Editorial / elegante | `apple.md` | Proposta premium, apresentação institucional |
| Bold / impactante (quente) | `nike.md` | Carrossel, arte de rede social com energia |
| Bold / impactante (dark/tech) | `spotify.md` | Alternativa ao Nike, mais escura e tecnológica |

## Como usar dentro de uma skill

1. Ler o arquivo relevante pra entender a lógica do sistema (escala de tamanho, relação entre espaçamentos, quando usar peso de fonte pesado vs. leve, como a hierarquia é sinalizada).
2. Montar o CSS/HTML do entregável seguindo essa lógica estrutural.
3. Trocar toda cor, fonte e logo pelos valores reais de `marca/design-guide.md` do cliente.
4. Nunca citar a marca de origem no entregável final pro cliente — é referência interna de qualidade, não um selo "inspirado em X" pra mostrar a ninguém.

## Fonte e licença

Adaptado de [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md), licença MIT. Cada arquivo é descrito pela fonte original como "interpretação inspirada" — não reproduz ativo proprietário (fonte licenciada, imagem, logo) da marca real, só a lógica do sistema de design documentada em texto.
