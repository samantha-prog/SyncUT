# 🏗️ ESTRUCTURA DE CARPETAS - DÓNDE PROGRAMA CADA SQUAD

## 📊 VISTA GLOBAL DEL PROYECTO

```
SyncUT (Proyecto Principal)
│
├── 📁 apps/web                          ← APLICACIÓN PRINCIPAL (Next.js)
│   ├── 📁 app/
│   │   ├── 📁 (auth)                    ← Squad 2: AUTENTICACIÓN
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── profile/
│   │   │
│   │   ├── 📁 (citas)                   ← Squad 3: AGENDAMIENTO DE CITAS
│   │   │   ├── page.tsx
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── 📁 (notificaciones)          ← Squad 4: SISTEMA DE NOTIFICACIONES
│   │   │   ├── page.tsx
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   ├── 📁 (justificaciones)         ← Squad 1: GESTIÓN DE DOCUMENTOS
│   │   │   ├── page.tsx
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   └── 📁 (dashboard)               ← STAFF: DASHBOARD PRINCIPAL
│   │       ├── page.tsx
│   │       ├── components/
│   │       └── hooks/
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                       ← Componentes UI compartidos (Shadcn)
│   │   └── 📁 modules/                  ← Componentes específicos por módulo
│   │
│   ├── 📁 lib/
│   │   ├── utils.ts
│   │   ├── auth.ts
│   │   └── db.ts
│   │
│   └── 📁 public/                       ← Assets (logos, imágenes)
│
├── 📁 packages/                         ← CÓDIGO COMPARTIDO
│   ├── 📁 sdk/                          ← Cliente Supabase centralizado
│   ├── 📁 types/                        ← Tipos TypeScript auto-generados
│   ├── 📁 ui/                           ← Componentes UI reutilizables
│   ├── 📁 shared/                       ← Utilidades y validadores
│   └── 📁 config/                       ← Configuraciones compartidas
│
├── 📁 supabase/
│   ├── 📁 migrations/
│   │   └── 20240516000001_init_schemas.sql    ← BD Schema (Squad 2 las crea)
│   └── 📁 tests/
│
└── 📁 docs/                             ← Documentación por squad
    ├── 📁 squad-1/
    ├── 📁 squad-2/
    ├── 📁 squad-3/
    └── 📁 squad-4/
```

---

## 🎯 DÓNDE PROGRAMA CADA SQUAD

### 🔐 SQUAD 2 - AUTENTICACIÓN (4 personas)
**Ubicación:** `apps/web/app/(auth)/`

```
(auth)/
├── login/page.tsx              ← Página de login
├── signup/page.tsx             ← Página de registro
├── profile/page.tsx            ← Perfil del usuario
├── components/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   └── ProfileCard.tsx
├── hooks/
│   └── useAuth.ts
└── types/
    └── auth.ts
```

**Tablas que crea en BD:**
- `profiles` (usuarios)
- `role_permissions` (permisos)
- `session_tokens` (sesiones)
- `audit_logs` (logs de auditoría)

**Status:** 🟡 Esperando push de BD (9:00 AM mañana)

---

### 📅 SQUAD 3 - CITAS (4 personas)
**Ubicación:** `apps/web/app/(citas)/`

```
(citas)/
├── page.tsx                    ← Página principal
├── components/
│   ├── CitasForm.tsx           ← Crear cita
│   ├── CitasCalendar.tsx       ← Calendario
│   ├── CitasList.tsx           ← Listar citas
│   └── CitasDetail.tsx         ← Detalle
├── hooks/
│   └── useCitas.ts
└── types/
    └── citas.ts
```

**Tablas que crea en BD:**
- `appointments` (citas)

**Espera de:** Squad 2 (autenticación)

**Interactúa con:** Squad 4 (notificaciones de recordatorio)

---

### 🔔 SQUAD 4 - NOTIFICACIONES (4 personas)
**Ubicación:** `apps/web/app/(notificaciones)/`

