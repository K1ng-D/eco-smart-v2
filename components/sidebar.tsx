"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { FaNewspaper, FaBox } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();

  const shouldShowSidebar =
    pathname === "/admin-workstation/dashboard" ||
    pathname === "/admin-workstation/product" ||
    pathname === "/admin-workstation/news";

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!shouldShowSidebar) return null;

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);

      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <button
        className="md:hidden p-4 text-white font-bold bg-[#009539] fixed top-0 left-0 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-[#009539] text-white h-screen fixed top-0 left-0 pt-5 transition-transform duration-300 z-40`}
      >
        <div className="flex pt-12 items-center font-bold gap-2 px-6 mb-5">
          <Link href="/">
            <img
              src="/assets/image/ecoSmartLogo.png"
              alt="Logo"
              className="w-10 h-10"
            />
          </Link>
          <h1> EcoSmart</h1>
        </div>

        <ul className="list-none p-0">
          <li className="flex py-4 px-6 hover:bg-[#ffffff] hover:text-[#009539]">
            <MdDashboard className="text-4xl pr-2" />
            <Link
              href="/admin-workstation/dashboard"
              className="block font-bold"
            >
              DASHBOARD
            </Link>
          </li>
          <li className="py-4 flex px-6 hover:bg-[#ffffff] hover:text-[#009539]">
            <FaBox className="text-3xl pr-2" />
            <Link href="/admin-workstation/product" className="block font-bold">
              PRODUCT
            </Link>
          </li>
          <li className="py-4 flex px-6 hover:bg-[#ffffff] hover:text-[#009539]">
            <FaNewspaper className="text-4xl pr-2" />
            <Link href="/admin-workstation/news" className="block font-bold">
              NEWS
            </Link>
          </li>
        </ul>
        <div className="absolute bottom-5 left-0 right-0 p-6">
          {userEmail && (
            <div className="text-center text-lg font-bold text-white mb-6">
              Selamat datang, {userEmail}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="font-bold w-full py-2 px-4 text-white border-2 hover:border-white border-[#009539] bg-red-600 rounded-lg hover:bg-[#009539] transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
