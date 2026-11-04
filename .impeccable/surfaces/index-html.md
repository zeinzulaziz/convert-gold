---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["chart.html"]
---

## Scope & visitor mode

REBRAND total halaman utama Convert Gold (`index.html`) dan chart.html, Operate surface. Audiens tetap: publik Indonesia umum — pembeli/investor emas fisik dan pemantau spot internasional. Semua fitur lama dipertahankan: konversi spot→Rp/gram multi-berat, kartu Antam/UBS/Pegadaian, tabel denominasi, kurs live, mode Trader lengkap (entry/target/SL/R-R/scenario chart), preset Ryker Gold Plan. Sukses = produk terasa seperti fintech profesional, angka tetap benar dan jujur.

## Direction contract

THESIS: Fintech premium yang reda cahaya — warm white ground, satu aksen gold muted, tipografi Inter tabular, detail "buku besar" (attribution jujur, label estimasi/basi) sebagai kemewahan. Menolak: dashboard gelap/glow, kartu bento generatif, gradient tematik, dan dark-mode-sebagai-brand.

OWN-WORLD: Ground #F8F7F4; card #FFFFFF; well #EFEDE8 (warm tint); border #E5E2DA / strong #D5D1C6; teks #202124; secondary #66645E; accent #B89548 (deep #A8843C); sinyal naik #177A46 / turun #B9382A; karat label #B89548. Radius 12–16px; border 1px; shadow sangat halus hanya untuk mengangkat kartu/hover; tidak ada glow/gradient dekoratif. Dark theme = dunia Ledger Terminal (internal #0f1117/#f0b90b) di-swap via `data-theme="dark"` pada <html>. Type: Inter (Google Fonts, display=swap) + tabular-nums wajib. Signature move: gold ingot logo mark + angka Rp/gram besar dengan attribution kecil di bawah (tanggal & sumber) — editorial, bukan badge.

STORY: Pengunjung datang untuk satu angka emas; ia melihatnya langsung sebagai hierarchi finansial (spot → Rp/gram → per berat), mengambil keputusannya (beli? berapa gram? target/SL?), menyalin hasilnya, dan tahu dari mana angkanya datang. Chart historis ringkas meyakinkan tanpa buka halaman lain.

FIRST VIEWPORT: Header (mark + GOLD CALC, link Grafik, dot kurs live, toggle theme) dengan segmented control Sederhana/Trader di atas grid → overview dua kolom: kiri harga spot besar + perubahan + "Setara Rp X/gram · [purity]" + attribution "per [tgl], sumber: mintedmetal"; kanan strip: kurs USD/IDR + emas/gram + tombol "Salin hasil". Di bawah: section merek (3 kartu + denominasi). Primary action: auto-isi spot, "Harga Live" tersedia; salin hasil satu klik.

FORM: user-pinned world (Premium Fintech / Editorial Finance; light default, dark toggle). seed: none (user-pinned direction; no roll). Form: Operate shell — top bar header, overview, kartu merek, strip konversi, grid kalkulator dua kolom; layout web-standard.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
