// server.js — Backend Node.js para o Estúdio de Tatuagem
// Servidor de arquivos estáticos com suporte a streaming de vídeo (HTTP 206 Range) + Endpoint Notion MCP

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// ── Carregamento de arquivo .env local (se existir) ─────────────
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    envLines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valParts] = trimmed.split('=');
        const val = valParts.join('=').trim().replace(/^["']|["']$/g, '');
        if (key && val && !process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    });
  }
} catch (e) {
  // Ignora se não existir .env
}

// ── Configurações ──────────────────────────────────────────────
const PORT = process.env.PORT || 3001;

// ID da página/banco do Notion (configurável via .env ou variável de ambiente)
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID || '3c172a99-b8ea-813b-9768-db82a5d9ca4d';

// Token de integração do Notion
const NOTION_TOKEN = process.env.NOTION_TOKEN;

// ── Mapa de Tipos MIME ─────────────────────────────────────────
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css':  'text/css; charset=UTF-8',
  '.js':   'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.mp4':  'video/mp4',
  '.txt':  'text/plain; charset=UTF-8',
  '.ico':  'image/x-icon',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
};

// ── Função para criar página no Notion ──────────────────────────
function createNotionPage(nome, email, celular, resumo, callback) {
  if (!NOTION_TOKEN) {
    // Modo simulação para desenvolvimento local caso o token não esteja injetado no processo
    console.log(`[SIMULAÇÃO NOTION] Nova solicitação recebida:
      - Nome: ${nome}
      - E-mail: ${email}
      - Celular: ${celular}
      - Resumo: ${resumo}`);
    return callback(null, { id: 'simulated-' + Date.now() }, 200);
  }

  const body = JSON.stringify({
    parent: { page_id: NOTION_PAGE_ID },
    properties: {
      title: [
        {
          type: 'text',
          text: { content: `Solicitação — ${nome}` }
        }
      ]
    },
    children: [
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: `Nome: ${nome}` } }]
        }
      },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: `E-mail: ${email}` } }]
        }
      },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: `Celular: ${celular}` } }]
        }
      },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: `Resumo: "${resumo}"` } }]
        }
      }
    ]
  });

  const options = {
    hostname: 'api.notion.com',
    path: '/v1/pages',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
      'Content-Length': Buffer.byteLength(body)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        callback(null, parsed, res.statusCode);
      } catch (e) {
        callback(new Error('Resposta inválida do Notion'), null, res.statusCode);
      }
    });
  });

  req.on('error', (e) => callback(e, null, 0));
  req.write(body);
  req.end();
}

// ── Servidor HTTP ──────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Range');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. Rota de Agendamento (POST /agendar)
  if (req.method === 'POST' && req.url === '/agendar') {
    let rawBody = '';
    req.on('data', chunk => rawBody += chunk.toString());
    req.on('end', () => {
      try {
        const { nome, email, celular, resumo } = JSON.parse(rawBody);

        // Validação estrita dos 4 campos
        if (!nome || !email || !celular || !resumo) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Todos os 4 campos são obrigatórios.' }));
          return;
        }

        createNotionPage(nome, email, celular, resumo, (err, data, statusCode) => {
          if (err || (statusCode && statusCode >= 400)) {
            const msg = data?.message || err?.message || 'Erro ao comunicar com o Notion.';
            console.error('[NOTION API ERROR]', statusCode, msg);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: msg }));
            return;
          }

          console.log(`[OK] Agendamento registrado com sucesso — ${nome} <${email}>`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, pageId: data?.id || 'ok' }));
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Formato JSON inválido.' }));
      }
    });
    return;
  }

  // 2. Servidor de Arquivos Estáticos com Suporte a Range (GET & HEAD)
  if (req.method === 'GET' || req.method === 'HEAD') {
    let decodedUrl = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(__dirname, decodedUrl === '/' ? 'index.html' : decodedUrl);

    // Prevenção de Path Traversal
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Acesso proibido');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 — Arquivo não encontrado');
        return;
      }

      const totalSize = stats.size;
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const range = req.headers.range;

      // Suporte a HTTP 206 Partial Content para Streaming de Vídeo / Áudio
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

        if (isNaN(start) || isNaN(end) || start > end || start >= totalSize) {
          res.writeHead(416, {
            'Content-Range': `bytes */${totalSize}`
          });
          res.end();
          return;
        }

        const chunkSize = (end - start) + 1;
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${totalSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': contentType
        });

        if (req.method === 'HEAD') {
          res.end();
        } else {
          const stream = fs.createReadStream(filePath, { start, end });
          stream.pipe(res);
        }
      } else {
        // Resposta completa 200 OK
        res.writeHead(200, {
          'Content-Length': totalSize,
          'Accept-Ranges': 'bytes',
          'Content-Type': contentType
        });

        if (req.method === 'HEAD') {
          res.end();
        } else {
          const stream = fs.createReadStream(filePath);
          stream.pipe(res);
        }
      }
    });
    return;
  }

  // Método não permitido
  res.writeHead(405, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end('Método não permitido');
});

server.listen(PORT, () => {
  console.log(`\n🟢 Servidor Bru Inktattoo rodando em http://localhost:${PORT}`);
  console.log(`   Frontend: http://localhost:${PORT}`);
  console.log(`   Endpoint: POST http://localhost:${PORT}/agendar`);
  console.log(`   Notion Page ID: ${NOTION_PAGE_ID}`);
  if (!NOTION_TOKEN) {
    console.log('   Modo: Simulação Local (defina NOTION_TOKEN em .env para conexão direta com a API do Notion)\n');
  } else {
    console.log('   Notion: Token configurado ✓\n');
  }
});