```
(notificaciones)/
├── page.tsx                    ← Centro de notificaciones
├── components/
│   ├── NotificationCenter.tsx
│   ├── NotificationItem.tsx
│   ├── NotificationList.tsx
│   └── NotificationSettings.tsx
├── hooks/
│   └── useNotifications.ts
├── services/
│   ├── emailService.ts         ← Resend API
│   ├── notificationQueue.ts
│   └── webhooks.ts
└── types/
    └── notifications.ts
```

**Tablas que crea en BD:**
- `notifications` (notificaciones)
- `notification_logs` (logs)

**Espera de:** Squad 2 (autenticación)

**Interactúa con:** Squad 3 (avisos de citas), Squad 1 (avisos de documentos)

**API Key:** Ya está en `.env.local` ✅

---

### 📄 SQUAD 1 - JUSTIFICACIONES (3 personas)
**Ubicación:** `apps/web/app/(justificaciones)/`

```
(justificaciones)/
├── page.tsx                    ← Página principal
├── components/
│   ├── JustificacionesForm.tsx ← Crear justificación
│   ├── DocumentUpload.tsx      ← Subir archivo
│   ├── JustificacionesList.tsx ← Listar
│   └── StateTimeline.tsx       ← Timeline
├── hooks/
│   ├── useJustificaciones.ts
│   └── useDocumentUpload.ts
├── services/
│   ├── storageService.ts       ← Supabase Storage
│   └── justificacionService.ts
└── types/
    └── justificaciones.ts
```

**Tablas que crea en BD:**
- `justificaciones` (documentos)
- `justificaciones_audit` (audit trail)

**Storage:** `justificaciones-files/` en Supabase

**Espera de:** Squad 2 (autenticación)

**Interactúa con:** Squad 4 (notificaciones de estado)

---

### 🏠 STAFF - DASHBOARD (5 personas)
**Ubicación:** `apps/web/app/(dashboard)/`

```
(dashboard)/
├── page.tsx                    ← Dashboard principal
├── components/
│   ├── DashboardStudent.tsx    ← Vista estudiante
│   ├── DashboardTeacher.tsx    ← Vista profesor
│   ├── DashboardAdmin.tsx      ← Vista admin
│   ├── QuickStats.tsx
│   ├── ModulesGrid.tsx
│   └── ActivityFeed.tsx
├── hooks/
│   └── useDashboard.ts
└── types/
    └── dashboard.ts
```

**Responsabilidades:**
- Mostrar dashboard según rol
- Acceso rápido a módulos
- Estadísticas personalizadas
- Feed de actividades

**Interactúa con:** TODOS los squads

---

## 📁 CARPETAS COMPARTIDAS

### 🎨 Components Shared - `apps/web/components/`

```
components/
├── 📁 ui/                      ← Componentes Shadcn UI
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Form.tsx
│   ├── Table.tsx
│   └── ... (todos los componentes)
│
└── 📁 modules/                 ← Componentes específicos reutilizables
    ├── 📁 auth/
    ├── 📁 citas/
    ├── 📁 notificaciones/
    └── 📁 justificaciones/
```

**Usar así:**
```tsx
// Componente Shadcn (genérico)
import { Button } from '@/components/ui/button'

// Componente específico (Squad 3)
import { CitasForm } from '@/components/modules/citas'
```

---

### 📦 Packages Shared - `packages/`

#### `packages/sdk/`
**Qué hace:** Cliente Supabase centralizado

```typescript
// Todos usan así:
import { createSupabaseBrowserClient } from '@plataforma/sdk'

const supabase = createSupabaseBrowserClient()
```

#### `packages/types/`
**Qué hace:** Tipos TypeScript auto-generados de BD

```typescript
// Todos usan así:
import type { Database } from '@plataforma/types'

type Profiles = Database['public']['Tables']['profiles']
```

#### `packages/ui/`
**Qué hace:** Componentes UI reutilizables con tema institucional

