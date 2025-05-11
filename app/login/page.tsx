"use client"
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase/client";


export default async function LoginPage() {
  const router = useRouter();


  useEffect(() => {
    if (typeof window === 'undefined') return;
    const connect = async () => {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error("Error signing in:", error);
        return
      }
      console.log("User connected:", data.user);
      router.push("/dashboard");
    }
    connect();
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return;
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Error getting session:", error);
        return null;
      }
      if (data?.session) {
        router.push("/dashboard"); // Redirect to the dashboard if already logged in
      }
    })
  }, [router]);  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="mt-4">You are logged</p>
    </div>
  )
}