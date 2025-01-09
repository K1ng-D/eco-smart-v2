"use client";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";

const MotionImage = motion(Image);
const Footer = () => {
  const pathname = usePathname();

  const excludedPaths = ["/admin-workstation", "/produk/"];
  if (excludedPaths.some((path) => pathname?.startsWith(path))) {
    return null;
  }

  return (
    <>
      {/* Background Image */}
      <div className="relative w-full h-auto">
        <Image
          src="/assets/image/footerBg.png"
          alt="footer-background"
          layout="responsive"
          width={1500}
          height={500}
        />
      </div>

      <footer className="bg-[#2c8d32] text-gray-200 py-10 px-4 md:px-16">
        {/* Footer Content */}
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* PESAN */}
          <div className="order-1 md:order-2 space-y-4">
            <h3 className="font-bold text-xl">PESAN</h3>
            <p className="mb-4">
              &quot;Berikan kesan dan pesan serta kritikan untuk kami agar kami
              dapat lebih baik ke depannya.&quot;
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="*Email"
                className="w-full px-4 py-2 bg-white text-black rounded-md"
              />
              <textarea
                placeholder="*Ketik Pesan..."
                className="w-full px-4 py-2 bg-white text-black rounded-md"
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#2f7d32] text-white px-4 py-2 rounded-md"
              >
                KIRIM
              </button>
            </form>
          </div>

          {/* LOGO & NAMA BRAND */}
          <div className="order-2 md:order-1 space-y-4">
            <div className="cursor-pointer flex gap-2 font-bold items-center justify-center md:justify-start text-[20px]">
              <MotionImage
                src="/assets/image/ecoSmartLogo.png"
                alt="logoEcoSmart"
                width={50}
                height={50}
                className="cursor-pointer"
              />
              EcoSmart
            </div>

            <ul className="space-y-2">
              <li>
                <Link href="/produk">Produk</Link>
              </li>
              <li>
                <Link href="/berita">Berita</Link>
              </li>
            </ul>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <Link href="https://facebook.com">
                <FaFacebook />
              </Link>
              <Link href="https://instagram.com">
                <FaInstagram />
              </Link>
            </div>
          </div>

          {/* KONTAK */}
          <div className="order-3 space-y-4">
            <h3 className="font-bold text-xl">KONTAK</h3>
            <p className="mb-2">(027)-2256-8420</p>
            <p className="mb-2">
              Jl. Bromo VII, Gebang RT02,RW16 Banjarsari, Surakarta, Jawa Tengah
              57136
            </p>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Text */}
      <div className="bg-[#2e7d32] w-full py-4 flex flex-col md:flex-row justify-between items-center px-4 text-[#f5f5dc]">
        <div className="mb-2 md:mb-0">
          <p>&copy; 2024 EcoSmart. All rights reserved.</p>
        </div>
        <div>
          <p>
            Website by{" "}
            <Link href="https://orenix-studios.com" className="underline">
              GILGUL Studios
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
