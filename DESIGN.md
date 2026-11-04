---
name: GOLD CALC
description: Terminal trading emas untuk publik Indonesia — konversi spot ke Rupiah per gram, harga merek Antam/UBS/Pegadaian, analisa entry–target–stop loss.
colors:
  gold-signal: "#f0b90b"
  gold-deep: "#d4a00a"
  ground: "#0f1117"
  panel: "#1a1d29"
  panel-raised: "#1e2130"
  well: "#252836"
  border: "#2e3140"
  border-strong: "#3a3e4f"
  antam-red: "#ff6f5e"
  harga-hijau: "#2ecc71"
  loss-red: "#ff7a6b"
  ubs-blue: "#5aa9ff"
  text: "#f2f3f7"
  dim: "#9ba0ae"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.2
    fontFeature: "tnum"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.12em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
    fontFeature: "tnum"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "12px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
components:
  button-primary:
    backgroundColor: "{colors.gold-signal}"
    textColor: "#141000"
    rounded: "{rounded.sm}"
    padding: "12px 18px"
    height: "46px"
  button-ghost:
    backgroundColor: "{colors.well}"
    textColor: "{colors.dim}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
    height: "44px"
  chip:
    backgroundColor: "{colors.well}"
    textColor: "{colors.dim}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
    height: "44px"
  panel-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.well}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
    height: "46px"
  mode-toggle-active:
    backgroundColor: "{colors.gold-signal}"
    textColor: "#141000"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
    height: "44px"
---

# Design System: GOLD CALC

## Overview

**Creative North Star: "The Ledger Terminal"**

GOLD CALC adalah buku besar emas yang berjalan di dalam terminal: permukaan gelap nyaris hitam, angka tabular besar, aksen emas dipakai seperti tinta stempel — jarang dan presisi. Halaman ini bukan landing page dan tidak pernah mencoba menjadi satu: setiap elemen ada untuk membawa harga, konversi, atau keputusan trade dalam beberapa detik. Panel adalah lembaran buku besar; kartu 1 gram adalah baris cap; warna hanya menjawab "naik atau turun" dan "fokus ke mana".

Density tinggi diperbolehkan, tapi hirarki wajib terbaca: harga live adalah angka terbesar di layar, merek logam adalah kartu-kartu, analisa trader adalah tabel dan rasio. Dekorasi yang tidak membawa data dihapus. Status live, estimasi UBS, dan data basi selalu diberi label — kejujuran data adalah bagian dari estetika, bukan lampiran.

Rejections yang dikonfirmasi: gradient/glow sebagai dekorasi tanpa fungsi; kartu sejenis bertumpuk tanpa urutan baca; em-dash sebagai dekorasi; density tanpa hirarki; klaim atau angka tanpa sumber.

