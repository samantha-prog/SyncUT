import React from 'react';

export const metadata = {
  title: 'Registro - SyncUT',
  description: 'Crea tu cuenta en SyncUT',
};

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">SyncUT</h1>
        <p className="text-slate-400 mt-2">Plataforma Universitaria Integral</p>
      </div>

      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Crear Cuenta</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Juan Pérez García"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@university.edu"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-center text-slate-400 mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-green-500 hover:text-green-400">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}