#### `packages/shared/`
**Qué hace:** Validadores, utilidades, constantes compartidas

```typescript
import { validateEmail, validatePassword } from '@plataforma/shared'
```

---

## 🧪 CONVENCIONES CLAVE DE DESARROLLO (ESTADO, ACTIONS, TESTS Y EDGE FUNCTIONS)

Para mantener la consistencia entre squads, se establecen las siguientes convenciones obligatorias:

### 1. 🗄️ Gestión de Estado Global (Zustand)
- **Estado Local/Módulo:** Si el estado solo concierne a un Squad, se debe crear un store de Zustand dentro de la carpeta `hooks/` o `store/` de su respectivo módulo en `apps/web/app/(modulo)/hooks/useModuloStore.ts`.
- **Estado Global/Compartido:** Si el estado es compartido por múltiples squads (ej. notificaciones globales, datos de sesión del usuario actual), el store debe crearse en `packages/shared/src/stores/`.
  - Ejemplo: `import { useUserStore } from '@plataforma/shared'`

### 2. ⚡ Lógica de Backend y Server Actions (Next.js)
- Toda la lógica que requiera ejecutarse en el servidor o mutar datos debe implementarse usando **Server Actions** o **API Routes**.
- **Server Actions por Módulo:** Se deben colocar dentro de una carpeta `actions/` en la carpeta raíz de cada módulo.
  - Ejemplo: `apps/web/app/(citas)/actions/citasActions.ts`
- **API Routes:** Si se necesita exponer un endpoint REST tradicional para webhooks u otras integraciones, se creará bajo `apps/web/app/api/`.

### 3. 🧪 Pruebas Unitarias e Integración (Vitest y Playwright)
- **Pruebas Unitarias / Componentes (Vitest):** Deben ubicarse **al lado del archivo que prueban** usando la extensión `.test.ts` o `.test.tsx`. Esto facilita que cada squad sea dueño de sus tests.
  - Ejemplo: `apps/web/app/(auth)/components/LoginForm.tsx` y su test en `apps/web/app/(auth)/components/LoginForm.test.tsx`.
- **Pruebas de Extremo a Extremo / E2E (Playwright):** Se configurarán dentro de una carpeta global `apps/web/e2e/` o bien dentro de una carpeta `__tests__/e2e/` en el módulo de cada squad.

### 4. ☁️ Supabase Edge Functions (Lógica Serverless en BD)
- Si se necesita ejecutar tareas serverless fuera de Next.js (por ejemplo, automatizaciones activadas por triggers de base de datos o webhooks seguros), estas se colocarán en `supabase/functions/`.
- **Ubicación:** `supabase/functions/[nombre-de-la-funcion]/index.ts`
- **Ownership:** Cada squad es responsable de crear y mantener las Edge Functions asociadas a su alcance (ej. Squad 4 para envíos masivos o webhooks complejos).

---

## 🔄 FLUJO DE COLABORACIÓN

```
1. TODOS leen BD Schema (supabase/migrations/...)
   ↓
2. Squad 2 crea BD (supabase db push) ← BLOQUEO
   ↓
3. Tipos se generan automáticos (packages/types/database.types.ts)
   ↓
4. TODOS descargan tipos
   ↓
5. Cada squad programa EN SU CARPETA:
   - Squad 3: (citas)/
   - Squad 4: (notificaciones)/
   - Squad 1: (justificaciones)/
   - Staff: (dashboard)/
   ↓
6. TODOS usan SDK centralizado (packages/sdk/)
   ↓
7. TODOS usan componentes compartidos (components/)
   ↓
8. TODOS hacen testing
   ↓
9. TODOS hacen commit a feature/squad-X-day1-validation
   ↓
10. GitHub Actions valida
   ↓
11. Code review cruzado
   ↓
12. Merge a develop ✅
```

---

## 📝 CÓMO COMENZAR (Cada Squad)

### Paso 1: Clonar Repo
```bash
git clone <repo-url>
cd SyncUT
pnpm install
```

