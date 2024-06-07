import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jzynwdleywwvfdndrfwf.supabase.co";
const supabaseKey = import.meta.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
