import { createClient } from '@supabase/supabase-js';


const supabaseUrl ='https://nniiufuxqxfaojaitiri.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uaWl1ZnV4cXhmYW9qYWl0aXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NzIzODMsImV4cCI6MjA2MTU0ODM4M30.S8Vr1k9gYYRDqlR_oji-t20cwDOCUXAfo0o055dXY88'

export const supabaseclient = createClient(supabaseUrl, supabaseAnonKey);