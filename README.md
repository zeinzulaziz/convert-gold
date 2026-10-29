# Convert Gold

A gold price calculator that speaks both currencies at once: **USD per troy ounce**
(how the world quotes gold) and **rupiah per gram** (how it's actually bought in
Indonesia).

**Live:** https://zeinzulaziz.github.io/convert-gold/

## The problem

Gold is priced in USD/oz on a screen in London and sold in Rp/gram at a counter in
Surabaya — with a spread, a buyback rate, and a moving exchange rate in between.
Doing that arithmetic in your head before every purchase is how people end up
with a number they can't explain a week later.

This tool does the conversion and keeps the inputs visible, so you can see which
rate produced the price you're about to pay.

## What it does

- Converts USD/oz → Rp/gram using a live USD/IDR rate
- Shows the current world gold price
- Shows Indonesian retail reference prices (Antam, UBS, Pegadaian), refreshed daily
- Entry / target / stop-loss fields, so a plan is written down *before* the buy
  rather than reconstructed after it
- A chart view (`chart.html`) for the price history that's been collected
- Dark theme, mobile-first, no framework, no build step

## Data

| Source | Provides | Refresh |
|---|---|---|
| [mintedmetal.com](https://mintedmetal.com/api/prices.json) | World gold price, USD/oz | live |
| [Frankfurter](https://frankfurter.dev) | USD → IDR | live |
| [hargaemas.com](https://hargaemas.com) | Indonesian retail prices (Antam/UBS/Pegadaian) | daily, via GitHub Actions |

`scripts/fetch-gold-indonesia.js` runs on a schedule and writes
`data/gold-indonesia.json`. `automation/cloudflare-worker/` is a small proxy that
gets around CORS when the data is fetched from the browser.

## Honest limits

- Prices are **reference only**. Retailers apply their own spread and buyback
  rates; this number is not a quote.
- The retail scraper breaks when the source site changes its markup. It's a
  scraper, not an API — treat it as fragile.
- Not financial advice. It's a calculator.

## Run it

Static files. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

No install, no dependencies.
