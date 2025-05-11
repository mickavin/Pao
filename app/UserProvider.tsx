'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/components/hooks/use-local-storage';
const UserContext = createContext(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") return null
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useLocalStorage("pao-onboarding-completed", false)
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!hasCompletedOnboarding) {
      router.push("/onboarding")
    }
  }, [hasCompletedOnboarding, router])

  useEffect(() => {
    supabase.auth.signInAnonymously();
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && hasCompletedOnboarding) {
        setUser(session?.user || null);
      }
      console.log('User state changed:', session?.user || null);
    });
  }, []);
  // if (!hasCompletedOnboarding) {
  //   return <div>Chargement...</div>
  // }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

export function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
