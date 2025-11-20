import { useForm } from "react-hook-form";

const Contacto = () => {
  const { register, handleSubmit } = useForm();

  const enviar = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-purple-600 text-center mb-8">
        Contacto
      </h1>

      <form
        className="bg-white shadow-md rounded-xl p-6 border border-gray-200 flex flex-col gap-4"
        onSubmit={handleSubmit(enviar)}
      >
        <input
          type="text"
          placeholder="Ingresá tu nombre"
          {...register("nombre")}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />

        <input
          type="email"
          placeholder="Ingresá tu e-mail"
          {...register("email")}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />

        <input
          type="phone"
          placeholder="Ingresá tu teléfono"
          {...register("telefono")}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
