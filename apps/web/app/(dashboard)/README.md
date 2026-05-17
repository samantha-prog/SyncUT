# 🏠 MÓDULO: DASHBOARD - Compartido

## 👥 Responsable
**Staff** (5 personas)

## 📋 Descripción
Dashboard principal de la plataforma después del login. Cada usuario ve:
- Su rol (Estudiante, Profesor, Tutor, Admin, Coordinador)
- Sus módulos disponibles
- Resumen de información
- Acceso rápido a tareas

## 📁 Estructura de Carpetas

```
(dashboard)/
├── page.tsx                    → Dashboard principal
├── layout.tsx                  → Layout del dashboard
├── components/
│   ├── DashboardStudent.tsx    → Vista para estudiantes
│   ├── DashboardTeacher.tsx    → Vista para profesores
│   ├── DashboardAdmin.tsx      → Vista para admins
│   ├── QuickStats.tsx          → Estadísticas rápidas
│   ├── ModulesGrid.tsx         → Grid de módulos
│   └── ActivityFeed.tsx        → Feed de actividad
├── hooks/
│   └── useDashboard.ts         → Hook del dashboard
└── types/
    └── dashboard.ts            → Tipos TypeScript
```

## 🔄 Flujo Después del Login

```
1. Usuario inicia sesión (Squad 2)
   ↓
2. Sistema verifica rol (BD RLS)
   ↓
3. Muestra dashboard según rol
   ↓
4. Usuario accede a sus módulos:
   - Squad 3: Citas
   - Squad 4: Notificaciones
   - Squad 1: Justificaciones
```

## 👤 Roles y Permisos

```
ESTUDIANTE:
  ✓ Ver dashboard personal
  ✓ Agendar citas
  ✓ Ver notificaciones
  ✓ Enviar justificaciones

PROFESOR:
  ✓ Ver dashboard
  ✓ Ver mis citas
  ✓ Gestionar citas
  ✓ Revisar justificaciones

TUTOR:
  ✓ Ver dashboard
  ✓ Ver citas de estudiantes
  ✓ Aprobar/Rechazar justificaciones

ADMIN:
  ✓ Ver todo
  ✓ Modificar cualquier cosa
  ✓ Ver logs de auditoría

COORDINADOR:
  ✓ Ver reportes
  ✓ Acceso a estadísticas
  ✓ Gestión de usuarios
```

## 🔗 Dependencias
- **Squad 2:** Autenticación y roles
- **Squad 3:** Módulo de citas
- **Squad 4:** Módulo de notificaciones
- **Squad 1:** Módulo de justificaciones
- **Packages:** @plataforma/types, @plataforma/ui, @plataforma/sdk

## 📝 Tareas Principales (Sprint 0)
- [ ] Crear layout base del dashboard
- [ ] Crear componentes por rol
- [ ] Implementar grid de módulos
- [ ] Crear hooks para datos
- [ ] Tests de permisos (RLS)
- [ ] Validar con todos los squads

## 🚀 Comencemos
```bash
# Cuando la BD esté lista (después de Squad 2 push)
cd apps/web
pnpm dev

# Staff programa aquí:
# /app/(dashboard)/
```

## 🔐 Verificar Rol del Usuario
```typescript
// Patrón para verificar permisos
import { getSupabaseAuth } from '@plataforma/sdk'

const auth = getSupabaseAuth()
const userData = await auth.user()

// userData.role te da: 'student' | 'teacher' | 'tutor' | 'admin' | 'coordinator'
```

## ❓ Preguntas
Contacta a: Jassiel (Slack: #squad-staff)

---
**Creado:** 17 Mayo 2026
**Estado:** 🟡 Esperando Squad 2 BD

