import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, MapPin, Search, Star } from "lucide-react";
import { CATEGORIES, PRODUCTS, STORES } from "../data/seed";
import { rupiah } from "../utils/format";

const SORTS = [
  { id: "relevan", label: "Paling Relevan" },
  { id: "murah", label: "Harga Terendah" },
  { id: "mahal", label: "Harga Tertinggi" },
  { id: "rating", label: "Rating Tertinggi" },
];

export function ProductCard({ product, onOpen }) {
  const store = STORES.find((s) => s.id === product.storeId);
  const diskon = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpen(product)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-cream text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-sand">
        <img
          src={product.photo}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {diskon > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white">
            -{diskon}%
          </span>
        )}
        {product.stock <= 10 && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-white">
            Stok {product.stock}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-center gap-1.5">
          <span className="truncate rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-bold text-primary-deep">
            {store.name}
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-0.5 text-xs font-bold text-ink/70">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-ink">
          {product.name}
        </p>
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-extrabold text-primary">
              {rupiah(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-ink/40 line-through">
                {rupiah(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[11px] text-ink/45">
            Terjual {product.sold} · <MapPin className="mb-0.5 inline h-3 w-3" />
            {store.city}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default function Catalog({ onOpenProduct }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sort, setSort] = useState("relevan");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const store = STORES.find((s) => s.id === p.storeId);
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        store.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchCat = category === "Semua" || p.category === category;
      return matchQ && matchCat;
    });
    if (sort === "murah") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "mahal") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating || b.sold - a.sold);
    return list;
  }, [query, category, sort]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
            Katalog Produk
          </h1>
          <p className="mt-1 text-sm text-ink/50">
            {PRODUCTS.length} produk dari {STORES.length} toko — semuanya
            penjual terverifikasi fiktif.
          </p>
        </div>
        <label className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk atau toko…"
            className="w-full rounded-xl border border-sand bg-cream py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/35 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {["Semua", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              category === c
                ? "bg-primary text-white"
                : "border border-sand bg-cream text-ink/60 hover:border-primary/40 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm text-ink/50">
          <ArrowUpDown className="h-4 w-4" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-sand bg-cream px-3 py-2 text-sm font-semibold text-ink focus:border-primary focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-sand bg-cream p-12 text-center">
          <p className="text-lg font-bold text-ink">Tidak ada produk cocok</p>
          <p className="mt-1 text-sm text-ink/50">
            Coba kata kunci lain atau ganti filter kategori.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpenProduct} />
          ))}
        </div>
      )}
    </div>
  );
}
