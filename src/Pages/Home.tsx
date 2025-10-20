import React, { useMemo } from "react";
import Page from "../components/layout/Page";

const categories = [
  { slug: "seco-perro", label: "Seco perro", icon: "🥣" },
  { slug: "snacks-perro", label: "Snacks perro", icon: "🍪" },
  { slug: "antiparasitarios", label: "Antiparasitarios", icon: "🦟" },
  { slug: "humedo-perro", label: "Húmedo perro", icon: "🥫" },
  { slug: "seco-gato", label: "Seco gato", icon: "🍚" },
  { slug: "snacks-gato", label: "Snacks gato", icon: "🍘" },
  { slug: "arenas-gato", label: "Arenas gato", icon: "🧻" },
];

type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  category: string;
};

const products: Product[] = [
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

/* — UI genérica — */
function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function CategoriesCarousel() {
  return (
    <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
      <div className="flex gap-3 min-w-max pr-2 snap-x snap-mandatory">
        {categories.map((c) => (
          <button
            key={c.slug}
            className="snap-start flex flex-col items-center gap-2
                       bg-white dark:bg-neutral-900 rounded-2xl p-4
                       shadow-card hover:shadow transition
                       border border-slate-200 dark:border-neutral-800"
            title={c.label}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 grid place-items-center
                            text-2xl sm:text-3xl bg-slate-100 dark:bg-neutral-800 rounded-full"
            >
              {c.icon}
            </div>
            <div
              className="text-xs sm:text-sm font-medium whitespace-nowrap
                            text-slate-700 dark:text-neutral-200"
            >
              {c.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const hasOff = p.compareAtPrice && p.compareAtPrice > p.price;
  const off = hasOff
    ? Math.round((1 - p.price / (p.compareAtPrice as number)) * 100)
    : 0;
  const inStock = p.stock > 0;

  return (
    <article
      className="bg-white dark:bg-neutral-900 rounded-2xl p-3 sm:p-4
                        shadow-card hover:shadow transition flex flex-col
                        border border-slate-200 dark:border-neutral-800"
    >
      <a href={`/producto/${p.slug}`} className="block">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full aspect-square object-cover rounded-xl
                     bg-slate-100 dark:bg-neutral-800"
        />
      </a>

      <div className="mt-3 flex-1">
        <div className="flex items-center gap-2 mb-1 min-h-6">
          {hasOff && (
            <span
              className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full
                             bg-amber-100 text-amber-700"
            >
              -{off}%
            </span>
          )}
          {!inStock && (
            <span
              className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full
                             bg-slate-200 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300"
            >
              Sin stock
            </span>
          )}
        </div>
        <a href={`/producto/${p.slug}`} className="block">
          <h3
            className="font-medium text-sm sm:text-base
                         text-slate-900 dark:text-neutral-100 line-clamp-2"
          >
            {p.name}
          </h3>
        </a>
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          {p.brand}
        </p>
      </div>

      <div className="mt-2">
        <div className="flex items-end gap-2">
          <span
            className="text-base sm:text-lg font-semibold
                           text-slate-900 dark:text-neutral-100"
          >
            ${p.price.toLocaleString()}
          </span>
          {hasOff && (
            <span className="text-xs sm:text-sm line-through text-slate-400">
              ${p.compareAtPrice?.toLocaleString()}
            </span>
          )}
        </div>
        <button
          disabled={!inStock}
          className={`mt-3 w-full rounded-xl py-2 text-sm font-medium transition
            ${
              inStock
                ? "bg-brand-600 text-white hover:bg-brand-500"
                : "bg-slate-200 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400 cursor-not-allowed"
            }`}
        >
          Agregar
        </button>
      </div>
    </article>
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
    <Page>
      {/* Banner que funciona en ambos temas */}
      <section
        className="rounded-2xl p-5 sm:p-6
                          bg-gradient-to-r from-brand-50 to-purple-50
                          dark:from-brand-900/20 dark:to-purple-900/20
                          border border-slate-200 dark:border-neutral-800"
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          Todo para tu mascota en un solo lugar
        </h1>
        <p className="text-slate-700 dark:text-neutral-300">
          Alimentos, snacks, arenas, antiparasitarios y más.
        </p>
      </section>

      <Section title="Categorías destacadas">
        <CategoriesCarousel />
      </Section>

      <Section
        title="Los favoritos"
        action={
          <a
            href="/"
            className="text-brand-700 dark:text-brand-300 hover:underline text-sm"
          >
            Ver todo
          </a>
        }
      >
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-slate-500 dark:text-neutral-400 mt-4">
            No encontramos resultados para tu búsqueda.
          </p>
        )}
      </Section>
    </Page>
  );
}
