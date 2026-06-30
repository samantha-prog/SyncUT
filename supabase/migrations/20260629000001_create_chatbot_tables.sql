-- ==============================================================================
-- MIGRACIÓN: MÓDULO DE CHATBOT (Squad 6) - NAVEGACIÓN POR TABLAS
-- Fecha de creación: 2026-06-29
-- El chatbot NO usa IA: el usuario navega categoría -> subcategoría -> pregunta
-- y recibe una respuesta predefinida. Si no hay respuesta, se muestra contacto
-- humano (chatbot_contact_info), editable a futuro desde una vista admin.
-- ==============================================================================

-- 1. CATEGORÍAS
CREATE TABLE IF NOT EXISTS public.chatbot_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SUBCATEGORÍAS
CREATE TABLE IF NOT EXISTS public.chatbot_subcategories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   UUID NOT NULL REFERENCES public.chatbot_categories(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL,
  description   TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (category_id, slug)
);

-- 3. PREGUNTAS Y RESPUESTAS
CREATE TABLE IF NOT EXISTS public.chatbot_questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subcategory_id  UUID NOT NULL REFERENCES public.chatbot_subcategories(id) ON DELETE CASCADE,
  question        TEXT NOT NULL,
  answer          TEXT NOT NULL,
  display_order   INTEGER NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. DATOS DE CONTACTO (fallback cuando no hay respuesta para el usuario)
CREATE TABLE IF NOT EXISTS public.chatbot_contact_info (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label         TEXT NOT NULL,
  email         TEXT,
  phone         TEXT,
  notes         TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- ÍNDICES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_chatbot_categories_display_order ON public.chatbot_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_chatbot_subcategories_category_id ON public.chatbot_subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_questions_subcategory_id ON public.chatbot_questions(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_contact_info_display_order ON public.chatbot_contact_info(display_order);

-- ==============================================================================
-- ROW LEVEL SECURITY
-- Lectura: cualquier usuario autenticado ve filas activas; los admin ven todo.
-- Escritura: solo admin (la vista administrativa futura usará este rol).
-- ==============================================================================
ALTER TABLE public.chatbot_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chatbot_categories_select_policy" ON public.chatbot_categories FOR SELECT TO authenticated
USING (
  is_active = TRUE
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "chatbot_categories_write_policy" ON public.chatbot_categories FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_categories_update_policy" ON public.chatbot_categories FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_categories_delete_policy" ON public.chatbot_categories FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_subcategories_select_policy" ON public.chatbot_subcategories FOR SELECT TO authenticated
USING (
  is_active = TRUE
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "chatbot_subcategories_write_policy" ON public.chatbot_subcategories FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_subcategories_update_policy" ON public.chatbot_subcategories FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_subcategories_delete_policy" ON public.chatbot_subcategories FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_questions_select_policy" ON public.chatbot_questions FOR SELECT TO authenticated
USING (
  is_active = TRUE
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "chatbot_questions_write_policy" ON public.chatbot_questions FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_questions_update_policy" ON public.chatbot_questions FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_questions_delete_policy" ON public.chatbot_questions FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_contact_info_select_policy" ON public.chatbot_contact_info FOR SELECT TO authenticated
USING (
  is_active = TRUE
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "chatbot_contact_info_write_policy" ON public.chatbot_contact_info FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_contact_info_update_policy" ON public.chatbot_contact_info FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "chatbot_contact_info_delete_policy" ON public.chatbot_contact_info FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ==============================================================================
-- SEED MÍNIMO: contacto de respaldo para que el bot nunca quede sin fallback.
-- ==============================================================================
INSERT INTO public.chatbot_contact_info (label, email, phone, notes, display_order)
SELECT 'Soporte general SyncUT', 'soporte@syncut.edu', '+52 55 0000 0000', 'Atiende dudas que el chatbot no pudo resolver.', 0
WHERE NOT EXISTS (SELECT 1 FROM public.chatbot_contact_info);
