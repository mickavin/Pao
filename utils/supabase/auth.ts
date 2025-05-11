import supabase from './client';

/**
 * Connecte un utilisateur de manière anonyme.
 */
export async function signInAnonymously() {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'anonymous',
  });

  if (error) {
    console.error('Erreur lors de la connexion anonyme:', error.message);
    throw error;
  }

  return user;
}

/**
 * Déconnecte l'utilisateur actuel.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Erreur lors de la déconnexion:', error.message);
    throw error;
  }
}
