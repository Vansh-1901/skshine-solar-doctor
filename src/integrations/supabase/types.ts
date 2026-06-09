export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          content: string | null
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          slug: string | null
          title: string | null
        }
        Insert: {
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          slug?: string | null
          title?: string | null
        }
        Update: {
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          slug?: string | null
          title?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          image_url: string | null
          title: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          title?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          city: string | null
          created_at: string | null
          id: string
          mobile: string | null
          monthly_bill: string | null
          name: string | null
          source: string | null
          status: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id?: string
          mobile?: string | null
          monthly_bill?: string | null
          name?: string | null
          source?: string | null
          status?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string
          mobile?: string | null
          monthly_bill?: string | null
          name?: string | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          address: string | null
          company_name: string | null
          email: string | null
          facebook: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          instagram: string | null
          linkedin: string | null
          phone: string | null
          updated_at: string | null
          whatsapp: string | null
          youtube: string | null
        }
        Insert: {
          address?: string | null
          company_name?: string | null
          email?: string | null
          facebook?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          phone?: string | null
          updated_at?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Update: {
          address?: string | null
          company_name?: string | null
          email?: string | null
          facebook?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          phone?: string | null
          updated_at?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string | null
          customer_name: string | null
          id: string
          rating: number | null
          review: string | null
          visible: boolean | null
        }
        Insert: {
          created_at?: string | null
          customer_name?: string | null
          id?: string
          rating?: number | null
          review?: string | null
          visible?: boolean | null
        }
        Update: {
          created_at?: string | null
          customer_name?: string | null
          id?: string
          rating?: number | null
          review?: string | null
          visible?: boolean | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
