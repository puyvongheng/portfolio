import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vrrkxegfcituwxmaciji.supabase.co';
const supabaseKey = 'sb_publishable_FUHGkhVwxBDtRPvGkoO0hw_kc95-kXg';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('profile').select('*');
  console.log('Public fetch profile:', data);
  if (error) console.error('Error:', error);
}

check();
