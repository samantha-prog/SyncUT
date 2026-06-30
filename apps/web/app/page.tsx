// apps/web/app/(citas)/page.tsx
import Link from 'next/link'
import { CitasCalendar } from '@/components/citas/CitasCalendar'

// Por ahora con datos vacíos hasta integrar auth
export default function CitasPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6">
      {/* ... tu plantilla actual ... */}
      {/* Cuando tengas el userId del contexto de auth, pasa las citas reales */}
    </div>
  )
}