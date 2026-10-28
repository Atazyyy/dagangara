export const STORES = [
  {
    id: "batik-prameswari",
    name: "Batik Prameswari",
    city: "Yogyakarta",
    rating: 4.9,
    since: 2019,
    desc: "Batik tulis & tenun ikat buatan perajin Kotagede. Setiap helai dikerjakan tangan, motif dibatasi agar tetap eksklusif.",
  },
  {
    id: "kopi-rakyat",
    name: "Kopi Rakyat Roastery",
    city: "Bandung",
    rating: 4.8,
    since: 2021,
    desc: "Roastery kecil yang mengangkat biji petani lokal. Disangrai tiap Selasa & Jumat, dikirim maksimal 24 jam setelah sangrai.",
  },
  {
    id: "ruang-rupa",
    name: "Ruang Rupa Living",
    city: "Surakarta",
    rating: 4.7,
    since: 2020,
    desc: "Furnitur rotan, keramik, dan karya seni lokal untuk rumah hangat. Packing kayu ganda, aman sampai luar Jawa.",
  },
  {
    id: "gadgetku",
    name: "GadgetKu Store",
    city: "Jakarta Pusat",
    rating: 4.6,
    since: 2022,
    desc: "Elektronik & aksesori dengan garansi resmi distributor. Semua unit dicek teknisi sebelum dikirim.",
  },
  {
    id: "rumah-tanaman",
    name: "Rumah Tanaman",
    city: "Bogor",
    rating: 4.8,
    since: 2021,
    desc: "Tanaman hias pilihan dari nursery Cibinong, siap tanam dengan media dan panduan perawatan.",
  },
  {
    id: "dapur-ibu-sari",
    name: "Dapur Ibu Sari",
    city: "Surabaya",
    rating: 4.9,
    since: 2018,
    desc: "Masakan rumahan kemasan: sambal, rendang, dan snack box. Tanpa pengawet, tahan 3 bulan beku.",
  },
];

export const CATEGORIES = [
  "Fashion",
  "Kuliner",
  "Dekor & Furnitur",
  "Elektronik",
  "Tanaman & Hobi",
];

const P = (id, name, storeId, category, price, oldPrice, rating, sold, stock, photo, variants, desc) => ({
  id,
  name,
  storeId,
  category,
  price,
  oldPrice,
  rating,
  sold,
  stock,
  photo: `https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=800&q=70`,
  variants,
  desc,
});

