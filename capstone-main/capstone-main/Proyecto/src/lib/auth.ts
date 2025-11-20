export type User = {
  email: string;
  name?: string;
  role?: "admin" | "seller" | "user";
  loggedAt: number;
};

const LS_KEY = "auth:user";

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getUser();
}

export function loginWithLocal(email: string, _password: string): User {
  // Como no hay backend, aceptamos cualquier combinación NO vacía.
  // Si quieres forzar credenciales, valida aquí: ej. admin@petshop.cl / 123456
  if (!email) throw new Error("Ingresa tu correo.");
  const user: User = {
    email,
    name: email.split("@")[0],
    role: "admin",
    loggedAt: Date.now(),
  };
  localStorage.setItem(LS_KEY, JSON.stringify(user));
  window.dispatchEvent(new StorageEvent("storage", { key: LS_KEY })); // sincroniza otras pestañas
  return user;
}

export function logout() {
  localStorage.removeItem(LS_KEY);
  window.dispatchEvent(new StorageEvent("storage", { key: LS_KEY }));
}
