import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginWithLocal } from "../lib/auth";

export default function Login() {
  const nav = useNavigate();
  const loc = useLocation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      // “Fake login”: guarda en localStorage
      loginWithLocal(email.trim(), password);
      const from = (loc.state as any)?.from?.pathname || "/admin";
      nav(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold mb-2">Ingresar</h1>
      <p className="text-sm text-slate-600 dark:text-neutral-400 mb-4">
        Usa cualquier correo y contraseña (modo demo).
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm">Correo</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-slate-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900"
            placeholder="admin@petshop.cl"
          />
        </div>

        <div>
          <label className="text-sm">Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-slate-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-white dark:bg-neutral-900"
            placeholder="••••••"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-lg py-2 disabled:opacity-60"
        >
          {loading ? "Ingresando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
