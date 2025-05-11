"use client"
import { useUser } from '../UserProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import supabase from "@/utils/supabase/client";

export default function DashboardPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Error getting session:", error);
        return null;
      }
      // if (data?.session) {
      //   router.push("/"); // Redirect to the dashboard if already logged in
      // }
    })
    if (!user) {
      router.push('/login'); // Redirige si l'utilisateur n'est pas connecté
    }
  }, [user, router]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="container">
      <h1>Bienvenue sur le tableau de bord</h1>
      <p>Vous êtes connecté anonymement.</p>
    </div>
  );
}