export const PRODUCTS = [
  // Batik Prameswari — Fashion
  P("p01", 'Kemeja Batik Tulis "Parang Kusuma"', "batik-prameswari", "Fashion", 289000, 349000, 4.9, 213, 42, "1445205170230-053b83016050",
    ["M", "L", "XL"],
    "Kemeja batik tulis lengkap dengan kancing kayu. Motif Parang Kusuma dibatik tangan oleh perajin Kotagede, pewarna alami jadi luntur. Potongan reguler, cocok formal maupun santai."),
  P("p02", 'Dress Tenun Ikat "Sekar Jagad"', "batik-prameswari", "Fashion", 349000, null, 4.8, 156, 18, "1483985988355-763728e1935b",
    ["S", "M", "L"],
    "Dress tenun ikat Troso dengan garis siluet A. Kain ditenun selesai 2 minggu, jadi setiap dress punya pola unik. Ada lapisan dalam, tidak menerawang."),
  P("p03", "Selendang Sutra Motif Pelangi", "batik-prameswari", "Fashion", 159000, 189000, 4.7, 88, 60, "1441986300917-64674bd600d8",
    ["Motif Samudra", "Motif Pagi"],
    "Selendang sutra pewarna gradasi (dyeing) manual. Lembut, ringan, cocok jadi aksen outfit polos atau kado spesial."),

  // Kopi Rakyat — Kuliner
  P("p04", "Kopi Arabika Gayo 250g", "kopi-rakyat", "Kuliner", 78000, null, 4.9, 412, 120, "1552674605-db6ffd4facb5",
    ["Biji", "Giling Halus", "Giling Kasar"],
    "Single origin Gayo 1.400 mdpl, notes cokelat hitam & rempah. Disangrai medium, dikirim maksimal 7 hari setelah sangrai supaya aroma masih penuh."),
  P("p05", "Kopi Robusta Temanggung 500g", "kopi-rakyat", "Kuliner", 95000, 110000, 4.8, 230, 85, "1476224203421-9ac39bcb3327",
    ["Biji", "Giling Halus"],
    "Robusta petani Temanggung, body tebal dan pahit mantap untuk es kopi. Ideal untuk mesin espresso atau tubruk tradisional."),
  P("p06", "Paket Ngopi Hemat (Kopi 200g + Kudapan)", "kopi-rakyat", "Kuliner", 55000, 72000, 4.7, 178, 64, "1504674900247-0877df9cc836",
    ["House Blend", "Gayo"],
    "Paket ramah kantong: kopi house blend 200g plus kudapan kering dari UMKM lokal. Pilihan aman buat stok ngopi mingguan."),

  // Ruang Rupa — Dekor & Furnitur
  P("p07", 'Kursi Rotan Anyam "Jepara"', "ruang-rupa", "Dekor & Furnitur", 685000, null, 4.8, 64, 12, "1586023492125-27b2c045efd7",
    ["Natural", "Cokelat Tua"],
    "Kursi rotan anyaman rapat berbahan rotan asli Kalimantan. Finishing food-grade, tahan terik untuk teras maupun ruang keluarga."),
  P("p08", 'Lukisan Kanvas "Pagi di Kampung"', "ruang-rupa", "Dekor & Furnitur", 450000, null, 5.0, 31, 6, "1541961017774-22349e4a1262",
    ["40 x 60 cm", "60 x 90 cm"],
    "Lukisan akrislik asli (bukan cetak) karya pelukis Solo. Framing kayu mahoni sudah termasuk, siap gantung di dinding."),
  P("p09", 'Vas Keramik "Bunga Tanjung"', "ruang-rupa", "Dekor & Furnitur", 135000, 155000, 4.6, 72, 25, "1578321272176-b7bbc0679853",
    ["Kecil (18 cm)", "Besar (28 cm)"],
    "Vas keramik bakar tinggi dengan glasir merah bata. Bagian dalam anti bocor, aman untuk bunga air maupun kering."),

  // GadgetKu — Elektronik
  P("p10", "Smartwatch Aktiva 3", "gadgetku", "Elektronik", 499000, 599000, 4.7, 318, 40, "1524805444758-089113d48a6d",
    ["Hitam", "Silver"],
    "Layar AMOLED 1,43 inci, baterai 10 hari, 120 mode olahraga. Garansi resmi 1 tahun, termasuk strap tambahan silikon."),
  P("p11", 'Laptop CakraBook 14" UltraSlim', "gadgetku", "Elektronik", 3450000, null, 4.6, 89, 8, "1460925895917-afdab827c52f",
    ["8GB / 256GB", "16GB / 512GB"],
    "Laptop tipis 1,2 kg dengan layar IPS anti silau. Cocok untuk kuliah, kerja perkantoran, dan presentasi. Sudah Windows original + Office trial."),
  P("p12", "Mechanical Keyboard Rydon K61", "gadgetku", "Elektronik", 289000, 329000, 4.6, 201, 33, "1519389950473-47ba0277781c",
    ["Red Switch", "Blue Switch"],
    "Keyboard mekanis 60% hot-swappable, keycap PBT double-shot. Kabel USB-C dilepas, ada mode kabel & bluetooth dua perangkat."),

  // Rumah Tanaman — Tanaman & Hobi
  P("p13", "Paket 3 Tanaman Hias Indoor", "rumah-tanaman", "Tanaman & Hobi", 165000, null, 4.8, 154, 22, "1470071459604-3b5ec3a7fe05",
    ["Isi Standar", "Isi Premium"],
    "Tiga tanaman pembersih udara (isi rutin: sirih gading, sansevieria, spathiphyllum) plus pot dan media tanam siap. Diperiksa dulu kondisinya sebelum dikirim."),
  P("p14", "Set Alat Berkebun Mini (7 Pcs)", "rumah-tanaman", "Tanaman & Hobi", 89000, 99000, 4.7, 96, 48, "1441974231531-c6227db76b6e",
    ["Warna Hijau", "Warna Terakota"],
    "Sekop, garpu, gunting, sprayer, sarung tangan, plant label, dan tas jinjing. Bahan stainless anti karat, pegangan kayu nyaman."),

  // Dapur Ibu Sari — Kuliner
  P("p15", "Sambal Bawang Rumahan (2 Toples)", "dapur-ibu-sari", "Kuliner", 65000, null, 4.9, 521, 90, "1555396273-367ea4eb4db5",
    ["Level Pedas Sedang", "Level Pedas Nampol"],
    "Sambal bawang digoreng dadakan tiap batch, tanpa MSG dan pengawet. Isi 2 toples @200 ml, tahan 3 bulan di kulkas."),
  P("p16", "Rendang Kering Premium 250g", "dapur-ibu-sari", "Kuliner", 85000, 95000, 4.9, 244, 55, "1414235077428-338989a2e8c0",
    ["Original", "Extra Daun Kunyit"],
    "Rendang daging sapi dimasak 8 jam sampai kering legit. Vacuum pack, tahan 1 bulan suhu ruang, 6 bulan di freezer."),
  P("p17", "Paket Snack Box Mini (isi 10)", "dapur-ibu-sari", "Kuliner", 145000, null, 4.8, 67, 30, "1517248135467-4c7edcad34c4",
    ["Menu A", "Menu B"],
    "Cocok untuk rapat & arisan: 10 box berisi kudapan gurih + manis roti rumah. Pesanan minimal H-2, dikirim area Surabaya atau ekspedisi beku."),
];

