"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const variants = {
  offscreen: { y: 150, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.5 },
  },
};

export default function VisiMisiPage() {
  return (
    <div>
      <motion.div
        id="visimisi"
        className="w-full py-[125px] px-6 sm:px-8 md:px-16"
        variants={variants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        <div className="pb-16 sm:pb-20">
          <p className="text-3xl sm:text-4xl font-bold text-center text-[#2f7d32]">
            VISI & MISI
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* Misi */}
          <motion.div
            className="w-full sm:w-[48%] h-auto bg-[#2f7d32] flex items-center justify-center p-8 rounded-lg"
            variants={variants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center justify-center mb-4">
                <Image
                  alt="misi"
                  src="/assets/image/misi.png"
                  width={250}
                  height={250}
                  className="w-36 h-36"
                />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-4">
                MISI
              </p>
              <p className="text-sm sm:text-md font-bold text-slate-100">
                Mengubah sampah menjadi sumber daya yang bermanfaat dan
                mempromosikan produk lokal yang ramah lingkungan. Kami ingin
                memberdayakan setiap anggota komunitas untuk terlibat dalam
                menjaga kebersihan lingkungan dan memanfaatkan limbah secara
                kreatif.
              </p>
            </div>
          </motion.div>

          {/* Visi */}
          <motion.div
            className="w-full sm:w-[48%] h-auto border-2 border-[#2f7d32] flex items-center justify-center p-8 rounded-lg"
            variants={variants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center justify-center mb-4">
                <Image
                  alt="visi"
                  src="/assets/image/visi.png"
                  width={250}
                  height={250}
                  className="w-36 h-36"
                />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-center text-[#2f7d32] mb-4">
                VISI
              </p>
              <p className="text-sm sm:text-md font-bold text-[#2f7d32]">
                Kami membayangkan dunia di mana setiap orang berkontribusi pada
                pelestarian lingkungan, dimana sampah tidak lagi menjadi
                masalah, tetapi menjadi solusi. Kami ingin menjadi jembatan
                antara warga dan lingkungan, menciptakan harmoni antara
                keduanya.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
