import React from "react";

function ThemeToggle() {
  const onToggle = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  return (
    <button
      onClick={onToggle}
      className="h-9 px-3 rounded-full border border-slate-300 dark:border-neutral-700
                 bg-white/70 dark:bg-neutral-900/70 text-sm text-slate-700 dark:text-neutral-200
                 hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition"
      title="Cambiar tema"
    >
      Tema
    </button>
  );
}

export default function Page({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-white text-slate-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
        <div className="container max-w-screen-xl h-14 flex items-center gap-3">
          <a
            href="/"
            className="font-semibold text-brand-700 dark:text-brand-300"
          >
            PetShop
          </a>

          {/* Buscador */}
          <form action="/" className="ml-auto flex items-center gap-2">
            <input
              name="q"
              placeholder="¿Qué necesita tu mascota?"
              className="h-9 w-[48vw] max-w-[520px] rounded-full
                         border border-slate-300 dark:border-neutral-700
                         bg-white dark:bg-neutral-900
                         px-4 text-sm outline-none
                         focus:ring-2 focus:ring-brand-300 dark:focus:ring-brand-800"
            />
            <button className="h-9 px-4 rounded-full bg-brand-600 text-white text-sm hover:bg-brand-500 transition">
              Buscar
            </button>
          </form>

          <nav className="ml-4 flex items-center gap-3 text-sm">
            <a
              href="/login"
              className="hover:text-brand-700 dark:hover:text-brand-300"
            >
              Ingresar
            </a>
            <a
              href="/carrito"
              className="hover:text-brand-700 dark:hover:text-brand-300"
            >
              Carrito
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container max-w-screen-xl py-6 sm:py-8">
        {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
        {children}
      </main>

      <footer className="border-t border-slate-200 dark:border-neutral-800 py-6 text-center text-sm text-slate-500 dark:text-neutral-400">
        © {new Date().getFullYear()} PetShop — Envíos 24/48h
      </footer>
    </div>
  );
}
