import { useEffect, useState } from "react";
import { MY_STORE_ID, seedVendorOrders } from "../data/seed";

const KEY = "dagangara-vendor-v1";

const NEXT_STATUS = { Baru: "Dikemas", Dikemas: "Dikirim", Dikirim: "Selesai" };

function loadInitial() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fallback ke seed */
  }
  return { open: true, orders: seedVendorOrders() };
}

export function useVendor() {
  const [data, setData] = useState(loadInitial);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  const toggleOpen = () => setData((d) => ({ ...d, open: !d.open }));

  const advanceOrder = (id) =>
    setData((d) => ({
      ...d,
      orders: d.orders.map((o) =>
        o.id === id && NEXT_STATUS[o.status] ? { ...o, status: NEXT_STATUS[o.status] } : o
      ),
    }));

  const resetVendor = () => setData({ open: true, orders: seedVendorOrders() });

  return { myStoreId: MY_STORE_ID, ...data, toggleOpen, advanceOrder, resetVendor };
}
