// src/lib/catalog.ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  category: string; // ej: "seco-perro"
};

const KEY = "petshop:catalog";

const seed: Product[] = [
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

function load(): Product[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return [...seed];
  }
  try {
    return JSON.parse(raw) as Product[];
  } catch {
    return [...seed];
  }
}

function save(list: Product[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function listProducts(): Product[] {
  return load();
}

export function getProduct(id: string): Product | undefined {
  return load().find((p) => p.id === id);
}

export function addProduct(
  p: Omit<Product, "id" | "slug"> & { slug?: string }
): Product {
  const items = load();
  const id = crypto.randomUUID();
  const slug = (p.slug ?? p.name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const prod: Product = { ...p, id, slug };
  items.push(prod);
  save(items);
  return prod;
}

export function updateProduct(id: string, patch: Partial<Product>) {
  const items = load();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return;
  items[idx] = { ...items[idx], ...patch };
  save(items);
}

export function deleteProduct(id: string) {
  const items = load().filter((p) => p.id !== id);
  save(items);
}

export function adjustStock(id: string, delta: number) {
  const items = load();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return;
  items[idx].stock = Math.max(0, (items[idx].stock ?? 0) + delta);
  save(items);
}
