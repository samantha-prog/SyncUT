"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage("Completa todos los campos para crear la cuenta.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("La confirmacion no coincide con la contrasena.");
      return;
    }

    const raw = window.localStorage.getItem("syncut_beta_users");
    const users = raw ? (JSON.parse(raw) as Array<{ fullName: string; email: string; password: string }>) : [];
    if (users.some((entry) => entry.email === email)) {
      setMessage("Ese email ya existe en la beta.");
      return;
    }

    users.push({ fullName, email, password });
    window.localStorage.setItem("syncut_beta_users", JSON.stringify(users));
    router.push("/login");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">SyncUT</h1>
        <p className="text-slate-400 mt-2">Plataforma Universitaria Integral</p>
      </div>

      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Crear Cuenta</h2>
        
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Juan Pérez García"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Crear Cuenta
          </button>
        </form>
        {message ? <p className="mt-3 text-xs font-semibold text-amber-300">{message}</p> : null}

        <p className="text-center text-slate-400 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-green-500 hover:text-green-400">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
