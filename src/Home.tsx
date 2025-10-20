import React, { useMemo } from "react";

const categories = [
  { slug: "seco-perro", label: "Seco perro", icon: "🥣" },
  { slug: "snacks-perro", label: "Snacks perro", icon: "🍪" },
  { slug: "antiparasitarios", label: "Antiparasitarios", icon: "🦟" },
  { slug: "humedo-perro", label: "Húmedo perro", icon: "🥫" },
  { slug: "seco-gato", label: "Seco gato", icon: "🍚" },
  { slug: "snacks-gato", label: "Snacks gato", icon: "🍘" },
  { slug: "arenas-gato", label: "Arenas gato", icon: "🧻" },
];

const products = [
  {
    id: "p1",
    slug: "royal-canin-perro-adulto-15kg",
    name: "Royal Canin Perro Adulto 15Kg",
    brand: "Royal Canin",
    image:
      "https://images.unsplash.com/photo-1612538499019-c6e96f0ae38d?q=80&w=800&auto=format&fit=crop",
    price: 49990,
    compareAtPrice: 59990,
    stock: 8,
    category: "seco-perro",
  },
  {
    id: "p2",
    slug: "snack-training-pollo",
    name: "Snack Training Sabor Pollo 300g",
    brand: "Besties",
    image:
      "https://images.unsplash.com/photo-1558944351-c1f18b57b2a5?q=80&w=800&auto=format&fit=crop",
    price: 6990,
    stock: 0,
    category: "snacks-perro",
  },
  {
    id: "p3",
    slug: "arena-aglomerante-10kg",
    name: "Arena Aglomerante para Gatos 10Kg",
    brand: "CatPro",
    image:
      "https://images.unsplash.com/photo-1543857778-fd1fe44bd9fd?q=80&w=800&auto=format&fit=crop",
    price: 11990,
    compareAtPrice: 14990,
    stock: 22,
    category: "arenas-gato",
  },
];

function CategoriesCarousel() {
  return (
    <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
      <div className="flex gap-3 min-w-max pr-2">
        {categories.map((c) => (
          <button
            key={c.slug}
            className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-sm hover:shadow transition"
            title={c.label}
          >
            <div className="w-16 h-16 grid place-items-center text-3xl bg-gray-100 rounded-full">
              {c.icon}
            </div>
            <div className="text-sm font-medium whitespace-nowrap">
              {c.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p }) {
  const hasOff = p.compareAtPrice && p.compareAtPrice > p.price;
  const off = hasOff ? Math.round((1 - p.price / p.compareAtPrice) * 100) : 0;
  const inStock = p.stock > 0;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow transition flex flex-col">
      <img
        src={p.image}
        alt={p.name}
        className="w-full aspect-square object-cover rounded-xl bg-gray-100"
      />

      <div className="mt-3 flex-1">
        <div className="flex items-center gap-2 mb-1">
          {hasOff && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
              -{off}%
            </span>
          )}
          {!inStock && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
              Sin stock
            </span>
          )}
        </div>
        <div className="font-medium line-clamp-2">{p.name}</div>
        <div className="text-xs text-gray-500">{p.brand}</div>
      </div>

      <div className="mt-2">
        <div className="flex items-end gap-2">
          <span className="text-lg font-semibold">
            ${p.price.toLocaleString()}
          </span>
          {hasOff && (
            <span className="text-sm line-through text-gray-400">
              ${p.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button
          disabled={!inStock}
          className={`mt-3 w-full rounded-xl py-2 text-sm font-medium ${
            inStock
              ? "bg-violet-600 text-white hover:bg-violet-500"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const q = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const filtered = useMemo(() => {
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <div className="space-y-8">
      {/* banner */}
      <section className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-violet-900">
          Todo para tu mascota en un solo lugar
        </h1>
        <p className="text-violet-800">
          Alimentos, snacks, arenas, antiparasitarios y más.
        </p>
      </section>

      {/* categorías */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Categorías destacadas</h2>
        <CategoriesCarousel />
      </section>

      {/* grilla de productos */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Los favoritos</h2>
          <a href="/" className="text-violet-700 hover:underline text-sm">
            Ver todo
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-gray-500 mt-4">
            No encontramos resultados para tu búsqueda.
          </p>
        )}
      </section>
    </div>
  );
}
