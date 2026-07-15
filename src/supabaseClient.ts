import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dseejebytybrrpggevpg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzZWVqZWJ5dHlicnJwZ2dldnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNTE1NDksImV4cCI6MjA5MzYyNzU0OX0.xmqOSqJ_AFWJV8RBeakLRExvfpJ2HW9yJkFIbvhveXY'

export const supabase = createClient(supabaseUrl, supabaseKey)