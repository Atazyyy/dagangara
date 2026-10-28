Kategori: Web App — Marketplace multi-vendor

# Dagangara — Marketplace Multi-vendor

> Bukan landing page: ini aplikasi marketplace yang benar-benar bisa
> dijelajahi — katalog produk dari banyak toko, keranjang, checkout,
> dan dashboard penjual.

Demo marketplace multi-vendor dengan 6 toko fiktif (butik batik,
roastery kopi, furnitur rotan, gadget, tanaman hias, dan dapur rumahan)
yang berjualan berdampingan. Proyek ini adalah **concept demo** untuk
portofolio jasa pembuatan web app — seluruh toko, produk, dan transaksi
bersifat fiktif.

**Live:** https://dagangara.vercel.app

## Fitur

- **Katalog 17 produk dari 6 toko**: setiap kartu memuat badge nama toko,
  rating, diskon, sisa stok, dan lokasi kota.
- **Filter & pencarian**: chip kategori, kotak pencarian (nama produk /
  toko), dan urutan harga atau rating.
- **Detail produk (modal)**: foto, deskripsi, pilihan varian, atur jumlah,
  tombol *Masukkan Keranjang*, dan tombol *Chat Penjual* via WhatsApp
  (wa.me, nomor dummy).
- **Keranjang multi-vendor**: item terkelompokkan per toko dengan
  subtotal dan ongkir per toko (gratis ongkir per toko untuk subtotal
  ≥ Rp500.000).
- **Checkout simulasi**: alamat contoh, pilihan metode bayar, lalu satu
  pesanan dipecah menjadi **kode pesanan terpisah per toko**.
- **Tab "Toko Saya" (dashboard vendor)**: produk & stok milik toko,
  daftar pesanan masuk dengan tombol proses (Baru → Dikemas → Dikirim →
  Selesai), grafik omzet 7 hari (SVG buatan sendiri, tanpa library
  chart), dan toggle buka/tutup toko.
- Keranjang, status toko, dan pesanan vendor tersimpan di
  **localStorage** — refresh tidak menghilangkan data.

## Untuk siapa demo ini?

Calon klien yang ingin membuka platform jual-beli: asosiasi UMKM,
pasar digital desa/komunitas, atau bisnis yang ingin banyak mitra
menjual di satu aplikasi dengan penagihan & pengiriman terpisah per
mitra.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (tema terang merah bata + krem, token di blok `@theme`)
- Framer Motion (modal, transisi tab, animasi sukses checkout)
- Lucide Icons
- Grafik SVG custom (tanpa library chart)

## Menjalankan

```bash
npm install
npm run dev      # development
npm run build    # production build ke folder dist/
npm run preview  # preview hasil build
```

---

Dibuat oleh [Agni Miftah Fauzi](https://github.com/Atazyyy) — jasa pembuatan
website & web app. Demo lain: [lapakhub.vercel.app](https://lapakhub.vercel.app) ·
[teinun.vercel.app](https://teinun.vercel.app)
