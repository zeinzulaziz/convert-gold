# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Publik Indonesia umum yang membeli, memegang, atau memantau emas: pembeli/investor emas fisik (Antam, UBS, Pegadaian) dan pemantau harga spot internasional. Dibangun dan dipakai juga oleh pemiliknya (trader emas retail Indonesia), tapi audiens yang dituju publik luas, bukan tool privat.

## Product Purpose

Kalkulator dan pemantau harga emas untuk Indonesia: mengonversi harga spot emas (USD per troy oz) ke Rupiah per gram untuk berbagai berat, menampilkan harga jual resmi merek Indonesia (Antam, UBS, Pegadaian), dan membantu analisis pembelian/trading (target, stop loss, risk/reward). Sukses berarti pengguna bisa membuka halaman, langsung dapat angka yang benar dan terbaru, tanpa login atau onboarding.

## Operating Context

- Dipakai di browser, desktop dan mobile, sering dibuka sesaat untuk cek angka cepat.
- Harga spot dan kurs diambil live dari API publik (tanpa backend); harga merek Indonesia diambil dari scrape hargaemas.com yang diperbarui terjadwal (GitHub Action + fallback proxy CORS).
- Konteks pasar: harga emas internasional dalam USD/troy oz, sementara pasar Indonesia bertransaksi dalam Rupiah per gram — konversi adalah kebutuhan utama.

## Capabilities and Constraints

Confirmed functionality:
- Konversi spot USD/oz → Rp/gram dan per berat (1/5/10/25/50/100 gram).
- Ringkasan harga Antam, UBS, Pegadaian (1 gram), dari `data/gold-indonesia.json` (fallback proxy CORS hargaemas.com).
- Kurs USD/IDR live (Frankfurter).
- Mode Trader: entry, target %/harga, stop loss %/harga, multiple target, risk/reward, modal per berat, simulasi skenario bullish/bearish.
- Halaman chart historis harga emas (Chart.js).

Constraints:
- Static site di GitHub Pages. HTML/CSS/JS vanilla, tanpa build tool, tanpa backend, tanpa dependency npm.
- Identitas wajib: dark theme + gold accent.
- Sumber data live wajib tetap: spot (mintedmetal / xaus), kurs USD/IDR (Frankfurter), harga merek Indonesia (hargaemas.com via JSON lokal/proxy CORS).
- Tidak ada kredensial/rahasia di repo.

Open decisions:
- Positioning/klaim pembeda belum dijawab user (kalkulator trader vs harga Indonesia vs simple & cepat) — tetap dicatat, tidak dikarang.
- Nasib preset "Ryker Gold Plan" (plan pribadi pemilik) di produk publik — belum diputuskan user. Dipertahankan sampai ada keputusan; terlihat di DESIGN.md sebagai vanity pemilik.

Resolved 2026-11-04 (redesign):
- Harga UBS ditampilkan sebagai estimasi berlabel "Estimasi: Antam × 1,018" di kedua halaman — bukan harga resmi.
- Tidak ada lagi kurs hardcode 16,250 sebagai fallback diam: bila Frankfurter gagal, angka Rp ditampilkan kosong dengan instruksi isi manual; chart.html render USD saja.
- Data merek basi >3 hari dilabeli eksplisit ("Data basi: <tanggal> · gagal diperbarui") di kedua halaman; fallback proxy CORS dipertahankan.

## Brand Commitments

- Nama: "GOLD CALC" (header) / "Convert Gold" (repo & konteks).
- Identitas visual yang mengikat: dark theme + gold accent (dari AGENTS.md project).
- Voice: Bahasa Indonesia untuk UI, ringkas, fungsional; tanpa buzzword marketing (aturan anti-slop project).
- Emoji dipakai sebagai ikon di UI saat ini; belum ada logo/favicon asli (favicon kosong `data:,`).

## Evidence on Hand

- `data/gold-indonesia.json`: hasil scrape harga Antam & Pegadaian 12 denominasi (0,5 g–1000 g) + UBS estimasi. Saat penulisan, data basi (>3 hari, terakhir update 15 Okt 2026) sehingga fallback proxy CORS aktif.
- Tidak ada testimonial, statistik pengguna, logo partner, atau aset brand selain warna/nama di atas. Jangan dikarang.
- Live: https://zeinzulaziz.github.io/convert-gold/

## Product Principles

1. Angka dulu, dekorasi nanti — setiap angka yang tampil harus benar dan punya sumber; estimasi harus diberi label.
2. Buka langsung, langsung dapat angka — tanpa login, tanpa onboarding, tanpa dinding marketing.
3. Jujur soal keterbatasan data — harga basi, fallback, dan estimasi dikomunikasikan ke pengguna, bukan disembunyikan.
4. Satu identitas: dark + gold, tenang dan presisi, seperti terminal trading — bukan landing page.
5. Static & sederhana — perubahan harus tetap bisa di-deploy dengan push ke `main`, tanpa memperkenalkan build pipeline tanpa persetujuan.

## Accessibility & Inclusion

- Batas bawah: kontras teks terbaca (hindari abu-abu di atas abu-abu, aturan anti-slop project), tap target ≥ 44px, tanpa horizontal scroll di mobile.
- Belum ada audit aksesibilitas formal; perlu diperiksa saat redesign (kontras label kecil, aria-label ikon emoji, keyboard navigation).
