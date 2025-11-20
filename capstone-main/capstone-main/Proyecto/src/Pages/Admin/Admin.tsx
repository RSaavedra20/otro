import React from "react";
import {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
  type Product,
} from "../../lib/Catalog";

type FormState = Omit<Product, "id" | "slug"> & { id?: string };

const empty: FormState = {
  name: "",
  brand: "",
  image: "",
  price: 0,
  compareAtPrice: undefined,
  stock: 0,
  category: "seco-perro",
};

export default function Admin() {
  const [items, setItems] = React.useState<Product[]>(listProducts());
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(empty);
  const [q, setQ] = React.useState("");

  const refresh = () => setItems(listProducts());

  const openNew = () => {
    setForm(empty);
    setModalOpen(true);
  };
  const openEdit = (p: Product) => {
    const { id, slug, ...rest } = p;
    setForm({ id, ...rest });
    setModalOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.image) return;
    if (form.id) {
      updateProduct(form.id, form);
    } else {
      addProduct(form);
    }
    setModalOpen(false);
    refresh();
  };

  const onDelete = (id: string) => {
    if (!confirm("¿Eliminar producto?")) return;
    deleteProduct(id);
    refresh();
  };

  const filtered = React.useMemo(() => {
    if (!q) return items;
    const s = q.toLowerCase();
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s)
    );
  }, [items, q]);

  return (
    <section className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h1 className="text-2xl font-bold">Gestión de catálogo</h1>
        <div className="sm:ml-auto flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar producto o marca…"
            className="h-9 w-[56vw] max-w-[360px] rounded-lg border
                       border-slate-300 dark:border-neutral-700
                       bg-white dark:bg-neutral-900 px-3 text-sm outline-none"
          />
          <button
            onClick={openNew}
            className="h-9 px-4 rounded-lg bg-brand-600 text-white hover:bg-brand-500 text-sm"
          >
            Nuevo
          </button>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-slate-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <thead className="bg-slate-50 dark:bg-neutral-900">
            <tr className="text-left">
              <th className="p-3">Producto</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Categoría</th>
              <th className="p-3 w-44">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-t border-slate-200 dark:border-neutral-800"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span>${p.price.toLocaleString()}</span>
                    {p.compareAtPrice && (
                      <span className="line-through text-slate-400 text-xs">
                        ${p.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        adjustStock(p.id, -1);
                        refresh();
                      }}
                      className="px-2 rounded border border-slate-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className={`${p.stock === 0 ? "text-red-600" : ""}`}>
                      {p.stock}
                    </span>
                    <button
                      onClick={() => {
                        adjustStock(p.id, +1);
                        refresh();
                      }}
                      className="px-2 rounded border border-slate-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="px-3 py-1 rounded-lg border border-slate-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="p-6 text-slate-500" colSpan={5}>
                  Sin resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal simple */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">
                {form.id ? "Editar producto" : "Nuevo producto"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-sm px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <label className="text-sm col-span-2">
                Nombre
                <input
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-neutral-700 px-3 py-2"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </label>
              <label className="text-sm">
                Marca
                <input
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-neutral-700 px-3 py-2"
                  value={form.brand}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brand: e.target.value }))
                  }
                />
              </label>
              <label className="text-sm">
                Categoría
                <select
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-neutral-700 px-3 py-2"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                >
                  <option value="seco-perro">Seco perro</option>
                  <option value="snacks-perro">Snacks perro</option>
                  <option value="antiparasitarios">Antiparasitarios</option>
                  <option value="humedo-perro">Húmedo perro</option>
                  <option value="seco-gato">Seco gato</option>
                  <option value="snacks-gato">Snacks gato</option>
                  <option value="arenas-gato">Arenas gato</option>
                </select>
              </label>

              <label className="text-sm">
                Precio
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-neutral-700 px-3 py-2"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                />
              </label>
              <label className="text-sm">
                Precio anterior (opcional)
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-neutral-700 px-3 py-2"
                  value={form.compareAtPrice ?? 0}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      compareAtPrice: Number(e.target.value) || undefined,
                    }))
                  }
                />
              </label>

              <label className="text-sm">
                Stock
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-neutral-700 px-3 py-2"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: Number(e.target.value) }))
                  }
                />
              </label>
              <label className="text-sm col-span-1 sm:col-span-2">
                Imagen (URL)
                <input
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-neutral-700 px-3 py-2"
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                />
              </label>

              <div className="col-span-2 flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-neutral-700 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-500"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
