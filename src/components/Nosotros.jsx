import React, { useEffect } from "react";

const Nosotros = () => {
  useEffect(() => {
    const clickear = () => {
      console.log("Click");
    };

    window.addEventListener("click", clickear);

    return () => {
      window.removeEventListener("click", clickear);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="main-title">Nosotros</h1>
      <p class="font-serif">Este es el componente "Nosotros"</p>
      <h1 className="text-4xl font-bold text-blue-500">Tailwind funciona</h1>
    </div>
  );
};

export default Nosotros;
