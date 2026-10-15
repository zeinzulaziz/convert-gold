# Auto-update harga emas: setup lengkap

Tujuan: harga Antam/Pegadaian (dan data lain) ter-update otomatis tiap hari di
GitHub Pages https://zeinzulaziz.github.io/convert-gold/

Ada 3 lapis, semuanya **gratis**. Lapis 1 dan 2 saling menutup; lapis 3 jaring
pengaman terakhir.

---

## Lapis 1 (sudah aktif) — GitHub Actions scraper

- File: `.github/workflows/update-gold-indonesia.yml`
- Script scrape: `scripts/fetch-gold-indonesia.js`
- Hasil: `data/gold-indonesia.json`

Sifat:
- Scrape server-side (tanpa CORS, tanpa proxy pihak ketiga).
- Retry + timeout + validasi. Kalau hasil kosong/aneh, file lama **tidak ditimpa**.
- Trigger: **hanya `workflow_dispatch`** (dipanggil scheduler eksternal, lihat Lapis 2).
  Jadwal `schedule` GitHub sengaja dihapus karena sering telat/skip.

Kelemahan: tanpa pemicu eksternal, file tidak akan update sendiri (makanya ada Lapis 2,
dan Lapis 3 menutup kalau semua gagal).

---

## Lapis 2 — Scheduler eksternal (biar pasti jalan)

Pilih salah satu. Keduanya gratis.

### Opsi A: Cloudflare Worker (paling rapi, gratis)

Worker cron memanggil API `workflow_dispatch`.

1. Buat fine-grained PAT di https://github.com/settings/tokens?type=beta
   - Repository access: **Only select repositories** → `convert-gold`
   - Permissions → Repository permissions → **Actions: Read and write**
   - Simpan token (format `github_pat_...`), cuma tampil sekali.

2. Dari folder `automation/cloudflare-worker`:

   ```bash
   npx wrangler login
   npx wrangler secret put GH_TOKEN     # tempel PAT tadi
   npx wrangler deploy
   ```

3. Selesai. Worker akan memanggil update tiap hari sesuai `wrangler.toml`
   (`crons = ["0 1 * * *"]` = 08:00 WIB). Ubah jadwal di file itu bila perlu.

Cek hasil: tab **Cron Triggers** di dashboard Cloudflare, atau log `npx wrangler tail`.

### Opsi B: cron-job.org (tanpa ngoding)

1. Daftar gratis di https://cron-job.org
2. Buat cronjob:
   - **URL**: `https://api.github.com/repos/zeinzulaziz/convert-gold/actions/workflows/update-gold-indonesia.yml/dispatches`
   - **Schedule**: tiap hari, pilih jam 08:00 WIB.
   - **Request method**: `POST`
   - **Headers**:
     - `Authorization: Bearer <PAT>`
     - `Accept: application/vnd.github+json`
   - **Request body**: `{"ref":"main"}`
3. Simpan. Cron-job.org yang akan memanggil GitHub tiap hari.

> Catatan keamanan: PAT hanya butuh izin **Actions: write** untuk 1 repo ini.
> Jangan pakai token dengan scope berlebih.

---

## Lapis 3 (sudah aktif) — Fallback di halaman

`index.html` dan `chart.html`:
- Baca `data/gold-indonesia.json` sebagai sumber utama.
- Kalau file kosong **atau** lebih tua dari 3 hari, otomatis scrape ulang via
  proxy CORS (`api.allorigins.win` → `hargaemas.com`).
- Jadi halaman tidak pernah kosong meski lapis 1 dan 2 gagal.

---

## Cek cepat

- Update berjalan? Lihat https://github.com/zeinzulaziz/convert-gold/actions
- Data terakhir: buka `data/gold-indonesia.json` (`fetchedAt`).
- Trigger manual dari lokal: `GH_TOKEN=xxx ./automation/trigger-update.sh`

## Kalau sumber berubah

Kalau `hargaemas.com` mengubah struktur HTML, run akan **gagal** (merah) dan
data lama dibiarkan. Perbaiki parser di `scripts/fetch-gold-indonesia.js`
(fungsi `parsePrices`) lalu commit ulang.
