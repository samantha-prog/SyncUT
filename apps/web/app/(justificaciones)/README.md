# 📄 MÓDULO: JUSTIFICACIONES - Squad 1

## 👥 Responsable
**Squad 1 Justificaciones** (3 personas)
- Líder: [Nombre del líder]

## 📋 Descripción
Sistema de gestión de justificaciones de inasistencia. Permite:
- Enviar justificaciones por inasistencia
- Adjuntar documentos (PDF, imágenes)
- Revisar estado de justificaciones
- Coordinar con profesores
- Audit trail de cambios

## 📁 Estructura de Carpetas

```
(justificaciones)/
├── page.tsx                    → Página principal
├── layout.tsx                  → Layout para justificaciones
├── components/
│   ├── JustificacionesForm.tsx → Formulario para crear
│   ├── JustificacionesList.tsx → Lista de justificaciones
│   ├── DocumentUpload.tsx      → Carga de archivos
│   ├── JustificacionDetail.tsx → Detalle de justificación
│   └── StateTimeline.tsx       → Timeline de estados
├── hooks/
│   ├── useJustificaciones.ts   → Hook principal
│   └── useDocumentUpload.ts    → Hook para uploads
├── services/
│   ├── storageService.ts       → Gestión de archivos
│   └── justificacionService.ts → Lógica de negocios
└── types/
    └── justificaciones.ts      → Tipos TypeScript
```

## 🗄️ Base de Datos
**Tabla:** `justificaciones` (se crea en Squad 2 - BD Push)

Campos:
- id (UUID)
- student_id (FK → profiles)
- fecha_inasistencia (date)
- razon (text)
- estado (enum: draft, submitted, reviewing, approved, rejected)
- archivo_url (text - URL en storage)
- archivo_nombre (text)
- comentarios (text)
- reviewed_by (FK → profiles - nullable)
- reviewed_at (timestamp - nullable)
- created_at (timestamp)
- updated_at (timestamp)

## 💾 Almacenamiento
**Storage en Supabase:** `justificaciones-files/`
- Máximo 5 MB por archivo
- Formatos: PDF, JPG, PNG, DOCX
- Organización: `/student-id/fecha-timestamp/`

## 🔗 Dependencias
- **Squad 2:** Autenticación (debe estar lista)
- **Squad 4:** Notificaciones (para confirmar cambios de estado)
- **Supabase Storage:** Ya configurado
- **Packages:** @plataforma/types, @plataforma/ui, @plataforma/sdk

## 📝 Tareas Principales (Sprint 0)
- [ ] Crear tabla `justificaciones` en BD
- [ ] Crear tabla `justificaciones_audit` para audit trail
- [ ] Crear página de listado
- [ ] Crear formulario de carga
- [ ] Implementar carga de documentos
- [ ] Timeline de estados
- [ ] Integración con notificaciones (Squad 4)
- [ ] Tests unitarios

## 🚀 Comencemos
```bash
# Cuando la BD esté lista (después de Squad 2 push)
cd apps/web
pnpm dev

# Squad 1 programa aquí:
# /app/(justificaciones)/
```

## 📤 Ejemplo: Subir Documento
```typescript
// Squad 1 usa este patrón
import { storageService } from '@/services/storageService'

const file = await storageService.uploadDocument({
  file: File,
  studentId: string,
  folder: 'justificaciones'
})
// Retorna: { url, nombre, tamaño }
```

## ❓ Preguntas
Contacta a: Jassiel (Slack: #squad-1-justificaciones)

---
**Creado:** 17 Mayo 2026
**Estado:** 🟡 Esperando Squad 2 BD

