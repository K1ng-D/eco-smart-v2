"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Link from "next/link";

function variantsText() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 4 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

function variantsProfile() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 5 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

export default function HomePage() {
  const setVariantsText = useMemo(() => variantsText(), []);
  const setVariantsProfile = useMemo(() => variantsProfile(), []);

  return (
    <div id="home" className="h-full min-h-screen">
      <div className="mx-auto max-w-7xl mt-20 px-6 pt-6  md:px-16  md:mt-4">
        <motion.div className="flex flex-col xl:flex-row items-center text-white justify-between xl:pt-8 ">
          <motion.div
            variants={setVariantsText}
            initial="offscreen"
            animate="onscreen"
            className="text-center xl:text-start mb-8 xl:mb-0"
          >
            <h1 className="text-[32px] md:text-[48px] text-[#2f7d32] xl:text-[50px] leading-[1.1] font-bold">
              <span className="text-black">DARI</span> WARGA{" "}
              <span className="text-black">UNTUK</span> BUMI
            </h1>
            <p className="mb-6 md:mb-9 text-[#2f7d32]">
              DAUR ULANG DAN PRODUK LOKAL YANG MENDUKUNG KEBERLANGSUNGAN
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <Link
                href="#about"
                className="flex items-center gap-2 text-white bg-[#2f7d32] px-5 py-2 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-[#245a24]"
              >
                {" "}
                TENTANG KAMI
                <IoArrowForwardCircleOutline size={24} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={setVariantsProfile}
            initial="offscreen"
            animate="onscreen"
            className="flex justify-center xl:justify-end w-full xl:w-auto "
          >
            <div>
              <Image
                src="/assets/image/ecoSmartLogo.png"
                alt="Ramdhani"
                width={500}
                height={500}
                className="rounded-full object-cover md:w-[500px] md:h-[500px]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
