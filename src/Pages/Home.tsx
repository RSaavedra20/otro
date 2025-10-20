// src/pages/Home.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { type Product, listProducts } from "../lib/Catalog";

const categories = [
  { slug: "seco-perro", label: "Seco perro", icon: "🥣" },
  { slug: "snacks-perro", label: "Snacks perro", icon: "🍪" },
  { slug: "antiparasitarios", label: "Antiparasitarios", icon: "🦟" },
  { slug: "humedo-perro", label: "Húmedo perro", icon: "🥫" },
  { slug: "seco-gato", label: "Seco gato", icon: "🍚" },
  { slug: "snacks-gato", label: "Snacks gato", icon: "🍘" },
  { slug: "arenas-gato", label: "Arenas gato", icon: "🧻" },
];

const CLP = new Intl.NumberFormat("es-CL");

function CategoryChips({
  value,
  onChange,
}: {
  value?: string;
  onChange: (slug?: string) => void;
}) {
  return (
    <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
      <div className="flex gap-3 min-w-max pr-2 snap-x snap-mandatory">
        <button
          type="button"
          aria-pressed={!value}
          onClick={() => onChange(undefined)}
          className={`snap-start px-4 py-2 rounded-xl border text-sm
            ${
              !value
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-200"
            }`}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            aria-pressed={value === c.slug}
            onClick={() => onChange(value === c.slug ? undefined : c.slug)}
            className={`snap-start flex items-center gap-2 px-4 py-2 rounded-xl border text-sm
              ${
                value === c.slug
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-200"
              }`}
            title={c.label}
          >
            <span className="text-lg">{c.icon}</span>
            <span>{c.label}</span>
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
    <article className="bg-white dark:bg-neutral-900 rounded-2xl p-3 sm:p-4 shadow-card hover:shadow transition flex flex-col border border-slate-200 dark:border-neutral-800">
      <Link to={`/producto/${p.slug}`} className="block">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full aspect-square object-cover rounded-xl bg-slate-100 dark:bg-neutral-800"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1558944351-c1f18b57b2a5?q=80&w=800&auto=format&fit=crop";
          }}
        />
      </Link>

      <div className="mt-3 flex-1">
        <div className="flex items-center gap-2 mb-1 min-h-6">
          {hasOff && (
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
              -{off}%
            </span>
          )}
          {!inStock && (
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">
              Sin stock
            </span>
          )}
        </div>
        <Link to={`/producto/${p.slug}`} className="block">
          <h3 className="font-medium text-sm sm:text-base text-slate-900 dark:text-neutral-100 line-clamp-2">
            {p.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          {p.brand}
        </p>
      </div>

      <div className="mt-2">
        <div className="flex items-end gap-2">
          <span className="text-base sm:text-lg font-semibold text-slate-900 dark:text-neutral-100">
            ${CLP.format(p.price)}
          </span>
          {hasOff && (
            <span className="text-xs sm:text-sm line-through text-slate-400">
              ${CLP.format(p.compareAtPrice!)}
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
          onClick={() => alert("Agregar al carrito (demo)")}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const [all, setAll] = useState<Product[]>(() => listProducts());

  // Refrescar Home si el catálogo cambia (p.ej., desde Admin)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "petshop:catalog") setAll(listProducts());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ✅ query desde el router (si está vacío, NO filtra → muestra todo)
  const { search } = useLocation();
  const q = (new URLSearchParams(search).get("q") || "").trim().toLowerCase();

  const [cat, setCat] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<"popular" | "asc" | "desc">("popular");

  const filtered = useMemo(() => {
    let arr = all;
    if (q) {
      arr = arr.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    if (cat) arr = arr.filter((p) => p.category === cat);
    if (sort === "asc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "desc") arr = [...arr].sort((a, b) => b.price - a.price);
    return arr;
  }, [q, cat, sort, all]);

  const hasFilters = Boolean(cat || sort !== "popular");

  const clearFilters = () => {
    setCat(undefined);
    setSort("popular");
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <section className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 border border-slate-200 dark:border-neutral-800">
        <h1 className="text-2xl md:text-3xl font-bold">
          Todo para tu mascota en un solo lugar
        </h1>
        <p className="text-slate-700 dark:text-neutral-300">
          Alimentos, snacks, arenas, antiparasitarios y más.
        </p>
      </section>

      {/* Controles */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h2 className="text-lg sm:text-xl font-semibold flex-1">
            Categorías destacadas
          </h2>

          <div className="flex items-center gap-2 text-sm">
            {q && (
              <span className="text-slate-500 dark:text-neutral-400">
                Buscando:{" "}
                <strong className="text-slate-700 dark:text-neutral-200">
                  “{q}”
                </strong>
              </span>
            )}
            <span className="text-slate-500 dark:text-neutral-400">
              Ordenar:
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="border rounded-lg px-2 py-1 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
            >
              <option value="popular">Popular</option>
              <option value="asc">Precio ↑</option>
              <option value="desc">Precio ↓</option>
            </select>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="ml-1 px-3 py-1 rounded-lg border border-slate-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/10"
                title="Limpiar filtros (categoría/orden)"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <CategoryChips value={cat} onChange={setCat} />
      </section>

      {/* Productos */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold">Los favoritos</h2>
          <Link
            to="/"
            className="text-brand-700 dark:text-brand-300 hover:underline text-sm"
          >
            Ver todo
          </Link>
        </div>

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
      </section>
    </div>
  );
}
