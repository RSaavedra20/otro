// src/components/Header.tsx
import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getUser, logout } from "../lib/auth";

export default function Header() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [params] = useSearchParams();

  const [q, setQ] = React.useState(params.get("q") ?? "");
  const [user, setUser] = React.useState(getUser());
  const dirtyRef = React.useRef(false); // para saber si el usuario escribió

  // Mantener el input sincronizado SOLO en Home; en otras páginas vaciamos
  React.useEffect(() => {
    if (isHome) setQ(params.get("q") ?? "");
    else setQ("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isHome]);

  // 🔔 Debounce: solo en Home y solo si el usuario escribió
  React.useEffect(() => {
    if (!isHome || !dirtyRef.current) return;
    const value = q.trim();
    const t = setTimeout(() => {
      nav(value ? `/?q=${encodeURIComponent(value)}` : "/", { replace: true });
    }, 300);
    return () => clearTimeout(t);
  }, [q, isHome, nav]);

  // Enviar (Enter/Botón) → navega (desde cualquier página)
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const value = q.trim();
    dirtyRef.current = false; // ya navegamos manualmente
    nav(value ? `/?q=${encodeURIComponent(value)}` : "/");
  };

  // Marcar que el usuario escribe (habilita debounce)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dirtyRef.current = true;
    setQ(e.target.value);
  };

  const clearSearch = () => {
    setQ("");
    dirtyRef.current = false;
    if (isHome) nav("/", { replace: true }); // solo forzamos navegación en Home
  };

  // Escuchar sesión en otras pestañas
  React.useEffect(() => {
    const onChange = () => setUser(getUser());
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
  }, []);

  const onLogout = () => {
    logout();
    setUser(null);
    nav("/", { replace: true });
  };

  return (
    <header className="border-b border-slate-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
      <div className="container max-w-screen-xl h-14 flex items-center gap-4">
        <Link
          to="/"
          className="font-semibold text-brand-700 dark:text-brand-300"
        >
          PetShop
        </Link>

        <form onSubmit={onSearch} className="ml-auto flex items-center gap-2">
          <div className="relative">
            <input
              value={q}
              onChange={onChange}
              placeholder="¿Qué necesita tu mascota?"
              className="h-9 w-[46vw] max-w-[520px] rounded-full border
                         border-slate-300 dark:border-neutral-700
                         bg-white dark:bg-neutral-900 pl-4 pr-20 text-sm outline-none
                         focus:ring-2 focus:ring-brand-300 dark:focus:ring-brand-800"
            />
            {q && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-16 top-1/2 -translate-y-1/2 px-2 text-slate-500 hover:text-slate-700 dark:hover:text-neutral-200"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-600 hover:bg-brand-500 text-white rounded-full px-4 py-1.5 text-sm"
            >
              Buscar
            </button>
          </div>
        </form>

        <nav className="ml-2 flex items-center gap-2 text-sm">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                Ingresar
              </Link>
              <Link
                to="/carrito"
                className="px-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                🛒 Carrito
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/admin"
                className="px-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                Admin
              </Link>
              <Link
                to="/carrito"
                className="px-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                🛒 Carrito
              </Link>
              <button
                onClick={onLogout}
                className="px-3 py-1 rounded-full bg-brand-600 text-white hover:bg-brand-500"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>

      <div className="border-t border-slate-200/70 dark:border-neutral-800/70">
        <div className="container max-w-screen-xl py-2 text-sm text-slate-600 dark:text-neutral-300">
          👑 Member — Ahorra y recibe antes
        </div>
      </div>
    </header>
  );
}
