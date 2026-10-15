// Scrape harga Antam/Pegadaian dari hargaemas.com, tulis ke data/gold-indonesia.json.
// Aman: kalau fetch/parse gagal atau hasilnya mencurigakan, file lama TIDAK ditimpa.
const https = require('https');
const fs = require('fs');
const path = require('path');

const SOURCE_URL = 'https://hargaemas.com/';
const OUT_FILE = path.join(__dirname, '..', 'data', 'gold-indonesia.json');
const UA = 'Mozilla/5.0 (compatible; convert-gold-bot/1.0; +https://github.com/zeinzulaziz/convert-gold)';
const TIMEOUT_MS = 15000;
const MAX_REDIRECTS = 5;
const MIN_ROWS = 5;

function fetchHtml(url, redirectsLeft = MAX_REDIRECTS) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirectsLeft <= 0) return reject(new Error('Terlalu banyak redirect'));
        return fetchHtml(new URL(res.headers.location, url).href, redirectsLeft - 1).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(TIMEOUT_MS, () => req.destroy(new Error('Timeout ' + TIMEOUT_MS + 'ms')));
  });
}

async function withRetry(fn, attempts = 3) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      console.error(`Percobaan ${i}/${attempts} gagal: ${e.message}`);
      if (i < attempts) await new Promise((r) => setTimeout(r, i * 2000));
    }
  }
  throw lastErr;
}

function parsePrices(html) {
  const prices = [];
  const re = /<tr class="col-antam"><td>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td><\/tr>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const gram = m[1].replace(/<[^>]*>/g, '').trim();
    const antam = parseInt(m[2].replace(/<[^>]*>/g, '').replace(/[^0-9]/g, ''), 10) || 0;
    const pegadaian = parseInt(m[3].replace(/<[^>]*>/g, '').replace(/[^0-9]/g, ''), 10) || 0;
    if (gram && antam > 0) prices.push({ gram, antam, pegadaian });
  }
  return prices;
}

function parseUpdatedAt(html) {
  // Ambil timestamp section "Emas Antam", BUKAN "Emas Spot".
  // Halaman punya dua elemen time-updated; yang pertama adalah Emas Spot
  // (update tiap menit), sedangkan harga Antam/Pegadaian update 1x sehari.
  const antam = html.match(/<span>\s*Emas Antam\s*<\/span>[\s\S]{0,200}?class="time-updated"[^>]*>([^<]+)</);
  if (antam) return antam[1].trim();
  // Fallback kalau markup berubah: pakai time-updated pertama (perilaku lama).
  const any = html.match(/class="time-updated"[^>]*>([^<]+)</);
  return any ? any[1].trim() : null;
}

function isValid(prices) {
  if (!Array.isArray(prices) || prices.length < MIN_ROWS) return false;
  const one = prices.find((p) => p.gram === '1');
  if (!one || one.antam <= 0) return false;
  // Sanity: harga Antam 1g harus wajar (1jt - 10jt), cegah nilai parsing ngaco.
  return one.antam >= 1_000_000 && one.antam <= 10_000_000;
}

function readPrevious() {
  try {
    return JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
  } catch (_) {
    return null;
  }
}

(async () => {
  try {
    const html = await withRetry(() => fetchHtml(SOURCE_URL));
    const prices = parsePrices(html);
    const updatedAt = parseUpdatedAt(html);

    if (!isValid(prices)) {
      throw new Error(`Hasil parse tidak valid (${prices.length} baris). Struktur situs mungkin berubah.`);
    }

    const prev = readPrevious();
    if (prev && JSON.stringify(prev.prices) === JSON.stringify(prices)) {
      console.log('Data sama dengan sebelumnya, tidak ada perubahan.');
    }

    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
    fs.writeFileSync(
      OUT_FILE,
      JSON.stringify({ source: 'hargaemas.com', updatedAt, prices, fetchedAt: new Date().toISOString() }, null, 2) + '\n'
    );
    console.log(`OK: ${prices.length} baris, updatedAt=${updatedAt}`);
  } catch (e) {
    console.error('GAGAL:', e.message);
    console.error('File lama dibiarkan (tidak ditimpa).');
    process.exit(1);
  }
})();
