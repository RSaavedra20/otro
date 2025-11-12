export default function NotFound() {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Página no encontrada
      </p>
      <a
        href="/"
        className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg"
      >
        Volver al inicio
      </a>
    </div>
  );
}
