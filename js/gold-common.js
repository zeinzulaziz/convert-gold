/* Convert Gold — logika bersama index.html & chart.html.
   Tanpa dependency, harus tetap vanilla (static site). IIFE agar tidak menabrak scope global. */
'use strict';
(() => {

const OZ_TO_GRAM = 31.1035;
const BRAND_MAX_AGE_MS = 3 * 24 * 3600 * 1000;
const FETCH_TIMEOUT_MS = 9000;

/* fetch dengan timeout; lempar error bila gagal/timeout */
async function fetchJSON(url, opts) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, Object.assign({}, opts, { signal: ctrl.signal }));
    if (!res.ok) throw new Error('HTTP ' + res.status + ' — ' + url);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchText(url, opts) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, Object.assign({}, opts, { signal: ctrl.signal }));
    if (!res.ok) throw new Error('HTTP ' + res.status + ' — ' + url);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function formatRp(n) {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

function formatUsd(n, digits) {
  const d = digits === undefined ? 2 : digits;
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}

/* Parser hargaemas.com: baris <tr class="col-antam">. Dipakai di dua halaman + script Node. */
function parseHargaEmas(html) {
  const prices = [];
  const regex = /<tr class="col-antam"><td>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td><\/tr>/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const gram = m[1].replace(/<[^>]*>/g, '').trim();
    const antam = parseInt(m[2].replace(/<[^>]*>/g, '').replace(/[^0-9]/g, ''), 10) || 0;
    const pegadaian = parseInt(m[3].replace(/<[^>]*>/g, '').replace(/[^0-9]/g, ''), 10) || 0;
    if (gram && antam > 0) prices.push({ gram, antam, pegadaian });
  }
  return prices;
}

/* Sumber utama: ./data/gold-indonesia.json (GitHub Action).
   Return { prices:[...], source, ts, fresh, oneGram } atau lempar error bila JSON gagal dibaca. */
async function fetchBrandFromJson() {
  const data = await fetchJSON('./data/gold-indonesia.json', { cache: 'no-store' });
  const prices = Array.isArray(data.prices) ? data.prices : [];
  const fetched = data.fetchedAt ? Date.parse(data.fetchedAt) : 0;
  const fresh = !!fetched && (Date.now() - fetched) < BRAND_MAX_AGE_MS;
  const oneGram = prices.find(p => p.gram === '1' || p.gram === '1.00') || null;
  if (!oneGram || !oneGram.antam) throw new Error('Data Antam 1g tidak ada di JSON');
  return {
    prices,
    oneGram,
    source: data.source || 'hargaemas.com',
    ts: data.updatedAt || (data.fetchedAt ? new Date(data.fetchedAt).toLocaleString('id-ID') : null),
    fresh
  };
}

/* Fallback: scrape hargaemas.com via proxy CORS. fresh selalu true (data diambil langsung). */
async function fetchBrandFromProxy() {
  const proxied = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://hargaemas.com/');
  const html = await fetchText(proxied, { cache: 'no-store' });
  const prices = parseHargaEmas(html);
  const oneGram = prices.find(p => p.gram === '1' || p.gram === '1.00') || null;
  if (!oneGram || !oneGram.antam) throw new Error('Parse hargaemas.com kosong');
  return { prices, oneGram, source: 'hargaemas.com (proxy langsung)', ts: null, fresh: true };
}

/* Ambil data merek: JSON dulu, proxy hanya bila JSON basi/rusak. */
async function loadBrandPrices() {
  try {
    const json = await fetchBrandFromJson();
    if (json.fresh) return json;
    try {
      const live = await fetchBrandFromProxy();
      return { ...live, staleNotice: 'Data JSON basi (' + json.ts + '), memakai scrape langsung' };
    } catch (e) {
      return { ...json, staleNotice: 'Gagal memperbarui, menampilkan data terakhir' };
    }
  } catch (e) {
    return await fetchBrandFromProxy();
  }
}

async function fetchUsdIdrRate() {
  const data = await fetchJSON('https://api.frankfurter.dev/v1/latest?base=USD&symbols=IDR');
  if (!data.rates || !data.rates.IDR) throw new Error('Respons Frankfurter tidak valid');
  return data.rates.IDR;
}

window.GoldCommon = {
  OZ_TO_GRAM,
  fetchJSON,
  fetchText,
  formatRp,
  formatUsd,
  parseHargaEmas,
  loadBrandPrices,
  fetchUsdIdrRate
};
})();
