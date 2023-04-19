import { supabase } from '@/api';

export async function signout() {
  await supabase.auth.signOut();
}
