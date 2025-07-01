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
          full_name: string | null
          avatar_url: string | null
          company: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          company?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          company?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vendors: {
        Row: {
          id: string
          user_id: string
          name: string
          industry: string | null
          website: string | null
          contact_email: string | null
          risk_score: number | null
          risk_level: string | null
          compliance_status: string | null
          last_assessment_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          industry?: string | null
          website?: string | null
          contact_email?: string | null
          risk_score?: number | null
          risk_level?: string | null
          compliance_status?: string | null
          last_assessment_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          industry?: string | null
          website?: string | null
          contact_email?: string | null
          risk_score?: number | null
          risk_level?: string | null
          compliance_status?: string | null
          last_assessment_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sbom_analyses: {
        Row: {
          id: string
          user_id: string
          filename: string
          file_type: string
          total_components: number | null
          total_vulnerabilities: number | null
          risk_score: number | null
          analysis_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          filename: string
          file_type: string
          total_components?: number | null
          total_vulnerabilities?: number | null
          risk_score?: number | null
          analysis_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          filename?: string
          file_type?: string
          total_components?: number | null
          total_vulnerabilities?: number | null
          risk_score?: number | null
          analysis_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      supply_chain_assessments: {
        Row: {
          id: string
          user_id: string
          assessment_name: string | null
          overall_score: number | null
          section_scores: Json | null
          answers: Json | null
          status: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          assessment_name?: string | null
          overall_score?: number | null
          section_scores?: Json | null
          answers?: Json | null
          status?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          assessment_name?: string | null
          overall_score?: number | null
          section_scores?: Json | null
          answers?: Json | null
          status?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          company: string | null
          topic: string | null
          message: string
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          company?: string | null
          topic?: string | null
          message: string
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          company?: string | null
          topic?: string | null
          message?: string
          status?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}