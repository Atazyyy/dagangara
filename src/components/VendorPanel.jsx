import { MapPin, Package2, Power, RotateCcw, Star, TrendingUp } from "lucide-react";
import { MY_STORE_ID, OMZET_7_HARI, PRODUCTS, STORES } from "../data/seed";
import { rupiah, shortRupiah } from "../utils/format";

function OmzetChart({ data }) {
  const W = 560;
  const H = 230;
  const padX = 30;
  const topPad = 30;
  const bottomPad = 34;
  const gap = 14;
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = (W - padX * 2 - gap * (data.length - 1)) / data.length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Grafik omzet 7 hari terakhir"
    >
      {data.map((d, i) => {
        const h = Math.max(4, ((d.value / max) * (H - topPad - bottomPad)) | 0);
        const x = padX + i * (barW + gap);
        const y = H - bottomPad - h;
        const isToday = i === data.length - 1;
        return (
          <g key={d.label + i}>
            <title>{`${d.label}: ${rupiah(d.value)}`}</title>
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              rx={7}
              fill={isToday ? "#a83e26" : "#e8c7bb"}
            />
            <text
              x={x + barW / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#33241a"
            >
              {shortRupiah(d.value)}
            </text>
            <text
              x={x + barW / 2}
              y={H - 12}
              textAnchor="middle"
              fontSize="11"
              fontWeight={isToday ? "700" : "500"}
              fill={isToday ? "#a83e26" : "#8a7666"}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const STATUS_STYLES = {
  Baru: "bg-amber-50 text-amber-600",
  Dikemas: "bg-sky-50 text-sky-600",
  Dikirim: "bg-violet-50 text-violet-600",
  Selesai: "bg-emerald-50 text-emerald-600",
};

const NEXT_STATUS = { Baru: "Dikemas", Dikemas: "Dikirim", Dikirim: "Selesai" };

export default function VendorPanel({ vendor }) {
  const store = STORES.find((s) => s.id === MY_STORE_ID);
  const myProducts = PRODUCTS.filter((p) => p.storeId === MY_STORE_ID);
  const pesananBaru = vendor.orders.filter((o) => o.status === "Baru").length;
  const omzetHariIni = OMZET_7_HARI[OMZET_7_HARI.length - 1].value;
  const totalItems = vendor.orders.reduce(
    (s, o) => s + o.items.reduce((n, it) => n + it.qty, 0),
    0
  );

  return (
    <div className="space-y-5">
      {/* Header toko */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sand bg-cream p-5">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-white">
            {store.name[0]}
          </span>
          <div>
            <h1 className="text-lg font-extrabold text-ink md:text-xl">
              {store.name}
            </h1>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink/50">
              <MapPin className="h-3 w-3" /> {store.city}
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {store.rating} · {totalItems} item terkirim
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
              vendor.open
                ? "bg-emerald-50 text-emerald-600"
                : "bg-sand text-ink/50"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                vendor.open ? "bg-emerald-500" : "bg-ink/30"
              }`}
            />
            {vendor.open ? "Toko Buka" : "Toko Tutup"}
          </span>
          <button
            onClick={vendor.toggleOpen}
            aria-label={vendor.open ? "Tutup toko" : "Buka toko"}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              vendor.open ? "bg-emerald-500" : "bg-ink/20"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                vendor.open ? "left-6" : "left-1"
              }`}
            />
            <Power
              className={`absolute top-1.5 h-4 w-4 ${vendor.open ? "left-1 text-white" : "left-6 text-ink/40"}`}
            />
          </button>
        </div>
      </div>

      {/* Stat ringkas */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {[
          { label: "Omzet kemarin", value: rupiah(omzetHariIni), icon: TrendingUp },
          { label: "Pesanan baru", value: pesananBaru + " pesanan", icon: Package2 },
          { label: "Produk aktif", value: myProducts.length + " produk", icon: Package2 },
          { label: "Status toko", value: vendor.open ? "Buka" : "Tutup", icon: Power },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-sand bg-cream p-4"
          >
            <s.icon className="h-4.5 w-4.5 text-primary" />
            <p className="mt-2 text-lg font-extrabold text-ink">{s.value}</p>
            <p className="text-xs text-ink/45">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Produk toko */}
        <div className="overflow-hidden rounded-2xl border border-sand bg-cream">
          <div className="border-b border-sand bg-white px-5 py-4">
            <h2 className="font-extrabold text-ink">Produk Toko</h2>
            <p className="text-xs text-ink/45">
              Stok dan performa produk milik {store.name}
            </p>
          </div>
          <div className="divide-y divide-sand/70">
            {myProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3.5">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold text-ink">
                    {p.name}
                  </p>
                  <p className="text-xs text-ink/45">
                    {rupiah(p.price)} · terjual {p.sold}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    p.stock <= 10
                      ? "bg-amber-50 text-amber-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  Stok {p.stock}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grafik omzet */}
        <div className="overflow-hidden rounded-2xl border border-sand bg-cream">
          <div className="border-b border-sand bg-white px-5 py-4">
            <h2 className="font-extrabold text-ink">Omzet 7 Hari Terakhir</h2>
            <p className="text-xs text-ink/45">
              Grafik SVG buatan sendiri, tanpa library chart
            </p>
          </div>
          <div className="p-4">
            <OmzetChart data={OMZET_7_HARI} />
            <div className="mt-3 flex items-center justify-between rounded-xl bg-primary-soft/60 px-4 py-2.5 text-sm">
              <span className="text-ink/60">Total minggu ini</span>
              <span className="font-extrabold text-primary-deep">
                {rupiah(OMZET_7_HARI.reduce((s, d) => s + d.value, 0))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pesanan masuk */}
      <div className="overflow-hidden rounded-2xl border border-sand bg-cream">
        <div className="flex items-center justify-between border-b border-sand bg-white px-5 py-4">
          <div>
            <h2 className="font-extrabold text-ink">Pesanan Masuk</h2>
            <p className="text-xs text-ink/45">
              Klik "Proses" untuk lanjut ke tahap berikutnya
            </p>
          </div>
          <button
            onClick={vendor.resetVendor}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-ink/45 transition-colors hover:bg-sand hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset data contoh
          </button>
        </div>
        <div className="divide-y divide-sand/70">
          {vendor.orders.map((o) => (
            <div key={o.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="min-w-40 flex-1">
                <p className="text-sm font-bold text-ink">
                  {o.buyer}{" "}
                  <span className="font-mono text-xs font-semibold text-ink/40">
                    #{o.id}
                  </span>
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink/50">
                  {o.items
                    .map((it) => `${it.name} (${it.variant}) x${it.qty}`)
                    .join(" · ")}
                </p>
                <p className="text-xs text-ink/45">
                  Tujuan: {o.city} · {rupiah(o.total)}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLES[o.status]}`}
              >
                {o.status}
              </span>
              {NEXT_STATUS[o.status] ? (
                <button
                  onClick={() => vendor.advanceOrder(o.id)}
                  className="rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-deep"
                >
                  Proses → {NEXT_STATUS[o.status]}
                </button>
              ) : (
                <span className="rounded-xl bg-sand px-3.5 py-2 text-xs font-bold text-ink/40">
                  Selesai
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
