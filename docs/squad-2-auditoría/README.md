# Squad 2 - Auditoría y Autenticación

**Responsables:** Alexander, Alan, Wallmach, Erick

## 🎯 Objetivos MVP Fase 1

- ✅ Sistema completo de autenticación (Sign-up, Sign-in, Password Recovery)
- ✅ Gestión de perfiles de usuario (6 roles)
- ✅ Middleware de seguridad con verificación de sesión
- ✅ RLS Policies funcionando en Supabase
- ✅ Auditoría inmutable de eventos sensibles
- ✅ MFA (TOTP/SMS) implementado

## 📁 Estructura de Módulos

```
apps/web/app/(auth)/
├── login/          # Página de login
├── signup/         # Página de registro
├── layout.tsx      # Layout protegido
└── middleware.ts   # Verificación de sesión

packages/sdk/src/
├── client.ts       # Cliente centralizado Supabase
└── types.ts        # Tipos exportados

supabase/migrations/
└── 20240516000001_init_schemas.sql  # Tablas + RLS
```

## ⚡ Setup Rápido

```bash
# 1. Clonar repo
git clone <repo>
cd plataforma-universitaria

# 2. Instalar dependencias
pnpm install

# 3. Verificar que migraciones están en Supabase
supabase status

# 4. Si NO están aplicadas:
supabase db push

# 5. Generar tipos TypeScript
supabase gen types typescript --linked > packages/types/src/database.types.ts

# 6. Correr desarrollo
pnpm dev
```

## 📋 Tareas Sprint 0 (Semana 1-2)

- [ ] Alexander: Implementar formulario Signup con validaciones Zod
- [ ] Alan: Implementar formulario Login con Remember Me
- [ ] Wallmach: Agregar MFA (TOTP)
- [ ] Erick: Setup de auditoría inmutable en triggers

## 🔐 RLS Policies Críticas

✅ Todas las policies están en migraciones SQL:
- Profiles: Self-view + Admin override
- Audit logs: View only (no delete)
- Session tokens: Own tokens only
- Role permissions: View all

## 🧪 Testing

```bash
# Unit tests
pnpm turbo test

# E2E tests (cuando Playwright esté setup)
pnpm exec playwright test

# Database tests (pgTAP)
supabase test db
```

## 📞 Links Útiles

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
