// Gera imagem a partir de texto usando a API text-to-image da Magnific
// (rebrand da Freepik). Resposta vem síncrona em base64, sem polling nem
// webhook. Comprime pra JPEG com sharp antes de salvar (a API devolve PNG
// cru, pesado demais pra página/post).
//
// Uso: precisa de MAGNIFIC_API_KEY no ambiente (.env).
//   node --env-file=.env scripts/gerar-imagem.js "prompt aqui" nome-arquivo
//   node --env-file=.env scripts/gerar-imagem.js "prompt aqui" nome-arquivo --out dados/criativos --tamanho widescreen_16_9 --n 2 --negativo "texto, marca dagua"

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const TAMANHOS_VALIDOS = [
  "square_1_1",
  "classic_4_3",
  "traditional_3_4",
  "widescreen_16_9",
  "social_story_9_16",
  "smartphone_horizontal_20_9",
  "smartphone_vertical_9_20",
  "standard_3_2",
  "portrait_2_3",
  "horizontal_2_1",
  "vertical_1_2",
  "social_5_4",
  "social_4_5",
];

function parseArgs(argv) {
  const [prompt, nomeArquivo, ...resto] = argv;
  if (!prompt || !nomeArquivo) {
    console.error(
      'Uso: node scripts/gerar-imagem.js "prompt aqui" nome-arquivo [--out pasta] [--tamanho square_1_1] [--n 1] [--negativo "..."]'
    );
    process.exit(1);
  }

  const opcoes = { out: "dados/criativos", tamanho: "square_1_1", n: 1, negativo: undefined, estilo: undefined, formato: "jpg" };
  for (let i = 0; i < resto.length; i += 2) {
    const chave = resto[i]?.replace(/^--/, "");
    const valor = resto[i + 1];
    if (chave === "out") opcoes.out = valor;
    else if (chave === "tamanho") opcoes.tamanho = valor;
    else if (chave === "n") opcoes.n = Number(valor);
    else if (chave === "negativo") opcoes.negativo = valor;
    else if (chave === "estilo") opcoes.estilo = valor;
    else if (chave === "formato") opcoes.formato = valor;
  }

  if (!TAMANHOS_VALIDOS.includes(opcoes.tamanho)) {
    console.error(`Tamanho invalido: ${opcoes.tamanho}. Use um de: ${TAMANHOS_VALIDOS.join(", ")}`);
    process.exit(1);
  }

  return { prompt, nomeArquivo, ...opcoes };
}

async function gerar({ prompt, negativo, tamanho, n, estilo }) {
  const resp = await fetch("https://api.magnific.com/v1/ai/text-to-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-magnific-api-key": process.env.MAGNIFIC_API_KEY,
    },
    body: JSON.stringify({
      prompt,
      negative_prompt: negativo,
      num_images: n,
      image: { size: tamanho },
      styling: estilo ? { style: estilo } : undefined,
    }),
  });
  const json = await resp.json();
  if (!resp.ok) throw new Error(json.message || json.error || `erro ${resp.status}`);
  return json.data;
}

async function main() {
  if (!process.env.MAGNIFIC_API_KEY) throw new Error("MAGNIFIC_API_KEY nao definida no ambiente (.env)");
  const { prompt, nomeArquivo, out, tamanho, n, negativo, estilo, formato } = parseArgs(process.argv.slice(2));

  const outDir = path.join(process.cwd(), out);
  fs.mkdirSync(outDir, { recursive: true });

  const resumoPrompt = prompt.length > 60 ? `${prompt.slice(0, 60)}...` : prompt;
  process.stdout.write(`Gerando "${resumoPrompt}"... `);
  const imagens = await gerar({ prompt, negativo, tamanho, n, estilo });

  for (const [i, img] of imagens.entries()) {
    const sufixo = imagens.length > 1 ? `-${i + 1}` : "";
    const destino = path.join(outDir, `${nomeArquivo}${sufixo}.${formato}`);
    const bruto = Buffer.from(img.base64, "base64");
    const pipeline = sharp(bruto);
    await (formato === "png" ? pipeline.png({ quality: 90 }) : pipeline.jpeg({ quality: 88 })).toFile(destino);
    const tamanhoKb = Math.round(fs.statSync(destino).size / 1024);
    console.log(`\nok -> ${path.relative(process.cwd(), destino)} (${tamanhoKb} KB)`);
  }
}

main().catch((err) => {
  console.error("Erro:", err.message);
  process.exit(1);
});
