"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, RefreshCw, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@plataforma/sdk/client";
import type {
  ChatbotCategory,
  ChatbotContactInfo,
  ChatbotQuestion,
  ChatbotSubcategory,
} from "./types";

// ---------------------------------------------------------------------------
// Modo demo: activo cuando no hay .env.local con credenciales reales.
// Para conectar a Supabase crea apps/web/.env.local:
//   NEXT_PUBLIC_SUPABASE_URL=https://<proyecto>.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
// Luego aplica la migración: pnpm db:push (con supabase CLI enlazado).
// ---------------------------------------------------------------------------
const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL;

const DEMO_CATEGORIES: ChatbotCategory[] = [
  { id: "cat-1", name: "Trámites escolares", slug: "tramites", description: null, display_order: 0 },
  { id: "cat-2", name: "Calendario académico", slug: "calendario", description: null, display_order: 1 },
  { id: "cat-3", name: "Soporte técnico", slug: "soporte", description: null, display_order: 2 },
];
const DEMO_SUBCATEGORIES: Record<string, ChatbotSubcategory[]> = {
  "cat-1": [
    { id: "sub-1", category_id: "cat-1", name: "Constancias", slug: "constancias", description: null, display_order: 0 },
    { id: "sub-2", category_id: "cat-1", name: "Reinscripción", slug: "reinscripcion", description: null, display_order: 1 },
  ],
  "cat-2": [
    { id: "sub-3", category_id: "cat-2", name: "Fechas importantes", slug: "fechas", description: null, display_order: 0 },
  ],
  "cat-3": [],
};
const DEMO_QUESTIONS: Record<string, ChatbotQuestion[]> = {
  "sub-1": [
    { id: "q-1", subcategory_id: "sub-1", question: "¿Cómo solicito una constancia de estudios?", answer: "Descarga el formato en el portal institucional, fírmalo y entrégalo en ventanilla D-103. El tiempo de entrega es de 3 días hábiles.", display_order: 0 },
    { id: "q-2", subcategory_id: "sub-1", question: "¿Cuánto cuesta una constancia?", answer: "Las constancias de estudios no tienen costo para alumnos activos. Solo pagas si requieres apostilla o traducción oficial.", display_order: 1 },
  ],
  "sub-2": [
    { id: "q-3", subcategory_id: "sub-2", question: "¿Cuándo abren la reinscripción?", answer: "La reinscripción abre la última semana de cada semestre. Revisa tu correo institucional para el aviso exacto.", display_order: 0 },
  ],
  "sub-3": [
    { id: "q-4", subcategory_id: "sub-3", question: "¿Cuándo son los exámenes parciales?", answer: "Los parciales se realizan en la semana 8 y 14 del semestre. El calendario exacto se publica en el portal al inicio del periodo.", display_order: 0 },
  ],
};
const DEMO_CONTACTS: ChatbotContactInfo[] = [
  { id: "con-1", label: "Soporte general SyncUT", email: "soporte@syncut.edu", phone: "+52 55 0000 0000", notes: "Horario: lunes a viernes de 9:00 a 17:00 hrs.", display_order: 0 },
];
// ---------------------------------------------------------------------------

type ChatMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
};

type OptionKind = "category" | "subcategory" | "question" | "restart" | "contact";

type QuickOption = {
  id: string;
  label: string;
  kind: OptionKind;
  answer?: string;
};

type ChatbotWidgetProps = {
  className?: string;
};

