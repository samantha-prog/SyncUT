# Security remediation — 2026-06-18

## Hallazgo crítico

`NEXT_PUBLIC_SUPABASE_ANON_KEY` contenía una clave legacy con rol
`service_role`. Al usar el prefijo `NEXT_PUBLIC_`, Next.js podía incluirla en
el navegador y permitir omitir RLS.

## Acciones completadas

- La configuración local usa ahora la clave `publishable`.
- Vercel Production usa la clave `publishable`.
- Las ramas Preview existentes usan la clave `publishable`.
- Se desplegó una nueva versión de producción.
- Se eliminó la política remota `Permitir lectura de perfiles`.
- El rol `anon` perdió acceso a `profiles` y a los RPC internos.
- Se probaron registro con mínimo privilegio y bloqueo de autoelevación.

## Acción manual obligatoria

La clave legacy `service_role` debe considerarse comprometida aunque ya no esté
configurada en el frontend. En Supabase Dashboard:

1. Abrir el proyecto SyncUT.
2. Ir a **Settings → API Keys**.
3. Migrar cualquier uso legítimo del `service_role` legacy a la clave
   `sb_secret_...`.
4. Deshabilitar las Legacy API Keys.
5. Verificar nuevamente Auth, Edge Functions y cualquier integración backend.

La desactivación no está disponible en Supabase CLI 2.107.0 y no debe
automatizarse mediante endpoints no documentados.

## Verificación

```bash
pnpm db:test
pnpm db:test:security
pnpm dlx supabase@latest db lint --linked --level warning
```

Resultados esperados:

- La API anónima recibe `401` al consultar `profiles`.
- La API anónima recibe `401` al ejecutar `is_admin`.
- Metadata con `role: admin` produce un perfil `student`.
- Un estudiante no puede modificar su rol ni ejecutar `set_user_role`.
