"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrollActive, setScrollActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname === "/") setActiveLink("home");
    else if (pathname?.startsWith("/produk")) setActiveLink("produk");
    else if (pathname === "/berita") setActiveLink("berita");
  }, [pathname]);

  if (pathname?.startsWith("/admin-workstation")) {
    return null;
  }

  const MotionImage = motion.create(Image);

  const menuVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-30 transition-all ${
          scrollActive
            ? "bg-[#2e7d32] text-white shadow-md"
            : "bg-transparent text-[#2e7d32]"
        }`}
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <Link
              href="/"
              onClick={() => setActiveLink("home")}
              className="cursor-pointer flex gap-2 font-bold items-center text-[20px]"
            >
              <MotionImage
                src="/assets/image/ecoSmartLogo.png"
                alt="logoEcoSmart"
                width={50}
                height={50}
                className="cursor-pointer"
              />
              EcoSmart
            </Link>

            {/* Hamburger Menu */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 focus:outline-none"
              >
                <div
                  className={`w-6 h-0.5 bg-current transition-all ${
                    isOpen ? "transform rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <div
                  className={`w-6 h-0.5 bg-current mt-1 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <div
                  className={`w-6 h-0.5 bg-current mt-1 transition-all ${
                    isOpen ? "transform -rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden font-bold lg:flex items-center space-x-6">
              <li
                className={`relative cursor-pointer ${
                  activeLink === "home"
                    ? "text-[#94c207] shadow-[#94c207]"
                    : "font-bold hover:text-[#94c207]"
                } transition-all duration-300`}
              >
                <Link href="/" onClick={() => setActiveLink("home")}>
                  Beranda
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform scale-x-0 transition-all duration-300"></span>
                </Link>
              </li>
              <li
                className={`relative cursor-pointer ${
                  activeLink === "produk"
                    ? "text-[#94c207] shadow-[#94c207]"
                    : "font-bold hover:text-[#94c207]"
                } transition-all duration-300`}
              >
                <Link href="/produk" onClick={() => setActiveLink("produk")}>
                  Produk
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform scale-x-0 transition-all duration-300"></span>
                </Link>
              </li>
              <li
                className={`relative cursor-pointer  ${
                  activeLink === "berita"
                    ? "text-[#94c207] shadow-[#94c207]"
                    : "font-bold hover:text-[#94c207]"
                } transition-all duration-300`}
              >
                <Link href="/berita" onClick={() => setActiveLink("berita")}>
                  Berita
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform scale-x-0 transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={menuVariants}
            className="lg:hidden overflow-hidden"
          >
            <ul className="flex flex-col items-center pb-4 bg-[#2f7d32] text-white w-full">
              <li
                className={`w-full text-center py-2 hover:bg-green-600 ${
                  activeLink === "home" ? "bg-white text-green-700" : ""
                }`}
              >
                <Link
                  href="/"
                  onClick={() => {
                    setActiveLink("home");
                    setIsOpen(false);
                  }}
                >
                  Beranda
                </Link>
              </li>
              <li
                className={`w-full text-center py-2 hover:bg-green-600 ${
                  activeLink === "produk" ? "bg-white text-green-700" : ""
                }`}
              >
                <Link
                  href="/produk"
                  onClick={() => {
                    setActiveLink("produk");
                    setIsOpen(false);
                  }}
                >
                  Produk
                </Link>
              </li>
              <li
                className={`w-full text-center py-2 hover:bg-green-600 ${
                  activeLink === "berita" ? "bg-white text-green-700" : ""
                }`}
              >
                <Link
                  href="/berita"
                  onClick={() => {
                    setActiveLink("berita");
                    setIsOpen(false);
                  }}
                >
                  Berita
                </Link>
              </li>
            </ul>
          </motion.div>
        </nav>
      </header>
    </>
  );
}
