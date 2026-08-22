---
name: email-profissional
description: >
  Rascunha um email profissional a partir de um contexto livre.
  Calibra o tom ao destinatário e ao objetivo do email.
  Use quando o usuário disser "escreve um email pra", "preciso mandar um email
  sobre", "como eu respondo isso", "faz um email pra [cliente/pessoa]".
---

# /email-profissional — Rascunho de Email

## Dependências

- **Contexto da empresa:** `_memoria/empresa.md`
- **Tom de voz:** `_memoria/preferencias.md`

---

## Workflow

### Passo 1 — Coletar o contexto

Se o usuário não forneceu as informações necessárias, perguntar:
1. "Pra quem é o email? (nome, cargo, relação)"
2. "Qual é o objetivo? (cobrar, propor, responder, agradecer, seguir up...)"
3. "Tem algo específico que precisa constar ou que precisa evitar dizer?"

Se o usuário deu o contexto de forma livre (mesmo que bagunçado), extrair o que der e prosseguir.

### Passo 2 — Escrever o email

**Considerar:**
- Tom proporcional à relação (contato novo = mais cuidado, relação antiga = mais direto)
- Objetivo claro na abertura (não enterrar o pedido no final)
- Uma ação pedida por vez
- Encerramento sem redundância — só usar "qualquer dúvida, fico à disposição" se fizer sentido

**Estrutura:**
```
Assunto: [linha de assunto direta, sem clickbait]

[Nome],

[Parágrafo 1 — contexto ou referência ao último contato]

[Parágrafo 2 — o ponto principal ou o pedido]

[Parágrafo 3 — próximo passo, se houver]

[Assinatura]
[Nome de quem envia, de _memoria/empresa.md]
```

### Passo 3 — Apresentar opções de tom (quando fizer sentido)

Se o assunto for delicado (cobrança, feedback negativo, recusa), oferecer 2 versões:
- Versão A: mais direta
- Versão B: mais suave

Deixar o usuário escolher.

---

## Regras

- Tom segue `_memoria/preferencias.md`
- Nunca usar linguagem corporativa genérica sem necessidade
- Assunto do email deve ser específico e descritivo, não vago ("Seguimento", "Proposta")
- Se for resposta a algo, citar o contexto na primeira linha
- Se for cobrança, ser direto mas sem agressividade
