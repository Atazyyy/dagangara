import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { rupiah, waLink } from "../utils/format";
import { STORES } from "../data/seed";

export default function ProductModal({ product, onClose, onAdd }) {
  const [variant, setVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setVariant(product.variants[0]);
      setQty(1);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const store = product ? STORES.find((s) => s.id === product.storeId) : null;

  return (
    <AnimatePresence>
      {product && store && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Tutup detail produk"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink/60 shadow-md transition-colors hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid min-h-0 overflow-y-auto md:grid-cols-2">
              <div className="aspect-square bg-sand">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-4 p-5 md:p-7">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white">
                      {store.name[0]}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-ink">
                        {store.name}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-ink/45">
                        <MapPin className="h-3 w-3" /> {store.city} · Toko
                        sejak {store.since}
                      </p>
                    </div>
                    <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-extrabold leading-snug text-ink">
                    {product.name}
                  </h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-primary">
                      {rupiah(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-ink/40 line-through">
                        {rupiah(product.oldPrice)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink/45">
                    Terjual {product.sold} · stok {product.stock}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-ink/65">
                  {product.desc}
                </p>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink/40">
                    Varian
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v}
                        onClick={() => setVariant(v)}
                        className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                          variant === v
                            ? "bg-primary text-white"
                            : "border border-sand bg-white text-ink/60 hover:border-primary/40"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink/40">
                    Jumlah
                  </p>
                  <div className="inline-flex items-center gap-1 rounded-xl border border-sand bg-white p-1">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Kurangi jumlah"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/60 hover:bg-sand"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-ink">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                      aria-label="Tambah jumlah"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/60 hover:bg-sand"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    onClick={() => {
                      onAdd(product, variant, qty);
                      setAdded(true);
                      setTimeout(() => setAdded(false), 1800);
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all ${
                      added ? "bg-emerald-600" : "bg-primary hover:bg-primary-deep"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="h-4 w-4" /> Masuk Keranjang
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" /> Masukkan Keranjang
                      </>
                    )}
                  </button>
                  <a
                    href={waLink(store.name, product)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                  >
                    <MessageCircle className="h-4 w-4" /> Chat Penjual
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