export const MY_STORE_ID = "batik-prameswari";

export const seedVendorOrders = () => {
  const now = Date.now();
  const hour = 3600 * 1000;
  return [
    {
      id: "DGR-8K2M4P",
      buyer: "Rani Puspitasari",
      city: "Semarang",
      items: [{ name: 'Kemeja Batik Tulis "Parang Kusuma"', variant: "L", qty: 1 }],
      total: 289000,
      status: "Baru",
      ts: now - 1 * hour,
    },
    {
      id: "DGR-3TQ9XW",
      buyer: "Bagus Prasetyo",
      city: "Jakarta Selatan",
      items: [
        { name: 'Dress Tenun Ikat "Sekar Jagad"', variant: "M", qty: 1 },
        { name: "Selendang Sutra Motif Pelangi", variant: "Motif Pagi", qty: 2 },
      ],
      total: 667000,
      status: "Baru",
      ts: now - 3 * hour,
    },
    {
      id: "DGR-7HDK1R",
      buyer: "Siti Marfuah",
      city: "Surabaya",
      items: [{ name: "Selendang Sutra Motif Pelangi", variant: "Motif Samudra", qty: 1 }],
      total: 159000,
      status: "Dikemas",
      ts: now - 9 * hour,
    },
    {
      id: "DGR-5MVR8C",
      buyer: "Andi Firmansyah",
      city: "Makassar",
      items: [{ name: 'Kemeja Batik Tulis "Parang Kusuma"', variant: "XL", qty: 2 }],
      total: 578000,
      status: "Dikirim",
      ts: now - 26 * hour,
    },
    {
      id: "DGR-2PLN6T",
      buyer: "Dewi Anggraeni",
      city: "Bandung",
      items: [{ name: 'Dress Tenun Ikat "Sekar Jagad"', variant: "S", qty: 1 }],
      total: 349000,
      status: "Dikirim",
      ts: now - 40 * hour,
    },
    {
      id: "DGR-9XKB4Q",
      buyer: "Yoga Saputra",
      city: "Denpasar",
      items: [{ name: 'Kemeja Batik Tulis "Parang Kusuma"', variant: "M", qty: 1 }],
      total: 289000,
      status: "Selesai",
      ts: now - 3 * 24 * hour,
    },
  ];
};

export const OMZET_7_HARI = [
  { label: "Sen", value: 890000 },
  { label: "Sel", value: 640000 },
  { label: "Rab", value: 1120000 },
  { label: "Kam", value: 780000 },
  { label: "Jum", value: 1450000 },
  { label: "Sab", value: 1730000 },
  { label: "Min", value: 1240000 },
];
