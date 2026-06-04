import Link from "next/link";

const managementModules = [
  { href: "/citas", label: "Citas" },
  { href: "/justificaciones", label: "Justificaciones" },
  { href: "/notificaciones", label: "Notificaciones" },
  { href: "/incidencias", label: "Incidencias" },
  { href: "/chatbot", label: "Chatbot" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 md:px-10">
      <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10">
        <p className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Vista Extra
        </p>
        <h1 className="mt-4 text-3xl font-black text-slate-900 md:text-4xl">
          Panel Gerencial de SyncUT
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
          Esta ruta es solo para visualizacion ejecutiva. La navegacion principal
          de la plataforma se encuentra en la pagina de inicio.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white"
          >
            Ir al inicio de navegacion
          </Link>
          <a
            href="https://github.com/Cangregito/SyncUT/tree/main/apps/web/app/(dashboard)/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-300 px-4 py-3 text-xs font-semibold text-slate-700"
          >
            Ver plan del modulo
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Accesos rapidos para supervision
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {managementModules.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:shadow"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
