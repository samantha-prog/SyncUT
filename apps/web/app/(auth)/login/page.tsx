"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Ingresa email y contrasena para continuar.");
      return;
    }

    window.localStorage.setItem(
      "syncut_beta_session",
      JSON.stringify({
        email,
        role: email.includes("admin") ? "admin" : "student",
        loggedAt: new Date().toISOString(),
      })
    );

    router.push("/");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">SyncUT</h1>
        <p className="text-slate-400 mt-2">Plataforma Universitaria Integral</p>
      </div>

      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Inicia Sesión</h2>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@university.edu"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Inicia Sesión
          </button>
        </form>
        {message ? <p className="mt-3 text-xs font-semibold text-amber-300">{message}</p> : null}

        <p className="text-center text-slate-400 mt-4">
          ¿No tienes cuenta?{" "}
          <Link href="/signup" className="text-green-500 hover:text-green-400">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
