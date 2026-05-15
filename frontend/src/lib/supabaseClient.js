import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://sjqoluevpanygpkhfypz.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_Yd4Siw1NXuzj-8AvwMCBuA_YhHU3YS6'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase
