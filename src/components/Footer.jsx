import { Github, Store } from "lucide-react";
import { CATEGORIES, STORES } from "../data/seed";

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-sand bg-cream pb-20 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Store className="h-5 w-5 text-white" />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-ink">
                Dagangara<span className="text-primary">.</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/55">
              Marketplace multi-vendor tempat toko-toko kecil Indonesia
              berjualan berdampingan — belanja dari banyak penjual, satu
              keranjang, checkout terpisah per toko.
            </p>
            <p className="mt-4 text-xs text-ink/40">
              Seluruh toko, produk, penjual, dan transaksi pada demo ini
              bersifat fiktif.
            </p>
          </div>

          <div className="flex flex-wrap gap-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink/40">
                Kategori
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/60">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => onNavigate("katalog")}
                      className="hover:text-primary"
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink/40">
                Toko Pilihan
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/60">
                {STORES.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => onNavigate("katalog")}
                      className="hover:text-primary"
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-sand pt-6 text-xs text-ink/40 sm:flex-row sm:items-center">
          <p>© 2026 Dagangara. Concept demo portofolio.</p>
          <p className="flex items-center gap-1.5">
            Concept demo — dibuat oleh{" "}
            <a
              href="https://github.com/Atazyyy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-ink/60 hover:text-ink"
            >
              <Github className="h-3.5 w-3.5" /> Agni Miftah Fauzi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
