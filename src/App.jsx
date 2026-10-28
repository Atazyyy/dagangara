import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./components/Catalog";
import ProductModal from "./components/ProductModal";
import CartView from "./components/CartView";
import VendorPanel from "./components/VendorPanel";
import { useCart } from "./hooks/useCart";
import { useVendor } from "./hooks/useVendor";

export default function App() {
  const [view, setView] = useState("katalog");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cart = useCart();
  const vendor = useVendor();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
      <Header view={view} onNavigate={setView} cartCount={cart.count} />

      <main className="flex-1 pb-8">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {view === "katalog" && (
                <Catalog onOpenProduct={setSelectedProduct} />
              )}
              {view === "keranjang" && <CartView cart={cart} />}
              {view === "toko" && <VendorPanel vendor={vendor} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer onNavigate={setView} />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={(p, variant, qty) => cart.add(p, variant, qty)}
      />
    </div>
  );
}
