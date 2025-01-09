"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 1.5 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

export default function AboutPage() {
  const setVariants = useMemo(() => variants(), []);

  return (
    <div id="about" className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-16 lg:px-16 py-20">
        <motion.div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            variants={setVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <Image
                src="/assets/image/Berita.jpeg"
                alt="Berita"
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-[#2f7d32]/10 rounded-3xl"></div>
            </div>
          </motion.div>

          <motion.div
            variants={setVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2f7d32] mb-8">
              TENTANG KAMI
            </h1>
            <div className="space-y-6 text-lg">
              <p className="text-gray-700 leading-relaxed">
                Unit Katon Semilak adalah komunitas bank sampah yang lahir dari
                semangat kebersamaan warga Gebang, RT 02 RW 16, Banjarsari.
                Didukung oleh ibu-ibu PKK dan masyarakat setempat, komunitas ini
                menjadi pelopor pengelolaan sampah yang kreatif dan
                berkelanjutan.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dari tangan-tangan kreatif anggota komunitas, lahir berbagai
                produk ramah lingkungan seperti ecoprint, kompos, tas daur
                ulang, dan masih banyak lagi. Produk-produk ini tidak hanya
                membawa manfaat bagi lingkungan, tetapi juga menjadi sumber
                inspirasi dan peluang ekonomi bagi masyarakat.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
