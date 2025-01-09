"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const variants = {
  offscreen: { y: 150, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.5 },
  },
};

export default function WedoPage() {
  return (
    <div>
      {/* Activities Section */}
      <motion.div
        id="kegiatan"
        className="h-auto w-full  pb-[50px] px-8 "
        variants={variants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        <div className="h-full w-full space-y-8">
          {/* Judul Section */}
          <div className="pb-20">
            <p className="text-4xl font-bold text-center text-[#2f7d32]">
              APA YANG KAMI LAKUKAN?
            </p>
          </div>

          {/* Kegiatan Section */}
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Kegiatan 1 */}
            <motion.div
              className="w-full md:w-[30%] bg-[#2f7d32] flex flex-col items-center justify-center px-6 py-8 rounded-lg"
              variants={variants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
            >
              <Image
                alt="edukasi"
                src="/assets/image/edukasi.png"
                width="144"
                height="144"
                className="w-36 h-36 mb-4"
              />
              <h3 className="text-2xl font-bold text-center text-slate-100 mb-4">
                EDUKASI & KESADARAN
              </h3>
              <p className="text-md text-center font-bold text-slate-100">
                Kami menyelenggarakan berbagai kegiatan untuk meningkatkan
                kesadaran masyarakat tentang pentingnya daur ulang.
              </p>
            </motion.div>

            {/* Kegiatan 2 */}
            <motion.div
              className="w-full md:w-[30%] border-2 border-[#2f7d32] flex flex-col items-center justify-center px-6 py-8 rounded-lg"
              variants={variants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
            >
              <Image
                alt="dukungan"
                src="/assets/image/support.png"
                width="144"
                height="144"
                className="w-36 h-36 mb-4"
              />
              <h3 className="text-2xl font-bold text-center text-[#2f7d32] mb-4">
                DUKUNGAN KOMUNITAS
              </h3>
              <p className="text-md text-center font-bold text-[#2f7d32]">
                Melalui kerja sama dengan warga lokal, kami membantu
                mempromosikan produk-produk daur ulang.
              </p>
            </motion.div>

            {/* Kegiatan 3 */}
            <motion.div
              className="w-full md:w-[30%] bg-[#2f7d32] flex flex-col items-center justify-center px-6 py-8 rounded-lg"
              variants={variants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
            >
              <Image
                alt="inovasi"
                src="/assets/image/inovation.png"
                width="144"
                height="144"
                className="w-36 h-36 mb-4"
              />
              <h3 className="text-2xl font-bold text-center text-slate-100 mb-4">
                INOVASI BERKELANJUTAN
              </h3>
              <p className="text-md text-center font-bold text-slate-100">
                Kami mencari cara baru untuk mengurangi, menggunakan kembali,
                dan mendaur ulang sampah.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
