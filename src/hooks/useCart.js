import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, STORES } from "../data/seed";

const KEY = "dagangara-cart-v1";

function loadInitial() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fallback ke kosong */
  }
  return [];
}

export function useCart() {
  const [items, setItems] = useState(loadInitial); // [{ key, productId, variant, qty }]

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = (product, variant, qty = 1) => {
    const key = product.id + "||" + variant;
    setItems((prev) => {
      const found = prev.find((it) => it.key === key);
      if (found) {
        return prev.map((it) =>
          it.key === key ? { ...it, qty: Math.min(product.stock, it.qty + qty) } : it
        );
      }
      return [...prev, { key, productId: product.id, variant, qty }];
    });
  };

  const changeQty = (key, delta) => {
    setItems((prev) =>
      prev
        .map((it) => {
          if (it.key !== key) return it;
          const product = PRODUCTS.find((p) => p.id === it.productId);
          const next = it.qty + delta;
          if (next <= 0) return null;
          return { ...it, qty: Math.min(product ? product.stock : 99, next) };
        })
        .filter(Boolean)
    );
  };

  const remove = (key) => setItems((prev) => prev.filter((it) => it.key !== key));
  const clear = () => setItems([]);

  // Dikelompokkan per toko: [{ store, lines: [{...item, product}], subtotal }]
  const groups = useMemo(() => {
    return STORES.map((store) => {
      const lines = items
        .filter((it) => {
          const p = PRODUCTS.find((pr) => pr.id === it.productId);
          return p && p.storeId === store.id;
        })
        .map((it) => {
          const product = PRODUCTS.find((p) => p.id === it.productId);
          return { ...it, product };
        });
      const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
      return { store, lines, subtotal };
    }).filter((g) => g.lines.length > 0);
  }, [items]);

  const count = items.reduce((s, it) => s + it.qty, 0);
  const total = groups.reduce((s, g) => s + g.subtotal, 0);

  return { items, groups, count, total, add, changeQty, remove, clear };
}
