import Link from "next/link";

const routes = [
  {
    href: "/login",
    title: "Acceso",
    description: "Inicio de sesion del ecosistema universitario.",
    accent: "from-cyan-500 to-sky-600",
  },
  {
    href: "/signup",
    title: "Registro",
    description: "Alta de usuarios para estudiantes y personal.",
    accent: "from-lime-500 to-emerald-600",
  },
  {
    href: "/citas",
    title: "Citas",
    description: "Agenda academica con seguimiento de atencion.",
    accent: "from-blue-500 to-indigo-600",
  },
  {
    href: "/justificaciones",
    title: "Justificaciones",
    description: "Carga y revision de evidencias de inasistencia.",
    accent: "from-teal-500 to-cyan-600",
  },
  {
    href: "/notificaciones",
    title: "Notificaciones",
    description: "Centro de avisos criticos y mensajeria institucional.",
    accent: "from-rose-500 to-red-600",
  },
  {
    href: "/incidencias",
    title: "Incidencias",
    description: "Reporte de casos, prioridad y seguimiento.",
    accent: "from-amber-500 to-orange-600",
  },
  {
    href: "/chatbot",
    title: "Chatbot",
    description: "Asistente de preguntas frecuentes y soporte inicial.",
    accent: "from-fuchsia-500 to-pink-600",
  },
  {
    href: "/dashboard",
    title: "Dashboard Gerencial",
    description: "Vista ejecutiva extra para equipo de direccion.",
    accent: "from-slate-700 to-slate-900",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe_0%,_#f8fafc_35%,_#fff7ed_100%)] px-6 py-10 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-2xl shadow-blue-100/40 backdrop-blur md:p-10">
          <p className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            SyncUT en Produccion
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Plataforma Universitaria con rutas reales y navegacion activa
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            Esta vista funciona como mockup de entrada para Vercel y conecta con los
            modulos reales del proyecto. Incluye acceso directo al panel gerencial
            en ruta separada para supervision ejecutiva.
          </p>

          <nav className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${route.accent}`}
                >
                  {route.title}
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900">{route.href}</p>
                <p className="mt-1 text-xs text-slate-600">{route.description}</p>
                <p className="mt-3 text-xs font-bold text-slate-900 transition-transform group-hover:translate-x-1">
                  Abrir modulo -&gt;
                </p>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
