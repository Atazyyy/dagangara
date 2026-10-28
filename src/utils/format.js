export const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

export const shortRupiah = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(".0", "") + "jt";
  if (n >= 1000) return Math.round(n / 1000) + "rb";
  return String(n);
};

export const WA_NUMBER = "6281234567890";

export const waLink = (storeName, product) => {
  const text = product
    ? `Halo ${storeName}, saya tertarik dengan produk "${product.name}" di Dagangara. Masih tersedia?`
    : `Halo ${storeName}, saya mau tanya-tanya soal produk Anda di Dagangara.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const orderCode = () =>
  "DGR-" + Math.random().toString(36).slice(2, 8).toUpperCase();
