# 🌳 ÁRBOL DE CARPETAS - COPIA Y PEGA PARA LA JUNTA

## VERSIÓN SIMPLE (Mostrar primero)

```
📦 SyncUT
 ┣ 📁 apps/web/app/
 ┃ ┣ 📁 (auth) ..................... Squad 2 🔐
 ┃ ┣ 📁 (citas) .................... Squad 3 📅
 ┃ ┣ 📁 (notificaciones) ........... Squad 4 🔔
 ┃ ┣ 📁 (justificaciones) .......... Squad 1 📄
 ┃ └ 📁 (dashboard) ................ STAFF 🏠
 ┣ 📁 packages/ .................... Código Compartido
 ┣ 📁 supabase/ .................... BD Schema
 └ 📁 docs/ ........................ Documentación
```

---

## VERSIÓN DETALLADA (Si piden más info)

```
📦 SyncUT
 ┣ 📄 .env.local ................... Variables de entorno
 ┣ 📄 .github/ ..................... CI/CD Workflows
 ┣ 
 ┣ 📁 apps/
 ┃ ┗ 📁 web/ ...................... Aplicación Next.js
 ┃ ┃ ┣ 📁 app/
 ┃ ┃ ┃ ┣ 📁 (auth) ............... Squad 2 - AUTENTICACIÓN
 ┃ ┃ ┃ ┃ ┣ 📁 login/
 ┃ ┃ ┃ ┃ ┃ ┗ page.tsx ........... Página login
 ┃ ┃ ┃ ┃ ┣ 📁 signup/
 ┃ ┃ ┃ ┃ ┃ ┗ page.tsx ........... Página registro
 ┃ ┃ ┃ ┃ ┣ 📁 profile/
 ┃ ┃ ┃ ┃ ┃ ┗ page.tsx ........... Página perfil
 ┃ ┃ ┃ ┃ ┣ 📁 components/ ....... Componentes
 ┃ ┃ ┃ ┃ ┣ 📁 hooks/ ............ Hooks personalizados
 ┃ ┃ ┃ ┃ ┗ 📁 types/ ............ Tipos TypeScript
 ┃ ┃ ┃ ┃
 ┃ ┃ ┃ ┣ 📁 (citas) ............ Squad 3 - AGENDAMIENTO
 ┃ ┃ ┃ ┃ ┣ page.tsx ........... Página principal
 ┃ ┃ ┃ ┃ ┣ 📁 components/
 ┃ ┃ ┃ ┃ ┃ ┣ CitasForm.tsx ..... Formulario
 ┃ ┃ ┃ ┃ ┃ ┣ CitasCalendar.tsx . Calendario
 ┃ ┃ ┃ ┃ ┃ ┣ CitasList.tsx ..... Listar
 ┃ ┃ ┃ ┃ ┃ ┗ CitasDetail.tsx ... Detalle
 ┃ ┃ ┃ ┃ ┣ 📁 hooks/
 ┃ ┃ ┃ ┃ ┃ ┗ useCitas.ts ....... Hook
 ┃ ┃ ┃ ┃ ┗ 📁 types/
 ┃ ┃ ┃ ┃ ┃ ┗ citas.ts ......... Tipos
 ┃ ┃ ┃ ┃
 ┃ ┃ ┃ ┣ 📁 (notificaciones) . Squad 4 - NOTIFICACIONES
 ┃ ┃ ┃ ┃ ┣ page.tsx ........... Centro notificaciones
 ┃ ┃ ┃ ┃ ┣ 📁 components/
 ┃ ┃ ┃ ┃ ┃ ┣ NotificationCenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ NotificationItem.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ NotificationList.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ NotificationSettings.tsx
 ┃ ┃ ┃ ┃ ┣ 📁 hooks/
 ┃ ┃ ┃ ┃ ┃ ┗ useNotifications.ts
 ┃ ┃ ┃ ┃ ┣ 📁 services/
 ┃ ┃ ┃ ┃ ┃ ┣ emailService.ts ... Resend API
 ┃ ┃ ┃ ┃ ┃ ┣ notificationQueue.ts
 ┃ ┃ ┃ ┃ ┃ ┗ webhooks.ts ....... Webhooks
 ┃ ┃ ┃ ┃ ┗ 📁 types/
 ┃ ┃ ┃ ┃ ┃ ┗ notifications.ts
 ┃ ┃ ┃ ┃
 ┃ ┃ ┃ ┣ 📁 (justificaciones) Squad 1 - DOCUMENTOS
 ┃ ┃ ┃ ┃ ┣ page.tsx ........... Página principal
 ┃ ┃ ┃ ┃ ┣ 📁 components/
 ┃ ┃ ┃ ┃ ┃ ┣ JustificacionesForm.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ DocumentUpload.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ JustificacionesList.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ StateTimeline.tsx
 ┃ ┃ ┃ ┃ ┣ 📁 hooks/
 ┃ ┃ ┃ ┃ ┃ ┣ useJustificaciones.ts
 ┃ ┃ ┃ ┃ ┃ ┗ useDocumentUpload.ts
 ┃ ┃ ┃ ┃ ┣ 📁 services/
 ┃ ┃ ┃ ┃ ┃ ┣ storageService.ts
 ┃ ┃ ┃ ┃ ┃ ┗ justificacionService.ts
 ┃ ┃ ┃ ┃ ┗ 📁 types/
 ┃ ┃ ┃ ┃ ┃ ┗ justificaciones.ts
 ┃ ┃ ┃ ┃
 ┃ ┃ ┃ └ 📁 (dashboard) ........ STAFF - DASHBOARD
 ┃ ┃ ┃ ┃ ┣ page.tsx ........... Dashboard principal
 ┃ ┃ ┃ ┃ ┣ 📁 components/
 ┃ ┃ ┃ ┃ ┃ ┣ DashboardStudent.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ DashboardTeacher.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ DashboardAdmin.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ QuickStats.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ ModulesGrid.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ ActivityFeed.tsx
 ┃ ┃ ┃ ┃ ┣ 📁 hooks/
 ┃ ┃ ┃ ┃ ┃ ┗ useDashboard.ts
 ┃ ┃ ┃ ┃ ┗ 📁 types/
 ┃ ┃ ┃ ┃ ┃ ┗ dashboard.ts
 ┃ ┃ ┃
 ┃ ┃ ┣ 📁 components/ ......... UI Compartida
 ┃ ┃ ┃ ┣ 📁 ui/
 ┃ ┃ ┃ ┃ ┣ button.tsx
 ┃ ┃ ┃ ┃ ┣ card.tsx
 ┃ ┃ ┃ ┃ ┣ modal.tsx
 ┃ ┃ ┃ ┃ ┣ form.tsx
 ┃ ┃ ┃ ┃ ┗ ... (Shadcn UI)
 ┃ ┃ ┃ └ 📁 modules/
 ┃ ┃ ┃ ┃ ┣ 📁 auth/
 ┃ ┃ ┃ ┃ ┣ 📁 citas/
 ┃ ┃ ┃ ┃ ┣ 📁 notificaciones/
 ┃ ┃ ┃ ┃ ┗ 📁 justificaciones/
 ┃ ┃ ┃
 ┃ ┃ ┣ 📁 lib/ ................ Utilidades
 ┃ ┃ ┃ ┣ utils.ts
 ┃ ┃ ┃ ┣ auth.ts
 ┃ ┃ ┃ ┗ db.ts
 ┃ ┃ ┃
 ┃ ┃ ┗ 📁 public/ ............ Assets (logos, imágenes)
 ┃
 ┣ 📁 packages/ ............... Código Compartido
 ┃ ┣ 📁 sdk/ ................. Cliente Supabase
 ┃ ┃ ┣ 📁 src/
 ┃ ┃ ┃ ┣ client.ts ........ createSupabaseBrowserClient()
 ┃ ┃ ┃ ┗ types.ts ........ Tipos SDK
 ┃ ┃ ┗ package.json
 ┃ ┃
 ┃ ┣ 📁 types/ .............. Tipos Auto-generados
 ┃ ┃ ┣ 📁 src/
 ┃ ┃ ┃ ┗ database.types.ts ← Auto-generada por Squad 2
 ┃ ┃ ┗ package.json
 ┃ ┃
 ┃ ┣ 📁 ui/ ................. Componentes UI
 ┃ ┃ ┣ 📁 src/
 ┃ ┃ ┗ package.json
 ┃ ┃
 ┃ ┣ 📁 shared/ ............. Validadores + Utilidades
 ┃ ┃ ┣ 📁 src/
 ┃ ┃ ┃ ┣ validators.ts
 ┃ ┃ ┃ ┣ constants.ts
 ┃ ┃ ┃ ┗ utils.ts
 ┃ ┃ ┗ package.json
 ┃ ┃
 ┃ ┗ 📁 config/ ............. Configuraciones
 ┃ ┃ ┣ 📁 src/
 ┃ ┃ ┗ package.json
 ┃
 ┣ 📁 supabase/ ............ Base de Datos
 ┃ ┣ 📁 migrations/
 ┃ ┃ ┣ 20240516000001_init_schemas.sql ← BD Schema
 ┃ ┃ ┃ ┣ Crea: profiles
 ┃ ┃ ┃ ┣ Crea: role_permissions
 ┃ ┃ ┃ ┣ Crea: audit_logs
 ┃ ┃ ┃ ┣ Crea: session_tokens
 ┃ ┃ ┃ ┗ Crea: 7 índices + RLS + 5 policies
 ┃ ┃ ┗
 ┃ ┗ 📁 tests/
 ┃
 ┣ 📁 docs/ ................ Documentación
 ┃ ┣ 📁 squad-1/
 ┃ ┣ 📁 squad-2/
 ┃ ┣ 📁 squad-3/
 ┃ ┗ 📁 squad-4/
 ┃
 ┣ 📁 scripts/ ............ Scripts Útiles
 ┃
 ┣ 📄 package.json ......... Workspace config
 ┣ 📄 pnpm-lock.yaml ...... Lock file
 ┣ 📄 pnpm-workspace.yaml . Monorepo config
 ┣ 📄 turbo.json ......... Build cache config
 ┣ 📄 tsconfig.json ...... TypeScript config
 ┣ 📄 .gitignore ......... Git ignore
 ┣ 📄 .env.local ......... Variables (CON KEYS) ✅
 ┗ 📄 README.md ......... Proyecto README
```

