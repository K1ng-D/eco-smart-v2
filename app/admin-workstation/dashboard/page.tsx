"use client";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import ProductPage from "@/pages/admin/productpage";
import NewsPage from "@/pages/admin/newspage";
import CountDashboard from "@/pages/admin/countdashboard";
import TransitionLayout from "@/components/transtition";

export default function Page() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkIfUserIsAdmin(user.email);
      } else {
        setLoading(false);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const checkIfUserIsAdmin = (userEmail: string | null) => {
    const allowedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (userEmail && userEmail === allowedAdminEmail) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      router.push("/not-authorized");
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="pt-14">
      <TransitionLayout />
      <CountDashboard />
      <ProductPage />
      <NewsPage />
    </div>
  );
}
