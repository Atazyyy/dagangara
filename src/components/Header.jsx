import { Store, ShoppingCart, LayoutGrid, Package2 } from "lucide-react";

const NAV = [
  { id: "katalog", label: "Katalog", icon: LayoutGrid },
  { id: "keranjang", label: "Keranjang", icon: ShoppingCart },
  { id: "toko", label: "Toko Saya", icon: Package2 },
];

export default function Header({ view, onNavigate, cartCount }) {
  return (
    <>
      {/* Header atas */}
      <header className="sticky top-0 z-40 border-b border-sand bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3.5 md:px-8">
          <button
            onClick={() => onNavigate("katalog")}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Store className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-ink">
              Dagangara<span className="text-primary">.</span>
            </span>
          </button>

          <nav className="ml-auto hidden items-center gap-1.5 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => onNavigate(n.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  view === n.id
                    ? "bg-primary-soft text-primary-deep"
                    : "text-ink/60 hover:bg-sand/60 hover:text-ink"
                }`}
              >
                <n.icon className="h-4.5 w-4.5" />
                {n.label}
                {n.id === "keranjang" && cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Tombol keranjang mobile */}
          <button
            onClick={() => onNavigate("keranjang")}
            aria-label="Buka keranjang"
            className="relative ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-deep md:hidden"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Tab bawah mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-sand bg-cream/95 backdrop-blur md:hidden">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => onNavigate(n.id)}
            className={`relative flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-semibold ${
              view === n.id ? "text-primary" : "text-ink/40"
            }`}
          >
            <n.icon className="h-5 w-5" />
            {n.label}
            {n.id === "keranjang" && cartCount > 0 && (
              <span className="absolute right-1/4 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        ))}
      </nav>
    </>
  );
}
