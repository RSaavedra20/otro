import { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-purple-700 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-purple-200 transition"
        >
          Carpishop
        </Link>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {/* Icono hamburguesa */}
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menú Desktop */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          {[
            { to: "/", label: "Inicio" },
            { to: "/productos", label: "Productos" },
            { to: "/productos/alimento", label: "Alimento" },
            { to: "/productos/accesorios", label: "Accesorios" },
            { to: "/productos/remeras", label: "Snack" },
            { to: "/productos/buzos", label: "Buzos" },
            { to: "/nosotros", label: "Nosotros" },
            { to: "/contacto", label: "Contacto" },
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="relative group hover:text-purple-200 transition"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}

          <CartWidget />
        </ul>
      </div>

      {/* Menú móvil */}
      {open && (
        <ul className="md:hidden flex flex-col bg-purple-800 text-white px-6 pb-4 gap-4 font-medium shadow-inner">
          {[
            { to: "/", label: "Inicio" },
            { to: "/productos", label: "Productos" },
            { to: "/productos/medias", label: "Alimento" },
            { to: "/productos/pantalones", label: "Accesorios" },
            { to: "/productos/remeras", label: "Snack" },
            { to: "/productos/buzos", label: "Buzos" },
            { to: "/nosotros", label: "Nosotros" },
            { to: "/contacto", label: "Contacto" },
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block py-2 hover:text-purple-300 transition"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}

          <CartWidget />
        </ul>
      )}
    </nav>
  );
}
