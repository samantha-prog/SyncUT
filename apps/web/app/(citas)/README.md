# 📅 MÓDULO: CITAS - Squad 3

## 👥 Responsable
**Squad 3 Citas** (4 personas)
- Líder: [Nombre del líder]

## 📋 Descripción
Sistema de agendamiento de citas académicas. Estudiantes y profesores pueden:
- Agendar citas
- Ver calendario
- Recibir recordatorios (vía Squad 4)
- Reportes de citas

## 📁 Estructura de Carpetas

```
(citas)/
├── page.tsx                    → Página principal de citas
├── layout.tsx                  → Layout para citas
├── components/
│   ├── CitasForm.tsx          → Formulario para agendar
│   ├── CitasCalendar.tsx      → Calendario
│   ├── CitasList.tsx          → Lista de citas
│   └── CitasDetail.tsx        → Detalle de cita
├── hooks/
│   └── useCitas.ts            → Hook para lógica de citas
└── types/
    └── citas.ts               → Tipos TypeScript
```

## 🗄️ Base de Datos
**Tabla:** `appointments` (se crea en Squad 2 - BD Push)

Campos:
- id (UUID)
- student_id (FK → profiles)
- teacher_id (FK → profiles)
- fecha_inicio (timestamp)
- fecha_fin (timestamp)
- razon (text)
- estado (enum: pending, confirmed, cancelled)
- created_at (timestamp)

## 🔗 Dependencias
- **Squad 2:** Autenticación (debe estar lista)
- **Squad 4:** Sistema de notificaciones (para recordatorios)
- **Packages:** @plataforma/types, @plataforma/ui, @plataforma/sdk

## 📝 Tareas Principales (Sprint 0)
- [ ] Crear tabla `appointments` en BD
- [ ] Crear página principal de citas
- [ ] Crear formulario de agendamiento
- [ ] Implementar calendario
- [ ] Conectar con Squad 4 para notificaciones
- [ ] Tests unitarios
- [ ] Validar con Squad 2 (auth)

## 🚀 Comencemos
```bash
# Cuando la BD esté lista (después de Squad 2 push)
cd apps/web
pnpm dev

# Squad 3 programa aquí:
# /app/(citas)/
```

## ❓ Preguntas
Contacta a: Jassiel (Slack: #squad-3-citas)

---
**Creado:** 17 Mayo 2026
**Estado:** 🟡 Esperando Squad 2 BD

