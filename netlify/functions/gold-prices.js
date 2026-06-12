const https = require('https');

function fetchHTTPS(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHTTPS(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseTable(html) {
  const prices = [];
  // Match rows with optional <strong> tags inside <td>
  const regex = /<tr class="col-antam"><td>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td><\/tr>/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    // Strip all HTML tags, then extract numbers
    const gram = m[1].replace(/<[^>]*>/g, '').trim();
    const antamStr = m[2].replace(/<[^>]*>/g, '').replace(/[^0-9.]/g, '').trim();
    const pegStr = m[3].replace(/<[^>]*>/g, '').replace(/[^0-9.]/g, '').trim();
    if (antamStr && gram) {
      prices.push({
        gram,
        antam: parseInt(antamStr.replace(/\./g, '')) || 0,
        pegadaian: parseInt(pegStr.replace(/\./g, '')) || 0
      });
    }
  }
  return prices;
}

function parseBuyback(html) {
  const result = [];
  // Find section after "BUYBACK"
  const parts = html.split(/BUYBACK/i);
  if (parts.length < 2) return result;
  const section = parts[1].substring(0, 2000);
  const regex = /<tr[^>]*>\s*<td[^>]*>([^<]+)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<\/tr>/g;
  let m;
  while ((m = regex.exec(section)) !== null) {
    const gram = m[1].trim();
    const val = m[2].replace(/[^0-9.]/g, '').trim();
    if (val && gram.match(/[\d,]/)) {
      result.push({ gram, buyback: parseInt(val.replace(/\./g, '')) || 0 });
    }
  }
  return result;
}

function parseTimestamp(html) {
  const m = html.match(/class="time-updated"[^>]*>([^<]+)</);
  return m ? m[1].trim() : null;
}

exports.handler = async () => {
  try {
    const html = await fetchHTTPS('https://hargaemas.com/');
    const prices = parseTable(html);
    const buyback = parseBuyback(html);
    const updatedAt = parseTimestamp(html);

    // Merge buyback
    buyback.forEach(b => {
      const key = b.gram.replace(',', '.');
      const p = prices.find(x => x.gram.replace(',', '.') === key);
      if (p) p.buyback = b.buyback;
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ prices, updatedAt, source: 'hargaemas.com' })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: e.message })
    };
  }
};