**Key Characteristics:**
- Dark ground (#0f1117) dengan tiga tingkat permukaan: ground, panel, well
- Gold (#f0b90b) = satu-satunya aksen; appear hanya untuk harga, aksi utama, wordmark, dan status live
- tabular-nums di semua angka; system-ui sebagai satu-satunya keluarga
- Label uppercase 12px letterspaced untuk section, bukan hiasan
- Tidak ada shadow kecuali satu shadow halus pada banner mengambang dan hover kartu merek
- Status selalu berlabel: live (hijau), basi/gagal (merah), estimasi (biru)

## Colors

Terminal ledger: netral dingin kebiruan dengan satu lampu emas di atasnya.

### Primary
- **Stamp Gold** (#f0b90b): aksen tunggal. Harga Rp/gram live, tombol aksi utama, angka per-gram kunci, toggle mode aktif, wordmark, fokus keyboard. Jangan dipakai untuk seluruh permukaan atau teks isi.
- **Deep Gold** (#d4a00a): tepi medallion Au dan varian gelap aksen.

### Secondary
- **Naik Hijau** (#2ecc71): perubahan harga naik, profit, kurs live Frankfurter, status dot live. Bukan warna brand — warna sinyal.
- **Turun Merah** (#ff7a6b): perubahan harga turun, loss, error, data basi.

### Tertiary
- **Antam Red** (#ff6f5e): penanda merek Antam (angka harga 1g dan tag). Identitas merek, bukan peringatan.
- **Pegadaian Green** (#2ecc71 reuse): penanda merek Pegadaian.
- **UBS Blue** (#5aa9ff): penanda merek UBS; juga dipakai untuk label "Estimasi" karena itu peran jujurnya.

### Neutral
- **Ledger Ground** (#0f1117): latar halaman.
- **Ledger Panel** (#1a1d29): permukaan kartu, panel, header.
- **Raised Panel** (#1e2130): latar banner mengambang (dikeduanya).
- **Well** (#252836): input, chip, sel saat "di dalam" panel.
- **Ledger Border** (#2e3140): garis sistem; **#3a3e4f** untuk border kuat (fokus/hover).
- **Ash Text** (#f2f3f7): teks utama (mendekati putih hangat).
- **Dim Ash** (#9ba0ae): label, sub, meta. Ratio ≥ 5.6:1 di atas ground/panel — aman.

### Named Rules
**The One Voice Rule.** Gold muncul di ≤10% area render mana pun: harga live, Rp/gram, tombol primer, toggle aktif, wordmark. Sisanya adalah buku besar netral. Kalau layar mulai "berkilau", sesuatu sedang salah.
**The Signal Rule.** Hijau dan merah hanya berarti naik/turun atau baik/buruk. Tidak pernah dipakai sebagai dekorasi atau brand.
**The Labeled Estimate Rule.** Angka estimasi UBS selalu membawa kata "Estimasi" di kartu yang sama; data basi selalu membawa tanggal dan status merah. Tidak ada angka tanpa konteks sumber.

## Typography

**Display Font:** system-ui stack (ui-sans-serif, -apple-system, 'Segoe UI', Roboto) dengan `font-variant-numeric: tabular-nums`
**Body Font:** sama dengan Display — satu keluarga, banyak berat
**Label Font:** sama, uppercase 12px, weight 700, tracking 0.12em

**Character:** Satu keluarga, satu trik: angka tabular. Semua harga sejajar kolom secara vertikal — seperti kolom buku besar. Tidak ada serif, tidak ada display face; karakter datang dari weight dan tracking, bukan dari perubahan keluarga.

### Hierarchy
- **Display** (800, 34px, lh 1.1, -1% tracking): harga spot USD di banner; harga Rp/gram saat memakai skala besar.
- **Headline** (800, 22px, tabular): harga merek 1 gram; stat-strip value 22px.
- **Title** (700, 12px, uppercase 0.12em): judul section (`HARGA EMAS INDONESIA`, panel title). Selalu uppercase, letterspaced, berwarna dim atau gold.
- **Body** (600, 14px, tabular): isi tabel, input value, label tombol.
- **Label** (700, 12px, uppercase 0.12em): field label, stat label, kolom tabel.

### Named Rules
**The Column Rule.** Angka apa pun yang sejajar vertikal memakai tabular-nums. Tidak terkecuali di tabel harga, modal, atau R/R.
**The Tracking Rule.** Tracking besar (≥ 0.1em) hanya untuk label uppercase, tidak pernah untuk kalimat atau angka.

## Layout

Kontainer maks 1080px (chart 1000px), padding 20px desktop / 12px mobile. Struktur: header sticky 60px+ (auto height, wrap) → banner harga → section merek → stat-strip 3 sel → grid utama 340px 1fr. Breakpoint: 880px (grid kolaps jadi 1 kolom, header padding mengecil), 600px (kartu merek menumpuk, stat-strip jadi 2 kolom, tab targets 44px). Konten tabel lebar (denominasi, tabel hasil) boleh scroll horizontal di dalam container-nya — halaman tidak pernah scroll horizontal. Spacing rhythm: spasi section 20px (gap grid), spasi dalam komponen 16–20px, grup rapat 8px. Elemen penting selalu punya `min-width: 0`/`min-height: 44px`.

## Elevation & Depth

Sistem ini flat. Kedalaman dibangun dari tiga tingkat permukaan (ground 0f1117 → panel 1a1d29 → raised 1e2130/well 252836) dan garis border 1px — bukan shadow. Pengecualian yang disahkan user: **satu shadow halus untuk elemen mengambang** (banner harga, `0 12px 36px rgba(0,0,0,.4)`) dan **hover kartu merek** (`translateY(-2px)` + `0 10px 28px rgba(0,0,0,.35)`). Shadow lain tidak diperbolehkan; hover transform dibatasi 2px.

### Named Rules
**The Flat-Except-One Rule.** Tanpa shadow = default. Shadow hanya untuk banner mengambang dan feedback hover kartu merek. Tidak ada shadow untuk kartu statis, teks, atau border dekoratif.

## Shapes

Radius kecil dan konsisten: 6px (input, tombol, chip, toggle), 10px (kartu merek, well), 12px (panel, banner). Medallion "Au" adalah satu-satunya bentuk bundar di sistem. Border selalu 1px solid #2e3140 (atau #3a3e4f saat kuat) — tidak pernah tebal, tidak pernah berwarna dekoratif; border berwarna hanya untuk sinyal (Antam/UBS/Pegadaian tag) atau aksen layar banner (1px gold 38%). Accent border-top di card rounded dilarang (pakai border penuh tinted).

## Components

### Buttons
- **Shape:** radius 6px, tinggi minimum 44–46px, label 700.
- **Primary:** Stamp Gold solid, teks #141000, padding 12px 18px. Untuk satu aksi utama per layar (Ryker Gold Plan, + Add saat relevan).
- **Ghost:** well background, teks dim, border 1px; hover teks text-color.
- **Green CTA (+ Add target):** Naik Hijau solid, teks #04180c.
- **Focus:** `outline: 2px solid #f0b90b; offset: 2px` — tidak diganti oleh style apa pun.

### Chips (quick price, range)
Well background, teks dim, radius 6px, 44px tap target; hover/focus: border + teks gold. Chip "Harga Live" memakai aksen tinted (border gold 40%).

### Cards / Containers (panel, kartu merek)
Radius 12px/10px, background panel/well, border 1px, padding 16–20px. Panel title = label uppercase dengan garis bawah 1px. Kartu merek: tag merek kecil (Antam/UBS/Pegadaian tinted border), harga 22px tabular 800 dalam warna merek, diff "vs spot" 12px dim, UBS selalu dengan baris estimasi. Hover kartu merek: angkat 2px + shadow halus.

### Inputs / Fields
Well background, border 1px #2e3140, radius 6px, tinggi 46px, teks 15px 600 tabular, placeholder dim. Focus: border gold. Prefix kiri 2px berwarna untuk grup konteks (entry=gold, target=hijau, SL=merah) dengan padding kiri dalam. Label field uppercase 12px dim di atas input; hint 12px dim di bawah, reserve space saat kosong.

### Navigation
Header sticky; wordmark medallion Au + "GOLD CALC" gold 800 dengan micro-tag "TRADER EDITION" dim; kanan: link "Chart" (ikon line-chart 16px + teks, min-height 44px), status kurs (dot hijau/merah + teks), toggle Sederhana/Trader (dua tombol radius 6px di well; aktif = gold solid). Di ≤880px status kurs disembunyikan; di ≤600px wordmark mengecil dan header wrap.

### R/R Box
Pusat analisis trader: well background, radius 12px, border 1px yang berubah warna oleh grade (hijau ≥2, gold ≥1, merah < 1); angka "1 : x.xx" 38px 800 tabular. Ini satu-satunya elemen yang menyesuaikan warna tepi berdasarkan data.

### Signature: Ledger Banner
Banner harga live: raised panel, border 1px gold 38%, shadow halus, padding 20–24px. Kiri: medallion Au/tumpukan emas SVG + "HARGA EMAS SPOT" label + harga USD 34px 800 + chip perubahan (+hijau/-merah, tinted bg); kanan: "SETARA (IDR)" + Rp/gram gold 24px + caption sumber & timestamp jujur.

## Do's and Don'ts

### Do:
- **Do** reserver gold untuk harga, aksi utama, wordmark, dan status live (The One Voice Rule).
- **Do** label setiap angka non-resmi: "Estimasi" untuk UBS, tanggal + status merah untuk data basi, sumber untuk spot/kurs.
- **Do** pakai tabular-nums untuk semua angka dan kolom.
- **Do** jaga tap target ≥ 44px dan `:focus-visible` outline gold 2px offset 2px.
- **Do** pakai tiga tingkat permukaan (ground/panel/well) + border 1px untuk kedalaman.
- **Do** beri halaman secondary action yang jelas ("Harga Live") dan jujur saat data gagal (tampilkan error + cara manual).

### Don't:
- **Don't** pakai hijau/merah sebagai dekorasi atau aksen brand — mereka sinyal.
- **Don't** tambahkan shadow di luar banner dan hover kartu merek; jangan glow/halo gold seolah "premium".
- **Don't** pakai kartu sejenis bertumpuk tanpa urutan baca atau dekoratif "bento grid".
- **Don't** pakai gradient dekoratif tanpa data; gradient hanya untuk latar banner sangat halus dan medallion.
- **Don't** hardcode kurs cadangan secara diam — saat Frankfurter gagal, tampilkan kosong + instruksi isi manual.
- **Don't** klaim harga UBS sebagai resmi; tidak menampilkan denominasi di luar data hargaemas.com tanpa label sumber.
- **Don't** pakai em-dash sebagai gaya penulisan UI; gunakan "•", koma, atau titik dua.
