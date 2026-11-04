---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

## Scope & visitor mode

Redesign menyeluruh halaman kalkulator Convert Gold (`index.html`), Operate surface. Audiens: publik Indonesia umum — pembeli/investor emas fisik dan pemantau spot internasional. Job: buka halaman, langsung dapat harga emas terbaru dan konversi Rupiah per gram tanpa daftar; trading-analysis tersedia sebagai mode kedua. Sukses: angka benar, terbaca di 5 detik pertama, tanpa dekorasi mengganggu. chart.html mengikuti design system bersama, bukan redesign terpisah.

## Direction contract

THESIS: Terminal trading emas yang diperlakukan sebagai produk publik yang presisi — identitas dark + gold yang sama, tapi dirapikan jadi design system sungguhan (spacing, type scale, tabular numerals, kontras terukur), bukan template Binance yang ditempeli. Menolak: gradient/glow dekoratif, density tanpa hirarki, kartu-kartu sejenis tanpa urutan baca.

OWN-WORLD: Ground #0f1117; panel #1a1d29; well #252836; garis #2a2d3a (sedikit dinaikkan untuk batas terbaca); aksen emas #f0b90b dipakai untuk harga & aksi utama saja; hijau #2ecc71 / merah #e74c3c khusus untuk naik-turun; teks utama hampir putih hangat, label redup dinaikkan kontrasnya ke ≥4.5:1. Type: system-ui stack + tabular-nums untuk semua angka; skala 11/12/13/15/20/28/36; uppercase tracked label cuma untuk label, bukan dekorasi. Signature move: "Au" medallion emas pada banner harga live — satu-satunya ornamen, dan itu logo produk.

STORY: Pengunjung datang untuk satu angka (harga emas sekarang), tetap untuk konversi per berat, dan di mode Trader menjalankan skenario beli-target-SL dengan R/R yang jujur. Halaman ini bukan sales page; satu-satunya ajakan adalah pakai angkanya.

FIRST VIEWPORT: Header sticky tipis (wordmark "GOLD CALC" + medallion, link Chart, status kurs, toggle Sederhana/Trader) → banner spot harga terbesar di layar (USD/oz + perubahan, Rp/gram besar di kanan, "diperbarui hh:mm" jujur) → baris kartu Antam/UBS(Estimasi)/Pegadaian 1 gram + tabel denominasi → panel kalkulator (input kiri, hasil kanan). Primary action: "Harga Live" / input terisi otomatis; angka per berat langsung terbaca penuh di layar pertama desktop.

FORM: user-pinned world (identitas trader dark + gold, dari jawaban user & AGENTS.md project). seed: none (user-pinned direction; no roll). Form: incumbent shell — top bar + banner + dua kolom — ditata ulang; layout tetap web-standard, bukan kostum terminal.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved / open

- Nasib preset "Ryker Gold Plan" (plan pribadi di produk publik) — dipertahankan sampai user memutuskan; dicatat di PRODUCT.md.
- Harga UBS = Antam × 1,018 — hanya ditampilkan sebagai "Estimasi" berlabel; tidak diklaim harga resmi.
- Data gold-indonesia.json basi >3 hari → halaman wajib pakai proxy fallback dengan label jujur "harga 15 Okt 2026" atau sejenisnya; tidak menutupi keterlambatan.
- Finish reviewer: harness tidak punya agen `impeccable-finish-reviewer`; pengganti yang diungkapkan dipakai (subagent general fresh-context) atau pass in-thread segar.
