import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin/Admin";
import NotFound from "./Pages/NotFound";
import PetNutritionChatbot from "./components/Chatbot/PetNutritionChatbot";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-neutral-950 dark:text-neutral-100">
        <Header />
        <main className="container max-w-screen-xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carrito"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <footer>
        <div>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  🐶🐱 NutriMascota AI
                </h1>
                <p className="text-lg text-gray-600">
                  Asistente inteligente de nutrición para perros y gatos
                </p>
              </header>

              <PetNutritionChatbot />

              <footer className="text-center mt-8 text-gray-500 text-sm">
                <p>
                  ⚠️ La información proporcionada es de carácter educativo.
                  Siempre consulta con tu veterinario.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}
