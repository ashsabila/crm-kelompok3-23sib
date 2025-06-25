import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aurqlsfqgexartjuqmwj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1cnFsc2ZxZ2V4YXJ0anVxbXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MzU0NTgsImV4cCI6MjA2NjQxMTQ1OH0.O6UfZz6cfLppynBZs-XsH1YqgV8HIUQTyjbOvUERKKo'
export const supabase = createClient(supabaseUrl, supabaseKey)