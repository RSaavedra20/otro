import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";

function Header() {
  const nav = useNavigate();
  const [q, setQ] = React.useState("");

  const onSearch = (e) => {
    e.preventDefault();
    nav(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="bg-violet-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-extrabold text-xl tracking-wide">
          🐾 PetShop
        </Link>

        {/* buscador */}
        <form onSubmit={onSearch} className="flex-1">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="¿Qué necesita tu mascota?"
              className="w-full rounded-full pl-4 pr-24 py-2 text-gray-900 outline-none"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-violet-600 hover:bg-violet-500 text-white rounded-full px-4 py-1.5 text-sm"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* acciones */}
        <nav className="flex items-center gap-2">
          <Link to="/login" className="hover:underline">
            Ingresar
          </Link>
          <Link
            to="/carrito"
            className="bg-white/10 rounded-full px-3 py-1 hover:bg-white/20"
          >
            🛒 Carrito
          </Link>
        </nav>
      </div>

      <div className="bg-violet-600">
        <div className="max-w-7xl mx-auto px-4 py-2 text-sm">
          👑 Member — Ahorra y recibe antes
        </div>
      </div>
    </header>
  );
}

function Login() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-2">Ingresar</h1>
      <p className="text-gray-500 mb-4">Usa tu correo para continuar.</p>
      <form className="space-y-3">
        <div>
          <label className="text-sm text-gray-700">Correo</label>
          <input
            type="email"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="tucorreo@dominio.com"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Contraseña</label>
          <input
            type="password"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="••••••••"
          />
        </div>
        <button className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl py-2 font-semibold">
          Entrar
        </button>
      </form>
    </div>
  );
}

function Cart() {
  return <div className="max-w-7xl mx-auto p-4">Carrito (pendiente)</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
