import { useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
  Wallet,
} from "lucide-react";
import { orderCode, rupiah } from "../utils/format";

const ONGKIR_FLAT = 12000;
const GRATIS_ONGKIR_MIN = 500000;

const PAYMENTS = [
  { id: "transfer", label: "Transfer Bank", icon: Banknote, note: "BCA fiktif 8720-1122-3456 a/n PT Dagangara" },
  { id: "ewallet", label: "E-Wallet", icon: Wallet, note: "Saldo simulasi DagangPay" },
  { id: "cod", label: "COD (Bayar di Tempat)", icon: CreditCard, note: "Biaya layanan +Rp2.500" },
];

function ongkirStore(subtotal) {
  return subtotal >= GRATIS_ONGKIR_MIN ? 0 : ONGKIR_FLAT;
}

export default function CartView({ cart }) {
  const [stage, setStage] = useState("cart"); // cart | checkout | done
  const [payment, setPayment] = useState("transfer");
  const [doneOrders, setDoneOrders] = useState(null);

  const totalOngkir = cart.groups.reduce(
    (s, g) => s + ongkirStore(g.subtotal),
    0
  );
  const biayaLayanan = payment === "cod" ? 2500 : 0;
  const grandTotal = cart.total + totalOngkir + biayaLayanan;

  const confirmOrder = () => {
    const orders = cart.groups.map((g) => ({
      store: g.store.name,
      code: orderCode(),
      items: g.lines.length,
      total: g.subtotal + ongkirStore(g.subtotal),
    }));
    setDoneOrders(orders);
    cart.clear();
    setStage("done");
  };

  /* ---------- Selesai: kode pesanan per toko ---------- */
  if (stage === "done" && doneOrders) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl rounded-3xl border border-sand bg-cream p-8 text-center shadow-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.1 }}
        >
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
        </motion.div>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">
          Pesanan Berhasil Dibuat!
        </h1>
        <p className="mt-1.5 text-sm text-ink/55">
          Karena kamu belanja dari beberapa toko, pesanan dipecah otomatis
          menjadi satu kode per toko.
        </p>

        <div className="mt-6 space-y-2.5 text-left">
          {doneOrders.map((o) => (
            <div
              key={o.code}
              className="flex items-center gap-3 rounded-2xl border border-sand bg-white p-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-deep">
                <Store className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{o.store}</p>
                <p className="text-xs text-ink/50">
                  {o.items} produk · {rupiah(o.total)}
                </p>
              </div>
              <span className="rounded-lg bg-sand px-3 py-1.5 font-mono text-sm font-bold tracking-wide text-ink">
                {o.code}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setDoneOrders(null);
            setStage("cart");
          }}
          className="mt-7 w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-deep"
        >
          Lanjut Belanja
        </button>
      </motion.div>
    );
  }

  /* ---------- Keranjang kosong ---------- */
  if (cart.groups.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-sand bg-cream p-12 text-center">
        <ShoppingBag className="mx-auto h-14 w-14 text-ink/25" />
        <h1 className="mt-4 text-xl font-extrabold text-ink">
          Keranjang masih kosong
        </h1>
        <p className="mt-1 text-sm text-ink/50">
          Yuk lihat-lihat produk dari toko-toko Dagangara.
        </p>
      </div>
    );
  }

  /* ---------- Halaman keranjang / checkout ---------- */
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
          {stage === "cart" ? "Keranjang" : "Checkout"}
        </h1>
        <p className="mt-1 text-sm text-ink/50">
          {cart.count} produk · {cart.groups.length} toko — tiap toko
          dikemas & dikirim terpisah.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {cart.groups.map((g) => (
            <div
              key={g.store.id}
              className="overflow-hidden rounded-2xl border border-sand bg-cream"
            >
              <div className="flex items-center gap-3 border-b border-sand bg-white px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white">
                  {g.store.name[0]}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{g.store.name}</p>
                  <p className="flex items-center gap-1 text-xs text-ink/45">
                    <MapPin className="h-3 w-3" /> {g.store.city} · rating{" "}
                    {g.store.rating}
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold text-primary-deep">
                  {g.lines.length} produk
                </span>
              </div>

              <div className="divide-y divide-sand/70">
                {g.lines.map((l) => (
                  <div
                    key={l.key}
                    className="flex items-center gap-3 px-4 py-3.5"
                  >
                    <img
                      src={l.product.photo}
                      alt={l.product.name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-semibold text-ink">
                        {l.product.name}
                      </p>
                      <p className="text-xs text-ink/45">Varian: {l.variant}</p>
                      <p className="mt-0.5 text-sm font-bold text-primary">
                        {rupiah(l.product.price * l.qty)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 rounded-lg border border-sand bg-white p-0.5">
                        <button
                          onClick={() => cart.changeQty(l.key, -1)}
                          aria-label="Kurangi"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-ink/60 hover:bg-sand"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-ink">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => cart.changeQty(l.key, 1)}
                          aria-label="Tambah"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-ink/60 hover:bg-sand"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.remove(l.key)}
                        className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1 border-t border-sand bg-white px-4 py-3 text-sm">
                <div className="flex justify-between text-ink/60">
                  <span>Subtotal {g.store.name}</span>
                  <span className="font-semibold text-ink">
                    {rupiah(g.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-ink/60">
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-4 w-4" /> Ongkir
                    {g.subtotal >= GRATIS_ONGKIR_MIN && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                        Gratis
                      </span>
                    )}
                  </span>
                  <span
                    className={`font-semibold ${ongkirStore(g.subtotal) === 0 ? "text-emerald-600" : "text-ink"}`}
                  >
                    {ongkirStore(g.subtotal) === 0
                      ? "Rp0"
                      : rupiah(ongkirStore(g.subtotal))}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {stage === "checkout" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 rounded-2xl border border-sand bg-cream p-5"
            >
              <div>
                <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-ink/50">
                  <MapPin className="h-4 w-4" /> Alamat Pengiriman
                </h2>
                <div className="mt-2.5 rounded-xl border border-sand bg-white p-4 text-sm">
                  <p className="font-bold text-ink">Rizky Ananda · 0812-xxxx-5678</p>
                  <p className="mt-0.5 text-ink/60">
                    Jl. Cempaka Putih No. 24, Kec. Sumur Bandung, Kota Bandung,
                    Jawa Barat 40112
                  </p>
                  <p className="mt-1 text-xs text-ink/40">
                    (Alamat contoh untuk demo)
                  </p>
                </div>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-ink/50">
                  <CreditCard className="h-4 w-4" /> Metode Pembayaran
                </h2>
                <div className="mt-2.5 space-y-2">
                  {PAYMENTS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                        payment === m.id
                          ? "border-primary bg-primary-soft/50"
                          : "border-sand bg-white hover:border-primary/40"
                      }`}
                    >
                      <m.icon
                        className={`h-5 w-5 ${payment === m.id ? "text-primary" : "text-ink/40"}`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-ink">{m.label}</p>
                        <p className="text-xs text-ink/45">{m.note}</p>
                      </div>
                      {payment === m.id && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Ringkasan belanja */}
        <div className="h-fit rounded-2xl border border-sand bg-cream p-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-ink/50">
            Ringkasan Belanja
          </h2>
          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-ink/60">
              <span>Total produk ({cart.count})</span>
              <span className="font-semibold text-ink">{rupiah(cart.total)}</span>
            </div>
            <div className="flex justify-between text-ink/60">
              <span>Total ongkir</span>
              <span className="font-semibold text-ink">
                {totalOngkir === 0 ? "Gratis" : rupiah(totalOngkir)}
              </span>
            </div>
            {biayaLayanan > 0 && (
              <div className="flex justify-between text-ink/60">
                <span>Biaya layanan COD</span>
                <span className="font-semibold text-ink">
                  {rupiah(biayaLayanan)}
                </span>
              </div>
            )}
            <div className="border-t border-dashed border-sand pt-3">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-ink">Total Bayar</span>
                <span className="text-xl font-extrabold text-primary">
                  {rupiah(grandTotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink/40">
                Gratis ongkir per toko untuk subtotal ≥{" "}
                {rupiah(GRATIS_ONGKIR_MIN)}.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {stage === "cart" ? (
              <button
                onClick={() => setStage("checkout")}
                className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-deep"
              >
                Checkout ({cart.groups.length} Toko)
              </button>
            ) : (
              <>
                <button
                  onClick={confirmOrder}
                  className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-deep"
                >
                  Buat Pesanan
                </button>
                <button
                  onClick={() => setStage("cart")}
                  className="w-full rounded-xl border border-sand bg-white px-5 py-3 text-sm font-bold text-ink/60 transition-colors hover:text-ink"
                >
                  Kembali
                </button>
              </>
            )}
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-ink/35">
            Checkout simulasi — tidak ada pembayaran nyata.
          </p>
        </div>
      </div>
    </div>
  );
}