### Paso 2: Entender tu carpeta
```bash
# Si eres Squad 3 (Citas):
cd apps/web/app/(citas)
cat README.md  ← Lee esto primero

# Si eres Squad 4 (Notificaciones):
cd apps/web/app/(notificaciones)
cat README.md  ← Lee esto primero
```

### Paso 3: Esperar Squad 2 (BD Push)
```bash
# Squad 2 ejecuta a las 9:00 AM:
supabase db push

# TODOS descargan:
git pull origin develop
```

### Paso 4: Comenzar a Programar
```bash
# En tu carpeta:
pnpm dev

# Abre: http://localhost:3000/(tu-modulo)/
```

### Paso 5: Crear Branch para Prueba
```bash
git checkout -b feature/squad-X-day1-validation
# Haz tu trabajo aquí
git add .
git commit -m "feat(squad-X): day 1 validation by [TU NOMBRE]"
git push -u origin feature/squad-X-day1-validation
# Abre PR
```

---

## 🎯 RESUMEN VISUAL

```
┌─────────────────────────────────────────────────────────────────┐
│                      APP PRINCIPAL                              │
│                   apps/web/app/                                 │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│   (auth)     │   (citas)    │(notificacio) │ (justificaciones) │
│              │              │    nes       │                    │
│   Squad 2    │   Squad 3    │   Squad 4    │    Squad 1         │
│              │              │              │                    │
│ Login        │ Agendar      │ Notificacio- │ Justificaciones    │
│ Signup       │ Calendario   │ nes Email    │ Documentos         │
│ Profile      │ Ver citas    │ Centro notif │ Upload Archivos    │
└──────────────┴──────────────┴──────────────┴────────────────────┘
        │              │              │              │
        └──────────────┴──────────────┴──────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   (dashboard)             │
        │   STAFF                   │
        │   Dashboard Principal     │
        │   Acceso a todos módulos  │
        └───────────────────────────┘
        
        ┌───────────────────────────────────────┐
        │  Componentes Compartidos               │
        │  components/ui + components/modules   │
        └───────────────────────────────────────┘
        
        ┌───────────────────────────────────────┐
        │  Packages Compartidos                  │
        │  sdk | types | ui | shared | config   │
        └───────────────────────────────────────┘
        
        ┌───────────────────────────────────────┐
        │  BD en Supabase                        │
        │  profiles | citas | notificaciones... │
        └───────────────────────────────────────┘
```

---

## ✅ VERIFICACIÓN ANTES DE MAÑANA

Cada squad líder verifica:

```
☑ Acceso al repo
☑ Pudo clonar
☑ pnpm install funcionó
☑ Leyó README.md de su carpeta
☑ Entiende su módulo
☑ Sabe dónde programa
☑ Sabe qué BD necesita
☑ Sabe en qué depende de otros
```

---

## 📞 CONTACTOS

| Squad | Ubicación | Contacto | Espera | Bloquea |
|-------|-----------|----------|--------|---------|
| 2 | (auth)/ | Jassiel | Nada | A TODOS |
| 3 | (citas)/ | Jassiel | Squad 2 | Squad 4 |
| 4 | (notificaciones)/ | Jassiel | Squad 2 | Squad 1,3,5,6 |
| 1 | (justificaciones)/ | Jassiel | Squad 2 | Squad 4 |
| STAFF | (dashboard)/ | Jassiel | Squad 2 | - |

---

## 🚀 LISTO PARA MAÑANA

```
HOY: Lean este documento
MAÑANA 9:00 AM: Squad 2 hace BD push
MAÑANA 9:15 AM: TODOS validan compilación
MAÑANA 10:00 AM: CADA SQUAD programa en su carpeta
MAÑANA 12:00 PM: PROYECTO OPERATIVO ✅
```

---

**Creado:** 17 Mayo 2026  
**Status:** ✅ LISTO PARA COMPARTIR  
**Próxima actualización:** Cuando Squad 2 termine

