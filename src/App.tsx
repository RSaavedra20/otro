import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin/Admin";
import NotFound from "./Pages/NotFound";

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
    </BrowserRouter>
  );
}
