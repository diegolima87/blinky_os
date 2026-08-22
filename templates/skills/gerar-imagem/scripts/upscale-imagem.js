// Upscale de imagem via API da Magnific (endpoint image-upscaler). Endpoint
// é assíncrono: cria a tarefa, devolve task_id, precisa fazer polling até
// status COMPLETED.
//
// Uso: precisa de MAGNIFIC_API_KEY no ambiente (.env).
//   node --env-file=.env scripts/upscale-imagem.js caminho/foto.jpg [caminho2.jpg ...]
//   node --env-file=.env scripts/upscale-imagem.js foto.jpg --scale 4x --creativity 0 --resemblance 2 --engine automatic
//   node --env-file=.env scripts/upscale-imagem.js icone.png --formato png
//
// Sobrescreve o arquivo de entrada por padrão (recomprime pra JPEG q=85).
// Use --formato png pra ilustração com fundo transparente (JPEG não tem
// canal alpha - recomprimir assim pra JPEG apagaria a transparência).
//
// Parâmetros padrão são conservadores de propósito (creativity baixo,
// resemblance alto) — bom ponto de partida quando detalhe inventado é risco,
// não bônus. Ajustar via --creativity/--resemblance conforme o caso.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ENGINES_VALIDOS = ["automatic", "magnific_illusio", "magnific_sharpy", "magnific_sparkle"];
const SCALES_VALIDOS = ["2x", "4x", "8x", "16x"];
const POLL_INTERVALO_MS = 3000;
const POLL_TIMEOUT_MS = 120000;
const QUALIDADE_JPEG = 85;

function parseArgs(argv) {
  const arquivos = [];
  const opcoes = { scale: "2x", creativity: -3, resemblance: 4, engine: "magnific_sharpy", formato: "jpg" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--scale") opcoes.scale = argv[++i];
    else if (a === "--creativity") opcoes.creativity = Number(argv[++i]);
    else if (a === "--resemblance") opcoes.resemblance = Number(argv[++i]);
    else if (a === "--engine") opcoes.engine = argv[++i];
    else if (a === "--formato") opcoes.formato = argv[++i];
    else arquivos.push(a);
  }
  if (!["jpg", "png"].includes(opcoes.formato)) throw new Error(`formato invalido: ${opcoes.formato}. Use jpg ou png`);
  if (!arquivos.length) {
    console.error("Uso: node scripts/upscale-imagem.js foto1.jpg [foto2.jpg ...] [--scale 2x] [--creativity -3] [--resemblance 4] [--engine magnific_sharpy]");
    process.exit(1);
  }
  if (!SCALES_VALIDOS.includes(opcoes.scale)) throw new Error(`scale invalido: ${opcoes.scale}. Use um de: ${SCALES_VALIDOS.join(", ")}`);
  if (!ENGINES_VALIDOS.includes(opcoes.engine)) throw new Error(`engine invalido: ${opcoes.engine}. Use um de: ${ENGINES_VALIDOS.join(", ")}`);
  return { arquivos, opcoes };
}

async function criarTarefa(imagemBase64, opcoes) {
  const resp = await fetch("https://api.magnific.com/v1/ai/image-upscaler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-magnific-api-key": process.env.MAGNIFIC_API_KEY,
    },
    body: JSON.stringify({
      image: imagemBase64,
      scale_factor: opcoes.scale,
      creativity: opcoes.creativity,
      resemblance: opcoes.resemblance,
      engine: opcoes.engine,
    }),
  });
  const json = await resp.json();
  if (!resp.ok) throw new Error(json.message || json.error || `erro ${resp.status}`);
  return json.data.task_id;
}

async function aguardarTarefa(taskId) {
  const inicio = Date.now();
  while (Date.now() - inicio < POLL_TIMEOUT_MS) {
    const resp = await fetch(`https://api.magnific.com/v1/ai/image-upscaler/${taskId}`, {
      headers: { "x-magnific-api-key": process.env.MAGNIFIC_API_KEY },
    });
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message || json.error || `erro ${resp.status}`);
    const { status, generated } = json.data;
    if (status === "COMPLETED") return generated;
    if (status === "FAILED") throw new Error("tarefa de upscale falhou na Magnific");
    await new Promise((r) => setTimeout(r, POLL_INTERVALO_MS));
  }
  throw new Error(`timeout esperando upscale (${POLL_TIMEOUT_MS / 1000}s)`);
}

async function baixarResultado(item) {
  const valor = typeof item === "string" ? item : item.base64 || item.url;
  if (/^https?:\/\//.test(valor)) {
    const resp = await fetch(valor);
    if (!resp.ok) throw new Error(`falha ao baixar resultado: ${resp.status}`);
    return Buffer.from(await resp.arrayBuffer());
  }
  return Buffer.from(valor, "base64");
}

async function upscaleUm(caminho, opcoes) {
  const bruto = fs.readFileSync(caminho);
  const taskId = await criarTarefa(bruto.toString("base64"), opcoes);
  const generated = await aguardarTarefa(taskId);
  if (!generated || !generated.length) throw new Error("resposta sem imagem gerada");
  const resultado = await baixarResultado(generated[0]);
  const pipeline = sharp(resultado);
  await (opcoes.formato === "png" ? pipeline.png() : pipeline.jpeg({ quality: QUALIDADE_JPEG })).toFile(caminho);
  const meta = await sharp(caminho).metadata();
  return meta;
}

async function main() {
  if (!process.env.MAGNIFIC_API_KEY) throw new Error("MAGNIFIC_API_KEY nao definida no ambiente (.env)");
  const { arquivos, opcoes } = parseArgs(process.argv.slice(2));

  for (const caminho of arquivos) {
    if (!fs.existsSync(caminho)) {
      console.log(`${caminho}: arquivo nao encontrado, pulando`);
      continue;
    }
    process.stdout.write(`Upscale ${caminho}... `);
    try {
      const meta = await upscaleUm(caminho, opcoes);
      const tamanhoKb = Math.round(fs.statSync(caminho).size / 1024);
      console.log(`ok -> ${meta.width}x${meta.height} (${tamanhoKb} KB)`);
    } catch (err) {
      console.log(`FALHOU: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error("Erro geral:", err.message);
  process.exit(1);
});
