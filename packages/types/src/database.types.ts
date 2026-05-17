/**
 * Tipos autogenerados desde Supabase PostgreSQL
 * Generado con: supabase gen types typescript --linked
 * 
 * Última actualización: 2024-05-16
 * 
 * Para regenerar:
 * supabase gen types typescript --linked > packages/types/src/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'student' | 'teacher' | 'tutor' | 'admin' | 'coordinator'
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'student' | 'teacher' | 'tutor' | 'admin' | 'coordinator'
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'student' | 'teacher' | 'tutor' | 'admin' | 'coordinator'
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      role_permissions: {
        Row: {
          id: string
          role: 'student' | 'teacher' | 'tutor' | 'admin' | 'coordinator'
          permission: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          role: 'student' | 'teacher' | 'tutor' | 'admin' | 'coordinator'
          permission: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'student' | 'teacher' | 'tutor' | 'admin' | 'coordinator'
          permission?: string
          description?: string | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string
          record_id: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          table_name: string
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          table_name?: string
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      session_tokens: {
        Row: {
          id: string
          user_id: string
          token: string
          device_name: string | null
          ip_address: string | null
          expires_at: string
          created_at: string
          revoked_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          token: string
          device_name?: string | null
          ip_address?: string | null
          expires_at: string
          created_at?: string
          revoked_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          token?: string
          device_name?: string | null
          ip_address?: string | null
          expires_at?: string
          created_at?: string
          revoked_at?: string | null
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
