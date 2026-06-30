"use client";

import Link from "next/link";
import { useState } from "react";
import { ChatbotWidget } from "@/components/modules/chatbot/chatbot-widget";

export default function ChatbotPage() {
  const [status, setStatus] = useState("");

  function escalateIncident() {
    const raw = window.localStorage.getItem("syncut_beta_incidencias_v1");
    const current = raw ? (JSON.parse(raw) as Array<Record<string, string>>) : [];
    const newIncident = {
      id: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
      titulo: "Escalado desde chatbot",
      area: "Atencion digital",
      prioridad: "media",
      descripcion: "Usuario solicito escalamiento desde la conversacion beta",
      status: "abierta",
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem("syncut_beta_incidencias_v1", JSON.stringify([newIncident, ...current]));
    setStatus(`Escalamiento generado: ${newIncident.id}`);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8 md:px-10">
      <section className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-600">Squad 6</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Asistente Chatbot</h1>
          <p className="mt-2 text-sm text-slate-600">
            El asistente aparece como un botón flotante en la esquina inferior derecha. Haz clic para iniciar una conversación guiada por categorías.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Inicio</Link>
            <Link href="/incidencias" className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700">Ver incidencias</Link>
            <button onClick={escalateIncident} className="rounded-xl bg-fuchsia-600 px-4 py-2 text-xs font-semibold text-white hover:bg-fuchsia-700">
              Escalar a incidencia
            </button>
          </div>
          {status ? <p className="mt-3 text-xs font-semibold text-fuchsia-700">{status}</p> : null}
        </header>

        <ChatbotWidget />
      </section>
    </main>
  );
}