export function ChatbotWidget({ className = "" }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [options, setOptions] = useState<QuickOption[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  function pushBot(text: string) {
    setMessages((prev) => [...prev, { id: `b-${Date.now()}-${prev.length}`, from: "bot", text }]);
  }

  function pushUser(text: string) {
    setMessages((prev) => [...prev, { id: `u-${Date.now()}-${prev.length}`, from: "user", text }]);
  }

  async function fetchCategories(): Promise<ChatbotCategory[]> {
    if (DEMO_MODE) return DEMO_CATEGORIES;
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase
      .from("chatbot_categories")
      .select("id, name, slug, description, display_order")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    return data ?? [];
  }

  async function fetchSubcategories(categoryId: string): Promise<ChatbotSubcategory[]> {
    if (DEMO_MODE) return DEMO_SUBCATEGORIES[categoryId] ?? [];
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase
      .from("chatbot_subcategories")
      .select("id, category_id, name, slug, description, display_order")
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    return data ?? [];
  }

  async function fetchQuestions(subcategoryId: string): Promise<ChatbotQuestion[]> {
    if (DEMO_MODE) return DEMO_QUESTIONS[subcategoryId] ?? [];
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase
      .from("chatbot_questions")
      .select("id, subcategory_id, question, answer, display_order")
      .eq("subcategory_id", subcategoryId)
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    return data ?? [];
  }

  async function fetchContacts(): Promise<ChatbotContactInfo[]> {
    if (DEMO_MODE) return DEMO_CONTACTS;
    const supabase = createSupabaseBrowserClient();
    const { data } = await supabase
      .from("chatbot_contact_info")
      .select("id, label, email, phone, notes, display_order")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    return data ?? [];
  }

  async function startConversation() {
    setMessages([]);
    setOptions([]);
    setLoading(true);

    const cats = await fetchCategories();
    pushBot("¡Hola! Soy el asistente de SyncUT. ¿En qué te puedo ayudar hoy?");
    setOptions(cats.map((c) => ({ id: c.id, label: c.name, kind: "category" as const })));
    setLoading(false);
  }

  async function showContactFallback() {
    setLoading(true);
    const contacts = await fetchContacts();
    if (contacts.length === 0) {
      pushBot("Por el momento no hay datos de contacto disponibles.");
    } else {
      pushBot("No encontré una respuesta para eso. Puedes contactarnos directamente:");
      for (const c of contacts) {
        const lines = [
          `📋 ${c.label}`,
          c.email ? `✉️  ${c.email}` : null,
          c.phone ? `📞  ${c.phone}` : null,
          c.notes ? `🕐  ${c.notes}` : null,
        ]
          .filter(Boolean)
          .join("\n");
        pushBot(lines);
      }
    }
    setOptions([{ id: "__restart", label: "Tengo otra pregunta", kind: "restart" }]);
    setLoading(false);
  }

  async function handleOptionClick(opt: QuickOption) {
    setOptions([]);
    pushUser(opt.label);

    if (opt.kind === "restart") {
      await startConversation();
      return;
    }

    if (opt.kind === "contact") {
      await showContactFallback();
      return;
    }

    if (opt.kind === "category") {
      setLoading(true);
      const subs = await fetchSubcategories(opt.id);
      if (subs.length === 0) {
        await showContactFallback();
      } else {
        pushBot("Perfecto. ¿Sobre qué tema exactamente?");
        setOptions(subs.map((s) => ({ id: s.id, label: s.name, kind: "subcategory" as const })));
      }
      setLoading(false);
      return;
    }

    if (opt.kind === "subcategory") {
      setLoading(true);
      const qs = await fetchQuestions(opt.id);
      if (qs.length === 0) {
        await showContactFallback();
      } else {
        pushBot("Claro. ¿Cuál es tu pregunta?");
        setOptions(qs.map((q) => ({ id: q.id, label: q.question, kind: "question" as const, answer: q.answer })));
      }
      setLoading(false);
      return;
    }

    if (opt.kind === "question") {
      pushBot(opt.answer ?? "No encontré respuesta para esa pregunta.");
      setOptions([
        { id: "__restart", label: "Tengo otra pregunta", kind: "restart" },
        { id: "__contact", label: "Necesito más ayuda", kind: "contact" },
      ]);
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, options, loading]);

  // Inicia solo cuando el panel abre; no incluir messages ni startConversation en deps evita el loop.
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 ${className}`}>
      {/* Chat panel */}
      {isOpen ? (
        <div className="flex w-80 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl" style={{ height: "30rem" }}>
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between bg-fuchsia-600 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-black text-white">
                S
              </div>
              <div>
                <p className="text-sm font-bold leading-none text-white">Asistente SyncUT</p>
                <p className="text-[10px] text-fuchsia-200">{DEMO_MODE ? "Modo demo" : "En línea"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={startConversation}
                className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                title="Reiniciar conversación"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-3">
            {messages.map((msg) =>
              msg.from === "bot" ? (
                <div key={msg.id} className="flex items-end gap-1.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-[10px] font-black text-fuchsia-600">
                    S
                  </div>
                  <p className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-800">
                    {msg.text}
                  </p>
                </div>
              ) : (
                <div key={msg.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-fuchsia-600 px-3 py-2 text-sm text-white">
                    {msg.text}
                  </p>
                </div>
              )
            )}

            {loading ? (
              <div className="flex items-end gap-1.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-[10px] font-black text-fuchsia-600">
                  S
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            ) : null}

            <div ref={bottomRef} />
          </div>

          {/* Quick-reply options */}
          {options.length > 0 && !loading ? (
            <div className="shrink-0 border-t border-slate-100 px-3 py-2">
              <div className="flex flex-col gap-1.5">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt)}
                    className="w-full rounded-xl border border-fuchsia-200 bg-fuchsia-50 px-3 py-2 text-left text-xs font-semibold text-fuchsia-700 transition-colors hover:bg-fuchsia-100"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-600 text-white shadow-lg transition-colors hover:bg-fuchsia-700"
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
