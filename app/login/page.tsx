"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import TransitionLayout from "@/components/transtition";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.email === adminEmail) {
        router.push("/admin-workstation/dashboard");
      } else {
        alert("Akses ditolak: Anda bukan admin");
        await auth.signOut();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Login admin gagal: " + error.message);
      } else {
        alert("Login admin gagal: Terjadi error yang tidak diketahui");
      }
    }
  };

  return (
    <div className="w-full h-screen bg-loginbg bg-cover bg-center">
      <TransitionLayout />
      <div className="h-full w-full py-[125px] px-8 flex md:items-end items-center justify-center bg-black/80">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#009539]">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black p-3 border border-[#009539] rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black p-3 border border-[#009539] rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#009539] text-white hover:text-[#009539] py-3 rounded-md font-semibold hover:bg-[#ffffff] border hover:border-[#009539] transition duration-300"
            >
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
