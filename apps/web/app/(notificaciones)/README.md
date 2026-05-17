# 🔔 MÓDULO: NOTIFICACIONES - Squad 4

## 👥 Responsable
**Squad 4 Notificaciones** (4 personas)
- Líder: [Nombre del líder]

## 📋 Descripción
Sistema de notificaciones integrado. Maneja:
- Notificaciones por email (Resend API)
- Notificaciones en app (toast/banner)
- Recordatorios de citas (Squad 3)
- Notificaciones de documentos (Squad 1)
- Logs de notificaciones

## 📁 Estructura de Carpetas

```
(notificaciones)/
├── page.tsx                    → Centro de notificaciones
├── layout.tsx                  → Layout para notificaciones
├── components/
│   ├── NotificationCenter.tsx  → Centro principal
│   ├── NotificationItem.tsx    → Elemento individual
│   ├── NotificationList.tsx    → Lista de notificaciones
│   └── NotificationSettings.tsx → Configuración
├── hooks/
│   └── useNotifications.ts     → Hook para notificaciones
├── services/
│   ├── emailService.ts         → Integración Resend
│   ├── notificationQueue.ts    → Cola de notificaciones
│   └── webhooks.ts             → Webhooks de eventos
└── types/
    └── notifications.ts        → Tipos TypeScript
```

## 🗄️ Base de Datos
**Tabla:** `notifications` (se crea en Squad 2 - BD Push)

Campos:
- id (UUID)
- user_id (FK → profiles)
- tipo (enum: email, app, sms)
- asunto (text)
- contenido (text)
- estado (enum: pending, sent, failed)
- scheduled_at (timestamp)
- sent_at (timestamp)
- created_at (timestamp)

## 🔑 Configuración
Resend API Key: Ya está en `.env.local`
```
NEXT_PUBLIC_RESEND_API_KEY=re_Yuo56X9d_EYEniYd8MCt82QSDyvrT16sL
```

## 🔗 Dependencias
- **Squad 2:** Autenticación (debe estar lista)
- **Squad 3:** Sistema de citas (eventos a notificar)
- **Squad 1:** Sistema de justificaciones (eventos a notificar)
- **Resend API:** Ya configurada ✅
- **Packages:** @plataforma/types, @plataforma/ui, @plataforma/sdk

## 📝 Tareas Principales (Sprint 0)
- [ ] Crear tabla `notifications` en BD
- [ ] Crear tabla `notification_logs` en BD
- [ ] Crear servicio de email con Resend
- [ ] Crear centro de notificaciones
- [ ] Implementar cola de notificaciones
- [ ] Crear webhooks para eventos
- [ ] Tests unitarios
- [ ] Validar con Squad 3 y Squad 1

## 🚀 Comencemos
```bash
# Cuando la BD esté lista (después de Squad 2 push)
cd apps/web
pnpm dev

# Squad 4 programa aquí:
# /app/(notificaciones)/
```

## 📧 Ejemplo: Enviar Email
```typescript
// Squad 4 usa este patrón
import { notificationService } from '@/services/notificationService'

await notificationService.sendEmail({
  to: 'usuario@student.edu.mx',
  subject: 'Tu cita fue agendada',
  html: '<h1>Cita confirmada</h1>'
})
```

## ❓ Preguntas
Contacta a: Jassiel (Slack: #squad-4-notificaciones)

---
**Creado:** 17 Mayo 2026
**Estado:** 🟡 Esperando Squad 2 BD