---

## VERSIÓN PARA CADA SQUAD

### Squad 2 (Autenticación)
```
TÚ PROGRAMAS AQUÍ:
📁 apps/web/app/(auth)/

CARPETAS PRINCIPALES:
├── login/page.tsx
├── signup/page.tsx  
├── profile/page.tsx
├── components/
├── hooks/
└── types/

Tu README:
📄 apps/web/app/(auth)/README.md
```

### Squad 3 (Citas)
```
TÚ PROGRAMAS AQUÍ:
📁 apps/web/app/(citas)/

CARPETAS PRINCIPALES:
├── page.tsx
├── components/
├── hooks/
└── types/

Tu README:
📄 apps/web/app/(citas)/README.md
```

### Squad 4 (Notificaciones)
```
TÚ PROGRAMAS AQUÍ:
📁 apps/web/app/(notificaciones)/

CARPETAS PRINCIPALES:
├── page.tsx
├── components/
├── hooks/
├── services/
└── types/

Tu README:
📄 apps/web/app/(notificaciones)/README.md
```

### Squad 1 (Justificaciones)
```
TÚ PROGRAMAS AQUÍ:
📁 apps/web/app/(justificaciones)/

CARPETAS PRINCIPALES:
├── page.tsx
├── components/
├── hooks/
├── services/
└── types/

Tu README:
📄 apps/web/app/(justificaciones)/README.md
```

### STAFF (Dashboard)
```
TÚ PROGRAMAS AQUÍ:
📁 apps/web/app/(dashboard)/

CARPETAS PRINCIPALES:
├── page.tsx
├── components/
├── hooks/
└── types/

Tu README:
📄 apps/web/app/(dashboard)/README.md
```

---

## 🎯 RESUMEN EN EMOJIS

```
📦 SyncUT
 🔐 (auth) ................... Squad 2
 📅 (citas) .................. Squad 3
 🔔 (notificaciones) ......... Squad 4
 📄 (justificaciones) ........ Squad 1
 🏠 (dashboard) .............. STAFF

Todos usan:
 📚 packages/sdk
 📋 packages/types
 🎨 components/ui
 ⚙️ packages/shared
 🗄️ supabase/migrations
```

---

## COMANDO PARA VER EN REAL

```bash
# En terminal, desde SyncUT:
tree /F
# O
dir /S /B
# O
ls -la apps/web/app/
```

---

**Creado:** 17 Mayo 2026  
**Para:** Mostrar en la junta  
**Formato:** Copy-paste ready

