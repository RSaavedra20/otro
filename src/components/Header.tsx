import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getUser, logout } from "../lib/auth";

export default function Header() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [q, setQ] = React.useState(params.get("q") ?? "");
  const [user, setUser] = React.useState(getUser());

  React.useEffect(() => {
    const onChange = () => setUser(getUser());
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(q ? `/?q=${encodeURIComponent(q)}` : "/");
  };

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
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="¿Qué necesita tu mascota?"
            className="h-9 w-[46vw] max-w-[520px] rounded-full border
                       border-slate-300 dark:border-neutral-700
                       bg-white dark:bg-neutral-900 px-4 text-sm outline-none
                       focus:ring-2 focus:ring-brand-300 dark:focus:ring-brand-800"
          />
          <button className="h-9 px-4 rounded-full bg-brand-600 text-white text-sm hover:bg-brand-500">
            Buscar
          </button>
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
