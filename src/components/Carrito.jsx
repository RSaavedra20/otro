import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Carrito = () => {
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-purple-600 text-center">
        Carrito
      </h1>

      {carrito.length > 0 ? (
        <>
          {carrito.map((prod) => (
            <div
              key={prod.id}
              className="bg-white shadow-md rounded-xl p-4 mb-4 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {prod.titulo}
              </h3>

              <div className="mt-2 text-gray-600">
                <p>
                  Precio unitario:{" "}
                  <span className="text-purple-600 font-semibold">
                    ${prod.precio}
                  </span>
                </p>
                <p>
                  Precio total:{" "}
                  <span className="text-purple-600 font-semibold">
                    ${prod.precio * prod.cantidad}
                  </span>
                </p>
                <p>Cantidad: {prod.cantidad}</p>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            Total a pagar:{" "}
            <span className="text-purple-600">${precioTotal()}</span>
          </h2>

          {/* BOTONES */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleVaciar}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Vaciar carrito
            </button>

            <Link
              to="/checkout"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Finalizar compra
            </Link>
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl text-gray-500 font-serif mt-10">
          El carrito está vacío :(
        </h2>
      )}
    </div>
  );
};

export default Carrito;
