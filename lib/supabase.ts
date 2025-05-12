import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a singleton instance for client-side
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseBrowser = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }
  return supabaseInstance
}

// Create a separate instance for server components
export const createServerSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const supabase = getSupabaseBrowser()
  const { data } = await supabase.auth.getSession()
  return !!data.session
}

// Helper function to get current user
export const getCurrentUser = async () => {
  const supabase = getSupabaseBrowser()
  const { data } = await supabase.auth.getUser()
  return data.user
}
